"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";

export const ProjectsSection: React.FC = () => {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-24 sm:py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.25em] uppercase text-[#555550] mb-12 sm:mb-16"
      >
        Selected Work
      </motion.p>

      <div>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <ProjectRow project={project} index={index} />
          </motion.div>
        ))}
        <div className="border-t border-[#1a1a1a]" />
      </div>
    </section>
  );
};

const ProjectRow: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const inner = (
    <div className="flex items-start sm:items-center justify-between gap-4 sm:gap-8">
      <div className="flex items-start sm:items-center gap-5 sm:gap-10 md:gap-14">
        <span className="text-xs text-[#2a2a28] font-mono tabular-nums mt-1 sm:mt-0 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.02em] group-hover:text-[#b8ff57] transition-colors duration-400">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#666660] mt-1 sm:mt-1.5">
            {project.description}
          </p>
        </div>
      </div>
      {project.liveUrl && (
        <ArrowUpRight
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#2a2a28] group-hover:text-[#b8ff57] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1 sm:mt-0"
          strokeWidth={1.5}
        />
      )}
    </div>
  );

  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border-t border-[#1a1a1a] py-7 sm:py-10 md:py-12 transition-colors duration-500 hover:border-[#b8ff57]/20 cursor-pointer"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="group border-t border-[#1a1a1a] py-7 sm:py-10 md:py-12">
      {inner}
    </div>
  );
};
