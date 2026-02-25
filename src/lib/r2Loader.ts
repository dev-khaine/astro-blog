import type { Loader, LoaderContext } from 'astro/loaders';
import { marked } from 'marked';

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

async function fetchWithRetry(url: string, secret: string | undefined, retries = 3): Promise<Response> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (secret) headers['X-Revalidate-Secret'] = secret;

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers });
      if (res.ok) return res;
      if (res.status < 500) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      if (i < retries - 1) await new Promise(r => setTimeout(r, 500 * (i + 1)));
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw new Error(`[r2Loader] Failed to fetch ${url} after ${retries} retries`);
}

export function r2Loader(): Loader {
  return {
    name: 'r2-loader',

    async load({ store, logger, parseData }: LoaderContext) {

      // ── Read env vars INSIDE load() so they're available at build time ──
      const WORKER_URL    = import.meta.env.R2_WORKER_URL as string | undefined;
      const WORKER_SECRET = import.meta.env.R2_WORKER_SECRET as string | undefined;

      if (!WORKER_URL) {
        logger.error('[r2Loader] R2_WORKER_URL is not set in environment variables.');
        logger.error('[r2Loader] Add R2_WORKER_URL to your Cloudflare Pages environment variables.');
        throw new Error('[r2Loader] R2_WORKER_URL is not set.');
      }

      logger.info(`[r2Loader] Fetching post list from ${WORKER_URL}/posts ...`);

      // 1. Get post list
      let slugList: { slug: string }[];
      try {
        const res  = await fetchWithRetry(`${WORKER_URL}/posts?limit=500`, WORKER_SECRET);
        const data = await res.json() as { posts: { slug: string }[] };
        slugList   = data.posts;
      } catch (e) {
        logger.error(`[r2Loader] Failed to fetch post list: ${e}`);
        throw e;
      }

      logger.info(`[r2Loader] Found ${slugList.length} posts. Fetching content...`);

      // 2. Fetch each post in batches
      const BATCH_SIZE = 10;
      const posts: R2Post[] = [];

      for (let i = 0; i < slugList.length; i += BATCH_SIZE) {
        const batch   = slugList.slice(i, i + BATCH_SIZE);
        const results = await Promise.allSettled(
          batch.map(async p => {
            const res = await fetchWithRetry(`${WORKER_URL}/posts/${p.slug}`, WORKER_SECRET);
            return res.json() as Promise<R2Post>;
          })
        );
        for (const result of results) {
          if (result.status === 'fulfilled') posts.push(result.value);
          else logger.warn(`[r2Loader] Failed to fetch a post: ${result.reason}`);
        }
      }

      logger.info(`[r2Loader] Loaded ${posts.length} posts. Storing...`);

      // 3. Store in content layer
      store.clear();

      for (const post of posts) {
        const html  = await marked.parse(post.body ?? '');
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
          id:       post.slug,
          data:     entry.data,
          body:     post.body,
          rendered: { html },
        });
      }

      logger.info('[r2Loader] ✓ Done. All posts loaded from R2.');
    },
  };
}
