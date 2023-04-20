import {
    createBrowserRouter,
} from "react-router-dom";
import { ErrorPage } from "../pages/404_page";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { PageDefault } from "../pages/pageDefault";
import { SignUpUser } from "../pages/signUpUser";
import { HomlessProfile } from "../pages/homlessProfile";
import { SignUpUserHomeless } from "../pages/signUpUserHomeless";
import { HomeAdm } from "../pages/homeAdm";
import { HomlessProfileReport } from "../pages/homlessProfileReport";
import { HomlessProfileDonateProcess } from "../pages/homlessProfileDonateProcess";



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
      path: "/profile",
      element: <PageDefault text="profile"/>,
    },
    {
      path: "/my_donation",
      element: <PageDefault text="myDonation"/>,
    },
    {
      path: "/sign_up_homeless",
      element: <SignUpUserHomeless />,
    },
    {
      path: "/forgot_pass",
      element:  <PageDefault text="forgotPass"/>,
    },
    {
      path: "/homeless_help/:id",
      element:  <HomlessProfile/>,
    },
    {
      path: "/home_adm",
      element:  <HomeAdm/>,
    },
    {
      path: "/report_profile/:id",
      element:  <HomlessProfileReport/>,
    },
    {
      path: "/donate_process/:id",
      element:  <HomlessProfileDonateProcess/>,
    },
  ]);


export {router}
