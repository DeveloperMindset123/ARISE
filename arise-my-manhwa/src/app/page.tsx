"use client";
import React from "react";
import { useParticleAnimation } from "@/components/hooks/useParticleAnimation";
import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { HeroSection } from "@/components/landing/HeroSection";
import { CharacterShowcase } from "@/components/landing/CharacterShowcase";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { CallToAction } from "@/components/landing/CallToAction";
import { AnimationStyles } from "@/components/landing/AnimationStyles";
import { useRouter } from "next/navigation";
const Index = () => {
  useParticleAnimation();
  const router = useRouter();
  const handleRouteNavigation = () => {
    router.push("/create");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundEffects />

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
