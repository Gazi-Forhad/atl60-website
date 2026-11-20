import Image from "next/image";
import { cn } from "@/lib/cn";

/** Round logo badge, from the client's supplied logo. */
export function LogoBadge({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/atl60-badge.png"
      alt="ATL in 60 Seconds logo"
      width={size}
      height={size}
      className={cn("rounded-full", className)}
    />
  );
}

/**
 * Type-built wordmark that echoes the logo (heavy italic, red "IN"
 * tab, red "60", speed lines). Scales with font-size, so it stays
 * sharp at any size. The supplied logo is only 200px.
 */
export function Wordmark({ className, seconds = true }: { className?: string; seconds?: boolean }) {
  return (
    <span className={cn("inline-flex items-end leading-none select-none", className)} aria-label="ATL in 60 Seconds">
      <span aria-hidden className="display-italic">ATL</span>
      <span
        aria-hidden
        className="display-italic mx-[0.04em] mb-[0.12em] -skew-x-12 bg-red px-[0.12em] pb-[0.02em] pt-[0.06em] text-[0.38em] text-cream"
      >
        IN
      </span>
      <span aria-hidden className="display-italic text-red">60</span>
      {seconds && (
        <span aria-hidden className="display-italic mb-[0.08em] ml-[0.12em] text-[0.36em]">
          SECONDS<sup className="text-[0.4em] align-super">™</sup>
        </span>
      )}
    </span>
  );
}

/** Speed lines lifted from the logo. Animated by CSS/GSAP via .speed-line. */
export function SpeedLines({ className }: { className?: string }) {
  const lines = [
    { y: 6, w: 70 },
    { y: 22, w: 100 },
    { y: 38, w: 84 },
    { y: 54, w: 56 },
  ];
  return (
    <svg viewBox="0 0 100 60" className={cn("-skew-x-[14deg] text-red", className)} aria-hidden preserveAspectRatio="xMaxYMid meet">
      {lines.map((l, i) => (
        <rect key={i} className="speed-line" x={100 - l.w} y={l.y} width={l.w} height="7" rx="1" fill="currentColor" />
      ))}
    </svg>
  );
}
