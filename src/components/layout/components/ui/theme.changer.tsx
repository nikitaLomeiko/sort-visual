import React, { useState, useEffect } from "react";

export const ThemeChanger: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return savedTheme ? savedTheme === "dark" : systemPrefersDark;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl px-4 py-2 shadow hover:bg-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 w-[120px]"
      aria-label="Сменить тему"
    >
      <div className="flex items-center justify-center space-x-2">
        <div className="relative w-5 h-5 flex-shrink-0">
          {/* Солнце */}
          <div
            className={`absolute inset-0 transform transition-all duration-300 ${
              isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <div className="w-5 h-5 bg-yellow-300 rounded-full shadow" />
          </div>

          {/* Луна */}
          <div
            className={`absolute inset-0 transform transition-all duration-300 ${
              isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
            }`}
          >
            <div className="w-5 h-5 bg-gray-300 rounded-full shadow" />
            <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-gray-600 rounded-full" />
          </div>
        </div>

        <span className="font-medium text-sm whitespace-nowrap">{isDark ? "Светлая" : "Тёмная"}</span>
      </div>
    </button>
  );
};
