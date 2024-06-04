import { FaAd, FaBookMedical, FaCalendar, FaHome, FaPlus, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { GrSystem } from "react-icons/gr";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";


const Dashboard = () => {
  //TODO
  const isAdmin=false;
  return (
   <div className="">
     <div className="flex  ">
      <div className="w-96 lg:min-h-screen  bg-[#92DCE5] ">

      <a rel="noopener noreferrer" href="#" className="flex justify-center  lg:justify-start p-4 gap-2 mb-5 mt-5">
				<div className="flex items-center justify-center  ">
        <FaBookMedical className="text-3xl" />

				</div>
				<span className="self-center text-3xl font-extrabold">Medi<span className="text-green-800 text-3xl font-extrabold">Camp</span></span>
			</a>  
      <ul className="menu p-4 space-y-1 ">
        {
          isAdmin ?
          <>
            <li><NavLink to="/dashboard/organizers">
            <FaPerson className="text-2xl"></FaPerson>
            Organizer Profile.
            </NavLink></li>
          <li><NavLink to="/dashboard/addcamps">
            <FaPlus  className="text-2xl"></FaPlus>
            Add A Camp

            </NavLink></li>
          <li><NavLink to="/dashboard/managecamps">
          <GrSystem  className="text-2xl" />
            Manage Camps
            </NavLink></li>
          <li><NavLink to="/dashboard/review">
          <MdOutlineManageAccounts   className="text-2xl"  />
            Manage Registered Camps
            </NavLink></li>
          
          
          </>
          :
          <>
           <li><NavLink to="/dashboard/analytics">
           <MdOutlineManageAccounts   className="text-2xl"  />
            Analytics
            </NavLink></li>
          <li><NavLink to="/dashboard/participantprofile">
          <FaPerson className="text-2xl"></FaPerson>
            Participant Profile
            </NavLink></li>
          <li><NavLink to="/dashboard/registeredcamps">
          <GrSystem  className="text-2xl" />
          Registered Camps
            </NavLink></li>
          <li><NavLink to="/dashboard/paymenthistory
">
          <MdOutlinePayments  className="text-2xl"  />
          Payment History

            </NavLink></li>
          
          
          </>
        }
         
          

         <div className="divider"> </div>
         

            <li><NavLink to="/">
            <FaHome></FaHome>
             Home 
            </NavLink></li>
            
           
         
         </ul>
          
      </div>
      <div className="flex-1 px-1">
         <Outlet></Outlet> 
      </div>
      
    </div>
   </div>
  );
};

export default Dashboard;