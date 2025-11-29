"use client";

import React, { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

interface WavesProps {
  strokeColor?: string;
  backgroundColor?: string;
  pointerSize?: number;
  horizontalAmplitude?: number;
  verticalAmplitude?: number;
}

export const Waves: React.FC<WavesProps> = ({
  strokeColor = "rgba(0, 255, 157, 0.4)",
  backgroundColor = "#0a0e27",
  pointerSize = 1.2,
  horizontalAmplitude = 18,
  verticalAmplitude = 12,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const noise2D = createNoise2D();

    const pointer = { x: 0, y: 0, tX: 0, tY: 0, down: false };
    const points: Array<{ x: number; y: number; ox: number; oy: number }> = [];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * (container?.getBoundingClientRect().width || 800),
        y: Math.random() * (container?.getBoundingClientRect().height || 600),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random(),
      });
    }

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initPoints();
    };

    const initPoints = () => {
      points.length = 0;
      const spacing = 15;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing;
          const y = row * spacing;
          points.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const handlePointerDown = () => {
      pointer.down = true;
    };

    const handlePointerUp = () => {
      pointer.down = false;
    };

    const movePoints = () => {
      pointer.tX += (pointer.x - pointer.tX) * 0.5;
      pointer.tY += (pointer.y - pointer.tY) * 0.5;

      const interactionRadius = 250;
      const interactionStrength = 0.3;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const dx = pointer.tX - point.x;
        const dy = pointer.tY - point.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < interactionRadius * interactionRadius) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / interactionRadius) ** 3;
          point.x -= dx * force * interactionStrength;
          point.y -= dy * force * interactionStrength;
        }

        const damping = 0.92;
        point.x += (point.ox - point.x) * (1 - damping);
        point.y += (point.oy - point.y) * (1 - damping);
      }
    };

    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.01;

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Reset life
        if (p.life > 1) p.life = 0;
      }
    };

    const drawParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const alpha = Math.sin(p.life * Math.PI) * 0.5;
        ctx.fillStyle = `rgba(0, 255, 157, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawLines = () => {
      // Background with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, backgroundColor);
      bgGradient.addColorStop(0.5, backgroundColor);
      bgGradient.addColorStop(1, "#050a1a");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;

      const spacing = 15;
      const cols = Math.ceil(canvas.width / spacing) + 1;

      // Horizontal lines
      for (let row = 0; row < Math.ceil(canvas.height / spacing) + 1; row++) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const point = points[idx];
          if (!point) continue;

          const noiseX =
            noise2D(point.ox * 0.01, time * 0.5) * horizontalAmplitude;
          const noiseY =
            noise2D(point.oy * 0.01, time * 0.5) * verticalAmplitude;
          const x = (point.x + noiseX).toFixed(1);
          const y = (point.y + noiseY).toFixed(1);

          if (col === 0) {
            ctx.moveTo(parseFloat(x), parseFloat(y));
          } else {
            ctx.lineTo(parseFloat(x), parseFloat(y));
          }
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        for (let row = 0; row < Math.ceil(canvas.height / spacing) + 1; row++) {
          const idx = row * cols + col;
          const point = points[idx];
          if (!point) continue;

          const noiseX =
            noise2D(point.ox * 0.01, time * 0.5) * horizontalAmplitude;
          const noiseY =
            noise2D(point.oy * 0.01, time * 0.5) * verticalAmplitude;
          const x = (point.x + noiseX).toFixed(1);
          const y = (point.y + noiseY).toFixed(1);

          if (row === 0) {
            ctx.moveTo(parseFloat(x), parseFloat(y));
          } else {
            ctx.lineTo(parseFloat(x), parseFloat(y));
          }
        }
        ctx.stroke();
      }

      // Draw pointer glow
      if (pointer.down || true) {
        const gradient = ctx.createRadialGradient(
          pointer.tX,
          pointer.tY,
          0,
          pointer.tX,
          pointer.tY,
          100 * pointerSize
        );
        gradient.addColorStop(0, "rgba(0, 255, 157, 0.3)");
        gradient.addColorStop(0.5, "rgba(0, 255, 157, 0.1)");
        gradient.addColorStop(1, "rgba(0, 255, 157, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const animate = () => {
      time += 0.005;
      movePoints();
      updateParticles();
      drawLines();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [
    strokeColor,
    backgroundColor,
    pointerSize,
    horizontalAmplitude,
    verticalAmplitude,
  ]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
