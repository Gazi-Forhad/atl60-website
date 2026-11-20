"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollApi = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number | string | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  return ctx;
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays
 * in perfect sync. Disabled entirely for prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -90 } });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    }
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  // New route → start at the top and re-measure triggers once the new DOM has painted.
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const api = useMemo<ScrollApi>(
    () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
      scrollTo: (target, opts) => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target, { offset: opts?.offset ?? -90, immediate: opts?.immediate });
          return;
        }
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (typeof el === "number") window.scrollTo({ top: el });
        else if (el instanceof HTMLElement) el.scrollIntoView({ block: "start" });
      },
    }),
    [],
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
