"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Tracking the path the menu was opened on closes it automatically after navigation.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const close = () => setMenuPath(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-line/80 bg-white/80 backdrop-blur-lg backdrop-saturate-150" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="DocsFlow AI — home" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.href) ? "font-medium text-ink" : "text-slate-600 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:text-ink lg:inline-flex">
            Sign in
          </Link>
          <div className="hidden xl:block">
            <ButtonLink href="/contact" variant="secondary" size="sm">
              Talk to Us
            </ButtonLink>
          </div>
          <div className="hidden sm:block">
            <ButtonLink href="/signup" size="sm">
              Start Free
            </ButtonLink>
          </div>
          <button
            type="button"
            className="-mr-2 inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-slate-100 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>

      {/* Kept outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      {open ? (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto flex min-h-full max-w-[1200px] flex-col px-5 pt-4 pb-8 sm:px-6"
            onClick={(e) => (e.target as HTMLElement).closest("a") && close()}
          >
            <ul className="divide-y divide-line">
              {mainNav.map((item, i) => (
                <li key={item.href} className="animate-slide-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 text-[17px] font-medium text-ink"
                  >
                    {item.label}
                    <Icon name="arrowRight" size={18} className="text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto grid gap-3 pt-8">
              <ButtonLink href="/signup" size="lg">
                Start Free
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Talk to Us
              </ButtonLink>
              <Link href="/login" className="py-2 text-center text-sm text-muted hover:text-ink">
                Sign in
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
