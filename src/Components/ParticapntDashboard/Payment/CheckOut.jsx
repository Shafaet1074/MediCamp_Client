import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const CheckOut = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const campId = new URLSearchParams(location.search).get("campId");
  const [camp, setCamp] = useState(null);

  // Fetch camp data based on campId
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

  // Create payment intent based on camp fees
  useEffect(() => {
    if (camp) {
      const totalPrice = parseFloat(camp.campfees);
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [camp, axiosSecure]);

  // Handle form submission to process payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || loading) {
      return;
    }
  
    setLoading(true);  // Set loading state to true
  
    const card = elements.getElement(CardElement);
    if (card === null) {
      setLoading(false);  // Reset loading state
      return;
    }
  
    const { error: createPaymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });
  
    if (createPaymentMethodError) {
      setError(createPaymentMethodError.message);
      setLoading(false);  // Reset loading state
      return;
    } else {
      setError('');
    }
  
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    });
  
    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);  // Reset loading state
      return;
    }
  
    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
  
      // Prepare payment data
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
  
      // Post payment data to the server
      try {
        const res = await axiosSecure.post('/payments', payment);
        if (res?.data?.insertedId) {
          console.log(`Payment recorded with ID: ${res.data.insertedId}`);
          const confirmRes = await axiosSecure.patch(`/carts/${campId}`, { paymentStatus: "paid" });
          console.log(`Update response: ${JSON.stringify(confirmRes.data)}`);
          if (confirmRes.data?.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for your payment",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/dashboard/paymentHistory');
          }
        }
      } catch (error) {
        console.error("Error posting payment data:", error);
      }
    }
  
    setLoading(false);  // Reset loading state
  };

  
  return (
    <div>
      <Form className="border-2 p-20 bg-slate-200" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="py-2 px-6 rounded-lg text-3xl font-bold bg-green-800 text-white hover:bg-emerald-900 mt-5"
          type="submit" disabled={!stripe || !clientSecret || loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
      </Form>
    </div>
  );
};

export default CheckOut;
