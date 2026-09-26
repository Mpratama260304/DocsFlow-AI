import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  if (!siteConfig.contact.security) {
    return new Response("Not found", { status: 404 });
  }
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const body = [
    `Contact: mailto:${siteConfig.contact.security}`,
    `Expires: ${expires}`,
    "Preferred-Languages: en",
    `Canonical: ${siteConfig.url}/.well-known/security.txt`,
    `Policy: ${siteConfig.url}/security#disclosure`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
