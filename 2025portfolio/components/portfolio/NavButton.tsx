import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  view: string;
  children: ReactNode;
  icon: LucideIcon;
  onClick: (view: string) => void;
}

export const NavButton: React.FC<NavButtonProps> = ({
  view,
  children,
  icon: Icon,
  onClick,
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      variant="outline"
      className="border-emerald-400/30 text-emerald-300 bg-emerald-500/5 hover:bg-emerald-500/15 backdrop-blur-sm transition-all duration-300 rounded-full px-6 flex items-center gap-2"
      onClick={() => onClick(view)}
    >
      <Icon className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
      {children}
    </Button>
  </motion.div>
);
