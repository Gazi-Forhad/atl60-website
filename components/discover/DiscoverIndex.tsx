"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { featureCategories, features, type FeatureCategory } from "@/content/features";
import { cn } from "@/lib/cn";
import { FeatureCard } from "./FeatureCards";

/** Filterable feature + archive index for /discover. */
export function DiscoverIndex() {
  const [cat, setCat] = useState<"All" | FeatureCategory>("All");
  const list = useMemo(() => features.filter((f) => f.kind === "archive" && (cat === "All" || f.category === cat)), [cat]);
  const cats = featureCategories.filter((c) => features.some((f) => f.kind === "archive" && f.category === c));

  return (
    <div>
      <LayoutGroup id="discover-filters">
        <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {(["All", ...cats] as Array<"All" | FeatureCategory>).map((c) => {
            const on = c === cat;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c)}
                className={cn(
                  "relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                  on ? "border-red text-cream" : "border-cream/20 text-cream/70 hover:border-cream/60 hover:text-cream",
                )}
              >
                {on && (
                  <motion.span layoutId="discover-pill" className="absolute inset-0 -z-10 rounded-full bg-red" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                {c}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.div layout className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((f, i) => (
            <motion.div
              key={f.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn(i % 3 === 1 && "lg:mt-16")}
            >
              <FeatureCard feature={f} aspect={i % 2 ? "aspect-[3/4]" : "aspect-[4/5]"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
