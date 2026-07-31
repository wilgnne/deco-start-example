import { createSiteSetup } from "@decocms/start/setup";
import { registerCommerceLoaders, setInvokeLoaders } from "@decocms/start";
import { PreviewProviders } from "@decocms/start/hooks";
import { autoconfigApps } from "@decocms/start/apps";
import APP_REGISTRY from "@decocms/apps/registry";

// @ts-ignore Vite ?url import
import appCss from "./styles/app.css?url";
import { blocks } from "./server/cms/blocks.gen";
import { siteLoaders } from "./server/cms/loaders.gen";

createSiteSetup({
  sections: import.meta.glob("./sections/**/*.tsx"),
  blocks,
  meta: () =>
    import("./server/admin/meta.gen.json").then((m) => m.default),
  css: appCss,
  previewWrapper: PreviewProviders,
  onResolveError: (error, resolveType, context) => {
    console.error(`[CMS-DEBUG] ${context} "${resolveType}" failed:`, error);
  },
  onDanglingReference: (resolveType) => {
    console.warn(`[CMS-DEBUG] Dangling reference: ${resolveType}`);
    return null;
  },
});

autoconfigApps(blocks, APP_REGISTRY);

const SITE_LOADERS = { ...siteLoaders };

registerCommerceLoaders(SITE_LOADERS);
setInvokeLoaders(() => SITE_LOADERS);
