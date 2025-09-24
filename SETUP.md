# Portfolio Website v2 - Setup Guide

This is a comprehensive guide for setting up your new Portfolio Website v2 built with Next.js, TailwindCSS, and Sanity CMS.

## ✨ Features Implemented

### 🔹 Core Features

- ✅ Preserved single-page portfolio at `/` with smooth scroll (Hero, Projects, Skills, Experience, Testimonials, Contact)
- ✅ Multi-page routing for new content sections
- ✅ Sanity CMS integration for dynamic content
- ✅ Vercel Analytics for performance and traffic analytics
- ✅ Custom Reactbits components implementation

### 🔹 Navigation

The navbar now includes:

- ✅ Work → scroll to `/` projects
- ✅ About → scroll to `/` about
- ✅ Contact → scroll to `/` contact
- ✅ Resume → external Google Drive link
- ✅ Life Beyond Code → dropdown menu with `/life` subpages
- ✅ Now → `/now` page
- ✅ Guestbook → `/guestbook` page

### 🔹 Pages & Components

#### Main Portfolio (`/`)

- ✅ Enhanced testimonials section with **Circular Gallery** component
- ✅ All existing sections preserved and functional

#### Life Beyond Code Hub (`/life`)

- ✅ Hero introduction with "Life Beyond Code ✨"
- ✅ Grid of cards linking to subsections

#### Life Subpages

- ✅ `/life/blogs` - Blog listing and individual detail pages
- ✅ `/life/travel` - Travel posts with **Dome Gallery** for immersive photo collections
- ✅ `/life/gallery` - **Masonry layout** with category filters and lightbox support
- ✅ `/life/hobbies` - **Magic Bento Grid** showcasing books, music, photography, and other interests

#### Other Pages

- ✅ `/now` - "What I'm doing now" page inspired by nownownow.com
- ✅ `/guestbook` - Visitor guestbook with **Splash Cursor** easter egg

### 🔹 Custom Reactbits Components

- ✅ **Circular Gallery** - Interactive circular navigation for testimonials
- ✅ **Magic Bento** - Dynamic bento grid layout for hobbies
- ✅ **Dome Gallery** - Immersive photo gallery with lightbox
- ✅ **Masonry Grid** - Pinterest-style image layout with categories
- ✅ **Splash Cursor** - Click animation easter egg

### 🔹 CMS Integration

Comprehensive Sanity schemas for:

- ✅ Blog posts with rich text, tags, and reading time
- ✅ Gallery images with categories and metadata
- ✅ Travel posts with location data and image galleries
- ✅ Hobbies with progress tracking and media
- ✅ "Now" page content with current activities
- ✅ Guestbook entries with moderation

## 🚀 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`bash

# Sanity CMS Configuration

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token_here
\`\`\`

### 2. Sanity CMS Setup

1. **Create a Sanity account** at [sanity.io](https://sanity.io)

2. **Initialize Sanity project:**
   \`\`\`bash
   cd sanity
   npx sanity init
   \`\`\`

3. **Deploy Sanity Studio:**
   \`\`\`bash
   npx sanity deploy
   \`\`\`

4. **Configure environment variables** with your project details

5. **Create content** in Sanity Studio to populate your pages

### 3. Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 to see your portfolio

### 4. Deployment

1. **Deploy to Vercel** (automatically includes Vercel Analytics)
2. **Set up environment variables** in Vercel dashboard
3. **Configure domain** (if needed)

## 🔧 Customization

### Adding New Content

1. **Blogs**: Create blog posts in Sanity Studio
2. **Gallery**: Upload images with categories
3. **Travel**: Add travel posts with photo galleries
4. **Hobbies**: Update hobby information and progress
5. **Now Page**: Keep current status updated
6. **Guestbook**: Moderate entries through Sanity Studio

### Styling

- All components use TailwindCSS
- Theme support via next-themes
- Responsive design implemented
- Custom animations with Framer Motion

### Components

- Reactbits components are fully customizable
- Located in \`src/components/reactbits/\`
- Easy to modify colors, sizes, and animations

## 📁 Project Structure

\`\`\`
src/
├── app/ # App Router pages
│ ├── life/ # Life Beyond Code pages
│ ├── now/ # Now page
│ ├── guestbook/ # Guestbook
│ └── page.tsx # Main portfolio
├── components/
│ ├── reactbits/ # Custom components
│ ├── sections/ # Portfolio sections
│ └── ui/ # shadcn/ui components
└── lib/
└── sanity/ # CMS configuration

sanity/
├── schemas/ # Content schemas
└── sanity.config.ts # Sanity configuration
\`\`\`

## 🌟 Next Steps

1. **Content Creation**: Add your real content through Sanity Studio
2. **Image Optimization**: Upload high-quality images to Sanity
3. **SEO**: Update metadata and implement proper SEO practices
4. **Performance**: Monitor via Vercel Analytics
5. **Customization**: Adjust colors, fonts, and animations to match your brand

## 🆘 Troubleshooting

- **Sanity Connection Issues**: Check environment variables
- **Component Errors**: Ensure all dependencies are installed
- **Build Failures**: Check TypeScript errors and fix imports
- **Image Issues**: Verify Sanity image URLs and alt text

## 📞 Support

For issues or questions:

1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure Sanity project is properly configured
4. Review component props and usage

---

**Congratulations!** 🎉 Your Portfolio Website v2 is ready to showcase both your professional work and life beyond code.
