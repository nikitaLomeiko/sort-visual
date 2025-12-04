import React from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col">
      <Header />
      <main className="flex-1 mx-4 px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
