import type { Metadata } from "next";
import { ContactLine, LegalPage, type LegalSection } from "@/components/marketing/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How the DocsFlow AI website uses cookies and similar technologies.",
  path: "/cookies",
});

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What cookies are",
    content: (
      <p>
        Cookies are small text files that websites store in your browser. Similar technologies, such as local storage,
        work in comparable ways. They can be used to keep you signed in, remember preferences, or measure usage.
      </p>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use cookies",
    content: (
      <>
        <p>
          The DocsFlow AI website does not currently use advertising, analytics, or cross-site tracking cookies, and it
          does not load third-party tracking scripts.
        </p>
        <p>
          When sign-in becomes available, we will use strictly necessary cookies to keep your session secure. These are
          required for the service to work and do not track you across other websites.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Future changes",
    content: (
      <p>
        If we introduce analytics or other non-essential cookies, we will update this policy first and ask for your
        consent where required by law.
      </p>
    ),
  },
  {
    id: "managing",
    title: "Managing cookies",
    content: (
      <p>
        Most browsers let you view, block, and delete cookies in their settings. Blocking strictly necessary cookies may
        prevent parts of the service, such as sign-in, from working.
      </p>
    ),
  },
  { id: "contact", title: "Contact", content: <ContactLine /> },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro="In short: this website does not use advertising or analytics cookies today."
      sections={sections}
    />
  );
}
