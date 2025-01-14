import { useContext } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const ManageRegister = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { refetch, data: hookcamps = [] } = useQuery({
    queryKey: ['campshook'],
    queryFn: async () => {
      const res = await axiosSecure.get('/carts');
      return res.data;
    }
  });

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

  const handleConfirm = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm this registration?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/carts/${id}`, { confirmationStatus: "confirmed" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Confirmed!",
              text: "The registration has been confirmed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleCancel = async (camp) => {
    if (camp.paymentStatus === "unpaid") {
      handleDelete(camp._id);
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
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Action</th>
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
                <td>
                  {camp.paymentStatus === "paid" ? (
                    <button className="px-4 py-2 bg-green-700 rounded-lg btn-disabled text-white font-bold">Paid</button>
                  ) : (
                    <Link to={`/dashboard/payment?campId=${camp._id}`}>
                      <button className="px-4 py-2 btn-disabled bg-green-700 rounded-lg text-white font-bold">Unpaid</button>
                    </Link>
                  )}
                </td>
                <td>
                  {camp.confirmationStatus === "confirmed" ? (
                    <button className="px-4 py-2 bg-green-700 rounded-lg btn-disabled text-white font-bold">Confirmed</button>
                  ) : (
                    <button
                      onClick={() => handleConfirm(camp._id)}
                      className="px-4 py-2 bg-green-700 rounded-lg text-white font-bold"
                    >
                      Confirm
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleCancel(camp)}
                    className={`btn ${camp.paymentStatus === "paid" ? "btn-disabled" : "btn-danger"}`}
                    disabled={camp.paymentStatus === "paid"}
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRegister;
