import { cn } from "@/lib/cn";
import { features, statusLabel, type FeatureKey, type FeatureStatus } from "@/config/features";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-slate-700 shadow-card",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<FeatureStatus, string> = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  beta: "bg-brand-50 text-brand-700 ring-brand-600/15",
  "coming-soon": "bg-amber-50 text-amber-800 ring-amber-600/20",
};

const darkStatusStyles: Record<FeatureStatus, string> = {
  available: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  beta: "bg-brand-400/10 text-brand-300 ring-brand-400/20",
  "coming-soon": "bg-amber-400/10 text-amber-300 ring-amber-400/20",
};

const dotStyles: Record<FeatureStatus, string> = {
  available: "bg-emerald-500",
  beta: "bg-brand-500",
  "coming-soon": "bg-amber-500",
};

export function StatusBadge({
  status,
  className,
  hideAvailable = false,
  dark = false,
}: {
  status: FeatureStatus;
  className?: string;
  /** Hide the badge entirely for available features. */
  hideAvailable?: boolean;
  dark?: boolean;
}) {
  if (hideAvailable && status === "available") return null;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        dark ? darkStatusStyles[status] : statusStyles[status],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dotStyles[status])} aria-hidden="true" />
      {statusLabel(status)}
    </span>
  );
}

export function FeatureStatusBadge({ feature, hideAvailable, className }: { feature: FeatureKey; hideAvailable?: boolean; className?: string }) {
  return <StatusBadge status={features[feature].status} hideAvailable={hideAvailable} className={className} />;
}
