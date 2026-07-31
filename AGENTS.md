# AGENTS.md

## Deco CMS content

This is a Deco CMS site (see `apps/site/.deco/`). For content changes (page copy, section props, loader config, site settings):

- CMS content lives in `apps/site/.deco/blocks/<encoded-key>.json` — one JSON file per block, filename is the URI-encoded block key. Edit ONLY the matching `.deco/blocks/*.json` file(s).
- NEVER edit generated artifacts: `blocks.gen.json`, `blocks.gen.ts`, `meta.gen.json`, or any other `*.gen.*` file. They are regenerated from `.deco/blocks/` by the dev server and by every production build — an edit there looks correct in the preview but is silently discarded on deploy.
- Do not touch any other file to make a content change visible: the dev server watches `.deco/blocks/` and hot-reloads the preview, and production builds/content syncs read `.deco/blocks/` directly. Committing the `.deco/blocks/*.json` change is all that is needed.
- Adding a new CMS-facing app/section/loader (a new `src/apps/*.ts`, `src/sections/*.tsx`, or `src/loaders/*.ts` file) requires regenerating the schema/blocks artifacts so the admin picks it up: from `apps/site/`, run `pnpm run generate:blocks && pnpm run generate:schema` (or `pnpm run generate` for the full pipeline). This is the one case where the `.gen.*` files legitimately change — via the script, never by hand.
