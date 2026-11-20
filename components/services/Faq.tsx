"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { faqs } from "@/content/services";
import { cn } from "@/lib/cn";
import { Plus } from "@/components/ui/Icons";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <ul className="border-t border-cream/15">
      {faqs.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className="border-b border-cream/15">
            <h3>
              <button
                type="button"
                id={`${uid}-q-${i}`}
                aria-expanded={on}
                aria-controls={`${uid}-a-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="display text-[clamp(1.5rem,2.6vw,2.4rem)] transition-colors group-hover:text-red">{f.q}</span>
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full border border-cream/25 text-xl transition-all duration-500",
                    on && "rotate-45 border-red bg-red",
                  )}
                >
                  <Plus />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${uid}-a-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-lg text-cream/70">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
