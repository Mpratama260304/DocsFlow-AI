import { TextLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { securityPractices } from "@/config/security";

export function SecuritySection() {
  return (
    <Section tone="subtle" aria-labelledby="security-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <div className="flex size-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card ring-1 ring-line">
              <Icon name="shieldCheck" size={24} />
            </div>
            <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">Security</p>
            <h2 id="security-title" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.12]">
              Your documents deserve responsible infrastructure.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Business documents contain sensitive information. We design DocsFlow AI to handle them carefully, and we
              are transparent about what is in place today.
            </p>
            <div className="mt-8">
              <TextLink href="/security">Learn about DocsFlow AI security</TextLink>
            </div>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {securityPractices.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 2) * 60}
                className={i === securityPractices.length - 1 && securityPractices.length % 2 === 1 ? "sm:col-span-2" : undefined}
              >
                <div className="h-full rounded-2xl border border-line bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 sm:block">
                    <Icon name={item.icon} size={20} className="text-brand-600" />
                    <h3 className="text-[15px] font-semibold tracking-tight text-ink sm:mt-4">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
