import {
    createBrowserRouter,
} from "react-router-dom";
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
    },
    {
      path: "/SignUpUser",
      element: <SignUpUser/>,
    },
    {
      path: "/SignUpUserHomeless",
      element: <SignUpUserHomeless/>,
    },
  ]);


export {router}
