import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { isAvailable } from "@/config/features";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to your DocsFlow AI workspace.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  // Replace this placeholder with the real authentication flow once self-serve accounts launch.
  const accountsOpen = isAvailable("selfServeAccounts");

  return (
    <div className="animate-slide-in">
      <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Sign in</h1>
      <p className="mt-2 text-[15px] text-muted">Access your DocsFlow AI workspace.</p>

      <div className="mt-8 rounded-2xl border border-line bg-subtle p-6">
        <div className="flex gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-card ring-1 ring-line">
            <Icon name="lock" size={19} />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-ink">
              {accountsOpen ? "Sign-in is being connected" : "Accounts are opening soon"}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {accountsOpen
                ? "Sign-in for this environment is not configured yet. Please contact us if you need access."
                : "DocsFlow AI workspaces are being rolled out gradually. If you've requested early access, we'll email you as soon as your account is ready."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <ButtonLink href="/signup" size="lg" arrow>
          Request early access
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">
          Contact us
        </ButtonLink>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        New to DocsFlow AI?{" "}
        <Link href="/product" className="font-medium text-brand-600 hover:text-brand-700">
          Explore the platform
        </Link>
      </p>
    </div>
  );
}
