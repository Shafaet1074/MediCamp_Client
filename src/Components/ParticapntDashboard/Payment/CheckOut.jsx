import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import useCamps from "../../../Hooks/useCamps";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";


const CheckOut = () => {

  const [error,setError]=useState('');
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const [hookcamps,refetch]=useCamps();
  const axiosSecure = useAxiosSecure();
  const {user} =useContext(AuthContext);
  const [transactionId, setTransactionId] = useState('');
  console.log(user.displayName);

  
  const totalPrice = hookcamps.reduce((total, item) => total + parseFloat(item.campfees), 0);

  
  useEffect(() => {
    if (totalPrice > 0) {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }

}, [axiosSecure, totalPrice])

  const handleSubmit = async(e)=>{
    e.preventDefault()

    if (!stripe || !elements) {
      return;

  }

  const card =elements.getElement(CardElement);

  if(card=== null){
    return;

  }

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card
})

if (error) {
    console.log('payment error', error);
    setError(error.message);
}
else {
    console.log('payment method', paymentMethod)
    setError('');
}
    // sdasd

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
          card: card,
          billing_details: {
              email: user?.email || 'anonymous',
              name: user?.displayName || 'anonymous'
          }
      }
  })

  if (confirmError) {
      console.log('confirm error')
  }
  else {
      console.log('payment intent', paymentIntent)
      if (paymentIntent.status === 'succeeded') {
          console.log('transaction id', paymentIntent.id);
          setTransactionId(paymentIntent.id);

          // now save the payment in the database
          const payment = {
              email: user.email,
              ParticipantName:user.displayName,
              price: totalPrice,
              transactionId: paymentIntent.id,
              date: new Date(), // utc date convert. use moment js to 
              cartIds: hookcamps.map(item => item._id),
              CampName: hookcamps.map(item => item.campname),
              CampFees: hookcamps.map(item => item.campfees),
              status: 'pending'
          }

          const res = await axiosSecure.post('/payments', payment);
          console.log('payment saved', res.data);
          refetch();
          if (res.data?.paymentResult?.insertedId) {
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Thank you for Payment",
                  showConfirmButton: false,
                  timer: 1500
              });
              // navigate('/dashboard/paymentHistory')
          }

      }
  }

  }
  return (
    <div >
      <Form className=" border-2 p-20 bg-slate-200 " onSubmit={handleSubmit}>
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
      
      <button className="  py-2 px-6 rounded-lg text-3xl font-bold bg-green-800 text-white hover:bg-emerald-900 hover:text-white mt-5 
" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>

      <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}

    </Form>
    </div>
  );
};

export default CheckOut;