import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Prevent console logs from being removed
      },
    },
  },
  server: {
    allowedHosts: [
      "eae2-2406-7400-1c3-dc0a-5840-d43e-9174-42d3.ngrok-free.app",
    ],
  },
});
