import type { Metadata } from "next";
import { site, socials } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { CollabForm } from "@/components/forms/CollabForm";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, Mail, Phone, Pin, SocialIcon } from "@/components/ui/Icons";
import { Timecode } from "@/components/ui/Timecode";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ATL in 60 Seconds for bookings, collaborations and press. Email, phone, Instagram and Facebook.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.addressLines.join(", "))}`;
  const cards = [
    { icon: <Mail />, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: <Phone />, label: "Phone", value: site.contact.phone, href: site.contact.phoneHref },
    { icon: <Pin />, label: "Mailing address", value: site.contact.addressLines.join(", "), href: mapsHref },
  ];

  return (
    <>
      <PageHero
        code="00:60"
        label="Contact"
        title={
          <>
            Say <span className="serif-accent text-red">hello.</span>
          </>
        }
        intro="Bookings, collaborations, press or a spot we need to try. Pick your channel. DMs are open too."
      />

      <section className="bg-ink pb-24" aria-label="Contact details">
        <div className="container-x">
          <Reveal className="grid gap-3 md:grid-cols-3" stagger={0.1}>
            {cards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex min-h-[200px] flex-col justify-between rounded-[1.25rem] border border-cream/10 bg-coal-2 p-6 transition-colors duration-500 hover:border-red hover:bg-red"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-cream text-xl text-ink">{c.icon}</span>
                  <ArrowUpRight className="text-xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="eyebrow text-cream/50 group-hover:text-cream/80">{c.label}</p>
                  <p className="mt-2 break-words text-xl">{c.value}</p>
                </div>
              </a>
            ))}
          </Reveal>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-full border border-cream/15 px-5 py-4 transition-colors hover:border-red hover:bg-red"
                >
                  <span className="flex items-center gap-3">
                    <SocialIcon id={s.id} className="text-xl" />
                    {s.label}
                  </span>
                  <span className="font-mono text-xs text-cream/60">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-cream/10 bg-ink py-24 md:py-32" aria-labelledby="contact-form-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Timecode code="→" label="Send a message" />
            <h2 id="contact-form-title" className="display mt-8 text-[clamp(2.6rem,5vw,5rem)]">
              Let&apos;s create <span className="serif-accent text-red">together.</span>
            </h2>
          </div>
          <div className="rounded-[1.5rem] border border-cream/10 bg-coal-2 p-6 sm:p-10 lg:col-span-8">
            <CollabForm defaultType="other" />
          </div>
        </div>
      </section>
    </>
  );
}
