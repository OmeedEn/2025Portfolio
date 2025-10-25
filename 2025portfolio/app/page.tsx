"use client";

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/portfolio/ThreeBackground";
import { GSAPBackground } from "@/components/portfolio/GSAPBackground";
import { LaserWarBackground } from "@/components/portfolio/LaserWarBackground";
import { DigitalBrainBackground } from "@/components/portfolio/DigitalBrainBackground";
import { EnhancedHomeView } from "@/components/portfolio/EnhancedHomeView";
import { EnhancedExperienceView } from "@/components/portfolio/EnhancedExperienceView";
import { EnhancedProjectsView } from "@/components/portfolio/EnhancedProjectsView";
import { EnhancedContactView } from "@/components/portfolio/EnhancedContactView";
import { EducationView } from "@/components/portfolio/EducationView";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { useCustomScrollbar } from "@/lib/hooks/useCustomScrollbar";
import { MouseRef } from "@/lib/three/animations";

function PortfolioContent() {
  const [activeView, setActiveView] = useState("home");
  const mouseRef = useRef<MouseRef>({ x: 0, y: 0 });
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const intersectedObjectRef = useRef<THREE.Object3D | null>(null);
  const { theme } = useTheme();

  // Custom scrollbar styles
  useCustomScrollbar();

  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  const handleBack = () => {
    setActiveView("home");
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden relative">
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Background layers with proper z-index - conditionally rendered based on theme */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <GSAPBackground />
      </div>
      
      {/* Laser theme backgrounds */}
      {theme === "laser" && (
        <>
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <LaserWarBackground />
          </div>
          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            <ThreeBackground
              mouseRef={mouseRef}
              raycasterRef={raycasterRef}
              intersectedObjectRef={intersectedObjectRef}
            />
          </div>
        </>
      )}
      
      {/* Digital theme background */}
      {theme === "digital" && (
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <DigitalBrainBackground />
        </div>
      )}
      
      {/* Regular theme - only GSAP background */}

      {/* Content layer - highest z-index */}
      <main
        className="relative h-full w-full flex items-center justify-center p-4"
        style={{ zIndex: 50 }}
      >
        <AnimatePresence mode="wait">
          {activeView === "home" && (
            <EnhancedHomeView key="home" onNavigate={handleNavigate} />
          )}

          {activeView === "experience" && (
            <EnhancedExperienceView key="experience" onBack={handleBack} />
          )}

          {activeView === "education" && (
            <EducationView key="education" onBack={handleBack} />
          )}

          {activeView === "projects" && (
            <EnhancedProjectsView key="projects" onBack={handleBack} />
          )}

          {activeView === "contact" && (
            <EnhancedContactView key="contact" onBack={handleBack} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function Portfolio() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
