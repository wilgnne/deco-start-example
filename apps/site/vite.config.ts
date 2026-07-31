import path from "path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { decoVitePlugin } from "@decocms/start/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

const srcDir = path.resolve(import.meta.dirname, "src");

export default defineConfig({
  server: {
    allowedHosts: [".decocdn.com", ".deco.host", ".deco.studio", ".decocms.com"],
    headers: {
      "Content-Security-Policy":
        "frame-ancestors 'self' https://*.deco.studio http://localhost:* https://localhost:* https://admin.deco.cx https://studio.decocms.com",
    },
  },
  plugins: [
    tanstackStart({ server: { entry: "worker-entry" } }),
    react(),
    tailwindcss(),
    decoVitePlugin(),
    nitro(),
  ],
  build: {
    sourcemap: "hidden",
  },
  define: {
    "process.env.DECO_SITE_NAME": JSON.stringify(
      process.env.DECO_SITE_NAME || "deco-start-example",
    ),
  },
  resolve: {
    dedupe: [
      "@decocms/start",
      "@decocms/apps",
      "@tanstack/react-start",
      "@tanstack/react-router",
      "react",
      "react-dom",
    ],
    alias: {
      "~": srcDir,
    },
  },
});
