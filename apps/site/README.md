# deco-start-example

Storefront deco.cx v2 — [@decocms/start](https://docs.deco.cx/v2) + TanStack
Start + React 19, hospedado em Node.js/Docker.

## Requisitos

- Node.js 24+
- pnpm

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Abre em `http://localhost:3000`. Sem página CMS registrada em `/`, o servidor
mostra um fallback — conecte o site ao
[studio.decocms.com](https://studio.decocms.com/) para criar conteúdo.

## Estrutura

- `src/sections/` — componentes React editáveis pelo CMS (props = schema do
  admin)
- `src/routes/` — rotas TanStack Router (file-based): `index.tsx` (home),
  `$.tsx` (catch-all CMS), `deco/*` (protocolo admin)
- `src/router.tsx` — router do cliente (`createDecoRouter`)
- `src/setup.ts` — bootstrap do site (`createSiteSetup`)
- `src/server.ts` — fetch handler do TanStack Start (`createServerEntry`)
- `src/worker-entry.ts` — entry point do servidor (admin + assets + fetch
  handler via `createDecoWorkerEntry`)
- `src/server/` — artefatos gerados (`blocks.gen.*`, `meta.gen.json`) — não
  editar manualmente
- `public/` — assets estáticos (favicon)

## Build & Run

```bash
pnpm build
pnpm start
```

> **Node 24+ é obrigatório em build e runtime** — Use `nvm use` (o `.nvmrc` já
> fixa `24`) antes de `pnpm build`/`pnpm dev`/`pnpm start`.

### Docker

```bash
docker build -t deco-start-example .
docker run -p 8080:8080 deco-start-example
```
