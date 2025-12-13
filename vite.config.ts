import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      data: "/src/data",
      assets: "/src/assets",
      components: "/src/components",
      hooks: "/src/hooks",
      utils: "/src/utils",
      styles: "/src/styles",
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          swiper: ["swiper"],
          "syntax-highlighter": ["react-syntax-highlighter"],
          icons: ["lucide-react"],
          "react-vendor": ["react", "react-dom"],
          utils: ["react-copy-to-clipboard"],
        },
      },
    },
  },
});
