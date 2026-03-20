"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.88] tracking-[-0.03em]"
        >
          Omeed
          <br />
          Enshaie
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex items-center gap-5"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            className="h-px w-12 sm:w-16 bg-[#b8ff57] origin-left"
          />
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#888880]">
            Founder & Software Engineer
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-3 text-xs sm:text-sm text-[#444440] tracking-wide"
        >
          BS Computer Science, Cal State Long Beach
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-6 sm:left-10 md:left-16 lg:left-24"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[#555550]" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
};
