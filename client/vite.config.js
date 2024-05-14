import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://todoapp-bnx4.onrender.com",
      "/auth": "https://todoapp-bnx4.onrender.com",
      "/dashboard": "https://todoapp-bnx4.onrender.com",
    },
  },
  plugins: [react()],
});
