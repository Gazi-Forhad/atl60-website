"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/* -----------------------------------------------------------------------
   <Reveal> — fades + lifts its direct children (or `selector` matches)
   in a stagger when scrolled into view.
------------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  y = 48,
  stagger = 0.08,
  delay = 0,
  selector,
  start = "top 88%",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
  stagger?: number;
  delay?: number;
  selector?: string;
  start?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = selector ? el.querySelectorAll(selector) : el.children;
        if (!targets.length) return;
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 1.1,
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/* -----------------------------------------------------------------------
   <SplitReveal> — masked line-by-line headline reveal (GSAP SplitText).
   trigger="load" for above-the-fold headings.
------------------------------------------------------------------------ */
export function SplitReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  trigger = "scroll",
  stagger = 0.1,
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  trigger?: "scroll" | "load";
  stagger?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 112,
              rotate: 2,
              duration: 1.2,
              stagger,
              delay,
              scrollTrigger: trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

/* -----------------------------------------------------------------------
   <ClipReveal> — image clip-path wipe with a slow inner de-zoom.
------------------------------------------------------------------------ */
export function ClipReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
  parallax = false,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right" | "top";
  delay?: number;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement | null;
      const start = {
        bottom: "inset(100% 0% 0% 0%)",
        top: "inset(0% 0% 100% 0%)",
        left: "inset(0% 100% 0% 0%)",
        right: "inset(0% 0% 0% 100%)",
      }[from];
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true }, delay });
        tl.fromTo(el, { clipPath: start }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
        if (inner) tl.from(inner, { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.1);
        if (parallax && inner) {
          gsap.fromTo(
            inner,
            { yPercent: -6 },
            { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* -----------------------------------------------------------------------
   <WordScrub> — words light up as you scroll (pinned-story feel without
   the pin). Static, fully readable text for reduced motion.
------------------------------------------------------------------------ */
export function WordScrub({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 50%", scrub: 0.6 },
          },
        );
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}

/* -----------------------------------------------------------------------
   <Counter> — counts up once in view. SSR renders the final value.
------------------------------------------------------------------------ */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const obj = { n: value > 1900 ? value - 40 : 0 };
        el.textContent = format(obj.n);
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              n: value,
              duration: 2,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = format(obj.n);
              },
            }),
        });
        return () => {
          st.kill();
          el.textContent = format(value);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
