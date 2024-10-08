import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  const { VITE_BACKEND_URI } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: VITE_BACKEND_URI,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
