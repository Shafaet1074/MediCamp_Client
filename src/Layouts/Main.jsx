import { Outlet } from "react-router-dom";
import Navabr from "../Pages/Navabr/Navabr";
import Footer from "../Pages/Footer/Footer";


const Main = () => {
  return (
    <div>
       <Navabr></Navabr>
      <Outlet></Outlet>
      <Footer></Footer>
      
    </div>
  );
};

export default Main;