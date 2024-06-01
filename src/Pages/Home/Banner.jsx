import img1 from '../../assets/2023_3$largeimg_1676927503.jpg'
import img2 from '../../assets/Blog-13-Edge-Information-1.jpg'
import img3 from '../../assets/medical-background-cjge7e89adg6ub8x.jpg'
const Banner = () => {
  return (
    <div className="carousel w-full h-[600px] ">
    <div id="slide1" className="carousel-item relative w-full">
        <img src={img1} className="w-full rounded-xl" />
        <div className="absolute rounded-xl flex items-center  h-full left-0 top-0 bg-gradient-to-r from-[#030000] to-[rgba(21, 21, 21, 0)]">
            <div className=' space-y-7  pl-12   w-full text-[#92DCE5]'>
                <h2 className='text-6xl font-bold text-center '>Affordable Price For Car Servicing</h2>
                <p className=''>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                <div>
                    <button className="btn btn-primary mr-5">Discover More</button>
                    <button className="btn btn-outline btn-secondary">Latest Project</button>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2  bottom-10 right-1/2 ">
            <a href="#slide3" className="btn btn-circle mr-5 bg-black text-white hover:text-black hover:bg-[#92DCE5]">❮</a>
            <a href="#slide2" className="btn btn-circle bg-black text-white hover:text-black hover:bg-[#92DCE5]">❯</a>
        </div>
    </div>
    <div id="slide2" className="carousel-item relative w-full">
        <img src={img2} className="w-full rounded-xl" />
        <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#030000] to-[rgba(21, 21, 21, 0)]">
            <div className='text-[#92DCE5] space-y-7 pl-12 w-11/12'>
                <h2 className='text-6xl font-bold'>Affordable Price For Car Servicing</h2>
                <p>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
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
            <div className='text-white space-y-7 pl-12 w-full'>
                <h2 className='text-6xl font-bold'>Affordable Price For Car Servicing</h2>
                <p>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
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