import { Outlet } from "react-router-dom";
import Navabr from "../Pages/Navabr/Navabr";
import Footer from "../Pages/Footer/Footer";
import Navbar_1 from "../Pages/Home/Navbar_1";

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
