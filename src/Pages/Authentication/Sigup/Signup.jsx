
import { Link } from 'react-router-dom';
import img from '../../../assets/admin-img.svg'

const Signup = () => {
  return (
    <div className="flex gap-10 p-20">
    <div className='w-1/2'>
      <img src={img} alt="" />
    </div>

    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 border-2 border-[#92DCE5] shadow-fuchsia-200 shadow-xl">
<h1 className="text-4xl font-bold text-center ">SigUp</h1>
<form noValidate="" action="" className="space-y-6">
  <div className="space-y-1 text-sm">
    <label htmlFor="username" className="block dark:text-gray-600 text-xl font-bold">Username</label>
    <input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
  </div>
  <div className="space-y-1 text-sm">
    <label htmlFor="username" className="block dark:text-gray-600 text-xl font-bold">Email</label>
    <input type="email" name="email" id="username" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
  </div>
  <div className="space-y-1 text-sm">
    <label htmlFor="username" className="block dark:text-gray-600 text-xl font-bold">PhotoUrl</label>
    <input type="text" name="PhotoUrl" id="PhotoUrl" placeholder="PhotoUrl" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
  </div>
  <div className="space-y-1 text-sm">
    <label htmlFor="password" className="block dark:text-gray-600 text-xl font-bold">Password</label>
    <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
    <div className="flex justify-end text-xs dark:text-gray-600">
     
    </div>
  </div>
  <button className="block w-full p-3 text-center rounded-lg font-bold text-2xl bg-[#92DCE5]">Log in</button>
</form>
<div className="flex items-center pt-4 space-x-1">
  <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
  <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
  <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
</div>
<div className="flex justify-center space-x-4">
  <button aria-label="Log in with Google" className="px-2 py-1 justify-center items-center gap-2 rounded-lg flex bg-[#92DCE5] text-black  ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
      <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
    </svg>
    Google
  </button>

  
</div>
<p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account?
 <Link to='/login'> <a rel="noopener noreferrer" href="#" className="underline dark:text-gray-800">Log In</a></Link>
</p>
</div>
  </div>
  );
};

export default Signup;