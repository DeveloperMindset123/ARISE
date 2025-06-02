"use client";
import React from "react";

export const BackgroundEffects = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
      <div
        className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(6,182,212,0.1)_60deg,transparent_120deg)] animate-spin"
        style={{ animationDuration: "20s" }}
      />
    </>
  );
};
