import { FaLocationPin, FaUserDoctor } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { TbCoinTaka } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCamps from "../../Hooks/useCamps";
import Swal from "sweetalert2";
import useAdmin from "../../Hooks/useAdmin";
const AvailableCamp = ({camp}) => {

  const {campname,DateTime,campfees,
    Participantcount,image,HealthcareProfessionalName,Description,
    Location,_id
  }=camp;
  const {user} =useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  // const [, refetch] = useCamps();
  const [isAdmin]=useAdmin();
  

 

  return (
    <div className="card   shadow-xl space-y-5 border-x-4 border-y-4 border-[#A6E1FA] bg-slate-300 p-5 lg:w-auto  lg:h-[550px]">
    <figure><img src={image} alt="Shoes" className="w-full" /></figure>
    <div className="card-body">
      <div className="lg:flex lg:justify-between space-y-4">

      <div className="flex items-center gap-1">
      <FaLocationPin className="text-3xl" />

     <span className="">  {Location}  </span>
     </div>


      <div className="flex items-center gap-1">
      <TbCoinTaka className="text-3xl" />

     <span className="">  {campfees} $ </span>
     </div>
      </div>
      <h2 className="card-title text-2xl">{campname}</h2>
      <p>{Description
}
</p>
     <div className="lg:flex lg:justify-between space-y-4 ">
     <div className="flex items-center gap-1">
     <BsPeopleFill  className="text-3xl" /> 
     <span className="">  {
Participantcount || 0} persons </span>
     </div>
      <div  className="flex items-center gap-1">
      <FaUserDoctor   className="text-3xl"/> 
      <span className="">  {HealthcareProfessionalName} </span>
      </div>
     </div>
      <div className="card-actions justify-start pt-5">
       <Link to={`/campdetails/id/${_id}`}> <button className=" btn btn-outline bg-slate-100 border-0 border-b-4 border-slate-900 mt-4">View Detail</button></Link>
        {/* <button
                         onClick={handleAddToCart}
                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-slate-900 mt-4"
                    >Register Camps</button> */}
      </div>
    </div>
  </div>
  
  );
};

export default AvailableCamp;