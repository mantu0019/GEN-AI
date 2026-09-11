 


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import Loading from "../../../components/Loading";

const Login = () => {
  const { loginByUser, isLoading, error } = useAuth();
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    
      setSubmitError("");


    try {
      await loginByUser(data).unwrap();

      navigate("/dashboard/home");

    } catch (error) {
      console.log(
        "something went wrong from login data fetching",
        error
      );
       setSubmitError(
      error?.message || "Invalid email or password"
    );

    }



  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">

      {/* ================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute left-[-250px] top-[-250px] h-[550px] w-[550px] rounded-full bg-orange-600/10 blur-[150px]" />

        <div className="absolute right-[-250px] top-[15%] h-[550px] w-[550px] rounded-full bg-red-600/10 blur-[160px]" />

        <div className="absolute bottom-[-300px] left-[35%] h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[150px]" />

      </div>

      {/* ================================= */}
      {/* MAIN CARD */}
      {/* ================================= */}

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/90 shadow-2xl shadow-black/50 backdrop-blur-xl">

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="relative min-h-[500px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">

            {/* Decorative glow */}

            <div className="absolute inset-0 pointer-events-none">

              <div className="absolute left-[-180px] top-[-180px] h-[450px] w-[450px] rounded-full bg-orange-600/10 blur-[120px]" />

              <div className="absolute bottom-[-180px] right-[-120px] h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[130px]" />

              {/* Grid */}

              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "45px 45px",
                }}
              />

            </div>

            {/* Left content */}

            <div className="relative z-10 flex h-full min-h-[500px] flex-col justify-between p-6 sm:p-8 lg:p-9">

              {/* Logo */}

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/20">

                  <span className="text-base font-black text-white">
                    AI
                  </span>

                </div>

                <span className="text-lg font-bold tracking-wide text-white">
                  JobPilot AI
                </span>

              </div>

              {/* Hero */}

              <div className="mt-10 max-w-md lg:mt-0">

                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[4px] text-orange-400">
                  Generative Intelligence
                </p>

                <h1 className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">

                  Prepare.

                  <br />

                  Practice.

                  <br />

                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent">
                    Succeed.
                  </span>

                </h1>

                <p className="mt-5 max-w-sm text-xs leading-6 text-zinc-400 sm:text-sm">
                  Let AI analyze your skills, experience and target role
                  to build a personalized interview preparation strategy.
                </p>

              </div>

              {/* Bottom */}

              <div className="mt-10 flex items-end justify-between gap-5">

                <div>

                  <p className="text-[10px] uppercase tracking-widest text-zinc-600">
                    Powered by
                  </p>

                  <p className="mt-1 text-xs font-semibold text-zinc-300">
                    Next Generation AI
                  </p>

                </div>

                {/* AI Circle */}

                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/5 shadow-[0_0_50px_rgba(249,115,22,0.08)] sm:h-20 sm:w-20">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#151515] sm:h-14 sm:w-14">

                    <span className="text-[9px] font-black tracking-[3px] text-orange-400">
                      GEN AI
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* RIGHT SIDE - LOGIN */}
          {/* ================================= */}

          <div className="flex items-center justify-center bg-[#0e0e0e] p-6 sm:p-8 lg:p-12">

            <div className="w-full max-w-sm">

              {/* Heading */}

              <div className="mb-7">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1.5">

                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />

                  <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-300">
                    Welcome back
                  </span>

                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Sign in
                </h2>

                <p className="mt-2 text-xs leading-6 text-zinc-500 sm:text-sm">
                  Welcome back! Enter your details to continue.
                </p>

              </div>

              {/* Error */}

              {error && (

                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5">

                  <p className="text-xs leading-5 text-red-400">
                    ⚠ {error}
                    
                  </p>

                </div>

              )}

              {/* ================================= */}
              {/* FORM */}
              {/* ================================= */}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-zinc-300"
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
                    className={`h-11 w-full rounded-xl border ${
                      errors.email
                        ? "border-red-500/60"
                        : "border-white/10"
                    } bg-[#191919] px-4 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20`}
                  />

                  {errors.email && (

                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.email.message}
                    </p>

                  )}

                </div>

                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-xs font-medium text-zinc-300"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters",
                        },
                      })}
                      className={`h-11 w-full rounded-xl border ${
                        errors.password
                          ? "border-red-500/60"
                          : "border-white/10"
                      } bg-[#191919] px-4 pr-12 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition hover:text-orange-400"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>

                  </div>

                  {errors.password && (

                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.password.message}
                    </p>

                  )}

                </div>

                {/* REMEMBER / FORGOT */}

                <div className="flex items-center justify-between">

                  <label className="flex cursor-pointer items-center gap-2">

                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-[#191919] accent-orange-500"
                    />

                    <span className="text-xs text-zinc-500">
                      Remember me
                    </span>

                  </label>

                   

                </div>

                {/* LOGIN */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-orange-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >

                  {isSubmitting
                    ? "Signing in..."
                    : "Sign in"}

                  {!isSubmitting && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  )}

                </button>

              </form>

              {/* SIGNUP */}

              <p className="mt-6 text-center text-sm text-zinc-500">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-orange-400 transition hover:text-orange-300 hover:underline"
                >
                  Sign up
                </Link>

              </p>

              {/* Bottom text */}

              <div className="mt-6 flex items-center justify-center gap-3 text-[10px] text-zinc-700">

                <span>AI-Powered</span>

                <span className="h-1 w-1 rounded-full bg-zinc-700" />

                <span>Secure Login</span>

                <span className="h-1 w-1 rounded-full bg-zinc-700" />

                <span>JobPilot AI</span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Login;