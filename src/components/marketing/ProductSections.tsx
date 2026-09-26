import { FeatureStatusBadge } from "@/components/ui/Badge";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardPreview } from "./DashboardPreview";
import { SchemaDemo } from "./SchemaDemo";

export function DashboardSection({ tone = "subtle" }: { tone?: "white" | "subtle" }) {
  return (
    <Section tone={tone} aria-labelledby="dashboard-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="dashboard-title"
            eyebrow="Product"
            title="A workspace built for reviewing, not retyping."
            description="Track every document from upload to export, inspect extracted values side by side, and approve anything that needs a second look."
          />
        </Reveal>
        <Reveal className="mt-14" delay={80}>
          <DashboardPreview />
        </Reveal>
        <p className="mt-4 text-center text-xs text-slate-500">Interactive preview with fictional sample documents.</p>
      </Container>
    </Section>
  );
}

export function SchemaSection({ tone = "white" }: { tone?: "white" | "subtle" }) {
  return (
    <Section tone={tone} aria-labelledby="schema-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">Custom schemas</p>
              <FeatureStatusBadge feature="customSchemas" hideAvailable />
            </div>
            <h2 id="schema-title" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.12]">
              You define the data. DocsFlow AI structures the document around it.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Define the fields your application needs and receive predictable structured outputs that are easier to
              integrate into downstream systems.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
              {["Your field names", "Typed values", "Consistent keys across layouts"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={100} className="mt-12">
          <SchemaDemo />
        </Reveal>
      </Container>
    </Section>
  );
}
