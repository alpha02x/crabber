import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "/crabber",
  plugins: [react(), viteTsconfigPaths()],
  build: { outDir: "build" },
  server: {
    open: true,
    port: 3000,
    host: "127.0.0.1",
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
