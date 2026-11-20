"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { nav, site, socials } from "@/content/site";
import { cn } from "@/lib/cn";
import { LogoBadge } from "@/components/ui/Brand";
import { SocialIcon } from "@/components/ui/Icons";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastY = useRef(0);
  const scroll = useSmoothScroll();
  const menuBtn = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, reveal on scroll up; go solid after the hero.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes (state adjusted during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) scroll.stop();
    else scroll.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, scroll]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-red focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-expo)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          solid && !open ? "border-b border-cream/10 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name}, home`}>
            <LogoBadge size={46} className="transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-[-12deg]" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="display-italic text-[1.05rem]">
                ATL <span className="text-red">in</span> 60
              </span>
              <span className="eyebrow mt-1 text-[0.6rem] text-cream/55">Seconds · Atlanta</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-cream/10 bg-ink/30 p-1 backdrop-blur-md">
              {nav.slice(0, 5).map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-[0.82rem] font-medium tracking-wide transition-colors",
                        active ? "text-ink" : "text-cream/80 hover:text-cream",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-cream"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/collaborate"
              className="hidden h-11 items-center gap-2 rounded-full bg-red px-5 font-display text-[0.85rem] font-bold uppercase tracking-[0.06em] text-cream transition-colors [font-stretch:85%] hover:bg-cream hover:text-ink md:inline-flex"
            >
              <span className="rec-dot size-1.5 rounded-full bg-current" aria-hidden />
              Book a collab
            </Link>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group relative grid size-11 place-items-center rounded-full border border-cream/20 bg-ink/40 backdrop-blur-md transition-colors hover:border-cream"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                <span className={cn("h-[2px] w-full bg-cream transition-transform duration-500", open && "translate-y-[3.5px] rotate-45")} />
                <span className={cn("h-[2px] w-full bg-cream transition-transform duration-500", open && "-translate-y-[3.5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[48] overflow-y-auto bg-ink"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="container-x flex min-h-full flex-col justify-between pb-10 pt-[calc(var(--nav-h)+2rem)]">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-cream/10">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between gap-4 py-3 sm:py-4"
                      >
                        <span className="display text-[clamp(2.6rem,min(8vw,10.5vh),6.5rem)] transition-colors duration-300 group-hover:text-red">
                          {item.label}
                        </span>
                        <span className="eyebrow text-cream/45 transition-colors group-hover:text-cream">{item.code}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="space-y-1 text-cream/70">
                  <p className="eyebrow text-cream/45">Bookings</p>
                  <a href={`mailto:${site.contact.email}`} className="block text-lg text-cream hover:text-red">
                    {site.contact.email}
                  </a>
                  <a href={site.contact.phoneHref} className="block hover:text-red">
                    {site.contact.phone}
                  </a>
                </div>
                <ul className="flex gap-2">
                  {socials.map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid size-12 place-items-center rounded-full border border-cream/20 text-xl transition-colors hover:border-red hover:bg-red"
                      >
                        <SocialIcon id={s.id} />
                        <span className="sr-only">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
