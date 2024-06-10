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
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div>
      <div data-aos="fade-down">
        <Banner />
      </div>
      <div data-aos="fade-right">
        <AboutUs />
      </div>
      <div data-aos="fade-up">
        <HomeAvailableCamps />
      </div>
      <div data-aos="zoom-in">
        <Testimonial />
      </div>
      <div data-aos="flip-left">
        <Doctors />
      </div>
    </div>
  );
};

export default Home;
