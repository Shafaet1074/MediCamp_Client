import { useContext } from "react";
import { FaBookMedical } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Components/Providers/AuthProviders";


const Navabr = () => {
  const {LogOut,user} = useContext(AuthContext)
  console.log(user?.photoURL);
  return (
    <div className="navbar bg-[#92DCE5] rounded-lg">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow  rounded-box w-52 bg-[#92DCE5] ">
      <div className="flex items-center justify-center  pb-5 ">
        <FaBookMedical className="text-3xl" />
        <span className="self-center lg:text-3xl text-xl font-extrabold">Medi<span className="text-green-800 lg:text-3xl text-xl  font-extrabold">Camp</span></span>
		</div>
      <NavLink to='/'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black '}   > <li><a className="hover:bg-white">Home</a></li></NavLink>
       <NavLink to='/avalilablecamps'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black '}> <li><a className="hover:bg-white">Available Camps</a></li></NavLink>
       <NavLink to='/joinus'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black '}> <li><a className="hover:bg-white">Join Us</a></li></NavLink>
       
        
      </ul>
    </div>
    <a rel="noopener noreferrer" href="#" className="flex justify-center  lg:justify-start px-10 gap-2">
				<div className="flex items-center justify-center lg:visible invisible ">
        <FaBookMedical className="text-3xl" />
        <span className="self-center text-3xl font-extrabold">Medi<span className="text-green-800 text-3xl font-extrabold">Camp</span></span>
				</div>
				{/* <div className="lg:visible invisible">
       
        </div> */}
			</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

    
       <NavLink to='/'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black '}   > <li><a className="hover:bg-white">Home</a></li></NavLink>
       <NavLink to='/avalilablecamps'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black'}> <li><a>Available Camps</a></li></NavLink>
       <NavLink to='/joinus'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black'}> <li><a>Join Us</a></li></NavLink>
    </ul>
  </div>
  <div className="lg:navbar-end gap-5">
   <Link to='dashboard'> <h2 className="text-xl font-bold px-2 py-1 bg-teal-700 text-white rounded-lg">DashBoard</h2></Link>

   


   { user ?

<div className="dropdown dropdown-hover">
<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
  <div className="w-10 rounded-full">
    <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
  </div>
</div>
<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
  <li>
  <p>{user?.displayName}</p>
  </li>
  <button onClick={LogOut}> <li><a>Logout</a></li></button>
</ul>
</div>
   :
 
   <>
  <Link to='/login'> <a className="btn">Log In</a></Link>
   <Link to='/signup'> <a className="btn">Sign Up</a></Link>
  
 </>



 }

    
  </div>
</div>
  );
};

export default Navabr;