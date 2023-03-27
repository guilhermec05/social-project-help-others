import {
    createBrowserRouter,
} from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { SignUpUser } from "../pages/SignUpUser";
import { SignUpUserHomeless } from "../pages/SignUpUserHomeless";


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
