import {
    createBrowserRouter,
} from "react-router-dom";
import { PageDefault } from "../pages/pageDefault";



const router = createBrowserRouter([
    {
      path: "/",
      element: <PageDefault text="teste"/>,
    }
  ]);


export {router}
