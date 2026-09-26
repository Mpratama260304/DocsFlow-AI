# DocsFlow AI — docsflowai.net

Marketing website for **DocsFlow AI**, an AI-powered document processing platform.
Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically prerendered)
npm start
```

Requires Node.js 20.9+.

## Project structure

```
src/
  app/
    (marketing)/     Public pages with navbar + footer (/, /product, /solutions, ...)
    (auth)/          /login and /signup placeholders (split-screen layout)
    .well-known/     security.txt (generated from config)
    robots.ts, sitemap.ts, manifest.ts, opengraph-image.tsx, twitter-image.tsx, icon.svg
  actions/           Server actions (contact / early-access form)
  components/
    brand/           Logo and mark
    layout/          Navbar, Footer
    marketing/       Page sections (Hero, DocumentDemo, DashboardPreview, SchemaDemo, Pricing, FAQ, CTA, ...)
    forms/           ContactForm
    ui/              Primitives (Button, Badge, CodeBlock, Icon, Reveal, WindowFrame)
  config/            Single source of truth for site content and product status
  lib/               Metadata, JSON-LD, validation, mail delivery, rate limiting, OG rendering
```

Marketing pages are isolated in the `(marketing)` route group, so an authenticated dashboard can be added later
(e.g. an `(app)` group) without touching the marketing layout.

## Configuration

Everything that must stay truthful lives in `src/config/`:

| File            | Controls                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------- |
| `site.ts`       | Domain, contact emails, social profiles, status/docs URLs, HTTPS flag, legal entity details |
| `features.ts`   | Status of every capability (`available`, `beta`, `coming-soon`) and supported input formats |
| `pricing.ts`    | Plans, prices, CTAs, and enforced usage limits                                              |
| `security.ts`   | Security principles and website-level protections                                           |
| `faq.ts`        | FAQ answers (roadmap answers switch automatically based on `features.ts`)                   |
| `navigation.ts` | Main and footer navigation                                                                  |

"Coming soon" badges, FAQ answers, the dashboard sidebar, pricing notes, and the Company page status list all read
from `features.ts`. Flip a capability to `available` only once it works in production.

Setting a value to `null` in `site.ts` hides it everywhere (e.g. social links, status page, security email).

## Contact form

The contact and early-access forms use a server action with server-side validation, a honeypot field, per-IP rate
limiting, and Next.js' built-in origin checks. Configure delivery via environment variables (see `.env.example`):

- **Resend**: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, optional `CONTACT_TO_EMAIL`
- **Webhook**: `CONTACT_WEBHOOK_URL` receives a JSON payload

The in-memory rate limiter is per instance; use a shared store if you run multiple instances.

## Security headers

`next.config.ts` sets a Content Security Policy, HSTS, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, and `Permissions-Policy` on every route.

## Before launch

- [ ] Confirm `hello@docsflowai.net` and `security@docsflowai.net` exist and are monitored (or set them to `null`)
- [ ] Confirm HTTPS is live on docsflowai.net (`siteConfig.httpsEnabled`)
- [ ] Review every status in `src/config/features.ts`
- [ ] Configure contact form delivery
- [ ] Have the Privacy Policy, Terms, and Cookie Policy reviewed by counsel; add legal entity details in `site.ts`
- [ ] Add real social profile, status page, and docs URLs once they exist