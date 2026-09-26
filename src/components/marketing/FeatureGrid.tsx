import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { isAvailable } from "@/config/features";

const values = [
  {
    title: "Extract",
    description: "Identify useful fields, values, tables, and text from business documents.",
    visual: <ExtractVisual />,
  },
  {
    title: "Understand",
    description: "Use AI to understand document context instead of relying only on fixed coordinates.",
    visual: <UnderstandVisual />,
  },
  {
    title: "Structure",
    description: "Transform document information into predictable structured outputs.",
    visual: <StructureVisual />,
  },
  {
    title: "Automate",
    description: "Send extracted data into applications, APIs, databases, spreadsheets, or downstream workflows.",
    visual: <AutomateVisual />,
  },
];

export function FeatureGrid() {
  const apiLive = isAvailable("restApi") && isAvailable("webhooks");
  return (
    <Section aria-labelledby="values-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="values-title"
            eyebrow="Platform"
            title="From document chaos to structured workflows."
            description="DocsFlow AI handles the tedious middle step between receiving a document and acting on the information inside it."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 70} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-elevated">
                <div className="relative h-40 overflow-hidden border-b border-line bg-subtle">
                  <div className="relative mx-auto h-full max-w-[280px]">{value.visual}</div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[17px] font-semibold tracking-tight text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                  {value.title === "Automate" && !apiLive ? (
                    <p className="mt-auto pt-4 text-xs text-slate-500">Via file export today. API and webhooks coming soon.</p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MiniDoc({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={`absolute rounded-md bg-white p-2.5 shadow-[0_1px_2px_rgb(15_23_42/0.06),0_6px_16px_-8px_rgb(15_23_42/0.2)] ring-1 ring-slate-900/[0.06] ${className ?? ""}`}>
      {children}
    </div>
  );
}

function Line({ w, className }: { w: string; className?: string }) {
  return <div className={`h-1.5 rounded-full bg-slate-200 ${className ?? ""}`} style={{ width: w }} />;
}

function ExtractVisual() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <MiniDoc className="top-5 left-1/2 w-40 -translate-x-1/2 space-y-2">
        <Line w="45%" className="bg-slate-300" />
        <Line w="80%" />
        <div className="relative">
          <div className="absolute -inset-1 rounded ring-[1.5px] ring-brand-500 bg-brand-500/10" />
          <Line w="60%" className="relative bg-brand-300" />
        </div>
        <Line w="70%" />
        <Line w="50%" />
        <div className="flex justify-end pt-1">
          <div className="relative">
            <div className="absolute -inset-1 rounded ring-[1.5px] ring-brand-500 bg-brand-500/10" />
            <div className="relative h-1.5 w-10 rounded-full bg-brand-300" />
          </div>
        </div>
      </MiniDoc>
      <div className="absolute right-5 bottom-4 rounded-md bg-ink px-2 py-1 font-mono text-[10px] text-slate-200 shadow-lg transition-transform duration-300 group-hover:-translate-y-0.5">
        <span className="text-[#93C5FD]">total</span> <span className="text-[#FCD34D]">4820.00</span>
      </div>
    </div>
  );
}

function UnderstandVisual() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <MiniDoc className="top-6 left-5 w-24 space-y-1.5">
        <div className="flex justify-between">
          <Line w="40%" className="bg-slate-300" />
          <div className="h-1.5 w-6 rounded-full bg-accent-400" />
        </div>
        <Line w="85%" />
        <Line w="65%" />
        <Line w="75%" />
      </MiniDoc>
      <MiniDoc className="right-5 bottom-5 w-24 space-y-1.5">
        <Line w="50%" className="bg-slate-300" />
        <Line w="80%" />
        <Line w="60%" />
        <div className="h-1.5 w-6 rounded-full bg-accent-400" />
      </MiniDoc>
      <svg className="absolute inset-0 size-full" viewBox="0 0 240 160" preserveAspectRatio="none" fill="none">
        <path d="M112 32 C 140 32, 130 80, 150 80" stroke="#06B6D4" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <path d="M150 80 C 130 80, 120 128, 120 128" stroke="#06B6D4" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute top-[42%] right-4 rounded-full bg-white px-2 py-0.5 font-mono text-[10px] text-accent-700 shadow-sm ring-1 ring-accent-500/30">
        invoice_date
      </div>
    </div>
  );
}

function StructureVisual() {
  const rows = [
    ["vendor_name", "string"],
    ["invoice_number", "string"],
    ["invoice_date", "date"],
    ["total", "number"],
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center px-5" aria-hidden="true">
      <div className="w-full max-w-[210px] overflow-hidden rounded-md bg-white shadow-[0_1px_2px_rgb(15_23_42/0.06),0_6px_16px_-8px_rgb(15_23_42/0.2)] ring-1 ring-slate-900/[0.06]">
        {rows.map(([key, type], i) => (
          <div key={key} className={`flex items-center justify-between px-2.5 py-1.5 font-mono text-[10px] ${i ? "border-t border-slate-100" : ""}`}>
            <span className="text-slate-700">{key}</span>
            <span className="rounded bg-brand-50 px-1.5 py-px text-[9px] text-brand-700">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomateVisual() {
  const targets = ["Spreadsheet", "Database", "Workflow"];
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 px-5" aria-hidden="true">
      <div className="rounded-md bg-ink px-2.5 py-2 font-mono text-[10px] text-[#A5F3FC] shadow-lg">{"{ }"}</div>
      <svg width="36" height="84" viewBox="0 0 36 84" fill="none" className="shrink-0">
        <path d="M0 42 C 18 42, 18 12, 36 12" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" className="animate-flow" />
        <path d="M0 42 H 36" stroke="#2563EB" strokeWidth="1.2" strokeDasharray="3 3" className="animate-flow" />
        <path d="M0 42 C 18 42, 18 72, 36 72" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" className="animate-flow" />
      </svg>
      <div className="space-y-2">
        {targets.map((t) => (
          <div key={t} className="rounded-md bg-white px-2.5 py-1 text-[10.5px] font-medium text-slate-700 shadow-sm ring-1 ring-slate-900/[0.06]">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
