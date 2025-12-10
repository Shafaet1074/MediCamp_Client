import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";

const Doctor = ({ doctor }) => {
  return (
    <div className="max-w-s mx-auto w-full bg-white rounded-2xl border-white border-2 hover:shadow-xl transition-all duration-300 border border-gray-100 p-7 mb-30 ">
      
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#55baef] shadow-lg">
            <img
              src={doctor.image_url}
              alt={doctor.doctor_name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">
          {doctor.doctor_name}
        </h2>

        {/* Specialization Tag */}
        <p className="inline-block px-3 py-1 bg-green-50 text-[#26a6eb] text-sm font-medium rounded-full shadow-sm">
          {doctor.specialization}
        </p>

        {/* Experience */}
        {doctor.experience && (
          <div className="flex justify-center items-center space-x-2 text-gray-500 text-sm">
            <MdWork className="text-[#26a6eb]" />
            <span>{doctor.experience}+ Years Experience</span>
          </div>
        )}

        {/* Location */}
        <div className="flex justify-center items-center space-x-2 text-gray-600">
          <FaLocationDot className="text-red-500 text-lg" />
          <span className="font-medium">{doctor.location}</span>
        </div>

        {/* Availability */}
        {doctor.available && (
          <div className="flex justify-center items-center space-x-2 text-[#26a6eb] text-sm font-medium">
            <BsCalendarCheck className="text-[#26a6eb]" />
            <span>Available for Camps</span>
          </div>
        )}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-6">
        <button className="px-5 py-2 bg-[#26a6eb] text-white text-sm rounded-xl shadow-md hover:bg-green-700 transition-all duration-300">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Doctor;
