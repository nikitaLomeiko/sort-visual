import { IReturnThemeManagment } from "hooks/theme/types/return.type";
import { useThemeManagment } from "hooks/theme/use.theme.managment";
import { createContext, useContext, useLayoutEffect } from "react";

const ThemeContext = createContext<IReturnThemeManagment | undefined>(
  undefined
);

interface IProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const managment = useThemeManagment();

  useLayoutEffect(() => {
    const { applyTheme, getSavedTheme } = managment;
    applyTheme(getSavedTheme());
  });

  return (
    <ThemeContext.Provider value={managment}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
