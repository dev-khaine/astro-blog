import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://perkorbit.co',

  // Cloudflare Pages adapter
  // 'static' output is used here because content is fetched at BUILD time
  // via r2Loader. Switch to 'server' if you need SSR/edge rendering.
  output: 'static',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [
    mdx(),
    sitemap(),
  ],

  // Vite config: expose env vars that start with R2_ to import.meta.env
  vite: {
    define: {},
  },
});
