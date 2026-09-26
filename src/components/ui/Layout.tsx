import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

interface SectionProps {
  id?: string;
  className?: string;
  tone?: "white" | "subtle";
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

export function Section({ id, className, tone = "white", children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"]}
      className={cn(
        "relative py-20 sm:py-24 lg:py-28",
        tone === "subtle" && "border-y border-line/70 bg-subtle",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ id, eyebrow, title, description, align = "center", className, as = "h2" }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">{eyebrow}</p>
      ) : null}
      <Heading
        id={id}
        className="text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.1]"
      >
        {title}
      </Heading>
      {description ? <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}
