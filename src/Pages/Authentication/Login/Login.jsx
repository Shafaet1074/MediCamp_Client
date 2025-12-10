
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../../assets/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-free-vector.jpg'
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../../Components/Providers/AuthProviders';
import Swal from 'sweetalert2';
const Login = () => {
  const {LoginUser,googleLogIn}=useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
     register,
     formState: { errors },
     handleSubmit
     } = useForm();
  const onSubmit = (data) =>{
     const email=data.email;
     const password=data.Password;
     console.log(email,password);
     LoginUser(email,password)
     .then(result =>{
     console.log(result);
     Swal.fire({
      title: 'User Login Successful.',
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
      }
  });
  navigate(from, { replace: true });
  })

  .catch(error=>{
    alert(error.message)
    
  })



}

const handleSocialLogin = async () =>{
  try{
   const result = await googleLogIn()
   
      console.log(result);
      Swal.fire({
        title: 'User Login Successful.',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
      navigate(from, { replace: true });
    }

 catch(error){
   alert(error.message)
 }
}

  return (
  <div className="min-h-screen flex items-center justify-center p-6 mb-20">

    <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white  rounded-3xl overflow-hidden border border-[#26a6eb]/20">

      {/* LEFT SIDE — Illustration */}
      <div className="lg:w-1/2 bg-[#26a6eb]/10 p-10 flex items-center justify-center">
        <img
          src={img}
          alt="MediCamps Login Illustration"
          className="rounded-2xl drop-shadow-lg"
        />
      </div>

      {/* RIGHT SIDE — Login Form */}
      <div className="lg:w-1/2 p-10 space-y-8">

        {/* Logo + Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#0A2540] tracking-tight">
            Welcome to <span className="text-[#26a6eb]">MediCamps</span>
          </h1>
          <p className="text-[#0A2540]/60">
            Join health camps, track your progress & stay well.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0A2540]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-[#26a6eb]/40 focus:border-[#26a6eb] focus:ring-2 focus:ring-[#26a6eb]/30 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0A2540]">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("Password")}
              className="w-full px-4 py-3 rounded-xl border border-[#26a6eb]/40 focus:border-[#26a6eb] focus:ring-2 focus:ring-[#26a6eb]/30 outline-none transition"
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full py-3 rounded-xl bg-[#26a6eb] hover:bg-[#55baef] text-white text-lg font-semibold shadow-md transition-all"
          >
            Log In
          </button>
        </form>

        {/* Social Login */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleSocialLogin}
            className="w-full py-3 rounded-xl bg-white border border-[#26a6eb]/40 flex items-center justify-center gap-3 text-[#0A2540] font-semibold hover:bg-[#26a6eb]/10 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 32 32">
              <path
                fill="currentColor"
                d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"
              />
            </svg>
            Login with Google
          </button>
        </div>

        {/* Sign Up */}
        <p className="text-center text-sm text-[#0A2540]/70">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#26a6eb] hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  </div>
);

};

export default Login;