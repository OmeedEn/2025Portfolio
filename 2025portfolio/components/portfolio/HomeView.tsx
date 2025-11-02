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
      className="text-center max-w-4xl"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
      >
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium text-blue-200">
          Available for new opportunities
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent"
      >
        Omeed Enshaie
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
      >
        Software Engineer & Full-Stack Developer
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        Leading high-performance teams to build scalable, user-centric
        applications.
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
            className="border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 rounded-full px-6"
            asChild
          >
            <a href="/resume.pdf" download="Omeed_Enshaie_Resume.pdf" className="flex items-center gap-2">
              <Download className="w-4 h-4 text-gray-400 group-hover:text-white" />
              Resume
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="text-gray-500 text-sm mt-16"
      >
        © 2025 Omeed Enshaie. Crafted with passion.
      </motion.p>
    </motion.div>
  );
};
