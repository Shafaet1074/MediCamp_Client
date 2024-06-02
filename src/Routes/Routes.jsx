import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import AvailableCamps from "../Components/AvailableCamps/AvailableCamps";
import JoinUs from "../Components/JoinUs/JoinUs";
import Login from "../Pages/Authentication/Login/Login";
import Signup from "../Pages/Authentication/Sigup/Signup";
import Dashboard from "../Layouts/Dashboard";
import AddCamps from "../Components/AdminDashboard/AddCamps/AddCamps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
          path: '/',
          element: <Home></Home>
      }, 
      {
        path:'/avalilablecamps',
        element:<AvailableCamps></AvailableCamps>,

      },
      {
        path:'joinus',
        element:<JoinUs></JoinUs>
      },
      {
        path:'login',
        element:<Login></Login>,
      },
      {
        path:'signup',
        element:<Signup></Signup>,
      },


    ]

    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[

        {
          path:'addcamps',
          element:<AddCamps></AddCamps>

        }
      ]
    }
  ])