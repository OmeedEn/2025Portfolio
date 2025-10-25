"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface HolographicSectionProps {
  children: React.ReactNode;
  title?: string;
  variant?: "primary" | "secondary" | "accent";
  glowColor?: string;
  delay?: number;
}

export const HolographicSection: React.FC<HolographicSectionProps> = ({
  children,
  title,
  variant = "primary",
  glowColor,
  delay = 0,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLCanvasElement>(null);

  const variantStyles = {
    primary: {
      border: "border-cyan-400",
      glow: glowColor || "rgba(34, 211, 238, 0.6)",
      bg: "bg-slate-900/95",
      accent: "bg-cyan-400",
    },
    secondary: {
      border: "border-fuchsia-400",
      glow: glowColor || "rgba(240, 101, 240, 0.6)",
      bg: "bg-slate-900/95",
      accent: "bg-fuchsia-400",
    },
    accent: {
      border: "border-yellow-400",
      glow: glowColor || "rgba(253, 224, 71, 0.6)",
      bg: "bg-slate-900/95",
      accent: "bg-yellow-400",
    },
  };

  const styles = variantStyles[variant];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous border glow pulsing only - removed entrance animation
      gsap.to(sectionRef.current, {
        boxShadow: `0 0 40px ${styles.glow}, 0 0 80px ${styles.glow}, inset 0 0 20px ${styles.glow}`,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    // Draw static grid on canvas
    const canvas = gridRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const resizeCanvas = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          drawStaticGrid();
        };

        const drawStaticGrid = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = styles.glow;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.15;

          const gridSize = 20;

          // Draw vertical lines
          for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }

          // Draw horizontal lines
          for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => {
          window.removeEventListener("resize", resizeCanvas);
        };
      }
    }

    return () => ctx.revert();
  }, [delay, styles.glow]);

  return (
    <div
      ref={sectionRef}
      className={`
        relative rounded-xl overflow-hidden
        border-2 ${styles.border}
        ${styles.bg} backdrop-blur-xl
        shadow-2xl
      `}
      style={{
        boxShadow: `0 0 30px ${styles.glow}, 0 0 60px ${styles.glow}`,
      }}
    >
      {/* Static grid background */}
      <canvas
        ref={gridRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Corner brackets with glow */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10">
        <div
          className={`absolute top-0 left-0 w-full h-1 ${styles.accent} shadow-lg`}
          style={{ boxShadow: `0 0 10px ${styles.glow}` }}
        />
        <div
          className={`absolute top-0 left-0 w-1 h-full ${styles.accent} shadow-lg`}
          style={{ boxShadow: `0 0 10px ${styles.glow}` }}
        />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-10">
        <div
          className={`absolute top-0 right-0 w-full h-1 ${styles.accent} shadow-lg`}
          style={{ boxShadow: `0 0 10px ${styles.glow}` }}
        />
        <div
          className={`absolute top-0 right-0 w-1 h-full ${styles.accent} shadow-lg`}
          style={{ boxShadow: `0 0 10px ${styles.glow}` }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-10">
        <div
          className={`absolute bottom-0 left-0 w-full h-1 ${styles.accent} shadow-lg`}
          style={{ boxShadow: `0 0 10px ${styles.glow}` }}
        />
        <div
          className={`absolute bottom-0 left-0 w-1 h-full ${styles.accent} shadow-lg`}
          style={{ boxShadow: `0 0 10px ${styles.glow}` }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10">
        <div
          className={`absolute bottom-0 right-0 w-full h-1 ${styles.accent} shadow-lg`}
          style={{ boxShadow: `0 0 10px ${styles.glow}` }}
        />
        <div
          className={`absolute bottom-0 right-0 w-1 h-full ${styles.accent} shadow-lg`}
          style={{ boxShadow: `0 0 10px ${styles.glow}` }}
        />
      </div>

      {/* Title bar */}
      {title && (
        <div className="relative z-40 px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Status indicators */}
            <div className="flex gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${styles.accent} opacity-100`}
              />
              <div
                className={`w-2 h-2 rounded-full ${styles.accent} opacity-50`}
              />
              <div
                className={`w-2 h-2 rounded-full ${styles.accent} opacity-100`}
              />
            </div>

            <h2 className="text-xl font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <span className="text-cyan-400">{">"}</span>
              {title}
              <span className="animate-pulse">_</span>
            </h2>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-40 p-6">{children}</div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none z-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
