/**
 * Central site configuration.
 * Only publish contact channels, social profiles, and links that actually exist.
 * Set any value to `null` to hide it everywhere on the site.
 */
export const siteConfig = {
  name: "DocsFlow AI",
  domain: "docsflowai.net",
  url: "https://docsflowai.net",
  tagline: "Documents in. Reliable data out.",
  description:
    "Turn PDFs, scans, invoices, receipts, and business documents into structured data with DocsFlow AI. AI-powered document processing built for modern workflows.",
  shortDescription: "AI-powered document intelligence for modern software and business workflows.",
  copyrightYear: 2026,

  contact: {
    /** General inbox shown on the contact page and footer. */
    general: "hello@docsflowai.net" as string | null,
    /** Monitored inbox for vulnerability reports. */
    security: "security@docsflowai.net" as string | null,
  },

  /** Add real profile URLs to display them in the footer. */
  social: {
    linkedin: null as string | null,
    github: null as string | null,
    x: null as string | null,
  },

  links: {
    /** Public status page URL, e.g. "https://status.docsflowai.net". */
    status: null as string | null,
    /** Public developer documentation URL. */
    docs: null as string | null,
  },

  /** Set to true only once the production domain serves traffic over HTTPS/TLS. */
  httpsEnabled: true,

  /** Legal entity details. Leave null until officially registered and confirmed. */
  legal: {
    entityName: null as string | null,
    address: null as string | null,
    governingLaw: null as string | null,
    lastUpdated: "September 26, 2026",
  },
} as const;

export type SiteConfig = typeof siteConfig;
