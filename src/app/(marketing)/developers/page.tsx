import type { Metadata } from "next";
import { CTA } from "@/components/marketing/CTA";
import { developerFeatures } from "@/components/marketing/DeveloperSection";
import { PageHero } from "@/components/marketing/PageHero";
import { SchemaSection } from "@/components/marketing/ProductSections";
import { StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { features, isAvailable } from "@/config/features";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Document Extraction API",
  description:
    "DocsFlow AI's developer platform for document extraction: structured JSON, custom schemas, REST API, and webhooks. See what is available today and what is on the roadmap.",
  path: "/developers",
});

const requestCode = `# Planned API design — preview, subject to change.
curl https://api.docsflowai.net/v1/extractions \\
  -H "Authorization: Bearer $DOCSFLOW_API_KEY" \\
  -F file=@invoice_0428.pdf \\
  -F schema=@invoice_schema.json`;

const responseCode = `{
  "id": "ext_7f3a9c",
  "status": "completed",
  "document": { "filename": "invoice_0428.pdf", "pages": 1 },
  "data": {
    "vendor_name": "Northstar Technologies Ltd.",
    "invoice_number": "INV-0428",
    "invoice_date": "2026-09-18",
    "currency": "USD",
    "total": 4820
  }
}`;

const webhookCode = `{
  "event": "extraction.completed",
  "extraction_id": "ext_7f3a9c",
  "created_at": "2026-09-26T09:41:12Z"
}`;

const endpoints = [
  { method: "POST", path: "/v1/extractions", description: "Submit a document for extraction", feature: "restApi" as const },
  { method: "GET", path: "/v1/extractions/{id}", description: "Retrieve status and structured results", feature: "restApi" as const },
  { method: "POST", path: "/v1/schemas", description: "Create a reusable custom schema", feature: "customSchemas" as const },
  { method: "EVENT", path: "extraction.completed", description: "Webhook sent when results are ready", feature: "webhooks" as const },
];

const docTopics = ["Quickstart", "Authentication", "Schemas", "Extractions", "Webhooks", "Errors & limits"];

export default function DevelopersPage() {
  const apiLive = isAvailable("restApi");
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="Document extraction infrastructure for developers."
        description={
          <p>
            Send a document, describe the data you need, and get predictable JSON back.{" "}
            {apiLive
              ? "The DocsFlow AI API is available today."
              : "The DocsFlow AI developer platform is in active development. Here is what we are building and exactly where it stands."}
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=technical" size="lg" arrow className="w-full sm:w-auto">
              {apiLive ? "Get API access" : "Get notified about the API"}
            </ButtonLink>
            <ButtonLink href="#api" variant="secondary" size="lg" className="w-full sm:w-auto">
              View the API design
            </ButtonLink>
          </>
        }
      >
        <ul className="mx-auto grid max-w-4xl gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Developer capability status">
          {developerFeatures.map((f) => (
            <li key={f.title} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-card">
              <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                <Icon name={f.icon} size={17} className="text-brand-600" />
                {f.title}
              </span>
              <StatusBadge status={features[f.feature].status} />
            </li>
          ))}
        </ul>
      </PageHero>

      <Section tone="subtle" aria-labelledby="capabilities-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="capabilities-title"
              eyebrow="Capabilities"
              title="Built for software, not just dashboards."
              description="The developer platform is designed around predictable outputs and simple integration, so document processing becomes one more reliable service in your stack."
            />
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {developerFeatures.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 3) * 60}>
                <article className="h-full rounded-2xl border border-line bg-white p-6 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-600/10">
                      <Icon name={f.icon} size={20} />
                    </span>
                    <StatusBadge status={features[f.feature].status} />
                  </div>
                  <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="api" aria-labelledby="api-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">API design</p>
                <StatusBadge status={features.restApi.status} />
              </div>
              <h2 id="api-title" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
                A small, predictable API surface.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {apiLive
                  ? "Submit a document, optionally attach a schema, and receive structured JSON."
                  : "This is the API we are designing. Endpoints, field names, and payloads are a preview and may change before release. None of these endpoints are live yet."}
              </p>
              <div className="mt-8 overflow-hidden rounded-xl border border-line">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Planned API endpoints</caption>
                  <tbody>
                    {endpoints.map((e, i) => (
                      <tr key={e.path} className={i > 0 ? "border-t border-line" : undefined}>
                        <td className="py-3 pr-2 pl-4 align-top">
                          <span className="inline-block min-w-12 rounded bg-slate-100 px-1.5 py-0.5 text-center font-mono text-[10.5px] font-semibold text-slate-600">
                            {e.method}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <code className="font-mono text-[12.5px] text-ink">{e.path}</code>
                          <p className="mt-0.5 text-xs text-muted">{e.description}</p>
                        </td>
                        <td className="hidden py-3 pr-4 text-right align-top sm:table-cell">
                          <StatusBadge status={features[e.feature].status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delay={100} className="space-y-4">
              <CodeBlock code={requestCode} lang="bash" filename="Request" headerRight={<StatusBadge status={features.restApi.status} dark />} />
              <CodeBlock code={responseCode} lang="json" filename="Response · 200" />
              <CodeBlock
                code={webhookCode}
                lang="json"
                filename="Webhook event"
                headerRight={<StatusBadge status={features.webhooks.status} dark />}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="documentation" tone="subtle" aria-labelledby="docs-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">Documentation</p>
                <StatusBadge status={features.documentation.status} />
              </div>
              <h2 id="docs-title" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
                Clear guides, published with the API.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {siteConfig.links.docs
                  ? "Our developer documentation covers authentication, schemas, extraction, webhooks, and error handling."
                  : "Developer documentation will be published alongside the public API. It will cover authentication, schemas, extraction, webhooks, error handling, and usage limits, with copy-paste examples."}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {siteConfig.links.docs ? (
                  <ButtonLink href={siteConfig.links.docs} arrow>
                    Read the docs
                  </ButtonLink>
                ) : (
                  <ButtonLink href="/contact?topic=technical" arrow>
                    Request early developer access
                  </ButtonLink>
                )}
              </div>
              <div className="mt-10 rounded-xl border border-line bg-white p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Icon name="activity" size={17} className="text-brand-600" /> System status
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {siteConfig.links.status ? (
                    <>
                      Live service status is available at{" "}
                      <a className="font-medium text-brand-600 hover:text-brand-700" href={siteConfig.links.status} target="_blank" rel="noopener noreferrer">
                        our status page
                      </a>
                      .
                    </>
                  ) : (
                    "A public status page will launch together with the API."
                  )}
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid gap-3 sm:grid-cols-2" aria-label="Planned documentation topics">
                {docTopics.map((topic, i) => (
                  <li key={topic} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-subtle font-mono text-xs text-slate-500 ring-1 ring-line">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-slate-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <SchemaSection />
      <CTA title="Building something with documents?" description="Tell us about your use case. Early feedback directly shapes the DocsFlow AI developer platform." />
    </>
  );
}
