import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AvailableCamp from "./AvailableCamp";
import img from "../../assets/free-medical-illustrations-05.png";
import { useState } from "react";
import { FaThLarge, FaTh } from "react-icons/fa";

const AvailableCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [layout, setLayout] = useState("three-columns");

  const { data: camps = [] } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps");
      return res.data;
    },
  });

  const filteredCamps = camps.filter(
    (camp) =>
      camp.campname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.DateTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCamps = filteredCamps.sort((a, b) => {
    if (sortOption === "most-registered") {
      return b.Participantcount - a.Participantcount;
    } else if (sortOption === "camp-fees") {
      return a.campfees - b.campfees;
    } else if (sortOption === "alphabetical") {
      return a.campname.localeCompare(b.campname);
    } else {
      return 0;
    }
  });

  return (
    <div className="pb-16">

      {/* HERO SECTION */}
      <div
        className="relative h-[400px] w-full rounded-b-xl overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 to-transparent"></div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
            Explore <span className="text-[#55baef]">Available Camps</span>
          </h1>
          <p className="text-[#e9f6fd] md:text-lg text-sm max-w-xl mx-auto">
            Join health, wellness & medical camps under our MediCamps Initiative.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto mt-10 px-4 flex flex-col md:flex-row items-center gap-4 md:gap-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search camps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:flex-1 px-5 py-3 rounded-xl border border-[#26a6eb]/40 shadow-sm focus:border-[#26a6eb] focus:ring-2 focus:ring-[#26a6eb]/30 outline-none"
        />

        {/* Sort */}
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full md:w-48 px-4 py-3 rounded-xl border border-[#26a6eb]/40 shadow-sm focus:border-[#26a6eb] focus:ring-2 focus:ring-[#26a6eb]/30 outline-none"
        >
          <option value="">Sort By</option>
          <option value="most-registered">Most Registered</option>
          <option value="camp-fees">Camp Fees</option>
          <option value="alphabetical">Alphabetical</option>
        </select>

        {/* Layout Toggle */}
        <button
          onClick={() => setLayout(layout === "three-columns" ? "two-columns" : "three-columns")}
          className="flex items-center gap-2 bg-[#26a6eb] text-white px-5 py-3 rounded-xl hover:bg-[#55baef] transition shadow-md"
        >
          {layout === "three-columns" ? (
            <>
              <FaTh className="text-lg" /> 2 Columns
            </>
          ) : (
            <>
              <FaThLarge className="text-lg" /> 3 Columns
            </>
          )}
        </button>
      </div>

      {/* GRID */}
      <div
        className={`max-w-7xl mx-auto px-4 mt-12 grid gap-8 ${
          layout === "three-columns"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {sortedCamps.map((camp) => (
          <AvailableCamp key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
