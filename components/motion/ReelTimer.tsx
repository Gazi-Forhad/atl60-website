"use client";

import { useEffect, useRef, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The signature detail: the whole site is a 60-second reel.
 * Scroll progress drives a REC timecode (00:00 → 01:00) and a hairline
 * progress bar at the top of the viewport.
 */
export function ReelTimer() {
  const [secs, setSecs] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setSecs(Math.round(p * 60));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = secs >= 60 ? "01:00" : `00:${pad(secs)}`;

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-red" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-5 left-5 z-[45] hidden items-center gap-2.5 rounded-full border border-cream/15 bg-ink/60 px-3.5 py-2 font-mono text-[0.7rem] tracking-[0.14em] text-cream backdrop-blur-md sm:flex"
      >
        <span className="rec-dot size-2 rounded-full bg-red" />
        <span className="text-cream/60">REC</span>
        <span className="tabular-nums">{label}</span>
        <span className="text-cream/35">/ 01:00</span>
      </div>
    </>
  );
}
