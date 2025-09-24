import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhruv Sharma - Frontend Developer",
  description:
    "Frontend Developer with 5 years of experience building performant, user-centric web applications using React, Next.js, and modern technologies.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "UI/UX",
  ],
  authors: [{ name: "Dhruv Sharma" }],
  creator: "Dhruv Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhruvsharma.vercel.app/",
    title: "Dhruv Sharma - Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and performance optimization.",
    siteName: "Dhruv Sharma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Sharma - Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and performance optimization.",
    creator: "@ursdhruvsharma",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="relative min-h-screen">
            <Navigation />
            <SpeedInsights />
            {children}
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
