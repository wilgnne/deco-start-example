# deco-start-example

Storefront deco.cx v2 — [@decocms/start](https://docs.deco.cx/v2) + TanStack Start + React 19, hospedado em Cloudflare Workers.

## Requisitos

- Node.js 24+
- Conta Cloudflare (para deploy)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`. Sem página CMS registrada em `/`, o servidor mostra um fallback — conecte o site ao [studio.decocms.com](https://studio.decocms.com/) para criar conteúdo.

## Estrutura

- `src/sections/` — componentes React editáveis pelo CMS (props = schema do admin)
- `src/routes/` — rotas TanStack Router (file-based): `index.tsx` (home), `$.tsx` (catch-all CMS), `deco/*` (protocolo admin)
- `src/setup.ts` — bootstrap do site (`createSiteSetup`)
- `src/server.ts` — entrada do servidor TanStack Start (fetch handler)
- `src/worker-entry.ts` — entrada do Cloudflare Worker (wraps o server entry com o protocolo admin)
- `src/server/` — artefatos gerados (`blocks.gen.*`, `meta.gen.json`) — não editar manualmente
- `public/` — assets estáticos (favicon)

## Build & Deploy

```bash
npm run build
npm run deploy
```
