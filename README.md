# deco-start-example

Storefront deco.cx v2 — [@decocms/start](https://docs.deco.cx/v2) + TanStack Start + React 19, hospedado em Node.js/Docker.

## Requisitos

- Node.js 24+
- pnpm

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Abre em `http://localhost:3000`. Sem página CMS registrada em `/`, o servidor mostra um fallback — conecte o site ao [studio.decocms.com](https://studio.decocms.com/) para criar conteúdo.

## Estrutura

- `src/sections/` — componentes React editáveis pelo CMS (props = schema do admin)
- `src/routes/` — rotas TanStack Router (file-based): `index.tsx` (home), `$.tsx` (catch-all CMS), `deco/*` (protocolo admin)
- `src/setup.ts` — bootstrap do site (`createSiteSetup`)
- `src/server.ts` — entrada do servidor TanStack Start (fetch handler)
- `src/nodeEntry.ts` — intercepta as rotas do protocolo admin (`/deco/_liveness`, `/live/_meta`, `/.decofile`, `/live/previews/*`) antes do handler do TanStack
- `src/worker-entry.ts` — entrypoint de produção Node (roda o bundle SSR via `srvx/node`, fora do build do Vite)
- `src/server/` — artefatos gerados (`blocks.gen.*`, `meta.gen.json`) — não editar manualmente
- `public/` — assets estáticos (favicon)

## Build & Run

```bash
pnpm build
pnpm start
```

`pnpm build` gera os artefatos do CMS e o bundle Vite; `pnpm start` roda `dist/server/worker-entry.js` com Node.

### Docker

```bash
docker build -t deco-start-example .
docker run -p 8080:8080 deco-start-example
```
