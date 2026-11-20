import { features, leadFeature } from "@/content/features";
import { Reveal, SplitReveal } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { Timecode } from "@/components/ui/Timecode";
import { FeatureCard, LeadFeatureCard } from "@/components/discover/FeatureCards";

/** Section 3: latest food discoveries, an asymmetric editorial grid. */
export function Discoveries() {
  const archive = features.filter((f) => f.kind === "archive");
  const side = archive.slice(0, 2);
  const row = archive.slice(2, 5);

  return (
    <section id="discover" className="relative border-t border-cream/10 bg-ink py-28 md:py-36" aria-labelledby="discover-title">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Timecode code="00:15" label="Latest discoveries" />
            <SplitReveal id="discover-title" className="display mt-8 max-w-[16ch] text-[clamp(2.8rem,7vw,7.6rem)]">
              The latest from the <span className="serif-accent text-red">streets</span> of Atlanta.
            </SplitReveal>
          </div>
          <TextLink href="/discover" className="shrink-0">
            All discoveries
          </TextLink>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-24 lg:grid-cols-12">
          <LeadFeatureCard feature={leadFeature} className="lg:col-span-7" />
          <Reveal className="flex flex-col gap-14 lg:col-span-5 lg:pt-24">
            {side.map((f) => (
              <FeatureCard key={f.slug} feature={f} sizes="(min-width: 1024px) 38vw, 94vw" />
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {row.map((f, i) => (
            <FeatureCard
              key={f.slug}
              feature={f}
              aspect={i === 1 ? "aspect-[3/4]" : "aspect-[4/5]"}
              className={i === 1 ? "lg:mt-20" : i === 2 ? "lg:mt-8" : ""}
            />
          ))}
        </Reveal>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-cream/10 pt-8 md:flex-row md:items-center">
          <p className="max-w-xl text-cream/60">
            <span className="text-cream">113+ videos since 2017.</span> Restaurant reviews, food trucks, chef interviews
            and the community stories behind them.
          </p>
          <TextLink href="/discover">Browse the archive</TextLink>
        </div>
      </div>
    </section>
  );
}
