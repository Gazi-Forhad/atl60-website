# ATL in 60 Seconds: website

Custom Next.js 16 site for **ATL in 60 Seconds**, an Atlanta food & lifestyle media brand.
Concept: *the whole site is a 60-second reel* (scroll-linked REC timecode, story-style hero, timecoded sections).

Stack: Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText) · Lenis · Motion for React.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
|---|---|
| Brand facts, nav, socials, verified stats | `content/site.ts` |
| **All placeholder photos & videos (swap here)** | `content/media.ts` |
| Features + YouTube archive | `content/features.ts` |
| Video reels + hero montage | `content/videos.ts` |
| Services, process, formats, FAQ | `content/services.ts` |
| Facebook testimonials | `content/testimonials.ts` |
| Design tokens, type utilities, curtain/grain/marquee CSS | `app/globals.css` |
| Animation primitives (SplitReveal, ClipReveal, WordScrub, Counter) | `components/motion/Reveal.tsx` |
| Smooth scroll (Lenis ↔ GSAP) | `components/motion/SmoothScroll.tsx` |
| Form API (Resend) | `app/api/collaborate/route.ts` |

## Contact form

Copy `.env.example` to `.env.local` (or set the same values in Vercel):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=atlin60sec@gmail.com
CONTACT_FROM_EMAIL="ATL in 60 Website <hello@atlin60seconds.com>"
```

Without these, the form validates and then tells the visitor the inbox isn't connected yet (with email/IG fallbacks). It never fakes a success.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project →** import the repo (framework auto-detected).
3. Add the env vars above, then deploy. Share the `*.vercel.app` link with the client.

Or from this folder: `npx vercel` (log in when asked).

## Before launch

See `../docs/01-BLUEPRINT.md` → *Launch checklist*. In short: replace the media, verify the contact details and dates, connect Resend, and point the domain.
