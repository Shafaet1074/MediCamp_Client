import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/carts/item/${id}`);

        console.log(res.data)
        if (res.data) {
          // Set form default values
          reset({
            Age: res.data.age || "",
            Phonenumber: res.data.phoneNumber || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load profile data!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, axiosSecure, reset]);

 const handleUpdate = async (ProfileData) => {
  try {
    const res = await axiosSecure.patch(`/carts/${id}`, ProfileData);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      // Refetch data
     const updated = await axiosSecure.get(`/carts/item/${id}`);

      reset({
        Age: updated.data.age || "",
        Phonenumber: updated.data.phoneNumber || "",
      });
    } else {
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong while updating your profile!",
    });
  }
};


  const onSubmit = async (data) => {
    const ProfileData = {
      age: data.Age,
      phoneNumber: data.Phonenumber,
    };
    await handleUpdate(ProfileData);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#0A2540] text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-6 md:p-12 ">
      <div className="w-full max-w-3xl bg-white rounded-2xl p-10 space-y-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0A2540]">
            Update <span className="text-[#26a6eb]">Your Profile</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Keep your details up-to-date to join health camps
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Age & Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#0A2540] font-medium mb-2">Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                {...register("Age", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#26a6eb] focus:border-[#26a6eb]"
              />
              {errors.Age && (
                <span className="text-red-500 text-sm mt-1 block">
                  Age is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-[#0A2540] font-medium mb-2">
                Phone Number
              </label>
              <input
                type="number"
                placeholder="Enter your phone number"
                {...register("Phonenumber", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#26a6eb] focus:border-[#26a6eb]"
              />
              {errors.Phonenumber && (
                <span className="text-red-500 text-sm mt-1 block">
                  Phone number is required
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#26a6eb] hover:bg-[#55baef] text-white font-bold py-3 rounded-xl transition-colors duration-300 text-lg"
          >
            Update Profile
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          * Your profile information will be used to register you in MediCamps health camps.
        </p>
      </div>
    </div>
  );
};

export default UpdateProfile;
