import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/USeAxiosPublic";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamps = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });

    if (res.data.success) {
      const CampsItem = {
        campname: data.CampName,
        DateTime: data.DateTime,
        Description: data.Description,
        campfees: data.campfees,
        HealthcareProfessionalName: data.HealthcareProfessionalName,
        Partcipantcount: data.Partcipantcount,
        image: res.data.data.display_url,
        Location: data.Location,
        email: user?.email,
      };

      axiosSecure.post("/camps", CampsItem).then(() => {
        Swal.fire({
          icon: "success",
          title: "Camp Added Successfully!",
          confirmButtonColor: "#26a6eb",
        });
        reset();
      });
    }
  };

  return (
    <div className="min-h-screen  px-4 py-2">
      <div className="  bg-white  rounded-2xl ">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-3xl font-bold text-[#0A2540]">
            Add New <span className="text-[#26a6eb]">Medical Camp</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Provide essential information to publish a new health camp on MediCamps.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* GRID ROW 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Camp Name */}
            <div>
              <label className="text-sm font-semibold text-[#0A2540]">
                Camp Name
              </label>
              <input
                type="text"
                {...register("CampName", { required: true })}
                placeholder="Enter camp name"
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#26a6eb] outline-none"
              />
            </div>

            {/* Date & Time */}
            <div>
              <label className="text-sm font-semibold text-[#0A2540]">
                Date & Time
              </label>
              <input
                type="text"
                {...register("DateTime", { required: true })}
                placeholder="DD/MM/YYYY - Time"
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#26a6eb] outline-none"
              />
            </div>
          </div>

          {/* GRID ROW 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Camp Fees */}
            <div>
              <label className="text-sm font-semibold text-[#0A2540]">
                Camp Fees
              </label>
              <input
                type="text"
                {...register("campfees", { required: true })}
                placeholder="Enter fee"
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#26a6eb] outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-semibold text-[#0A2540]">
                Location
              </label>
              <input
                type="text"
                {...register("Location", { required: true })}
                placeholder="Enter location"
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#26a6eb] outline-none"
              />
            </div>
          </div>

          {/* GRID ROW 3 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Healthcare Professional Name */}
            <div>
              <label className="text-sm font-semibold text-[#0A2540]">
                Healthcare Professional
              </label>
              <input
                type="text"
                {...register("HealthcareProfessionalName", { required: true })}
                placeholder="Doctor / Specialist name"
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#26a6eb] outline-none"
              />
            </div>

            {/* Participant Count */}
            <div>
              <label className="text-sm font-semibold text-[#0A2540]">
                Participant Count
              </label>
              <input
                type="number"
                {...register("Partcipantcount", { required: true })}
                placeholder="Expected participants"
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#26a6eb] outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-[#0A2540]">
              Description
            </label>
            <textarea
              {...register("Description", { required: true })}
              rows="5"
              placeholder="Write a brief description about this camp..."
              className="mt-1 w-full p-4 border rounded-xl focus:ring-2 focus:ring-[#26a6eb] outline-none"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-semibold text-[#0A2540]">
              Upload Camp Banner
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="mt-2 w-full p-3 border rounded-xl bg-gray-50 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-xl font-bold rounded-xl text-white bg-gradient-to-r from-[#26a6eb] to-[#55baef] hover:opacity-90 transition"
          >
            Add Camp
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCamps;
