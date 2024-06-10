import { FaLocationPin } from "react-icons/fa6";

const Doctor = ({ doctor }) => {
  return (
    <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
        <img src={doctor.image_url} alt={doctor.doctor_name} className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">{doctor.doctor_name}</h2>
          <span className="text-sm dark:text-gray-600">{doctor.specialization}</span>
        </div>
        <div className="space-y-1">
          <span className="flex items-center space-x-2">
            <FaLocationPin />
            <span className="dark:text-gray-600">{doctor.location}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
