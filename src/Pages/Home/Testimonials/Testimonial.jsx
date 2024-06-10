import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ReactStars from "react-stars";

const Testimonial = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviewshome'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      console.log(res.data);
      return res.data;
    }
  });

  return (
    <div>
      <div className=" lg:text-center lg:space-y-4">
        <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold mt-10">
         What Our <span className="text-green-800">Client Say</span>
        </h2>
        <p className="text-xl lg:text-3xl font-extralight text-gray-900">
        Read below to see the experiences and feedback from some of our satisfied participants 
        </p>
      </div>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.slice(0,4)?.map(review => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center mx-24 my-8">
              <ReactStars
                count={5}
                value={review.rating}
                size={50}
                color2={'#ffd700'}
                edit={false}
              />
              <p className="lg:py-8">{review.feedback}</p>
              {/* <h3 className="text-2xl text-orange-400">{review.name}</h3> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
