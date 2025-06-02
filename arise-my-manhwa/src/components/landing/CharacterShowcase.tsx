"use client";
import React from "react";
import { Card, CardContent } from "@/components/landing/radixUI/card";
import { Badge } from "@/components/landing/radixUI/badge";
import { Sparkles, Star, BookOpen } from "lucide-react";

export const CharacterShowcase = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-20 mb-20">
      <Card className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-lg border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              // src="/lovable-uploads/3d183691-c12a-43fb-b864-1de30ee76268.png"
              src="https://i.ytimg.com/vi/_gd8qB6OUQw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDThuEqXmtLSciENYfaZOpFiy73Dw"
              alt="Sung Jin-Woo Shadow Monarch"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                Shadow Monarch
              </h3>
              <p className="text-purple-200">Korean Manhwa Style</p>
              <Badge className="mt-2 bg-purple-500/80">
                Sung Jin-Woo Inspired
              </Badge>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-900/50 to-blue-900/50 backdrop-blur-lg border-red-500/30 hover:border-red-400/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              // src="/lovable-uploads/729b82dc-34a0-4ff0-bcee-fb3acafa4189.png"
              src="https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/1432042184990-9NDIM6ZRLER2JKQWHOXJ/batman-and-superman-fight-in-promo-art-for-batman-v-superman"
              alt="Superman and Batman"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                Heroes United
              </h3>
              <p className="text-red-200">DC & Marvel Style</p>
              <Badge className="mt-2 bg-red-500/80">Superhero Comics</Badge>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center animate-pulse">
              <Star className="w-8 h-8 text-red-200" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-lg border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              // src="/lovable-uploads/cca0e27e-92ff-4a81-8805-c1464d2f7b59.png"
              // src="https://cdnb.artstation.com/p/assets/images/images/052/720/301/large/efilanore-img-2730.jpg?1660515369"
              src="https://i.pinimg.com/originals/0e/58/6d/0e586d73c91d404d39b87c29586617b8.jpg"
              alt="Sasuke and Itachi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                Anime Legends
              </h3>
              <p className="text-emerald-200">Japanese Manga Style</p>
              <Badge className="mt-2 bg-emerald-500/80">Classic Anime</Badge>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-emerald-500/30 rounded-full flex items-center justify-center animate-pulse">
              <BookOpen className="w-8 h-8 text-emerald-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
