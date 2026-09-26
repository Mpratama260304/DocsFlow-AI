import type { Metadata } from "next";
import { ContactLine, LegalPage, OperatorLine, type LegalSection } from "@/components/marketing/LegalPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms that apply to your use of the DocsFlow AI website and document processing service.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement",
    content: (
      <>
        <OperatorLine />
        <p>
          By accessing or using the DocsFlow AI website or service, you agree to these Terms. If you use DocsFlow AI on
          behalf of an organization, you confirm that you are authorized to accept these Terms for that organization.
        </p>
      </>
    ),
  },
  {
    id: "service",
    title: "The service",
    content: (
      <p>
        DocsFlow AI provides AI-powered tools for extracting and structuring information from documents. The service is
        under active development. Features may change, and capabilities described as &ldquo;Coming soon&rdquo; are
        plans, not commitments.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts",
    content: (
      <p>
        You are responsible for keeping your account credentials secure and for activity that happens under your
        account. Tell us promptly if you believe your account has been compromised.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Upload documents you do not have the right to process.</li>
          <li>Use the service for unlawful purposes or to process unlawful content.</li>
          <li>Attempt to disrupt, overload, or gain unauthorized access to the service or other accounts.</li>
          <li>Reverse engineer the service or use it to build a competing product, except where law permits.</li>
        </ul>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content",
    content: (
      <p>
        You keep ownership of the documents you upload and the data extracted from them. You grant us a limited
        permission to host, process, and transmit that content only as needed to provide and secure the service for you.
      </p>
    ),
  },
  {
    id: "ai-output",
    title: "AI-generated output",
    content: (
      <p>
        Extraction results are produced by automated systems and may be incomplete or inaccurate, especially for
        low-quality or unusual documents. You are responsible for reviewing results before relying on them for
        financial, legal, or operational decisions.
      </p>
    ),
  },
  {
    id: "fees",
    title: "Plans and fees",
    content: (
      <p>
        The Free plan is offered at no charge and may be subject to usage limits. If paid plans are introduced, prices
        and terms will be presented before you subscribe, and we will give notice before changing fees for existing
        subscriptions.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Our intellectual property",
    content: (
      <p>
        The DocsFlow AI service, website, brand, and software are owned by us and protected by intellectual property
        laws. These Terms do not grant you rights to our trademarks or brand assets.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>
        The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent permitted by law, we
        disclaim warranties of any kind, including implied warranties of merchantability, fitness for a particular
        purpose, and non-infringement.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <p>
        To the extent permitted by law, we will not be liable for indirect, incidental, special, consequential, or
        punitive damages, or for loss of profits, revenue, or data, arising from your use of the service.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    content: (
      <p>
        You may stop using the service at any time. We may suspend or terminate access if you violate these Terms or if
        needed to protect the service or other users.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    content: (
      <p>
        We may update these Terms as the service evolves. We will update the date at the top of this page and, for
        material changes, provide notice where appropriate.
      </p>
    ),
  },
  ...(siteConfig.legal.governingLaw
    ? [
        {
          id: "governing-law",
          title: "Governing law",
          content: <p>These Terms are governed by the laws of {siteConfig.legal.governingLaw}.</p>,
        },
      ]
    : []),
  { id: "contact", title: "Contact", content: <ContactLine /> },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These Terms apply to the DocsFlow AI website and early-access service. They will be expanded as the platform becomes generally available."
      sections={sections}
    />
  );
}
