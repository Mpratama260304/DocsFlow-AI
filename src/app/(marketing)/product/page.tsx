import type { Metadata } from "next";
import { CTA } from "@/components/marketing/CTA";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";
import { DocumentTypes } from "@/components/marketing/DocumentTypes";
import { PageHero } from "@/components/marketing/PageHero";
import { SchemaSection } from "@/components/marketing/ProductSections";
import { ProductWorkflow } from "@/components/marketing/ProductWorkflow";
import { FeatureStatusBadge, StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { features, type FeatureKey } from "@/config/features";
import { JsonLd, softwareJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AI Document Processing Platform",
  description:
    "DocsFlow AI is an AI document processing platform that extracts, validates, and structures data from invoices, receipts, forms, and other business documents.",
  path: "/product",
});

const capabilities: { title: string; icon: IconName; feature: FeatureKey; description: string; points: string[] }[] = [
  {
    title: "Field extraction",
    icon: "scan",
    feature: "aiExtraction",
    description: "Pull the values that matter out of each document, from header fields to totals and line items.",
    points: ["Header fields such as vendors, IDs, and dates", "Amounts, taxes, and currencies", "Tables and line items"],
  },
  {
    title: "Document understanding",
    icon: "inspect",
    feature: "aiExtraction",
    description: "AI models read documents in context, so a field can be found even when its position changes between layouts.",
    points: ["Works across different vendor layouts", "Handles scanned documents and images", "No coordinate templates to maintain"],
  },
  {
    title: "Review before export",
    icon: "eye",
    feature: "review",
    description: "Inspect extracted values next to their source and approve them before they reach downstream systems.",
    points: ["Side-by-side field inspection", "Flag values that need attention", "Keep a person in the loop where it matters"],
  },
  {
    title: "Structured output",
    icon: "braces",
    feature: "exportJson",
    description: "Every document produces predictable, machine-readable output with consistent keys.",
    points: ["Consistent field names", "Typed values: strings, numbers, dates", "Ready for spreadsheets and databases"],
  },
];

const outputs: { label: string; feature: FeatureKey; note: string }[] = [
  { label: "JSON", feature: "exportJson", note: "Structured output for software and scripts." },
  { label: "CSV", feature: "exportCsv", note: "Flat files for spreadsheets and data tools." },
  { label: "Excel-compatible", feature: "exportExcel", note: "Open results directly in spreadsheet software." },
  { label: "REST API", feature: "restApi", note: "Send documents and fetch results programmatically." },
  { label: "Webhooks", feature: "webhooks", note: "Get notified when processing finishes." },
  { label: "Batch processing", feature: "batchProcessing", note: "Run many documents through one workflow." },
];

export default function ProductPage() {
  return (
    <>
      <JsonLd data={softwareJsonLd()} />
      <PageHero
        eyebrow="Platform"
        title="The document processing platform for reliable, structured data."
        description="Upload documents, let AI extract and structure the information inside them, review the results, and export clean data to the tools your team already uses."
        actions={
          <>
            <ButtonLink href="/signup" size="lg" arrow className="w-full sm:w-auto">
              Start Free
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
              Talk to Us
            </ButtonLink>
          </>
        }
      >
        <div className="mx-auto max-w-[1120px]">
          <DashboardPreview />
          <p className="mt-4 text-center text-xs text-slate-500">Interactive preview with fictional sample documents.</p>
        </div>
      </PageHero>

      <Section id="extraction" aria-labelledby="capabilities-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="capabilities-title"
              eyebrow="Document extraction"
              title="Everything between a raw document and usable data."
              description="DocsFlow AI combines layout analysis, AI-based understanding, and human review into one consistent pipeline."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={(i % 2) * 70}>
                <article className="h-full rounded-2xl border border-line bg-white p-7 shadow-card">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-600/10">
                      <Icon name={cap.icon} size={22} />
                    </span>
                    <FeatureStatusBadge feature={cap.feature} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cap.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {cap.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-slate-700">
                        <Icon name="check" size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-brand-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ProductWorkflow />

      <Section aria-labelledby="outputs-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                id="outputs-title"
                align="left"
                eyebrow="Outputs & integrations"
                title="Get data out in the shape you need."
                description="We publish the current status of every output channel. Anything not yet in production is clearly marked."
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Output channels and availability</caption>
                  <thead className="bg-subtle text-xs text-muted">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-medium">Channel</th>
                      <th scope="col" className="hidden px-5 py-3 font-medium sm:table-cell">Description</th>
                      <th scope="col" className="px-5 py-3 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outputs.map((o) => (
                      <tr key={o.label} className="border-t border-line">
                        <th scope="row" className="px-5 py-4 font-medium text-ink">
                          {o.label}
                          <span className="mt-0.5 block text-xs font-normal text-muted sm:hidden">{o.note}</span>
                        </th>
                        <td className="hidden px-5 py-4 text-muted sm:table-cell">{o.note}</td>
                        <td className="px-5 py-4 text-right">
                          <StatusBadge status={features[o.feature].status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <SchemaSection tone="subtle" />
      <DocumentTypes />
      <CTA />
    </>
  );
}
