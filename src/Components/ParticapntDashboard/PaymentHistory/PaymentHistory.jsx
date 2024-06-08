import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    }
  });

  return (
    <div>
      <div className="lg:p-10 lg:text-center lg:space-y-4 space-y-8">
        <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
          Your <span className="text-green-800">Payment History</span>
        </h2>
        <p className="text-xl lg:text-3xl font-extralight text-gray-900">
        Keep track of all your past transactions in one place. View detailed records of your payments.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table font-bold text-white p-10 bg-green-500">
          <thead>
            <tr className="text-white font-bold text-xl">
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.CampName}</td>
                <td>{payment.CampFees}</td>
                <td>{payment.paymentStatus}</td>
                {/* Assuming confirmation status is a field in the payment object */}
                <td>{payment.confirmationStatus || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;