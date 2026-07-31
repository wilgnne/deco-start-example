import { createFileRoute } from "@tanstack/react-router";
import { cmsHomeRouteConfig, deferredSectionLoader } from "@decocms/start/routes";
import { DecoPageRenderer } from "@decocms/start/hooks";

export const Route = createFileRoute("/")({
  ...cmsHomeRouteConfig({
    defaultTitle: "Default title",
  }),
  component: HomePage,
});

function HomePage() {
  const data = Route.useLoaderData() as Record<string, any> | null;

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Deco Start Example</h1>
        <p className="text-sm opacity-60">
          Nenhuma página CMS registrada para "/" ainda. Conecte este site ao
          admin.deco.cx para criar conteúdo.
        </p>
      </div>
    );
  }

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
