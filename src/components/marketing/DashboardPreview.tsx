"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { features } from "@/config/features";
import { cn } from "@/lib/cn";

type Status = "Completed" | "Review" | "Processing";

interface Row {
  id: string;
  file: string;
  type: string;
  status: Status;
  created: string;
  fields: [string, string][];
  flagged?: string;
}

const INITIAL_ROWS: Row[] = [
  {
    id: "inv",
    file: "invoice_0428.pdf",
    type: "Invoice",
    status: "Completed",
    created: "Sep 26, 09:41",
    fields: [
      ["vendor", "Northstar Technologies Ltd."],
      ["invoice_number", "INV-0428"],
      ["invoice_date", "2026-09-18"],
      ["currency", "USD"],
      ["total", "4820.00"],
    ],
  },
  {
    id: "rcp",
    file: "receipt_office.png",
    type: "Receipt",
    status: "Completed",
    created: "Sep 26, 09:12",
    fields: [
      ["merchant", "Paperline Office Supply"],
      ["date", "2026-09-24"],
      ["subtotal", "86.40"],
      ["tax", "6.91"],
      ["total", "93.31"],
    ],
  },
  {
    id: "po",
    file: "purchase_order_291.pdf",
    type: "Purchase Order",
    status: "Review",
    created: "Sep 25, 17:30",
    flagged: "delivery_date",
    fields: [
      ["po_number", "PO-291"],
      ["supplier", "Kestrel Components"],
      ["order_date", "2026-09-22"],
      ["delivery_date", "2026-10-06"],
      ["currency", "EUR"],
      ["total", "12640.00"],
    ],
  },
  {
    id: "bank",
    file: "bank_statement_aug.pdf",
    type: "Statement",
    status: "Processing",
    created: "Sep 25, 16:04",
    fields: [
      ["statement_period", "2026-08-01 / 2026-08-31"],
      ["opening_balance", "58210.44"],
      ["closing_balance", "61902.17"],
      ["currency", "USD"],
      ["transactions", "42 rows"],
    ],
  },
];

const NAV: { label: string; icon: IconName; soon?: boolean }[] = [
  { label: "Overview", icon: "layers" },
  { label: "Documents", icon: "fileText" },
  { label: "Extraction", icon: "scan" },
  { label: "Schemas", icon: "braces", soon: features.customSchemas.status !== "available" },
  { label: "API", icon: "code", soon: features.restApi.status !== "available" },
  { label: "Usage", icon: "activity" },
  { label: "Settings", icon: "sliders" },
];

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [selectedId, setSelectedId] = useState("inv");
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    const timer = window.setTimeout(() => {
      setRows((current) => current.map((r) => (r.id === "bank" ? { ...r, status: "Completed" } : r)));
    }, 3800);
    return () => window.clearTimeout(timer);
  }, [seen]);

  const selected = rows.find((r) => r.id === selectedId) ?? rows[0];
  const count = (s: Status) => rows.filter((r) => r.status === s).length;
  const processed = rows.length - count("Processing");

  const approve = (id: string) =>
    setRows((current) => current.map((r) => (r.id === id ? { ...r, status: "Completed", flagged: undefined } : r)));

  return (
    <div ref={ref}>
      <WindowFrame
        label="Illustrative DocsFlow AI dashboard with sample data"
        breadcrumb={["Workspace", "Overview"]}
        right={<span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 sm:inline">Sample data</span>}
        bodyClassName="flex min-h-[520px]"
      >
        <aside className="hidden w-52 shrink-0 flex-col border-r border-line bg-subtle/70 p-3 md:flex" aria-label="Dashboard navigation (preview)">
          <div className="flex items-center gap-2 rounded-lg px-2 py-2">
            <LogoMark size={22} />
            <span className="text-[13px] font-medium text-ink">Your workspace</span>
          </div>
          <ul className="mt-3 space-y-0.5">
            {NAV.map((item) => (
              <li key={item.label}>
                <span
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px]",
                    item.label === "Overview" ? "bg-white font-medium text-ink shadow-card ring-1 ring-line" : "text-slate-600",
                  )}
                >
                  <Icon name={item.icon} size={16} className={item.label === "Overview" ? "text-brand-600" : "text-slate-400"} />
                  {item.label}
                  {item.soon ? <span className="ml-auto rounded bg-amber-50 px-1.5 py-px text-[9.5px] font-medium text-amber-700">Soon</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold tracking-tight text-ink">Overview</h3>
              <p className="text-xs text-muted">Sample workspace · fictional documents</p>
            </div>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-xs font-medium text-white">
              <Icon name="upload" size={14} /> Upload
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <StatCard label="Documents processed" value={String(processed)} hint={`of ${rows.length} uploaded`} />
            <div className="rounded-xl border border-line p-4 sm:col-span-2">
              <p className="text-xs text-muted">Processing status</p>
              <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-slate-100">
                {(["Completed", "Review", "Processing"] as Status[]).map((s) => (
                  <span
                    key={s}
                    className={cn("h-full transition-all duration-700", barColor[s])}
                    style={{ width: `${(count(s) / rows.length) * 100}%` }}
                  />
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                {(["Completed", "Review", "Processing"] as Status[]).map((s) => (
                  <li key={s} className="inline-flex items-center gap-1.5">
                    <span className={cn("size-2 rounded-full", barColor[s])} />
                    {s} <span className="tabular-nums text-muted">{count(s)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="overflow-hidden rounded-xl border border-line">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="text-[13px] font-medium text-ink">Recent documents</p>
                <p className="text-[11px] text-muted">Select a row</p>
              </div>
              <table className="w-full text-left text-[12.5px]">
                <thead className="bg-subtle text-[11px] text-muted">
                  <tr>
                    <th className="px-4 py-2 font-medium">File</th>
                    <th className="hidden px-4 py-2 font-medium sm:table-cell">Type</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="hidden px-4 py-2 font-medium lg:table-cell">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={cn(
                        "cursor-pointer border-t border-line transition-colors",
                        row.id === selected.id ? "bg-brand-50/60" : "hover:bg-subtle",
                      )}
                    >
                      <td className="w-full max-w-0 px-4 py-3">
                        <button
                          type="button"
                          aria-pressed={row.id === selected.id}
                          className="flex w-full min-w-0 items-center gap-2 text-left font-medium text-ink"
                        >
                          <Icon name={row.type === "Receipt" ? "receipt" : "fileText"} size={15} className="shrink-0 text-slate-400" />
                          <span className="truncate font-mono text-[12px]">{row.file}</span>
                        </button>
                      </td>
                      <td className="hidden px-4 py-3 whitespace-nowrap text-slate-600 sm:table-cell">{row.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="hidden px-4 py-3 whitespace-nowrap text-muted lg:table-cell">{row.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <DetailPanel row={selected} onApprove={approve} />
          </div>
        </div>
      </WindowFrame>
    </div>
  );
}

const barColor: Record<Status, string> = {
  Completed: "bg-emerald-500",
  Review: "bg-amber-400",
  Processing: "bg-brand-500",
};

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-line p-4">
      <p className="text-xs text-muted">{label}</p>
      <p key={value} className="mt-2 animate-slide-in text-2xl font-semibold tracking-tight text-ink tabular-nums">
        {value}
      </p>
      <p className="text-[11px] text-muted">{hint}</p>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    Review: "bg-amber-50 text-amber-800 ring-amber-600/20",
    Processing: "bg-brand-50 text-brand-700 ring-brand-600/15",
  };
  return (
    <span key={status} className={cn("inline-flex animate-fade-in items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset", styles[status])}>
      {status === "Processing" ? (
        <span className="size-2.5 animate-spin rounded-full border-[1.5px] border-brand-200 border-t-brand-600" aria-hidden="true" />
      ) : (
        <span className={cn("size-1.5 rounded-full", barColor[status])} aria-hidden="true" />
      )}
      {status}
    </span>
  );
}

function DetailPanel({ row, onApprove }: { row: Row; onApprove: (id: string) => void }) {
  return (
    <div className="flex flex-col rounded-xl border border-line" aria-live="polite">
      <div className="border-b border-line px-4 py-3">
        <p className="truncate font-mono text-[12px] font-medium text-ink">{row.file}</p>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted">
          {row.type} <span className="text-slate-300">·</span> <StatusPill status={row.status} />
        </div>
      </div>

      <div key={`${row.id}-${row.status}`} className="flex-1 animate-fade-in px-4 py-3">
        {row.status === "Processing" ? (
          <div className="space-y-3 py-1" aria-label="Extracting fields">
            <p className="flex items-center gap-2 text-xs text-brand-700">
              <span className="size-3 animate-spin rounded-full border-[1.5px] border-brand-200 border-t-brand-600" />
              Extracting fields…
            </p>
            {[70, 55, 80, 45, 60].map((w, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-2 w-16 rounded-full bg-slate-100" />
                <div className="h-2.5 animate-pulse rounded-full bg-slate-100" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        ) : (
          <dl className="space-y-2.5">
            {row.fields.map(([key, value]) => {
              const flagged = row.status === "Review" && row.flagged === key;
              return (
                <div key={key} className={cn("rounded-md", flagged && "-mx-2 bg-amber-50 px-2 py-1.5 ring-1 ring-amber-500/25")}>
                  <dt className="flex items-center justify-between font-mono text-[10.5px] text-muted">
                    {key}
                    {flagged ? <span className="font-sans text-[10px] font-medium text-amber-700">Needs review</span> : null}
                  </dt>
                  <dd className="truncate font-mono text-[12px] text-ink">{value}</dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-3">
        {row.status === "Review" ? (
          <button
            type="button"
            onClick={() => onApprove(row.id)}
            className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-ink text-xs font-medium text-white transition-colors hover:bg-ink-700"
          >
            <Icon name="check" size={14} strokeWidth={2} /> Approve values
          </button>
        ) : (
          <>
            <span className="text-[11px] text-muted">Export</span>
            {["JSON", "CSV", "Excel"].map((f) => (
              <span
                key={f}
                className={cn(
                  "rounded-md border border-line px-2 py-1 text-[11px] font-medium",
                  row.status === "Processing" ? "text-slate-300" : "text-slate-700",
                )}
              >
                {f}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
