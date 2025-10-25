"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "laser" | "regular" | "digital";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>("laser");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme;
    if (savedTheme && ["laser", "regular", "digital"].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      let newTheme: Theme;
      if (prev === "laser") {
        newTheme = "regular";
      } else if (prev === "regular") {
        newTheme = "digital";
      } else {
        newTheme = "laser";
      }
      console.log("Theme changing from", prev, "to", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
