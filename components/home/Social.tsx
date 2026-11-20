import { photos, videos } from "@/content/media";
import { socials } from "@/content/site";
import { cn } from "@/lib/cn";
import { Reveal, SplitReveal } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { ArrowUpRight, Instagram, Play, SocialIcon } from "@/components/ui/Icons";
import { Marquee } from "@/components/ui/Marquee";
import { Timecode } from "@/components/ui/Timecode";

/**
 * Curated wall. Placeholder imagery; replace each tile with a real post
 * (image + permalink) from @atlin60sec. Later, an Instagram Graph API
 * feed (see /docs) can populate this automatically.
 */
const wall = [
  { src: photos.wingsTall, alt: "Wings with dipping sauce", cls: "row-span-2", reel: true },
  { src: photos.phoneShootTopDown, alt: "Phones photographing a table of food", cls: "" },
  { src: videos.photographingFood.poster, alt: "Creator taking a photo of a seafood plate", cls: "", reel: true },
  { src: photos.barTall, alt: "Moody bar interior", cls: "row-span-2" },
  { src: photos.saucePour2, alt: "Sauce being poured over a dish", cls: "" },
  { src: photos.ramenTall, alt: "Bowl of ramen with chopsticks", cls: "row-span-2", reel: true },
  { src: photos.cameraTall, alt: "Camera ready to film", cls: "" },
  { src: photos.burgerTall, alt: "Stacked burger", cls: "" },
  { src: photos.tacosTall, alt: "Tacos topped with fresh salsa", cls: "" },
];

/** Section 8: follow the flavor. */
export function Social({ code = "00:54" }: { code?: string }) {
  const ig = socials[0];
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36" aria-labelledby="social-title">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Timecode code={code} label="Social" />
            <SplitReveal id="social-title" className="display mt-8 text-[clamp(3.4rem,10vw,11rem)]">
              Follow the <span className="serif-accent text-red">flavor.</span>
            </SplitReveal>
          </div>
          <p className="max-w-sm text-lg text-cream/65">
            First bites, behind the scenes and where to eat next. Find us at{" "}
            <span className="text-cream">{ig.handle}</span>.
          </p>
        </div>

        <Reveal className="mt-14 grid gap-3 md:grid-cols-3" stagger={0.1}>
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.25rem] border border-cream/10 bg-coal-2 p-6 transition-colors duration-500 hover:border-red hover:bg-red md:min-h-[260px]"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-full bg-cream text-2xl text-ink transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <SocialIcon id={s.id} />
                </span>
                <ArrowUpRight className="text-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <div>
                <p className="display text-[clamp(2.2rem,3.4vw,3.4rem)]">{s.label}</p>
                <p className="mt-1 font-mono text-sm text-cream/70 group-hover:text-cream">{s.handle}</p>
                <p className="mt-3 text-sm text-cream/55 group-hover:text-cream/90">{s.blurb}</p>
              </div>
            </a>
          ))}
        </Reveal>

        <div className="mt-3 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 lg:auto-rows-[220px]">
          {wall.map((t, i) => (
            <a
              key={t.src}
              href={ig.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Follow"
              className={cn("group relative overflow-hidden rounded-[1rem] bg-coal-2", t.cls)}
            >
              <Img
                src={t.src}
                alt={`${t.alt} (placeholder)`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/55">
                <span className="flex translate-y-3 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Instagram className="text-lg" /> View on Instagram
                </span>
              </span>
              {t.reel && (
                <span className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-ink/60 text-xs backdrop-blur">
                  <Play />
                  <span className="sr-only">Reel</span>
                </span>
              )}
              <span className="sr-only">Post {i + 1}: opens Instagram</span>
            </a>
          ))}
        </div>
      </div>

      <Marquee
        items={["@atlin60sec", "#AtlantaFoodie", "@atlin60sec", "#ATLin60"]}
        className="mt-20"
        itemClassName="display text-[clamp(4rem,12vw,12rem)] text-outline"
        separator="●"
        duration={45}
      />
    </section>
  );
}
