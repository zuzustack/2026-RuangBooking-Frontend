import { createBrowserRouter, type RouteObject } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import RouteAuthSuccess from "./RouteAuthSuccess";
import GuestRoute from "./GuestRoute";
import MainPage from "@/pages/MainPage";
import LandingPage from "@/pages/LandingPage";


// get data from localstorage
let userData = localStorage.getItem("userData");
if (userData) {
  userData = JSON.parse(userData);
} else {
  userData = null;
}


const routes: RouteObject[] = [
  {
    path: "/",
    element: userData ? <MainPage /> : <LandingPage />,
    children: userData ? RouteAuthSuccess : GuestRoute,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }
];

export const router = createBrowserRouter(routes);