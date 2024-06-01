import { Link, NavLink } from "react-router-dom";


const Navabr = () => {
  return (
    <div className="navbar bg-[#92DCE5] ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
      <NavLink to='/'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black '}   > <li><a className="hover:bg-white">Home</a></li></NavLink>
       <NavLink to='/avalilablecamps'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black '}> <li><a>Available Camps</a></li></NavLink>
       <NavLink to='/joinus'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black '}> <li><a>Join Us</a></li></NavLink>
        <li><a>Available Camps</a></li>
        <li><a>Join Us</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
       <NavLink to='/'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black '}   > <li><a className="hover:bg-white">Home</a></li></NavLink>
       <NavLink to='/avalilablecamps'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black'}> <li><a>Available Camps</a></li></NavLink>
       <NavLink to='/joinus'  className={({isActive})=> isActive?' border-2 border-[#A6E1FA] px-1   font-bold   text-xl rounded-lg' : 'font-bold text-xl text-black'}> <li><a>Join Us</a></li></NavLink>
    </ul>
  </div>
  <div className="navbar-end gap-2">
   <Link to='login'> <a className="btn">Log In</a></Link>
   <Link to='signup'> <a className="btn">Sign Up</a></Link>
    
  </div>
</div>
  );
};

export default Navabr;