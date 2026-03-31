"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-24 pt-24 sm:pt-32 pb-10 sm:pb-16 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-14 sm:mb-20"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-[#8A8780] font-medium">
          Get In Touch
        </span>
        <div className="flex-1 h-px bg-[#E0DDD5]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <a
          href="mailto:oenshaie@gmail.com"
          className="group font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[#1A1A2E] hover:text-[#FF6B35] transition-colors duration-400 inline-flex items-center gap-3 sm:gap-4"
        >
          <span>oenshaie@gmail.com</span>
          <Mail className="w-5 h-5 sm:w-7 sm:h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 sm:mt-16 flex flex-wrap gap-3 sm:gap-4"
      >
        <a
          href="https://www.linkedin.com/in/omeed-enshaie/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E0DDD5] text-sm text-[#8A8780] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300 hover:shadow-sm"
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
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E0DDD5] text-sm text-[#8A8780] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300 hover:shadow-sm"
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
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E0DDD5] text-sm text-[#8A8780] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300 hover:shadow-sm"
        >
          Resume
          <Download
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
            strokeWidth={1.5}
          />
        </a>
      </motion.div>

      <div className="mt-24 sm:mt-32 pt-6 border-t border-[#E0DDD5]">
        <p className="text-[11px] text-[#C8C5BD] tracking-wide">
          &copy; 2025 Omeed Enshaie
        </p>
      </div>
    </section>
  );
};
