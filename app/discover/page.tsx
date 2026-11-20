import type { Metadata } from "next";
import { leadFeature } from "@/content/features";
import { photos } from "@/content/media";
import { metroAreas } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { LeadFeatureCard } from "@/components/discover/FeatureCards";
import { DiscoverIndex } from "@/components/discover/DiscoverIndex";
import { Marquee } from "@/components/ui/Marquee";
import { Timecode } from "@/components/ui/Timecode";
import { SplitReveal } from "@/components/motion/Reveal";
import { CollabCTA } from "@/components/home/CollabCTA";

export const metadata: Metadata = {
  title: "Discover Atlanta | Food Reviews & Hidden Gems",
  description:
    "Atlanta restaurant reviews, food trucks, hidden gems and chef interviews from ATL in 60 Seconds, covering Metro Atlanta from Mableton to Decatur.",
  alternates: { canonical: "/discover" },
};

export default function DiscoverPage() {
  return (
    <>
      <PageHero
        code="00:12"
        label="Discover Atlanta"
        title={
          <>
            Discover <span className="serif-accent text-red">Atlanta.</span>
          </>
        }
        intro="Food, places and people worth the drive. Every feature is shot on location and tasted for real, with the Must-Try list and the address so you can go."
        image={photos.atlNight}
        imageAlt="Atlanta skyline at night (placeholder photo)"
      />

      <Marquee
        items={metroAreas}
        className="border-y border-cream/10 bg-ink py-5"
        itemClassName="display text-[clamp(1.6rem,3vw,2.6rem)] text-cream/80"
        separator="✦"
      />

      <section className="bg-ink py-24 md:py-32" aria-labelledby="latest-feature">
        <div className="container-x">
          <Timecode code="№ 001" label="Latest feature" />
          <h2 id="latest-feature" className="sr-only">
            Latest feature
          </h2>
          <div className="mt-12">
            <LeadFeatureCard feature={leadFeature} className="mx-auto max-w-5xl" />
          </div>
        </div>
      </section>

      <section className="border-t border-cream/10 bg-ink py-24 md:py-32" aria-labelledby="archive-title">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Timecode code="2017 →" label="From the archive" />
              <SplitReveal id="archive-title" className="display mt-8 text-[clamp(2.6rem,6.4vw,6.8rem)]">
                The archive.
              </SplitReveal>
            </div>
            <p className="max-w-md text-cream/65">
              113+ videos since 2017. Restaurant reviews, food trucks, chef interviews and community stories. Every card
              opens the original video.
            </p>
          </div>
          <div className="mt-12">
            <DiscoverIndex />
          </div>
        </div>
      </section>

      <CollabCTA code="00:58" />
    </>
  );
}
