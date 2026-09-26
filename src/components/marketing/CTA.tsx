import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

interface CTAProps {
  title?: string;
  description?: string;
}

export function CTA({
  title = "Turn documents into workflows.",
  description = "Start transforming business documents into structured data with DocsFlow AI.",
}: CTAProps) {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="cta-title">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000,transparent)]" />
              <div className="absolute bottom-[-40%] left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.35),transparent)]" />
              <div className="absolute bottom-[-30%] left-[65%] h-[300px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(6_182_212/0.18),transparent)]" />
            </div>
            <h2 id="cta-title" className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/signup" size="lg" className="w-full sm:w-auto" arrow>
                Start Free
              </ButtonLink>
              <ButtonLink href="/contact" variant="dark-outline" size="lg" className="w-full sm:w-auto">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
