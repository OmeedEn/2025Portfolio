"use client";

import React from "react";
import { Waves } from "@/components/ui/waves";
import { HeroSection } from "@/components/portfolio/HomeView";
import { ProjectsSection } from "@/components/portfolio/ProjectsView";
import { ExperienceSection } from "@/components/portfolio/ExperienceView";
import { ContactSection } from "@/components/portfolio/ContactView";

export default function Portfolio() {
  return (
    <div className="min-h-screen text-[#e8e8e3]">
      <Waves
        strokeColor="rgba(184, 255, 87, 0.03)"
        backgroundColor="#060606"
        pointerSize={0.6}
        horizontalAmplitude={6}
        verticalAmplitude={4}
      />

      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
