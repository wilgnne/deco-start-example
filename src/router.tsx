import { createDecoRouter } from "@decocms/start/sdk/router";
import { routeTree } from "./routeTree.gen";
import "./setup";

export function getRouter() {
  return createDecoRouter({ routeTree });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
