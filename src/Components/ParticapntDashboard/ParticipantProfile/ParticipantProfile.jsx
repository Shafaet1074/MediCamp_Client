import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import useCamps from "../../../Hooks/useCamps";
import { Link } from "react-router-dom";
import { FaEdit, FaUserCircle } from "react-icons/fa";

const ParticipantProfile = () => {
  const { user } = useContext(AuthContext);
  const [hookcamps] = useCamps();

  return (
    <div className="space-y-10 pb-10">

      {/* ---------------------- Header ---------------------- */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#0A2540]">
          Participant <span className="text-[#26a6eb]">Profile</span>
        </h1>
   
      </div>

      {/* ---------------------- Profile Summary ---------------------- */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 border border-gray-100">
        <div className="flex justify-center lg:justify-start">
          <FaUserCircle className="text-7xl text-[#26a6eb]" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0A2540] text-center lg:text-left">
            {user?.displayName || "Participant"}
          </h2>
          <ProfileField value="Participant" />
        </div>
      </div>

      {/* ---------------------- Participation Header ---------------------- */}
      <div>
        <h2 className="text-xl font-semibold text-[#0A2540]">Joined Health Camps</h2>
        <p className="text-gray-500 text-sm">Your submitted details for each camp.</p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*                     MOBILE CARD LAYOUT (lg:hidden)                */}
      {/* ------------------------------------------------------------------ */}
      <div className="lg:hidden space-y-5">
        {hookcamps.length === 0 ? (
          <p className="text-center text-gray-500 py-5">
            No camp participation found.
          </p>
        ) : (
          hookcamps.map((camp) => (
            <div
              key={camp._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 space-y-3"
            >
              <h3 className="text-lg font-bold text-[#0A2540]">
                {user?.email}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <CardField label="Age" value={camp.age} />
                <CardField
                  label="Phone"
                  value={camp.phoneNumber || "Not Provided"}
                />
                <CardField
                  label="Gender"
                  value={camp.gender || "Not Specified"}
                />
              </div>

              <Link
                to={`/dashboard/updateprofile/${camp._id}`}
                className="block w-full text-center bg-[#26a6eb] text-white py-2 rounded-md hover:bg-[#55baef] transition font-medium"
              >
                Edit Details
              </Link>
            </div>
          ))
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*                     DESKTOP TABLE LAYOUT (hidden on mobile)       */}
      {/* ------------------------------------------------------------------ */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-[#26a6eb] text-white">
              <th className="px-5 py-3 text-left font-semibold">Email</th>
              <th className="px-5 py-3 text-left font-semibold">Age</th>
              <th className="px-5 py-3 text-left font-semibold">Phone</th>
              <th className="px-5 py-3 text-left font-semibold">Gender</th>
              <th className="px-5 py-3 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {hookcamps.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No participation records found.
                </td>
              </tr>
            ) : (
              hookcamps.map((camp, index) => (
                <tr
                  key={camp._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-[#55baef0d] transition`}
                >
                  <td className="px-5 py-4">{user?.email}</td>
                  <td className="px-5 py-4">{camp.age}</td>
                  <td className="px-5 py-4">{camp.phoneNumber || "Not Provided"}</td>
                  <td className="px-5 py-4">{camp.gender || "Not Specified"}</td>

                  <td className="px-5 py-4 text-center">
                    <Link
                      to={`/dashboard/updateprofile/${camp._id}`}
                      className="inline-flex items-center gap-2 bg-[#26a6eb] text-white px-3 py-1.5 rounded-md hover:bg-[#55baef] transition shadow-sm"
                    >
                      <FaEdit />
                      Edit
                    </Link>
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

const ProfileField = ({ value }) => (
  <p className="text-[#0A2540] font-medium text-center lg:text-left text-sm">
    {value}
  </p>
);

const CardField = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
    <p className="text-[#0A2540] font-semibold">{value}</p>
  </div>
);

export default ParticipantProfile;
