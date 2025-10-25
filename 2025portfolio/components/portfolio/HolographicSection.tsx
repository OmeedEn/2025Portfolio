"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

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
  const { theme } = useTheme();

  const variantStyles = {
    primary: {
      border: "border-cyan-400",
      glow: glowColor || "rgba(34, 211, 238, 0.6)",
      bg: "bg-slate-900/95",
      accent: "bg-cyan-400",
      digital: {
        border: "border-orange-400",
        glow: glowColor || "rgba(251, 146, 60, 0.6)",
        accent: "bg-orange-400",
      },
      firewater: {
        border: "border-purple-400",
        glow: glowColor || "rgba(200, 100, 200, 0.6)",
        accent: "bg-purple-400",
      },
    },
    secondary: {
      border: "border-fuchsia-400",
      glow: glowColor || "rgba(240, 101, 240, 0.6)",
      bg: "bg-slate-900/95",
      accent: "bg-fuchsia-400",
      digital: {
        border: "border-amber-400",
        glow: glowColor || "rgba(245, 158, 11, 0.6)",
        accent: "bg-amber-400",
      },
      firewater: {
        border: "border-rose-400",
        glow: glowColor || "rgba(220, 100, 180, 0.6)",
        accent: "bg-rose-400",
      },
    },
    accent: {
      border: "border-yellow-400",
      glow: glowColor || "rgba(253, 224, 71, 0.6)",
      bg: "bg-slate-900/95",
      accent: "bg-yellow-400",
      digital: {
        border: "border-red-400",
        glow: glowColor || "rgba(239, 68, 68, 0.6)",
        accent: "bg-red-400",
      },
      firewater: {
        border: "border-indigo-400",
        glow: glowColor || "rgba(150, 100, 220, 0.6)",
        accent: "bg-indigo-400",
      },
    },
  };

  const styles = variantStyles[variant];

  // Use theme-specific colors
  const activeBorder =
    theme === "digital" ? styles.digital.border : 
    theme === "firewater" ? styles.firewater.border : 
    styles.border;
  const activeGlow = 
    theme === "digital" ? styles.digital.glow : 
    theme === "firewater" ? styles.firewater.glow : 
    styles.glow;
  const activeAccent =
    theme === "digital" ? styles.digital.accent : 
    theme === "firewater" ? styles.firewater.accent : 
    styles.accent;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous border glow pulsing - laser theme only
      if (theme === "laser") {
        gsap.to(sectionRef.current, {
          boxShadow: `0 0 40px ${activeGlow}, 0 0 80px ${activeGlow}, inset 0 0 20px ${activeGlow}`,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      // Digital theme pulsing
      else if (theme === "digital") {
        gsap.to(sectionRef.current, {
          boxShadow: `0 0 30px ${activeGlow}, 0 0 60px ${activeGlow}, inset 0 0 15px ${activeGlow}`,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
      // Firewater theme pulsing - dual glow effect
      else if (theme === "firewater") {
        gsap.to(sectionRef.current, {
          boxShadow: `0 0 35px ${activeGlow}, 0 0 70px rgba(255, 100, 100, 0.4), 0 0 70px rgba(100, 150, 255, 0.4), inset 0 0 18px ${activeGlow}`,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }
    }, sectionRef);

    // Draw static grid on canvas - laser theme only
    if (theme === "laser") {
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
            ctx.strokeStyle = activeGlow;
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
    }
    // Digital theme - circuit board pattern
    else if (theme === "digital") {
      const canvas = gridRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            drawCircuitPattern();
          };

          const drawCircuitPattern = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = activeGlow;
            ctx.fillStyle = activeGlow;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.2;

            const spacing = 40;

            // Draw circuit lines
            for (let x = 0; x < canvas.width; x += spacing) {
              for (let y = 0; y < canvas.height; y += spacing) {
                // Horizontal lines
                if (Math.random() > 0.5) {
                  ctx.beginPath();
                  ctx.moveTo(x, y);
                  ctx.lineTo(x + spacing, y);
                  ctx.stroke();
                }
                // Vertical lines
                if (Math.random() > 0.5) {
                  ctx.beginPath();
                  ctx.moveTo(x, y);
                  ctx.lineTo(x, y + spacing);
                  ctx.stroke();
                }
                // Circuit nodes
                if (Math.random() > 0.7) {
                  ctx.beginPath();
                  ctx.arc(x, y, 3, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
            }
          };

          resizeCanvas();
          window.addEventListener("resize", resizeCanvas);

          return () => {
            window.removeEventListener("resize", resizeCanvas);
          };
        }
      }
    }
    // Firewater theme - water ripples and flame flickers
    else if (theme === "firewater") {
      const canvas = gridRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          let animationFrame: number;
          let time = 0;

          const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
          };

          const drawFirewaterPattern = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.02;

            // Water ripples at top
            ctx.strokeStyle = "rgba(100, 150, 255, 0.3)";
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
              ctx.beginPath();
              for (let x = 0; x < canvas.width; x += 5) {
                const y = 30 + Math.sin(x * 0.02 + time + i) * 10;
                if (x === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }
              }
              ctx.stroke();
            }

            // Flame flickers at bottom
            ctx.strokeStyle = "rgba(255, 100, 100, 0.3)";
            for (let i = 0; i < 4; i++) {
              ctx.beginPath();
              for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height - 30 + Math.sin(x * 0.03 + time * 2 + i) * 15;
                if (x === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }
              }
              ctx.stroke();
            }

            animationFrame = requestAnimationFrame(drawFirewaterPattern);
          };

          resizeCanvas();
          drawFirewaterPattern();
          window.addEventListener("resize", resizeCanvas);

          return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrame);
          };
        }
      }
    }

    return () => ctx.revert();
  }, [delay, activeGlow, theme]);

  return (
    <div
      ref={sectionRef}
      className={`
        relative rounded-xl overflow-hidden
        border-2 ${activeBorder}
        ${styles.bg} backdrop-blur-xl
        ${theme === "laser" ? "shadow-2xl" : "shadow-lg"}
        ${theme === "digital" ? "border-dashed" : ""}
      `}
      style={
        theme === "laser"
          ? { boxShadow: `0 0 30px ${activeGlow}, 0 0 60px ${activeGlow}` }
          : theme === "digital"
          ? { boxShadow: `0 0 25px ${activeGlow}, 0 0 50px rgba(0, 0, 0, 0.7)` }
          : {
              boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`,
            }
      }
    >
      {/* Static grid background - laser theme only */}
      {theme === "laser" && (
        <canvas
          ref={gridRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Digital circuit board pattern - digital theme only */}
      {theme === "digital" && (
        <canvas
          ref={gridRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Firewater ripples and flames - firewater theme only */}
      {theme === "firewater" && (
        <canvas
          ref={gridRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Corner brackets with glow - laser theme only */}
      {theme === "laser" ? (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10">
            <div
              className={`absolute top-0 left-0 w-full h-1 ${activeAccent} shadow-lg`}
              style={{ boxShadow: `0 0 10px ${activeGlow}` }}
            />
            <div
              className={`absolute top-0 left-0 w-1 h-full ${activeAccent} shadow-lg`}
              style={{ boxShadow: `0 0 10px ${activeGlow}` }}
            />
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-10">
            <div
              className={`absolute top-0 right-0 w-full h-1 ${activeAccent} shadow-lg`}
              style={{ boxShadow: `0 0 10px ${activeGlow}` }}
            />
            <div
              className={`absolute top-0 right-0 w-1 h-full ${activeAccent} shadow-lg`}
              style={{ boxShadow: `0 0 10px ${activeGlow}` }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-10">
            <div
              className={`absolute bottom-0 left-0 w-full h-1 ${activeAccent} shadow-lg`}
              style={{ boxShadow: `0 0 10px ${activeGlow}` }}
            />
            <div
              className={`absolute bottom-0 left-0 w-1 h-full ${activeAccent} shadow-lg`}
              style={{ boxShadow: `0 0 10px ${activeGlow}` }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10">
            <div
              className={`absolute bottom-0 right-0 w-full h-1 ${activeAccent} shadow-lg`}
              style={{ boxShadow: `0 0 10px ${activeGlow}` }}
            />
            <div
              className={`absolute bottom-0 right-0 w-1 h-full ${activeAccent} shadow-lg`}
              style={{ boxShadow: `0 0 10px ${activeGlow}` }}
            />
          </div>
        </>
      ) : theme === "digital" ? (
        // Digital theme - circuit board corners
        <>
          <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-10">
            <div
              className={`absolute top-0 left-0 w-full h-0.5 ${activeAccent}`}
              style={{ boxShadow: `0 0 8px ${activeGlow}` }}
            />
            <div
              className={`absolute top-0 left-0 w-0.5 h-full ${activeAccent}`}
              style={{ boxShadow: `0 0 8px ${activeGlow}` }}
            />
            {/* Circuit node */}
            <div
              className={`absolute top-0 left-0 w-2 h-2 rounded-full ${activeAccent}`}
              style={{ boxShadow: `0 0 6px ${activeGlow}` }}
            />
          </div>
          <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-10">
            <div
              className={`absolute top-0 right-0 w-full h-0.5 ${activeAccent}`}
              style={{ boxShadow: `0 0 8px ${activeGlow}` }}
            />
            <div
              className={`absolute top-0 right-0 w-0.5 h-full ${activeAccent}`}
              style={{ boxShadow: `0 0 8px ${activeGlow}` }}
            />
            <div
              className={`absolute top-0 right-0 w-2 h-2 rounded-full ${activeAccent}`}
              style={{ boxShadow: `0 0 6px ${activeGlow}` }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none z-10">
            <div
              className={`absolute bottom-0 left-0 w-full h-0.5 ${activeAccent}`}
              style={{ boxShadow: `0 0 8px ${activeGlow}` }}
            />
            <div
              className={`absolute bottom-0 left-0 w-0.5 h-full ${activeAccent}`}
              style={{ boxShadow: `0 0 8px ${activeGlow}` }}
            />
            <div
              className={`absolute bottom-0 left-0 w-2 h-2 rounded-full ${activeAccent}`}
              style={{ boxShadow: `0 0 6px ${activeGlow}` }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-10">
            <div
              className={`absolute bottom-0 right-0 w-full h-0.5 ${activeAccent}`}
              style={{ boxShadow: `0 0 8px ${activeGlow}` }}
            />
            <div
              className={`absolute bottom-0 right-0 w-0.5 h-full ${activeAccent}`}
              style={{ boxShadow: `0 0 8px ${activeGlow}` }}
            />
            <div
              className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${activeAccent}`}
              style={{ boxShadow: `0 0 6px ${activeGlow}` }}
            />
          </div>
        </>
      ) : theme === "firewater" ? (
        // Firewater theme - dual-colored corners with gradient effect
        <>
          <div className="absolute top-0 left-0 w-7 h-7 pointer-events-none z-10">
            <div
              className={`absolute top-0 left-0 w-full h-0.5 ${activeAccent}`}
              style={{ boxShadow: `0 0 10px rgba(100, 150, 255, 0.6)` }}
            />
            <div
              className={`absolute top-0 left-0 w-0.5 h-full ${activeAccent}`}
              style={{ boxShadow: `0 0 10px rgba(100, 150, 255, 0.6)` }}
            />
          </div>
          <div className="absolute top-0 right-0 w-7 h-7 pointer-events-none z-10">
            <div
              className={`absolute top-0 right-0 w-full h-0.5 ${activeAccent}`}
              style={{ boxShadow: `0 0 10px rgba(100, 150, 255, 0.6)` }}
            />
            <div
              className={`absolute top-0 right-0 w-0.5 h-full ${activeAccent}`}
              style={{ boxShadow: `0 0 10px rgba(100, 150, 255, 0.6)` }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-7 h-7 pointer-events-none z-10">
            <div
              className={`absolute bottom-0 left-0 w-full h-0.5 ${activeAccent}`}
              style={{ boxShadow: `0 0 10px rgba(255, 100, 100, 0.6)` }}
            />
            <div
              className={`absolute bottom-0 left-0 w-0.5 h-full ${activeAccent}`}
              style={{ boxShadow: `0 0 10px rgba(255, 100, 100, 0.6)` }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-7 h-7 pointer-events-none z-10">
            <div
              className={`absolute bottom-0 right-0 w-full h-0.5 ${activeAccent}`}
              style={{ boxShadow: `0 0 10px rgba(255, 100, 100, 0.6)` }}
            />
            <div
              className={`absolute bottom-0 right-0 w-0.5 h-full ${activeAccent}`}
              style={{ boxShadow: `0 0 10px rgba(255, 100, 100, 0.6)` }}
            />
          </div>
        </>
      ) : (
        // Regular theme - simple corner indicators
        <>
          <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none z-10">
            <div
              className={`absolute top-0 left-0 w-full h-0.5 ${activeAccent}`}
            />
            <div
              className={`absolute top-0 left-0 w-0.5 h-full ${activeAccent}`}
            />
          </div>
          <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none z-10">
            <div
              className={`absolute top-0 right-0 w-full h-0.5 ${activeAccent}`}
            />
            <div
              className={`absolute top-0 right-0 w-0.5 h-full ${activeAccent}`}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none z-10">
            <div
              className={`absolute bottom-0 left-0 w-full h-0.5 ${activeAccent}`}
            />
            <div
              className={`absolute bottom-0 left-0 w-0.5 h-full ${activeAccent}`}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none z-10">
            <div
              className={`absolute bottom-0 right-0 w-full h-0.5 ${activeAccent}`}
            />
            <div
              className={`absolute bottom-0 right-0 w-0.5 h-full ${activeAccent}`}
            />
          </div>
        </>
      )}

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
