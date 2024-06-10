import { useState, useContext } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCamps from "../../../Hooks/useCamps";
import { AuthContext } from "../../Providers/AuthProviders";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RegisteredCamps = () => {
  const [hookcamps, refetch] = useCamps();
  const [showModal, setShowModal] = useState(false);
  const [selectedCampId, setSelectedCampId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(1);

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your registration has been cancelled.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleFeedback = (campId) => {
    setSelectedCampId(campId);
    setShowModal(true);
  };

  const handleCancel = async (camp) => {
    if (camp.paymentStatus === "unpaid") {
      handleDelete(camp._id);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCampId(null);
    setFeedback("");
    setRating(1);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    console.log(hookcamps.campname);
    try {
      const res = await axiosSecure.post('/reviews', {
        campId: selectedCampId,
      
        feedback,
        rating,
        user: user.displayName,
        email: user.email,
      });
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your feedback has been submitted.",
          icon: "success",
        });
        handleModalClose();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to submit feedback.",
        icon: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="lg:p-10 lg:text-center lg:space-y-4 space-y-8">
        <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
          Your <span className="text-green-800">Registered Camps</span>
        </h2>
        <p className="text-xl lg:text-3xl font-extralight text-gray-900">
          Explore and manage all the camps you have signed up for, all in one convenient location.
        </p>
      </div>

      <div className="overflow-x-auto lg:px-10 px-2">
        <table className="table lg:w-full w-1/2 bg-green-800 text-xl text-white">
          <thead>
            <tr className="text-2xl text-white">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Fees</th>
              <th>Participant</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Action</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {hookcamps.map((camp, index) => (
              <tr key={camp._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={camp?.Image} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{camp.campname}</td>
                <td>BDT {camp.campfees}</td>
                <td>{user.displayName}</td>
                <td>
                  {camp.paymentStatus === "paid" ? (
                    <button className="px-4 py-2 bg-green-700 rounded-lg btn-disabled text-white font-bold">
                      Paid
                    </button>
                  ) : (
                    <Link to={`/dashboard/payment?campId=${camp._id}`}>
                      <button className="px-4 py-2 bg-green-500 rounded-lg text-white font-bold">
                        Pay
                      </button>
                    </Link>
                  )}
                </td>
                <td>{camp.confirmationStatus || 'pending'}</td>
                <td>
                  <button
                    onClick={() => handleCancel(camp)}
                    className={`btn ${camp.paymentStatus === "paid" ? "btn-disabled" : "btn-danger"}`}
                    disabled={camp.paymentStatus === "paid"}
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
                <td>
                  {camp.paymentStatus === "paid" && camp.confirmationStatus === "confirmed" && (
                    <button onClick={() => handleFeedback(camp._id)} className="btn btn-info">
                      Feedback
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                  Rating
                </label>
                <select
                  id="rating"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                >
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button type="button" className="mr-4 bg-gray-500 text-white px-4 py-2 rounded" onClick={handleModalClose}>
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;
