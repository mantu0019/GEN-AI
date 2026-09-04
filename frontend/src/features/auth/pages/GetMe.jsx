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
      <div className="w-full max-w-md">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">
              {user?.username}
            </h1>

            <p className="text-gray-400 mt-1">
              {user?.email}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4">

            <div className="bg-gray-800/70 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Username
              </p>

              <p className="text-white font-medium mt-1">
                {user?.username}
              </p>
            </div>

            <div className="bg-gray-800/70 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Email
              </p>

              <p className="text-white font-medium mt-1 break-all">
                {user?.email}
              </p>
            </div>

            <div className="bg-gray-800/70 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                User ID
              </p>

              <p className="text-gray-300 text-sm mt-1 break-all">
                {user?._id}
              </p>
            </div>

          </div>

          {/* Status */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />

            <span className="text-sm text-green-400">
              Account Active
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all duration-200 text-white font-semibold py-3 rounded-xl"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default GetMe;