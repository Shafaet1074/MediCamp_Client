import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddCamps = () => {

  const axiosSecure=useAxiosSecure();
 
  const {
    register,
    formState: { errors },
    handleSubmit
    } = useForm();

    const onSubmit = (data) =>{
      console.log(data);
      axiosSecure.post('/camps',data)
        .then(res=>{
          console.log(res.data);
          Swal.fire("Added Camps ");
    })
  
  }

  return (
    <div className='p-20 min-h-screen bg-[#D6EDFF]'>
    <div className="min-h-screen shadow-2xl border-emerald-800 rounded-lg p-10 space-y-4 ">
  <div className="mb-10"> 
  <h2 className="text-5xl text-black text-center font-bold  ">Add New  <span className="text-green-800">Medical Camp</span></h2>
  </div>
   <form onSubmit={handleSubmit(onSubmit)} >
   {/* form name and quantity row */}
    <div className="md:flex md:gap-5 mb-8">
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Camp Name </span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Camp Name" className="input input-bordered w-full " placeholder="Camp Name" 
{...register("CampName", { required: true })}
/>
</label>
    </div>
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Date & Time </span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Date&Time" className="input input-bordered w-full " placeholder="Camp Fees" 
{...register("Date&Time", { required: true })}
/>
</label>
    </div>
    </div>

    <div className="md:flex md:gap-5 mb-8">
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Camp Fees </span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Camp Fees" className="input input-bordered w-full " placeholder="Camp Fees" 
{...register("campfees", { required: true })}
/>
</label>
    </div>
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Location</span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Location" className="input input-bordered w-full " placeholder="Location" 
{...register("location", { required: true })}
/>
</label>
    </div>
    </div>
    <div className="md:flex md:gap-5 mb-8">
    
   
    </div>

    <div className="md:flex md:gap-5 mb-8">
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Healthcare Professional Name </span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Healthcare Professional Name" className="input input-bordered w-full " placeholder="Healthcare Professional Name" 
{...register("HealthcareProfessionalName", { required: true })}
/>
</label>
    </div>
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Participant count</span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Participant count" className="input input-bordered w-full " placeholder="Participant count"
{...register("Partcipantcount", { required: true })}
/>
</label>
    </div>


    </div>



     {/* form category and details row */}
     
   

    


     {/* form  photo url row */}
   

    

    

     <div className="form-control w-full my-16">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full "  placeholder="Image"/>
                    </div>

   <div className="mb-8">
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl"> Description</span>
     </label>
    <label className="flex items-center gap-2">

{/* <input type="text" name="ShortDescription" className="input input-bordered w-full " placeholder="Short Description" /> */}
<textarea name="Description" id="" cols="70"  rows="5"></textarea>
</label>
    </div>
   
    </div>

    
   
    
    
  
   <input type="submit" value="Add Camps"  className=" py-2 rounded-lg text-3xl font-bold bg-green-800 text-white hover:bg-emerald-900 hover:text-white mt-5 w-full"
   {...register("Description", { required: true })}
   />
   

   </form>
 </div>
  </div>
  );
};

export default AddCamps;