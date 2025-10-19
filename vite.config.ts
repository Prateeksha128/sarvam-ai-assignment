import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        // Ensure all code is bundled into a single file
        inlineDynamicImports: true,
        // Use a simple filename without hash
        entryFileNames: "widget.js",
        chunkFileNames: "widget.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "widget.css";
          }
          return "[name].[ext]";
        },
      },
    },
    // Don't minify for easier debugging initially
    minify: false,
    sourcemap: false,
  },
  define: {
    // Replace process.env.NODE_ENV since we're building for browser
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
