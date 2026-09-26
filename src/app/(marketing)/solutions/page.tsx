import type { Metadata } from "next";
import { CTA } from "@/components/marketing/CTA";
import { PageHero } from "@/components/marketing/PageHero";
import { UseCases } from "@/components/marketing/UseCases";
import { StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { features, type FeatureStatus } from "@/config/features";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Document Automation Solutions",
  description:
    "How finance, operations, software, and automation teams use DocsFlow AI to turn invoices, receipts, purchase orders, and other documents into structured data.",
  path: "/solutions",
});

interface Outcome {
  text: string;
  status?: FeatureStatus;
}

interface Solution {
  id: string;
  eyebrow: string;
  icon: IconName;
  title: string;
  description: string;
  documents: string[];
  outcomes: Outcome[];
  fields: [string, string][];
  destination: { label: string; status?: FeatureStatus };
}

const solutions: Solution[] = [
  {
    id: "finance",
    eyebrow: "Finance",
    icon: "wallet",
    title: "Less manual entry for finance and accounting teams.",
    description:
      "Invoices, receipts, and statements arrive in every format imaginable. DocsFlow AI turns them into consistent records your team can review and move into accounting workflows.",
    documents: ["Invoices", "Receipts", "Bank statements"],
    outcomes: [
      { text: "Consistent vendor, date, and amount fields" },
      { text: "Review queue for values that need a second look" },
      { text: "CSV and Excel-compatible exports for accounting tools" },
    ],
    fields: [
      ["vendor", "Northstar Technologies Ltd."],
      ["invoice_date", "2026-09-18"],
      ["tax", "420.00"],
      ["total", "4820.00"],
    ],
    destination: { label: "Accounting export" },
  },
  {
    id: "operations",
    eyebrow: "Operations",
    icon: "package",
    title: "Structured data from operational paperwork.",
    description:
      "Purchase orders, shipping documents, and supplier forms carry the information operations teams depend on. Extract it once, consistently, instead of re-typing it into several systems.",
    documents: ["Purchase orders", "Shipping documents", "Supplier forms"],
    outcomes: [
      { text: "PO numbers, suppliers, and delivery dates as fields" },
      { text: "Line items captured as structured rows" },
      { text: "One review step before data moves on" },
    ],
    fields: [
      ["po_number", "PO-291"],
      ["supplier", "Kestrel Components"],
      ["delivery_date", "2026-10-06"],
      ["line_items", "2 rows"],
    ],
    destination: { label: "Operations sheet" },
  },
  {
    id: "developers",
    eyebrow: "Developers",
    icon: "code",
    title: "Document intelligence inside your product.",
    description:
      "Add document processing to your application without building and maintaining an extraction pipeline. Define the fields your product needs and receive predictable JSON.",
    documents: ["User uploads", "Any supported document"],
    outcomes: [
      { text: "Predictable JSON with consistent keys" },
      { text: "Custom schemas matched to your data model", status: features.customSchemas.status },
      { text: "REST API and webhooks for integration", status: features.restApi.status },
    ],
    fields: [
      ["document_type", "invoice"],
      ["invoice_number", "INV-0428"],
      ["currency", "USD"],
      ["total", "4820"],
    ],
    destination: { label: "Your application via API", status: features.restApi.status },
  },
  {
    id: "automation",
    eyebrow: "Automation",
    icon: "merge",
    title: "A reliable document step for automation builders.",
    description:
      "Automation agencies and internal ops teams can use DocsFlow AI as the document-understanding step in larger workflows, then pass structured results to the next tool in the chain.",
    documents: ["Client documents", "Mixed document types"],
    outcomes: [
      { text: "Consistent output across clients and layouts" },
      { text: "Reusable extraction schemas per workflow", status: features.customSchemas.status },
      { text: "Event-driven handoff with webhooks", status: features.webhooks.status },
    ],
    fields: [
      ["merchant", "Paperline Office Supply"],
      ["purchase_date", "2026-09-24"],
      ["total", "93.31"],
      ["status", "reviewed"],
    ],
    destination: { label: "Workflow trigger via webhook", status: features.webhooks.status },
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Document automation for teams that run on paperwork."
        description="Finance, operations, software, and automation teams all share the same problem: valuable information locked inside documents. DocsFlow AI gives each of them a consistent way to get it out."
        actions={
          <>
            <ButtonLink href="/signup" size="lg" arrow className="w-full sm:w-auto">
              Start Free
            </ButtonLink>
            <ButtonLink href="/contact?topic=business" variant="secondary" size="lg" className="w-full sm:w-auto">
              Talk to Us
            </ButtonLink>
          </>
        }
      >
        <nav aria-label="Solutions" className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
          {solutions.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-card transition-colors hover:border-line-strong hover:text-ink"
            >
              <Icon name={s.icon} size={16} className="text-brand-600" />
              {s.eyebrow}
            </a>
          ))}
        </nav>
      </PageHero>

      {solutions.map((s, i) => (
        <Section key={s.id} id={s.id} tone={i % 2 === 0 ? "subtle" : "white"} aria-labelledby={`${s.id}-title`}>
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">
                  <Icon name={s.icon} size={16} /> {s.eyebrow}
                </p>
                <h2 id={`${s.id}-title`} className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{s.description}</p>
                <ul className="mt-8 space-y-3">
                  {s.outcomes.map((o) => (
                    <li key={o.text} className="flex items-start gap-3 text-sm text-slate-700">
                      <Icon name="check" size={16} strokeWidth={2} className="mt-0.5 text-brand-600" />
                      <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                        <span>{o.text}</span>
                        {o.status && o.status !== "available" ? <StatusBadge status={o.status} /> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100}>
                <SolutionFlow solution={s} />
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}

      <UseCases />
      <CTA title="Bring structure to your document workflows." />
    </>
  );
}

function SolutionFlow({ solution }: { solution: Solution }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-elevated sm:p-6" aria-label={`Example ${solution.eyebrow.toLowerCase()} workflow`}>
      <p className="text-xs font-medium text-muted">Documents</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {solution.documents.map((d) => (
          <span key={d} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-subtle px-2.5 py-1.5 text-xs font-medium text-slate-700">
            <Icon name="fileText" size={14} className="text-slate-400" />
            {d}
          </span>
        ))}
      </div>

      <Connector />

      <p className="text-xs font-medium text-muted">Extracted fields</p>
      <div className="mt-3 overflow-hidden rounded-xl bg-ink">
        {solution.fields.map(([k, v], i) => (
          <div key={k} className={cn("flex items-start justify-between gap-4 px-4 py-2.5 font-mono text-[12px]", i > 0 && "border-t border-white/5")}>
            <span className="shrink-0 text-[#93C5FD]">{k}</span>
            <span className="min-w-0 text-right text-[#A5F3FC] [overflow-wrap:anywhere]">{v}</span>
          </div>
        ))}
      </div>

      <Connector />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-line-strong px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <Icon name="arrowUpRight" size={16} className="text-brand-600" />
          {solution.destination.label}
        </span>
        {solution.destination.status && solution.destination.status !== "available" ? (
          <StatusBadge status={solution.destination.status} />
        ) : null}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center py-3" aria-hidden="true">
      <svg width="12" height="28" viewBox="0 0 12 28" fill="none">
        <path d="M6 0v22" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" className="animate-flow" />
        <path d="m2 20 4 5 4-5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
