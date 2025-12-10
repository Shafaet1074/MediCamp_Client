import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { BsCalendar2EventFill } from "react-icons/bs";
import { AuthContext } from "../Providers/AuthProviders";
import useAdmin from "../../Hooks/useAdmin";
import Swal from "sweetalert2";
import useCamps from "../../Hooks/useCamps";

const Campdetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin] = useAdmin();


  const { data: campdetails = {}, refetch } = useQuery({
    queryKey: ["campdetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${id}`);
      return res.data;
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [participantInfo, setParticipantInfo] = useState({
    age: "",
    phoneNumber: "",
    gender: "",
    emergencyContact: "",
  });

  const handleAddToCart = () => {
    if (isAdmin) return Swal.fire("Admin cannot register for camps");

    if (!user?.email) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to join this camp",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#26a6eb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed)
          navigate("/login", { state: { from: location } });
      });
      return;
    }

    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParticipantInfo({ ...participantInfo, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    // collect final object
    const payload = {
      email: user?.email,
      campId: id,
      campname: campdetails.campname,
      campfees: campdetails.campfees,
      Image: campdetails.image,
      DateTime: campdetails.DateTime,
      campLocation: campdetails.Location,
      healthcareProfessional: campdetails.HealthcareProfessionalName,
      description: campdetails.Description,
      ...participantInfo,  // age, phoneNumber, gender, emergencyContact
    };

    const res = await axiosSecure.post(`/carts?email=${user.email}`, payload);

    if (res.data.insertedId) {
      setShowModal(false);

      Swal.fire({
        title: "Registration Successful!",
        text: "Let's redirect to Registered Camps to complete payment.",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/dashboard/registeredcamps");
      }, 2500);
    }

  } catch (error) {
    Swal.fire({
      title: "Registration Failed",
      text: error.message,
      icon: "error",
    });
  }
};



  return (
    <div className=" min-h-screen py-12 px-5 lg:px-16 mx-auto">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100">

        {/* Flex Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Image Section */}
          <div className="w-full">
            <img
              src={campdetails.image}
              alt=""
              className="rounded-xl shadow-md w-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-5">

            {/* Camp Title + Doctor */}
            <div className="flex justify-between items-start">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2540]">
                {campdetails.campname}
              </h2>

              <div className="flex items-center gap-2 text-[#26a6eb] font-semibold">
                <FaUserDoctor className="text-2xl" />
                {campdetails.HealthcareProfessionalName}
              </div>
            </div>

            <hr className="border-[#26a6eb]" />

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-lg">
              {campdetails.Description}
            </p>

            {/* Fees + Participants */}
            <div className="flex gap-4 pt-4">
              <span className="px-4 py-2 rounded-lg bg-[#26a6eb]/10 text-[#26a6eb] font-semibold">
                Camp Fee: {campdetails.campfees} BDT
              </span>
              <span className="px-4 py-2 rounded-lg bg-[#0A8C5E]/10 text-[#0A8C5E] font-semibold">
                Participants: {campdetails.Participantcount}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mt-4">
              <FaLocationDot className="text-[#26a6eb]" />
              <span className="text-lg">{campdetails.Location}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-600">
              <BsCalendar2EventFill className="text-[#26a6eb]" />
              <span className="text-lg">{campdetails.DateTime}</span>
            </div>

            {/* Join Button */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-6 py-3 text-xl font-semibold text-white rounded-lg shadow-md transition bg-[#26a6eb] hover:bg-[#55baef]"
            >
              Join Camp
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-xl p-8 animate-[fadeIn_0.25s_ease]">

      {/* Header */}
      <h2 className="text-3xl font-semibold text-[#0A2540] mb-1">
        Complete Your Registration
      </h2>
      <p className="text-gray-600 mb-6">
        Please provide the required details so you can join MediCamps health programs.
      </p>

      <form  className="space-y-5 " onSubmit={handleSubmit}>

        {/* Age */}
        <div className="flex flex-col">
          <label className="font-medium text-[#0A2540] mb-1">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26a6eb]"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="font-medium text-[#0A2540] mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Your active phone number"
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26a6eb]"
            required
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="font-medium text-[#0A2540] mb-1">Gender</label>
          <select
            name="gender"
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:text-black focus:ring-2 "
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Emergency Contact */}
        <div className="flex flex-col">
          <label className="font-medium text-[#0A2540] mb-1">Emergency Contact</label>
          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency contact number"
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 "
            required
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-5 py-2 rounded-lg border border-[#26a6eb] text-[#26a6eb] hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#26a6eb] text-white font-medium hover:bg-[#55baef] transition"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Campdetails;
