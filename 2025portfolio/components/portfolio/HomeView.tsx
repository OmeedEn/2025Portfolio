import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Download } from "lucide-react";
import { NavButton } from "./NavButton";
import { Briefcase, Code, GraduationCap, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <motion.div
      key="home"
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -20 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center max-w-4xl px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-green-300 bg-clip-text text-transparent"
      >
        Omeed Enshaie
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-lg sm:text-xl md:text-2xl text-emerald-300 mb-6 sm:mb-8 font-light"
      >
        Founder, Software Engineer, Full-Stack Developer
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-base sm:text-lg text-cyan-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2"
      >
        Scaling ideas into impactful software solutions
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <NavButton view="experience" icon={Briefcase} onClick={onNavigate}>
          Experience
        </NavButton>
        <NavButton view="projects" icon={Code} onClick={onNavigate}>
          Projects
        </NavButton>
        <NavButton view="education" icon={GraduationCap} onClick={onNavigate}>
          Education
        </NavButton>
        <NavButton view="contact" icon={Contact} onClick={onNavigate}>
          Contact
        </NavButton>

        {/* Resume Download Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="border-emerald-400/30 text-emerald-300 bg-emerald-500/5 hover:bg-emerald-500/15 backdrop-blur-sm transition-all duration-300 rounded-full px-6"
            asChild
          >
            <a
              href="/resume.pdf"
              download="Omeed_Enshaie_Resume.pdf"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
              Resume
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="text-emerald-600 text-xs sm:text-sm mt-12 sm:mt-16"
      >
        © 2025 Omeed Enshaie. Crafted with passion.
      </motion.p>
    </motion.div>
  );
};
