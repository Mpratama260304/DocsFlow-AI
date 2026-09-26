import type { Metadata } from "next";
import { CTA } from "@/components/marketing/CTA";
import { DeveloperSection } from "@/components/marketing/DeveloperSection";
import { DocumentTypes } from "@/components/marketing/DocumentTypes";
import { FAQ } from "@/components/marketing/FAQ";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { Hero } from "@/components/marketing/Hero";
import { PricingCards } from "@/components/marketing/Pricing";
import { DashboardSection, SchemaSection } from "@/components/marketing/ProductSections";
import { ProductWorkflow } from "@/components/marketing/ProductWorkflow";
import { SecuritySection } from "@/components/marketing/SecuritySection";
import { UseCases } from "@/components/marketing/UseCases";
import { TextLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { homeFaq } from "@/config/faq";
import { siteConfig } from "@/config/site";
import { faqJsonLd, JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "DocsFlow AI — AI Document Processing & Data Extraction",
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(homeFaq)]} />
      <Hero />
      <FeatureGrid />
      <ProductWorkflow />
      <DocumentTypes />
      <DashboardSection />
      <SchemaSection />
      <DeveloperSection />
      <UseCases />
      <SecuritySection />

      <Section aria-labelledby="pricing-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="pricing-title"
              eyebrow="Pricing"
              title="Start free. Scale when you're ready."
              description="Try DocsFlow AI with your own documents. Paid plans are on the way."
            />
          </Reveal>
          <div className="mt-14">
            <PricingCards />
          </div>
          <div className="mt-10 text-center">
            <TextLink href="/pricing">Compare plans and pricing FAQ</TextLink>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" aria-labelledby="faq-title">
        <Container>
          <FAQ items={homeFaq} />
        </Container>
      </Section>

      <CTA />
    </>
  );
}
