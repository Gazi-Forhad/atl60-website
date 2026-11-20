import { cn } from "@/lib/cn";

/** Rotating text badge, the "stamp" of the brand. Pure SVG + CSS. */
export function SpinBadge({
  id,
  text = "ATL IN 60 SECONDS · ONE BITE AT A TIME · ",
  className,
}: {
  id: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative grid aspect-square place-items-center rounded-full bg-ink text-cream", className)} aria-hidden>
      <svg viewBox="0 0 200 200" className="spin absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text className="fill-current" style={{ fontSize: 15.5, letterSpacing: 3.2, fontFamily: "var(--font-geist-mono)" }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="display-italic text-[2.6rem] text-red">60</span>
    </div>
  );
}
