import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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

  const handleUpdate = async (updatedCamp) => {
    try {
      const res = await axiosSecure.put(`/camps/${updatedCamp._id}`, updatedCamp);
      if (res.data) {
        refetch();
        closeModal();
        Swal.fire({
          title: "Updated!",
          text: "Camp details have been updated.",
          icon: "success"
        });
      }
    } catch (error) {
      console.error("Error updating camp:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the camp details.",
        icon: "error"
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/camps/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        } catch (error) {
          console.error("Error deleting camp:", error);
        }
      }
    });
  };

  const handleEdit = (camp) => {
    setEditCamp(camp);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditCamp(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedCamp = {
      _id: editCamp._id,
      campname: form.campname.value,
      image: form.image.value,
      campfees: form.campfees.value,
      Location: form.Location.value,
      HealthcareProfessionalName: form.HealthcareProfessionalName.value,
      ParticipantCount: form.ParticipantCount.value,
      Description: form.Description.value
    };
    handleUpdate(updatedCamp);
  };

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
                <td>{camp.campname}</td>
                <td>{camp.DateTime}</td>
                <td>{camp.Location}</td>
                <td>{camp.HealthcareProfessionalName}</td>
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
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-xl">Camp Name</span>
                </label>
                <input type="text" name="campname" className="input input-bordered w-full" defaultValue={editCamp.campname} />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xl">Image</span>
                </label>
                <input type="text" name="image" className="input input-bordered w-full" defaultValue={editCamp.image} />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xl">Camp Fees</span>
                </label>
                <input type="text" name="campfees" className="input input-bordered w-full" defaultValue={editCamp.campfees} />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xl">Location</span>
                </label>
                <input type="text" name="Location" className="input input-bordered w-full" defaultValue={editCamp.Location} />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xl">Healthcare Professional</span>
                </label>
                <input type="text" name="HealthcareProfessionalName" className="input input-bordered w-full" defaultValue={editCamp.HealthcareProfessionalName} />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xl">Participant Count</span>
                </label>
                <input type="text" name="ParticipantCount" className="input input-bordered w-full" defaultValue={editCamp.ParticipantCount} />
              </div>
              <div className="col-span-2">
                <label className="label">
                  <span className="label-text text-xl">Description</span>
                </label>
                <textarea name="Description" className="textarea textarea-bordered w-full" rows="5" defaultValue={editCamp.Description}></textarea>
              </div>
              <div className="modal-action col-span-2">
                <button type="button" className="btn" onClick={closeModal}>Close</button>
                <input type="submit" value="Update" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCamps;
