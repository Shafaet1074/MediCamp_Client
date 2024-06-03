import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCamp, setEditCamp] = useState(null);

  const { refetch, data: managecamps = [] } = useQuery({
    queryKey: ['managecamps'],
    queryFn: async () => {
      const res = await axiosSecure.get('/camps');
      return res.data;
    }
  });

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`camps/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
      }
    });
  }

  const handleEdit = camp => {
    setEditCamp(camp);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setEditCamp(null);
  }

  return (
    <div className="bg-[#D6EDFF] p-10 min-h-screen">
      <h2 className="text-5xl text-black text-center pb-10 font-bold">Manage Your <span className="text-green-800">Medical Camp</span></h2>
      <div className="overflow-x-auto">
        <table className="table text-xl bg-green-800 text-white">
          <thead className="text-white text-2xl">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>HealthCare Professional</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {managecamps.map((camp, index) => (
              <tr key={camp._id}>
                <th>{index + 1}</th>
                <td>{camp.campName}</td>
                <td>{camp.dateTime}</td>
                <td>{camp.location}</td>
                <td>{camp.healthcareProfessional}</td>
                <th>
                  <div className="flex flex-row gap-2">
                    <button onClick={() => handleDelete(camp._id)} className="btn btn-ghost btn-lg">
                      <MdDelete />
                    </button>
                    <button onClick={() => handleEdit(camp)} className="btn btn-ghost btn-lg">
                      <FaRegEdit />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <dialog open className="modal" id="my_modal_1">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Camp</h3>
            <p className="py-4">Editing details for {editCamp.campName}</p>
            <div className="modal-action">
              <form method="dialog">
                {/* Add form fields to edit camp details here */}
                <button className="btn" onClick={closeModal}>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCamps;
