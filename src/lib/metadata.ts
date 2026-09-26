import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const ogImageAlt = "DocsFlow AI — Turn business documents into data your systems can actually use.";

// Page-level openGraph objects replace inherited file-based images, so reference them explicitly.
export const ogImages = [{ url: "/opengraph-image", width: 1200, height: 630, alt: ogImageAlt }];
export const twitterImages = [{ url: "/twitter-image", width: 1200, height: 630, alt: ogImageAlt }];

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of applying the "| DocsFlow AI" template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

export function pageMetadata({ title, description, path, absoluteTitle, noIndex }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: twitterImages,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
