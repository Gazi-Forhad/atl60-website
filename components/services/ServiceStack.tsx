"use client";

import { useRef } from "react";
import { services } from "@/content/services";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";

/**
 * Pinned storytelling: service cards stick and stack. Each card
 * recedes (scale + dim) as the next one slides over it.
 * Without JS / with reduced motion it's a clean sticky stack.
 */
export function ServiceStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector(".service-inner"), {
            scale: 0.9,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {services.map((s, i) => (
        <div
          key={s.slug}
          id={s.slug}
          className="service-card sticky pb-6"
          style={{ top: `calc(var(--nav-h) + ${12 + i * 16}px)` }}
        >
          <article className="service-inner group grid origin-top overflow-hidden rounded-[1.5rem] border border-cream/10 bg-coal-2 will-change-transform lg:min-h-[76svh] lg:grid-cols-12">
            <div className={cn("flex flex-col justify-between gap-10 p-6 sm:p-10 lg:col-span-5 lg:p-12", i % 2 === 1 && "lg:order-2")}>
              <div>
                <div className="flex items-start justify-between">
                  <span className="display text-outline text-[clamp(4.5rem,9vw,8.5rem)] leading-none">{s.number}</span>
                  <span className="eyebrow mt-3 text-cream/45">
                    Service {s.number} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="display mt-6 text-[clamp(2.3rem,4vw,4.2rem)]">{s.title}</h3>
                <p className="serif-accent mt-3 text-[clamp(1.4rem,2vw,2rem)] text-red">{s.short}</p>
                <p className="mt-5 max-w-md text-cream/70">{s.description}</p>
              </div>
              <div>
                <ul className="space-y-2.5 border-t border-cream/10 pt-6">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-[0.95rem] text-cream/85">
                      <span aria-hidden className="mt-[0.55em] h-[2px] w-4 shrink-0 bg-red" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="eyebrow text-[0.62rem] text-cream/45">{s.idealFor}</p>
                  <Button href={`/collaborate?type=${s.slug}#form`} variant="outline" className="shrink-0">
                    Start this
                  </Button>
                </div>
              </div>
            </div>
            <div className={cn("relative min-h-[300px] overflow-hidden sm:min-h-[420px] lg:col-span-7 lg:min-h-0", i % 2 === 1 && "lg:order-1")}>
              <Img
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 94vw"
                className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-ink/60 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream backdrop-blur">
                {s.number} · {s.title}
              </span>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
