import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://testlkamur.dvec.ru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false, // Отключает проверку SSL-сертификата
        // headers: {
        //   // Явно указываем заголовки, которые должны передаваться
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      },
    },
  },
});
