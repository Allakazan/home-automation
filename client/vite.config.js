import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    "@": resolve(__dirname, "src"),
    "#root": resolve(__dirname),
  },
});
