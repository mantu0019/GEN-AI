import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { Suspense } from "react";
const TermAndCondition = lazy(()=>import( "../components/TermAndCondition"));
const PublicLayout  = lazy(()=>import("../components/PublicLayout")) ;
const  Loading  = lazy(()=>import("../components/Loading")) ;
const  NotFound = lazy(()=>import("../components/NotFound")) ;
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));

const MainLayout = lazy(() => import("../components/MainLayout"));
const GetMe = lazy(() => import("../features/auth/pages/GetMe"));
const ProtectedRoutes = lazy(() => import("../components/ProtectedRoutes"));
const Home = lazy(() => import("../features/interview/ui/Home"));
const Interview = lazy(() => import("../features/interview/ui/Interview"));

const AppRoutes = createBrowserRouter([
 {
   path:"*",
   element:(<Suspense fallback = {<Loading/>}>
    <NotFound/>

   </Suspense>)

 },

  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
   {
    path:"term-condition",
    element:(<Suspense fallback = {<Loading/>}>
         <TermAndCondition/>
    </Suspense>)
   }


    ],
  },

  {
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoutes />,
      </Suspense>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <MainLayout />
          </Suspense>
        ),
        children: [
           
          {
            path: "home",
            element: (
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<Loading />}>
                <GetMe />
              </Suspense>
            ),
          },
          {
            path: "interview/:interviewId",
            element: (
              <Suspense fallback={<Loading />}>
                <Interview />,
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default AppRoutes;
