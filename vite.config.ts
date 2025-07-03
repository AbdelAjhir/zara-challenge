/// <reference types="vitest" />
import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress TypeScript warnings during build
        if (warning.code === "TS2304") {
          return;
        }
        warn(warning);
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    exclude: ["e2e/**", "node_modules", "dist", ".idea", ".git", ".cache"],
  },
});
