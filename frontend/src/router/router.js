import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "../screens/Home";
import BookingScreen from "../screens/BookingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PageNotFound from "../components/PageNotFound";
import Logout from "../components/Logout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <PageNotFound />,
  },
  {
    path: "/booking/:id/:startDate/:endDate",
    element: <BookingScreen></BookingScreen>,
  },
  {
    path: "/login",
    element: <LoginScreen></LoginScreen>,
  },
  {
    path: "/register",
    element: <RegisterScreen></RegisterScreen>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
]);

export default router;
