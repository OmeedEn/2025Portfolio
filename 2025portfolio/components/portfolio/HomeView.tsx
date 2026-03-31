"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";

const AnimatedName: React.FC<{ text: string; startDelay: number }> = ({
  text,
  startDelay,
}) => (
  <span className="inline-block">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 80, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.7,
          delay: startDelay + i * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
        style={{ transformOrigin: "bottom" }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);


export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center px-6 sm:px-10 md:px-16 lg:px-24 py-20 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/3 left-[10%] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2EC4B6 0%, transparent 70%)",
        }}
      />

      {/* Dot grid texture */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
        {/* Left: Text Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5"
          >
            <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#8A8780] font-medium">
              Founder & Software Engineer
            </span>
          </motion.div>

          <div style={{ perspective: "1000px" }}>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.88] tracking-[-0.04em] text-[#1A1A2E]">
              <AnimatedName text="Omeed" startDelay={0.3} />
              <br />
              <AnimatedName text="Enshaie" startDelay={0.65} />
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-6 sm:mt-8 flex items-center gap-5"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
              className="h-[2px] w-14 sm:w-20 bg-[#FF6B35] origin-left rounded-full"
            />
            <p className="text-sm sm:text-base text-[#8A8780]">
              BS Computer Science, Cal State Long Beach
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#e85d2a] transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              View My Work
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2} />
            </a>
            <a
              href="mailto:oenshaie@gmail.com"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E0DDD5] text-sm font-medium text-[#1A1A2E] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300"
            >
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
            <div className="flex items-center gap-2 ml-1">
              <a
                href="https://github.com/OmeedEn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#E0DDD5] flex items-center justify-center text-[#8A8780] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300"
              >
                <Github className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/in/omeed-enshaie/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#E0DDD5] flex items-center justify-center text-[#8A8780] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[#E0DDD5] opacity-60" />
            {/* Accent arc */}
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
              className="absolute -inset-3 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: "#FF6B35",
                borderRightColor: "#FF6B35",
              }}
            />
            {/* Photo container */}
            <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-[#FF6B35]/10">
              <img
                src="/profile.jpg"
                alt="Omeed Enshaie"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-6 sm:left-10 md:left-16 lg:left-24"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3"
        >
          <ArrowDown className="w-4 h-4 text-[#C8C5BD]" strokeWidth={1.5} />
          <span className="text-[11px] text-[#C8C5BD] tracking-[0.2em] uppercase">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
