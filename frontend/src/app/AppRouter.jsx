import { createBrowserRouter, Router } from "react-router";
import PublicLayout from "../components/PublicLayout";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import MainLayout from "../components/MainLayout";
import GetMe from "../features/auth/pages/GetMe";
import ProtectedRoutes from "../components/ProtectedRoutes";
 
import Home from "../features/interview/ui/Home";
import Interview from "../features/interview/ui/Interview";

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
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
          { path: "profile", element: <GetMe /> },
          {
            path: "home",
            element: <Home />,
          },
          {
            path:"profile",
            element:<GetMe/>
          },
          {
            path: "interview/:interviewId",
            element: <Interview />,
          },
        ],
      },
    ],
  },
]);

export default AppRoutes;
