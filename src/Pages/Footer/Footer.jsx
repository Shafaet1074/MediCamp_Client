import { FaBookMedical } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0A2540] text-white mt-40 pt-32 relative">

      {/* CTA Section */}
      <div className="absolute -top-36 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-6">
        <div className="bg-[#E8F5F0] rounded-2xl shadow-xl p-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0A2540]">
            Join <span className="text-[#26a6eb]">MediCamps</span>
          </h2>

          <p className="mt-3 text-gray-700 md:text-lg text-sm max-w-2xl mx-auto">
            Be a part of our mission to provide accessible healthcare.
            Volunteers, doctors, and supporters—your involvement matters.
          </p>

          <Link to="/signup">
            <button className="mt-6 px-10 py-3 bg-[#26a6eb] hover:bg-[#26a6eb] text-white rounded-xl font-semibold transition">
              Get Involved
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Main */}
      <div className="max-w-7xl mx-auto px-6 pb-16 pt-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaBookMedical className="text-4xl text-[#26a6eb]" />
            <span className="text-3xl font-extrabold tracking-tight">
              Medi<span className="text-[#26a6eb]">Camps</span>
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            Making healthcare accessible through medical camps, awareness
            programs, and volunteer-driven initiatives.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-[#26a6eb]">Explore</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link className="hover:text-white" to="/">Home</Link></li>
            <li><Link className="hover:text-white" to="/availablecamps">Available Camps</Link></li>
            <li><Link className="hover:text-white" to="/joinus">Join Us</Link></li>
            <li><Link className="hover:text-white" to="/aboutus">About Us</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-[#26a6eb]">Support</h3>
          <ul className="space-y-3 text-gray-300">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-[#26a6eb]">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="w-10 h-10 flex items-center justify-center bg-[#26a6eb] hover:bg-[#26a6eb] rounded-full transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              className="w-10 h-10 flex items-center justify-center bg-[#26a6eb] hover:bg-[#26a6eb] rounded-full transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com"
              className="w-10 h-10 flex items-center justify-center bg-[#26a6eb] hover:bg-[#26a6eb] rounded-full transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MediCamps. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
