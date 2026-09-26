import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactFormWithTopic } from "@/components/forms/ContactForm";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Talk to DocsFlow AI about product questions, business inquiries, partnerships, or technical questions.",
  path: "/contact",
});

const categories: { title: string; icon: IconName; description: string }[] = [
  { title: "Product questions", icon: "message", description: "How DocsFlow AI works and whether it fits your documents." },
  { title: "Business inquiries", icon: "building", description: "Higher volumes, team requirements, and custom workflows." },
  { title: "Partnerships", icon: "users", description: "Agencies, integrators, and technology partners." },
  { title: "Technical questions", icon: "wrench", description: "Formats, outputs, security, and the developer roadmap." },
];

export default function ContactPage() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-radial absolute inset-0" />
      </div>
      <Container className="pt-16 pb-24 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="animate-slide-in">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">Talk to DocsFlow AI</h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Questions about the product, a document workflow you want to automate, or a partnership idea? Send us a
              message and a member of our team will reply by email.
            </p>

            <ul className="mt-10 space-y-5">
              {categories.map((c) => (
                <li key={c.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-brand-600 shadow-card">
                    <Icon name={c.icon} size={19} />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-ink">{c.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{c.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {siteConfig.contact.general || siteConfig.contact.security ? (
              <dl className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
                {siteConfig.contact.general ? (
                  <div>
                    <dt className="text-muted">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${siteConfig.contact.general}`} className="font-medium text-ink hover:text-brand-600">
                        {siteConfig.contact.general}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {siteConfig.contact.security ? (
                  <div>
                    <dt className="text-muted">Security reports</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${siteConfig.contact.security}`} className="font-medium text-ink hover:text-brand-600">
                        {siteConfig.contact.security}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>

          <div className="animate-fade-in [animation-delay:120ms]">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-elevated sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Send us a message</h2>
              <p className="mt-1 text-sm text-muted">All fields are required unless marked optional.</p>
              <div className="mt-7">
                <Suspense fallback={<ContactForm />}>
                  <ContactFormWithTopic />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
