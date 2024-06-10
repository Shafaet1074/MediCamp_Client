import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/USeAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
  


  const axiosSecure=useAxiosSecure();

  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit , reset
    } = useForm();

    
    const handleUpdate = async (ProfileData) => {
      try {
        const res = await axiosSecure.patch(`/carts/${id}`, ProfileData);
        console.log('Response data:', res.data); // Log the entire response for inspection
    
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Profile updated successfully',
            showConfirmButton: false,
            timer: 1500
          });
          reset();
        } else {
          throw new Error('Failed to update profile');
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

    const onSubmit = async (data) =>{
      
     
      console.log(data);

      reset();
     

        const ProfileData = {
          age: data.Age,
          phoneNumber:data.Phonenumber
      }

       await  handleUpdate(ProfileData);
    

     



      


    }
  return (
    <div className='p-20 min-h-screen bg-[#D6EDFF]'>
    <div className="min-h-screen shadow-2xl border-emerald-800 rounded-lg p-10 space-y-4 ">
  <div className="mb-10"> 
  <h2 className="text-5xl text-black text-center font-bold  ">Update  <span className="text-green-800">Your Profile </span></h2>
  </div>
   <form

    onSubmit={handleSubmit(onSubmit)} 
    
    >
   {/* form name and quantity row */}

   <div className="md:flex md:gap-5 mb-8">
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl"> Age </span>
     </label>
    <label className="flex items-center gap-2">

<input type="number" name="Age" className="input input-bordered w-full " placeholder="Age" 
{...register("Age", { required: true })}
/>
</label>
    </div>
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Phone Number </span>
     </label>
    <label className="flex items-center gap-2">

<input type="number" name="phonenumber" className="input input-bordered w-full " placeholder="Phone number" 
{...register("Phonenumber", { required: true })}
/>
</label>
    </div>
    </div>
    
    


    
   
    

  



     {/* form category and details row */}
     
   

    


     {/* form  photo url row */}
   

    

    

     {/* <div className="form-control w-full my-16">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full "  placeholder="Image"/>
                    </div> */}



    
   
    
    
  
   <input type="submit" value="Update Profile"  className="w-full px-2 py-2 text-2xl font-bold bg-green-800 rounded-lg text-white"
  
   />
   

   </form>
 </div>
  </div>
  );
};

export default UpdateProfile;