import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Components/Providers/AuthProviders";
import { FaStethoscope, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { LogOut, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const handleLogout = () => {
    LogOut();
    setOpen(false);
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* BRAND LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <FaStethoscope className="text-3xl text-[#26a6eb]" />
            <span className="text-2xl font-extrabold text-gray-800">
              Medi<span className="text-[#26a6eb]">Camp</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-semibold transition ${
                  isActive
                    ? "text-[#26a6eb]"
                    : "text-gray-700 hover:text-[#26a6eb]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/availablecamps"
              className={({ isActive }) =>
                `text-lg font-semibold transition ${
                  isActive
                    ? "text-[#26a6eb]"
                    : "text-gray-700 hover:text-[#26a6eb]"
                }`
              }
            >
              Camps
            </NavLink>

            <NavLink
              to="/joinus"
              className={({ isActive }) =>
                `text-lg font-semibold transition ${
                  isActive
                    ? "text-[#26a6eb]"
                    : "text-gray-700 hover:text-[#26a6eb]"
                }`
              }
            >
              Join Us
            </NavLink>
          </div>

          {/* USER AUTH SECTION */}
  

<div className="flex items-center gap-4">
  {user ? (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full ring-4 ring-[#26a6eb] overflow-hidden flex items-center justify-center bg-[#26a6eb] text-gray-500"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUser className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-60 bg-white border shadow-lg rounded-lg py-2 z-20">
          <div className="px-4 py-2">
            <p className="font-semibold">{user.displayName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <hr />
          <Link
            to="/dashboard"
            className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="hidden lg:flex gap-3">
      <Link
        to="/login"
        className="px-4 py-2 rounded-lg border-[#26a6eb] border-2 text-[#26a6eb] hover:text-white hover:bg-[#26a6eb] font-medium transition"
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 rounded-lg bg-[#26a6eb] text-white hover:bg-[#55baef] font-medium transition"
      >
        Sign Up
      </Link>
    </div>
  )}
</div>

        </div>

        {/* MOBILE DROPDOWN MENU */}
        {open && (
          <div className="lg:hidden pb-4 space-y-3">
            <NavLink
              to="/"
              className="block text-lg font-medium text-gray-700 hover:text-[#26a6eb]"
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/availablecamps"
              className="block text-lg font-medium text-gray-700 hover:text-[#26a6eb]"
              onClick={() => setOpen(false)}
            >
              Camps
            </NavLink>

            <NavLink
              to="/joinus"
              className="block text-lg font-medium text-gray-700 hover:text-[#26a6eb]"
              onClick={() => setOpen(false)}
            >
              Join Us
            </NavLink>

            {!user && (
              <div className="flex gap-3 pt-3">
                <Link
                  to="/login"
                  className="flex-1 py-2 rounded-lg bg-[#26a6eb] text-white text-center"
                  onClick={() => setOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 py-2 rounded-lg bg-[#26a6eb] text-white text-center"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
