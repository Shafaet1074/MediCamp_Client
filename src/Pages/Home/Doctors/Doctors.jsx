import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Doctor from "./Doctor";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

const Doctors = () => {
  const { data: doctors } = useQuery({
    queryKey: ['featuredoctors'],
    queryFn: async () => {
      const res = await fetch('/public.json');
      return res.json();
    }
  });

  console.log(doctors);

  return (
    <div>
      <div className="lg:text-center lg:space-y-4 pt-5">
        <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
          Meet Our <span className="text-green-800">Expert Doctors</span>
        </h2>
        <p className="text-xl lg:text-3xl font-extralight text-gray-900">
          Explore the expertise of our distinguished medical professionals who lead the way in ensuring your well-being.
        </p>
      </div>
      <div className="p-10">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {doctors?.map((doctor) => (
            <SwiperSlide key={doctor.camp_name}>
              <Doctor doctor={doctor} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Doctors;
