import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useCamps from "../../../Hooks/useCamps";
import { FaEdit } from "react-icons/fa";

const ParticipantProfile = () => {

  const { user } = useContext(AuthContext);
  const [hookcamps, refetch] = useCamps();
  
  // const axiosSecure = useAxiosSecure();
 

  // const { data: userProfile = [] } = useQuery({
  //   queryKey: ['userProfile', user.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/carts/${user.email}`);
  //     return res.data;
  //   }
  // });

  console.log(hookcamps);
  console.log(user);
  return (
//    <div className="p-10">

//     <h2 className="text-center"> </h2>
    

// <div className="lg:p-10 lg:text-center lg:space-y-4 space-y-8">
//         <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
//         Manage Your <span className="text-green-800">Profile Details</span>
//         </h2>
//         <p className="text-xl lg:text-3xl font-extralight text-gray-900">
//         Review and update your personal information, keep an eye on your profile.
//         </p>
//       </div>

//       <div className="max-w-md p-8 sm:flex sm:space-x-6 mx-auto border-2 border-cyan-300 ">
// 	<div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
// 		<img src={userProfile?.image}alt="upload your photo" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
// 	</div>
// 	<div className="flex flex-col space-y-4">
// 		<div>
// 			<h2 className="text-2xl font-semibold">{userProfile.name}</h2>
	
// 		</div>
// 		<div className="space-y-1">
// 			<span className="flex items-center space-x-2">
// 				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
// 					<path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
// 				</svg>
// 				<span className="dark:text-gray-600">{userProfile.email}</span>
// 			</span>
// 			<span className="flex items-center space-x-2">
// 				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
// 					<path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
// 				</svg>
// 				<span className="dark:text-gray-600">{userProfile.phonenumber || 'Please Update Your Phonenumber '}</span>
// 			</span>

//     <div className="">
//    <Link to='/dashboard/updateprofile'> <button className="px-4 py-2   bg-green-500 rounded-lg ">Update</button></Link>
//     </div>
// 		</div>
// 	</div>
// </div>
//    </div>

<div>
<div className="lg:p-10 lg:text-center lg:space-y-4 space-y-8">
  <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
    Your <span className="text-green-800">Payment History</span>
  </h2>
  <p className="text-xl lg:text-3xl font-extralight text-gray-900">
  Keep track of all your past transactions in one place. View detailed records of your payments.
  </p>
</div>

<div className="overflow-x-auto">
  <table className="table font-bold text-white p-10 bg-green-500">
    <thead>
      <tr className="text-white font-bold text-xl">
        <th>Email</th>
        <th>Age</th>
        <th>PhoneNumber</th>
        <th>Gender</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {hookcamps.map((camp, index) => (
        <tr key={index}>
          <td>{user.email}</td>
          <td>{camp.age}</td>
          <td>{camp.phoneNumber}</td>
          {/* Assuming confirmation status is a field in the payment object */}
          <td>{camp.gender}</td>
          <td>
                  <Link to={`/dashboard/updateprofile/${camp._id}`}><button> <FaEdit className="text-green-800" /></button></Link>
                  
                </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  );
};

export default ParticipantProfile;