import { cn } from "@/lib/cn";

/**
 * Section label in the "60-second reel" system: ● 00:15 — LATEST DISCOVERIES
 */
export function Timecode({
  code,
  label,
  className,
  tone = "cream",
}: {
  code: string;
  label: string;
  className?: string;
  tone?: "cream" | "ink";
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", tone === "ink" ? "text-ink" : "text-cream/70", className)}>
      <span aria-hidden className={cn("size-2 rounded-full", tone === "ink" ? "bg-ink" : "bg-red")} />
      <span className={tone === "ink" ? "text-ink" : "text-cream"}>{code}</span>
      <span aria-hidden className={cn("h-px w-8", tone === "ink" ? "bg-ink/40" : "bg-cream/30")} />
      <span>{label}</span>
    </p>
  );
}
