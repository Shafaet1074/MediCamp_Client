import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const tranId = params.get("tranId");

    if (tranId) {
      // optional: verify payment status from backend
      navigate("/dashboard/registeredcamps", { replace: true });
    }
  }, []);

  return <h2>Payment successful! Redirecting...</h2>;
};

export default PaymentSuccess;
