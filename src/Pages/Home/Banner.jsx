import img1 from "../../assets/Carib.jpg";
import img2 from "../../assets/9.jpg";
import img3 from "../../assets/A-group-of-people-exercising-and-stretching-in-the-sunshine-with-personal-trainer.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="carousel w-full h-[650px] rounded-xl overflow-hidden">

      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <img src={img1} className="w-full object-cover" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10 flex items-center">
          <div className="max-w-2xl px-12 text-white space-y-6">
            <p className=" font-bold text-3xl opacity-90">
              Welcome to MediCamps
            </p>

            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Find Your Path to Better Health & Wellness
            </h2>

            <p className="text-lg opacity-90">
              Join guided health camps, yoga retreats, wellness workshops,
              nutrition programs & more — designed to help you stay fit and healthy.
            </p>

            <div className="flex gap-4 mt-4">
              <Link to="/avalilablecamps">
                <button className="px-6 py-3 rounded-lg bg-[#26a6eb] hover:bg-[#55baef] text-white font-medium shadow-lg">
                  Explore Camps
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-black transition font-medium">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute flex justify-between w-full px-5 bottom-10">
          <a href="#slide3" className="btn btn-circle bg-white/20 text-white hover:bg-[#26a6eb]">❮</a>
          <a href="#slide2" className="btn btn-circle bg-white/20 text-white hover:bg-[#26a6eb]">❯</a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <img src={img2} className="w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10 flex items-center">
          <div className="max-w-2xl px-12 text-white space-y-6">
            <p className=" font-bold text-3xl opacity-90">Summer Wellness Camp</p>

            <h2 className="text-4xl lg:text-5xl font-extrabold">
              Boost Your Energy, Strength & Immunity
            </h2>

            <p className="text-lg opacity-90">
              Fun fitness activities, balanced diet plans, expert health sessions —
              designed to uplift your overall wellbeing.
            </p>

            <div className="flex gap-4 mt-4">
              <Link to="/avalilablecamps">
                <button className="px-6 py-3 rounded-lg bg-[#26a6eb] hover:bg-[#55baef] text-white shadow-lg">
                  Explore Camps
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-black transition">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between w-full px-5 bottom-10">
          <a href="#slide1" className="btn btn-circle bg-white/20 text-white hover:bg-[#26a6eb]">❮</a>
          <a href="#slide3" className="btn btn-circle bg-white/20 text-white hover:bg-[#26a6eb]">❯</a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <img src={img3} className="w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10 flex items-center">
          <div className="max-w-2xl px-12 text-white space-y-6">
            <p className=" font-bold text-3xl opacity-90">Weight Loss Program</p>

            <h2 className="text-4xl lg:text-5xl font-extrabold">
              Transform Your Body With Expert Guidance
            </h2>

            <p className="text-lg opacity-90">
              Personalized training plans, nutrition guidance & group motivation
              to help you achieve real results.
            </p>

            <div className="flex gap-4 mt-4">
              <Link to="/avalilablecamps">
                <button className="px-6 py-3 rounded-lg bg-[#26a6eb] hover:bg-[#55baef] text-white shadow-lg">
                  Explore Camps
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-black transition">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between w-full px-5 bottom-10">
          <a href="#slide2" className="btn btn-circle bg-white/20 text-white hover:bg-[#26a6eb]">❮</a>
          <a href="#slide1" className="btn btn-circle bg-white/20 text-white hover:bg-[#26a6eb]">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
