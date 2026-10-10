import { defineConfig } from "vite";
import { resolve } from "node:path";
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        blog: resolve(import.meta.dirname, "blog/index.html"),
        locations: resolve(import.meta.dirname, "locations/index.html"),
        contact: resolve(import.meta.dirname, "contact/index.html"),
      },
    },
  },
});
