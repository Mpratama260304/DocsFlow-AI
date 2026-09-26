import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteConfig } from "@/config/site";
import { ogImages, twitterImages } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "DocsFlow AI — AI Document Processing & Data Extraction",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "intelligent document processing",
    "AI document processing",
    "document data extraction",
    "invoice extraction",
    "receipt OCR",
    "PDF to JSON",
    "document automation",
  ],
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: "/",
    title: "DocsFlow AI — AI Document Processing & Data Extraction",
    description: siteConfig.description,
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "DocsFlow AI — AI Document Processing & Data Extraction",
    description: siteConfig.description,
    images: twitterImages,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
