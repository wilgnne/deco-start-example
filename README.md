# deco-start-example

Storefront deco.cx v2 — [@decocms/start](https://docs.deco.cx/v2) + TanStack Start + React 19, hospedado em Cloudflare Workers.

## Requisitos

- Node.js 20+
- Conta Cloudflare (para deploy)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`. Sem página CMS registrada em `/`, o servidor mostra um fallback — conecte o site ao [admin.deco.cx](https://admin.deco.cx) para criar conteúdo.

## Estrutura

- `src/sections/` — componentes React editáveis pelo CMS (props = schema do admin)
- `src/routes/` — rotas TanStack Router (file-based): `index.tsx` (home), `$.tsx` (catch-all CMS), `deco/*` (protocolo admin)
- `src/setup.ts` — bootstrap do site (`createSiteSetup`)
- `src/worker-entry.ts` — entrada do Cloudflare Worker (cache de borda + protocolo admin)
- `src/server/` — artefatos gerados (`blocks.gen.*`, `meta.gen.json`) — não editar manualmente

## Build & Deploy

```bash
npm run build
npm run deploy
```
