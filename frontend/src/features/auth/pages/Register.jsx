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
      navigate("/dashboard/home");
    } catch (error) {
      console.log("something went wrong from register data fetching", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[150px] -top-40 -left-40" />
      <div className="absolute w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[160px] -bottom-40 -right-40" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden lg:block min-h-[620px] bg-[#0d0d0d] overflow-hidden">

          {/* Glow */}
          <div className="absolute w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[130px] -top-40 -left-40" />
          <div className="absolute w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[130px] -bottom-40 -right-40" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-between p-9">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="font-black text-lg">AI</span>
              </div>

              <span className="text-xl font-bold tracking-wide">
                JobPilot AI
              </span>
            </div>

            {/* Main Content */}
            <div className="max-w-md">

              <p className="text-orange-400 text-xs font-semibold tracking-[3px] uppercase mb-4">
                Start Your Journey
              </p>

              <h1 className="text-4xl xl:text-5xl font-bold leading-[1.08]">
                Build your career.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                 Crack your dream job.
                </span>
              </h1>

              <p className="mt-5 text-zinc-400 text-sm leading-6 max-w-sm">
             Create your JobPilot AI account to analyze your resume, identify skill gaps, practice interviews, and follow a personalized 7-day roadmap to get job-ready.
              </p>

              {/* Features */}
              <div className="mt-7 space-y-3">

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    ✓
                  </div>
                  <span className="text-sm text-zinc-300">
                    AI-powered interview preparation
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    ✓
                  </div>
                  <span className="text-sm text-zinc-300">
                    Personalized technical & behavioral questions
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    ✓
                  </div>
                  <span className="text-sm text-zinc-300">
                    Smart skill-gap analysis
                  </span>
                </div>

              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-600 text-[10px] uppercase tracking-[3px]">
                  Powered by AI
                </p>

                <p className="text-zinc-300 text-sm font-medium mt-1">
                  Prepare. Practice. Succeed.
                </p>
              </div>

              <div className="w-16 h-16 rounded-full border border-orange-500/20 bg-orange-500/5 flex items-center justify-center">
                <span className="text-orange-400 text-[10px] font-black tracking-widest">
                  GEN AI
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-[#111111] flex items-center justify-center p-6 sm:p-8">

          <div className="w-full max-w-sm">

            {/* Heading */}
            <div className="mb-5">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-[2px] mb-2">
          JobPilot AI
              </p>

              <h2 className="text-3xl font-bold">
                Create account
              </h2>

              <p className="text-zinc-500 text-sm mt-2">
                Create your account and start preparing smarter.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border flex items-center justify-center capitalize border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3"
            >

              {/* Username */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className={`w-full h-10 px-3 rounded-lg bg-[#191919] border ${
                    errors.username
                      ? "border-red-500"
                      : "border-white/10"
                  } text-white text-sm placeholder:text-zinc-600 outline-none focus:border-orange-500 transition`}
                />

                {errors.username && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={`w-full h-10 px-3 rounded-lg bg-[#191919] border ${
                    errors.email
                      ? "border-red-500"
                      : "border-white/10"
                  } text-white text-sm placeholder:text-zinc-600 outline-none focus:border-orange-500 transition`}
                />

                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full h-10 px-3 pr-11 rounded-lg bg-[#191919] border ${
                      errors.password
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white text-sm placeholder:text-zinc-600 outline-none focus:border-orange-500 transition`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-orange-400"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className={`w-full h-10 px-3 pr-11 rounded-lg bg-[#191919] border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white text-sm placeholder:text-zinc-600 outline-none focus:border-orange-500 transition`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-orange-400"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-orange-500"
                  {...register("terms", {
                    required: "You must accept the terms",
                  })}
                />

                <span className="text-xs text-zinc-500">
                  I agree to{" "}
                  <Link to={"/term-condition"}  className="text-orange-400 font-medium">
                    Terms & Conditions
                  </Link>
                </span>
              </label>

              {errors.terms && (
                <p className="text-red-400 text-xs">
                  {errors.terms.message}
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 mt-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50"
              >
                {isSubmitting
                  ? "Account Creating..."
                  : "Create Account"}
              </button>

            </form>

            {/* Login */}
            <p className="text-center text-xs text-zinc-500 mt-5">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-orange-400 font-semibold hover:text-orange-300"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;