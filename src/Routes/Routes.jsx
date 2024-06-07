import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import AvailableCamps from "../Components/AvailableCamps/AvailableCamps";
import JoinUs from "../Components/JoinUs/JoinUs";
import Login from "../Pages/Authentication/Login/Login";
import Signup from "../Pages/Authentication/Sigup/Signup";
import Dashboard from "../Layouts/Dashboard";
import AddCamps from "../Components/AdminDashboard/AddCamps/AddCamps";
import ManageCamps from "../Components/AdminDashboard/ManageCamps.jsx/ManageCamps";
import Organizers from "../Components/AdminDashboard/Organizers/Organizers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Payment from "../Components/ParticapntDashboard/Payment/Payment";
import RegisteredCamps from "../Components/ParticapntDashboard/RegisteredCamp/RegisteredCamps";
import PaymentHistory from "../Components/ParticapntDashboard/PaymentHistory/PaymentHistory";

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
        element:<PrivateRoute><JoinUs></JoinUs></PrivateRoute>
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
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[

        {
          path:'addcamps',
          element:<AdminRoute><AddCamps></AddCamps></AdminRoute>

        },
        {
          path:'managecamps',
          element:<AdminRoute><ManageCamps></ManageCamps></AdminRoute>

        },
        {
          path:'organizers',
          element:<AdminRoute><Organizers></Organizers></AdminRoute>

        },
      {
        path:'payment',
        element:<Payment></Payment>
      },
      {
        path:'registeredcamps',
        element:<RegisteredCamps></RegisteredCamps>
      },
      {
        path:'paymenthistory',
        element:<PaymentHistory></PaymentHistory>
      },
      ]
    }
  ])