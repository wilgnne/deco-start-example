import { createRootRoute } from "@tanstack/react-router";
import { DecoRootLayout } from "@decocms/start/hooks";
// @ts-ignore Vite ?url import
import appCss from "../styles/app.css?url";

const SITE_TITLE = "Deco Start Example";
const SITE_DESCRIPTION = "Storefront powered by @decocms/start + TanStack Start";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:site_name", content: SITE_TITLE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return <DecoRootLayout lang="pt-BR" siteName="deco-start-example" />;
}
