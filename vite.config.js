import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mkcert(), react(), tailwindcss()],
  build: {
    sourcemap: "hidden",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-ui": ["sonner", "lucide-react", "motion", "hamburger-react"],
          "vendor-aws": ["aws-amplify", "@aws-amplify/ui-react"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-http": ["axios", "mercadopago"],
          "vendor-md": ["react-markdown"],
          "vendor-utils": ["tailwind-merge"],
        },
      },
    },
  },
  server: {
    https: true,
  },
  resolve: {
    alias: {
      "@agent": path.resolve(__dirname, "./src/Agent"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@cognito": path.resolve(__dirname, "./src/cognito"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@schemas": path.resolve(__dirname, "./src/schemas"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@typings": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
