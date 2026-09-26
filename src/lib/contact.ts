/** Shared between the client form and the server action. Contains no server-only code. */

export const CONTACT_REASONS = [
  { value: "product", label: "Product questions" },
  { value: "business", label: "Business inquiries" },
  { value: "partnerships", label: "Partnerships" },
  { value: "technical", label: "Technical questions" },
  { value: "early-access", label: "Early access" },
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number]["value"];
export type ContactField = "name" | "email" | "company" | "reason" | "message";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
  /** Changes on every error response so the form remounts with the returned values. */
  ts?: number;
}

export const initialContactState: ContactState = { status: "idle" };

export function isContactReason(value: string | null | undefined): value is ContactReason {
  return CONTACT_REASONS.some((r) => r.value === value);
}

export function reasonLabel(value: ContactReason): string {
  return CONTACT_REASONS.find((r) => r.value === value)?.label ?? value;
}

export const LIMITS = { name: 100, email: 254, company: 120, message: 5000, messageMin: 10 } as const;

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  reason: ContactReason;
  message: string;
}

export function validateContact(input: Record<ContactField, string>):
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: Partial<Record<ContactField, string>> } {
  const errors: Partial<Record<ContactField, string>> = {};
  // Strip control characters (including CR/LF) from single-line fields.
  const singleLine = (v: string) => v.replace(/[\u0000-\u001F\u007F]+/g, " ").trim();

  const name = singleLine(input.name);
  const email = singleLine(input.email).toLowerCase();
  const company = singleLine(input.company);
  const reason = input.reason;
  const message = input.message.replace(/\r\n/g, "\n").trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your work email.";
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  if (company.length > LIMITS.company) errors.company = `Please keep this under ${LIMITS.company} characters.`;

  if (!isContactReason(reason)) errors.reason = "Please choose a reason for contacting us.";

  const messageRequired = reason !== "early-access";
  if (messageRequired && message.length < LIMITS.messageMin) errors.message = "Please add a few more details so we can help.";
  else if (message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, company, reason: reason as ContactReason, message } };
}
