import type { Metadata } from "next";
import { photos } from "@/content/media";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { Formats } from "@/components/services/Formats";
import { CollabForm } from "@/components/forms/CollabForm";
import { Reveal, SplitReveal } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Timecode } from "@/components/ui/Timecode";

export const metadata: Metadata = {
  title: "Collaborate With Us | Book an Atlanta Food Influencer",
  description:
    "Book a restaurant feature, UGC package, influencer campaign or event coverage with ATL in 60 Seconds, Atlanta's food & lifestyle creators.",
  alternates: { canonical: "/collaborate" },
};

const audiences = [
  { title: "Restaurants", body: "New openings, hidden gems and established favorites that deserve a bigger crowd.", image: photos.restaurantRoom },
  { title: "Food trucks", body: "Rolling kitchens that need people to know where to find them this week.", image: photos.foodTruckBlue },
  { title: "Brands", body: "Food, beverage and lifestyle brands that want real local reach.", image: photos.cocktailDark },
  { title: "Events", body: "Openings, festivals, pop-ups and big-game weekends.", image: photos.crowd },
];

export default function CollaboratePage() {
  return (
    <>
      <PageHero
        code="00:54"
        label="Collaborate with us"
        title={
          <>
            Let&apos;s make Atlanta <span className="serif-accent text-red">hungry.</span>
          </>
        }
        intro="Your business deserves to be seen. Tell us what you're working on and we'll come back with the right way to put it in front of Atlanta."
        aside={
          <a
            href="#form"
            className="group inline-flex items-center gap-4 rounded-full bg-red py-2 pl-6 pr-2 font-display text-lg font-bold uppercase tracking-wide text-cream [font-stretch:85%] hover:bg-cream hover:text-ink"
          >
            Jump to the form
            <span className="grid size-11 place-items-center rounded-full bg-ink/25 transition-transform group-hover:translate-y-1">↓</span>
          </a>
        }
      />

      <section className="bg-ink pb-24" aria-labelledby="who-title">
        <div className="container-x">
          <Timecode code="01" label="Who we work with" />
          <h2 id="who-title" className="sr-only">
            Who we work with
          </h2>
          <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {audiences.map((a) => (
              <article key={a.title} className="group relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-coal-2">
                <Img src={a.image} alt="" fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 94vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="display text-4xl">{a.title}</h3>
                  <p className="mt-2 text-sm text-cream/75">{a.body}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="border-t border-cream/10 bg-ink py-24 md:py-32" aria-labelledby="formats-title">
        <div className="container-x">
          <Timecode code="02" label="Formats" />
          <SplitReveal id="formats-title" className="display mb-14 mt-8 text-[clamp(2.6rem,6vw,6rem)]">
            Pick your <span className="serif-accent text-red">format.</span>
          </SplitReveal>
          <Formats />
        </div>
      </section>

      <section id="form" className="scroll-mt-24 bg-red py-24 text-ink md:py-32" aria-labelledby="form-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Timecode code="03" label="Tell us about it" tone="ink" />
            <SplitReveal id="form-title" className="display mt-8 text-[clamp(2.8rem,6vw,6.4rem)]">
              Book a <span className="serif-accent">collaboration.</span>
            </SplitReveal>
            <p className="mt-6 max-w-sm text-lg text-ink/80">
              The more you tell us (menu, dates, goals), the faster we can come back with a plan.
            </p>
            <div className="mt-10 grid gap-1 font-mono text-sm text-ink/80">
              <a href={`mailto:${site.contact.email}`} className="hover:text-ink">
                {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className="hover:text-ink">
                {site.contact.phone}
              </a>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-ink p-6 text-cream sm:p-10 lg:col-span-7">
            <CollabForm />
          </div>
        </div>
      </section>
    </>
  );
}
