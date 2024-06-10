import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaLocationPin, FaUserDoctor } from "react-icons/fa6";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { AuthContext } from "../Providers/AuthProviders";
import useAdmin from "../../Hooks/useAdmin";
import Swal from "sweetalert2";

const Campdetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin] = useAdmin();

  const { data: campdetails = [], refetch } = useQuery({
    queryKey: ['campdetails'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/campdetails/id/${id}`);
      console.log(res.data);
      return res.data;
    }
  });

  console.log(campdetails.Partcipantcount);

  const [showModal, setShowModal] = useState(false);
  const [participantInfo, setParticipantInfo] = useState({
    age: "",
    phoneNumber: "",
    gender: "",
    emergencyContact: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParticipantInfo({ ...participantInfo, [name]: value });
  };

  const handleAddToCart = () => {
    if (isAdmin) {
      Swal.fire('Admin cannot register for camps');
    } else {
      if (user && user.email) {
        setShowModal(true);
      } else {
        Swal.fire({
          title: "You are not logged in",
          text: "Please login to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login!"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', { state: { from: location } });
          }
        });
      }
    }
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const participantCount = campdetails.Participantcount || 0;
      const updatedParticipantCount = participantCount + 1;
      
      const CampsItem = {
        email: user.email,
        campname: campdetails.campname,
        DateTime: campdetails.DateTime,
        Description: campdetails.Description,
        campfees: campdetails.campfees,
        HealthcareProfessionalName: campdetails.HealthcareProfessionalName,
        Participantcount: updatedParticipantCount, 
        Image: campdetails.image,
        paymentStatus: 'unpaid',
        ...participantInfo
      };
  
      // Update the participant count on the server
      await axiosSecure.patch(`/camps/${campdetails.campname}`, { Participantcount: updatedParticipantCount });
  
      // Add the camp details to the user's cart
      const res = await axiosSecure.post('/carts', CampsItem);
      
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${campdetails.campname} added to your cart`,
          showConfirmButton: false,
          timer: 1500
        });
        setShowModal(false);
        refetch();
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle error, show error message to user, etc.
      // You can use Swal or any other library to show error messages to the user
    }
  };

  return (
    <div className="p-10 lg:flex lg:gap-5 space-y-10">
      <div className="lg:w-1/2">
        <img className="w-full" src={campdetails.image} alt="" />
      </div>

      <div className="lg:w-1/2 space-y-2">
        <div className="flex justify-between lg:text-4xl md:text-xl ">
          <h2 className=" ">{campdetails.campname}</h2>
          <div className="flex items-center gap-1">
            <FaUserDoctor className="text-3xl" />
            <span className=""> {campdetails.HealthcareProfessionalName} </span>
          </div>
        </div>
        <hr className="h-1 text-green-800 bg-green-800 pt-1" />
        <h2 className="lg:text-4xl md:text-2xl text-xl">{campdetails.Description}</h2>
        <div className="flex gap-4 pt-2">
          <h2 className="px-2 py-2 rounded-lg bg-cyan-300">Camp Fees: {campdetails.campfees} </h2>
          <h2 className="px-2 py-2 rounded-lg bg-cyan-300">Participant Count: {campdetails.Participantcount} </h2>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <FaLocationPin></FaLocationPin>
          <span className=""> {campdetails.Location} </span>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <BsFillCalendarDateFill />
          <span className=""> {campdetails.DateTime} </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 rounded-lg bg-slate-900 text-2xl text-white items-center justify-center mt-4 pt-2"
        >
          Join Camp
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Join {campdetails.campname}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={participantInfo.age}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={participantInfo.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={participantInfo.gender}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                >
                  <option value="">Select</option>

                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={participantInfo.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-green-600 text-white"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campdetails;