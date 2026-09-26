import { cn } from "@/lib/cn";

/**
 * DocsFlow AI mark: a document spine with a folded corner (the document)
 * and stacked rows tracing a "D" (structured data flowing out of it).
 */
export function LogoMark({ size = 28, className, title }: { size?: number; className?: string; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <rect width="32" height="32" rx="8" fill="#0B1220" />
      <path d="M10 8h1l2 2v12.5a1.5 1.5 0 0 1-1.5 1.5H10a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 10 8Z" fill="#fff" />
      <rect x="14.5" y="8" width="6.2" height="2.8" rx="1.4" fill="#3B82F6" />
      <rect x="14.5" y="12.4" width="8.8" height="2.8" rx="1.4" fill="#3194F1" />
      <rect x="14.5" y="16.8" width="8.8" height="2.8" rx="1.4" fill="#27AAE8" />
      <rect x="14.5" y="21.2" width="6.2" height="2.8" rx="1.4" fill="#22C4E4" />
    </svg>
  );
}

export function Logo({ className, markSize = 28, inverted = false }: { className?: string; markSize?: number; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} />
      <span className={cn("text-[17px] font-semibold tracking-[-0.02em]", inverted ? "text-white" : "text-ink")}>
        DocsFlow
        <span className={cn("ml-1 font-medium", inverted ? "text-slate-400" : "text-muted")}>AI</span>
      </span>
    </span>
  );
}
