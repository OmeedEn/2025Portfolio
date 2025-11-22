"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Waves } from "@/components/ui/waves";
import { HomeView } from "@/components/portfolio/HomeView";
import { ExperienceView } from "@/components/portfolio/ExperienceView";
import { ProjectsView } from "@/components/portfolio/ProjectsView";
import { EducationView } from "@/components/portfolio/EducationView";
import { ContactView } from "@/components/portfolio/ContactView";
import { useCustomScrollbar } from "@/lib/hooks/useCustomScrollbar";

export default function Portfolio() {
  const [activeView, setActiveView] = useState("home");

  // Custom scrollbar styles
  useCustomScrollbar();

  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  const handleBack = () => {
    setActiveView("home");
  };

  return (
    <div className="h-screen w-screen text-white overflow-hidden relative">
      <Waves
        strokeColor="rgba(59, 130, 246, 0.5)"
        backgroundColor="#0f172a"
        pointerSize={0.8}
      />

      <main className="relative z-10 h-full w-full flex items-center justify-center p-2 sm:p-4">
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
