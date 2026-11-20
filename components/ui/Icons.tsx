import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);

export const Play = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path d="M7 4.5v15l13-7.5-13-7.5Z" fill="currentColor" />
  </svg>
);

export const Pause = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </svg>
);

export const Volume = ({ muted, ...p }: P & { muted?: boolean }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <path d="M4 9v6h4l5 4V5L8 9H4Z" />
    {muted ? <path d="m16 9 5 6M21 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
  </svg>
);

export const Plus = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4A21 21 0 0 0 14.4 4.3c-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z"
    />
  </svg>
);

export const YouTube = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
    />
  </svg>
);

export const SocialIcon = ({ id, ...p }: P & { id: "instagram" | "facebook" | "youtube" }) =>
  id === "instagram" ? <Instagram {...p} /> : id === "facebook" ? <Facebook {...p} /> : <YouTube {...p} />;
