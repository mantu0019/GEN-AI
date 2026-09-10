  
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/100 backdrop-blur-md">
      <div className="flex flex-col items-center">

        {/* Loader */}
        <div className="relative h-20 w-20">

          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse" />

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-white/10" />

          {/* Main Spinner */}
          <div
            className="absolute inset-1 rounded-full border-[3px] border-transparent animate-spin"
            style={{
              borderTopColor: "#fb923c",
              borderRightColor: "#f87171",
            }}
          />

          {/* Second Spinner */}
          <div
            className="absolute inset-3 rounded-full border-2 border-transparent animate-[spin_1.5s_linear_infinite_reverse]"
            style={{
              borderBottomColor: "#fdba74",
              borderLeftColor: "#ef4444",
            }}
          />

          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-orange-400 to-red-500 shadow-[0_0_20px_rgba(251,146,60,0.8)] animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="mt-5 text-center">
          <p className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-[length:200%_auto] bg-clip-text text-sm font-semibold tracking-widest text-transparent animate-[gradient_2s_linear_infinite]">
            LOADING
          </p>

          <p className="mt-1 text-xs text-white/40">
            Please wait a moment...
          </p>
        </div>

        {/* Dots */}
        <div className="mt-3 flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-bounce" />
        </div>

      </div>
    </div>
  );
};

export default Loading;
 
