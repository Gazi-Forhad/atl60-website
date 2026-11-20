"use client";

import { useRef } from "react";
import { process } from "@/content/services";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Timecode } from "@/components/ui/Timecode";

/**
 * Horizontal, pinned storytelling on desktop ("how 60 seconds gets made").
 * Mobile / reduced motion: a normal vertical stack (no hijacked scrolling).
 */
export function ProcessReel({ code = "00:40" }: { code?: string }) {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("is-horizontal");
        const track = section.querySelector<HTMLElement>(".process__track");
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        return () => section.classList.remove("is-horizontal");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="process relative overflow-hidden bg-coal py-24 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0" aria-labelledby="process-title">
      <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Timecode code={code} label="How it works" />
          <h2 id="process-title" className="display mt-6 text-[clamp(2.6rem,6vw,6.4rem)]">
            How <span className="serif-accent text-red">60 seconds</span> gets made.
          </h2>
        </div>
        <div className="w-full max-w-xs">
          <p className="text-cream/65">From the first bite to a packed dining room, here&apos;s what a feature looks like.</p>
          <div className="mt-5 hidden h-[2px] w-full overflow-hidden bg-cream/15 lg:block" aria-hidden>
            <div ref={bar} className="h-full origin-left scale-x-0 bg-red" />
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-14">
        <ol className="process__track grid gap-4 px-4 sm:px-7 md:grid-cols-2 lg:gap-5 lg:px-11">
          {process.map((step, i) => (
            <li
              key={step.code}
              className="process__panel group relative grid overflow-hidden rounded-[1.5rem] border border-cream/10 bg-ink sm:grid-cols-2 lg:h-[min(58svh,540px)]"
            >
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-red">Step {i + 1}</span>
                  <span className="eyebrow text-cream/40">{step.code}</span>
                </div>
                <div>
                  <p className="display text-[clamp(3.5rem,6vw,6rem)] text-cream/10">{step.code}</p>
                  <h3 className="display mt-2 text-[clamp(2rem,3vw,3.2rem)]">{step.title}</h3>
                  <p className="mt-4 text-cream/70">{step.body}</p>
                </div>
              </div>
              <div className="relative min-h-[240px] overflow-hidden">
                <Img
                  src={step.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 94vw"
                  className="object-cover grayscale-[35%] transition-[transform,filter] duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
            </li>
          ))}
          <li className="process__panel relative flex flex-col justify-between gap-10 overflow-hidden rounded-[1.5rem] bg-red p-6 text-ink sm:p-10 md:col-span-2 lg:h-[min(58svh,540px)] lg:w-[min(56vw,720px)]">
            <span className="eyebrow">Your turn</span>
            <p className="display text-[clamp(2.6rem,5vw,5.4rem)]">Your 60 seconds start here.</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/collaborate" variant="ink">
                Book a collaboration
              </Button>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
