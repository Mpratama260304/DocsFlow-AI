import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { securityPractices, websiteProtections } from "@/config/security";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Security at DocsFlow AI",
  description:
    "How DocsFlow AI approaches the security of business documents: encrypted connections, controlled access, data minimization, transparent retention, and responsible disclosure.",
  path: "/security",
  absoluteTitle: true,
});

const lifecycle: { step: string; icon: IconName; title: string; description: string }[] = [
  {
    step: "01",
    icon: "upload",
    title: "Upload",
    description: siteConfig.httpsEnabled
      ? "Documents are sent from your browser over an encrypted HTTPS connection."
      : "Documents are uploaded by authenticated users through the dashboard.",
  },
  {
    step: "02",
    icon: "cpu",
    title: "Processing",
    description: "Files are processed only to extract the information you asked for and return structured results to your account.",
  },
  {
    step: "03",
    icon: "database",
    title: "Storage",
    description: "Uploaded files and results are associated with your account and are not shared with other customers.",
  },
  {
    step: "04",
    icon: "trash",
    title: "Deletion",
    description: "Retention and deletion practices are documented in our Privacy Policy and will be kept up to date.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Responsible handling for sensitive business documents."
        description="Invoices, statements, and contracts contain information that matters. This page describes how we approach security at DocsFlow AI today, in plain language and without overstating where we are."
      />

      <Section tone="subtle" aria-labelledby="practices-title" className="pt-16 sm:pt-20">
        <Container>
          <Reveal>
            <SectionHeading
              id="practices-title"
              eyebrow="Our approach"
              title="Security principles we build around."
              description="These principles guide how the DocsFlow AI platform is designed and operated."
            />
          </Reveal>
          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {securityPractices.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 60}>
                <article className="flex h-full gap-5 rounded-2xl border border-line bg-white p-6 sm:p-7">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-600/10">
                    <Icon name={p.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.description}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{p.detail}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="lifecycle-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="lifecycle-title"
              eyebrow="Data lifecycle"
              title="What happens to a document you upload."
            />
          </Reveal>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lifecycle.map((item, i) => (
              <Reveal as="li" key={item.step} delay={i * 70}>
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <Icon name={item.icon} size={19} />
                    </span>
                    <span className="font-mono text-xs text-slate-400">{item.step}</span>
                  </div>
                  <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="subtle" aria-labelledby="website-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                id="website-title"
                align="left"
                eyebrow="In place today"
                title="Protections on docsflowai.net."
                description="These controls are configured on this website right now. You can verify most of them by inspecting the response headers of any page."
              />
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {websiteProtections.map((p, i) => (
                <Reveal as="li" key={p.title} delay={(i % 2) * 50}>
                  <div className="h-full rounded-xl border border-line bg-white p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Icon name="check" size={16} strokeWidth={2} className="text-emerald-600" />
                      {p.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="compliance-title">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-2xl border border-line bg-white p-7 sm:p-8">
                <Icon name="info" size={22} className="text-brand-600" />
                <h2 id="compliance-title" className="mt-5 text-xl font-semibold tracking-tight text-ink">
                  Certifications and compliance
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  DocsFlow AI is an early-stage company and does not currently hold third-party security certifications
                  or attestations such as SOC 2 or ISO 27001. We will not display certification badges unless we have
                  actually obtained them. If your organization has specific compliance requirements, contact us and we
                  will give you an accurate picture of where we stand.
                </p>
              </article>
            </Reveal>
            <Reveal delay={80}>
              <article id="disclosure" className="h-full rounded-2xl bg-ink p-7 text-white sm:p-8">
                <Icon name="bug" size={22} className="text-accent-400" />
                <h2 className="mt-5 text-xl font-semibold tracking-tight">Responsible disclosure</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  If you believe you have found a security vulnerability in DocsFlow AI, please report it privately so we
                  can investigate and fix it. Please include steps to reproduce, avoid accessing data that is not yours,
                  and give us reasonable time to respond before any public disclosure.
                </p>
                {siteConfig.contact.security ? (
                  <a
                    href={`mailto:${siteConfig.contact.security}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                  >
                    <Icon name="mail" size={16} /> {siteConfig.contact.security}
                  </a>
                ) : (
                  <div className="mt-6">
                    <ButtonLink href="/contact?topic=technical" variant="dark-outline">
                      Report via contact form
                    </ButtonLink>
                  </div>
                )}
              </article>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
