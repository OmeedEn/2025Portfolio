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
      bg-gradient-to-r backdrop-blur-sm border shadow-lg
      ${
        color === "blue"
          ? "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-200"
          : ""
      }
      ${
        color === "purple"
          ? "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-200"
          : ""
      }
      ${
        color === "green"
          ? "from-green-500/20 to-green-600/20 border-green-500/30 text-green-200"
          : ""
      }
      ${
        color === "orange"
          ? "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-200"
          : ""
      }
      hover:shadow-xl transition-shadow duration-300
    `}
  >
    <div
      className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at center, ${
          color === "blue"
            ? "rgba(59, 130, 246, 0.15)"
            : color === "purple"
            ? "rgba(147, 51, 234, 0.15)"
            : color === "green"
            ? "rgba(34, 197, 94, 0.15)"
            : "rgba(249, 115, 22, 0.15)"
        } 0%, transparent 70%)`,
      }}
    />
    <span className="relative z-10">{children}</span>
  </motion.div>
);
