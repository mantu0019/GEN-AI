import React from "react";
import { Link, Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <div>
        {/* <Link
          className=" text-2xl px-2.5 py-0.5 rounded bg-amber-600 ml-7"
          to={"home"}
        >
          home
        </Link>
        <Link
          className=" text-2xl px-2.5 py-0.5 rounded bg-amber-600 ml-7"
          to={"interview/:interviewId"}
        >
          interview
        </Link> */}
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
