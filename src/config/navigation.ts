import { siteConfig } from "./site";

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  /** When null, the link is rendered as a non-interactive "Soon" item. */
  href: string | null;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { label: "Product", href: "/product" },
  { label: "Solutions", href: "/solutions" },
  { label: "Developers", href: "/developers" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/company" },
];

export const footerNav: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/product" },
      { label: "Document Extraction", href: "/product#extraction" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API", href: "/developers#api" },
      { label: "Documentation", href: siteConfig.links.docs ?? "/developers#documentation", external: !!siteConfig.links.docs },
      { label: "System Status", href: siteConfig.links.status, external: true },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Finance", href: "/solutions#finance" },
      { label: "Operations", href: "/solutions#operations" },
      { label: "Developers", href: "/solutions#developers" },
      { label: "Automation", href: "/solutions#automation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];
