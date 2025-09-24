// Blog queries
export const BLOG_POSTS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset -> {
      _id,
      url
    },
    alt
  },
  tags,
  readingTime,
  publishedAt,
  featured
}`

export const BLOG_POST_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  coverImage {
    asset -> {
      _id,
      url
    },
    alt
  },
  tags,
  readingTime,
  publishedAt
}`

export const FEATURED_BLOG_POSTS_QUERY = `*[_type == "blog" && featured == true] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset -> {
      _id,
      url
    },
    alt
  },
  publishedAt
}`

// Gallery queries
export const GALLERY_IMAGES_QUERY = `*[_type == "galleryImage"] | order(order asc, uploadedAt desc) {
  _id,
  title,
  image {
    asset -> {
      _id,
      url
    },
    alt
  },
  caption,
  category,
  featured
}`

export const GALLERY_IMAGES_BY_CATEGORY_QUERY = `*[_type == "galleryImage" && category == $category] | order(order asc, uploadedAt desc) {
  _id,
  title,
  image {
    asset -> {
      _id,
      url
    },
    alt
  },
  caption,
  category
}`

// Travel queries
export const TRAVEL_POSTS_QUERY = `*[_type == "travelPost"] | order(date desc) {
  _id,
  title,
  slug,
  location,
  country,
  date,
  coverImage {
    asset -> {
      _id,
      url
    },
    alt
  },
  excerpt,
  duration,
  featured
}`

export const TRAVEL_POST_QUERY = `*[_type == "travelPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  location,
  country,
  date,
  body,
  coverImage {
    asset -> {
      _id,
      url
    },
    alt
  },
  images[] {
    asset -> {
      _id,
      url
    },
    alt,
    caption
  },
  highlights,
  duration,
  travelBuddies
}`

// Hobby queries
export const HOBBIES_QUERY = `*[_type == "hobby" && isActive == true] | order(displayOrder asc, title asc) {
  _id,
  title,
  type,
  description,
  currentStatus,
  links,
  media[] {
    asset -> {
      _id,
      url
    },
    alt,
    caption
  },
  stats,
  featured
}`

export const FEATURED_HOBBIES_QUERY = `*[_type == "hobby" && featured == true && isActive == true] | order(displayOrder asc) {
  _id,
  title,
  type,
  description,
  currentStatus,
  stats
}`

// Now page query
export const NOW_PAGE_QUERY = `*[_type == "now"] | order(lastUpdated desc) [0] {
  _id,
  title,
  lastUpdated,
  currentWork,
  currentLearning,
  currentBooks[] {
    title,
    author,
    cover {
      asset -> {
        _id,
        url
      }
    },
    progress,
    thoughts,
    startedDate,
    goodreadsLink
  },
  currentMusic,
  currentTravel,
  personalNote,
  mood
}`

// Guestbook queries
export const GUESTBOOK_ENTRIES_QUERY = `*[_type == "guestbookEntry" && approved == true] | order(submittedAt desc) {
  _id,
  name,
  message,
  website,
  location,
  submittedAt,
  featured
}`

export const FEATURED_GUESTBOOK_ENTRIES_QUERY = `*[_type == "guestbookEntry" && approved == true && featured == true] | order(submittedAt desc) [0...5] {
  _id,
  name,
  message,
  website,
  location,
  submittedAt
}`
