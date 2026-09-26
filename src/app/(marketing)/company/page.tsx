import type { Metadata } from "next";
import { CTA } from "@/components/marketing/CTA";
import { PageHero } from "@/components/marketing/PageHero";
import { StatusBadge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { features } from "@/config/features";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About DocsFlow AI",
  description:
    "DocsFlow AI is an AI document intelligence company making information trapped inside business documents easier to structure, automate, and integrate into modern software.",
  path: "/company",
  absoluteTitle: true,
});

const pillars: { title: string; icon: IconName; body: string }[] = [
  { title: "Our Mission", icon: "target", body: "Make document-driven workflows easier to automate." },
  { title: "What We Build", icon: "cpu", body: "AI-powered infrastructure that converts business documents into structured information." },
  {
    title: "Who We Build For",
    icon: "users",
    body: "Developers, operations teams, startups, SMBs, and companies building document-intensive workflows.",
  },
];

const principles: { title: string; icon: IconName; body: string }[] = [
  { title: "Simplicity", icon: "align", body: "Products should reduce complexity rather than create more of it." },
  { title: "Reliability", icon: "shieldCheck", body: "Business automation depends on predictable outputs." },
  { title: "Transparency", icon: "eye", body: "AI systems should make it clear what they processed and what they returned." },
  { title: "Security", icon: "lock", body: "Business documents should be handled responsibly." },
  { title: "Developer Experience", icon: "zap", body: "Integrating document intelligence should not require months of infrastructure work." },
];

export default function CompanyPage() {
  const available = Object.values(features).filter((f) => f.status === "available");
  const upcoming = Object.values(features).filter((f) => f.status !== "available");

  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Building a better interface between documents and software."
        description={
          <p>
            DocsFlow AI is an AI document intelligence company focused on making information trapped inside business
            documents easier to structure, automate, and integrate into modern software.
          </p>
        }
      />

      <Section className="pt-4 sm:pt-6 lg:pt-8" aria-label="Why DocsFlow AI exists">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-slate-700 sm:text-xl sm:leading-relaxed">
              <p>
                Businesses still exchange enormous amounts of information through PDFs, scanned files, forms, invoices,
                receipts, and other documents.
              </p>
              <p className="text-ink">
                DocsFlow AI exists to make that information easier for software to understand and use.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 grid gap-4 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <article className="h-full rounded-2xl border border-line bg-white p-7 shadow-card">
                  <Icon name={p.icon} size={22} className="text-brand-600" />
                  <h2 className="mt-5 text-lg font-semibold tracking-tight text-ink">{p.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="subtle" aria-labelledby="principles-title">
        <Container>
          <Reveal>
            <SectionHeading id="principles-title" eyebrow="Our principles" title="How we make decisions." />
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Icon name={p.icon} size={19} />
                  </span>
                  <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="status-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                id="status-title"
                align="left"
                eyebrow="Where we are"
                title="An early-stage company, building in the open."
                description="We would rather be precise than impressive. Here is what DocsFlow AI offers today and what we are working on next."
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="grid gap-4 sm:grid-cols-2">
                <StatusColumn title="Available today" items={available} />
                <StatusColumn title="On the roadmap" items={upcoming} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {siteConfig.contact.general || siteConfig.contact.security ? (
        <Section tone="subtle" aria-labelledby="reach-title" className="py-16 sm:py-20 lg:py-20">
          <Container>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <h2 id="reach-title" className="text-2xl font-semibold tracking-tight text-ink">
                Get in touch
              </h2>
              <dl className="grid gap-6 sm:grid-cols-2 lg:gap-12">
                {siteConfig.contact.general ? (
                  <div>
                    <dt className="text-sm text-muted">General & business</dt>
                    <dd className="mt-1">
                      <a className="font-medium text-ink hover:text-brand-600" href={`mailto:${siteConfig.contact.general}`}>
                        {siteConfig.contact.general}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {siteConfig.contact.security ? (
                  <div>
                    <dt className="text-sm text-muted">Security reports</dt>
                    <dd className="mt-1">
                      <a className="font-medium text-ink hover:text-brand-600" href={`mailto:${siteConfig.contact.security}`}>
                        {siteConfig.contact.security}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </Container>
        </Section>
      ) : null}

      <CTA />
    </>
  );
}

function StatusColumn({ title, items }: { title: string; items: { label: string; status: "available" | "beta" | "coming-soon" }[] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((f) => (
          <li key={f.label} className="flex items-center justify-between gap-3 text-sm text-slate-700">
            {f.label}
            <StatusBadge status={f.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
