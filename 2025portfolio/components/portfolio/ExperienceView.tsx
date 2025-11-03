import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";
import { BackButton } from "./BackButton";
import { AnimatedChip } from "./AnimatedChip";
import { experiences } from "@/data/experiences";

interface ExperienceViewProps {
  onBack: () => void;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ onBack }) => {
  return (
    <motion.div
      key="experience"
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -20 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl px-2 sm:px-0"
    >
      <Card className="relative bg-white/5 backdrop-blur-lg border-white/10 max-h-[85vh] flex flex-col">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30">
          <BackButton onClick={onBack} />
        </div>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center pt-4">
            Leadership Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto px-4 sm:px-8 pb-6 sm:pb-8 space-y-4 sm:space-y-6 custom-scrollbar">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-semibold text-sm sm:text-base">
                      {exp.company}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{exp.period}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-3 leading-relaxed text-xs sm:text-sm">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.achievements.map((achievement, achIndex) => (
                  <AnimatedChip
                    key={achIndex}
                    color={achIndex % 2 === 0 ? "blue" : "purple"}
                    delay={achIndex * 0.1}
                  >
                    {achievement}
                  </AnimatedChip>
                ))}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};
