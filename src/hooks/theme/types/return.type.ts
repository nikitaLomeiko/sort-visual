export interface IReturnThemeManagment {
  applyTheme: (themeName: string) => void;
  getSavedTheme: () => string;
  toggleDarkLight: () => string;
  currentTheme: string;
}
