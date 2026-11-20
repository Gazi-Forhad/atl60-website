"use client";

import { useEffect, useRef, useState } from "react";
import { heroReel } from "@/content/videos";
import { site } from "@/content/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { SpeedLines } from "@/components/ui/Brand";
import { Pause, Play } from "@/components/ui/Icons";

const CLIP_MS = 5200;

/**
 * Section 1: cinematic hero.
 * A story-style montage (like an IG story / reel) with progress bars,
 * masked headline reveal, subtle de-zoom and a scroll-out parallax.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(1); // how many clips have a src (lazy-load as the reel advances)
  const [paused, setPaused] = useState(false);

  // Reduced motion: start paused on the first frame.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      const id = requestAnimationFrame(() => setPaused(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  // Keep the next clip warm.
  const next = (index + 1) % heroReel.length;
  if (loaded < Math.min(heroReel.length, index + 2)) setLoaded(Math.min(heroReel.length, index + 2));

  // New active clip → restart it.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        v.currentTime = 0;
        if (!paused) v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on clip change
  }, [index]);

  // Pause / resume the active clip.
  useEffect(() => {
    const v = videoRefs.current[index];
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on toggle
  }, [paused]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ delay: 0.55 });
        tl.from(".hero-media", { scale: 1.28, duration: 2.8, ease: "expo.out" }, 0)
          .from(".hero-line", { yPercent: 118, rotate: 4, duration: 1.4, stagger: 0.12, ease: "expo.out" }, 0.1)
          .from(".speed-line", { scaleX: 0, transformOrigin: "100% 50%", duration: 1, stagger: 0.07, ease: "expo.out" }, 0.55)
          .from(".hero-fade", { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.55);

        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-content", { yPercent: -14, autoAlpha: 0.1, ease: "none", scrollTrigger: st });
        gsap.to(".hero-media-scroll", { scale: 1.14, yPercent: 8, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const current = heroReel[index];

  return (
    <section
      ref={root}
      className="hero-root relative h-[100svh] min-h-[660px] overflow-hidden bg-ink"
      aria-label="Atlanta, one bite at a time"
    >
      {/* Media */}
      <div className="hero-media absolute inset-0">
        <div className="hero-media-scroll absolute inset-0">
          {heroReel.map((clip, i) => (
            <video
              key={clip.asset.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-out",
                i === index ? "scale-100 opacity-100 duration-[1200ms,6000ms]" : "scale-[1.08] opacity-0 duration-[1200ms,0ms]",
              )}
              src={i < loaded ? clip.asset.src : undefined}
              poster={i === 0 ? clip.asset.poster : undefined}
              muted
              playsInline
              loop
              autoPlay={i === 0}
              preload={i === 0 ? "auto" : "metadata"}
              aria-hidden
              tabIndex={-1}
            />
          ))}
        </div>
        {/* Cinematic grade */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_30%,transparent_0%,rgba(10,9,8,.55)_60%,rgba(10,9,8,.92)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-0 bg-red/[0.06] mix-blend-multiply" />
      </div>

      {/* Story bars + now playing */}
      <div className="hero-fade absolute inset-x-0 top-[calc(var(--nav-h)+10px)] z-10">
        <div className="container-x">
          <div className="flex gap-1.5" aria-hidden>
            {heroReel.map((clip, i) => (
              <div key={clip.asset.src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-cream/20">
                <div
                  className="story-bar__fill h-full bg-cream"
                  data-state={i < index ? "done" : i === index ? "active" : "idle"}
                  data-paused={paused}
                  style={{ ["--clip-ms" as string]: `${CLIP_MS}ms` }}
                  onAnimationEnd={i === index ? () => setIndex(next) : undefined}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="eyebrow text-cream/70" aria-live="off">
              <span className="text-cream">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-cream/40"> / {String(heroReel.length).padStart(2, "0")}</span>
              <span className="mx-2 text-cream/30">·</span>
              {current.label} <span className="text-cream/40">· {current.area}</span>
            </p>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="eyebrow flex items-center gap-2 rounded-full border border-cream/20 px-3 py-1.5 text-cream/80 backdrop-blur-md transition-colors hover:border-cream hover:text-cream"
            >
              {paused ? <Play /> : <Pause />}
              <span className="sr-only sm:not-sr-only">{paused ? "Play reel" : "Pause reel"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="hero-content relative z-10 flex h-full items-end">
        <div className="container-x pb-10 md:pb-14">
          <p className="hero-fade eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-cream/70 md:mb-7">
            <span className="rec-dot size-2 rounded-full bg-red" aria-hidden />
            <span className="text-cream">Est. {site.established}</span>
            <span className="h-px w-6 bg-cream/30" aria-hidden />
            Metro Atlanta food &amp; lifestyle media
          </p>

          <div className="grid items-end gap-8 lg:grid-cols-12">
            <h1 className="display text-[clamp(3.7rem,12.6vw,13.75rem)] lg:col-span-8">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="hero-line block">Atlanta,</span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="hero-line flex items-center gap-[0.12em] italic text-red">
                  <SpeedLines className="h-[0.42em] w-[0.7em] shrink-0" />
                  One bite
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="hero-line block">at a time.</span>
              </span>
            </h1>

            <div className="lg:col-span-4 lg:pb-3">
              <p className="hero-fade max-w-sm text-lg leading-snug text-cream/85 md:text-xl">
                Discover the food, people and experiences making Atlanta worth talking about.
              </p>
              <div className="hero-fade mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button href="/discover" variant="red">
                  Explore Atlanta
                </Button>
                <Button href="#videos" variant="outline" icon={<Play />}>
                  Watch our latest features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-fade pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden>
        <span className="eyebrow text-[0.62rem] text-cream/60">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-cream/15">
          <span className="scroll-cue__line absolute inset-0 bg-cream" />
        </span>
      </div>

      {/* Coordinates */}
      <p
        className="hero-fade eyebrow pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 origin-right text-[0.62rem] text-cream/40 lg:block"
        aria-hidden
      >
        33.7490° N · 84.3880° W · ATL
      </p>
    </section>
  );
}
