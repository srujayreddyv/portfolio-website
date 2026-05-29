import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { seoData } from "@/content/data/seo";
import { themeScript } from "@/lib/theme-utils";
import "./globals.css";

// Direction 2 — Terminal/Infrastructure typography.
// Inter for display + body sans, JetBrains Mono for navigation, tech tags,
// CTAs, command prompts, and small UI. Both modes share the same families.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  authors: [{ name: "Srujay Reddy Vangoor" }],
  creator: "Srujay Reddy Vangoor",
  metadataBase: new URL(seoData.canonicalUrl),
  alternates: {
    canonical: seoData.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seoData.canonicalUrl,
    title: seoData.title,
    description: seoData.description,
    siteName: "Srujay Reddy Vangoor Portfolio",
    images: [
      {
        url: "/my-profile-pic.webp",
        width: 1200,
        height: 630,
        alt: seoData.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoData.title,
    description: seoData.description,
    images: ["/my-profile-pic.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seoData.structuredData.name,
    jobTitle: seoData.structuredData.jobTitle,
    url: seoData.structuredData.url,
    sameAs: seoData.structuredData.sameAs,
    image: `${seoData.canonicalUrl}/my-profile-pic.webp`,
    description: seoData.description,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="dark"
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
