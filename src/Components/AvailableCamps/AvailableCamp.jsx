import { FaUserDoctor } from "react-icons/fa6";
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

  const {campname,DateTime,campfees,Partcipantcount,image,HealthcareProfessionalName,Description
  }=camp;
  const {user} =useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCamps();
  const [isAdmin]=useAdmin();

  const handleAddToCart = () => {

    if(isAdmin){
      Swal.fire('Admin can not Registered Camps')
    }
    else{
    if (user && user.email) {
        //send cart item to the database
        const CampsItem = {
          email: user.email,
          campname:campname,
          DateTime: DateTime,
          Description: Description,
          campfees: campfees,
          HealthcareProfessionalName: HealthcareProfessionalName,
          Partcipantcount:Partcipantcount,
          Image:image
          
      }
        axiosSecure.post('/carts', CampsItem)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${campname} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // refetch cart to update the cart items count
                    refetch();
                }

            })
    }
    else {
        Swal.fire({
            title: "You are not Logged In",
            text: "Please login to add to the cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, login!"
        }).then((result) => {
            if (result.isConfirmed) {
                //   send the user to the login page
                navigate('/login', { state: { from: location } })
            }
        });
    }
  }
}

  return (
    <div className="card   shadow-xl space-y-5 border-x-4 border-y-4 border-[#A6E1FA] bg-slate-300 p-5 w-auto h-[550px]">
    <figure><img src={image} alt="Shoes" /></figure>
    <div className="card-body">
      <div className=" flex justify-between">

      <div className="flex items-center gap-1">
      <TbCoinTaka className="text-3xl" />

     {/* <span className="">  {location}  </span> */}
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
     <div className="flex justify-between ">
     <div className="flex items-center gap-1">
     <BsPeopleFill  className="text-3xl" /> 
     <span className="">  {Partcipantcount} persons </span>
     </div>
      <div  className="flex items-center gap-1">
      <FaUserDoctor   className="text-3xl"/> 
      <span className="">  {HealthcareProfessionalName} </span>
      </div>
     </div>
      <div className="card-actions justify-start pt-5">
        <button className=" btn btn-outline bg-slate-100 border-0 border-b-4 border-slate-900 mt-4">View Detail</button>
        <button
                        onClick={handleAddToCart}
                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-slate-900 mt-4"
                    >Register Camps</button>
      </div>
    </div>
  </div>
  
  );
};

export default AvailableCamp;