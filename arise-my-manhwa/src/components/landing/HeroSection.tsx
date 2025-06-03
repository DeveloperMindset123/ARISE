import React from "react";
import { Button } from "./radixUI/button";
import {
  Sparkles,
  Zap,
  Palette,
  Users,
  ArrowRight,
  Wand2,
  Badge,
} from "lucide-react";

interface HeroSectionProps {
  onStartCreating?: () => void;
}

export const HeroSection = ({ onStartCreating }: HeroSectionProps) => {
  return (
    <div className="text-center mb-16 animate-fade-in">
      {/* <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0 px-6 py-2 text-sm font-semibold">
        <Sparkles className="w-4 h-4 mr-2" />
        AI-Powered Manhwa Generation
      </Badge> */}

      <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6 animate-scale-in">
        Arise My Manhwa
      </h1>

      <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        Unleash the power of shadows and bring your imagination to life. Create
        stunning manhwa, comics, and digital art with advanced AI technology.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-white">Lightning Fast</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <Palette className="w-5 h-5 text-purple-400" />
          <span className="text-white">Multiple Styles</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <Users className="w-5 h-5 text-cyan-400" />
          <span className="text-white">Community Driven</span>
        </div>
      </div>

      <Button
        onClick={onStartCreating}
        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-semibold rounded-lg shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 animate-glow"
      >
        <Wand2 className="w-6 h-6 mr-3" />
        Start Creating Comics
        <ArrowRight className="w-6 h-6 ml-3" />
      </Button>
    </div>
  );
};
