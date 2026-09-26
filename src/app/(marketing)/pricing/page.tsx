import type { Metadata } from "next";
import { CTA } from "@/components/marketing/CTA";
import { FAQList } from "@/components/marketing/FAQ";
import { PageHero } from "@/components/marketing/PageHero";
import { PricingCards } from "@/components/marketing/Pricing";
import { StatusBadge } from "@/components/ui/Badge";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { pricingFaq } from "@/config/faq";
import { features } from "@/config/features";
import { faqJsonLd, JsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description: "Start free with DocsFlow AI. Starter and Pro plans are coming soon, and Business plans are available for higher volumes and custom workflows.",
  path: "/pricing",
});

export default function PricingPage() {
  const capabilityList = Object.values(features);
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaq)} />
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing that grows with your workflows."
        description="Start with the Free plan and your own documents. Paid plans are being finalized alongside upcoming platform capabilities."
      >
        <PricingCards />
        <p className="mt-8 text-center text-xs text-slate-500">
          Prices in USD. Plans and pricing may change as DocsFlow AI evolves; changes will be published here first.
        </p>
      </PageHero>

      <Section tone="subtle" aria-labelledby="availability-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="availability-title"
              eyebrow="Transparency"
              title="What's available today."
              description="A live view of platform capabilities, so you know exactly what you're getting."
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mx-auto mt-12 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {capabilityList.map((f) => (
                <li key={f.label} className="flex items-center justify-between gap-4 bg-white px-5 py-4">
                  <span className="text-sm font-medium text-ink">{f.label}</span>
                  <StatusBadge status={f.status} />
                </li>
              ))}
              {capabilityList.length % 2 === 1 ? <li className="hidden bg-white sm:block" aria-hidden="true" /> : null}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section aria-labelledby="pricing-faq-title">
        <Container className="max-w-3xl">
          <h2 id="pricing-faq-title" className="text-center text-3xl font-semibold tracking-[-0.03em] text-ink">
            Pricing questions
          </h2>
          <div className="mt-10">
            <FAQList items={pricingFaq} />
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
