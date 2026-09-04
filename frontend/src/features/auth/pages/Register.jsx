import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import Loading from "../../../components/Loading";

const Register = () => {
  const { isLoading, registerByUser, error } = useAuth();
  const navigate = useNavigate();
   

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerByUser(data).unwrap();
       
       navigate("/dashboard/home")
    } catch (error) {
      console.log("something went wrong from register data fetching", error);
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
        <div className="relative min-h-[600px] lg:min-h-[650px] bg-[#0d657b] overflow-hidden">
          {/* Background effects */}
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

            {/* Main text */}
            <div className="max-w-md mt-16 lg:mt-0">
              <p className="text-white/70 text-sm font-semibold tracking-[3px] uppercase mb-5">
                Build With AI
              </p>

              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
                Your ideas.
                <br />
                Your vision.
                <br />
                <span className="text-[#9ce7ed]">Your AI.</span>
              </h1>

              <p className="mt-6 text-white/75 text-sm sm:text-base leading-7 max-w-sm">
                Create your account and start generating powerful ideas, content
                and experiences with next-generation AI.
              </p>
            </div>

            {/* Bottom */}
            <div className="flex items-end justify-between mt-16">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest">
                  Start creating
                </p>

                <p className="text-white font-semibold mt-1">Your AI journey</p>
              </div>

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black flex items-center justify-center border-4 border-white/10">
                <span className="text-[#9ce7ed] text-xs font-black tracking-widest">
                  GEN AI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-[#f8f8f6] flex items-center justify-center p-8 sm:p-12 lg:p-14">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <div className="mb-7">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#101718]">
                Create account
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Enter your details to get started.
              </p>
            </div>
            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* ================= USERNAME ================= */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#202526] mb-2"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className={`w-full h-11 px-4 rounded-lg border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } bg-white outline-none text-sm transition focus:border-[#0d657b] focus:ring-2 focus:ring-[#0d657b]/10`}
                />

                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

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
                  className={`w-full h-11 px-4 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } bg-white outline-none text-sm transition focus:border-[#0d657b] focus:ring-2 focus:ring-[#0d657b]/10`}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
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

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full h-11 px-4 pr-12 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } bg-white outline-none text-sm transition focus:border-[#0d657b] focus:ring-2 focus:ring-[#0d657b]/10`}
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0d657b] text-lg"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* ================= CONFIRM PASSWORD ================= */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#202526] mb-2"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className={`w-full h-11 px-4 pr-12 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } bg-white outline-none text-sm transition focus:border-[#0d657b] focus:ring-2 focus:ring-[#0d657b]/10`}
                  />

                  {/* Show / Hide Confirm Password */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0d657b] text-lg"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* ================= TERMS ================= */}
              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 accent-[#0d657b]"
                  {...register("terms", {
                    required: "You must accept the terms",
                  })}
                />

                <span className="text-xs text-gray-500 leading-5">
                  I agree to the{" "}
                  <span className="text-[#0d657b] font-semibold">
                    Terms & Conditions
                  </span>
                </span>
              </label>

              {errors.terms && (
                <p className="text-red-500 text-xs">{errors.terms.message}</p>
              )}

              {/* ================= REGISTER BUTTON ================= */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="active:scale-95 w-full h-12 bg-[#0d657b] text-white rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isSubmitting ? "Account Creating..." : "Create Account"}
              </button>
            </form>

            {/* ================= LOGIN ================= */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Already have an account?{" "}
              <Link
                to={"/"}
                className="font-semibold text-[#0d657b] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
