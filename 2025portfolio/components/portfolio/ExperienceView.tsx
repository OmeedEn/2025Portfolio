"use client";

import React from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";

export const ExperienceSection: React.FC = () => {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-14 sm:mb-20"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-[#8A8780] font-medium">
          Experience
        </span>
        <div className="flex-1 h-px bg-[#E0DDD5]" />
      </motion.div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-[#E0DDD5]" />

        <div className="space-y-10 sm:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-10 sm:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] border-[#FF6B35] bg-[#FAFAF7]" />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-8">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#1A1A2E] tracking-[-0.01em]">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[#8A8780] mt-0.5">{exp.company}</p>
                </div>
                <p className="text-xs text-[#C8C5BD] font-mono tabular-nums whitespace-nowrap">
                  {exp.period}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
