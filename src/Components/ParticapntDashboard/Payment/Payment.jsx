import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";


const Payment = () => {
  const stripePromise= loadStripe(import.meta.env.VITE_PAYMENT_PK);
  return (
    <div>
     <div className="p-10 text-center">
     <h2 className="text-5xl text-black text-center font-bold  ">Registered Camps   <span className="text-green-800">By Payment</span></h2>
     <p className="mt-5 text-2xl font-extralight text-slate-900">View and track the payment status of all your registered camps in one place. Stay informed about your expenses and ensure your registrations are up-to-date.</p>
     </div>
     <div>
    <Elements stripe={stripePromise}>
         <CheckOut></CheckOut>
        
    </Elements>
     </div>
    </div>
  );
};

export default Payment;
