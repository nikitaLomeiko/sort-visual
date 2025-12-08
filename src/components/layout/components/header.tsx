import React from "react";
import { ThemeChanger } from "components/common/theme-changer/theme.changer";
import { Logotype } from "components/ui/logotype/logotype";

export const Header: React.FC = () => {
  return (
    <header className="mx-4 mt-3">
      <div className="bg-gradient-to-r from-[var(--bg-secondary-from)] to-[var(--bg-secondary-to)] rounded-2xl shadow-lg transform transition-all duration-700 ease-out animate-slide-down">
        <div className="container mx-auto px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logotype />
              <div>
                <h1 className="text-xl font-bold text-white">Sort Visual</h1>
                <p className="text-gray-200 text-sm">Визуализация сортировок</p>
              </div>
            </div>

            <ThemeChanger />
          </div>
        </div>
      </div>
    </header>
  );
};
