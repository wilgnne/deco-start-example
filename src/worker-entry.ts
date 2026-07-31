/**
 * Runtime entry — plain Node/K8s target (no Cloudflare-specific runtime).
 */
import "./setup";
import { createDecoWorkerEntry } from "@decocms/start/sdk/workerEntry";
import {
  corsHeaders,
  handleDecofileRead,
  handleDecofileReload,
  handleMeta,
  handleRender,
} from "@decocms/start/admin";

import serverEntry from "./server";

const workerEntry = createDecoWorkerEntry(serverEntry, {
  admin: {
    handleMeta,
    handleDecofileRead,
    handleDecofileReload,
    handleRender,
    corsHeaders,
  },
});

// `workerEntry.fetch` expects CF Workers' `(request, env, ctx)` signature,
// but Nitro's node-server preset only ever calls `fetch(request)`. Bind
// the missing args: `env` -> `process.env` (string bindings like
// DECO_SITE_NAME/PURGE_TOKEN/BUILD_HASH map 1:1 to env vars; object
// bindings like DECO_METRICS/DECO_KV stay inert, as they would anyway).
// `passThroughOnException` is a no-op since there's no origin to fall
// through to here.
export default {
  fetch(request: Request) {
    return workerEntry.fetch(
      request,
      process.env,
      {
        waitUntil: (promise) => {
          promise.catch((err) => console.error("[waitUntil]", err));
        },
        passThroughOnException: () => { },
      }
    );
  },
};
