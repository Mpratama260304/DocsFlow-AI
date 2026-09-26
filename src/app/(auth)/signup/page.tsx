import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { pricingPlans } from "@/config/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Start Free",
  description: "Request early access to DocsFlow AI and start turning business documents into structured data.",
  path: "/signup",
  noIndex: true,
});

export default function SignupPage() {
  // Replace this early-access form with real account creation once self-serve accounts launch.
  const freePlan = pricingPlans.find((p) => p.id === "free");

  return (
    <div className="animate-slide-in">
      <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Start with DocsFlow AI</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        Self-serve accounts are opening soon. Request early access and we&apos;ll set up your Free workspace as soon as
        it&apos;s ready.
      </p>

      {freePlan ? (
        <ul className="mt-6 grid gap-2 rounded-xl border border-line bg-subtle p-4 text-sm text-slate-700">
          {freePlan.features.slice(0, 4).map((f) => (
            <li key={f} className="flex gap-2.5">
              <Icon name="check" size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-brand-600" />
              {f}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8">
        <ContactForm variant="early-access" />
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Already have access?{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
