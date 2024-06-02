import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AvailableCamp from "./AvailableCamp";
import img from '../../assets/free-medical-illustrations-05.png'


const AvailableCamps = () => {
  const axiosSecure=useAxiosSecure();
 
  const {data:camps=[]} =useQuery({
    queryKey:['camps'],
    queryFn:async ()=>{
  const res=await axiosSecure.get('/camps');
    
      console.log(res.data);
      return res.data
    }
    })

     
  

  return (
    <div>
      
    
      {/* <div className="flex p-10 gap-2">
      <div className="text-center mx-auto w-1/2">
     
     
     <img className="mx-auto text-center" src={img} alt="" />
     
    </div>
    <div className="w-1/2 text-center justify-center items-center my-auto">
    <h1 className="text-center md:text-4xl text-xl font-bold text-green-700  "> Explore the World of Ideas: AllBlogs</h1>
    <p className="text-center  md:text-3xl font-extralight text-xl text-gray-700">Step into our AllBlogs section, where a tapestry of perspectives, ideas, and expertise awaits.  </p>
    </div>
     
      </div> */}

<div className="hero   bg-cover  bg-center lg:w-full h-screen rounded-lg " style={{backgroundImage: `url(${img})` }}>
  <div className="hero-overlay bg-opacity-60 bg-cover bg-center h-screen "  ></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="w-full text-center">
      <h1 className="lg:mb-5 text-5xl font-bold w-full">Available Camps</h1>
      <p className="mb-5 w-10/12 mx-auto  ">Explore a variety of health and wellness camps tailored to improve physical fitness, mental clarity, and overall well-being. From yoga retreats to fitness bootcamps, there's something for everyone.</p>
      
    </div>
  </div>
</div>
    <div className="md:grid  lg:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-5  pt-20 p-2 gap-2">
    {
       camps.map(camp=><AvailableCamp
       key={camp._id}
       camp={camp}
       ></AvailableCamp>)
     }
    </div>
    </div>
  );
};

export default AvailableCamps;