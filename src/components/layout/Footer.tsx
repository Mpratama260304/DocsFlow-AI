import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Layout";
import { SocialIcon } from "@/components/ui/Icon";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const socialLabels = { linkedin: "LinkedIn", github: "GitHub", x: "X" } as const;

export function Footer() {
  const socials = (Object.entries(siteConfig.social) as [keyof typeof socialLabels, string | null][]).filter(
    (entry): entry is [keyof typeof socialLabels, string] => Boolean(entry[1]),
  );

  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="DocsFlow AI — home" className="inline-block rounded-md">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{siteConfig.shortDescription}</p>
            {siteConfig.contact.general ? (
              <a
                href={`mailto:${siteConfig.contact.general}`}
                className="mt-5 inline-block text-sm font-medium text-ink transition-colors hover:text-brand-600"
              >
                {siteConfig.contact.general}
              </a>
            ) : null}
            {socials.length ? (
              <ul className="mt-6 flex gap-2" aria-label="Social profiles">
                {socials.map(([network, href]) => (
                  <li key={network}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`DocsFlow AI on ${socialLabels[network]}`}
                      className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 ring-1 ring-line transition-colors hover:text-ink"
                    >
                      <SocialIcon network={network} size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h2 className="text-[13px] font-semibold text-ink">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href === null ? (
                        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
                          <span className="whitespace-nowrap">{link.label}</span>
                          <span className="rounded-full bg-slate-100 px-1.5 py-px text-[10px] font-medium text-slate-500">Soon</span>
                        </span>
                      ) : link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-tight text-slate-400">{siteConfig.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
