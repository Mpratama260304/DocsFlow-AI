import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-radial absolute inset-0" />
      </div>
      <header className="mx-auto flex h-16 w-full max-w-[1200px] items-center px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="DocsFlow AI — home" className="rounded-md">
          <Logo />
        </Link>
      </header>
      <main id="main" className="flex flex-1 items-center justify-center px-5 pb-24">
        <div className="max-w-md text-center">
          <p className="font-mono text-sm text-brand-600">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-ink">This page doesn&apos;t exist.</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The link may be outdated, or the page may have moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" arrow>
              Go to homepage
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </main>
    </div>
  );
}
