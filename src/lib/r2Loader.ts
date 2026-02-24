/**
 * r2Loader — Custom Astro Content Layer loader
 *
 * Fetches all blog posts from the Cloudflare Worker R2 API at build time.
 * Astro caches the result; use the /revalidate webhook to trigger a new deploy
 * when you add or update posts in R2.
 *
 * Usage in content.config.ts:
 *   import { r2Loader } from './lib/r2Loader';
 *   const blog = defineCollection({ loader: r2Loader() });
 */

import type { Loader, LoaderContext } from 'astro/loaders';
import { marked } from 'marked';

// ── CONFIG ────────────────────────────────────────────────────────────────

const WORKER_URL = import.meta.env.R2_WORKER_URL as string;
const WORKER_SECRET = import.meta.env.R2_WORKER_SECRET as string | undefined;

if (!WORKER_URL) {
  throw new Error(
    '[r2Loader] R2_WORKER_URL is not set.\n' +
    'Add it to your .env file: R2_WORKER_URL=https://capital-r2-api.<your-subdomain>.workers.dev'
  );
}

// ── TYPES ─────────────────────────────────────────────────────────────────

export interface R2Post {
  slug:         string;
  title:        string;
  description:  string;
  pubDate:      string;
  updatedDate?: string;
  heroImage?:   string;
  tags:         string[];
  draft:        boolean;
  body:         string;
  sortDate:     string;
}

// ── FETCH HELPERS ─────────────────────────────────────────────────────────

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (WORKER_SECRET) headers['X-Revalidate-Secret'] = WORKER_SECRET;

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers });
      if (res.ok) return res;
      if (res.status < 500) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      // 5xx — retry
      if (i < retries - 1) await new Promise(r => setTimeout(r, 500 * (i + 1)));
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw new Error(`[r2Loader] Failed to fetch ${url} after ${retries} retries`);
}

async function fetchPostList(): Promise<{ slug: string }[]> {
  const url = `${WORKER_URL}/posts?limit=500`;
  const res = await fetchWithRetry(url);
  const data = await res.json() as { posts: { slug: string }[] };
  return data.posts;
}

async function fetchPost(slug: string): Promise<R2Post> {
  const url = `${WORKER_URL}/posts/${slug}`;
  const res = await fetchWithRetry(url);
  return res.json() as Promise<R2Post>;
}

// ── LOADER ────────────────────────────────────────────────────────────────

export function r2Loader(): Loader {
  return {
    name: 'r2-loader',

    async load({ store, logger, parseData }: LoaderContext) {
      logger.info('[r2Loader] Fetching post list from R2 Worker...');

      // 1. Get all slugs
      let slugList: { slug: string }[];
      try {
        slugList = await fetchPostList();
      } catch (e) {
        logger.error(`[r2Loader] Failed to fetch post list: ${e}`);
        throw e;
      }

      logger.info(`[r2Loader] Found ${slugList.length} posts. Fetching content...`);

      // 2. Fetch each post in parallel (batched to avoid hammering the Worker)
      const BATCH_SIZE = 10;
      const posts: R2Post[] = [];

      for (let i = 0; i < slugList.length; i += BATCH_SIZE) {
        const batch = slugList.slice(i, i + BATCH_SIZE);
        const results = await Promise.allSettled(
          batch.map(p => fetchPost(p.slug))
        );

        for (const result of results) {
          if (result.status === 'fulfilled') {
            posts.push(result.value);
          } else {
            logger.warn(`[r2Loader] Failed to fetch a post: ${result.reason}`);
          }
        }
      }

      logger.info(`[r2Loader] Loaded ${posts.length} posts. Storing in content layer...`);

      // 3. Clear stale entries and store fresh ones
      store.clear();

      for (const post of posts) {
        // Parse the markdown body to HTML so Astro can render it
        const html = await marked.parse(post.body ?? '');

        const entry = await parseData({
          id:   post.slug,
          data: {
            title:       post.title,
            description: post.description,
            pubDate:     new Date(post.pubDate),
            updatedDate: post.updatedDate ? new Date(post.updatedDate) : undefined,
            heroImage:   post.heroImage,
            tags:        post.tags ?? [],
            draft:       post.draft ?? false,
          },
        });

        store.set({
          id:           post.slug,
          data:         entry.data,
          body:         post.body,       // raw markdown (for reading time, search)
          rendered:     { html },         // pre-rendered HTML for <Content />
        });
      }

      logger.info('[r2Loader] ✓ Done. All posts loaded from R2.');
    },
  };
}
