import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      console.log('res :>> ', res.data);
      return res.data;
    },
  });

  

  return (
    <div className="  px-2  space-y-10">
      {/* ---------------------- Header ---------------------- */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl lg:text-3xl font-extrabold text-[#0A2540]">
          Your <span className="text-[#26a6eb]">Payment History</span>
        </h2>
        {/* <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
          Keep track of all your past transactions for MediCamps registrations.
        </p> */}
      </div>

      {/* ---------------------- Mobile Card Layout ---------------------- */}
      <div className="space-y-5 lg:hidden">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500 py-5">
            No payment records found.
          </p>
        ) : (
          payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-100 space-y-3"
            >
              <h3 className="text-lg font-bold text-[#0A2540]">
                {payment.CampName}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <CardField label="Fees" value={`৳${payment.CampFees}`} />
                <CardField
                  label="Payment Status"
                  value={payment.status}
                  status={payment.paymentStatus}
                />
                <CardField
                  label="Confirmation"
                  value={payment.confirmationStatus || "Pending"}
                  status={payment.confirmationStatus}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ---------------------- Desktop Table Layout ---------------------- */}
      <div className="hidden lg:block bg-white rounded-xl  border border-gray-100 overflow-hidden">
        <table className="w-full text-sm lg:text-base">
          <thead className="bg-[#26a6eb] text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Camp Name</th>
              <th className="px-6 py-3 text-left font-semibold">Fees</th>
              <th className="px-6 py-3 text-left font-semibold">Payment Status</th>
              <th className="px-6 py-3 text-left font-semibold">Confirmation</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center px-6 py-4 text-gray-500">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-[#55baef0d] transition`}
                >
                  <td className="px-6 py-4 font-medium text-[#0A2540]">{payment.CampName}</td>
                  <td className="px-6 py-4">৳{payment.CampFees}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={payment.confirmationStatus || "Pending"} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---------------------- Status Badge ----------------------
const StatusBadge = ({ status }) => {
  let color = "bg-gray-300 text-gray-800";

  if (!status) color = "bg-gray-300 text-gray-800";
  else if (status.toLowerCase() === "completed" || status.toLowerCase() === "paid") color = "bg-[#0A8C5E]/20 text-[#0A8C5E]";
  else if (status.toLowerCase() === "pending") color = "bg-[#26a6eb]/20 text-[#26a6eb]";
  else if (status.toLowerCase() === "failed") color = "bg-red-100 text-red-600";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color} inline-block`}>
      {status}
    </span>
  );
};

// ---------------------- Card Field for Mobile ----------------------
const CardField = ({ label, value, status }) => (
  <div className="space-y-1">
    <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
    {status ? (
      <StatusBadge status={value} />
    ) : (
      <p className="text-[#0A2540] font-semibold">{value}</p>
    )}
  </div>
);

export default PaymentHistory;
