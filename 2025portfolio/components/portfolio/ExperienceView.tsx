"use client";

import React from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";

export const ExperienceSection: React.FC = () => {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-24 sm:py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.25em] uppercase text-[#555550] mb-12 sm:mb-16"
      >
        Experience
      </motion.p>

      <div>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="border-t border-[#1a1a1a] py-5 sm:py-7 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-1 sm:gap-8 items-baseline"
          >
            <h3 className="font-display text-base sm:text-lg font-semibold tracking-[-0.01em]">
              {exp.title}
            </h3>
            <p className="text-sm text-[#888880]">{exp.company}</p>
            <p className="text-xs text-[#555550] font-mono tabular-nums">
              {exp.period}
            </p>
          </motion.div>
        ))}
        <div className="border-t border-[#1a1a1a]" />
      </div>
    </section>
  );
};
