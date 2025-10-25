"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Laser {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  color: string;
  width: number;
  glowSize: number;
}

interface Explosion {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export const LaserWarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lasersRef = useRef<Laser[]>([]);
  const explosionsRef = useRef<Explosion[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Laser colors - vibrant war colors
    const laserColors = [
      { color: "#ff0040", glow: "rgba(255, 0, 64, 0.8)" }, // Red
      { color: "#00ff88", glow: "rgba(0, 255, 136, 0.8)" }, // Green
      { color: "#0099ff", glow: "rgba(0, 153, 255, 0.8)" }, // Blue
      { color: "#ff00ff", glow: "rgba(255, 0, 255, 0.8)" }, // Magenta
      { color: "#ffff00", glow: "rgba(255, 255, 0, 0.8)" }, // Yellow
      { color: "#ff6600", glow: "rgba(255, 102, 0, 0.8)" }, // Orange
      { color: "#00ffff", glow: "rgba(0, 255, 255, 0.8)" }, // Cyan
      { color: "#ff0099", glow: "rgba(255, 0, 153, 0.8)" }, // Pink
    ];

    // Create initial lasers
    const createLaser = (): Laser => {
      const colorData =
        laserColors[Math.floor(Math.random() * laserColors.length)];
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let x, y, angle;

      switch (side) {
        case 0: // Top
          x = Math.random() * canvas.width;
          y = 0;
          angle = Math.random() * Math.PI + Math.PI / 4;
          break;
        case 1: // Right
          x = canvas.width;
          y = Math.random() * canvas.height;
          angle = Math.random() * Math.PI + Math.PI / 2;
          break;
        case 2: // Bottom
          x = Math.random() * canvas.width;
          y = canvas.height;
          angle = Math.random() * Math.PI - Math.PI / 4;
          break;
        default: // Left
          x = 0;
          y = Math.random() * canvas.height;
          angle = Math.random() * Math.PI - Math.PI / 2;
      }

      return {
        x,
        y,
        angle,
        speed: Math.random() * 3 + 4,
        length: Math.random() * 100 + 80,
        color: colorData.color,
        width: Math.random() * 2 + 2,
        glowSize: Math.random() * 10 + 15,
      };
    };

    // Initialize lasers
    for (let i = 0; i < 15; i++) {
      lasersRef.current.push(createLaser());
    }

    // Create explosion effect
    const createExplosion = (x: number, y: number, color: string) => {
      explosionsRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 40 + 30,
        color,
        alpha: 1,
      });
    };

    // Draw laser
    const drawLaser = (laser: Laser) => {
      const endX = laser.x + Math.cos(laser.angle) * laser.length;
      const endY = laser.y + Math.sin(laser.angle) * laser.length;

      // Outer glow
      ctx.shadowBlur = laser.glowSize;
      ctx.shadowColor = laser.color;

      // Main beam
      const gradient = ctx.createLinearGradient(laser.x, laser.y, endX, endY);
      gradient.addColorStop(0, laser.color + "00");
      gradient.addColorStop(0.1, laser.color);
      gradient.addColorStop(0.9, laser.color);
      gradient.addColorStop(1, laser.color + "00");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = laser.width;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(laser.x, laser.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Core bright line
      ctx.shadowBlur = 5;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = laser.width * 0.3;
      ctx.beginPath();
      ctx.moveTo(laser.x, laser.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    // Draw explosion
    const drawExplosion = (explosion: Explosion) => {
      // Outer ring
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `${explosion.color}${Math.floor(explosion.alpha * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Inner glow
      const gradient = ctx.createRadialGradient(
        explosion.x,
        explosion.y,
        0,
        explosion.x,
        explosion.y,
        explosion.radius
      );
      gradient.addColorStop(
        0,
        `${explosion.color}${Math.floor(explosion.alpha * 100)
          .toString(16)
          .padStart(2, "0")}`
      );
      gradient.addColorStop(
        0.5,
        `${explosion.color}${Math.floor(explosion.alpha * 50)
          .toString(16)
          .padStart(2, "0")}`
      );
      gradient.addColorStop(1, `${explosion.color}00`);

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(10, 19, 47, 0.1)"; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw lasers
      lasersRef.current.forEach((laser, index) => {
        // Move laser
        laser.x += Math.cos(laser.angle) * laser.speed;
        laser.y += Math.sin(laser.angle) * laser.speed;

        // Check if laser is out of bounds
        if (
          laser.x < -laser.length ||
          laser.x > canvas.width + laser.length ||
          laser.y < -laser.length ||
          laser.y > canvas.height + laser.length
        ) {
          // Random chance to create explosion before removing
          if (Math.random() < 0.3) {
            createExplosion(laser.x, laser.y, laser.color);
          }
          lasersRef.current[index] = createLaser();
        }

        // Random laser collisions
        if (Math.random() < 0.005) {
          createExplosion(laser.x, laser.y, laser.color);
        }

        drawLaser(laser);
      });

      // Update and draw explosions
      explosionsRef.current = explosionsRef.current.filter((explosion) => {
        explosion.radius += 2;
        explosion.alpha -= 0.02;

        if (explosion.alpha > 0 && explosion.radius < explosion.maxRadius) {
          drawExplosion(explosion);
          return true;
        }
        return false;
      });

      // Randomly spawn new lasers for intense battle
      if (Math.random() < 0.05 && lasersRef.current.length < 25) {
        lasersRef.current.push(createLaser());
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // GSAP light beam flashes
    const createLightFlash = () => {
      const flashElement = document.createElement("div");
      flashElement.style.cssText = `
        position: fixed;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        width: ${Math.random() * 300 + 200}px;
        height: 2px;
        background: linear-gradient(90deg, 
          transparent, 
          ${laserColors[Math.floor(Math.random() * laserColors.length)].color}, 
          transparent
        );
        transform: rotate(${Math.random() * 360}deg);
        pointer-events: none;
        z-index: 1;
        filter: blur(1px);
        box-shadow: 0 0 20px currentColor;
      `;

      document.body.appendChild(flashElement);

      gsap.fromTo(
        flashElement,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(flashElement, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => flashElement.remove(),
            });
          },
        }
      );
    };

    // Create periodic light flashes
    const flashInterval = setInterval(() => {
      if (Math.random() < 0.7) {
        createLightFlash();
      }
    }, 500);

    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearInterval(flashInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};
