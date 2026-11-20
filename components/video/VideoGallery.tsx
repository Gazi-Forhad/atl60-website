"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { reels, videoCategories, type Reel, type VideoCategory } from "@/content/videos";
import { socials } from "@/content/site";
import { cn } from "@/lib/cn";
import { Img } from "@/components/ui/Img";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close, Facebook, Instagram, Play, Volume } from "@/components/ui/Icons";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";

type Filter = "All" | VideoCategory;

/**
 * Section 4: vertical, social-native video experience.
 * - category filters (Motion layout animation)
 * - hover-to-preview (lazy: video src only attached on first hover)
 * - full-screen modal player with keyboard navigation
 */
export function VideoGallery({ variant = "rail" }: { variant?: "rail" | "grid" }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const list = useMemo(() => (filter === "All" ? reels : reels.filter((r) => r.category === filter)), [filter]);
  const openIndex = openId ? list.findIndex((r) => r.id === openId) : -1;
  const active = openIndex >= 0 ? list[openIndex] : null;

  const open = useCallback((id: string, el: HTMLElement) => {
    lastTrigger.current = el;
    setOpenId(id);
  }, []);
  const close = useCallback(() => {
    setOpenId(null);
    requestAnimationFrame(() => lastTrigger.current?.focus());
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (openIndex < 0) return;
      setOpenId(list[(openIndex + dir + list.length) % list.length].id);
    },
    [list, openIndex],
  );

  const scrollRail = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    rail.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 16) * 2, behavior: "smooth" });
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: reels.length };
    reels.forEach((r) => (c[r.category] = (c[r.category] ?? 0) + 1));
    return c;
  }, []);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <LayoutGroup id={`filters-${variant}`}>
          <div role="group" aria-label="Filter videos by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {(["All", ...videoCategories] as Filter[]).map((f) => {
              const on = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={on}
                  className={cn(
                    "relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                    on ? "border-red text-cream" : "border-cream/20 text-cream/70 hover:border-cream/60 hover:text-cream",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId={`filter-pill-${variant}`}
                      className="absolute inset-0 -z-10 rounded-full bg-red"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {f}
                  <span className="ml-1.5 font-mono text-[0.7rem] opacity-60">{counts[f] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        {variant === "rail" && (
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              className="grid size-12 place-items-center rounded-full border border-cream/20 text-xl transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              <ArrowLeft />
              <span className="sr-only">Scroll videos left</span>
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              className="grid size-12 place-items-center rounded-full border border-cream/20 text-xl transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              <ArrowRight />
              <span className="sr-only">Scroll videos right</span>
            </button>
          </div>
        )}
      </div>

      {/* Cards */}
      <div
        ref={railRef}
        className={cn(
          "mt-10",
          variant === "rail"
            ? "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:-mx-7 sm:scroll-px-7 sm:px-7 lg:-mx-11 lg:scroll-px-11 lg:px-11"
            : "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((reel, i) => (
            <motion.div
              key={reel.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              data-card
              className={cn(
                variant === "rail" ? "w-[68vw] shrink-0 snap-start sm:w-[300px] lg:w-[330px]" : "",
                variant === "grid" && i % 4 === 1 ? "md:translate-y-10" : "",
              )}
            >
              <VideoCard reel={reel} onOpen={open} priority={i < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="eyebrow mt-6 text-[0.62rem] text-cream/35">
        Demo footage shown. Client reels drop in from Instagram &amp; Facebook.
      </p>

      <VideoModal reel={active} onClose={close} onStep={step} position={openIndex + 1} total={list.length} />
    </div>
  );
}

function VideoCard({ reel, onOpen, priority }: { reel: Reel; onOpen: (id: string, el: HTMLElement) => void; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>();
  const [hover, setHover] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    if (hover) v.play().catch(() => {});
    else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hover, src]);

  const start = () => {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    setSrc(reel.asset.src);
    setHover(true);
  };

  return (
    <button
      type="button"
      onClick={(e) => onOpen(reel.id, e.currentTarget)}
      onMouseEnter={start}
      onMouseLeave={() => setHover(false)}
      data-cursor="Play"
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[1.1rem] bg-coal-2 text-left"
    >
      <Img
        src={reel.asset.poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 330px, (min-width: 640px) 300px, 68vw"
        loading={priority ? "eager" : "lazy"}
        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-105"
      />
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        loop
        preload="none"
        onPlaying={() => setReady(true)}
        aria-hidden
        tabIndex={-1}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
          hover && ready ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
        <span className="rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cream backdrop-blur">
          {reel.category}
        </span>
        <span className="grid size-8 place-items-center rounded-full bg-cream/15 text-cream backdrop-blur">
          {reel.platform === "instagram" ? <Instagram /> : <Facebook />}
        </span>
      </div>

      <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/40 bg-ink/30 text-xl text-cream backdrop-blur-md transition-all duration-500 group-hover:scale-75 group-hover:opacity-0">
        <Play />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="eyebrow text-[0.62rem] text-cream/60">{reel.area}</p>
        <p className="display mt-1.5 text-[clamp(1.5rem,2vw,2rem)] leading-[0.92]">{reel.title}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-[2px] flex-1 overflow-hidden rounded-full bg-cream/20">
            <span
              className={cn(
                "block h-full origin-left bg-red transition-transform ease-linear",
                hover && ready ? "scale-x-100 duration-[8000ms]" : "scale-x-0 duration-300",
              )}
            />
          </span>
          <span className="font-mono text-[0.65rem] text-cream/70">0:60</span>
        </div>
      </div>
    </button>
  );
}

function VideoModal({
  reel,
  onClose,
  onStep,
  position,
  total,
}: {
  reel: Reel | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  position: number;
  total: number;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const scroll = useSmoothScroll();
  const isOpen = Boolean(reel);

  useEffect(() => {
    if (!isOpen) return;
    scroll.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      scroll.start();
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, scroll]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onStep]);

  const profile = socials.find((s) => s.id === reel?.platform);

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          key="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${reel.title}, video`}
          className="fixed inset-0 z-[85] overflow-y-auto bg-ink/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          data-lenis-prevent
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="fixed right-4 top-4 z-10 grid size-12 place-items-center rounded-full border border-cream/25 bg-ink/60 text-xl text-cream transition-colors hover:bg-red md:right-8 md:top-8"
          >
            <Close />
            <span className="sr-only">Close video</span>
          </button>

          <div className="mx-auto grid min-h-full max-w-[1400px] items-center gap-8 px-4 py-20 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
            <motion.div
              key={`${reel.id}-meta`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="order-2 lg:order-1"
            >
              <p className="eyebrow text-red">{reel.category}</p>
              <h2 className="display mt-3 text-[clamp(2.4rem,4vw,4.2rem)]">{reel.title}</h2>
              <p className="serif-accent mt-3 text-2xl text-cream/85">{reel.caption}</p>
              <p className="eyebrow mt-6 text-cream/50">{reel.area} · Metro ATL</p>
              {profile && (
                <a
                  href={reel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-3 text-sm transition-colors hover:border-red hover:bg-red"
                >
                  {reel.platform === "instagram" ? <Instagram /> : <Facebook />}
                  More on {profile.label} <ArrowUpRight />
                </a>
              )}
              <p className="mt-6 max-w-xs text-xs text-cream/35">Demo footage. The client&apos;s original reel plays here.</p>
            </motion.div>

            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-1 mx-auto aspect-[9/16] h-[min(78svh,820px)] max-w-full overflow-hidden rounded-[1.5rem] bg-coal-2 shadow-[0_40px_120px_-20px_rgba(238,27,44,.35)] lg:order-2"
            >
              <video
                ref={videoRef}
                key={reel.asset.src}
                src={reel.asset.src}
                poster={reel.asset.poster}
                autoPlay
                playsInline
                loop
                muted={muted}
                controls={false}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-ink/60 text-xl text-cream backdrop-blur transition-colors hover:bg-red"
              >
                <Volume muted={muted} />
                <span className="sr-only">{muted ? "Unmute" : "Mute"}</span>
              </button>
            </motion.div>

            <div className="order-3 flex items-center justify-center gap-3 lg:justify-end">
              <button
                type="button"
                onClick={() => onStep(-1)}
                className="grid size-14 place-items-center rounded-full border border-cream/25 text-xl transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                <ArrowLeft />
                <span className="sr-only">Previous video</span>
              </button>
              <span className="font-mono text-sm text-cream/60">
                {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => onStep(1)}
                className="grid size-14 place-items-center rounded-full border border-cream/25 text-xl transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                <ArrowRight />
                <span className="sr-only">Next video</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
