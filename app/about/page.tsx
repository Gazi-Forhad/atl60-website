import type { Metadata } from "next";
import { photos } from "@/content/media";
import { site, stats } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { ClipReveal, Counter, Reveal, SplitReveal, WordScrub } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Timecode } from "@/components/ui/Timecode";
import { SpinBadge } from "@/components/ui/SpinBadge";
import { Testimonials } from "@/components/home/Testimonials";
import { CollabCTA } from "@/components/home/CollabCTA";

export const metadata: Metadata = {
  title: "About Us | Atlanta's Community-Driven Food & Lifestyle Media",
  description:
    "Since 2017, ATL in 60 Seconds has been out in Atlanta's streets, finding the food, people and stories that make the city special.",
  alternates: { canonical: "/about" },
};

/** Milestones taken from the client's YouTube channel history. VERIFY dates with the client. */
const timeline = [
  { year: "2017", title: "The channel goes live", body: "ATL in 60 Seconds starts as a web series for and by Atlanteans, covering the buzz in the city in one minute flat." },
  { year: "2020", title: "Showing up for the city", body: "Food trucks come back, restaurants fight through COVID-19, and we cover community food distribution with the Atlanta Survival Program." },
  { year: "2021", title: "The show grows", body: "Hosts, guests and a new season of the talk-show format. Plus a steady stream of shorts helping local businesses get seen." },
  { year: "Today", title: "Atlanta's foodie influencers", body: "Food reviews, food marketing and UGC across Instagram and Facebook, navigating metro cities one bite at a time." },
];

/** Creator slots. Swap in real portraits, names and bios from the client. */
const crew = [
  { role: "Founder & Host", note: "Add portrait + short bio", image: photos.cameraTall },
  { role: "Food Host", note: "Add portrait + short bio", image: photos.phoneShootTall },
  { role: "Camera & Edit", note: "Add portrait + short bio", image: photos.cameraNeon },
];

const values = [
  { k: "Real first", v: "Our first bite is honest. That's why people trust where we send them." },
  { k: "Community driven", v: "We're out in the streets, talking to real people, not reading press releases." },
  { k: "Sixty seconds", v: "No filler. Everything you need to decide where to eat tonight." },
  { k: "Local always", v: "Atlanta and the metro cities. Our city, our people, our businesses." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        code="00:48"
        label="About us"
        titleSize="text-[clamp(3rem,8.2vw,9.4rem)]"
        title={
          <>
            We don&apos;t just visit Atlanta. <span className="serif-accent text-red">We experience it.</span>
          </>
        }
        intro="At ATL in 60 Seconds, we're passionate about discovering the people, places and flavors that make Atlanta special. Through food reviews, local experiences and creative content, we bring businesses and communities together, one story at a time."
        image={photos.atlSunset}
        imageAlt="Atlanta skyline at sunset (placeholder photo)"
      />

      {/* Story */}
      <section className="bg-ink py-24 md:py-36" aria-labelledby="story-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <ClipReveal className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-coal-2" parallax>
              <div className="absolute inset-0">
                <Img src={photos.friendsTable} alt="Friends sharing plates around a table (placeholder photo)" fill sizes="(min-width: 1024px) 40vw, 94vw" className="object-cover" />
              </div>
            </ClipReveal>
            <SpinBadge id="about-badge" className="absolute -bottom-10 -right-4 w-32 sm:w-36" text="FOR AND BY ATLANTEANS · SINCE 2017 · " />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Timecode code="2017 →" label="Our story" />
            <SplitReveal id="story-title" className="display mt-8 text-[clamp(2.4rem,5vw,5rem)]">
              Designed for and by <span className="serif-accent text-red">Atlanteans,</span> new and old.
            </SplitReveal>
            <WordScrub
              className="mt-10 text-[clamp(1.25rem,1.9vw,1.75rem)] leading-[1.35]"
              text="We cover buzzing topics in the city and find out from people like you what makes Atlanta so great. Whether you're a home-grown Georgia peach or just visiting, our goal is simple: make sure you know exactly what's happening, so you can be part of everything Atlanta has to offer."
            />
            <Reveal as="dl" className="mt-14 grid grid-cols-2 gap-8 border-t border-cream/15 pt-10">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="order-2 mt-2 text-sm text-cream/60">{s.label}</dt>
                  <dd className="display order-1 text-[clamp(3rem,5vw,4.8rem)]">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-cream/10 bg-coal py-24 md:py-32" aria-labelledby="timeline-title">
        <div className="container-x">
          <Timecode code="00:52" label="The timeline" />
          <h2 id="timeline-title" className="display mt-8 text-[clamp(2.6rem,6vw,6rem)]">
            Years in the <span className="serif-accent text-red">streets.</span>
          </h2>
          <Reveal as="ol" className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-cream/10 bg-cream/10 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {timeline.map((t) => (
              <li key={t.year} className="flex min-h-[300px] flex-col justify-between bg-coal p-7">
                <p className="display text-[clamp(3rem,5vw,4.6rem)] text-red">{t.year}</p>
                <div>
                  <h3 className="display text-2xl">{t.title}</h3>
                  <p className="mt-3 text-cream/65">{t.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Crew */}
      <section className="bg-ink py-24 md:py-32" aria-labelledby="crew-title">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Timecode code="00:54" label="The crew" />
              <h2 id="crew-title" className="display mt-8 text-[clamp(2.6rem,6vw,6rem)]">
                The faces behind <span className="serif-accent text-red">the feed.</span>
              </h2>
            </div>
            <p className="max-w-sm text-cream/60">The people who pull up, taste everything and tell you the truth about it.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {crew.map((c, i) => (
              <figure key={c.role} className={i === 1 ? "lg:mt-16" : ""}>
                <ClipReveal className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-coal-2" delay={i * 0.1}>
                  <div className="absolute inset-0">
                    <Img src={c.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 94vw" className="object-cover opacity-50 grayscale" />
                  </div>
                </ClipReveal>
                <figcaption className="mt-4 flex items-baseline justify-between">
                  <span className="display text-2xl">{c.role}</span>
                  <span className="eyebrow text-[0.6rem] text-cream/40">{c.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-cream/10 bg-ink py-24 md:py-32" aria-labelledby="values-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Timecode code="00:56" label="What we stand for" />
            <h2 id="values-title" className="display mt-8 text-[clamp(2.6rem,5vw,5rem)]">
              The <span className="serif-accent text-red">rules.</span>
            </h2>
          </div>
          <Reveal as="dl" className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {values.map((v, i) => (
              <div key={v.k} className="border-t border-cream/15 pt-6">
                <dt className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-red">0{i + 1}</span>
                  <span className="display text-3xl">{v.k}</span>
                </dt>
                <dd className="mt-3 text-cream/65">{v.v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Testimonials code="00:58" />
      <CollabCTA code={`${site.established} → now`} />
    </>
  );
}
