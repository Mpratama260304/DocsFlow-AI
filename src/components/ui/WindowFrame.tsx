import { cn } from "@/lib/cn";

interface WindowFrameProps {
  breadcrumb: string[];
  right?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
  label?: string;
}

/** Neutral application chrome used to present product UI previews. */
export function WindowFrame({ breadcrumb, right, className, bodyClassName, children, label }: WindowFrameProps) {
  return (
    <figure
      aria-label={label}
      className={cn("overflow-hidden rounded-2xl bg-white shadow-window", className)}
    >
      <div className="flex h-11 items-center justify-between gap-3 border-b border-line bg-subtle/80 px-4">
        <div className="flex min-w-0 items-center gap-1.5 text-[12.5px]">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex min-w-0 items-center gap-1.5">
              {i > 0 ? <span className="text-slate-300">/</span> : null}
              <span className={cn("truncate", i === breadcrumb.length - 1 ? "font-medium text-ink" : "text-muted")}>
                {crumb}
              </span>
            </span>
          ))}
        </div>
        {right}
      </div>
      <div className={bodyClassName}>{children}</div>
    </figure>
  );
}
