import { createClient } from '@sanity/client'
import { sanityConfig } from './config'

export const sanityClient = createClient(sanityConfig)

// For write operations (like guestbook submissions)
export const sanityWriteClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
