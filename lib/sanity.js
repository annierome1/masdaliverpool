// lib/sanity.js
// If you're on @sanity/client v6+, prefer:
//   import { createClient } from '@sanity/client'
// For older versions, `sanityClient` default import is fine.
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// ----- SERVER (SSR, ISR, API routes) -----
// Fresh reads; can see drafts if you add a read token + change perspective.
export const serverClient = sanityClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-10',         // any date <= today
  useCdn:     false,                // IMPORTANT: no CDN on server to avoid staleness
  token:      process.env.SANITY_READ_TOKEN || undefined, // optional
  // If you want to include drafts on preview pages:
  // perspective: 'published' // or 'previewDrafts' when you pass a token
})

// ----- BROWSER (client-side only, if you ever fetch directly in the browser) -----
// Fast reads; may be up to ~60s stale. Safe to expose because no token.
export const publicClient = sanityClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-10',
  useCdn:     false,
})

const builder = imageUrlBuilder(serverClient) // server is fine for building URLs
export const urlFor = (source) => builder.image(source)
