import { useContext } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCamps from "../../../Hooks/useCamps";
import { AuthContext } from "../../Providers/AuthProviders";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const RegisteredCamps = () => {
  const [hookcamps, refetch] = useCamps();
  const totalPrice = hookcamps.reduce((total, item) => total + parseFloat(item.campfees), 0);
  console.log(totalPrice);

    const axiosSecure = useAxiosSecure();
    const {user} =useContext(AuthContext);
    
    const handleDelete = id => {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {

              axiosSecure.delete(`/carts/${id}`)
                  .then(res => {
                      if (res.data.deletedCount > 0) {
                          refetch();
                          Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success"
                          });
                      }
                  })
          }
      });
  }

  return (
    <div className="space-y-6">
    <div className="lg:p-10 lg:text-center lg:space-y-4 space-y-8">
     <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5  ">Your   <span className="text-green-800">Registered Camps</span></h2>
     <p className=" text-xl lg:text-3xl font-extralight text-gray-900">Explore and manage all the camps you have signed up for, all in one convenient location.</p>
     </div>

    <div className="text-2xl text-gray-600 font-bold  space-y-2  pb-5 lg:flex lg:justify-evenly lg:items-center">
    <p>Your Total Registered Items : {hookcamps.length}</p> 
    <p>Your TotalFees : BDT {totalPrice}</p> 
   <Link to='/dashboard/payment'> <button className=" px-5 py-1 justify-center text-white bg-green-500 rounded-lg hover:bg-green-800 ">Pay</button></Link>
    </div>
    <div className="overflow-x-auto lg:px-10 px-2 ">
        <table className="table  lg:w-full w-1/2 bg-green-600 text-xl text-white ">
            {/* head */}
            <thead>
                <tr className="text-2xl text-white">
                    <th>
                        #
                    </th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    hookcamps.map((item, index) => <tr key={item._id}>

                      {console.log(item)}
                        <th>
                            {index + 1}
                        </th>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={item?.Image} alt="" />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {item.campname}
                        </td>
                        <td>BDT {item.campfees}</td>
                        <th>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-ghost btn-lg">
                                <FaTrashAlt className="text-red-600"></FaTrashAlt>
                            </button>
                          
                        </th>
                    </tr>)
                }


            </tbody>
        </table>
    </div>
</div>
  );
};

export default RegisteredCamps;
