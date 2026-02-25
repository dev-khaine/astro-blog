import { defineCollection, z } from "astro:content";
import { r2Loader } from "./lib/r2Loader";

const blog = defineCollection({
  // r2Loader replaces the local `glob` loader.
  // At build time it fetches all .md files from your R2 bucket
  // via the Cloudflare Worker API and injects them into Astro's
  // content layer exactly as if they were local files.
  loader: r2Loader(),

  schema: z.object({
    title:        z.string(),
    title_ar:     z.string().optional(),
    description:  z.string(),
    description_ar: z.string().optional(),
    pubDate:     z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage:   z.string().optional(),
    tags:        z.array(z.string()).optional().default([]),
    draft:       z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
