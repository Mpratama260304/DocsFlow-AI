import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

const documentTypes: { title: string; icon: IconName; description: string; fields: string[] }[] = [
  {
    title: "Invoices",
    icon: "fileText",
    description: "Extract vendor information, invoice IDs, dates, totals, taxes, and line items.",
    fields: ["vendor", "invoice_number", "total"],
  },
  {
    title: "Receipts",
    icon: "receipt",
    description: "Capture merchant details, transaction dates, amounts, taxes, and itemized purchases.",
    fields: ["merchant", "date", "tax"],
  },
  {
    title: "Purchase Orders",
    icon: "clipboard",
    description: "Turn purchase orders into structured operational data.",
    fields: ["po_number", "supplier", "items"],
  },
  {
    title: "Bank Statements",
    icon: "landmark",
    description: "Convert transaction records and statement information into machine-readable data.",
    fields: ["period", "balance", "transactions"],
  },
  {
    title: "Forms",
    icon: "form",
    description: "Extract fields and responses from structured and semi-structured forms.",
    fields: ["field", "value"],
  },
  {
    title: "Contracts",
    icon: "contract",
    description: "Identify key document metadata and structured information from business agreements.",
    fields: ["parties", "effective_date"],
  },
  {
    title: "Shipping Documents",
    icon: "truck",
    description: "Extract operational data from logistics documents.",
    fields: ["shipper", "consignee", "reference"],
  },
  {
    title: "Custom Documents",
    icon: "sliders",
    description: "Define the information your workflow needs and structure documents around it.",
    fields: ["your_fields"],
  },
];

export function DocumentTypes() {
  return (
    <Section aria-labelledby="doctypes-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="doctypes-title"
            eyebrow="Document types"
            title="Built for the documents businesses handle every day."
            description="Start with common financial and operational documents, and extend to the formats specific to your workflow."
          />
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {documentTypes.map((doc, i) => (
            <Reveal as="li" key={doc.title} delay={(i % 4) * 60}>
              <article className="group relative h-full rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-elevated sm:p-6">
                <div className="flex items-center gap-3 sm:block">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-600/10 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={doc.icon} size={20} />
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-ink sm:mt-5">{doc.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-2">{doc.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Example fields">
                  {doc.fields.map((field) => (
                    <span key={field} className="rounded border border-line bg-subtle px-1.5 py-0.5 font-mono text-[10.5px] text-slate-500">
                      {field}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mx-auto mt-10 flex max-w-2xl items-start justify-center gap-2 text-center text-[13px] leading-relaxed text-slate-500">
          <Icon name="info" size={16} className="mt-0.5 shrink-0 text-slate-400" />
          Results vary with document quality, language, and layout. Every extraction can be reviewed before it is exported.
        </p>
      </Container>
    </Section>
  );
}
