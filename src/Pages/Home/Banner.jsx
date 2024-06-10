import img1 from '../../assets/Carib.jpg'
import img2 from '../../assets/9.jpg'
import img3 from '../../assets/A-group-of-people-exercising-and-stretching-in-the-sunshine-with-personal-trainer.jpg'
const Banner = () => {
  return (
    <div className="carousel w-full h-[600px] ">
    <div id="slide1" className="carousel-item relative w-full">
        <img src={img1} className="w-full rounded-xl" />
        <div className="absolute rounded-xl flex items-center  h-full left-0 top-0 bg-gradient-to-r from-[#030000] to-[rgba(21, 21, 21, 0)]">
            <div className=' space-y-7  pl-12   w-full text-white'>
                <h2 className='lg:text-6xl text-2xl font-bold lg:text-center '>Discover Our Yoga Retreat</h2>
                <p className=''>Experience rejuvenation and inner peace through guided yoga sessions in a serene environment.</p>
                <div>
                    <button className="btn btn-primary mr-5">Discover More</button>
                    <button className="btn btn-outline btn-secondary">Latest Project</button>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2  bottom-10 right-1/2   ">
            <a href="#slide3" className="btn btn-circle mr-5 bg-black text-white hover:text-black hover:bg-[#92DCE5]">❮</a>
            <a href="#slide2" className="btn btn-circle bg-black text-white hover:text-black hover:bg-[#92DCE5]">❯</a>
        </div>
    </div>
    <div id="slide2" className="carousel-item relative w-full">
        <img src={img2} className="w-full rounded-xl" />
        <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#030000] to-[rgba(21, 21, 21, 0)]">
        <div className=' space-y-7  pl-12   w-full text-white'>
                <h2 className='lg:text-6xl text-2xl font-bold lg:text-center '>Join Our Summer Wellness Camp</h2>
                <p className=''>Embrace holistic well-being with fitness activities, nutrition workshops, and relaxation sessions in a vibrant summer setting.</p>
                <div>
                    <button className="btn btn-primary mr-5">Discover More</button>
                    <button className="btn btn-outline btn-secondary">Latest Project</button>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2  bottom-10 right-1/2 ">
            <a href="#slide1" className="btn btn-circle bg-black text-white hover:text-black hover:bg-[#92DCE5]">❮</a>
            <a href="#slide3" className="btn btn-circle bg-black text-white hover:text-black hover:bg-[#92DCE5]">❯</a>
        </div>
    </div>
    <div id="slide3" className="carousel-item relative w-full">
        <img src={img3} className="w-full rounded-xl" />
        <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
        <div className=' space-y-7  pl-12   w-full text-white'>
                <h2 className='lg:text-6xl text-2xl font-bold lg:text-center '>Transform at Our Weight Loss Camp</h2>
                <p className=''>Achieve your fitness goals with personalized training, nutrition plans, and supportive community activities.</p>
                <div>
                    <button className="btn btn-primary mr-5">Discover More</button>
                    <button className="btn btn-outline btn-secondary">Latest Project</button>
                </div>
            </div> 
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2  bottom-10 right-1/2">
            <a href="#slide2" className="btn btn-circle bg-black text-white hover:text-black hover:bg-[#92DCE5]">❮</a>
            <a href="#slide1" className="btn btn-circle bg-black text-white hover:text-black hover:bg-[#92DCE5]">❯</a>
        </div>
    </div>
   
</div>
  );
};

export default Banner;