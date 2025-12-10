import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const CheckOut = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const campId = new URLSearchParams(location.search).get("campId");
  const [camp, setCamp] = useState(null);

  useEffect(() => {
    const fetchCamp = async () => {
      if (campId) {
        try {
          const res = await axiosSecure.get(`/carts/${campId}`);
          setCamp(res.data);
        } catch (error) {
          console.error("Error fetching camp data:", error);
        }
      }
    };
    fetchCamp();
  }, [campId, axiosSecure]);

  useEffect(() => {
    if (camp) {
      const totalPrice = parseFloat(camp.campfees);
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [camp, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || loading) {
      return;
    }

    setLoading(true);
    const card = elements.getElement(CardElement);
    if (card === null) {
      setLoading(false);
      return;
    }

    const { error: createPaymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (createPaymentMethodError) {
      setError(createPaymentMethodError.message);
      setLoading(false);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user.email,
        ParticipantName: user.displayName,
        price: parseFloat(camp.campfees),
        transactionId: paymentIntent.id,
        date: new Date(),
        campId: campId,
        CampName: camp.campname,
        CampFees: camp.campfees,
        paymentStatus: "Completed",
      };

      try {
        const res = await axiosSecure.post("/payments", payment);
        if (res?.data?.insertedId) {
          const confirmRes = await axiosSecure.patch(`/carts/${campId}`, {
            paymentStatus: "paid",
          });
          if (confirmRes.data?.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for your payment",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/paymentHistory");
          }
        }
      } catch (error) {
        console.error("Error posting payment data:", error);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Secure Payment
        </h2>
        <Form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="border border-gray-300 rounded-lg p-3"
          />
          <button
            className="w-full mt-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition duration-200"
            type="submit"
            disabled={!stripe || !clientSecret || loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          {transactionId && (
            <p className="mt-3 text-sm text-green-600">
              Transaction ID: {transactionId}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CheckOut;
