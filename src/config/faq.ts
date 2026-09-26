import { features, isAvailable, supportedInputs } from "./features";
import { siteConfig } from "./site";

export interface FaqItem {
  question: string;
  answer: string;
}

const ROADMAP = "Not yet. This capability is currently on our roadmap.";

function exportFormats(): string {
  const formats = [
    isAvailable("exportJson") && "JSON",
    isAvailable("exportCsv") && "CSV",
    isAvailable("exportExcel") && "Excel-compatible files",
  ].filter(Boolean) as string[];
  if (formats.length === 0) return ROADMAP;
  const list = formats.length > 1 ? `${formats.slice(0, -1).join(", ")} and ${formats.at(-1)}` : formats[0];
  return `Extracted data can currently be exported as ${list}. ${
    isAvailable("restApi") ? "Results are also available through the API." : "API delivery and webhooks are on our roadmap."
  }`;
}

export const homeFaq: FaqItem[] = [
  {
    question: "What is DocsFlow AI?",
    answer:
      "DocsFlow AI is an AI-powered document processing platform. It reads business documents such as invoices, receipts, forms, and statements, and turns the information inside them into structured data that software, spreadsheets, and automations can use.",
  },
  {
    question: "What types of documents can DocsFlow AI process?",
    answer: `DocsFlow AI accepts ${supportedInputs.slice(0, -1).join(", ")} and ${supportedInputs.at(-1)!.toLowerCase()}. It is designed for common business documents like invoices, receipts, purchase orders, bank statements, forms, contracts, and shipping documents. Results depend on document quality and layout, which is why every extraction can be reviewed before it is used.`,
  },
  {
    question: "How does document extraction work?",
    answer:
      "When you upload a document, DocsFlow AI analyzes its layout and content, identifies the relevant fields using AI models that consider context rather than fixed coordinates, and returns the values as structured output. You can inspect the extracted values before exporting them.",
  },
  {
    question: "Can I define my own fields?",
    answer: isAvailable("customSchemas")
      ? "Yes. Custom schemas let you define the exact fields and types your workflow expects, and DocsFlow AI structures its output around them."
      : `${ROADMAP} Custom schemas will let you define the exact fields and types your workflow expects.`,
  },
  {
    question: "What output formats are available?",
    answer: exportFormats(),
  },
  {
    question: "Is there an API?",
    answer: isAvailable("restApi")
      ? "Yes. The REST API lets you send documents programmatically and retrieve structured results."
      : `${ROADMAP} We are designing a REST API for sending documents and retrieving structured results programmatically. You can follow progress on our Developers page.`,
  },
  {
    question: "How is document data handled?",
    answer:
      "Documents are processed only to deliver the service you request. We follow data-minimization principles, design access around authenticated accounts, and aim to be transparent about how uploaded files are stored and deleted. Our Security page and Privacy Policy describe current practices in detail.",
  },
  {
    question: "Can I use DocsFlow AI in my own software?",
    answer:
      features.restApi.status === "available"
        ? "Yes. You can integrate DocsFlow AI through the REST API and receive structured JSON results in your own application."
        : "Today you can export structured data from the dashboard as JSON, CSV, or Excel-compatible files and use it in your own systems. Direct programmatic integration through an API is on our roadmap.",
  },
  {
    question: "Where is DocsFlow AI available?",
    answer: `DocsFlow AI is a web-based service built for teams internationally. If you have specific regional or data-residency requirements, contact us${
      siteConfig.contact.general ? ` at ${siteConfig.contact.general}` : ""
    } so we can give you an accurate answer.`,
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: "Is the Free plan really free?",
    answer: "Yes. The Free plan is intended for evaluating DocsFlow AI with your own documents at no cost.",
  },
  {
    question: "When will Starter and Pro be available?",
    answer:
      "We're finalizing paid plans alongside upcoming capabilities like custom schemas and API access. Get in touch and we'll let you know when they launch.",
  },
  {
    question: "Do you offer custom agreements?",
    answer: "For higher volumes, team requirements, or custom workflows, contact us and we'll discuss what fits your needs.",
  },
  {
    question: "Will pricing change?",
    answer:
      "As an early-stage company, we expect pricing to evolve. Any changes will be published on this page before they take effect for existing accounts.",
  },
];
