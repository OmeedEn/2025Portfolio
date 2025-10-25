"use client";

import React, { useEffect, useRef } from "react";

interface FloatingBit {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  char: string;
  size: number;
  opacity: number;
}

interface NeuronNode {
  x: number;
  y: number;
  radius: number;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
}

interface DataPacket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
}

export const DigitalBrainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatingBitsRef = useRef<FloatingBit[]>([]);
  const neuronsRef = useRef<NeuronNode[]>([]);
  const dataPacketsRef = useRef<DataPacket[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeBits();
      initializeCircuitLines();
    };

    const initializeBits = () => {
      floatingBitsRef.current = [];
      const bitCount = 120;
      const chars = [
        "0",
        "1",
        "01",
        "10",
        "11",
        "00",
        "λ",
        "∑",
        "∫",
        "π",
        "θ",
        "Δ",
        "AI",
        "ML",
        "CPU",
        "RAM",
        "GPU",
        "0x",
        "FF",
        "A3",
        "7F",
        "C9",
        "3E",
        "0xDEAD",
        "0xBEEF",
      ];

      for (let i = 0; i < bitCount; i++) {
        floatingBitsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          char: chars[Math.floor(Math.random() * chars.length)],
          size: Math.random() * 16 + 8,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }
    };

    const initializeCircuitLines = () => {
      neuronsRef.current = [];
      const neuronCount = 30;

      // Create neuron nodes across the canvas (brain-like distribution)
      for (let i = 0; i < neuronCount; i++) {
        neuronsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 2,
          connections: [],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }

      // Create connections between nearby neurons (like synapses)
      neuronsRef.current.forEach((neuron, index) => {
        const maxConnections = 3;
        let connectionCount = 0;

        neuronsRef.current.forEach((otherNeuron, otherIndex) => {
          if (index !== otherIndex && connectionCount < maxConnections) {
            const distance = Math.hypot(
              neuron.x - otherNeuron.x,
              neuron.y - otherNeuron.y
            );
            if (distance < 200 && Math.random() > 0.5) {
              neuron.connections.push(otherIndex);
              connectionCount++;
            }
          }
        });
      });
    };

    const drawNeuralNetwork = () => {
      // Draw connections (synapses)
      neuronsRef.current.forEach((neuron) => {
        neuron.connections.forEach((targetIndex) => {
          const target = neuronsRef.current[targetIndex];
          if (!target) return;

          // Animated synapse connection
          const gradient = ctx.createLinearGradient(
            neuron.x,
            neuron.y,
            target.x,
            target.y
          );
          const pulseValue = Math.sin(neuron.pulse) * 0.3 + 0.4;
          gradient.addColorStop(0, `rgba(251, 146, 60, ${pulseValue * 0.4})`);
          gradient.addColorStop(
            0.5,
            `rgba(255, 200, 100, ${pulseValue * 0.6})`
          );
          gradient.addColorStop(1, `rgba(251, 146, 60, ${pulseValue * 0.4})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();

          // Add data packets traveling along connections
          if (Math.random() > 0.99) {
            dataPacketsRef.current.push({
              x: neuron.x,
              y: neuron.y,
              targetX: target.x,
              targetY: target.y,
              progress: 0,
              speed: Math.random() * 0.01 + 0.005,
            });
          }
        });

        // Update pulse
        neuron.pulse += neuron.pulseSpeed;
      });

      // Draw neuron nodes
      neuronsRef.current.forEach((neuron) => {
        const pulseSize = Math.sin(neuron.pulse) * 2 + neuron.radius;

        // Outer glow
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, pulseSize + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 146, 60, ${
          Math.sin(neuron.pulse) * 0.2 + 0.2
        })`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 180, 80, ${
          Math.sin(neuron.pulse) * 0.3 + 0.7
        })`;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, pulseSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 220, 150, 0.9)";
        ctx.fill();
      });

      // Draw and update data packets
      dataPacketsRef.current = dataPacketsRef.current.filter((packet) => {
        packet.progress += packet.speed;

        if (packet.progress >= 1) return false;

        const x = packet.x + (packet.targetX - packet.x) * packet.progress;
        const y = packet.y + (packet.targetY - packet.y) * packet.progress;

        // Draw packet
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 200, 100, 0.9)";
        ctx.fill();

        // Glow trail
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(251, 146, 60, 0.8)";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });
    };

    const drawFloatingBits = () => {
      floatingBitsRef.current.forEach((bit) => {
        ctx.font = `${bit.size}px 'Courier New', monospace`;
        ctx.fillStyle = `rgba(251, 146, 60, ${bit.opacity})`;
        ctx.fillText(bit.char, bit.x, bit.y);

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(251, 146, 60, 0.5)";
        ctx.fillText(bit.char, bit.x, bit.y);
        ctx.shadowBlur = 0;

        // Update position
        bit.x += bit.speedX;
        bit.y += bit.speedY;

        // Wrap around screen
        if (bit.x < -20) bit.x = canvas.width + 20;
        if (bit.x > canvas.width + 20) bit.x = -20;
        if (bit.y < -20) bit.y = canvas.height + 20;
        if (bit.y > canvas.height + 20) bit.y = -20;
      });
    };

    const drawBinaryGrid = () => {
      ctx.strokeStyle = "rgba(251, 146, 60, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 50;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawBrainWaves = () => {
      const time = Date.now() * 0.001;
      const waveCount = 5;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(251, 146, 60, ${0.1 - i * 0.015})`;
        ctx.lineWidth = 2;

        const yOffset = (canvas.height / (waveCount + 1)) * (i + 1);
        const frequency = 0.01 + i * 0.002;
        const amplitude = 20 + i * 5;
        const phase = time * (0.5 + i * 0.1);

        for (let x = 0; x < canvas.width; x += 5) {
          const y = yOffset + Math.sin(x * frequency + phase) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawBinaryGrid();
      drawBrainWaves();
      drawNeuralNetwork();
      drawFloatingBits();

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
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0f0a 0%, #0a0505 40%, #000000 100%)",
      }}
    />
  );
};
