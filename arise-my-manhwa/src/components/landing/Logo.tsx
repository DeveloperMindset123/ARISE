import React from "react";

export const Logo = () => {
  return (
    <div className="absolute top-8 left-8 z-20">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hover:scale-105 transition-transform duration-300"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path
          d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM24 8C32.837 8 40 15.163 40 24C40 32.837 32.837 40 24 40C15.163 40 8 32.837 8 24C8 15.163 15.163 8 24 8Z"
          fill="url(#logoGradient)"
        />
        <path
          d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM24 16C28.418 16 32 19.582 32 24C32 28.418 28.418 32 24 32C19.582 32 16 28.418 16 24C16 19.582 19.582 16 24 16Z"
          fill="url(#logoGradient)"
        />
        <path
          d="M24 20C21.791 20 20 21.791 20 24C20 26.209 21.791 28 24 28C26.209 28 28 26.209 28 24C28 21.791 26.209 20 24 20Z"
          fill="url(#logoGradient)"
        />
      </svg>
    </div>
  );
};
