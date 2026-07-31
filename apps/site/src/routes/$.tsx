import { createFileRoute } from "@tanstack/react-router";
import { cmsRouteConfig, deferredSectionLoader } from "@decocms/start/routes";
import { DecoPageRenderer } from "@decocms/start/hooks";

const routeConfig = cmsRouteConfig({
  defaultTitle: "Default title",
  siteName: "Site Name",
});

export const Route = createFileRoute("/$")({
  ...routeConfig,
  component: CmsPage,
  notFoundComponent: NotFoundPage,
});

function CmsPage() {
  const data = Route.useLoaderData() as Record<string, any> | null;
  if (!data) return <NotFoundPage />;

  return (
    <DecoPageRenderer
      sections={data.resolvedSections ?? []}
      deferredSections={data.deferredSections ?? []}
      deferredPromises={data.deferredPromises}
      pagePath={data.pagePath}
      pageUrl={data.pageUrl}
      loadDeferredSectionFn={deferredSectionLoader}
    />
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold opacity-20">404</h1>
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <a href="/" className="underline">
        Voltar para a home
      </a>
    </div>
  );
}
