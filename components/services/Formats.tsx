import { formats } from "@/content/services";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/** Collaboration formats (proposed packages; pricing on request). */
export function Formats() {
  return (
    <Reveal className="grid gap-4 lg:grid-cols-3" stagger={0.12}>
      {formats.map((f) => (
        <article
          key={f.name}
          className={cn(
            "relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[1.5rem] border p-7 md:p-9",
            f.highlight ? "border-red bg-red text-ink" : "border-cream/10 bg-coal-2",
          )}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className={cn("eyebrow", f.highlight ? "text-ink/70" : "text-cream/50")}>{f.tag}</span>
              {f.highlight && <span className="eyebrow rounded-full bg-ink px-3 py-1 text-cream">Recommended</span>}
            </div>
            <h3 className="display mt-6 text-[clamp(2.8rem,4.4vw,4.4rem)]">{f.name}</h3>
            <p className={cn("mt-4", f.highlight ? "text-ink/80" : "text-cream/70")}>{f.body}</p>
          </div>
          <div>
            <ul className={cn("mt-8 space-y-2 border-t pt-6", f.highlight ? "border-ink/20" : "border-cream/10")}>
              {f.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span aria-hidden className={cn("h-[2px] w-4", f.highlight ? "bg-ink" : "bg-red")} />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between gap-4">
              <span className={cn("font-mono text-xs uppercase tracking-[0.14em]", f.highlight ? "text-ink/70" : "text-cream/50")}>
                Pricing on request
              </span>
              <Button href="/collaborate#form" variant={f.highlight ? "ink" : "outline"}>
                Enquire
              </Button>
            </div>
          </div>
        </article>
      ))}
    </Reveal>
  );
}
