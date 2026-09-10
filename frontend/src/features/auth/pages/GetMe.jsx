 
 
import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

const GetMe = () => {
  const {
    authData,
    isLoading,
    error,
    logOutByUser,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOutByUser();
      navigate("/");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-red-400">Something went wrong</p>
      </div>
    );
  }

  const user = authData?.userDetail || authData?.user;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl">
<button
  onClick={() => navigate(-1)}
  className="
    group mb-6
    flex items-center gap-2
    rounded-xl
    border border-white/10
    bg-white/5
    px-3.5 py-2
    text-sm font-medium text-gray-400
    backdrop-blur-md
    transition-all duration-300
    hover:border-orange-500/40
    hover:bg-orange-500/10
    hover:text-orange-400
    active:scale-95
  "
>
  <span className="transition-transform duration-300 group-hover:-translate-x-1">
    ←
  </span>

  Back
</button>
          {/* Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />

          {/* Avatar */}
          <div className="relative flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 p-[2px] shadow-lg shadow-orange-500/20">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-3xl font-bold text-white">
                {user?.username?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>

          {/* User Name */}
          <div className="relative text-center mb-7">
            <h1 className="text-2xl font-bold text-white">
              {user?.username}
            </h1>

            <p className="text-sm text-gray-400 mt-2 break-all">
              {user?.email}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3">

            <div className="rounded-xl border border-white/5 bg-black/20 px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">
                Full Name
              </p>
              <p className="text-white font-medium">
                {user?.username}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">
                Email
              </p>
              <p className="text-gray-200 text-sm break-all">
                {user?.email}
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold transition-all duration-200 active:scale-[0.98] shadow-lg shadow-orange-500/10"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default GetMe;
 
