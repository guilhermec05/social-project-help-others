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
import { FogotPassword } from "../pages/forgotPassword";
import { FogotPasswordUser } from "../pages/forgotPasswordUser";
import { FirstAccess } from "../pages/firstaccess";
import { MyEvents } from "../pages/myEvents";
import { EditMyEvent } from "../pages/editMyEvent";
import { SignUpEventOng } from "../pages/signUpEventOng";


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
      path: "/first_access_adm",
      element:  < FirstAccess />,
    },
    {
      path: "/forgot_pass",
      element:  < FogotPassword />,
    },
    {
      path: "/forgot_pass_user",
      element:  < FogotPasswordUser />,
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
      path: "/process_donate/:id",
      element:  <ProcessDonate/>,
    },
    {
      path: "/my_events",
      element:  <MyEvents/>,
    },
    {
      path: "/edit_my_event",
      element:  <EditMyEvent/>,
    },
    {
      path: "/sign_up_event_ong",
      element: <SignUpEventOng/>,
    },
  ]);
  
  
export {router}
