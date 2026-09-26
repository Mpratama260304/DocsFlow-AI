import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col px-5 py-6 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between">
          <Link href="/" aria-label="DocsFlow AI — home" className="rounded-md">
            <Logo />
          </Link>
          <Link href="/" className="text-sm text-muted transition-colors hover:text-ink">
            Back to website
          </Link>
        </header>
        <main id="main" className="flex flex-1 items-center py-12">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </main>
        <footer className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
          <span>
            © {siteConfig.copyrightYear} {siteConfig.name}
          </span>
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
        </footer>
      </div>

      <aside className="relative hidden overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-center lg:px-16" aria-hidden="true">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent)]" />
        <div className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.28),transparent)]" />
        <div className="relative mx-auto w-full max-w-md">
          <p className="text-3xl font-semibold tracking-[-0.03em] text-white">Documents in.</p>
          <p className="text-3xl font-semibold tracking-[-0.03em] text-slate-500">Reliable data out.</p>
          <div className="mt-10 overflow-hidden rounded-xl bg-white/[0.03] ring-1 ring-white/10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[11px] text-slate-400">
              <span>invoice_0428.pdf → output.json</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" /> completed
              </span>
            </div>
            <pre className="p-4 font-mono text-[12.5px] leading-6">
              <span className="text-slate-500">{"{"}</span>
              {"\n"}
              {[
                ["vendor", '"Northstar Technologies Ltd."'],
                ["invoice_number", '"INV-0428"'],
                ["invoice_date", '"2026-09-18"'],
                ["total", "4820.00"],
              ].map(([k, v], i, arr) => (
                <span key={k}>
                  {"  "}
                  <span className="text-[#93C5FD]">&quot;{k}&quot;</span>
                  <span className="text-slate-500">: </span>
                  <span className={v.startsWith('"') ? "text-[#A5F3FC]" : "text-[#FCD34D]"}>{v}</span>
                  {i < arr.length - 1 ? <span className="text-slate-500">,</span> : null}
                  {"\n"}
                </span>
              ))}
              <span className="text-slate-500">{"}"}</span>
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
