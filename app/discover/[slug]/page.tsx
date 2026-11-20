import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { features, getFeature } from "@/content/features";
import { videos } from "@/content/media";
import { site } from "@/content/site";
import { ClipReveal, Reveal, SplitReveal } from "@/components/motion/Reveal";
import { Button, TextLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Facebook, Pin } from "@/components/ui/Icons";
import { Timecode } from "@/components/ui/Timecode";
import { FeatureCard } from "@/components/discover/FeatureCards";
import { CollabCTA } from "@/components/home/CollabCTA";

export function generateStaticParams() {
  return features.filter((f) => f.kind === "feature").map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/discover/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f) return { title: "Feature not found" };
  return {
    title: `${f.title}: ${f.subtitle ?? f.category} Review (${f.area})`,
    description: f.excerpt,
    alternates: { canonical: `/discover/${f.slug}` },
    openGraph: { type: "article", title: `${f.title} | ATL in 60 Seconds`, description: f.excerpt, images: [`${f.image}?w=1200&q=75&auto=format&fit=crop`] },
  };
}

export default function FeaturePage({ params }: PageProps<"/discover/[slug]">) {
  return (
    <Suspense fallback={<div className="h-[100svh] bg-ink" />}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: { params: PageProps<"/discover/[slug]">["params"] }) {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f || !f.article) notFound();
  const mapsHref = f.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${f.title}, ${f.address}`)}` : undefined;
  const more = features.filter((x) => x.slug !== f.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${f.title}: ${f.subtitle}`,
    datePublished: f.dateISO,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name },
    about: {
      "@type": "Restaurant",
      name: f.title,
      address: f.address,
      servesCuisine: f.category,
    },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <header className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Img src={f.image} alt={f.imageAlt} fill preload sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        </div>
        <div className="container-x relative pb-12 pt-40 md:pb-20">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-cream/75">
            <span className="rounded-full bg-red px-3 py-1 text-cream">Feature № {f.number}</span>
            <span>{f.category}</span>
            <span aria-hidden>·</span>
            <span>{f.area}</span>
            <span aria-hidden>·</span>
            <span>{f.dateLabel}</span>
          </p>
          <SplitReveal as="h1" trigger="load" delay={0.45} className="display mt-6 max-w-[14ch] text-[clamp(3.2rem,9.5vw,10.5rem)]">
            {f.title}
          </SplitReveal>
          {f.subtitle && <p className="serif-accent mt-4 text-[clamp(1.8rem,3.4vw,3.4rem)] text-red">{f.subtitle}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={f.watch.href} variant="red" icon={<Facebook />}>
              {f.watch.label}
            </Button>
            {mapsHref && <TextLink href={mapsHref}>Get directions</TextLink>}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="bg-ink py-20 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <div className="rounded-[1.25rem] border border-cream/10 bg-coal-2 p-6">
                <p className="eyebrow text-cream/50">The spot</p>
                <p className="display mt-3 text-3xl">{f.title}</p>
                {f.address && (
                  <p className="mt-4 flex gap-2 text-cream/75">
                    <Pin className="mt-1 shrink-0 text-red" />
                    {f.address}
                  </p>
                )}
                {mapsHref && (
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow mt-5 inline-flex items-center gap-2 text-cream hover:text-red"
                  >
                    Open in Google Maps ↗
                  </a>
                )}
              </div>
              {f.mustTry && (
                <div className="rounded-[1.25rem] bg-red p-6 text-ink">
                  <p className="eyebrow">Must try</p>
                  <ol className="mt-4 space-y-3">
                    {f.mustTry.map((m, i) => (
                      <li key={m} className="flex items-baseline gap-3 border-b border-ink/20 pb-3 last:border-0 last:pb-0">
                        <span className="font-mono text-sm">0{i + 1}</span>
                        <span className="display text-2xl">{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <Timecode code="00:00" label="The review" />
            <Reveal>
              <p className="serif-accent mt-8 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.12]">{f.article.lede}</p>
            </Reveal>
            <Reveal className="mt-10 space-y-6 text-lg leading-relaxed text-cream/80" stagger={0.12}>
              {f.article.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <ClipReveal className="relative mt-14 aspect-[9/16] max-w-sm overflow-hidden rounded-[1.25rem] bg-coal-2 sm:aspect-[4/5]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={videos.seafoodBoil.src}
                poster={videos.seafoodBoil.poster}
                muted
                autoPlay
                loop
                playsInline
                preload="none"
                aria-label="Demo clip"
              />
            </ClipReveal>
            <p className="mt-3 text-xs text-cream/40">Demo clip. The original reel lives on Facebook.</p>

            <blockquote className="mt-16 border-y border-cream/15 py-10">
              <p className="eyebrow text-cream/50">The verdict</p>
              <p className="display mt-4 text-[clamp(2.6rem,5.4vw,5.4rem)] text-red">&ldquo;{f.article.verdict}&rdquo;</p>
            </blockquote>

            <ul className="mt-10 flex flex-wrap gap-2">
              {f.article.tags.map((t) => (
                <li key={t} className="rounded-full border border-cream/20 px-3 py-1.5 font-mono text-xs text-cream/70">
                  #{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* More */}
      <section className="border-t border-cream/10 bg-ink py-24" aria-labelledby="more-title">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 id="more-title" className="display text-[clamp(2.4rem,5vw,5rem)]">
              Keep <span className="serif-accent text-red">exploring.</span>
            </h2>
            <TextLink href="/discover">All discoveries</TextLink>
          </div>
          <Reveal className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <FeatureCard key={m.slug} feature={m} />
            ))}
          </Reveal>
        </div>
      </section>

      <CollabCTA />
    </article>
  );
}
