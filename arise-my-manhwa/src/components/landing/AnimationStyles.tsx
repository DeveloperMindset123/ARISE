"use client";
import React from "react";

export const AnimationStyles = () => {
  return (
    <style>
      {`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}
    </style>
  );
};
