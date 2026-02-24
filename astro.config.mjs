import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // ── OUTPUT ─────────────────────────────────────────────────────────────
  // "hybrid" = static by default, but individual pages/endpoints can opt
  // into server rendering with `export const prerender = false`.
  // This lets /api/revalidate be a live server route while everything else
  // is pre-rendered at build time from R2 content.
  output: 'hybrid',

  // ── CLOUDFLARE ADAPTER ─────────────────────────────────────────────────
  adapter: cloudflare({
    // platformProxy enables Cloudflare bindings (R2, KV, etc.) during
    // local `wrangler dev` / `astro dev` sessions.
    platformProxy: { enabled: true },
  }),

  // ── SITE URL ───────────────────────────────────────────────────────────
  site: process.env.SITE_URL ?? 'https://perkorbit.co',

  // ── VITE ───────────────────────────────────────────────────────────────
  vite: {
    // Ensure env vars are available at build time for the loader
    define: {
      'import.meta.env.R2_WORKER_URL':    JSON.stringify(process.env.R2_WORKER_URL ?? ''),
      'import.meta.env.R2_WORKER_SECRET': JSON.stringify(process.env.R2_WORKER_SECRET ?? ''),
    },
  },
});
