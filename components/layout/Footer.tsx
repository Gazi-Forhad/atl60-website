import Link from "next/link";
import { nav, site, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/Icons";
import { Wordmark } from "@/components/ui/Brand";
import { Marquee } from "@/components/ui/Marquee";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-cream">
      <div className="container-x">
        <div className="flex flex-col gap-3 border-b border-cream/10 pb-12 md:flex-row md:items-end md:justify-between">
          <p className="eyebrow flex items-center gap-3 text-cream/60">
            <span className="size-2 rounded-full bg-red" aria-hidden />
            <span className="text-cream">01:00</span>
            <span className="h-px w-8 bg-cream/30" aria-hidden />
            That&apos;s a wrap
          </p>
          <p className="display text-[clamp(1.6rem,3.2vw,2.8rem)]">
            The city. <span className="serif-accent text-red">The food.</span> The experience.
          </p>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-sm text-cream/70">
              Atlanta&apos;s food and lifestyle media brand, made for and by Atlanteans, new and old. Restaurant
              features, UGC and event coverage across Metro Atlanta.
            </p>
            <Link
              href="/collaborate"
              className="mt-6 inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-red [font-stretch:85%] hover:text-cream"
            >
              Book a collaboration →
            </Link>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <p className="eyebrow mb-4 text-cream/45">Navigate</p>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-red">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-4 text-cream/45">Follow</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-red">
                    <SocialIcon id={s.id} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic lg:col-span-3">
            <p className="eyebrow mb-4 text-cream/45">Contact</p>
            <ul className="space-y-2 text-cream/85">
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-red">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="hover:text-red">
                  {site.contact.phone}
                </a>
              </li>
              <li className="text-cream/60">
                {site.contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </li>
            </ul>
          </address>
        </div>
      </div>

      <Marquee
        items={["Atlanta, one bite at a time", "Food reviews", "UGC", "Food marketing", "Navigating metro cities"]}
        className="border-y border-cream/10 py-4"
        itemClassName="display text-[clamp(1.4rem,2.6vw,2.2rem)] text-cream/25"
        duration={60}
      />

      <div className="container-x overflow-hidden pt-10">
        <Link href="/" className="flex justify-center transition-opacity hover:opacity-90" aria-label="ATL in 60 Seconds, back to home">
          <Wordmark className="text-[clamp(2.6rem,13.6vw,16.5rem)] text-cream" />
        </Link>
      </div>

      <div className="container-x flex flex-col gap-3 pb-10 pt-8 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:pb-24">
        <p>
          © <Year /> {site.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-cream">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-cream">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
