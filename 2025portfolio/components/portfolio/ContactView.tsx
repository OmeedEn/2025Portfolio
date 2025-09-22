import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github } from "lucide-react";
import { BackButton } from "./BackButton";
import { contactInfo } from "@/data/contact";

interface ContactViewProps {
  onBack: () => void;
}

const iconMap = {
  Mail,
  Linkedin,
  Github,
};

export const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
  return (
    <motion.div
      key="contact"
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -20 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-5xl"
    >
      <Card className="relative bg-white/5 backdrop-blur-lg border-white/10">
        <div className="absolute top-6 left-6 z-30">
          <BackButton onClick={onBack} />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center pt-4">
            Let&apos;s Connect
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 md:p-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-300 mb-10 max-w-lg mx-auto"
          >
            Ready to discuss opportunities, collaborate, or just have a chat
            about technology.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`
                    group relative block rounded-xl border border-white/10 bg-white/[.02] p-8 text-center transition-all duration-300 
                    hover:border-${item.color}-400/50 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-${item.color}-500/50
                  `}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at center, ${
                        item.color === "blue"
                          ? "rgba(59, 130, 246, 0.1)"
                          : item.color === "purple"
                          ? "rgba(147, 51, 234, 0.1)"
                          : "rgba(156, 163, 175, 0.1)"
                      } 0%, transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <IconComponent
                      className={`mx-auto mb-4 h-10 w-10 text-${item.color}-400 transition-transform duration-300 group-hover:scale-110`}
                    />
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className={`mt-1 text-sm text-${item.color}-300`}>
                      {item.subtitle}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
