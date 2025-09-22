import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <Button
    variant="ghost"
    size="icon"
    className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
    onClick={onClick}
  >
    <ArrowLeft className="w-5 h-5" />
  </Button>
);
