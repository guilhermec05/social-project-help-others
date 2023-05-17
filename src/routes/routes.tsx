import {
    createBrowserRouter,
} from "react-router-dom";
import { ErrorPage } from "../pages/404_page";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
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
import { ReactNode } from 'react'
import { useAuth } from "../hooks/useAuth";

interface PrivateProps{
  children: ReactNode
}

function PrivateRoute({children }: PrivateProps){
  
  const {user} = useAuth()

  if(!user.id){
      return <><Login/></>
  }

  return  <>{children}</>  
   
}



const router = createBrowserRouter([
    {
      path: "/home",
      element:<PrivateRoute><Home/></PrivateRoute>,
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
      element:<PrivateRoute><UserPropfile /></PrivateRoute> ,
    },
    {
      path: "/sign_up_homeless",
      element: <PrivateRoute><SignUpUserHomeless /></PrivateRoute>,
    },
    {
      path: "/first_access_adm",
      element: < FirstAccess /> ,
    },
    {
      path: "/forgot_pass",
      element:< FogotPassword />,
    },
    {
      path: "/forgot_pass_user",
      element:  < FogotPasswordUser />,
    },
    {
      path: "/homeless_help/:id",
      element:  <PrivateRoute><HomlessProfile/></PrivateRoute>,
    },
    {
      path: "/home_adm",
      element: <PrivateRoute> <HomeAdm/></PrivateRoute> ,
    },
    {
      path: "/report_profile/:id",
      element:  <PrivateRoute><HomlessProfileReport/></PrivateRoute>,
    },
    {
      path: "/donate_process/:id",
      element: <PrivateRoute> <HomlessProfileDonateProcess/></PrivateRoute>,
    },
    {
      path: "/ongs_help/:id",
      element:<PrivateRoute><OngsProfile/></PrivateRoute>  ,
    },
    {
      path: "/my_donation",
      element: <PrivateRoute> <MyDonations/></PrivateRoute>,
    },
    {
      path: "/process_donate/:id",
      element: <PrivateRoute>  <ProcessDonate/></PrivateRoute>,
    },
    {
      path: "/my_events",
      element: <PrivateRoute><MyEvents/></PrivateRoute> ,
    },
    {
      path: "/edit_my_event",
      element: <PrivateRoute><EditMyEvent/></PrivateRoute> ,
    },
    {
      path: "/sign_up_event_ong",
      element:<PrivateRoute><SignUpEventOng/></PrivateRoute> ,
    },
  ]);
  
  
export {router}
