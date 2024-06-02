import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


const ManageCamps = () => {
  const axiosSecure=useAxiosSecure();

  const {data:managecamps=[]} =useQuery({
    queryKey:['mnagecamps'],
    queryFn:async ()=>{
  const res=await axiosSecure.get('/camps');
    
      console.log(res.data);
      return res.data
    }
    })

    console.log(managecamps);

  return (
    <div className="bg-[#D6EDFF] p-10 min-h-screen">
     <h2 className="text-5xl text-black text-center pb-10 font-bold  ">Manage Your   <span className="text-green-800">Medical Camp</span></h2>
      <div className="overflow-x-auto">
  <table className="table text-xl bg-green-800 text-white">
    {/* head */}
    <thead className="text-white text-2xl  ">
      <tr>
        <th></th>
        <th>Name</th>
        <th>Date & Time</th>
        <th>Location</th>
        <th>HealthCare Professional</th>
        <th>Action</th>

      </tr>
    </thead>

    {
  managecamps.map((camp,index)=>

    <>
 <tbody>
      
      <tr>
        <th>{index+1}</th>
        <td>{camp.campName}</td>
        <td>{camp.dateTime}</td>
        <td>{camp.location}</td>
        <td>{camp.healthcareProfessional}</td>
        
       <div className="flex flex-row gap-2">
       <td><MdDelete /></td>
        <td><FaRegEdit /></td>
       </div>
        
      </tr>
      
   
      
    </tbody>
    
    </>
  )
}
    

  </table>
</div>
    </div>
  );
};

export default ManageCamps;