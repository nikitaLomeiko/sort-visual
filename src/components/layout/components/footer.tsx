import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-4 mb-3">
      <div className="bg-[var(--bg-secondary-from)] rounded-xl shadow-lg transform transition-all duration-700 ease-out animate-slide-up">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="text-sm text-[var(--text-primary)]">
                © {currentYear} Sort Visual
              </span>
              <span className="text-sm text-[var(--text-primary)]">©</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-[var(--text-secondary)]">
              <span>Сделано с ❤️</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Визуализация алгоритмов</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
