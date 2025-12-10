import CountUp from "react-countup";
import img2 from "../../assets/9.jpg";
import img3 from "../../assets/A-group-of-people-exercising-and-stretching-in-the-sunshine-with-personal-trainer.jpg";
import { Link } from "react-router-dom";

const JoinUs = () => {
  return (
    <div className=" min-h-screen">
      {/* Mission and Vision Section */}
      <div className="hero-content flex-col lg:flex-row">
        <div className="lg:w-1/2 relative">
          <img
            src={img3}
            className="w-3/4 rounded-lg shadow-2xl"
            alt="Community Health Initiative"
          />
          <img
            src={img2}
            className="w-1/2 absolute right-5 top-1/2 rounded-lg border-8 border-white shadow-2xl"
            alt="Healthcare Volunteers"
          />
        </div>
        <div className="lg:w-1/2 space-y-5 p-4">
          <h2 className="lg:text-5xl text-3xl text-black font-bold">
            Our <span className="text-green-800">Mission & Vision</span>
          </h2>
          <p className="py-6 text-lg text-gray-700">
            Our mission is to provide accessible, high-quality healthcare to
            underserved communities through strategically organized medical
            camps. We are committed to bridging the gap in healthcare services
            with the help of dedicated healthcare professionals and
            compassionate volunteers.
          </p>
          <p className="py-6 text-lg text-gray-700">
            We envision a world where every individual has access to essential
            medical care, fostering healthier communities through outreach,
            education, and preventative care.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mt-16 p-10 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Core Values
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-6 bg-[#D6E5E3] rounded-lg text-center shadow-sm hover:shadow-lg transition-colors">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Compassion
            </h3>
            <p className="mt-4 text-gray-700">
              Empathy drives our mission to ensure every patient is treated with
              dignity, respect, and care.
            </p>
          </div>
          <div className="p-6 bg-[#D6E5E3] rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Integrity
            </h3>
            <p className="mt-4 text-gray-700">
              We uphold the highest ethical standards, fostering trust through
              transparency and accountability.
            </p>
          </div>
          <div className="p-6 bg-[#D6E5E3] rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Community Focus
            </h3>
            <p className="mt-4 text-gray-700">
              Our work centers on building healthier communities by reaching
              underserved areas with essential healthcare services.
            </p>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div className="mt-16 p-10 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Our Impact
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-4xl font-semibold text-indigo-600">
              <CountUp start={0} end={50000} duration={3} separator="," />+
            </h3>
            <p className="text-gray-600 mt-2">Patients Treated</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold text-indigo-600">
              <CountUp start={0} end={1000} duration={3} separator="," />+
            </h3>
            <p className="text-gray-600 mt-2">Medical Camps Organized</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold text-indigo-600">
              <CountUp start={0} end={200} duration={3} separator="," />+
            </h3>
            <p className="text-gray-600 mt-2">
              Volunteer Healthcare Professionals
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 p-10 rounded-lg shadow-md bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Join Our Mission
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600">
          Be a part of our journey to make healthcare accessible to all. Whether
          you’re a healthcare professional, a volunteer, or a supporter, your
          contribution makes a difference.
        </p>
        <div className="flex justify-center mt-6">
          <Link to="/signup">
            <button className="btn btn-outline hover:text-green-500 bg-green-500 text-white border-0 border-b-4 border-slate-900 mt-4">
              {" "}
              Get Involved{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
