/**
 * r2Assets.ts — R2 asset URL helpers for the Capital blog
 *
 * Usage anywhere in Astro (.astro, .ts, .tsx):
 *
 *   import { r2Image, r2File, r2Asset } from '../lib/r2Assets';
 *
 *   // Hero image — 1200×630 WebP
 *   r2Image('heroes/fed-dilemma.jpg', { w: 1200, h: 630 })
 *
 *   // Inline article image — 800px wide, auto height
 *   r2Image('inline/sp500-chart.png', { w: 800 })
 *
 *   // Thumbnail — 400×250, sharp crop
 *   r2Image('heroes/btc-etf.jpg', { w: 400, h: 250, fit: 'cover' })
 *
 *   // Open Graph image (no transform — og scrapers need direct URL)
 *   r2Image('heroes/fed-dilemma.jpg', { raw: true })
 *
 *   // Downloadable PDF
 *   r2File('report-q1-2024.pdf')
 *   // → https://capital-r2-api.*.workers.dev/file/report-q1-2024.pdf
 *
 *   // Site asset
 *   r2Asset('og-default.jpg')
 *   // → https://capital-r2-api.*.workers.dev/asset/og-default.jpg
 *
 * HOW TRANSFORMS WORK
 * ───────────────────
 * r2Image() returns a Worker URL (/img/:path?w=800&f=webp…).
 * The Worker verifies the file exists in R2, then returns a 302
 * redirect to the Cloudflare Image Transform URL:
 *   /cdn-cgi/image/width=800,format=webp,quality=85/<r2-public-url>/images/path.jpg
 *
 * Cloudflare's edge resizes the image on first request, then caches
 * it at every PoP worldwide. Subsequent requests are served from cache.
 *
 * PRESET SIZES (use these for consistency)
 * ────────────────────────────────────────
 *   hero      → 1200×630   (article header, og:image)
 *   card      → 800×450    (article card thumbnail)
 *   thumb     → 400×225    (latest list thumbnail)
 *   micro     → 80×80      (author avatar, small inline)
 */

// ── CONFIG ────────────────────────────────────────────────────────────────

/** Worker base URL — set R2_WORKER_URL in your .env / CF Pages env vars */
const WORKER = (import.meta.env.R2_WORKER_URL as string | undefined)?.replace(/\/$/, '') ?? '';

// ── TYPES ─────────────────────────────────────────────────────────────────

export interface ImageOptions {
  /** Output width in px */
  w?: number;
  /** Output height in px */
  h?: number;
  /** Output format. Defaults to 'webp' */
  f?: 'webp' | 'avif' | 'jpeg' | 'png';
  /** Quality 1–100. Defaults to 85 */
  q?: number;
  /** Resize mode. Defaults to 'cover' */
  fit?: 'cover' | 'contain' | 'scale-down' | 'crop' | 'pad';
  /**
   * Skip the transform and return the raw R2 public URL.
   * Use for og:image tags — social crawlers need a direct, stable URL.
   */
  raw?: boolean;
}

/** Named presets for the most common image sizes */
export type ImagePreset = 'hero' | 'card' | 'thumb' | 'micro';

const PRESETS: Record<ImagePreset, ImageOptions> = {
  hero:  { w: 1200, h: 630,  fit: 'cover', f: 'webp', q: 90 },
  card:  { w: 800,  h: 450,  fit: 'cover', f: 'webp', q: 85 },
  thumb: { w: 400,  h: 225,  fit: 'cover', f: 'webp', q: 80 },
  micro: { w: 80,   h: 80,   fit: 'cover', f: 'webp', q: 80 },
};

// ── PUBLIC API ────────────────────────────────────────────────────────────

/**
 * Build an optimized image URL via the Worker's /img/ endpoint.
 *
 * @param path   Path inside the `images/` prefix in R2.
 *               e.g. "heroes/fed-dilemma.jpg" or "inline/chart.png"
 * @param opts   Transform options, or a named preset string.
 */
export function r2Image(path: string, opts: ImageOptions | ImagePreset = {}): string {
  if (!WORKER) {
    console.warn('[r2Assets] R2_WORKER_URL is not set — returning empty image URL');
    return '';
  }

  const options: ImageOptions = typeof opts === 'string' ? PRESETS[opts] : opts;

  // Raw mode → bypass transform, return direct R2 public URL
  // (needed for og:image, RSS <enclosure>, some email clients)
  if (options.raw) {
    const r2PublicUrl = import.meta.env.R2_PUBLIC_URL as string | undefined;
    if (!r2PublicUrl) {
      console.warn('[r2Assets] R2_PUBLIC_URL is not set — needed for raw image URLs');
      return '';
    }
    return `${r2PublicUrl.replace(/\/$/, '')}/images/${path}`;
  }

  const params = new URLSearchParams();
  if (options.w)   params.set('w',   String(options.w));
  if (options.h)   params.set('h',   String(options.h));
  if (options.f)   params.set('f',   options.f);
  if (options.q)   params.set('q',   String(options.q));
  if (options.fit) params.set('fit', options.fit);

  const qs = params.toString();
  return `${WORKER}/img/${path}${qs ? `?${qs}` : ''}`;
}

/**
 * Build a URL for a downloadable file from the `files/` R2 prefix.
 * The Worker serves it with Content-Disposition: attachment.
 *
 * @param path  e.g. "report-q1-2024.pdf"
 */
export function r2File(path: string): string {
  if (!WORKER) return '';
  return `${WORKER}/file/${path}`;
}

/**
 * Build a URL for a site-level asset from the `assets/` R2 prefix.
 * Served with long cache headers (1 year, immutable).
 *
 * @param path  e.g. "og-default.jpg" or "logo.svg"
 */
export function r2Asset(path: string): string {
  if (!WORKER) return '';
  return `${WORKER}/asset/${path}`;
}

/**
 * Generate a complete <img> srcset for responsive images.
 * Returns a srcset string ready to drop into the srcset attribute.
 *
 * @example
 * <img
 *   src={r2Image('heroes/post.jpg', 'card')}
 *   srcset={r2Srcset('heroes/post.jpg', [400, 800, 1200])}
 *   sizes="(max-width: 640px) 100vw, 800px"
 * />
 */
export function r2Srcset(
  path: string,
  widths: number[],
  opts: Omit<ImageOptions, 'w'> = {}
): string {
  return widths
    .map(w => `${r2Image(path, { ...opts, w })} ${w}w`)
    .join(', ');
}

/**
 * Convenience: build all props needed for an <img> tag in one call.
 * Spreads directly onto an <img> element.
 *
 * @example
 * <img {...r2ImgProps('heroes/post.jpg', 'card', { alt: 'Chart', loading: 'lazy' })} />
 */
export function r2ImgProps(
  path: string,
  preset: ImagePreset,
  extra: Record<string, string | number | boolean | undefined> = {}
): Record<string, string | number | boolean | undefined> {
  const opts    = PRESETS[preset];
  const widths  = preset === 'hero'  ? [600, 900, 1200] :
                  preset === 'card'  ? [400, 600, 800]  :
                  preset === 'thumb' ? [200, 300, 400]  : [80];

  return {
    src:    r2Image(path, preset),
    srcset: r2Srcset(path, widths, opts),
    sizes:  preset === 'hero'  ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px' :
            preset === 'card'  ? '(max-width: 640px) 100vw, (max-width: 900px) 50vw, 800px'   :
            preset === 'thumb' ? '(max-width: 640px) 0px, 400px'                               : '80px',
    width:  opts.w,
    height: opts.h,
    decoding: 'async',
    ...extra,
  };
}
