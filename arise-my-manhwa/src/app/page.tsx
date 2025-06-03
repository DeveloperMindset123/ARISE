"use client";
import React from "react";
import { useParticleAnimation } from "@/components/hooks/useParticleAnimation";
import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { HeroSection } from "@/components/landing/HeroSection";
import { CharacterShowcase } from "@/components/landing/CharacterShowcase";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { CallToAction } from "@/components/landing/CallToAction";
import { AnimationStyles } from "@/components/landing/AnimationStyles";
import { Logo } from "@/components/landing/Logo";
import { useRouter } from "next/navigation";

/**
 * Landing page component for the Arise My Manhwa application.
 *
 * This page serves as the main entry point and features:
 * - Animated particle background effects
 * - Hero section with call-to-action
 * - Character showcase displaying example manhwa characters
 * - Features grid highlighting key app capabilities
 * - Final call-to-action section
 * - Navigation to the comic creation page
 *
 * The component uses:
 * - Custom particle animation hook for visual effects
 * - Next.js client-side routing
 * - Gradient background with animated overlays
 * - Responsive container layout
 * - Component composition pattern
 *
 * All sub-components are imported from the landing components directory
 * and composed together to create an engaging landing experience.
 */

const Index = () => {
  useParticleAnimation();
  const router = useRouter();
  const handleRouteNavigation = () => {
    router.push("/create");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundEffects />
      <Logo />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <HeroSection onStartCreating={() => handleRouteNavigation()} />
        <CharacterShowcase />
        <FeaturesGrid />
        <CallToAction onStartCreating={() => handleRouteNavigation()} />
      </div>

      <AnimationStyles />
    </div>
  );
};

export default Index;
