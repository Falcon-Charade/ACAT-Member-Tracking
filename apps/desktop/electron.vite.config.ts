import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "node:path";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/main",
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, "src/main.ts"),
        formats: ["cjs"],
        fileName: () => "main.js"
      },
      rollupOptions: {
        external: ["electron"]
      }
    }
  },

  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/preload",
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, "src/preload.ts"),
        formats: ["cjs"],
        fileName: () => "preload.js"
      },
      rollupOptions: {
        external: ["electron"]
      }
    }
  }
});