import React from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", "dark");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-primary-from)] to-[var(--bg-primary-to)] transition-colors duration-300 flex flex-col">
      <Header />
      <main className="flex-1 mx-4 px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
