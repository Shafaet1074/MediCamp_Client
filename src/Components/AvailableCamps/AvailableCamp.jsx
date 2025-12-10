import { FaLocationPin, FaUserDoctor } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

const AvailableCamp = ({ camp }) => {
  const {
    campname,
    DateTime,
    campfees,
    Participantcount,
    image,
    HealthcareProfessionalName,
    Description,
    Location,
    _id,
  } = camp;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#26a6eb] hover:shadow-2xl transition-all duration-300">
      
      {/* Camp Image */}
      <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={campname}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-[#26a6eb] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md">
          {new Date(DateTime).toLocaleDateString()}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between space-y-3">
        
        {/* Camp Name */}
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{campname}</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">{Description}</p>

        {/* Location & Fees */}
        <div className="flex justify-between items-center text-gray-700 mt-2">
          <div className="flex items-center gap-1">
            <FaLocationPin className="text-[#55baef]" />
            <span className="text-sm">{Location}</span>
          </div>
          <div className="flex items-center gap-1">
            <TbCoinTaka className="text-[#55baef]" />
            <span className="text-sm">{campfees} BDT</span>
          </div>
        </div>

        {/* Participants & Doctor */}
        <div className="flex justify-between items-center text-gray-700 mt-1">
          <div className="flex items-center gap-1">
            <BsPeopleFill className="text-blue-500" />
            <span className="text-sm">{Participantcount || 0} participants</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUserDoctor className="text-[#55baef]" />
            <span className="text-sm">{HealthcareProfessionalName}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/campdetails/id/${_id}`}>
          <button className="w-full mt-4 py-2 bg-[#26a6eb] hover:bg-[#55baef] text-white font-semibold rounded-lg shadow-md transition duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AvailableCamp;
