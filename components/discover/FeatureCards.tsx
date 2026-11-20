import Link from "next/link";
import type { Feature } from "@/content/features";
import { cn } from "@/lib/cn";
import { ClipReveal } from "@/components/motion/Reveal";
import { Button, TextLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Facebook, Pin, YouTube, Instagram } from "@/components/ui/Icons";

const PlatformIcon = ({ p }: { p: Feature["watch"]["platform"] }) =>
  p === "youtube" ? <YouTube /> : p === "facebook" ? <Facebook /> : <Instagram />;

/** Large editorial lead card, used for full features. */
export function LeadFeatureCard({ feature, className }: { feature: Feature; className?: string }) {
  const href = `/discover/${feature.slug}`;
  return (
    <article className={cn("group", className)}>
      <Link href={href} data-cursor="Read" className="relative block" aria-label={`Read the feature: ${feature.title}`}>
        <ClipReveal className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-coal-2 md:aspect-[5/6]">
          <div className="absolute inset-0">
            <Img
              src={feature.image}
              alt={feature.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 94vw"
              className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
            />
          </div>
        </ClipReveal>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-6">
          <span className="rounded-full bg-red px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream">
            New feature
          </span>
          <span className="display text-[clamp(2.4rem,5vw,4.5rem)] text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,.5)]">
            № {feature.number}
          </span>
        </div>
      </Link>

      <div className="mt-7 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow flex flex-wrap gap-x-3 text-cream/55">
            <span>{feature.dateLabel}</span>
            <span aria-hidden>·</span>
            <span className="text-red">{feature.category}</span>
            <span aria-hidden>·</span>
            <span>{feature.area}</span>
          </p>
          <h3 className="display mt-3 text-[clamp(2.4rem,4.6vw,4.6rem)]">
            <Link href={href} className="bg-[linear-gradient(var(--color-red),var(--color-red))] bg-[length:0%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 hover:bg-[length:100%_4px]">
              {feature.title}
            </Link>
          </h3>
          {feature.subtitle && <p className="serif-accent mt-2 text-[clamp(1.4rem,2vw,2rem)] text-red">{feature.subtitle}</p>}
        </div>
        <div className="md:col-span-5">
          <p className="text-cream/75">{feature.excerpt}</p>
          {feature.address && (
            <p className="mt-4 flex gap-2 text-sm text-cream/60">
              <Pin className="mt-0.5 shrink-0 text-red" />
              {feature.address}
            </p>
          )}
        </div>
      </div>

      {feature.mustTry && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2 text-cream/50">Must try</span>
          {feature.mustTry.map((m) => (
            <span key={m} className="rounded-full border border-cream/20 px-3 py-1.5 text-sm text-cream/85">
              {m}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button href={href} variant="red">
          Read the feature
        </Button>
        <TextLink href={feature.watch.href}>{feature.watch.label}</TextLink>
      </div>
    </article>
  );
}

/** Compact card: archive videos link straight to the original post. */
export function FeatureCard({
  feature,
  className,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 94vw",
}: {
  feature: Feature;
  className?: string;
  aspect?: string;
  sizes?: string;
}) {
  const isFeature = feature.kind === "feature";
  const stretched = "after:absolute after:inset-0 after:content-['']";
  const titleLink = isFeature ? (
    <Link href={`/discover/${feature.slug}`} className={stretched}>
      {feature.title}
    </Link>
  ) : (
    <a href={feature.watch.href} target="_blank" rel="noopener noreferrer" className={stretched}>
      {feature.title}
      <span className="sr-only"> (opens on {feature.watch.platform})</span>
    </a>
  );
  return (
    <article className={cn("group relative", className)} data-cursor={isFeature ? "Read" : "Watch"}>
      <div className={cn("relative overflow-hidden rounded-[1rem] bg-coal-2", aspect)}>
        <Img
          src={feature.image}
          alt={feature.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream backdrop-blur">
            {isFeature ? "Feature" : "From the archive"}
          </span>
        </div>
        <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-cream text-lg text-ink transition-colors duration-300 group-hover:bg-red group-hover:text-cream">
          <PlatformIcon p={feature.watch.platform} />
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="eyebrow text-red">{feature.category}</p>
        <p className="eyebrow text-cream/40">{feature.area}</p>
      </div>
      <h3 className="display mt-2 text-[clamp(1.9rem,2.6vw,2.7rem)]">{titleLink}</h3>
      {feature.subtitle && <p className="serif-accent text-xl text-cream/80">{feature.subtitle}</p>}
      <p className="mt-2 text-[0.95rem] text-cream/60">{feature.excerpt}</p>
      <p className="eyebrow mt-4 inline-flex items-center gap-2 text-cream/80 transition-colors group-hover:text-red">
        {feature.watch.label} <span aria-hidden>{isFeature ? "→" : "↗"}</span>
      </p>
    </article>
  );
}
