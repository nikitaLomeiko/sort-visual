import React from "react";
import { ThemeChanger } from "./ui/theme.changer";

export const Header: React.FC = () => {
  return (
    <header className="mx-4 mt-3">
      <div className="bg-gradient-to-r from-slate-700 to-gray-600 rounded-2xl shadow-lg transform transition-all duration-700 ease-out animate-slide-down">
        <div className="container mx-auto px-5 py-3">
          <div className="flex items-center justify-between">
            {/* Логотип и название */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow">
                <span className="text-white font-bold text-lg">SV</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sort Visual</h1>
                <p className="text-gray-200 text-sm">Визуализация сортировок</p>
              </div>
            </div>

            {/* Кнопка смены темы */}
            <ThemeChanger />
          </div>
        </div>
      </div>
    </header>
  );
};
