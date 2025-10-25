"use client";

import React from "react";
import {
  Sparkles,
  Briefcase,
  Code,
  GraduationCap,
  Contact,
} from "lucide-react";

interface EnhancedHomeViewProps {
  onNavigate: (view: string) => void;
}

export const EnhancedHomeView = ({
  onNavigate,
}: EnhancedHomeViewProps) => {
  // Removed all entrance animations to prevent elements from disappearing

  const navigationButtons = [
    {
      view: "experience",
      icon: Briefcase,
      label: "Experience",
      color: "from-blue-500 to-cyan-500",
    },
    {
      view: "projects",
      icon: Code,
      label: "Projects",
      color: "from-purple-500 to-pink-500",
    },
    {
      view: "education",
      icon: GraduationCap,
      label: "Education",
      color: "from-green-500 to-emerald-500",
    },
    {
      view: "contact",
      icon: Contact,
      label: "Contact",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="text-center max-w-4xl relative">
      {/* Available chip */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
        <Sparkles className="w-4 h-4 text-blue-400 relative z-10" />
        <span className="text-sm font-medium text-blue-200 relative z-10">
          Available for new opportunities
        </span>
      </div>

      {/* Main title with gradient animation */}
      <h1
        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
        style={{ backgroundSize: "200% auto" }}
      >
        Omeed Enshaie
      </h1>

      {/* Subtitle with typing effect */}
      <p
        className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
      >
        Software Engineer & Full-Stack Developer
      </p>

      {/* Description */}
      <p
        className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        Leading high-performance teams to build scalable, user-centric
        applications.
      </p>

      {/* Navigation buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {navigationButtons.map(({ view, icon: Icon, label, color }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={`group relative px-6 py-3 bg-gradient-to-r ${color} rounded-xl overflow-hidden transition-all duration-300 hover:scale-110`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
            <div className="relative z-10 flex items-center gap-2 text-white font-semibold">
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        ))}
      </div>

      {/* Footer */}
      <p
        className="text-gray-500 text-sm mt-16 opacity-0 animate-fade-in"
        style={{ animationDelay: "3s", animationFillMode: "forwards" }}
      >
        © 2025 Omeed Enshaie. Crafted with passion.
      </p>
    </div>
  );
};
