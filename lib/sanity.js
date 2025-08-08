// lib/sanity.js
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId:   process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:     process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:  '2025-06-10',            // use today's date or your preferred version
  useCdn:       process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)