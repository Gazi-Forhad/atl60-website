"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Contextual cursor bubble. Appears only over elements with
 * [data-cursor="Label"] on fine-pointer devices (never on touch).
 */
export function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    const raf = requestAnimationFrame(() => setEnabled(true));
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor || null);
    };
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[75] grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red font-display text-[0.8rem] font-bold uppercase tracking-[0.08em] text-cream [font-stretch:85%]"
      style={{ x: sx, y: sy }}
      initial={false}
      animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      {label}
    </motion.div>
  );
}
