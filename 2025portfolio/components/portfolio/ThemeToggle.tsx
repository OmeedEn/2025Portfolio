"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Zap, Sparkles, Cpu, Flame } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log("Theme toggle clicked, current theme:", theme);
    toggleTheme();
  };

  const themeConfig = {
    laser: {
      icon: Zap,
      label: "Laser Mode",
      bgClass:
        "bg-cyan-500/20 border-2 border-cyan-400/60 text-cyan-300 hover:bg-cyan-500/30",
      shadowStyle: {
        boxShadow:
          "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
      },
    },
    regular: {
      icon: Sparkles,
      label: "Classic Mode",
      bgClass:
        "bg-blue-500/20 border-2 border-blue-400/60 text-blue-300 hover:bg-blue-500/30",
      shadowStyle: {
        boxShadow:
          "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)",
      },
    },
    digital: {
      icon: Cpu,
      label: "Digital Mode",
      bgClass:
        "bg-orange-500/20 border-2 border-orange-400/60 text-orange-300 hover:bg-orange-500/30",
      shadowStyle: {
        boxShadow:
          "0 0 20px rgba(251, 146, 60, 0.5), 0 0 40px rgba(251, 146, 60, 0.3)",
      },
    },
    firewater: {
      icon: Flame,
      label: "Fire & Water",
      bgClass:
        "bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-2 border-purple-400/60 text-purple-200 hover:from-orange-500/30 hover:to-blue-500/30",
      shadowStyle: {
        boxShadow:
          "0 0 20px rgba(255, 100, 100, 0.5), 0 0 40px rgba(100, 150, 255, 0.3)",
      },
    },
  };

  const config = themeConfig[theme];
  const Icon = config.icon;

  return (
    <button
      onClick={handleClick}
      className={`
        fixed top-6 right-6 z-[9999]
        px-4 py-2 rounded-lg
        font-mono text-sm uppercase tracking-wider
        transition-all duration-300
        flex items-center gap-2
        shadow-lg
        ${config.bgClass}
      `}
      style={config.shadowStyle}
    >
      <Icon className="w-4 h-4" />
      <span>{config.label}</span>
    </button>
  );
};
