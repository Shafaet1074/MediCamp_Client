import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Organizers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      console.log(res.data);
      return res.data;
    }
  });

  console.log(users);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin now`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  return (
    <div className="bg-[#D6EDFF] lg:p-10 p-2 min-h-screen">
      <h2 className="lg:text-5xl text-xl text-black lg:text-center lg:pb-10 p-5 font-bold">
        Manage Your <span className="text-green-800">Organizers Profile</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table text-xl bg-green-800 text-white">
          <thead className="text-white text-2xl">
            <tr>
              <th></th>
              <th>Organizer Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {users.map((organizer, index) => (
            <tbody key={organizer._id}>
              <tr>
                <th>{index + 1}</th>
                <td>{organizer.name}</td>
                <td>{organizer.email}</td>
                <td>
                  {organizer.role === 'admin' ? (
                    <h2 className="px-2 py-4 bg-green-500 rounded-lg  text-center">Admin</h2>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(organizer)}
                      className="btn btn-lg bg-green-500"
                    >
                      <FaUsers className="text-white" />
                    </button>
                  )}
                </td>
                <td>
                  <div className="flex flex-row justify-start gap-10">
                   <button className="text-red-400 lg:text-2xl "> <MdDelete /></button>
                   <button className="text-green-400 lg:text-2xl "> <FaRegEdit /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Organizers;
