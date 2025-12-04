import { useState } from "react";
import { themeList } from "./config/theme.config";

export const useThemeManagment = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(getSavedTheme());
  const applyTheme = (themeName: string) => {
    const theme = themeList.find((t) => t === themeName);
    const root = document.documentElement;

    if (theme) {
      try {
        root.setAttribute("data-theme", themeName);
        localStorage.setItem("theme", themeName);
      } catch (error) {
        console.error("Error applying theme:", error);
      }
    } else {
      console.warn(
        `Theme not found: ${themeName}, falling back to light theme`
      );
      applyTheme("light");
    }
  };

  function getCurrentTheme() {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(current);

    return current;
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem("theme") || "light";
    } catch (error) {
      console.error("Error reading theme from localStorage:", error);
      return "light";
    }
  }

  function toggleDarkLight() {
    const currentTheme = getCurrentTheme();
    const currentThemeData = themeList.find((t) => t === currentTheme);

    if (currentThemeData) {
      const oppositeThemes = themeList.filter((t) => t !== currentThemeData);
      if (oppositeThemes.length > 0) {
        applyTheme(oppositeThemes[0]);
        return oppositeThemes[0];
      }
    }

    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
    return newTheme;
  }

  return { applyTheme, getSavedTheme, toggleDarkLight, currentTheme };
};
