import { Link } from "react-router-dom";
import img2 from "../../../assets/1.jpg";
import img3 from "../../../assets/2.jpg";
import CountUp from "react-countup";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16">

      {/* Hero-style Mission & Vision */}
      <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-40 md:gap-12 px-6 lg:px-0">
        {/* Images Section */}
        <div className="lg:w-1/2 relative">
          <img
            src={img3}
            alt="Community Health Initiative"
            className="w-full lg:w-4/5 rounded-2xl shadow-2xl"
          />
          <img
            src={img2}
            alt="Healthcare Volunteers"
            style={{top: "17.375rem"}}
            className="absolute w-1/2 lg:w-1/2 right-0  border-4 border-white rounded-2xl shadow-xl transform -translate-y-1/2"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6">
          <span className="text-[#26a6eb] font-semibold uppercase tracking-wider text-sm">
            About Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Compassionate Care <br /> Always There, <span className="text-[#26a6eb]">Health First</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At MediCamps, our mission is to make quality healthcare accessible for underserved communities through well-organized medical camps and wellness programs. We strive to bridge healthcare gaps with compassion and professionalism.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our vision is to create a healthier world where every individual receives essential medical care, education, and preventive support, fostering stronger communities.
          </p>

          {/* Optional Call to Action */}
          <Link to="/signup">
            <button className="mt-4 bg-[#26a6eb] text-white px-6 py-3 rounded-lg shadow hover:bg-[#55baef] transition-colors">
              Get Involved
            </button>
          </Link>
        </div>
      </div>
    </div>
      {/* Core Values */}
      <div className="max-w-7xl mx-auto mt-24 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Our <span className="text-[#26a6eb]">Core Values</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Compassion",
              desc: "We treat every patient with empathy, respect, and care.",
            },
            {
              title: "Integrity",
              desc: "Upholding ethical standards and transparency in all actions.",
            },
            {
              title: "Community Focus",
              desc: "Building healthier communities by reaching underserved areas.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8  hover:shadow-lg transition-transform transform hover:-translate-y-2 text-center border-2 border-slate-15XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX6G6G6G6G6G6G6G6G6G6G6G6G6G6G6G6G6G6G6G6G6G6GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  0"
            >
              <h3 className="text-2xl font-semibold text-[#26a6eb] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      {/* <div className="max-w-7xl mx-auto mt-24 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Our <span className="text-[#26a6eb]">Impact</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="bg-green-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <h3 className="text-4xl font-bold text-[#26a6eb]">
              <CountUp start={0} end={50000} duration={3} separator="," />+
            </h3>
            <p className="text-gray-700 mt-2">Patients Treated</p>
          </div>
          <div className="bg-green-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <h3 className="text-4xl font-bold text-[#26a6eb]">
              <CountUp start={0} end={1000} duration={3} separator="," />+
            </h3>
            <p className="text-gray-700 mt-2">Medical Camps Organized</p>
          </div>
          <div className="bg-green-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <h3 className="text-4xl font-bold text-[#26a6eb]">
              <CountUp start={0} end={200} duration={3} separator="," />+
            </h3>
            <p className="text-gray-700 mt-2">Healthcare Professionals</p>
          </div>
        </div>
      </div> */}

      {/* Call to Action */}
    
    </div>
  );
};

export default AboutUs;
