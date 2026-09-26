import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { DocumentDemo } from "./DocumentDemo";

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-radial absolute inset-0" />
        <div className="absolute top-[38%] left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.10),transparent)]" />
        <div className="absolute top-[52%] left-[62%] h-[360px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(6_182_212/0.08),transparent)]" />
      </div>

      <Container className="pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-slide-in">
            <Badge>
              <span className="size-1.5 rounded-full bg-accent-500" aria-hidden="true" />
              AI-powered document intelligence
            </Badge>
          </div>
          <h1
            id="hero-title"
            className="mt-6 animate-slide-in text-balance text-[40px] leading-[1.05] font-semibold tracking-[-0.04em] text-ink [animation-delay:60ms] sm:text-6xl lg:text-[68px]"
          >
            Turn business documents into data your systems can actually use.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-slide-in text-pretty text-base leading-relaxed text-muted [animation-delay:120ms] sm:text-lg">
            DocsFlow AI extracts, understands, and structures information from documents so your team can automate
            workflows without manually copying data from PDFs, scans, forms, and images.
          </p>
          <div className="mt-9 flex animate-slide-in flex-col items-center justify-center gap-3 [animation-delay:180ms] sm:flex-row">
            <ButtonLink href="/signup" size="lg" className="w-full sm:w-auto" arrow>
              Start Free
            </ButtonLink>
            <ButtonLink href="/product" variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore the Platform
            </ButtonLink>
          </div>
          <p className="mt-5 animate-slide-in text-[13px] text-slate-500 [animation-delay:220ms]">
            No complicated setup. Built for developers and operations teams.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-[1120px] animate-fade-in [animation-delay:300ms] sm:mt-20">
          <DocumentDemo />
        </div>
      </Container>
    </section>
  );
}
