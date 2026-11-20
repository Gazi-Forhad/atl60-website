import { cn } from "@/lib/cn";

/** CSS marquee (no JS). Duplicates content once for a seamless loop. */
export function Marquee({
  items,
  className,
  itemClassName,
  separator = "✦",
  reverse = false,
  duration = 38,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  reverse?: boolean;
  duration?: number;
}) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className={cn("flex items-center", itemClassName)}>
          <span className="px-[0.45em]">{item}</span>
          <span aria-hidden className="px-[0.2em] text-[0.55em]">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="marquee"
        data-reverse={reverse}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
