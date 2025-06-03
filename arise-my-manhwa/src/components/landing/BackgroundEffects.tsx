"use client";
import React from "react";

/**
 * BackgroundEffects component that creates an animated background gradient effect.
 *
 * Features:
 * - Creates a full-screen conic gradient overlay
 * - Animates the gradient in a spinning motion
 * - Uses a cyan/transparent color scheme
 * - Provides subtle visual interest without overwhelming content
 *
 * The component uses:
 * - Absolute positioning to cover the full viewport
 * - CSS conic-gradient for the gradient effect
 * - CSS animation for continuous rotation
 * - Custom animation duration of 20 seconds
 * - Semi-transparent colors to blend with other content
 *
 * This creates an ambient, dynamic background suitable for landing pages
 * and other content where subtle motion adds visual appeal.
 */

export const BackgroundEffects = () => {
  return (
    <>
      <div
        className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(6,182,212,0.1)_60deg,transparent_120deg)] animate-spin"
        style={{ animationDuration: "20s" }}
      />
    </>
  );
};
