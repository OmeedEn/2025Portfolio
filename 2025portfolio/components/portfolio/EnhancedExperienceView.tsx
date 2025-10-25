"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar, Award } from "lucide-react";
import { BackButton } from "./BackButton";
import { LaserTechBadge } from "./LaserTechBadge";
import { HolographicSection } from "./HolographicSection";
import { experiences } from "@/data/experiences";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EnhancedExperienceViewProps {
  onBack: () => void;
}

export const EnhancedExperienceView = ({
  onBack,
}: EnhancedExperienceViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Removed entrance animation to prevent chips from disappearing

  return (
    <div ref={containerRef} className="w-full max-w-4xl">
      <Card
        className="relative bg-slate-800/95 backdrop-blur-xl border-2 border-fuchsia-400/60 shadow-2xl h-[70vh] flex flex-col"
        style={{
          boxShadow:
            "0 0 40px rgba(240, 101, 240, 0.4), 0 0 80px rgba(240, 101, 240, 0.2)",
        }}
      >
        <div className="absolute top-6 left-6 z-30">
          <BackButton onClick={onBack} />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center pt-4">
            Leadership Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto px-8 pb-8 space-y-6 custom-scrollbar">
          <div ref={timelineRef} className="space-y-8">
            {experiences.map((exp, index) => (
              <HolographicSection
                key={index}
                variant={
                  index % 3 === 0
                    ? "primary"
                    : index % 3 === 1
                    ? "secondary"
                    : "accent"
                }
                delay={index * 0.15}
              >
                <div className="experience-item space-y-3">
                  <div className="experience-content">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 font-mono uppercase tracking-wide flex items-center gap-2">
                          <Award className="w-5 h-5 text-cyan-400" />
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-cyan-300 mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-semibold font-mono">
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-fuchsia-500/20 border border-fuchsia-400/40 rounded text-fuchsia-200 text-sm font-mono">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm border-l-2 border-cyan-500/50 pl-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <LaserTechBadge
                          key={achIndex}
                          color={
                            achIndex % 6 === 0
                              ? "cyan"
                              : achIndex % 6 === 1
                              ? "green"
                              : achIndex % 6 === 2
                              ? "magenta"
                              : achIndex % 6 === 3
                              ? "blue"
                              : achIndex % 6 === 4
                              ? "yellow"
                              : "red"
                          }
                          variant={achIndex < 2 ? "glow" : "outline"}
                          delay={index * 0.15 + achIndex * 0.05}
                        >
                          {achievement}
                        </LaserTechBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </HolographicSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
