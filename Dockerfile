# syntax=docker/dockerfile:1

# Node 24+ has the URLPattern API as a native global (same as Cloudflare
# Workers/Deno), which @decocms/start's CMS page matching depends on.
ARG NODE_VERSION=24-alpine
ARG PNPM_VERSION=11.5.1

# ---------------------------------------------------------------------------
# deps — full install (incl. devDependencies), used only to build
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps
ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---------------------------------------------------------------------------
# build — generate CMS artifacts (blocks/schema) and produce dist/
# ---------------------------------------------------------------------------
FROM deps AS build
WORKDIR /app
COPY . .
RUN pnpm build

# ---------------------------------------------------------------------------
# prod-deps — production-only node_modules (no vite/ts-morph/tsx/etc.)
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS prod-deps
ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile

# ---------------------------------------------------------------------------
# runtime — minimal image, runs as non-root, listens on $PORT
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

USER node
EXPOSE 8080

CMD ["node", "dist/server/worker-entry.js"]
