"use client";

import { useId, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib/cn";

const examples = [
  {
    id: "invoice",
    label: "Invoice",
    file: "invoice_0428.pdf",
    schema: `{
  "vendor_name": "string",
  "invoice_number": "string",
  "invoice_date": "date",
  "currency": "string",
  "total": "number"
}`,
    output: `{
  "vendor_name": "Northstar Technologies Ltd.",
  "invoice_number": "INV-0428",
  "invoice_date": "2026-09-18",
  "currency": "USD",
  "total": 4820
}`,
  },
  {
    id: "receipt",
    label: "Receipt",
    file: "receipt_office.png",
    schema: `{
  "merchant": "string",
  "purchase_date": "date",
  "tax": "number",
  "total": "number",
  "payment_method": "string"
}`,
    output: `{
  "merchant": "Paperline Office Supply",
  "purchase_date": "2026-09-24",
  "tax": 6.91,
  "total": 93.31,
  "payment_method": "card"
}`,
  },
  {
    id: "po",
    label: "Purchase order",
    file: "purchase_order_291.pdf",
    schema: `{
  "po_number": "string",
  "supplier": "string",
  "delivery_date": "date",
  "line_items": [
    { "sku": "string", "quantity": "number" }
  ]
}`,
    output: `{
  "po_number": "PO-291",
  "supplier": "Kestrel Components",
  "delivery_date": "2026-10-06",
  "line_items": [
    { "sku": "KC-1180", "quantity": 400 },
    { "sku": "KC-2204", "quantity": 120 }
  ]
}`,
  },
];

export function SchemaDemo() {
  const [active, setActive] = useState(examples[0].id);
  const baseId = useId();
  const example = examples.find((e) => e.id === active) ?? examples[0];

  return (
    <div>
      <div role="tablist" aria-label="Schema examples" className="inline-flex rounded-lg bg-slate-100 p-1">
        {examples.map((e) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${e.id}`}
            aria-selected={e.id === active}
            aria-controls={`${baseId}-panel`}
            onClick={() => setActive(e.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-[13px] font-medium transition-all",
              e.id === active ? "bg-white text-ink shadow-card" : "text-slate-500 hover:text-ink",
            )}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-5 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)]"
      >
        <CodeBlock
          key={`schema-${active}`}
          code={example.schema}
          lang="json"
          theme="light"
          filename="schema.json"
          headerRight={<span className="text-[11px] font-medium text-muted">You define</span>}
          className="animate-fade-in"
          preClassName="min-h-[220px]"
        />
        <div className="flex items-center justify-center" aria-hidden="true">
          <div className="flex items-center gap-2 lg:flex-col">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-400 lg:h-8 lg:w-px lg:bg-gradient-to-b" />
            <LogoMark size={32} />
            <span className="h-px w-8 bg-gradient-to-r from-brand-400 to-transparent lg:h-8 lg:w-px lg:bg-gradient-to-b" />
          </div>
        </div>
        <CodeBlock
          key={`output-${active}`}
          code={example.output}
          lang="json"
          filename={`${example.file} → output.json`}
          headerRight={<span className="text-[11px] font-medium text-emerald-400">Structured</span>}
          className="animate-fade-in"
          preClassName="min-h-[220px]"
        />
      </div>
    </div>
  );
}
