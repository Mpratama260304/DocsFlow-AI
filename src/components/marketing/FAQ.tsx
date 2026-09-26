import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { FaqItem } from "@/config/faq";

export function FAQList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-md py-4 text-left text-[15px] font-medium text-ink transition-colors hover:text-brand-700">
            {item.question}
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-slate-500 transition-transform duration-200 group-open:rotate-180">
              <Icon name="chevronDown" size={16} />
            </span>
          </summary>
          <p className="pr-12 pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FAQ({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-600">FAQ</p>
        <h2 id="faq-title" className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Straight answers about what DocsFlow AI does today and what is still on the roadmap.
        </p>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
          Ask us something else <Icon name="arrowRight" size={15} />
        </Link>
      </div>
      <FAQList items={items} />
    </div>
  );
}
