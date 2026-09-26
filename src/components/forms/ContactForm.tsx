"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { submitContact } from "@/actions/contact";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  CONTACT_REASONS,
  initialContactState,
  isContactReason,
  LIMITS,
  type ContactField,
  type ContactReason,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

interface ContactFormProps {
  defaultReason?: ContactReason;
  variant?: "contact" | "early-access";
}

export function ContactForm({ defaultReason, variant = "contact" }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const [dismissed, setDismissed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const earlyAccess = variant === "early-access";

  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const first = Object.keys(state.errors)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state.status === "success" && !dismissed) {
    return (
      <div className="animate-fade-in rounded-2xl border border-line bg-white p-8 text-center shadow-card" role="status">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/15">
          <Icon name="check" size={24} strokeWidth={2} />
        </span>
        <h2 className="mt-5 text-lg font-semibold text-ink">{earlyAccess ? "You're on the list" : "Message sent"}</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          {earlyAccess
            ? "Thanks for your interest in DocsFlow AI. We'll email you as soon as your account can be created."
            : "Thanks for reaching out. We read every message and will reply by email."}
          {state.values?.email ? (
            <>
              {" "}
              We&apos;ll use <span className="font-medium text-ink">{state.values.email}</span>.
            </>
          ) : null}
        </p>
        {!earlyAccess ? (
          <button type="button" onClick={() => setDismissed(true)} className="mt-6 text-sm font-medium text-brand-600 hover:text-brand-700">
            Send another message
          </button>
        ) : null}
      </div>
    );
  }

  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const reasonDefault = values.reason && isContactReason(values.reason) ? values.reason : defaultReason ?? "";

  return (
    <form
      key={state.ts ?? 0}
      ref={formRef}
      action={formAction}
      onSubmit={() => setDismissed(false)}
      noValidate
      className="space-y-5"
      aria-describedby={state.status === "error" && state.message ? "form-status" : undefined}
    >
      {state.status === "error" && state.message ? (
        <div id="form-status" role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <Icon name="info" size={18} className="mt-px shrink-0" />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            defaultValue={values.name}
            className={inputClasses(!!errors.name)}
            {...describedBy("name", errors)}
          />
        </Field>
        <Field id="email" label="Work Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            defaultValue={values.email}
            className={inputClasses(!!errors.email)}
            {...describedBy("email", errors)}
          />
        </Field>
      </div>

      <div className={cn("grid gap-5", !earlyAccess && "sm:grid-cols-2")}>
        <Field id="company" label="Company" optional error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            defaultValue={values.company}
            className={inputClasses(!!errors.company)}
            {...describedBy("company", errors)}
          />
        </Field>
        {earlyAccess ? (
          <input type="hidden" name="reason" value="early-access" />
        ) : (
          <Field id="reason" label="Reason for Contact" error={errors.reason}>
            <div className="relative">
              <select
                id="reason"
                name="reason"
                required
                defaultValue={reasonDefault}
                className={cn(inputClasses(!!errors.reason), "appearance-none pr-10")}
                {...describedBy("reason", errors)}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                {CONTACT_REASONS.filter((r) => r.value !== "early-access").map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </Field>
        )}
      </div>

      <Field
        id="message"
        label={earlyAccess ? "What documents would you like to process?" : "Message"}
        optional={earlyAccess}
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows={earlyAccess ? 3 : 6}
          required={!earlyAccess}
          maxLength={LIMITS.message}
          defaultValue={values.message}
          placeholder={earlyAccess ? "e.g. supplier invoices and receipts" : "Tell us a bit about what you're working on."}
          className={cn(inputClasses(!!errors.message), "h-auto resize-y py-3 leading-relaxed")}
          {...describedBy("message", errors)}
        />
      </Field>

      {/* Honeypot field for bots; hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate-500">
          We only use these details to respond to you. See our{" "}
          <Link href="/privacy" className="underline decoration-slate-300 underline-offset-2 hover:text-ink">
            Privacy Policy
          </Link>
          .
        </p>
        <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {pending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              Sending…
            </>
          ) : earlyAccess ? (
            "Request access"
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
}

/** Reads `?topic=` to preselect a reason, e.g. /contact?topic=business. */
export function ContactFormWithTopic() {
  const topic = useSearchParams().get("topic");
  return <ContactForm defaultReason={isContactReason(topic) ? topic : undefined} />;
}

function inputClasses(invalid: boolean) {
  return cn(
    "block h-11 w-full rounded-lg border bg-white px-3.5 text-[15px] text-ink shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-4",
    invalid ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "border-line-strong/80 hover:border-slate-400 focus:border-brand-500 focus:ring-brand-500/10",
  );
}

function describedBy(field: ContactField, errors: Partial<Record<ContactField, string>>) {
  return errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {};
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: ContactField;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional ? <span className="text-xs font-normal text-slate-400">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
