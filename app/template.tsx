import type { ReactNode } from "react";

/**
 * Editorial page transition: a brand-red curtain lifts on every route.
 * Pure CSS (see .curtain in globals.css), so content is never trapped
 * behind it if JS is slow, and it's removed for reduced-motion users.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden className="curtain grid place-items-center">
        <span className="curtain__mark display-italic text-[clamp(2.5rem,7vw,5rem)] text-cream">
          ATL <span className="text-ink">in</span> 60
        </span>
      </div>
      {children}
    </>
  );
}
