import React from "react";
// TODO : add shadcn components
// import { Card, CardContent } from "@/components/ui/card";
import { Zap, Image, Star } from "lucide-react";

export const FeaturesGrid = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-20">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Lightning Speed</h3>
          <p className="text-gray-300">
            Generate stunning artwork in seconds with our optimized AI models
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Image className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Multiple Styles</h3>
          <p className="text-gray-300">
            From manhwa to comics, explore diverse art styles and genres
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
          <p className="text-gray-300">
            Professional-grade results perfect for your creative projects
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
