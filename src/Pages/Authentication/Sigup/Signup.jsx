
import { Link } from 'react-router-dom';
import img from '../../../assets/admin-img.svg'
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../../Components/Providers/AuthProviders';
import Swal from 'sweetalert2';

const Signup = () => {
  const {SignUpUser,updateUserProfile}=useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit
    } = useForm();

    const onSubmit = (data) =>{
      console.log(data);
      const email=data.email;
      const password=data.Password;
      const photoUrl=data.photoUrl;
      const username=data.username;
      SignUpUser(email,password) 
          .then(result =>{
            updateUserProfile(username,photoUrl)
            console.log(result);
            Swal.fire("Sign Up done");
  })

  .catch(error=>{
    alert(error.message)
    
  })
    }

  return (
    <div className="flex gap-10 p-20">
    <div className='w-1/2'>
      <img src={img} alt="" />
    </div>

    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 border-2 border-[#92DCE5] shadow-fuchsia-200 shadow-xl">
<h1 className="text-4xl font-bold text-center ">SigUp</h1>
<form   onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="space-y-6">
  <div className="space-y-1 text-sm">
    <label htmlFor="username" className="block dark:text-gray-600 text-xl font-bold">Username</label>
    <input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
     {...register("username")}
    />
  </div>
  <div className="space-y-1 text-sm">
    <label htmlFor="username" className="block dark:text-gray-600 text-xl font-bold">Email</label>
    <input type="email" name="email" id="username" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" 
    
    {...register("email", { required: true })}
    aria-invalid={errors.email ? "true" : "false"}
  />
  {errors.email?.type === "required" && (
    <p role="alert">First n is required</p>
  )}


  </div>
  <div className="space-y-1 text-sm">
    <label htmlFor="username" className="block dark:text-gray-600 text-xl font-bold">PhotoUrl</label>
    <input type="text" name="PhotoUrl" id="PhotoUrl" placeholder="PhotoUrl" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
     {...register("photoUrl")}
    />
  </div>
  <div className="space-y-1 text-sm">
    <label htmlFor="password" className="block dark:text-gray-600 text-xl font-bold">Password</label>
    <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" 
     {...register("Password")}
    />
    <div className="flex justify-end text-xs dark:text-gray-600">
     
    </div>
  </div>
  <button className="block w-full p-3 text-center rounded-lg font-bold text-2xl bg-[#92DCE5]">Sign Up</button>
</form>
<div className="flex items-center pt-4 space-x-1">
  <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
 
  <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
</div>

<p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account?
 <Link to='/login'> <a rel="noopener noreferrer" href="#" className="underline dark:text-gray-800">Log In</a></Link>
</p>
</div>
  </div>
  );
};

export default Signup;