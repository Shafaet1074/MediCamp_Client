import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/USeAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddCamps = () => {

  const axiosPublic = useAxiosPublic();

  const axiosSecure=useAxiosSecure();
  const { user } = useContext(AuthContext);
 
  const {
    register,
    formState: { errors },
    handleSubmit , reset
    } = useForm();

    const onSubmit = async (data) =>{
      const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
      console.log(res.data);
      console.log(data);
      if (res.data.success) {
        // now send the menu item data to the server with the image url
        const CampsItem = {
            campname: data.CampName,
            DateTime: data.DateTime,
            Description: data.Description,
            campfees: data.campfees,
            HealthcareProfessionalName: data.HealthcareProfessionalName,
            Partcipantcount:data.Partcipantcount,
            image: res.data.data.display_url,
            Location:data.Location,
            email:user?.email
        }
      

      axiosSecure.post('/camps',CampsItem)
        .then(res=>{
          console.log(res.data);
          reset();
          Swal.fire("Added Camps ");
    })
  
  }
}

  return (
    <div className='lg:p-20 p-2 min-h-screen bg-[#D6EDFF]'>
    <div className="min-h-screen shadow-2xl border-emerald-800 rounded-lg p-10 space-y-4 ">
  <div className="mb-10"> 
  <h2 className="lg:text-5xl text-xl text-black text-center font-bold  ">Add New  <span className="text-green-800">Medical Camp</span></h2>
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
{...register("DateTime", { required: true })}
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
{...register("Location", { required: true })}
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
<textarea name="Description" id="" cols="70"  rows="5"
 {...register("Description", { required: true })}
></textarea>
</label>
    </div>
   
    </div>

    
   
    
    
  
   <input type="submit" value="Add Camps"  className="w-full px-2 py-2 text-2xl font-bold bg-green-800 rounded-lg text-white"
  
   />
   

   </form>
 </div>
  </div>
  );
};

export default AddCamps;