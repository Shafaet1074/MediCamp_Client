import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCamp, setEditCamp] = useState(null);

  const { refetch, data: managecamps = [] } = useQuery({
    queryKey: ["managecamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps");
      return res.data;
    },
  });

  const handleUpdate = async (updatedCamp) => {
    try {
      const res = await axiosSecure.put(
        `/camps/${updatedCamp._id}`,
        updatedCamp
      );
      if (res.data) {
        refetch();
        closeModal();
        Swal.fire({
          title: "Success!",
          text: "Camp updated successfully.",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update camp!", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete this camp?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26a6eb",
      cancelButtonColor: "#0A2540",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/camps/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Camp has been removed.", "success");
        }
      }
    });
  };

  const openModal = (camp) => {
    setEditCamp(camp);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditCamp(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCamp = {
      _id: editCamp._id,
      campname: form.campname.value,
      image: form.image.value,
      campfees: form.campfees.value,
      Location: form.Location.value,
      HealthcareProfessionalName: form.HealthcareProfessionalName.value,
      ParticipantCount: form.ParticipantCount.value,
      Description: form.Description.value,
    };

    handleUpdate(updatedCamp);
  };

  return (
    <div className="min-h-screen ">
      <h2 className="text-3xl font-bold text-center text-[#0A2540] pb-8">
        Manage <span className="text-[#26a6eb]">Medical Camps</span>
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="table w-full bg-white rounded-xl shadow-lg">
          <thead className="bg-[#26a6eb] text-white text-lg">
            <tr>
              <th>#</th>
              <th>Camp Name</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Healthcare Professional</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {managecamps.map((camp, index) => (
              <tr key={camp._id} className="hover:bg-[#F3FAFF] transition">
                <td>{index + 1}</td>
                <td className="font-semibold">{camp.campname}</td>
                <td>{camp.DateTime}</td>
                <td>{camp.Location}</td>
                <td>{camp.HealthcareProfessionalName}</td>
                <td>
                  <div className="flex justify-center gap-3 text-2xl">
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => openModal(camp)}
                      className="text-[#26a6eb] hover:text-[#0A2540]"
                    >
                      <FaRegEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {managecamps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white shadow-md rounded-xl p-4 border border-[#D6EDFF]"
          >
            <h3 className="text-xl font-bold text-[#0A2540]">
              {camp.campname}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              <strong>Date:</strong> {camp.DateTime}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {camp.Location}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Doctor:</strong> {camp.HealthcareProfessionalName}
            </p>

            <div className="flex justify-end gap-4 text-2xl mt-3">
              <button
                onClick={() => handleDelete(camp._id)}
                className="text-red-600"
              >
                <MdDelete />
              </button>
              <button
                onClick={() => openModal(camp)}
                className="text-[#26a6eb]"
              >
                <FaRegEdit />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box max-w-3xl bg-white shadow-xl rounded-xl">
            <h3 className="text-xl font-bold text-[#0A2540] mb-4">
              Edit Camp Details
            </h3>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="campname"
                defaultValue={editCamp.campname}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="image"
                defaultValue={editCamp.image}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="campfees"
                defaultValue={editCamp.campfees}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="Location"
                defaultValue={editCamp.Location}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="HealthcareProfessionalName"
                defaultValue={editCamp.HealthcareProfessionalName}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="ParticipantCount"
                defaultValue={editCamp.ParticipantCount}
                className="input input-bordered w-full"
              />

              <textarea
                name="Description"
                rows="4"
                defaultValue={editCamp.Description}
                className="textarea textarea-bordered md:col-span-2"
              ></textarea>

              <div className="modal-action md:col-span-2">
                <button
                  onClick={closeModal}
                  type="button"
                  className="btn bg-gray-300 text-black"
                >
                  Cancel
                </button>
                <button className="btn bg-[#26a6eb] hover:bg-[#55baef] text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCamps;
