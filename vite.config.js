import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/iching-explorer/",
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
});
