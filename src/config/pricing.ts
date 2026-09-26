/**
 * Pricing configuration.
 * Only list numeric limits in `limits` when the backend enforces them.
 */
export type PlanStatus = "available" | "coming-soon" | "contact";

export interface PricingPlan {
  id: string;
  name: string;
  status: PlanStatus;
  /** Displayed price, e.g. "$0", "$29". Ignored when status is "coming-soon" or "contact". */
  price?: string;
  /** Billing period suffix, e.g. "/ month". */
  period?: string;
  description: string;
  cta: { label: string; href: string };
  /** Heading above the feature list. */
  featuresHeading: string;
  features: string[];
  /** Enforced usage limits, e.g. "50 pages / month". Leave empty until enforced. */
  limits: string[];
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    status: "available",
    price: "$0",
    period: "/ month",
    description: "For testing DocsFlow AI.",
    cta: { label: "Start Free", href: "/signup" },
    featuresHeading: "Includes",
    features: [
      "Dashboard document upload",
      "PDF, PNG, JPG, and scanned documents",
      "AI field extraction",
      "Review extracted values",
      "JSON, CSV, and Excel-compatible export",
    ],
    limits: [],
    highlighted: true,
  },
  {
    id: "starter",
    name: "Starter",
    status: "coming-soon",
    description: "For individuals and small projects.",
    cta: { label: "Get notified", href: "/contact?topic=product" },
    featuresHeading: "Planned",
    features: ["Everything in Free", "Higher monthly document volume", "Email support"],
    limits: [],
  },
  {
    id: "pro",
    name: "Pro",
    status: "coming-soon",
    description: "For production document workflows.",
    cta: { label: "Get notified", href: "/contact?topic=product" },
    featuresHeading: "Planned",
    features: ["Everything in Starter", "Custom schemas", "API and webhook access", "Batch processing"],
    limits: [],
  },
  {
    id: "business",
    name: "Business",
    status: "contact",
    description: "For higher document volumes, team requirements, and custom workflows.",
    cta: { label: "Contact Sales", href: "/contact?topic=business" },
    featuresHeading: "Tailored to",
    features: ["Higher document volumes", "Team and access requirements", "Custom document workflows", "Direct line to our team"],
    limits: [],
  },
];

export function planPriceLabel(plan: PricingPlan): string {
  if (plan.status === "coming-soon") return "Coming soon";
  if (plan.status === "contact") return "Contact us";
  return plan.price ?? "";
}
