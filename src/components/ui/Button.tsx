import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "light" | "dark-outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_1px_2px_rgb(15_23_42/0.12),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-brand-700",
  secondary: "bg-white text-ink ring-1 ring-inset ring-line shadow-card hover:bg-subtle hover:ring-line-strong",
  ghost: "text-ink hover:bg-slate-100",
  light: "bg-white text-ink hover:bg-slate-100",
  "dark-outline": "text-white ring-1 ring-inset ring-white/20 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-[15px]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant = "primary", size = "md", className, arrow, children }: ButtonLinkProps) {
  const isExternal = /^(https?:|mailto:)/.test(href);
  const content = (
    <>
      {children}
      {arrow ? (
        <Icon name="arrowRight" size={16} className="-mr-0.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );
  const classes = buttonClasses(variant, size, cn("group", className));
  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700",
        className,
      )}
    >
      {children}
      <Icon name="arrowRight" size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
