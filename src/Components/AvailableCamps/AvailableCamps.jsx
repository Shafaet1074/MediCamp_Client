import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AvailableCamp from "./AvailableCamp";
import img from '../../assets/free-medical-illustrations-05.png';
import { useState } from "react";

const AvailableCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [layout, setLayout] = useState("three-columns");

  const { data: camps = [] } = useQuery({
    queryKey: ['camps'],
    queryFn: async () => {
      const res = await axiosSecure.get('/camps');
      console.log(res.data);
      return res.data;
    }
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handleLayoutToggle = () => {
    setLayout(layout === "three-columns" ? "two-columns" : "three-columns");
  };

  const filteredCamps = camps.filter(camp =>
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
    <div>
      <div className="hero bg-cover bg-center lg:w-full h-screen rounded-lg" style={{ backgroundImage: `url(${img})` }}>
        <div className="hero-overlay bg-opacity-60 bg-cover bg-center h-screen"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="w-full text-center">
            <h1 className="lg:mb-5 text-5xl font-bold w-full">Available Camps</h1>
            <p className="mb-5 w-10/12 mx-auto">Explore a variety of health and wellness camps tailored to improve physical fitness, mental clarity, and overall well-being. From yoga retreats to fitness bootcamps, there's something for everyone.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-5">
        <input
          type="text"
          placeholder="Search camps..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered w-1/3"
        />
        <select onChange={handleSort} value={sortOption} className="select select-bordered w-1/4">
          <option value="">Sort By</option>
          <option value="most-registered">Most Registered</option>
          <option value="camp-fees">Camp Fees</option>
          <option value="alphabetical">Alphabetical Order</option>
        </select>
        <button onClick={handleLayoutToggle} className="btn btn-primary">
          Toggle Layout
        </button>
      </div>
      <div className={`grid ${layout === "three-columns" ? "lg:grid-cols-3 md:grid-cols-2 grid-cols-1" : "lg:grid-cols-2 md:grid-cols-2 grid-cols-1"} gap-5 p-2`}>
        {sortedCamps.map(camp => (
          <AvailableCamp key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
