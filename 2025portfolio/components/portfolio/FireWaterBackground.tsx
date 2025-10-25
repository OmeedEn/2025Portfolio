"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  hue: number;
}

interface WaterDrop {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  splashing: boolean;
  splashParticles: { x: number; y: number; speedX: number; speedY: number; life: number }[];
}

export const FireWaterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireParticlesRef = useRef<Particle[]>([]);
  const waterDropsRef = useRef<WaterDrop[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createFireParticle = () => {
      const x = Math.random() * canvas.width;
      const baseY = canvas.height;
      
      fireParticlesRef.current.push({
        x: x + (Math.random() - 0.5) * 100,
        y: baseY,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: -Math.random() * 3 - 2,
        size: Math.random() * 8 + 3,
        opacity: 1,
        life: 1,
        maxLife: Math.random() * 80 + 60,
        hue: Math.random() * 60, // 0-60 for red to yellow
      });
    };

    const createWaterDrop = () => {
      waterDropsRef.current.push({
        x: Math.random() * canvas.width,
        y: 0,
        speed: Math.random() * 4 + 3,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.4,
        splashing: false,
        splashParticles: [],
      });
    };

    const drawFire = () => {
      fireParticlesRef.current = fireParticlesRef.current.filter((particle) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.speedY += 0.05; // Slight gravity
        particle.life--;
        particle.opacity = particle.life / particle.maxLife;

        if (particle.life <= 0) return false;

        // Color transition from red to orange to yellow
        const lifeRatio = particle.life / particle.maxLife;
        const hue = particle.hue + (1 - lifeRatio) * 20; // Shift toward yellow as it rises
        const saturation = 100;
        const lightness = 50 + lifeRatio * 20;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness + 30}%, ${particle.opacity})`);
        gradient.addColorStop(0.4, `hsla(${hue}, ${saturation}%, ${lightness}%, ${particle.opacity * 0.8})`);
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness - 20}%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add extra glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${particle.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      // Spawn new fire particles
      if (Math.random() < 0.3) {
        createFireParticle();
      }
    };

    const drawWater = () => {
      waterDropsRef.current = waterDropsRef.current.filter((drop) => {
        if (!drop.splashing) {
          drop.y += drop.speed;

          // Check if drop hits the middle area (transition zone)
          if (drop.y > canvas.height * 0.5) {
            drop.splashing = true;
            // Create splash particles
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) + (Math.random() * Math.PI / 3);
              drop.splashParticles.push({
                x: drop.x,
                y: drop.y,
                speedX: Math.cos(angle) * (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
                speedY: -Math.sin(angle) * (Math.random() * 2 + 1),
                life: 30,
              });
            }
            return true;
          }

          // Draw water drop
          const gradient = ctx.createRadialGradient(
            drop.x,
            drop.y,
            0,
            drop.x,
            drop.y,
            drop.size
          );
          gradient.addColorStop(0, `rgba(100, 200, 255, ${drop.opacity})`);
          gradient.addColorStop(0.5, `rgba(50, 150, 255, ${drop.opacity * 0.8})`);
          gradient.addColorStop(1, `rgba(0, 100, 200, ${drop.opacity * 0.3})`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(drop.x, drop.y, drop.size * 0.5, drop.size, 0, 0, Math.PI * 2);
          ctx.fill();

          // Glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(100, 200, 255, ${drop.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, drop.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          return true;
        } else {
          // Draw splash particles
          drop.splashParticles = drop.splashParticles.filter((splash) => {
            splash.x += splash.speedX;
            splash.y += splash.speedY;
            splash.speedY += 0.15; // Gravity
            splash.life--;

            const opacity = splash.life / 30;

            ctx.fillStyle = `rgba(150, 220, 255, ${opacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(splash.x, splash.y, 2, 0, Math.PI * 2);
            ctx.fill();

            return splash.life > 0;
          });

          return drop.splashParticles.length > 0;
        }
      });

      // Spawn new water drops
      if (Math.random() < 0.08) {
        createWaterDrop();
      }
    };

    const drawTransitionZone = () => {
      // Create a steam/mist effect in the middle where fire meets water
      const steamY = canvas.height * 0.5;
      const steamGradient = ctx.createLinearGradient(0, steamY - 100, 0, steamY + 100);
      steamGradient.addColorStop(0, "rgba(200, 230, 255, 0)");
      steamGradient.addColorStop(0.3, "rgba(200, 230, 255, 0.1)");
      steamGradient.addColorStop(0.5, "rgba(220, 240, 255, 0.15)");
      steamGradient.addColorStop(0.7, "rgba(255, 200, 150, 0.1)");
      steamGradient.addColorStop(1, "rgba(255, 150, 100, 0)");

      ctx.fillStyle = steamGradient;
      ctx.fillRect(0, steamY - 100, canvas.width, 200);

      // Add some steam particles
      const time = Date.now() * 0.001;
      for (let i = 0; i < 20; i++) {
        const x = (i / 20) * canvas.width + Math.sin(time + i) * 50;
        const y = steamY + Math.cos(time * 0.5 + i) * 30;
        const size = 20 + Math.sin(time + i * 0.5) * 10;
        const opacity = 0.1 + Math.sin(time + i) * 0.05;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(220, 240, 255, ${opacity})`);
        gradient.addColorStop(1, "rgba(220, 240, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawFlames = () => {
      // Draw larger, more realistic flame shapes at the bottom
      const time = Date.now() * 0.001;
      const flameCount = 12;

      for (let i = 0; i < flameCount; i++) {
        const x = (i / flameCount) * canvas.width + canvas.width / (flameCount * 2);
        const baseY = canvas.height;
        // Much larger flames with more variation
        const height = 280 + Math.sin(time * 2 + i) * 100 + Math.cos(time * 1.5 + i * 0.5) * 60;
        const width = 60 + Math.sin(time + i) * 25;

        // Draw multiple layers for depth and realism
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.moveTo(x, baseY);

          const layerScale = 1 - layer * 0.2;
          const layerHeight = height * layerScale;
          const layerWidth = width * layerScale;

          // Create organic flame shape with bezier curves
          const points = 12;
          for (let j = 0; j <= points; j++) {
            const t = j / points;
            const angle = Math.PI + t * Math.PI;
            
            // Add multiple layers of noise for organic movement
            const wobble1 = Math.sin(time * 3 + i + j * 0.5) * 20;
            const wobble2 = Math.cos(time * 4 + i * 0.7 + j * 0.3) * 15;
            const wobble3 = Math.sin(time * 5 + i * 1.3 + j) * 10;
            const totalWobble = (wobble1 + wobble2 + wobble3) * layerScale;
            
            // Make flame taper at the top
            const taper = Math.pow(1 - t, 0.6);
            const flameX = x + Math.cos(angle) * (layerWidth * taper + totalWobble);
            const flameY = baseY - layerHeight * t + Math.sin(time * 2 + j) * 10 * (1 - t);
            
            if (j === 0) {
              ctx.moveTo(flameX, flameY);
            } else {
              // Use quadratic curves for smoother flame edges
              const prevT = (j - 1) / points;
              const prevAngle = Math.PI + prevT * Math.PI;
              const prevTaper = Math.pow(1 - prevT, 0.6);
              const controlX = x + Math.cos((angle + prevAngle) / 2) * (layerWidth * ((taper + prevTaper) / 2));
              const controlY = baseY - layerHeight * ((t + prevT) / 2);
              ctx.quadraticCurveTo(controlX, controlY, flameX, flameY);
            }
          }

          ctx.closePath();

          // Create more realistic gradient with multiple color stops
          const gradient = ctx.createLinearGradient(x, baseY, x, baseY - layerHeight);
          
          if (layer === 0) {
            // Outer flame - darker orange/red
            gradient.addColorStop(0, "rgba(200, 40, 0, 0.5)");
            gradient.addColorStop(0.2, "rgba(255, 80, 0, 0.4)");
            gradient.addColorStop(0.4, "rgba(255, 120, 0, 0.3)");
            gradient.addColorStop(0.6, "rgba(255, 160, 30, 0.2)");
            gradient.addColorStop(0.8, "rgba(255, 200, 80, 0.1)");
            gradient.addColorStop(1, "rgba(255, 255, 150, 0)");
          } else if (layer === 1) {
            // Middle flame - bright orange/yellow
            gradient.addColorStop(0, "rgba(255, 100, 0, 0.6)");
            gradient.addColorStop(0.3, "rgba(255, 150, 0, 0.5)");
            gradient.addColorStop(0.5, "rgba(255, 200, 50, 0.4)");
            gradient.addColorStop(0.7, "rgba(255, 230, 100, 0.2)");
            gradient.addColorStop(1, "rgba(255, 255, 200, 0)");
          } else {
            // Inner flame - white/yellow core
            gradient.addColorStop(0, "rgba(255, 200, 100, 0.7)");
            gradient.addColorStop(0.3, "rgba(255, 240, 150, 0.6)");
            gradient.addColorStop(0.6, "rgba(255, 255, 200, 0.4)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          }

          ctx.fillStyle = gradient;
          ctx.fill();

          // Add glow effect for the inner layers
          if (layer === 2) {
            ctx.shadowBlur = 40;
            ctx.shadowColor = "rgba(255, 200, 100, 0.8)";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
    };

    const animate = () => {
      // Dark gradient background (fire below, water above)
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "#001a33");
      bgGradient.addColorStop(0.3, "#002040");
      bgGradient.addColorStop(0.5, "#1a1a2e");
      bgGradient.addColorStop(0.7, "#2d1810");
      bgGradient.addColorStop(1, "#1a0f0a");
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawFlames();
      drawFire();
      drawTransitionZone();
      drawWater();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};
