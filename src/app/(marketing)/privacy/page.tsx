import type { Metadata } from "next";
import { ContactLine, LegalPage, OperatorLine, type LegalSection } from "@/components/marketing/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How DocsFlow AI collects, uses, and protects information, including documents uploaded for processing.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <OperatorLine />
        <p>This Privacy Policy explains what information we collect, how we use it, and the choices you have.</p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>Depending on how you interact with DocsFlow AI, we may collect:</p>
        <ul>
          <li>
            <strong>Contact and early-access requests:</strong> your name, work email, company, reason for contacting
            us, and the content of your message.
          </li>
          <li>
            <strong>Account information:</strong> when accounts are available, the details needed to create and secure
            your account.
          </li>
          <li>
            <strong>Documents and results:</strong> files you upload for processing and the structured data extracted
            from them.
          </li>
          <li>
            <strong>Technical data:</strong> limited server logs such as IP address, browser type, and request
            timestamps, used to operate and secure the service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    content: (
      <ul>
        <li>To provide the service, including processing documents and returning extracted data to you.</li>
        <li>To respond to messages and early-access requests.</li>
        <li>To secure the service, prevent abuse, and troubleshoot problems.</li>
        <li>To communicate important changes to the service or these policies.</li>
      </ul>
    ),
  },
  {
    id: "document-data",
    title: "Document data",
    content: (
      <>
        <p>
          Documents you upload are processed to deliver the extraction you requested. They are associated with your
          account and are not shared with other customers. We do not sell document contents or personal information.
        </p>
        <p>
          We may use third-party infrastructure and AI model providers to process documents on our behalf. Where we do,
          they act as our service providers and may only process data to help deliver the service.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Our website does not currently use advertising or analytics cookies. See our <a href="/cookies">Cookie Policy</a>{" "}
        for details.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "When we share information",
    content: (
      <ul>
        <li>With service providers that help us operate DocsFlow AI, such as hosting and email delivery providers.</li>
        <li>When required by law or to protect the rights, safety, and security of our users and the service.</li>
        <li>As part of a merger, acquisition, or similar transaction, subject to this policy.</li>
      </ul>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    content: (
      <p>
        We keep information only as long as needed for the purposes described here. Messages sent through our contact
        form are kept as long as needed to respond and follow up. Uploaded documents and extraction results are kept
        while needed to provide the service to your account, and you may request their deletion at any time. We will
        publish more specific retention periods as the platform becomes generally available.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We use reasonable technical and organizational measures to protect information. No system is perfectly secure,
        but we work to protect your data and are transparent about our practices. Learn more on our{" "}
        <a href="/security">Security page</a>.
      </p>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices and rights",
    content: (
      <p>
        You can ask us to access, correct, or delete information we hold about you. Depending on where you live, you may
        have additional rights under local law. To make a request, contact us using the details below and we will
        respond within a reasonable time.
      </p>
    ),
  },
  {
    id: "international",
    title: "International users",
    content: (
      <p>
        DocsFlow AI serves customers internationally. Your information may be processed in countries other than the one
        where you live, which may have different data protection rules.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: <p>DocsFlow AI is a business service and is not directed to children. We do not knowingly collect information from children.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We will update this policy as DocsFlow AI evolves. When we make material changes, we will update the date at the
        top of this page and, where appropriate, notify you.
      </p>
    ),
  },
  { id: "contact", title: "Contact", content: <ContactLine /> },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="DocsFlow AI is an early-stage company. This policy describes our current practices for the website and early-access program, and will be expanded before the platform becomes generally available."
      sections={sections}
    />
  );
}
