import { siteConfig } from "@/config/site";

type JsonLdValue = Record<string, unknown>;

/** Serializes JSON-LD safely for inline script injection. */
export function JsonLd({ data }: { data: JsonLdValue | JsonLdValue[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function organizationJsonLd(): JsonLdValue {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description: siteConfig.shortDescription,
    ...(siteConfig.contact.general ? { email: siteConfig.contact.general } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function softwareJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free plan" },
  };
}
