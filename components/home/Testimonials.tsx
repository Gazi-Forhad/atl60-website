"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { testimonials, testimonialSourceUrl } from "@/content/testimonials";
import { cn } from "@/lib/cn";
import { ArrowLeft, ArrowRight, Facebook } from "@/components/ui/Icons";
import { TextLink } from "@/components/ui/Button";
import { Timecode } from "@/components/ui/Timecode";

const SLIDE_MS = 8000;

/** Section 7: testimonial slider with story-style auto-advance (pauses on hover/focus). */
export function Testimonials({ code = "00:50" }: { code?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];
  const go = (d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length);

  return (
    <section
      className="relative overflow-hidden bg-coal py-28 md:py-36"
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 lg:col-span-4">
          <div>
            <Timecode code={code} label="Testimonials" />
            <h2 id="testimonials-title" className="display mt-8 text-[clamp(2.8rem,5.6vw,6rem)]">
              Good people. <span className="serif-accent block text-red">Real experiences.</span>
            </h2>
            <p className="mt-6 max-w-sm text-cream/60">Unedited recommendations from our Facebook community.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid size-14 place-items-center rounded-full border border-cream/25 text-xl transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              <ArrowLeft />
              <span className="sr-only">Previous testimonial</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid size-14 place-items-center rounded-full border border-cream/25 text-xl transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              <ArrowRight />
              <span className="sr-only">Next testimonial</span>
            </button>
            <span className="font-mono text-sm text-cream/60">
              {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="mb-10 flex gap-1.5" aria-hidden>
            {testimonials.map((q, idx) => (
              <div key={q.name} className="h-[3px] flex-1 overflow-hidden rounded-full bg-cream/15">
                <div
                  className="story-bar__fill h-full bg-red"
                  data-state={idx < i ? "done" : idx === i ? "active" : "idle"}
                  data-paused={paused}
                  style={{ ["--clip-ms" as string]: `${SLIDE_MS}ms` }}
                  onAnimationEnd={idx === i ? () => go(1) : undefined}
                />
              </div>
            ))}
          </div>

          <svg viewBox="0 0 64 48" className="h-12 w-16 text-red md:h-16 md:w-20" aria-hidden>
            <path
              fill="currentColor"
              d="M0 48V28C0 12 8 2 24 0l3 7C18 10 14 16 14 24h12v24H0Zm37 0V28C37 12 45 2 61 0l3 7c-9 3-13 9-13 17h12v24H37Z"
            />
          </svg>

          <div className="relative mt-8 min-h-[22rem] sm:min-h-[19rem] md:min-h-[17rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.22, ease: "easeIn" } }}
              >
                <blockquote className="serif-accent text-[clamp(1.7rem,3.1vw,3.2rem)] leading-[1.12] text-cream">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="display grid size-12 place-items-center rounded-full bg-red text-xl" aria-hidden>
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="eyebrow mt-1 flex items-center gap-1.5 text-[0.62rem] text-cream/50">
                      <Facebook /> Recommends ATL in 60 Seconds · {t.source}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-cream/10 pt-6">
            <div className="flex gap-2">
              {testimonials.map((q, idx) => (
                <button
                  key={q.name}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial from ${q.name}`}
                  aria-current={idx === i}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    idx === i ? "border-cream bg-cream text-ink" : "border-cream/20 text-cream/60 hover:text-cream",
                  )}
                >
                  {q.name.split(" ")[0]}
                </button>
              ))}
            </div>
            <TextLink href={testimonialSourceUrl}>See them on Facebook</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
