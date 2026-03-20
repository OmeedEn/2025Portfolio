"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Waves } from "@/components/ui/waves";
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
    <div className="min-h-screen text-[#e8e8e3]">
      <Waves
        strokeColor="rgba(184, 255, 87, 0.03)"
        backgroundColor="#060606"
        pointerSize={0.6}
        horizontalAmplitude={6}
        verticalAmplitude={4}
      />

      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleY }}
        className="fixed left-0 top-0 w-[2px] h-full bg-[#b8ff57] origin-top z-50"
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
