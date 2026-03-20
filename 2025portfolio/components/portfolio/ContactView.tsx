"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-24 pt-24 sm:pt-32 pb-10 sm:pb-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.25em] uppercase text-[#555550] mb-12 sm:mb-16"
      >
        Connect
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <a
          href="mailto:oenshaie@gmail.com"
          className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] hover:text-[#b8ff57] transition-colors duration-400 inline-block"
        >
          oenshaie@gmail.com
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 sm:mt-16 flex flex-wrap gap-6 sm:gap-10"
      >
        <a
          href="https://www.linkedin.com/in/omeed-enshaie/"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-sm text-[#888880] hover:text-[#b8ff57] transition-colors duration-300 flex items-center gap-1.5"
        >
          LinkedIn
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        </a>
        <a
          href="https://github.com/OmeedEn"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-sm text-[#888880] hover:text-[#b8ff57] transition-colors duration-300 flex items-center gap-1.5"
        >
          GitHub
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        </a>
        <a
          href="/resume.pdf"
          download="Omeed_Enshaie_Resume.pdf"
          className="group text-sm text-[#888880] hover:text-[#b8ff57] transition-colors duration-300 flex items-center gap-1.5"
        >
          Resume
          <Download
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
            strokeWidth={1.5}
          />
        </a>
      </motion.div>

      <div className="mt-24 sm:mt-32 pt-6 border-t border-[#1a1a1a]">
        <p className="text-[11px] text-[#2a2a28] tracking-wide">
          2025 Omeed Enshaie
        </p>
      </div>
    </section>
  );
};
