// RegisteredCamps.jsx
import React, { useEffect, useState, useContext, useCallback } from "react";
import useCamps from "../../../Hooks/useCamps";
import { AuthContext } from "../../Providers/AuthProviders";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const RegisteredCamps = () => {
  const [hookcamps, refetch] = useCamps();
  console.log(hookcamps);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

 
  // Feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedCampId, setSelectedCampId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  // Payment states
  const [loadingCampId, setLoadingCampId] = useState(null);

  // ---------- Helpers ----------
  
  // ---------- Feedback handlers ----------
  const openFeedback = (campId) => {
    setSelectedCampId(campId);
    setShowFeedbackModal(true);
  };
  
  const closeFeedback = () => {
    setShowFeedbackModal(false);
    setSelectedCampId(null);
    setFeedback("");
    setRating(5);
  };
  
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const payload = {
        campId: selectedCampId,
        feedback,
        rating,
        user: user.displayName,
        email: user.email,
      };
      const res = await axiosSecure.post("/reviews", payload);
      if (res?.data?.insertedId) {
        Swal.fire({
          title: "Thank you!",
          text: "Your feedback has been submitted.",
          icon: "success",
          confirmButtonColor: "#26a6eb",
        });
        closeFeedback();
      } else {
        throw new Error("Could not save feedback");
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Could not submit feedback. Please try again later.",
        icon: "error",
        confirmButtonColor: "#26a6eb",
      });
    }
  };

  // ---------- Delete / Cancel ----------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Cancel Registration?",
      text: "Your seat will be released.",
      icon: "warning",
      confirmButtonColor: "#26a6eb",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Cancelled",
              text: "Your registration has been removed.",
              icon: "success",
              confirmButtonColor: "#26a6eb",
            });
          }
        });
      }
    });
  };

  // ---------- Payment flow ----------
  const handlePayNow = async (camp) => {
    if (!user) {
      Swal.fire({
        title: "Login required",
        text: "Please log in before making a payment.",
        icon: "info",
        confirmButtonColor: "#26a6eb",
      });
      return;
    }

    setLoadingCampId(camp._id);

    try {
  const res = await axiosSecure.post("/ssl/initiate", {
  amount: camp.campfees,
  campname: camp.campname,
  name: user.displayName,
  email: user.email,
  phone: "01700000000", // required by SSLCommerz
  address: "Dhaka, Bangladesh", // required
  tranId: `${camp._id}_${Date.now()}`, // required unique ID
  campId: camp._id,
});


      
      console.log(res.data);
      const { url } = res?.data || {};

      
      if (!url) {
        Swal.fire("Payment Error", "Unable to create SSL session", "error");
        return;
      }

      // Redirect to SSLCommerz in the same tab
      window.location.href = url;

    } catch (err) {
      console.error("Payment creation error:", err);
      Swal.fire("Error", "Payment could not be initialized.", "error");
    } finally {
      setLoadingCampId(null);
    }
  };

  // ---------- UI ----------
  return (
    <div className="space-y-6 px-3">
      <div className="text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2540] mb-3">
          Your <span className="text-[#26a6eb]">Registered Camps</span>
        </h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Manage your registrations, pay securely, and leave feedback for the camps you attended.
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full table-auto">
          <thead className="bg-[#26a6eb] text-white">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Camp</th>
              <th className="p-4 text-left">Fees</th>
              <th className="p-4 text-left">Participant</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Feedback</th>
            </tr>
          </thead>

          <tbody>
            {hookcamps.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-8 text-gray-500">
                  You have not registered for any camps yet.
                </td>
              </tr>
            ) : (
              hookcamps.map((camp, idx) => (
                <tr key={camp._id} className="border-b hover:bg-[#f5faff]">
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4">
                    <img src={camp.Image} alt={camp.campname} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="p-4 font-medium text-[#0A2540]">{camp.campname}</td>
                  <td className="p-4">BDT {camp.campfees}</td>
                  <td className="p-4">{user?.displayName || user?.email}</td>
                  <td className="p-4">
                    {camp.paymentStatus === "paid" ? (
                      <span className="px-3 py-1 bg-[#0A8C5E]/15 text-[#0A8C5E] rounded-full text-sm">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayNow(camp)}
                        disabled={loadingCampId === camp._id}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-[#26a6eb] text-white rounded-md hover:opacity-95 disabled:opacity-60"
                      >
                        {loadingCampId === camp._id ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                              <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Pay Now"
                        )}
                      </button>
                    )}
                  </td>
                  <td className="p-4">
                    {camp.confirmationStatus ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{camp.confirmationStatus}</span>
                    ) : (
                      <span className="text-gray-500">Pending</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(camp._id)}
                      disabled={camp.paymentStatus === "paid"}
                      className={`p-2 text-red-600 ${camp.paymentStatus === "paid" ? "opacity-40 cursor-not-allowed" : "hover:bg-red-50"} rounded-md`}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                  <td className="p-4">
                    {camp.paymentStatus === "paid" && camp.confirmationStatus === "confirmed" ? (
                      <button onClick={() => openFeedback(camp._id)} className="px-3 py-1 bg-[#0A2540] text-white rounded-md">
                        Feedback
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="sm:hidden grid gap-4">
        {hookcamps.length === 0 ? (
          <div className="text-center p-6 text-gray-500">You have not registered for any camps yet.</div>
        ) : (
          hookcamps.map((camp) => (
            <article key={camp._id} className="bg-white rounded-xl border shadow-sm p-4">
              <div className="flex items-start gap-4">
                <img src={camp.Image} alt={camp.campname} className="w-20 h-20 rounded-lg object-cover border" />
                <div className="flex-1">
                  <h4 className="font-bold text-[#0A2540]">{camp.campname}</h4>
                  <p className="text-sm text-gray-600 mt-1">Fee: <span className="font-medium">BDT {camp.campfees}</span></p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    {camp.paymentStatus === "paid" ? (
                      <span className="px-3 py-1 bg-[#0A8C5E]/15 text-[#0A8C5E] rounded-full text-xs">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayNow(camp)}
                        disabled={loadingCampId === camp._id}
                        className="px-3 py-1 bg-[#26a6eb] text-white text-xs rounded-md inline-flex items-center gap-2"
                      >
                        {loadingCampId === camp._id ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                              <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Pay Now"
                        )}
                      </button>
                    )}

                    <div className="flex gap-2 items-center">
                      <button onClick={() => handleDelete(camp._id)} className="text-red-600 p-2 rounded-md hover:bg-red-50">
                        <FaTrashAlt />
                      </button>
                      {camp.paymentStatus === "paid" && camp.confirmationStatus === "confirmed" && (
                        <button onClick={() => openFeedback(camp._id)} className="px-3 py-1 bg-[#0A2540] text-white text-xs rounded-md">
                          Feedback
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* FEEDBACK MODAL */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-[#0A2540] mb-3">Submit your feedback</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <textarea
                required
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Write your feedback..."
              />
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-3 border rounded-lg">
                {[5,4,3,2,1].map((r) => (
                  <option key={r} value={r}>{"⭐".repeat(r)} ({r})</option>
                ))}
              </select>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeFeedback} className="px-4 py-2 bg-gray-100 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#26a6eb] text-white rounded-md">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;