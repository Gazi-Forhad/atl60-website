import { photos } from "@/content/media";
import { stats } from "@/content/site";
import { ClipReveal, Counter, Reveal, SplitReveal, WordScrub } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { SpinBadge } from "@/components/ui/SpinBadge";
import { Timecode } from "@/components/ui/Timecode";

/** Section 2: brand introduction + verified stats. */
export function Intro() {
  return (
    <section className="relative bg-ink py-28 md:py-40" aria-labelledby="intro-title">
      <div className="container-x">
        <Timecode code="00:07" label="Who we are" />
        <SplitReveal id="intro-title" className="display mt-8 text-[clamp(3rem,9.4vw,10.5rem)]">
          <span className="block">More than food.</span>
          <span className="serif-accent block text-red">It&apos;s an Atlanta</span>
          <span className="block">experience.</span>
        </SplitReveal>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Collage */}
          <div className="relative lg:col-span-5">
            <ClipReveal className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-coal-2" parallax>
              <div className="absolute inset-0">
                <Img
                  src={photos.crawfishTall}
                  alt="Crawfish, corn and potatoes in a steaming pot (placeholder photo)"
                  fill
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
              </div>
            </ClipReveal>
            <ClipReveal
              from="left"
              delay={0.25}
              className="absolute -bottom-10 -right-2 aspect-square w-[46%] overflow-hidden rounded-[1rem] border-[6px] border-ink bg-coal-2 sm:-right-8"
            >
              <div className="absolute inset-0">
                <Img
                  src={photos.phoneShootTable}
                  alt="Creator filming food on a phone (placeholder photo)"
                  fill
                  sizes="(min-width: 1024px) 18vw, 44vw"
                  className="object-cover"
                />
              </div>
            </ClipReveal>
            <SpinBadge id="intro-badge" className="absolute -left-3 -top-8 w-28 sm:w-32" />
          </div>

          {/* Copy + stats */}
          <div className="flex flex-col justify-between gap-16 lg:col-span-6 lg:col-start-7">
            <WordScrub
              className="text-[clamp(1.45rem,2.35vw,2.3rem)] font-medium leading-[1.22] tracking-[-0.01em]"
              text="We explore the places, flavors and people that make Atlanta special. From hidden food gems to unforgettable restaurant experiences, we bring local stories to life through engaging content and creative storytelling."
            />

            <div>
              <Reveal as="dl" className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-cream/15 pt-10" stagger={0.1}>
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="order-2 mt-3 text-sm text-cream/60">{s.label}</dt>
                    <dd className="display order-1 text-[clamp(3rem,6vw,5.6rem)] text-cream">
                      <Counter value={s.value} decimals={s.decimals ?? 0} prefix={s.prefix} suffix={s.suffix} />
                    </dd>
                  </div>
                ))}
              </Reveal>
              <p className="eyebrow mt-8 text-[0.62rem] text-cream/35">Figures from public channels, Nov 2026.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
