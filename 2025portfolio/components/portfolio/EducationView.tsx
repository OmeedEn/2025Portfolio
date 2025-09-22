import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "./BackButton";
import { AnimatedChip } from "./AnimatedChip";

interface EducationViewProps {
  onBack: () => void;
}

export const EducationView: React.FC<EducationViewProps> = ({ onBack }) => {
  return (
    <motion.div
      key="education"
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -20 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl"
    >
      <Card className="relative bg-white/5 backdrop-blur-lg border-white/10 h-[70vh] flex flex-col">
        <div className="absolute top-6 left-6 z-30">
          <BackButton onClick={onBack} />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center pt-4">
            Education & Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-8 grid md:grid-cols-2 gap-8 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Education</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  Bachelors of Science, Computer Science
                </h4>
                <p className="text-blue-400 font-medium mb-1">
                  California State University, Long Beach
                </p>
                <p className="text-gray-400 text-sm mb-4">2021 - 2025</p>
                <div className="relative overflow-hidden rounded-lg border border-white/20">
                  <Image
                    src="/csulb_campus.jpg"
                    alt="California State University, Long Beach Campus"
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-sm font-medium">CSULB</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Core Skills</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Leadership</h4>
                <div className="flex flex-wrap gap-2">
                  <AnimatedChip color="purple" delay={0.1}>
                    Team Building
                  </AnimatedChip>
                  <AnimatedChip color="purple" delay={0.2}>
                    Mentoring
                  </AnimatedChip>
                  <AnimatedChip color="purple" delay={0.3}>
                    Agile
                  </AnimatedChip>
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">
                  Technical Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  <AnimatedChip color="blue" delay={0.4}>
                    React
                  </AnimatedChip>
                  <AnimatedChip color="blue" delay={0.5}>
                    Node.js
                  </AnimatedChip>
                  <AnimatedChip color="green" delay={0.6}>
                    Python
                  </AnimatedChip>
                  <AnimatedChip color="orange" delay={0.7}>
                    AWS
                  </AnimatedChip>
                  <AnimatedChip color="purple" delay={0.8}>
                    Azure
                  </AnimatedChip>
                  <AnimatedChip color="green" delay={0.9}>
                    SQL
                  </AnimatedChip>
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
