import { useQuery } from "@tanstack/react-query";
import Doctor from "./Doctor";


const Doctors = () => {
  const {data:doctors} =useQuery({
    queryKey:['featuredoctors'],
    queryFn: async()=>{
      const res = await fetch('/public.json');
      return res.json();
    }
  })

  console.log(doctors);

  return (
    <div>
       <div className=" lg:text-center lg:space-y-4 pt-5">
        <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
        Meet Our <span className="text-green-800">Expert Doctors</span>
        </h2>
        <p className="text-xl lg:text-3xl font-extralight text-gray-900">
        Explore the expertise of our distinguished medical professionals who lead the way in ensuring your well-being.
        </p>
      </div>
      <div className='lg:grid lg:grid-cols-3  md:grid md:grid-cols-2 md:gap-2 space-y-5 p-10'>
          {
            doctors?.map(doctor=><Doctor
            key={doctor.camp_name}
            doctor={doctor}
            ></Doctor>)
          }
        </div>
      
    </div>
  );
};

export default Doctors;