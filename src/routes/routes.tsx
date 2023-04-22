import {
    createBrowserRouter,
} from "react-router-dom";
import { ErrorPage } from "../pages/404_page";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { PageDefault } from "../pages/pageDefault";
import { SignUpUser } from "../pages/signUpUser";
import { HomlessProfile } from "../pages/homlessProfile";
import { OngsProfile } from "../pages/ongsProfile";
import { SignUpUserHomeless } from "../pages/signUpUserHomeless";
import { HomeAdm } from "../pages/homeAdm";
import { HomlessProfileReport } from "../pages/homlessProfileReport";
import { HomlessProfileDonateProcess } from "../pages/homlessProfileDonateProcess";
import { MyDonations } from "../pages/myDonations";
import { UserPropfile } from "../pages/userProfile";
import { ProcessDonate } from "../pages/processDonate";


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
      element: <UserPropfile />,
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
    {
      path: "/ongs_help/:id",
      element:  <OngsProfile/>,
    },
    {
      path: "/my_donation",
      element:  <MyDonations/>,
    },
    {
      path: "/processDonate/:id",
      element:  <ProcessDonate/>,
    },
  ]);
  

export {router}
