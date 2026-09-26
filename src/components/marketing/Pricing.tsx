import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { planPriceLabel, pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/cn";

export function PricingCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {pricingPlans.map((plan, i) => {
        const priced = plan.status === "available";
        return (
          <Reveal key={plan.id} delay={i * 60} className="h-full">
            <article
              className={cn(
                "relative flex h-full flex-col rounded-2xl bg-white p-6",
                plan.highlighted ? "shadow-elevated ring-2 ring-brand-600" : "border border-line shadow-card",
              )}
              aria-labelledby={`plan-${plan.id}`}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
                  Start here
                </span>
              ) : null}
              <h3 id={`plan-${plan.id}`} className="text-[15px] font-semibold text-ink">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted lg:min-h-[4.25rem]">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className={cn("font-semibold tracking-tight", priced ? "text-4xl text-ink" : "text-2xl text-slate-700")}>
                  {planPriceLabel(plan)}
                </span>
                {priced && plan.period ? <span className="text-sm text-muted">{plan.period}</span> : null}
              </p>
              <ButtonLink
                href={plan.cta.href}
                variant={plan.highlighted ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                {plan.cta.label}
              </ButtonLink>
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.06em] text-slate-500">{plan.featuresHeading}</p>
                <ul className="mt-4 space-y-3">
                  {[...plan.limits, ...plan.features].map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-slate-700">
                      <Icon
                        name="check"
                        size={16}
                        strokeWidth={2}
                        className={cn("mt-0.5 shrink-0", priced ? "text-brand-600" : "text-slate-400")}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
