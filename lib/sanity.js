// lib/sanity.js
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Public client (for client-side fetches)
export const client = createClient({
  projectId:   process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:     process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:  '2024-08-07', // your API version
  useCdn:       process.env.NODE_ENV === 'production', // fast but may be cached
})

// Server-side client (uses token for secure fetches, no CDN)
export const serverClient = createClient({
  projectId:   process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:     process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:  '2024-08-07',
  useCdn:       process.env.NODE_ENV === 'production', // fresh data
  token:        process.env.SANITY_API_TOKEN, // add this to .env (write-enabled token if needed)
})

// Image helper
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
