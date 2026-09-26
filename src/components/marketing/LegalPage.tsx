import { Container } from "@/components/ui/Layout";
import { siteConfig } from "@/config/site";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <div className="relative -mt-16 pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80">
        <div className="bg-grid mask-fade-radial absolute inset-0" />
      </div>
      <Container className="pt-16 pb-24 sm:pt-20">
        <header className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">Legal</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted">Last updated: {siteConfig.legal.lastUpdated}</p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-slate-500">On this page</p>
              <ol className="mt-4 space-y-2.5 border-l border-line">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-ink hover:text-ink">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-3xl text-[15px] leading-relaxed text-slate-700 [&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline-offset-2 hover:[&_a]:underline [&_li]:pl-1 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul+p]:mt-4">
            <div className="rounded-xl border border-line bg-subtle px-5 py-4 text-sm leading-relaxed text-slate-600">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="mt-12 first-of-type:mt-10">
                <h2 className="text-xl font-semibold tracking-tight text-ink">
                  <span className="mr-2 font-mono text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-4">{s.content}</div>
              </section>
            ))}
          </article>
        </div>
      </Container>
    </div>
  );
}

export function ContactLine() {
  return siteConfig.contact.general ? (
    <p>
      Questions about this document can be sent to <a href={`mailto:${siteConfig.contact.general}`}>{siteConfig.contact.general}</a>{" "}
      or through our <a href="/contact">contact page</a>.
    </p>
  ) : (
    <p>
      Questions about this document can be sent through our <a href="/contact">contact page</a>.
    </p>
  );
}

export function OperatorLine() {
  const { entityName, address } = siteConfig.legal;
  return (
    <p>
      {entityName ? (
        <>
          The DocsFlow AI website and service are operated by {entityName}
          {address ? `, ${address}` : ""} (&ldquo;DocsFlow AI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
        </>
      ) : (
        <>
          &ldquo;DocsFlow AI&rdquo;, &ldquo;we&rdquo;, and &ldquo;us&rdquo; refer to the operator of the website at {siteConfig.domain} and the
          DocsFlow AI document processing service.
        </>
      )}
    </p>
  );
}
