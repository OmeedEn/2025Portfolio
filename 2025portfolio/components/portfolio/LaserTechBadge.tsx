"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LaserTechBadgeProps {
  children: React.ReactNode;
  color?: "cyan" | "magenta" | "yellow" | "green" | "red" | "blue";
  delay?: number;
  variant?: "solid" | "outline" | "glow";
}

export const LaserTechBadge: React.FC<LaserTechBadgeProps> = ({
  children,
  color = "cyan",
  variant = "glow",
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const colorMap = {
    cyan: {
      bg: "from-cyan-400 to-cyan-500",
      border: "border-cyan-300",
      glow: "rgba(34, 211, 238, 0.8)",
      shadow: "shadow-cyan-400/70",
      text: "text-white",
    },
    magenta: {
      bg: "from-fuchsia-400 to-pink-500",
      border: "border-fuchsia-300",
      glow: "rgba(240, 101, 240, 0.8)",
      shadow: "shadow-fuchsia-400/70",
      text: "text-white",
    },
    yellow: {
      bg: "from-yellow-300 to-amber-400",
      border: "border-yellow-200",
      glow: "rgba(253, 224, 71, 0.8)",
      shadow: "shadow-yellow-300/70",
      text: "text-gray-900",
    },
    green: {
      bg: "from-emerald-400 to-green-500",
      border: "border-emerald-300",
      glow: "rgba(52, 211, 153, 0.8)",
      shadow: "shadow-emerald-400/70",
      text: "text-white",
    },
    red: {
      bg: "from-red-400 to-rose-500",
      border: "border-red-300",
      glow: "rgba(248, 113, 113, 0.8)",
      shadow: "shadow-red-400/70",
      text: "text-white",
    },
    blue: {
      bg: "from-blue-400 to-indigo-500",
      border: "border-blue-300",
      glow: "rgba(96, 165, 250, 0.8)",
      shadow: "shadow-blue-400/70",
      text: "text-white",
    },
  };

  const colors = colorMap[color];

  useEffect(() => {
    if (!badgeRef.current || !glowRef.current) return;

    const ctx = gsap.context(() => {
      // Pulsing glow animation that matches laser intensity
      gsap.to(glowRef.current, {
        opacity: 0.9,
        scale: 1.15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, badgeRef);

    return () => ctx.revert();
  }, []);

  if (variant === "outline") {
    return (
      <div
        ref={badgeRef}
        className={`
          relative px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider
          border-2 ${colors.border} ${colors.text}
          bg-black/60 backdrop-blur-sm
          hover:bg-black/80 transition-all duration-300
          cursor-default inline-block
          shadow-lg ${colors.shadow}
          z-30
          group
        `}
        style={{
          boxShadow: `0 0 15px ${colors.glow}, 0 0 30px ${colors.glow}`,
        }}
      >
        {/* Animated border glow */}
        <div
          className="absolute inset-0 rounded-md opacity-50"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
            backgroundSize: "200% 100%",
            animation: "laser-sweep 3s linear infinite",
            zIndex: -1,
          }}
        />

        {/* Corner glow dots */}
        <div
          className="absolute top-0 left-0 w-1 h-1 rounded-full opacity-80"
          style={{
            background: colors.glow,
            boxShadow: `0 0 4px ${colors.glow}`,
          }}
        />
        <div
          className="absolute top-0 right-0 w-1 h-1 rounded-full opacity-80"
          style={{
            background: colors.glow,
            boxShadow: `0 0 4px ${colors.glow}`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1 h-1 rounded-full opacity-80"
          style={{
            background: colors.glow,
            boxShadow: `0 0 4px ${colors.glow}`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-1 h-1 rounded-full opacity-80"
          style={{
            background: colors.glow,
            boxShadow: `0 0 4px ${colors.glow}`,
          }}
        />

        <span className="relative z-10">{children}</span>
      </div>
    );
  }

  if (variant === "solid") {
    return (
      <div
        ref={badgeRef}
        className={`
          relative px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider
          bg-gradient-to-r ${colors.bg}
          ${colors.text} font-bold
          border-2 ${colors.border}
          shadow-xl ${colors.shadow}
          hover:scale-105 transition-all duration-300
          cursor-default inline-block
          z-30
          group overflow-hidden
        `}
        style={{
          boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}`,
        }}
      >
        {/* Laser shine effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${colors.glow} 50%, transparent 70%)`,
            backgroundSize: "200% 200%",
            animation: "laser-sweep 2s linear infinite",
          }}
        />

        {/* Scan line effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(180deg, transparent, ${colors.glow}, transparent)`,
            backgroundSize: "100% 50%",
            animation: "laser-scan 3s ease-in-out infinite",
          }}
        />

        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  // Default: glow variant with laser effects
  return (
    <div
      ref={badgeRef}
      className="relative inline-block cursor-default group z-30"
      style={{ isolation: "isolate" }}
    >
      {/* Animated glow background */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-lg blur-lg opacity-80 z-0"
        style={{
          background: colors.glow,
        }}
      />

      {/* Outer laser ring */}
      <div
        className="absolute inset-[-2px] rounded-lg opacity-60 z-0"
        style={{
          background: `linear-gradient(90deg, ${colors.glow}, transparent, ${colors.glow})`,
          backgroundSize: "200% 100%",
          animation: "laser-sweep 3s linear infinite",
        }}
      />

      {/* Main badge content */}
      <div
        className={`
          relative z-50 px-4 py-2 rounded-lg
          bg-gradient-to-r ${colors.bg}
          border-2 ${colors.border}
          ${colors.text} font-bold
          font-mono text-xs uppercase tracking-widest
          shadow-2xl ${colors.shadow}
          transition-all duration-300
          group-hover:scale-110 group-hover:brightness-110
        `}
        style={{
          boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}, inset 0 0 10px rgba(255, 255, 255, 0.2)`,
        }}
      >
        {/* Animated laser scan line */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden z-0"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${colors.glow} 50%, transparent 100%)`,
            backgroundSize: "100% 200%",
            animation: "laser-scan 2s ease-in-out infinite",
            opacity: 0.3,
          }}
        />

        <div className="relative flex items-center gap-2 z-10">
          {/* Hexagon indicator */}
          <svg
            width="8"
            height="8"
            viewBox="0 0 10 10"
            className="animate-pulse"
          >
            <polygon
              points="5,0 9.33,2.5 9.33,7.5 5,10 0.67,7.5 0.67,2.5"
              fill="currentColor"
              opacity="0.9"
            />
          </svg>
          <span className="drop-shadow-lg">{children}</span>
        </div>

        {/* Corner accents with laser glow */}
        <div
          className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/80 rounded-tl"
          style={{
            boxShadow: `0 0 5px ${colors.glow}, 0 0 10px ${colors.glow}`,
            filter: "brightness(1.5)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/80 rounded-tr"
          style={{
            boxShadow: `0 0 5px ${colors.glow}, 0 0 10px ${colors.glow}`,
            filter: "brightness(1.5)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/80 rounded-bl"
          style={{
            boxShadow: `0 0 5px ${colors.glow}, 0 0 10px ${colors.glow}`,
            filter: "brightness(1.5)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/80 rounded-br"
          style={{
            boxShadow: `0 0 5px ${colors.glow}, 0 0 10px ${colors.glow}`,
            filter: "brightness(1.5)",
          }}
        />
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: colors.glow,
            top: "10%",
            left: "10%",
            animation: "particle-float 3s ease-in-out infinite",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: colors.glow,
            top: "20%",
            right: "15%",
            animation: "particle-float 3s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: colors.glow,
            bottom: "15%",
            left: "20%",
            animation: "particle-float 3s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
      </div>
    </div>
  );
};
