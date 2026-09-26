import type { IconName } from "@/components/ui/Icon";
import { siteConfig } from "./site";

export interface SecurityPractice {
  title: string;
  icon: IconName;
  description: string;
  detail: string;
}

/**
 * Security commitments shown on the homepage and Security page.
 * Keep wording factual. Remove or edit any item that no longer reflects reality.
 */
export const securityPractices: SecurityPractice[] = [
  ...(siteConfig.httpsEnabled
    ? [
        {
          title: "Encrypted connections",
          icon: "lock" as const,
          description: "Use industry-standard HTTPS/TLS for data transmitted between users and the platform.",
          detail:
            "Traffic to docsflowai.net is served over HTTPS. The site sends an HTTP Strict Transport Security (HSTS) header so browsers keep using encrypted connections on return visits.",
        },
      ]
    : []),
  {
    title: "Controlled document access",
    icon: "key",
    description: "Design document access around authenticated users and isolated account permissions.",
    detail:
      "Documents belong to the account that uploaded them. Access is designed around authenticated sessions, and accounts are isolated from one another at the application layer.",
  },
  {
    title: "Data minimization",
    icon: "funnel",
    description: "Only retain information required to deliver the service.",
    detail:
      "We collect the information needed to process documents and operate an account, and avoid collecting data we do not need. Uploaded documents are not used for advertising.",
  },
  {
    title: "Transparent retention",
    icon: "clock",
    description: "Give customers clear information about how uploaded documents are stored and deleted.",
    detail:
      "We document how long uploaded files and extraction results are kept and how they can be deleted. Retention details are described in our Privacy Policy and will be updated as the platform evolves.",
  },
  {
    title: "Infrastructure monitoring",
    icon: "activity",
    description: "Monitor application infrastructure and service health.",
    detail:
      "We monitor application health and errors so we can detect and respond to problems quickly. Logs are kept only as long as they are useful for operating and securing the service.",
  },
];

/** Website-level protections that are implemented in this codebase (see next.config.ts). */
export const websiteProtections: { title: string; description: string }[] = [
  {
    title: "Content Security Policy",
    description: "Restricts scripts, styles, images, and connections to our own origin and blocks plugin content.",
  },
  {
    title: "Clickjacking protection",
    description: "Pages cannot be embedded in frames on other sites (frame-ancestors 'none' and X-Frame-Options: DENY).",
  },
  {
    title: "Strict transport and MIME handling",
    description: "HSTS keeps browsers on HTTPS; X-Content-Type-Options prevents content-type sniffing.",
  },
  {
    title: "Limited browser permissions",
    description: "A Permissions Policy disables camera, microphone, and geolocation access for the site.",
  },
  {
    title: "No third-party trackers",
    description: "The marketing site does not load advertising or analytics scripts, and fonts are self-hosted.",
  },
  {
    title: "Protected contact forms",
    description: "Form submissions are validated server-side, rate limited, and protected against cross-site request forgery.",
  },
];
