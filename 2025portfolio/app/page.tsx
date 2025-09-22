"use client";

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/portfolio/ThreeBackground";
import { HomeView } from "@/components/portfolio/HomeView";
import { ExperienceView } from "@/components/portfolio/ExperienceView";
import { ProjectsView } from "@/components/portfolio/ProjectsView";
import { EducationView } from "@/components/portfolio/EducationView";
import { ContactView } from "@/components/portfolio/ContactView";
import { useCustomScrollbar } from "@/lib/hooks/useCustomScrollbar";
import { MouseRef } from "@/lib/three/animations";

export default function Portfolio() {
  const [activeView, setActiveView] = useState("home");
  const mouseRef = useRef<MouseRef>({ x: 0, y: 0 });
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const intersectedObjectRef = useRef<THREE.Object3D | null>(null);

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
      <ThreeBackground
        mouseRef={mouseRef}
        raycasterRef={raycasterRef}
        intersectedObjectRef={intersectedObjectRef}
      />

      <main className="relative z-10 h-full w-full flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {activeView === "home" && (
            <HomeView key="home" onNavigate={handleNavigate} />
          )}

          {activeView === "experience" && (
            <ExperienceView key="experience" onBack={handleBack} />
          )}

          {activeView === "education" && (
            <EducationView key="education" onBack={handleBack} />
          )}

          {activeView === "projects" && (
            <ProjectsView key="projects" onBack={handleBack} />
          )}

          {activeView === "contact" && (
            <ContactView key="contact" onBack={handleBack} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
