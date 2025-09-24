import imageUrlBuilder from '@sanity/image-url'

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

const builder = imageUrlBuilder(sanityConfig)

export function urlFor(source: any) {
  return builder.image(source)
}
