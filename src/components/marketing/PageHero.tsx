import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Layout";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function PageHero({ eyebrow, title, description, actions, children, align = "center", className }: PageHeroProps) {
  return (
    <section className={cn("relative -mt-16 overflow-hidden pt-16", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-radial absolute inset-0" />
        <div className="absolute top-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.08),transparent)]" />
      </div>
      <Container className="pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          <p className="animate-slide-in text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">{eyebrow}</p>
          <h1 className="mt-4 animate-slide-in text-balance text-4xl leading-[1.08] font-semibold tracking-[-0.035em] text-ink [animation-delay:60ms] sm:text-5xl lg:text-[56px]">
            {title}
          </h1>
          {description ? (
            <div className="mt-6 animate-slide-in text-pretty text-base leading-relaxed text-muted [animation-delay:120ms] sm:text-lg">
              {description}
            </div>
          ) : null}
          {actions ? (
            <div
              className={cn(
                "mt-9 flex animate-slide-in flex-col gap-3 [animation-delay:180ms] sm:flex-row",
                align === "center" && "items-center justify-center",
              )}
            >
              {actions}
            </div>
          ) : null}
        </div>
        {children ? <div className="mt-16 animate-fade-in [animation-delay:260ms]">{children}</div> : null}
      </Container>
    </section>
  );
}
