"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/Icons";

export const collabTypes = [
  { value: "features", label: "Food & Restaurant Feature" },
  { value: "ugc", label: "UGC & Content Creation" },
  { value: "collaborations", label: "Brand Collaboration & Marketing" },
  { value: "events", label: "Event / Interview Coverage" },
  { value: "other", label: "Something else" },
] as const;

const budgets = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];

type Status = "idle" | "sending" | "success" | "error" | "not_configured";
type Errors = Partial<Record<"name" | "business" | "email" | "type" | "message", string>>;

const field =
  "peer w-full border-0 border-b border-cream/25 bg-transparent px-0 pb-3 pt-6 text-lg text-cream placeholder-transparent outline-none transition-colors focus:border-red focus:ring-0 focus-visible:outline-none";
const labelCls =
  "pointer-events-none absolute left-0 top-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/55 transition-colors peer-focus:text-red";

/**
 * Section 9: collaboration form. Posts to /api/collaborate, which emails
 * the team via Resend once RESEND_API_KEY + CONTACT_TO_EMAIL are set.
 * Until then it says so honestly and offers email / Instagram DM.
 */
export function CollabForm({ defaultType = "features", compact = false }: { defaultType?: string; compact?: boolean }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [type, setType] = useState(defaultType);
  const [sentName, setSentName] = useState("");

  // Pre-select the collaboration type from ?type=… (service CTAs link here).
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && collabTypes.some((c) => c.value === t)) {
      const id = requestAnimationFrame(() => setType(t));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/collaborate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors };
      if (res.ok && json.ok) {
        setSentName(String(data.name ?? "").split(" ")[0]);
        setStatus("success");
        form.reset();
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        return;
      }
      setStatus(json.error === "not_configured" ? "not_configured" : "error");
    } catch {
      setStatus("error");
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-sm text-red">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col justify-center"
            role="status"
          >
            <p className="eyebrow text-red">● Message received</p>
            <p className="display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
              Got it{sentName ? `, ${sentName}` : ""}. <span className="serif-accent text-red">Talk soon.</span>
            </p>
            <p className="mt-4 max-w-md text-cream/70">
              We read every request ourselves. Expect a reply by email. In a hurry? DM us on Instagram {site.handle}.
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="eyebrow mt-8 self-start text-cream/70 underline underline-offset-4 hover:text-cream">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate={false}
            aria-describedby={`${uid}-privacy`}
            className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
          >
            {/* Honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="relative">
              <input id={`${uid}-name`} name="name" required autoComplete="name" placeholder="Your name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
              <label htmlFor={`${uid}-name`} className={labelCls}>
                Name *
              </label>
              {err("name")}
            </div>
            <div className="relative">
              <input id={`${uid}-business`} name="business" required autoComplete="organization" placeholder="Business name" className={field} aria-invalid={!!errors.business} aria-describedby={errors.business ? `${uid}-business-err` : undefined} />
              <label htmlFor={`${uid}-business`} className={labelCls}>
                Business name *
              </label>
              {err("business")}
            </div>
            <div className="relative">
              <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" placeholder="Email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
              <label htmlFor={`${uid}-email`} className={labelCls}>
                Email *
              </label>
              {err("email")}
            </div>
            <div className="relative">
              <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={field} />
              <label htmlFor={`${uid}-phone`} className={labelCls}>
                Phone
              </label>
            </div>

            <div className="relative">
              <select
                id={`${uid}-type`}
                name="type"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={cn(field, "cursor-pointer appearance-none bg-[length:12px] bg-[right_4px_center] bg-no-repeat pr-8")}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23f4efe6' stroke-width='1.6'/%3E%3C/svg%3E\")",
                }}
              >
                {collabTypes.map((c) => (
                  <option key={c.value} value={c.value} className="bg-ink">
                    {c.label}
                  </option>
                ))}
              </select>
              <label htmlFor={`${uid}-type`} className={labelCls}>
                Collaboration type *
              </label>
              {err("type")}
            </div>
            <div className="relative">
              <select
                id={`${uid}-budget`}
                name="budget"
                defaultValue=""
                className={cn(field, "cursor-pointer appearance-none bg-[length:12px] bg-[right_4px_center] bg-no-repeat pr-8")}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23f4efe6' stroke-width='1.6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="" className="bg-ink">
                  Prefer not to say
                </option>
                {budgets.map((b) => (
                  <option key={b} value={b} className="bg-ink">
                    {b}
                  </option>
                ))}
              </select>
              <label htmlFor={`${uid}-budget`} className={labelCls}>
                Budget range (optional)
              </label>
            </div>

            <div className="relative sm:col-span-2">
              <textarea
                id={`${uid}-message`}
                name="message"
                required
                minLength={10}
                rows={compact ? 3 : 4}
                placeholder="Project description"
                className={cn(field, "resize-none")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${uid}-message-err` : undefined}
              />
              <label htmlFor={`${uid}-message`} className={labelCls}>
                Tell us about your project *
              </label>
              {err("message")}
            </div>

            <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p id={`${uid}-privacy`} className="max-w-xs text-xs text-cream/45">
                We only use your details to reply to this request. See our{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-cream">
                  Privacy Policy
                </a>
                .
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex h-14 items-center justify-between gap-5 overflow-hidden rounded-full bg-red pl-7 pr-2 font-display text-[0.95rem] font-bold uppercase tracking-[0.06em] text-cream transition-colors [font-stretch:85%] hover:bg-cream hover:text-ink disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send request"}
                <span className="grid size-10 place-items-center rounded-full bg-ink/25 text-lg transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowRight />
                </span>
              </button>
            </div>

            {(status === "error" || status === "not_configured") && (
              <div role="alert" className="rounded-xl border border-red/50 bg-red/10 p-4 text-sm text-cream/85 sm:col-span-2">
                {status === "not_configured" ? (
                  <>
                    This preview isn&apos;t connected to an inbox yet. Email{" "}
                    <a className="underline" href={`mailto:${site.contact.email}?subject=Collaboration%20request`}>
                      {site.contact.email}
                    </a>{" "}
                    or DM{" "}
                    <a className="underline" href="https://www.instagram.com/atlin60sec/" target="_blank" rel="noopener noreferrer">
                      {site.handle}
                    </a>{" "}
                    on Instagram.
                  </>
                ) : (
                  <>
                    Something went wrong sending that. Please try again, or email{" "}
                    <a className="underline" href={`mailto:${site.contact.email}`}>
                      {site.contact.email}
                    </a>
                    .
                  </>
                )}
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
