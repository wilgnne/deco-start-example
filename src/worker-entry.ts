/**
 * Runtime entry — plain Node/K8s target (no Cloudflare-specific runtime).
 */
import "./setup";
import { serve } from "srvx/node";
import { staticMiddleware } from "srvx/static";
import {
  corsHeaders,
  handleDecofileRead,
  handleDecofileReload,
  handleMeta,
  handleRender,
} from "@decocms/start/admin";

import serverEntry from "./server";
import { createDecoNodeEntry } from "./nodeEntry";

const handler = createDecoNodeEntry(serverEntry, {
  admin: {
    handleMeta,
    handleDecofileRead,
    handleDecofileReload,
    handleRender,
    corsHeaders,
  },
});

// Production Node entrypoint — runs the Vite-built SSR bundle over plain
// HTTP. Not part of the Vite app build; invoked directly with `node`.
serve({
  fetch: handler.fetch,
  middleware: [staticMiddleware({ dir: "./dist/client" })],
});
