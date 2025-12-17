// ManageRegister.jsx
import { useContext, useState, useMemo } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";



const STATUS_COLORS = {
  paid: "bg-[#26a6eb]/15 text-[#26a6eb]",
  unpaid: "bg-[#FEEFBF] text-[#B45309]", 
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-gray-100 text-gray-600",
};

const ManageRegister = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [q, setQ] = useState(""); // search query
  const [paymentFilter, setPaymentFilter] = useState("all"); // all | paid | unpaid
  const [confirmationFilter, setConfirmationFilter] = useState("all"); // all | confirmed | pending
  const [expandedId, setExpandedId] = useState(null); // for mobile expand
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const { refetch, data: hookcamps = [], isLoading } = useQuery({
    queryKey: ["campshook"],
    queryFn: async () => {
      // Admin view = all carts. If you want per-org, adapt query params.
      const res = await axiosSecure.get("/carts");
      return res.data || [];
    },
  });

  // derived filtered list
  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    return hookcamps.filter((c) => {
      // search by campname, email, or phone
      const matchesQuery =
        !qLower ||
        (c.campname && c.campname.toLowerCase().includes(qLower)) ||
        (c.email && c.email.toLowerCase().includes(qLower)) ||
        (c.phoneNumber && String(c.phoneNumber).includes(qLower));

      const matchesPayment =
        paymentFilter === "all" || (c.paymentStatus || "unpaid") === paymentFilter;

      const confirmationStatus = c.confirmationStatus || "pending";
      const matchesConfirmation =
        confirmationFilter === "all" || confirmationStatus === confirmationFilter;

      return matchesQuery && matchesPayment && matchesConfirmation;
    });
  }, [hookcamps, q, paymentFilter, confirmationFilter]);

  // === Actions ===
  const handleDelete = (id) => {
    Swal.fire({
      title: "Cancel Registration?",
      text: "This will remove the registration and free the seat.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26a6eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        setActionLoadingId(id);
        const res = await axiosSecure.delete(`/carts/${id}`);
        if (res.data.deletedCount > 0) {
          await refetch();
          Swal.fire({
            title: "Cancelled",
            text: "Registration removed.",
            icon: "success",
            confirmButtonColor: "#26a6eb",
          });
        }
      } catch (err) {
        Swal.fire("Error", "Could not cancel registration.", "error");
      } finally {
        setActionLoadingId(null);
      }
    });
  };

 const handleConfirm = (id) => {
  Swal.fire({
    title: "Confirm registration?",
    text: "This will mark the registration as confirmed.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#26a6eb",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then(async (result) => {
    if (!result.isConfirmed) return;

    try {
      setActionLoadingId(id);

      // 1️⃣ Update cart confirmation
      const res = await axiosSecure.patch(`/carts/${id}`, {
        confirmationStatus: "confirmed",
      });

      // 2️⃣ Also update payment based on campId
      await axiosSecure.patch(`/payments/by-camp/${id}`, {
      
        confirmationStatus: "confirmed",
      });


      if (res.data.modifiedCount > 0) {
        await refetch();
        Swal.fire({
          title: "Confirmed",
          text: "Registration & payment updated successfully.",
          icon: "success",
          confirmButtonColor: "#26a6eb",
        });
      }
    } catch (err) {
      Swal.fire("Error", "Could not confirm registration.", "error");
    } finally {
      setActionLoadingId(null);
    }
  });
};


  // small helper for badge classes
  const badgeClassForPayment = (status) =>
    status === "paid" ? STATUS_COLORS.paid : STATUS_COLORS.unpaid;

  // === UI ===
  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#0A2540]">
              Registered <span className="text-[#26a6eb]">Registrations</span>
            </h2>
          
          </div>

          {/* Controls: search + filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by camp, email or phone..."
              className="w-full sm:w-72 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26a6eb]"
            />

            <div className="flex gap-2">
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>

              <select
                value={confirmationFilter}
                onChange={(e) => setConfirmationFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className=" space-y-6">
        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#26a6eb] text-white">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Camp</th>
                <th className="p-4 text-left">Participant</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Confirmation</th>
                <th className="p-4 text-left">Joined On</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filtered.map((camp, idx) => {
                  const payment = (camp.paymentStatus || "unpaid").toLowerCase();
                  const confirmation = (camp.confirmationStatus || "pending").toLowerCase();
                  return (
                    <tr key={camp._id} className="border-b hover:bg-[#F3FAFF]">
                      <td className="p-4 align-top">{idx + 1}</td>

                      <td className="p-4 align-top">
                        <div className="flex items-center gap-3">
                          <img src={camp.Image} alt="" className="w-12 h-12 rounded-lg object-cover border" />
                          <div>
                            <div className="font-semibold text-[#0A2540]">{camp.campname}</div>
                            
                          </div>
                        </div>
                      </td>

                      <td className="p-4 align-top">
                        <div className="text-sm text-gray-700">{camp.email || camp.participantName || "—"}</div>
                        <div className="text-xs text-gray-400">{camp.phoneNumber || camp.phonenumber || "—"}</div>
                      </td>

                      <td className="p-4 align-top">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeClassForPayment(payment)}`}>
                          {payment === "paid" ? "Paid" : "Unpaid"}
                        </span>
                      </td>

                      <td className="p-4 align-top">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${confirmation === "confirmed" ? STATUS_COLORS.confirmed : STATUS_COLORS.pending}`}>
                          {confirmation === "confirmed" ? "Confirmed" : "Pending"}
                        </span>
                      </td>

                      <td className="p-4 align-top">
                        <div className="text-sm text-gray-600">{camp.DateTime ? new Date(camp.DateTime).toLocaleString() : "—"}</div>
                      </td>

                      <td className="p-4 align-top">
                        <div className="flex gap-2 items-center">
                          {/* Pay / Link */}
                        

                          {/* Confirm */}
                          <button
                            onClick={() => handleConfirm(camp._id)}
                            disabled={actionLoadingId === camp._id || confirmation === "confirmed"}
                            className={`px-3 py-1 rounded-md text-sm ${confirmation === "confirmed" ? "bg-gray-200 text-gray-500" : "bg-[#26a6eb] text-white"}`}
                          >
                            {actionLoadingId === camp._id ? "..." : confirmation === "confirmed" ? "Confirmed" : "Confirm"}
                          </button>

                          {/* Cancel/Delete */}
                          <button
                            onClick={() => handleDelete(camp._id)}
                            disabled={actionLoadingId === camp._id || payment === "paid"}
                            className={`p-2 rounded-md ${payment === "paid" ? "opacity-40 cursor-not-allowed" : "bg-red-50 hover:bg-red-100"}`}
                            title="Cancel registration"
                          >
                            <FaTrashAlt className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            <div className="p-6 bg-white rounded-lg text-center text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 bg-white rounded-lg text-center text-gray-500">No registrations found.</div>
          ) : (
            filtered.map((camp, idx) => {
              const payment = (camp.paymentStatus || "unpaid").toLowerCase();
              const confirmation = (camp.confirmationStatus || "pending").toLowerCase();
              const isExpanded = expandedId === camp._1?._id || expandedId === camp._id;
              return (
                <article key={camp._id} className="bg-white rounded-xl border shadow-sm p-4">
                  <div className="flex items-start gap-3">
                    <img src={camp.Image} alt="" className="w-20 h-20 rounded-lg object-cover border" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-[#0A2540]">{camp.campname}</h3>
                          <p className="text-xs text-gray-500 mt-1">{camp.HealthcareProfessionalName || "—"}</p>
                        </div>

                        <div className="text-right space-y-2">
                          <div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeClassForPayment(payment)}`}>
                              {payment === "paid" ? "Paid" : "Unpaid"}
                            </span>
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${confirmation === "confirmed" ? STATUS_COLORS.confirmed : STATUS_COLORS.pending}`}>
                              {confirmation === "confirmed" ? "Confirmed" : "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* collapsed content */}
                      <div className="mt-3 text-sm text-gray-600">
                        <div>Participant: {camp.email || "—"}</div>
                        <div className="mt-1">Fee: <span className="font-medium">BDT {camp.campfees}</span></div>
                      </div>

                      {/* actions */}
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex gap-2">
                          {payment === "unpaid" && (
                            <Link to={`/dashboard/payment?campId=${camp._id}`} className="px-3 py-1 bg-[#26a6eb] text-white rounded-md text-sm">
                              Pay
                            </Link>
                          )}

                          <button
                            onClick={() => handleConfirm(camp._id)}
                            disabled={actionLoadingId === camp._id || confirmation === "confirmed"}
                            className={`px-3 py-1 rounded-md text-sm ${confirmation === "confirmed" ? "bg-gray-200 text-gray-500" : "bg-[#26a6eb] text-white"}`}
                          >
                            {actionLoadingId === camp._id ? "..." : confirmation === "confirmed" ? "Confirmed" : "Confirm"}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(camp._id)}
                            disabled={actionLoadingId === camp._id || payment === "paid"}
                            className={`p-2 rounded-md ${payment === "paid" ? "opacity-40 cursor-not-allowed" : "bg-red-50 hover:bg-red-100"}`}
                          >
                            <FaTrashAlt className="text-red-600" />
                          </button>

                          <button
                            onClick={() => setExpandedId(expandedId === camp._id ? null : camp._id)}
                            className="p-2 rounded-md bg-gray-50 hover:bg-gray-100"
                            aria-expanded={isExpanded}
                          >
                            {expandedId === camp._id ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </div>
                      </div>

                      {/* expanded details */}
                      {expandedId === camp._id && (
                        <div className="mt-3 border-t pt-3 text-sm text-gray-700">
                          <div><strong>Registered at:</strong> {camp.createdAt ? new Date(camp.createdAt).toLocaleString() : "—"}</div>
                          <div className="mt-1"><strong>Phone:</strong> {camp.phoneNumber || camp.phonenumber || "—"}</div>
                          <div className="mt-1"><strong>Notes:</strong> {camp.notes || "—"}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRegister;
