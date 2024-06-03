import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";


const Organizers = () => {
  const axiosSecure=useAxiosSecure();
  const {user} =useContext(AuthContext) || {};
  console.log(user?.email);

  

  const {data:organizers=[]} =useQuery({
    queryKey:['organizers'],
    queryFn:async ()=>{
  const res=await axiosSecure.get('/camps');
    
      console.log(res.data);
      return res.data
    }
    })

    console.log(organizers);

  return (
    <div className="bg-[#D6EDFF] p-10 min-h-screen">
     <h2 className="text-5xl text-black text-center pb-10 font-bold  ">Manage Your   <span className="text-green-800">Medical Camp</span></h2>
      <div className="overflow-x-auto">
  <table className="table text-xl bg-green-800 text-white">
    {/* head */}
    <thead className="text-white text-2xl  ">
      <tr>
        <th></th>
        <th>Organizer Name</th>
        <th>Profile Picture</th>
        <th>Email</th>
       
        <th>Action</th>

      </tr>
    </thead>

    {
  organizers.map((organizer,index)=>

    <>
 <tbody>
      
      <tr>
        <th>{index+1}</th>
        <td>{organizer.healthcareProfessional}</td>
        <td>{organizer.image}</td> 
        {/* should add doctor image */}
        
        <td>{user?.email}</td>
        
        
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

export default Organizers;