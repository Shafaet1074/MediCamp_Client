import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaUsers, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Organizers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now an Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="space-y-6 px-3">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-3xl lg:text-3xl font-bold text-[#0A2540] mb-3">
          Manage <span className="text-[#26a6eb]">Organizers</span>
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Control access levels, upgrade organizers to admin, and manage their profiles easily.
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full table-auto">
          <thead className="bg-[#26a6eb] text-white">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Organizer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-8 text-gray-500">
                  No organizers found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user._id} className="border-b hover:bg-[#f5faff]">
                  <td className="p-4">{idx + 1}</td>

                  {/* NAME WITH ICON */}
                  <td className="p-4 flex items-center gap-3">
                    <FaUserCircle className="text-4xl text-[#26a6eb]" />
                    <span className="font-semibold text-[#0A2540]">
                      {user.name}
                    </span>
                  </td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    {user.role === "admin" ? (
                      <span className="px-3 py-1 bg-[#0A8C5E]/15 text-[#0A8C5E] rounded-full text-sm">
                        Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="px-3 py-1 bg-[#26a6eb] text-white rounded-md hover:opacity-95 flex items-center gap-2"
                      >
                        <FaUsers /> Make Admin
                      </button>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-5">
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-md">
                        <MdDelete size={20} />
                      </button>
                      <button className="text-[#26a6eb] hover:bg-blue-50 p-2 rounded-md">
                        <FaRegEdit size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="sm:hidden grid gap-4">
        {users.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            No organizers found.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white border shadow-sm rounded-xl p-4"
            >
              <div className="flex items-center gap-4 mb-3">
                <FaUserCircle className="text-5xl text-[#26a6eb]" />
                <div>
                  <h3 className="font-bold text-[#0A2540]">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                {user.role === "admin" ? (
                  <span className="px-3 py-1 bg-[#0A8C5E]/15 text-[#0A8C5E] rounded-full text-xs">
                    Admin
                  </span>
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="px-3 py-1 bg-[#26a6eb] text-white rounded-md text-xs flex items-center gap-2"
                  >
                    <FaUsers /> Make Admin
                  </button>
                )}

                <div className="flex gap-3">
                  <button className="text-red-500 p-2 rounded-md hover:bg-red-50">
                    <MdDelete size={18} />
                  </button>
                  <button className="text-[#26a6eb] p-2 rounded-md hover:bg-blue-50">
                    <FaRegEdit size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Organizers;
