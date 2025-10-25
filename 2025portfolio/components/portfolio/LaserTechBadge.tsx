"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

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
  const { theme } = useTheme();

  const colorMap = {
    cyan: {
      bg: "from-cyan-400 to-cyan-500",
      border: "border-cyan-300",
      glow: "rgba(34, 211, 238, 0.8)",
      shadow: "shadow-cyan-400/70",
      text: "text-white",
      digital: {
        bg: "from-orange-400 to-orange-500",
        border: "border-orange-300",
        glow: "rgba(251, 146, 60, 0.8)",
      },
      firewater: {
        bg: "from-orange-400 via-purple-400 to-blue-400",
        border: "border-purple-300",
        glow: "rgba(200, 100, 200, 0.8)",
      },
    },
    magenta: {
      bg: "from-fuchsia-400 to-pink-500",
      border: "border-fuchsia-300",
      glow: "rgba(240, 101, 240, 0.8)",
      shadow: "shadow-fuchsia-400/70",
      text: "text-white",
      digital: {
        bg: "from-amber-400 to-orange-600",
        border: "border-amber-300",
        glow: "rgba(245, 158, 11, 0.8)",
      },
      firewater: {
        bg: "from-red-400 via-purple-500 to-cyan-400",
        border: "border-pink-300",
        glow: "rgba(220, 100, 180, 0.8)",
      },
    },
    yellow: {
      bg: "from-yellow-300 to-amber-400",
      border: "border-yellow-200",
      glow: "rgba(253, 224, 71, 0.8)",
      shadow: "shadow-yellow-300/70",
      text: "text-gray-900",
      digital: {
        bg: "from-orange-300 to-orange-400",
        border: "border-orange-200",
        glow: "rgba(251, 146, 60, 0.8)",
      },
      firewater: {
        bg: "from-yellow-300 via-rose-300 to-sky-300",
        border: "border-amber-200",
        glow: "rgba(240, 180, 120, 0.8)",
      },
    },
    green: {
      bg: "from-emerald-400 to-green-500",
      border: "border-emerald-300",
      glow: "rgba(52, 211, 153, 0.8)",
      shadow: "shadow-emerald-400/70",
      text: "text-white",
      digital: {
        bg: "from-orange-500 to-red-500",
        border: "border-orange-400",
        glow: "rgba(249, 115, 22, 0.8)",
      },
      firewater: {
        bg: "from-emerald-400 via-indigo-400 to-blue-400",
        border: "border-teal-300",
        glow: "rgba(100, 180, 200, 0.8)",
      },
    },
    red: {
      bg: "from-red-400 to-rose-500",
      border: "border-red-300",
      glow: "rgba(248, 113, 113, 0.8)",
      shadow: "shadow-red-400/70",
      text: "text-white",
      digital: {
        bg: "from-red-500 to-orange-600",
        border: "border-red-400",
        glow: "rgba(239, 68, 68, 0.8)",
      },
      firewater: {
        bg: "from-orange-500 via-red-500 to-blue-500",
        border: "border-rose-300",
        glow: "rgba(255, 120, 100, 0.8)",
      },
    },
    blue: {
      bg: "from-blue-400 to-indigo-500",
      border: "border-blue-300",
      glow: "rgba(96, 165, 250, 0.8)",
      shadow: "shadow-blue-400/70",
      text: "text-white",
      digital: {
        bg: "from-orange-600 to-amber-500",
        border: "border-orange-500",
        glow: "rgba(234, 88, 12, 0.8)",
      },
      firewater: {
        bg: "from-cyan-400 via-violet-400 to-orange-400",
        border: "border-indigo-300",
        glow: "rgba(150, 100, 220, 0.8)",
      },
    },
  };

  const colors = colorMap[color];

  // Use theme-specific colors
  const activeBg = theme === "digital" ? colors.digital.bg : theme === "firewater" ? colors.firewater.bg : colors.bg;
  const activeBorder = theme === "digital" ? colors.digital.border : theme === "firewater" ? colors.firewater.border : colors.border;
  const activeGlow = theme === "digital" ? colors.digital.glow : theme === "firewater" ? colors.firewater.glow : colors.glow;

  useEffect(() => {
    if (!badgeRef.current || !glowRef.current || theme !== "laser") return;

    const ctx = gsap.context(() => {
      // Pulsing glow animation that matches laser intensity - laser theme only
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
  }, [theme]);

  if (variant === "outline") {
    return (
      <div
        ref={badgeRef}
        className={`
          relative px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider
          border-2 ${activeBorder} ${colors.text}
          ${
            theme === "laser"
              ? "bg-black/60"
              : theme === "digital"
              ? "bg-black/80"
              : "bg-slate-700/80"
          }
          backdrop-blur-sm
          hover:bg-black/80 transition-all duration-300
          cursor-default inline-block
          shadow-lg ${colors.shadow}
          z-30
          group
          ${theme === "digital" ? "border-dashed" : ""}
        `}
        style={
          theme === "laser"
            ? { boxShadow: `0 0 15px ${activeGlow}, 0 0 30px ${activeGlow}` }
            : theme === "digital"
            ? {
                boxShadow: `0 0 15px ${activeGlow}, 0 0 25px rgba(0, 0, 0, 0.5)`,
              }
            : {
                boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`,
              }
        }
      >
        {/* Animated border glow - laser theme only */}
        {theme === "laser" && (
          <>
            <div
              className="absolute inset-0 rounded-md opacity-50"
              style={{
                background: `linear-gradient(90deg, transparent, ${activeGlow}, transparent)`,
                backgroundSize: "200% 100%",
                animation: "laser-sweep 3s linear infinite",
                zIndex: -1,
              }}
            />

            {/* Corner glow dots */}
            <div
              className="absolute top-0 left-0 w-1 h-1 rounded-full opacity-80"
              style={{
                background: activeGlow,
                boxShadow: `0 0 4px ${activeGlow}`,
              }}
            />
            <div
              className="absolute top-0 right-0 w-1 h-1 rounded-full opacity-80"
              style={{
                background: activeGlow,
                boxShadow: `0 0 4px ${activeGlow}`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-1 h-1 rounded-full opacity-80"
              style={{
                background: activeGlow,
                boxShadow: `0 0 4px ${activeGlow}`,
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-1 h-1 rounded-full opacity-80"
              style={{
                background: activeGlow,
                boxShadow: `0 0 4px ${activeGlow}`,
              }}
            />
          </>
        )}

        {/* Digital circuit lines - digital theme only */}
        {theme === "digital" && (
          <>
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-60"
              style={{
                background: `linear-gradient(90deg, transparent, ${activeGlow}, transparent)`,
                backgroundSize: "200% 100%",
                animation: "laser-sweep 4s linear infinite",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-60"
              style={{
                background: `linear-gradient(90deg, transparent, ${activeGlow}, transparent)`,
                backgroundSize: "200% 100%",
                animation: "laser-sweep 4s linear infinite reverse",
              }}
            />
          </>
        )}

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
          bg-gradient-to-r ${activeBg}
          ${colors.text} font-bold
          border-2 ${activeBorder}
          shadow-xl ${colors.shadow}
          hover:scale-105 transition-all duration-300
          cursor-default inline-block
          z-30
          group overflow-hidden
          ${theme === "digital" ? "border-dashed" : ""}
        `}
        style={
          theme === "laser"
            ? { boxShadow: `0 0 20px ${activeGlow}, 0 0 40px ${activeGlow}` }
            : theme === "digital"
            ? {
                boxShadow: `0 0 20px ${activeGlow}, 0 0 35px rgba(0, 0, 0, 0.6)`,
              }
            : {
                boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`,
              }
        }
      >
        {/* Laser effects - laser theme only */}
        {theme === "laser" && (
          <>
            {/* Laser shine effect */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(45deg, transparent 30%, ${activeGlow} 50%, transparent 70%)`,
                backgroundSize: "200% 200%",
                animation: "laser-sweep 2s linear infinite",
              }}
            />

            {/* Scan line effect */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(180deg, transparent, ${activeGlow}, transparent)`,
                backgroundSize: "100% 50%",
                animation: "laser-scan 3s ease-in-out infinite",
              }}
            />
          </>
        )}

        {/* Digital data flow - digital theme only */}
        {theme === "digital" && (
          <>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `repeating-linear-gradient(90deg, transparent, transparent 2px, ${activeGlow} 2px, ${activeGlow} 4px)`,
                backgroundSize: "20px 100%",
                animation: "laser-sweep 3s linear infinite",
              }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${activeGlow} 2px, ${activeGlow} 4px)`,
                backgroundSize: "100% 20px",
                animation: "laser-scan 4s linear infinite",
              }}
            />
          </>
        )}

        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  // Default: glow variant with laser effects (laser theme) or clean design (regular theme)
  return (
    <div
      ref={badgeRef}
      className="relative inline-block cursor-default group z-30"
      style={{ isolation: "isolate" }}
    >
      {/* Animated glow background - laser theme only */}
      {theme === "laser" && (
        <>
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-lg blur-lg opacity-80 z-0"
            style={{
              background: activeGlow,
            }}
          />

          {/* Outer laser ring */}
          <div
            className="absolute inset-[-2px] rounded-lg opacity-60 z-0"
            style={{
              background: `linear-gradient(90deg, ${activeGlow}, transparent, ${activeGlow})`,
              backgroundSize: "200% 100%",
              animation: "laser-sweep 3s linear infinite",
            }}
          />
        </>
      )}

      {/* Digital pulsing glow - digital theme only */}
      {theme === "digital" && (
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-lg blur-md opacity-60 z-0"
          style={{
            background: activeGlow,
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Main badge content */}
      <div
        className={`
          relative z-50 px-4 py-2 rounded-lg
          bg-gradient-to-r ${activeBg}
          border-2 ${activeBorder}
          ${colors.text} font-bold
          font-mono text-xs uppercase tracking-widest
          ${theme === "laser" ? "shadow-2xl" : "shadow-lg"} ${colors.shadow}
          transition-all duration-300
          group-hover:scale-110 group-hover:brightness-110
          ${theme === "digital" ? "border-dashed" : ""}
        `}
        style={
          theme === "laser"
            ? {
                boxShadow: `0 0 20px ${activeGlow}, 0 0 40px ${activeGlow}, inset 0 0 10px rgba(255, 255, 255, 0.2)`,
              }
            : theme === "digital"
            ? {
                boxShadow: `0 0 20px ${activeGlow}, 0 0 35px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(251, 146, 60, 0.1)`,
              }
            : {
                boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`,
              }
        }
      >
        {/* Animated laser scan line - laser theme only */}
        {theme === "laser" && (
          <div
            className="absolute inset-0 rounded-lg overflow-hidden z-0"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${activeGlow} 50%, transparent 100%)`,
              backgroundSize: "100% 200%",
              animation: "laser-scan 2s ease-in-out infinite",
              opacity: 0.3,
            }}
          />
        )}

        {/* Digital grid pattern - digital theme only */}
        {theme === "digital" && (
          <div
            className="absolute inset-0 rounded-lg overflow-hidden z-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(${activeGlow} 1px, transparent 1px),
                linear-gradient(90deg, ${activeGlow} 1px, transparent 1px)
              `,
              backgroundSize: "8px 8px",
            }}
          />
        )}

        <div className="relative flex items-center gap-2 z-10">
          {/* Hexagon indicator */}
          <svg
            width="8"
            height="8"
            viewBox="0 0 10 10"
            className={theme === "laser" ? "animate-pulse" : ""}
          >
            <polygon
              points="5,0 9.33,2.5 9.33,7.5 5,10 0.67,7.5 0.67,2.5"
              fill="currentColor"
              opacity="0.9"
            />
          </svg>
          <span className="drop-shadow-lg">{children}</span>
        </div>

        {/* Corner accents with laser glow - laser theme only */}
        {theme === "laser" ? (
          <>
            <div
              className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/80 rounded-tl"
              style={{
                boxShadow: `0 0 5px ${activeGlow}, 0 0 10px ${activeGlow}`,
                filter: "brightness(1.5)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/80 rounded-tr"
              style={{
                boxShadow: `0 0 5px ${activeGlow}, 0 0 10px ${activeGlow}`,
                filter: "brightness(1.5)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/80 rounded-bl"
              style={{
                boxShadow: `0 0 5px ${activeGlow}, 0 0 10px ${activeGlow}`,
                filter: "brightness(1.5)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/80 rounded-br"
              style={{
                boxShadow: `0 0 5px ${activeGlow}, 0 0 10px ${activeGlow}`,
                filter: "brightness(1.5)",
              }}
            />
          </>
        ) : theme === "digital" ? (
          <>
            {/* Circuit-style corners for digital theme */}
            <div
              className="absolute top-0 left-0 w-3 h-3"
              style={{
                borderTop: `2px solid ${activeGlow}`,
                borderLeft: `2px solid ${activeGlow}`,
                borderTopLeftRadius: "2px",
              }}
            />
            <div
              className="absolute top-0 right-0 w-3 h-3"
              style={{
                borderTop: `2px solid ${activeGlow}`,
                borderRight: `2px solid ${activeGlow}`,
                borderTopRightRadius: "2px",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-3 h-3"
              style={{
                borderBottom: `2px solid ${activeGlow}`,
                borderLeft: `2px solid ${activeGlow}`,
                borderBottomLeftRadius: "2px",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3"
              style={{
                borderBottom: `2px solid ${activeGlow}`,
                borderRight: `2px solid ${activeGlow}`,
                borderBottomRightRadius: "2px",
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-white/60 rounded-tl" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-white/60 rounded-tr" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-white/60 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-white/60 rounded-br" />
          </>
        )}
      </div>

      {/* Particle effects - laser theme only */}
      {theme === "laser" && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: activeGlow,
              top: "10%",
              left: "10%",
              animation: "particle-float 3s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: activeGlow,
              top: "20%",
              right: "15%",
              animation: "particle-float 3s ease-in-out infinite",
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: activeGlow,
              bottom: "15%",
              left: "20%",
              animation: "particle-float 3s ease-in-out infinite",
              animationDelay: "2s",
            }}
          />
        </div>
      )}

      {/* Digital binary particles - digital theme only */}
      {theme === "digital" && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute text-[6px] font-mono opacity-40"
            style={{
              color: activeGlow,
              top: "15%",
              left: "5%",
              animation: "particle-float 4s ease-in-out infinite",
            }}
          >
            01
          </div>
          <div
            className="absolute text-[6px] font-mono opacity-40"
            style={{
              color: activeGlow,
              top: "25%",
              right: "10%",
              animation: "particle-float 4s ease-in-out infinite",
              animationDelay: "1.5s",
            }}
          >
            10
          </div>
          <div
            className="absolute text-[6px] font-mono opacity-40"
            style={{
              color: activeGlow,
              bottom: "20%",
              left: "15%",
              animation: "particle-float 4s ease-in-out infinite",
              animationDelay: "3s",
            }}
          >
            FF
          </div>
        </div>
      )}
    </div>
  );
};
