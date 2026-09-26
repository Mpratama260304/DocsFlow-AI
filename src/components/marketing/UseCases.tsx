import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

export const useCases: { id: string; title: string; icon: IconName; description: string; flow: string[] }[] = [
  {
    id: "accounts-payable",
    title: "Accounts Payable",
    icon: "fileText",
    description: "Turn invoices into structured data ready for review and accounting workflows.",
    flow: ["Invoices", "Review", "Accounting"],
  },
  {
    id: "financial-operations",
    title: "Financial Operations",
    icon: "wallet",
    description: "Reduce repetitive manual entry from receipts, statements, and financial documents.",
    flow: ["Receipts", "Statements", "Ledger"],
  },
  {
    id: "ecommerce",
    title: "Ecommerce Operations",
    icon: "bag",
    description: "Extract information from supplier invoices, purchase orders, and operational documents.",
    flow: ["Supplier docs", "Fields", "Inventory"],
  },
  {
    id: "logistics",
    title: "Logistics",
    icon: "package",
    description: "Structure shipping and supply-chain documentation.",
    flow: ["Shipping docs", "Fields", "Tracking"],
  },
  {
    id: "saas",
    title: "SaaS Products",
    icon: "appWindow",
    description: "Add document intelligence capabilities to applications without building an entire extraction pipeline from scratch.",
    flow: ["User uploads", "DocsFlow AI", "Your app"],
  },
  {
    id: "agencies",
    title: "Automation Agencies",
    icon: "merge",
    description: "Connect document processing with customer workflows and business automation.",
    flow: ["Client docs", "Fields", "Automations"],
  },
];

export function UseCases() {
  return (
    <Section aria-labelledby="usecases-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="usecases-title"
            eyebrow="Use cases"
            title="Built for real business workflows."
            description="Wherever teams re-type information from documents into software, DocsFlow AI can take over the repetitive part."
          />
        </Reveal>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 60}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-elevated">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <h3 className="text-[15px] font-semibold tracking-tight text-ink">{item.title}</h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[11.5px] font-medium text-slate-600" aria-label={`Flow: ${item.flow.join(" to ")}`}>
                  {item.flow.map((step, idx) => (
                    <span key={step} className="flex items-center gap-1.5">
                      {idx > 0 ? <Icon name="arrowRight" size={12} className="shrink-0 text-slate-300" /> : null}
                      <span
                        className={`whitespace-nowrap rounded-md px-2 py-1 ${
                          idx === item.flow.length - 1 ? "bg-brand-50 text-brand-700" : "bg-slate-100"
                        }`}
                      >
                        {step}
                      </span>
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
