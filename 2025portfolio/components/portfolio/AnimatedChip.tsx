import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedChipProps {
  children: ReactNode;
  color?: "blue" | "purple" | "green" | "orange";
  delay?: number;
}

export const AnimatedChip: React.FC<AnimatedChipProps> = ({
  children,
  color = "blue",
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{
      duration: 0.3,
      delay,
      type: "spring",
      stiffness: 400,
      damping: 25,
    }}
    className={`
      relative px-4 py-2 rounded-lg font-medium text-sm cursor-default inline-block
      bg-gradient-to-r backdrop-blur-sm border-2 shadow-xl
      ${
        color === "blue"
          ? "from-blue-500/60 to-blue-600/60 border-blue-400/60 text-white"
          : ""
      }
      ${
        color === "purple"
          ? "from-purple-500/60 to-purple-600/60 border-purple-400/60 text-white"
          : ""
      }
      ${
        color === "green"
          ? "from-green-500/60 to-green-600/60 border-green-400/60 text-white"
          : ""
      }
      ${
        color === "orange"
          ? "from-orange-500/60 to-orange-600/60 border-orange-400/60 text-white"
          : ""
      }
      hover:shadow-2xl transition-all duration-300
    `}
  >
    <div
      className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at center, ${
          color === "blue"
            ? "rgba(59, 130, 246, 0.4)"
            : color === "purple"
            ? "rgba(147, 51, 234, 0.4)"
            : color === "green"
            ? "rgba(34, 197, 94, 0.4)"
            : "rgba(249, 115, 22, 0.4)"
        } 0%, transparent 70%)`,
      }}
    />
    <span className="relative z-10">{children}</span>
  </motion.div>
);
