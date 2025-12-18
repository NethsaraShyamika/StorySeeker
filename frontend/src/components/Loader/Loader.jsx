import React from "react";

const Loader = () => {
  return (
    <div role="status" className="flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="w-10 h-10 animate-spin"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="white"
          strokeWidth="5"
          className="opacity-20"
          fill="none"
        />

        <path
          d="M25 5
             a 20 20 0 0 1 20 20"
          stroke="#3b82f6" 
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
