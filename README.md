# Frontend Developer Portfolio

A modern, responsive portfolio website built with Next.js 15, Tailwind CSS, and shadcn/ui components, inspired by [Shourya Dubey's portfolio](https://www.shouryadubey.com/).

## 🚀 Features

- **Modern Design**: Clean, minimal design with excellent typography and spacing
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Built-in dark/light theme toggle with system preference detection
- **Interactive Contact**: Clickable contact cards and contact form modal
- **Email Integration**: Direct email functionality with EmailJS
- **Performance**: Optimized for Core Web Vitals with Next.js 15
- **Accessible**: Built with accessibility best practices
- **SEO Optimized**: Complete meta tags and Open Graph support
- **Type Safe**: Built with TypeScript for better developer experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Theme**: next-themes for dark mode support
- **Icons**: Lucide React
- **Forms**: React Hook Form with international phone input
- **Email**: EmailJS for contact form functionality
- **TypeScript**: Full type safety
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles and CSS variables
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Main portfolio page
├── components/
│   ├── sections/         # Portfolio sections
│   │   ├── hero-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── testimonials-section.tsx
│   │   └── contact-section.tsx
│   ├── ui/              # shadcn/ui components
│   ├── navigation.tsx   # Fixed navigation with smooth scroll
│   └── theme-provider.tsx
└── lib/
    └── utils.ts         # Utility functions
```

## 🎨 Customization

### Personal Information

1. **Hero Section** (`src/components/sections/hero-section.tsx`):

   - Update name, title, and description
   - Modify location and timezone
   - Customize the personal touch paragraph

2. **Experience Section** (`src/components/sections/experience-section.tsx`):

   - Update company names and periods
   - Modify technology stack
   - Add/remove technologies based on your skills

3. **Projects Section** (`src/components/sections/projects-section.tsx`):

   - Replace with your actual projects
   - Update metrics and impact numbers
   - Modify technology tags

4. **Skills Section** (`src/components/sections/skills-section.tsx`):

   - Update side projects
   - Modify skill categories
   - Customize competencies

5. **Testimonials Section** (`src/components/sections/testimonials-section.tsx`):

   - Replace with real testimonials
   - Update author names and roles
   - Change avatar initials

6. **Contact Section** (`src/components/sections/contact-section.tsx`):
   - Update contact methods
   - Modify social links
   - Change location information

### Metadata & SEO

Update `src/app/layout.tsx` with your information:

```tsx
export const metadata: Metadata = {
  title: "Your Name - Frontend Developer",
  description: "Your professional description...",
  // ... update other fields
};
```

### Styling

The portfolio uses Tailwind CSS with shadcn/ui components. You can:

- Modify colors in `src/app/globals.css`
- Update component styling in individual section files
- Customize the overall theme using CSS variables

### Navigation

The navigation component (`src/components/navigation.tsx`) includes:

- Logo/brand (currently "AC")
- Smooth scroll navigation
- Dark mode toggle

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd decent-portfolio
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up EmailJS for contact form (optional)**:

   - Go to [EmailJS.com](https://www.emailjs.com/) and create an account
   - Create a new service and template
   - Create a `.env.local` file in the project root with your EmailJS credentials:
     ```env
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - Template should include variables: `from_name`, `from_email`, `phone`, `subject`, `message`, `preferred_timing`

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This portfolio is ready for deployment on:

- **Vercel** (recommended): Simply connect your GitHub repository
- **Netlify**: Deploy with automatic builds
- **AWS Amplify**: Full-stack deployment option

### Environment Variables (if needed)

Create a `.env.local` file for any environment variables:

```bash
# Add any required environment variables here
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

## 🎯 Performance

The portfolio is optimized for performance:

- Next.js 15 with App Router
- Server-side rendering (SSR)
- Image optimization
- Font optimization with Geist
- Minimal bundle size with tree shaking

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🔧 Customization Tips

1. **Colors**: Modify the color scheme in `globals.css`
2. **Animations**: Add custom animations using Tailwind or CSS
3. **Sections**: Add/remove sections by updating `page.tsx`
4. **Components**: Create new components in the `components` directory
5. **Assets**: Add images to the `public` directory

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the portfolio template.

## 💬 Support

If you have questions or need help customizing the portfolio, feel free to open an issue or reach out.

---

**Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui**
