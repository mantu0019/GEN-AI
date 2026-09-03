import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-[#0d657b]/30 border-t-[#0d657b] rounded-full animate-spin" />

        {/* Text */}
        <p className="text-[#0d657b] text-sm font-semibold">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default Loading;