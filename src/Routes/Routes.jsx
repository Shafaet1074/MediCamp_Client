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
import ParticipantProfile from "../Components/ParticapntDashboard/ParticipantProfile/ParticipantProfile";
import UpdateProfile from "../Components/ParticapntDashboard/ParticipantProfile/UpdateProfile";
import Analytics from "../Components/ParticapntDashboard/Analytics/Analytics";
import ManageRegister from "../Components/AdminDashboard/ManageRegister/ManageRegister";
import Campdetails from "../Components/CampDetails/Campdetails";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
          path: '/',
          element: <Home></Home>,
          errorElement:<ErrorPage></ErrorPage>,
      }, 
      {
        path:'/avalilablecamps',
        element:<AvailableCamps></AvailableCamps>,

      },
      {
        path:'/campdetails/id/:id',
        element:<Campdetails></Campdetails>,

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
      errorElement:<ErrorPage></ErrorPage>,
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
      {
        path:'participantprofile',
        element:<ParticipantProfile></ParticipantProfile>
      },
      {
        path:'updateprofile/:id',
        element:<UpdateProfile></UpdateProfile>
      },
      {
        path:'analytics',
        element:<Analytics></Analytics>
      },
      {
        path:'manageregister',
        element:<ManageRegister></ManageRegister>
      }
      ]
    }
  ])