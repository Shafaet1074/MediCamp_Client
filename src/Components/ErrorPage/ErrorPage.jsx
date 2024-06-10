import errorImage from '../../assets/3737258.jpg'

const ErrorPage = () => {
  return (
    <> 

    <div className='flex flex-col justify-center  text-center   items-center '>
    <img src={errorImage} alt="" className='h-96 w-auto' />
    <h1 className='text-5xl font-bold text-center text-red-400  '>Pages Not Found </h1>
    </div>
     
   </>

  );
};

export default ErrorPage;