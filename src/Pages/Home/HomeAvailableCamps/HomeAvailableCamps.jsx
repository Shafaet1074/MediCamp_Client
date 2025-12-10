import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AvailableCamp from "../../../Components/AvailableCamps/AvailableCamp";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Components/Providers/AuthProviders";
import { useContext } from "react";
import Swal from "sweetalert2";

const HomeAvailableCamps = () => {
  const axiosSecure = useAxiosSecure();
   const {user} =useContext(AuthContext);

  const { data: Homecamps = [] } = useQuery({
    queryKey: ["Homecamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps");
      return res.data;
    },
  });

  return (
    <section className="bg-white">
      {/* Hero / Header */}
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-0">
          Explore Our <span className="text-[#26a6eb]">Health Camps</span>
        </h2>
        {/* <p className="text-lg sm:text-md text-gray-600 max-w-2xl mx-auto">
          Discover wellness retreats, fitness bootcamps, and medical camps designed 
          to improve your health and well-being. Join a camp today and take the first 
          step towards a healthier lifestyle.
        </p> */}
      </div>

      {/* Camps Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Homecamps.slice(0, 6)?.map((camp) => (
            <AvailableCamp key={camp._id} camp={camp} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
    <div className="text-center py-8">
  <button
    onClick={() => {
      if (!user) {
        Swal.fire({
          title: "Login Required",
          text: "Please login to access all available camps.",
          icon: "warning",
          confirmButtonColor: "#26a6eb",
        });
        return;
      }
      window.location.href = "/availablecamps";
    }}
    className="px-8 py-3 bg-[#26a6eb] hover:bg-[#55baef] text-white font-semibold rounded-lg shadow-md transition duration-300"
  >
    See All Camps
  </button>
</div>

    </section>
  );
};

export default HomeAvailableCamps;
