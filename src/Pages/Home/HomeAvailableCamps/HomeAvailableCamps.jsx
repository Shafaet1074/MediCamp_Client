import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AvailableCamp from "../../../Components/AvailableCamps/AvailableCamp";
import { Link } from "react-router-dom";


const HomeAvailableCamps = () => {
  const axiosSecure=useAxiosSecure();
 
  const {data:Homecamps=[]} =useQuery({
    queryKey:['Homecamps'],
    queryFn:async ()=>{
  const res=await axiosSecure.get('/camps');
    
      console.log(res.data);
      return res.data
    }
    })
  return (
    <div>
      <div className=" lg:text-center lg:space-y-4">
        <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
        Explore Our <span className="text-green-800">Availahle Camps</span>
        </h2>
        <p className="text-xl lg:text-3xl font-extralight text-gray-900">
        Explore a variety of health and wellness camps.From yoga retreats to fitness bootcamps, there's something for everyone.
        </p>
      </div>

      <div className="md:grid  lg:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-5  pt-20 p-2 gap-2">
    {
       Homecamps.slice(0,6)?.map(camp=><AvailableCamp
       key={camp._id}
       camp={camp}
       ></AvailableCamp>)
     }
    </div>

    <div className="text-center">
    <Link to='/avalilablecamps'><button className="btn btn-outline bg-green-800 text-white border-0 border-b-4 border-slate-900 mt-4"> See All </button></Link>
    </div>
    </div>

  );
};

export default HomeAvailableCamps;