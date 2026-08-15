import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@component": path.resolve(__dirname, "src/component"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@data": path.resolve(__dirname, "src/data"),
      "src/config": path.resolve(__dirname, "src/config"),
      "src/shared": path.resolve(__dirname, "src/shared"),
      "src/view": path.resolve(__dirname, "src/view"),
      "src/modules": path.resolve(__dirname, "src/modules"),
      "src/security": path.resolve(__dirname, "src/security"),
      "@i18n": path.relative(__dirname, "../../i18n"),
    },
  },
  server: {
    proxy: {
      '/api/tv': {
        target: 'https://screener-facade.tradingview.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tv/, ''),
        headers: {
          'Origin': 'https://www.tradingview.com',
        },
      },
      '/ws': {
        target: 'wss://widgetdata.tradingview.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),
        headers: {
          'Origin': 'https://www.tradingview.com',
        },
      },
    },
  },
});