import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import AboutUs from "./AboutUS/AboutUs";
import Banner from "./Banner";
import Doctors from "./Doctors/Doctors";
import HomeAvailableCamps from "./HomeAvailableCamps/HomeAvailableCamps";
import Testimonial from "./Testimonials/Testimonial";

const Home = () => {
  useEffect(() => {
    AOS.init({
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div>
      <div data-aos="fade-down" data-aos-duration="1000">
        <Banner />
      </div>
      <div data-aos="fade-right" data-aos-duration="1500">
        <AboutUs />
      </div>
      <div data-aos="fade-up" data-aos-duration="2000">
        <HomeAvailableCamps />
      </div>
      <div data-aos="zoom-in" data-aos-duration="2500">
        <Testimonial />
      </div>
      <div data-aos="flip-left" data-aos-duration="3000">
        <Doctors />
      </div>
    </div>
  );
};

export default Home;
