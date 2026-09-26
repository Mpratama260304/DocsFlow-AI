import "server-only";
import { reasonLabel, type ContactSubmission } from "./contact";
import { siteConfig } from "@/config/site";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

function formatText(msg: ContactSubmission): string {
  return [
    `Reason: ${reasonLabel(msg.reason)}`,
    `Name: ${msg.name}`,
    `Email: ${msg.email}`,
    `Company: ${msg.company || "—"}`,
    "",
    msg.message || "(no message)",
  ].join("\n");
}

/**
 * Delivers contact submissions using whichever channel is configured:
 * 1. Resend (RESEND_API_KEY + CONTACT_TO_EMAIL + CONTACT_FROM_EMAIL)
 * 2. A generic JSON webhook (CONTACT_WEBHOOK_URL), e.g. an internal service or automation tool
 * In development with nothing configured, submissions are logged to the server console.
 */
export async function deliverContactMessage(msg: ContactSubmission): Promise<DeliveryResult> {
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL } = process.env;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.general;
  const subject = `[${siteConfig.name}] ${reasonLabel(msg.reason)} — ${msg.name}`;

  try {
    if (RESEND_API_KEY && CONTACT_FROM_EMAIL && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: CONTACT_FROM_EMAIL, to: [to], reply_to: msg.email, subject, text: formatText(msg) }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        console.error(`[contact] Resend responded with ${res.status}`);
        return { ok: false, reason: "failed" };
      }
      return { ok: true };
    }

    if (CONTACT_WEBHOOK_URL) {
      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, ...msg, reasonLabel: reasonLabel(msg.reason), receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        console.error(`[contact] Webhook responded with ${res.status}`);
        return { ok: false, reason: "failed" };
      }
      return { ok: true };
    }
  } catch (error) {
    console.error("[contact] Delivery error", error instanceof Error ? error.message : error);
    return { ok: false, reason: "failed" };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[contact] No delivery channel configured. Development submission:\n${subject}\n${formatText(msg)}`);
    return { ok: true };
  }
  return { ok: false, reason: "not-configured" };
}
