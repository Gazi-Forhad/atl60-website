import type { Metadata } from "next";
import { photos } from "@/content/media";
import { services } from "@/content/services";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceStack } from "@/components/services/ServiceStack";
import { ProcessReel } from "@/components/services/ProcessReel";
import { Formats } from "@/components/services/Formats";
import { Faq } from "@/components/services/Faq";
import { SplitReveal } from "@/components/motion/Reveal";
import { Timecode } from "@/components/ui/Timecode";
import { Testimonials } from "@/components/home/Testimonials";
import { CollabCTA } from "@/components/home/CollabCTA";

export const metadata: Metadata = {
  title: "Services | Restaurant Features, UGC & Influencer Marketing in Atlanta",
  description:
    "Restaurant features, UGC content creation, brand collaborations and event coverage for Atlanta restaurants and brands, by ATL in 60 Seconds.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        code="00:36"
        label="Our services"
        titleSize="text-[clamp(3rem,8.2vw,9.4rem)]"
        title={
          <>
            Your brand. <span className="serif-accent text-red">Our storytelling.</span> Atlanta&apos;s attention.
          </>
        }
        intro="We help restaurants, food trucks and brands get seen by the people who actually go out and eat in Atlanta. Honest content, made on location, built for social."
        aside={
          <ul className="grid gap-1 font-mono text-sm text-cream/70">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="flex gap-4 py-1 hover:text-red">
                  <span className="text-red">{s.number}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        }
        image={photos.chefFlame}
        imageAlt="Chef cooking over a flaming pan (placeholder photo)"
      />

      <section className="bg-ink pb-24" aria-label="Services">
        <div className="container-x">
          <ServiceStack />
        </div>
      </section>

      <ProcessReel code="00:40" />

      <section className="bg-ink py-28 md:py-36" aria-labelledby="formats-title">
        <div className="container-x">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Timecode code="00:44" label="Ways to work with us" />
              <SplitReveal id="formats-title" className="display mt-8 text-[clamp(2.6rem,6.4vw,6.8rem)]">
                Pick your <span className="serif-accent text-red">format.</span>
              </SplitReveal>
            </div>
            <p className="max-w-sm text-cream/65">
              Every business is different. Start with a format and we&apos;ll shape it around your menu, your goals
              and your budget.
            </p>
          </div>
          <Formats />
        </div>
      </section>

      <Testimonials code="00:50" />

      <section className="bg-ink py-28 md:py-36" aria-labelledby="faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Timecode code="00:55" label="FAQ" />
            <h2 id="faq-title" className="display mt-8 text-[clamp(2.6rem,5vw,5rem)]">
              Good <span className="serif-accent text-red">questions.</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>

      <CollabCTA />
    </>
  );
}
