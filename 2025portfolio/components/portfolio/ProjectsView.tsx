"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="px-6 sm:px-10 md:px-16 lg:px-24 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-14 sm:mb-20"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-[#8A8780] font-medium">
          Selected Work
        </span>
        <div className="flex-1 h-px bg-[#E0DDD5]" />
        <span className="text-xs text-[#C8C5BD] font-mono tabular-nums">
          {String(projects.length).padStart(2, "0")} Projects
        </span>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardClasses =
    "group block rounded-xl overflow-hidden border border-[#E0DDD5] hover:border-[#C8C5BD] transition-all duration-400 hover:shadow-md hover:-translate-y-0.5";

  const content = (
    <>
      {/* Logo area */}
      <div
        className="relative aspect-square flex items-center justify-center"
        style={{ background: project.gradient }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className={`object-contain rounded-lg ${
              project.wideLogo
                ? "w-[80%] max-h-14"
                : "w-12 h-12 sm:w-14 sm:h-14"
            }`}
          />
        )}
        {project.liveUrl && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-3 h-3 text-[#1A1A2E]" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3 bg-white">
        <h3 className="font-display text-xs sm:text-sm font-bold text-[#1A1A2E] mb-1 truncate">
          {project.title}
        </h3>
        <p className="text-[11px] text-[#8A8780] leading-relaxed line-clamp-2 mb-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-medium tracking-wide px-1.5 py-0.5 rounded-full bg-[#F5F3ED] text-[#8A8780]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClasses}>{content}</div>;
};
