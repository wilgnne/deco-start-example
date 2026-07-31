import { createSiteSetup } from "@decocms/start/setup";
// @ts-ignore Vite ?url import
import appCss from "./styles/app.css?url";
import { blocks } from "./server/cms/blocks.gen";

createSiteSetup({
  sections: import.meta.glob("./sections/**/*.tsx") as Record<
    string,
    () => Promise<any>
  >,
  blocks,
  meta: () =>
    import("./server/admin/meta.gen.json").then((m) => m.default),
  css: appCss,
  onResolveError: (error, resolveType, context) => {
    console.error(`[CMS-DEBUG] ${context} "${resolveType}" failed:`, error);
  },
  onDanglingReference: (resolveType) => {
    console.warn(`[CMS-DEBUG] Dangling reference: ${resolveType}`);
    return null;
  },
});
