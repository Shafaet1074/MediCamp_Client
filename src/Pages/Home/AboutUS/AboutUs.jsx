import img2 from '../../../assets/9.jpg'
import img3 from '../../../assets/A-group-of-people-exercising-and-stretching-in-the-sunshine-with-personal-trainer.jpg'

const AboutUs = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-1/2 relative'>
                    <img src={img3} className="w-3/4 rounded-lg shadow-2xl" />
                    <img src={img2} className="w-1/2 absolute right-5 top-1/2 rounded-lg border-8 border-white shadow-2xl" />
                </div>
                <div className='lg:w-1/2 space-y-5 p-4'>
{/* 
                <h3 className='text-3xl text-orange-500 font-bold'>About Us</h3> */}
                   
                   <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
        Our Mission <span className="text-green-800">And Vision</span>
        </h2>
                    <p className="py-6 text-xl">At the heart of our organization is a commitment to providing accessible, high-quality healthcare services to underserved communities through meticulously organized medical camps. Our dedicated team of healthcare professionals and volunteers work tirelessly to bridge healthcare gaps, ensuring that every individual has access to essential medical care. </p>
                    <p className="py-6 text-xl">We believe in the power of community outreach and preventative healthcare, aiming to improve overall well-being and foster healthier futures for all. Explore our journey, values, and the impact we strive to make in the lives of those we </p>
                    
                </div>
            </div>
        </div>
  );
};

export default AboutUs;