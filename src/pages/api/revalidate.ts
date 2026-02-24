/**
 * POST /api/revalidate
 *
 * Called by:
 *  - Your Worker's /revalidate route (which you call after uploading to R2)
 *  - A GitHub Action, script, or any HTTP client with the secret
 *
 * What it does:
 *  1. Validates the X-Revalidate-Secret header
 *  2. Fires your Cloudflare Pages deploy hook → new build fetches fresh R2 content
 *
 * Environment variables needed (set in CF Pages dashboard):
 *   REVALIDATE_SECRET      — shared secret (same as WORKER_SECRET in wrangler.toml)
 *   CF_PAGES_DEPLOY_HOOK   — your Pages deploy hook URL
 *                            (Pages → Settings → Builds → Deploy Hooks → Add hook)
 */

import type { APIRoute } from 'astro';

export const prerender = false; // must be a server route

export const POST: APIRoute = async ({ request }) => {
  const secret = request.headers.get('X-Revalidate-Secret')
    ?? new URL(request.url).searchParams.get('secret');

  const expectedSecret = import.meta.env.REVALIDATE_SECRET;
  const deployHook     = import.meta.env.CF_PAGES_DEPLOY_HOOK;

  // ── Auth ──────────────────────────────────────────────────
  if (!expectedSecret || secret !== expectedSecret) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── Fire deploy hook ──────────────────────────────────────
  if (!deployHook) {
    return new Response(
      JSON.stringify({ ok: false, error: 'CF_PAGES_DEPLOY_HOOK is not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const hookRes = await fetch(deployHook, { method: 'POST' });

  if (!hookRes.ok) {
    const body = await hookRes.text().catch(() => '');
    return new Response(
      JSON.stringify({ ok: false, error: 'Deploy hook failed', detail: body }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      message: 'Deploy triggered — new build will fetch fresh R2 content',
      timestamp: new Date().toISOString(),
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

// Also allow GET for a simple health / status check
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ ok: true, endpoint: '/api/revalidate', method: 'POST' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
