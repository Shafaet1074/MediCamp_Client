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
    queryKey: ["featuredoctors"],
    queryFn: async () => {
      const res = await fetch("/public.json");
      return res.json();
    },
  });

  console.log(doctors);

  return (
    <div>
      <div className="text-center lg:space-y-4 space-y-2 pt-5 ">
        <h2 className="text-3xl  text-black lg:text-center font-bold pt-5">
          Our <span className="text-[#26a6eb]">Expert Doctors</span>
        </h2>
        <p className="text-sm text-center lg:text-2xl font-extralight text-gray-900">
          Explore the expertise of our medical professionals.
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
