import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/iching-explorer-public/",
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
});
