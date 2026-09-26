import { StatusBadge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { features, isAvailable, type FeatureKey } from "@/config/features";

export const developerFeatures: { title: string; icon: IconName; description: string; feature: FeatureKey }[] = [
  { title: "REST API", icon: "code", description: "Programmatically send documents and retrieve structured results.", feature: "restApi" },
  { title: "Structured JSON", icon: "braces", description: "Receive predictable machine-readable outputs.", feature: "exportJson" },
  { title: "Webhooks", icon: "webhook", description: "Receive processing events automatically.", feature: "webhooks" },
  { title: "Custom Schemas", icon: "sliders", description: "Define exactly which fields your application expects.", feature: "customSchemas" },
  { title: "Batch Processing", icon: "layers", description: "Process multiple documents through a consistent workflow.", feature: "batchProcessing" },
  { title: "Developer Documentation", icon: "book", description: "Clear examples and implementation guides.", feature: "documentation" },
];

export const apiPreviewCode = `// Planned API design — preview, subject to change.
const API_URL = "https://api.docsflowai.net";

const form = new FormData();
form.append("file", invoicePdf);
form.append("schema", JSON.stringify(schema));

const res = await fetch(\`\${API_URL}/v1/extractions\`, {
  method: "POST",
  headers: { Authorization: \`Bearer \${API_KEY}\` },
  body: form,
});

const { status, data } = await res.json();
// status → "completed"
// data.invoice_number → "INV-0428"`;

export function DeveloperSection({ showLink = true }: { showLink?: boolean }) {
  const apiLive = isAvailable("restApi");
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24 lg:py-28" aria-labelledby="dev-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_70%_30%,#000,transparent)]" />
        <div className="absolute -top-40 right-0 h-[480px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.22),transparent)]" />
      </div>
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-400">Developers</p>
            <h2 id="dev-title" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              Built for software, not just dashboards.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Document intelligence is most useful when it runs inside the systems you already operate. We&apos;re building
              DocsFlow AI toward developer-centric workflows, so extraction can live inside your product rather than
              beside it.
            </p>
            {!apiLive ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
                Capabilities marked “Coming soon” are on our roadmap and not yet available. We&apos;ll only mark them
                available once they work in production.
              </p>
            ) : null}
            {showLink ? (
              <div className="mt-8">
                <TextLink href="/developers" className="text-accent-400 hover:text-accent-300">
                  Explore the developer platform
                </TextLink>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={100}>
            <CodeBlock
              code={apiPreviewCode}
              lang="js"
              filename="extract.ts"
              headerRight={<StatusBadge status={features.restApi.status} dark />}
              className="shadow-2xl shadow-black/40"
            />
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {developerFeatures.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 60} className="bg-ink p-5 transition-colors hover:bg-ink-800 sm:p-6">
              <div className="flex items-center justify-between gap-3 sm:items-start">
                <div className="flex min-w-0 items-center gap-3 sm:block">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent-400 ring-1 ring-white/10">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight sm:mt-5">{item.title}</h3>
                </div>
                <StatusBadge status={features[item.feature].status} hideAvailable dark />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:mt-2">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
