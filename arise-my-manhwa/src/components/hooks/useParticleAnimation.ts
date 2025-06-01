import { useEffect } from "react";

export const useParticleAnimation = () => {
  useEffect(() => {
    // Add floating particles animation
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #8b5cf6, #06b6d4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: float ${5 + Math.random() * 5}s linear forwards;
      `;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 10000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);
};
