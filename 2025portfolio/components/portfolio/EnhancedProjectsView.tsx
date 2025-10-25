"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, Zap } from "lucide-react";
import { BackButton } from "./BackButton";
import { LaserTechBadge } from "./LaserTechBadge";
import { HolographicSection } from "./HolographicSection";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EnhancedProjectsViewProps {
  onBack: () => void;
}

export const EnhancedProjectsView = ({
  onBack,
}: EnhancedProjectsViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  // Removed entrance animations to prevent chips from disappearing

  return (
    <div ref={containerRef} className="w-full max-w-6xl">
      <Card className="relative bg-slate-800/95 backdrop-blur-xl border-2 border-cyan-400/60 shadow-2xl h-[80vh] flex flex-col" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(34, 211, 238, 0.2)' }}>
        <div className="absolute top-6 left-6 z-30">
          <BackButton onClick={onBack} />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center pt-4">
            Featured Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
          <div ref={projectsContainerRef} className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <HolographicSection
                key={index}
                variant={
                  project.featured
                    ? "accent"
                    : index % 2 === 0
                    ? "primary"
                    : "secondary"
                }
                delay={index * 0.1}
              >
                <div className="project-card space-y-4">
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      {project.title}
                    </h3>
                    {project.featured && (
                      <div className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-xs font-bold uppercase rounded border border-yellow-300 shadow-lg shadow-yellow-500/50 animate-pulse">
                        ★ Featured
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-sm border-l-2 border-cyan-500/50 pl-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <LaserTechBadge
                        key={techIndex}
                        color={
                          techIndex % 6 === 0
                            ? "cyan"
                            : techIndex % 6 === 1
                            ? "magenta"
                            : techIndex % 6 === 2
                            ? "yellow"
                            : techIndex % 6 === 3
                            ? "green"
                            : techIndex % 6 === 4
                            ? "red"
                            : "blue"
                        }
                        variant={techIndex < 3 ? "glow" : "outline"}
                        delay={index * 0.1 + techIndex * 0.05}
                      >
                        {tech}
                      </LaserTechBadge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/40 hover:to-blue-500/40 border-2 border-cyan-400/50 rounded-lg text-sm text-cyan-100 font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                      <Github className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Source</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 hover:from-fuchsia-500/40 hover:to-pink-500/40 border-2 border-fuchsia-400/50 rounded-lg text-sm text-fuchsia-100 font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-400/30 to-pink-400/30 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                        <ExternalLink className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Live</span>
                      </a>
                    )}
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
