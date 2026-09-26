"use server";

import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { type ContactField, type ContactState, validateContact } from "@/lib/contact";
import { deliverContactMessage } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";

const FIELDS: ContactField[] = ["name", "email", "company", "reason", "message"];

function fallbackMessage(): string {
  return siteConfig.contact.general
    ? `Please try again later or email us directly at ${siteConfig.contact.general}.`
    : "Please try again later.";
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(
    FIELDS.map((f) => {
      const value = formData.get(f);
      return [f, typeof value === "string" ? value.slice(0, 6000) : ""];
    }),
  ) as Record<ContactField, string>;

  // Honeypot: real users never see or fill this field.
  const trap = formData.get("website");
  if (typeof trap === "string" && trap.trim() !== "") {
    return { status: "success" };
  }

  const result = validateContact(raw);
  if (!result.ok) {
    return { status: "error", message: "Please check the highlighted fields.", errors: result.errors, values: raw, ts: Date.now() };
  }

  const h = await headers();
  const ip = h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return {
      status: "error",
      message: "You've sent several messages in a short time. Please wait a few minutes and try again.",
      values: raw,
      ts: Date.now(),
    };
  }

  const delivery = await deliverContactMessage(result.data);
  if (!delivery.ok) {
    return { status: "error", message: `We couldn't send your message right now. ${fallbackMessage()}`, values: raw, ts: Date.now() };
  }

  return { status: "success", values: { email: result.data.email } };
}
