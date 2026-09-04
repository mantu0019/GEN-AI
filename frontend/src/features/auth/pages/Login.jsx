import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import Loading from "../../../components/Loading";
 
const Login = () => {
  const { loginByUser, isLoading, error } = useAuth();
  const navigate = useNavigate();
 

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {

    
    try {
       
      await loginByUser(data).unwrap();
       navigate("/dashboard/home")
      
    } catch (error) {
      console.log("something went wrong from login data fetching", error);
    }
  };

  if(isLoading){
    return <Loading/>
  }
  

  return (
    <div className="min-h-screen bg-[#071b1d] flex items-center justify-center p-4 sm:p-8">
      {/* Main Container */}

      <div className="w-full max-w-6xl bg-white rounded-[28px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        {/* ================= LEFT SIDE ================= */}
        <div className="relative min-h-[550px] lg:min-h-[650px] bg-[#0d657b] overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute w-[500px] h-[500px] bg-[#063b49] rounded-full blur-3xl opacity-70 -top-40 -left-40" />

            <div className="absolute w-[400px] h-[400px] bg-[#24a7bd] rounded-full blur-3xl opacity-20 bottom-[-150px] right-[-100px]" />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-12">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-[#0d657b] font-black text-xl">AI</span>
              </div>

              <span className="text-white text-xl font-bold tracking-wide">
                Genova
              </span>
            </div>

            {/* Middle */}
            <div className="max-w-md mt-16 lg:mt-0">
              <p className="text-white/70 text-sm font-semibold tracking-[3px] uppercase mb-5">
                Generative Intelligence
              </p>

              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
                Create.
                <br />
                Imagine.
                <br />
                <span className="text-[#9ce7ed]">Generate.</span>
              </h1>

              <p className="mt-6 text-white/75 text-sm sm:text-base leading-7 max-w-sm">
                Unlock the power of AI to generate ideas, content, images and
                experiences in seconds.
              </p>
            </div>

            {/* Bottom */}
            <div className="flex items-end justify-between gap-5 mt-16">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest">
                  Powered by
                </p>

                <p className="text-white font-semibold mt-1">
                  Next Generation AI
                </p>
              </div>

              {/* AI Circle */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black flex items-center justify-center border-4 border-white/10">
                <span className="text-[#9ce7ed] text-xs font-black tracking-widest">
                  GEN AI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-[#f8f8f6] flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <div className="mb-9">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#101718]">
                Welcome back!
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Welcome back! Please enter your details.
              </p>
            </div>
            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* ================= EMAIL ================= */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#202526] mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={`w-full h-12 px-4 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } bg-white outline-none text-sm transition focus:border-[#0d657b] focus:ring-2 focus:ring-[#0d657b]/10`}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* ================= PASSWORD ================= */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#202526] mb-2"
                >
                  Password
                </label>

                {/* Input + Eye Button */}
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full h-12 px-4 pr-12 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } bg-white outline-none text-sm transition focus:border-[#0d657b] focus:ring-2 focus:ring-[#0d657b]/10`}
                  />

                  {/* Show / Hide */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0d657b] transition"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* ================= REMEMBER / FORGOT ================= */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#0d657b]" />

                  <span className="text-xs sm:text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-xs sm:text-sm font-semibold text-[#0d657b] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* ================= LOGIN ================= */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#0d657b] text-white rounded-lg font-semibold
                disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* ================= SIGNUP ================= */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-semibold text-[#0d657b] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
