import { createBrowserRouter, Router } from "react-router";
import PublicLayout from "../components/PublicLayout";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import MainLayout from "../components/MainLayout";
import Home from "../components/Home";

  const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path:"/dashboard",
    element:<MainLayout/>,
    children:[
      {path:"home",
        element:<Home/>
      }
    ]
  }

    

]);



export default AppRoutes