import { StatusBadge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { features, supportedInputs, type FeatureStatus } from "@/config/features";

interface Chip {
  label: string;
  status?: FeatureStatus;
}

const apiStatus = features.restApi.status;

const steps: { n: string; title: string; icon: IconName; description: string; chips: Chip[] }[] = [
  {
    n: "01",
    title: "Ingest",
    icon: "upload",
    description:
      apiStatus === "available"
        ? "Upload documents through the dashboard or send them programmatically."
        : "Upload documents through the dashboard. Programmatic ingestion is coming soon.",
    chips: supportedInputs.map((label) => ({ label })),
  },
  {
    n: "02",
    title: "Understand",
    icon: "inspect",
    description: "DocsFlow AI analyzes document structure and identifies relevant information.",
    chips: [{ label: "Layout" }, { label: "Context" }],
  },
  {
    n: "03",
    title: "Extract",
    icon: "scan",
    description: "Convert document information into clearly defined structured fields.",
    chips: [{ label: "Fields" }, { label: "Line items" }],
  },
  {
    n: "04",
    title: "Review",
    icon: "eye",
    description: "Inspect extracted values before sending them downstream.",
    chips: [{ label: "Human-in-the-loop" }],
  },
  {
    n: "05",
    title: "Export",
    icon: "download",
    description: "Output data in the format your workflow expects.",
    chips: [
      { label: "JSON", status: features.exportJson.status },
      { label: "CSV", status: features.exportCsv.status },
      { label: "Excel", status: features.exportExcel.status },
      { label: "API", status: features.restApi.status },
      { label: "Webhooks", status: features.webhooks.status },
    ],
  },
];

export function ProductWorkflow({ tone = "subtle" }: { tone?: "white" | "subtle" }) {
  return (
    <Section tone={tone} aria-labelledby="workflow-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="workflow-title"
            eyebrow="How it works"
            title="One workflow. From upload to usable data."
            description="A consistent pipeline that takes a raw document and returns reviewed, structured output."
          />
        </Reveal>

        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-line via-brand-200 to-line lg:block" />
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-6 w-px bg-line lg:hidden" />
          <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-0">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 80} className="relative flex gap-5 lg:flex-col lg:gap-0 lg:px-3">
              <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-brand-600 shadow-card lg:mx-auto">
                <Icon name={step.icon} size={22} />
              </div>
              <div className="flex-1 pb-6 lg:mt-6 lg:rounded-2xl lg:border lg:border-line lg:bg-white lg:p-5 lg:pb-5 lg:shadow-card">
                <p className="font-mono text-xs text-slate-400">{step.n}</p>
                <h3 className="mt-1 text-base font-semibold tracking-tight text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {step.chips.map((chip) => (
                    <li key={chip.label} className="inline-flex items-center gap-1.5">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11.5px] font-medium text-slate-600">{chip.label}</span>
                      {chip.status && chip.status !== "available" ? <StatusBadge status={chip.status} className="-ml-0.5" /> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
