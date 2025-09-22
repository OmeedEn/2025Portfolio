import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { BackButton } from "./BackButton";
import { AnimatedChip } from "./AnimatedChip";
import { projects } from "@/data/projects";

interface ProjectsViewProps {
  onBack: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onBack }) => {
  return (
    <motion.div
      key="projects"
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -20 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-6xl"
    >
      <Card className="relative bg-white/5 backdrop-blur-lg border-white/10 h-[80vh] flex flex-col">
        <div className="absolute top-6 left-6 z-30">
          <BackButton onClick={onBack} />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center pt-4">
            Featured Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-xl border border-white/10 bg-white/[.02] p-6 transition-all duration-300 hover:border-blue-400/50 hover:bg-white/5 ${
                  project.featured ? "ring-1 ring-blue-400/30" : ""
                }`}
              >
                {project.featured && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <AnimatedChip
                      key={techIndex}
                      color={
                        techIndex % 4 === 0
                          ? "blue"
                          : techIndex % 4 === 1
                          ? "purple"
                          : techIndex % 4 === 2
                          ? "green"
                          : "orange"
                      }
                      delay={techIndex * 0.05}
                    >
                      {tech}
                    </AnimatedChip>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white transition-all duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>

                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-sm text-blue-200 transition-all duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
