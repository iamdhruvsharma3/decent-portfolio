import imageUrlBuilder from '@sanity/image-url'

// Get environment variables with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u4kx48im'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.replace(/"/g, '') || 'production'

// Validate configuration
if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

if (!dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
}

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

const builder = imageUrlBuilder(sanityConfig)

export function urlFor(source: any) {
  return builder.image(source)
}
