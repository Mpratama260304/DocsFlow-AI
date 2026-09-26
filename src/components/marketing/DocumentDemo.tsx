"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { cn } from "@/lib/cn";

const STAGES = ["Uploading", "Analyzing document", "Extracting fields", "Validating structure", "Completed"] as const;

type FieldKey = "document_type" | "vendor" | "invoice_number" | "invoice_date" | "currency" | "total";

const FIELDS: { key: FieldKey; value: string; kind: "string" | "number" }[] = [
  { key: "document_type", value: '"invoice"', kind: "string" },
  { key: "vendor", value: '"Northstar Technologies Ltd."', kind: "string" },
  { key: "invoice_number", value: '"INV-0428"', kind: "string" },
  { key: "invoice_date", value: '"2026-09-18"', kind: "string" },
  { key: "currency", value: '"USD"', kind: "string" },
  { key: "total", value: "4820.00", kind: "number" },
];

interface Step {
  stage: number;
  fields: number;
  duration: number;
}

const STEPS: Step[] = [
  { stage: 0, fields: 0, duration: 1500 },
  { stage: 1, fields: 0, duration: 1900 },
  ...FIELDS.map((_, i) => ({ stage: 2, fields: i + 1, duration: i === FIELDS.length - 1 ? 700 : 480 })),
  { stage: 3, fields: FIELDS.length, duration: 1500 },
  { stage: 4, fields: FIELDS.length, duration: 4200 },
];

const FINAL_STEP = STEPS.length - 1;

function useDemoTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    let inView = false;
    const sync = () => setActive(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !active) return;
    const timer = window.setTimeout(() => {
      if (stepIndex >= FINAL_STEP) {
        setStepIndex(0);
        setCycle((c) => c + 1);
      } else {
        setStepIndex((i) => i + 1);
      }
    }, STEPS[stepIndex].duration);
    return () => window.clearTimeout(timer);
  }, [stepIndex, active, reducedMotion]);

  const step = reducedMotion ? STEPS[FINAL_STEP] : STEPS[stepIndex];
  return { containerRef, step, cycle };
}

export function DocumentDemo() {
  const { containerRef, step, cycle } = useDemoTimeline();
  const { stage, fields } = step;
  const completed = stage === 4;

  const fieldState = (key: FieldKey): "idle" | "current" | "done" => {
    const index = FIELDS.findIndex((f) => f.key === key);
    if (stage < 2 || index >= fields) return "idle";
    if (stage === 2 && index === fields - 1) return "current";
    return "done";
  };

  return (
    <div ref={containerRef}>
      <WindowFrame
        label="Animated example: DocsFlow AI converts invoice_0428.pdf into structured JSON"
        breadcrumb={["Extraction", "invoice_0428.pdf"]}
        right={<StatusChip completed={completed} label={STAGES[stage]} />}
        bodyClassName="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_200px_minmax(0,1fr)]"
      >
        {/* Document */}
        <div className="relative border-b border-line bg-subtle/60 p-4 sm:p-6 lg:border-r lg:border-b-0 lg:p-8">
          <PanelLabel icon="fileText" text="invoice_0428.pdf" meta="PDF · 1 page" />
          <div className="relative mt-4">
            <Invoice fieldState={fieldState} dimmed={stage === 0} />
            {stage === 1 ? (
              <div key={`scan-${cycle}`} className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
                <div className="absolute inset-0 animate-scan border-b-2 border-brand-500/70 bg-gradient-to-b from-transparent via-transparent to-brand-500/[0.09]" />
              </div>
            ) : null}
            {stage === 0 ? <UploadOverlay key={`upload-${cycle}`} /> : null}
          </div>
        </div>

        {/* Pipeline (desktop) */}
        <div className="hidden flex-col items-center justify-center gap-6 border-r border-line bg-white px-5 py-8 lg:flex">
          <div className="flex w-full items-center">
            <FlowLine active={!completed} />
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-2xl bg-white ring-1 ring-line shadow-elevated transition-shadow",
                !completed && "animate-pulse-soft",
              )}
            >
              <LogoMark size={34} />
            </div>
            <FlowLine active={!completed} />
          </div>
          <p className="-mt-2 text-xs font-medium text-ink">DocsFlow AI</p>
          <StageList stage={stage} />
        </div>

        {/* Mobile progress */}
        <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3 sm:px-6 lg:hidden">
          <LogoMark size={24} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-ink" aria-live="polite">
              {STAGES[stage]}
            </p>
            <div className="mt-1.5 flex gap-1">
              {STAGES.map((s, i) => (
                <span
                  key={s}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-500",
                    i < stage || completed ? "bg-emerald-500" : i === stage ? "bg-brand-500" : "bg-slate-200",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* JSON */}
        <div className="flex flex-col bg-ink p-4 sm:p-6 lg:p-8">
          <PanelLabel icon="braces" text="result.json" meta={completed ? "Valid JSON" : "Generating…"} dark />
          <pre className="scrollbar-thin mt-4 flex-1 overflow-x-auto font-mono text-[11.5px] leading-[1.9] sm:text-[13px]" aria-label="Extracted JSON output">
            <code>
              <span className="block text-slate-500">{"{"}</span>
              {FIELDS.map((field, i) => {
                const shown = i < fields;
                const validated = stage >= 3;
                return (
                  <span key={`${field.key}-${cycle}`} className="flex items-start justify-between gap-3">
                    {shown ? (
                      <span className="min-w-0 animate-slide-in pl-[2ch] whitespace-pre-wrap [overflow-wrap:anywhere] sm:whitespace-pre">
                        <span className="text-[#93C5FD]">&quot;{field.key}&quot;</span>
                        <span className="text-slate-500">: </span>
                        <span className={field.kind === "number" ? "text-[#FCD34D]" : "text-[#A5F3FC]"}>{field.value}</span>
                        {i < FIELDS.length - 1 ? <span className="text-slate-500">,</span> : null}
                      </span>
                    ) : (
                      <span className="flex h-[1.9em] items-center pl-[2ch]" aria-hidden="true">
                        <span className="h-2 rounded-full bg-white/[0.06]" style={{ width: `${8 + ((i * 5) % 9)}ch` }} />
                      </span>
                    )}
                    <span
                      className={cn(
                        "flex h-[1.9em] shrink-0 items-center text-emerald-400 transition-all duration-300",
                        validated && shown ? "scale-100 opacity-100" : "scale-75 opacity-0",
                      )}
                      style={{ transitionDelay: validated && stage === 3 ? `${i * 120}ms` : "0ms" }}
                      aria-hidden="true"
                    >
                      <Icon name="check" size={14} strokeWidth={2} />
                    </span>
                  </span>
                );
              })}
              <span className="block text-slate-500">{"}"}</span>
            </code>
          </pre>
          <div
            className={cn(
              "mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 pt-4 font-mono text-[11px] text-slate-400 transition-opacity duration-500",
              completed ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400" /> completed
            </span>
            <span>6 fields</span>
            <span>schema: invoice</span>
          </div>
        </div>
      </WindowFrame>
    </div>
  );
}

function StatusChip({ completed, label }: { completed: boolean; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium ring-1 ring-inset transition-colors duration-500",
        completed ? "bg-emerald-50 text-emerald-700 ring-emerald-600/15" : "bg-brand-50 text-brand-700 ring-brand-600/15",
      )}
    >
      <span className={cn("size-1.5 rounded-full", completed ? "bg-emerald-500" : "animate-pulse bg-brand-500")} />
      <span className="hidden sm:inline">{completed ? "Completed" : label}</span>
      <span className="sm:hidden">{completed ? "Done" : "Processing"}</span>
    </span>
  );
}

function PanelLabel({ icon, text, meta, dark }: { icon: "fileText" | "braces"; text: string; meta: string; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
      <span className={cn("inline-flex min-w-0 items-center gap-2 font-mono text-xs [overflow-wrap:anywhere]", dark ? "text-slate-300" : "text-slate-600")}>
        <Icon name={icon} size={15} className={dark ? "text-accent-400" : "text-brand-600"} />
        {text}
      </span>
      <span className={cn("text-[11px]", dark ? "text-slate-500" : "text-muted")}>{meta}</span>
    </div>
  );
}

function FlowLine({ active }: { active: boolean }) {
  return (
    <svg className="h-2 flex-1" viewBox="0 0 40 8" preserveAspectRatio="none" aria-hidden="true">
      <line
        x1="0"
        y1="4"
        x2="40"
        y2="4"
        stroke={active ? "#2563EB" : "#CBD5E1"}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className={active ? "animate-flow" : undefined}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StageList({ stage }: { stage: number }) {
  return (
    <ol className="w-full space-y-2.5" aria-label="Processing stages">
      {STAGES.map((label, i) => {
        const done = i < stage || stage === 4;
        const current = i === stage && stage !== 4;
        return (
          <li key={label} className="flex items-center gap-2.5 text-[12px]" aria-current={current ? "step" : undefined}>
            <span className="flex size-4 shrink-0 items-center justify-center">
              {done ? (
                <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Icon name="check" size={10} strokeWidth={3} />
                </span>
              ) : current ? (
                <span className="size-3.5 animate-spin rounded-full border-[1.5px] border-brand-200 border-t-brand-600" />
              ) : (
                <span className="size-3 rounded-full border-[1.5px] border-slate-300" />
              )}
            </span>
            <span
              className={cn(
                "transition-colors duration-300",
                current ? "font-medium text-ink" : done ? "text-slate-600" : "text-slate-400",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function UploadOverlay() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = window.setTimeout(() => setProgress(100), 60);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/95 p-3 shadow-elevated ring-1 ring-line backdrop-blur sm:inset-x-6 sm:bottom-6">
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="inline-flex min-w-0 items-center gap-1.5 font-medium text-ink">
          <Icon name="upload" size={13} className="text-brand-600" /> Uploading<span className="hidden sm:inline"> invoice_0428.pdf</span>
        </span>
        <span className="shrink-0 text-muted">312 KB</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-brand-600 transition-[width] duration-[1300ms] ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function Field({ state, children, className }: { state: "idle" | "current" | "done"; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-x-1.5 -inset-y-1 rounded-[5px] transition-all duration-300",
          state === "current" && "bg-brand-500/10 ring-[1.5px] ring-brand-500",
          state === "done" && "bg-brand-500/[0.05] ring-1 ring-brand-500/35",
          state === "idle" && "ring-0 ring-transparent",
        )}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

function Invoice({ fieldState, dimmed }: { fieldState: (key: FieldKey) => "idle" | "current" | "done"; dimmed: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg bg-white p-4 text-[10px] leading-relaxed text-slate-600 shadow-[0_1px_3px_rgb(15_23_42/0.08),0_8px_24px_-12px_rgb(15_23_42/0.18)] ring-1 ring-slate-900/[0.06] transition-opacity duration-500 sm:p-6 sm:text-[11px]",
        dimmed ? "opacity-60" : "opacity-100",
      )}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-slate-900 text-white" aria-hidden="true">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
              <path d="M8 0.5 9.6 6.4 15.5 8 9.6 9.6 8 15.5 6.4 9.6 0.5 8 6.4 6.4Z" />
            </svg>
          </span>
          <div className="min-w-0">
            <Field state={fieldState("vendor")}>
              <span className="block text-[11px] font-semibold text-ink sm:text-[12.5px]">Northstar Technologies Ltd.</span>
            </Field>
            <span className="block text-slate-400 [overflow-wrap:anywhere]">billing@northstar.example</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2.5">
          <Field state={fieldState("document_type")}>
            <span className="block text-[13px] font-semibold tracking-[0.12em] text-ink sm:text-[15px]">INVOICE</span>
          </Field>
          <Field state={fieldState("invoice_number")}>
            <span className="font-mono text-slate-700">INV-0428</span>
          </Field>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-y border-slate-100 py-3 sm:mt-6">
        <div>
          <span className="block text-slate-400">Invoice date</span>
          <Field state={fieldState("invoice_date")}>
            <span className="font-medium text-ink">September 18, 2026</span>
          </Field>
        </div>
        <div>
          <span className="block text-slate-400">Due date</span>
          <span className="font-medium text-ink">October 18, 2026</span>
        </div>
        <div>
          <span className="block text-slate-400">Currency</span>
          <Field state={fieldState("currency")}>
            <span className="font-medium text-ink">USD</span>
          </Field>
        </div>
      </div>

      <div className="mt-3">
        <span className="block text-slate-400">Bill to</span>
        <span className="font-medium text-ink">Your Company Ltd.</span>
      </div>

      <table className="mt-4 w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400">
            <th className="pb-1.5 font-normal">Description</th>
            <th className="pb-1.5 text-right font-normal">Qty</th>
            <th className="pb-1.5 text-right font-normal">Amount</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          <tr>
            <td className="pt-2">Data platform subscription</td>
            <td className="pt-2 text-right">1</td>
            <td className="pt-2 text-right tabular-nums">$2,400.00</td>
          </tr>
          <tr>
            <td className="pt-1.5">Integration services</td>
            <td className="pt-1.5 text-right">12 h</td>
            <td className="pt-1.5 text-right tabular-nums">$1,800.00</td>
          </tr>
          <tr>
            <td className="pt-1.5">Priority support add-on</td>
            <td className="pt-1.5 text-right">1</td>
            <td className="pt-1.5 text-right tabular-nums">$200.00</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 ml-auto w-full max-w-[210px] space-y-1 border-t border-slate-100 pt-3">
        <div className="flex justify-between">
          <span className="text-slate-400">Subtotal</span>
          <span className="tabular-nums text-slate-700">$4,400.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Tax</span>
          <span className="tabular-nums text-slate-700">$420.00</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="font-medium text-ink">Total</span>
          <Field state={fieldState("total")}>
            <span className="text-[12px] font-semibold tabular-nums text-ink sm:text-[13px]">$4,820.00</span>
          </Field>
        </div>
      </div>
    </div>
  );
}
