import {
    createBrowserRouter,
} from "react-router-dom";
import { ErrorPage } from "../pages/404_page";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { PageDefault } from "../pages/pageDefault";
import { SignUpUser } from "../pages/signUpUser";
import { SignUpUserHomeless } from "../pages/signUpUserHomeless";


const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/",
      element: <Login/>,
      errorElement:<ErrorPage/>
    },
    {
      path: "/sign_up_user",
      element: <SignUpUser/>,
    },
    {
      path: "/sign_up_homeless",
      element: <SignUpUserHomeless/>,
    },
    {
      path: "/profile",
      element: <PageDefault text="profile"/>,
    },
    {
      path: "/my_donation",
      element: <PageDefault text="myDonation"/>,
    },
    {
      path: "/forgot_pass",
      element:  <PageDefault text="forgotPass"/>,
    },
    {
      path: "/homeless_help/:id",
      element:  <PageDefault text="homeless_help"/>,
    },
  ]);


export {router}
