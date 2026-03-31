"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { HeroSection } from "@/components/portfolio/HomeView";
import { ProjectsSection } from "@/components/portfolio/ProjectsView";
import { ExperienceSection } from "@/components/portfolio/ExperienceView";
import { ContactSection } from "@/components/portfolio/ContactView";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1A2E]">
      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleY }}
        className="fixed left-0 top-0 w-[3px] h-full bg-[#FF6B35] origin-top z-50 rounded-full"
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
