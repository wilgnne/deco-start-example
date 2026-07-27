/**
 * Node/K8s counterpart to `@decocms/start/sdk/workerEntry`'s
 * `createDecoWorkerEntry` — same admin-route interception contract
 * (`/deco/_liveness`, `/live/_meta`, `/.decofile`, `/live/previews/*`),
 * minus the Cloudflare-specific edge cache and geo/segment logic (delegated
 * to the ingress/CDN in front of the cluster on this target).
 *
 * Admin routes can't live inside `createServerEntry` in production builds
 * — Vite strips custom fetch logic from it — so they're intercepted here,
 * one layer above the TanStack handler.
 */
import type { AdminHandlers } from "@decocms/start/sdk/workerEntry";
import type { ServerEntry } from "@tanstack/react-start/server-entry";

export interface DecoNodeEntryOptions {
  /** Admin route handlers — pass them straight from `@decocms/start/admin`. */
  admin: AdminHandlers;
}

const NO_CACHE = { "Cache-Control": "no-store" } as const;

interface AdminRoute {
  pattern: URLPattern;
  handler: (request: Request) => Response | Promise<Response>;
}

export function createDecoNodeEntry(
  serverEntry: ServerEntry,
  options: DecoNodeEntryOptions,
): ServerEntry {
  const { admin } = options;

  function withCors(response: Response, request: Request): Response {
    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(admin.corsHeaders(request))) {
      headers.set(key, value);
    }
    return new Response(response.body, { status: response.status, headers });
  }

  function corsPreflight(request: Request): Response {
    return new Response(null, {
      status: 204,
      headers: { ...admin.corsHeaders(request), ...NO_CACHE },
    });
  }

  const routes: AdminRoute[] = [
    {
      pattern: new URLPattern({ pathname: "/deco/_liveness" }),
      handler: () =>
        new Response("OK", {
          status: 200,
          headers: { "Content-Type": "text/plain", ...NO_CACHE },
        }),
    },
    {
      pattern: new URLPattern({ pathname: "/live/_meta" }),
      handler: (request) => withCors(admin.handleMeta(request), request),
    },
    {
      pattern: new URLPattern({ pathname: "/.decofile" }),
      handler: async (request) =>
        request.method === "POST"
          ? withCors(await admin.handleDecofileReload(request), request)
          : withCors(admin.handleDecofileRead(), request),
    },
    {
      pattern: new URLPattern({ pathname: "/live/previews/:component+" }),
      handler: async (request) => withCors(await admin.handleRender(request), request),
    },
  ];

  function tryAdminRoute(request: Request, url: URL): Response | Promise<Response> | null {
    const route = routes.find((r) => r.pattern.test(url));
    if (!route) return null;
    if (request.method === "OPTIONS") return corsPreflight(request);
    return route.handler(request);
  }

  return {
    async fetch(request: Request): Promise<Response> {
      const adminResponse = await tryAdminRoute(request, new URL(request.url));
      return adminResponse ?? serverEntry.fetch(request);
    },
  };
}
