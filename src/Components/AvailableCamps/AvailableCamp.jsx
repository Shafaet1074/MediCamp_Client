import { FaUserDoctor } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { TbCoinTaka } from "react-icons/tb";
const AvailableCamp = ({camp}) => {

  const {campName,campFees,participantCount,image,healthcareProfessional,location,description
  }=camp;

  return (
    <div className="card  bg-[#5CC8FF] shadow-xl space-y-5 border p-5 w-auto h-[550px]">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
    <div className="card-body">
      <div className=" flex justify-between">

      <div className="flex items-center gap-1">
      <TbCoinTaka className="text-3xl" />

     <span className="">  {location}  </span>
     </div>


      <div className="flex items-center gap-1">
      <TbCoinTaka className="text-3xl" />

     <span className="">  {campFees} $ </span>
     </div>
      </div>
      <h2 className="card-title text-2xl">{campName}</h2>
      <p>{description
}
</p>
     <div className="flex justify-between ">
     <div className="flex items-center gap-1">
     <BsPeopleFill  className="text-3xl" /> 
     <span className="">  {participantCount} persons </span>
     </div>
      <div  className="flex items-center gap-1">
      <FaUserDoctor   className="text-3xl"/> 
      <span className="">  {healthcareProfessional} </span>
      </div>
     </div>
      <div className="card-actions justify-start pt-5">
        <button className=" px-2 py-1 bg-[black] text-white rounded-lg">View Detail</button>
      </div>
    </div>
  </div>
  
  );
};

export default AvailableCamp;