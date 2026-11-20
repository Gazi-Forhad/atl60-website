/**
 * POST /api/collaborate
 * Validates the collaboration form and emails it to the team via Resend.
 *
 * Env (see .env.example):
 *   RESEND_API_KEY      Resend API key
 *   CONTACT_TO_EMAIL    inbox that receives requests (e.g. atlin60sec@gmail.com)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "ATL in 60 <hello@atlin60seconds.com>"
 *
 * Without the env vars it returns 503 { error: "not_configured" } so the UI can
 * tell the visitor plainly instead of pretending the message was sent.
 */

const TYPES = new Set(["features", "ugc", "collaborations", "events", "other"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const cleanMultiline = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (clean(body.company_website, 200)) return Response.json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    business: clean(body.business, 160),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    type: clean(body.type, 40),
    budget: clean(body.budget, 40),
    message: cleanMultiline(body.message, 4000),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please add your name.";
  if (data.business.length < 2) errors.business = "Please add your business name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please use a valid email address.";
  if (!TYPES.has(data.type)) errors.type = "Please choose a collaboration type.";
  if (data.message.length < 10) errors.message = "Tell us a little more (10+ characters).";
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "ATL in 60 Website <onboarding@resend.dev>";
  if (!key || !to) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  const text = [
    `New collaboration request`,
    ``,
    `Name:      ${data.name}`,
    `Business:  ${data.business}`,
    `Email:     ${data.email}`,
    `Phone:     ${data.phone || "-"}`,
    `Type:      ${data.type}`,
    `Budget:    ${data.budget || "-"}`,
    ``,
    data.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Collab request: ${data.business} (${data.type})`,
      text,
    }),
  });

  if (!res.ok) return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
