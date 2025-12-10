import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

import ReactStars from "react-stars";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Testimonial = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviewshome"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  return (
    <section className="bg-gray-50 lg:py-20 py-10 relative md:px-20">
      <div className="text-center space-y-4 px-4">
        <h2 className="text-3xl text-gray-900 font-bold lg:mt-10 mt-5">
          What Our <span className="text-[#26a6eb]">Participants Say</span>
        </h2>
        <p className="text-gray-700 text-sm lg:text-lg font-light max-w-2xl mx-auto">
          Read the experiences and feedback from our participants who joined various Medicamps.
        </p>
      </div>

      <div className="relative mt-10 mb-10">
        <Swiper
          style={{padding:20}}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.slice(0, 6)?.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg text-center transition-transform hover:scale-105 duration-300">
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={28}
                  color2={"#FFD700"}
                  edit={false}
                />
                <p className="text-gray-800 text-md mt-4 mb-3">{review.feedback}</p>
                <h3 className="text-lg text-gray-900 font-semibold">{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons at Bottom */}
        <div className="absolute left-1/2 bottom-50 transform -translate-x-1/2 translate-y-1/2 flex gap-4">
          <div className="custom-prev w-12 h-12 bg-[#26a6eb] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#55baef] transition duration-300">
            <FaArrowLeft />
          </div>
          <div className="custom-next w-12 h-12 bg-[#26a6eb] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#55baef] transition duration-300">
            <FaArrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
