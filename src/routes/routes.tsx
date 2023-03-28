import {
    createBrowserRouter,
} from "react-router-dom";
import { ErrorPage } from "../pages/404_page";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { SignUpUser } from "../pages/signUpUser";
import { SignUpUserHomeless } from "../pages/signUpUserHomeless";


const router = createBrowserRouter([
    {
      path: "/Home",
      element: <Home/>,
    },
    {
      path: "/",
      element: <Login/>,
      errorElement:<ErrorPage/>
    },
    {
      path: "/SignUpUser",
      element: <SignUpUser/>,
    },
    {
      path: "/SignUpHomeless",
      element: <SignUpUserHomeless/>,
    },
    {
      path: "/profile",
      element: <SignUpUserHomeless/>,
    },
    {
      path: "/myDonation",
      element: <SignUpUserHomeless/>,
    },
  ]);


export {router}
