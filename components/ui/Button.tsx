import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Variant = "red" | "outline" | "ink" | "ink-outline" | "cream";

const variants: Record<Variant, string> = {
  red: "bg-red text-cream border-red before:bg-cream hover:text-ink",
  outline: "border-cream/35 text-cream before:bg-cream hover:text-ink",
  ink: "bg-ink text-cream border-ink before:bg-cream hover:text-ink",
  "ink-outline": "border-ink/70 text-ink before:bg-ink hover:text-cream",
  cream: "bg-cream text-ink border-cream before:bg-red hover:text-cream",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: ReactNode | false;
  className?: string;
  cursor?: string;
};

/**
 * Pill CTA with a fill-sweep hover. Uses <Link> for internal routes and
 * a hardened <a> for external ones.
 */
export function Button({ href, children, variant = "red", external, icon, className, cursor }: Props) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const cls = cn(
    "group relative isolate inline-flex h-14 items-center justify-between gap-5 overflow-hidden rounded-full border pl-7 pr-2",
    "font-display text-[0.95rem] font-bold uppercase tracking-[0.06em] [font-stretch:85%]",
    "transition-colors duration-500 ease-[var(--ease-expo)]",
    "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:rounded-full before:transition-transform before:duration-500 before:ease-[var(--ease-expo)] hover:before:scale-y-100",
    variants[variant],
    className,
  );
  const iconNode =
    icon === false ? null : (
      <span
        aria-hidden
        className={cn(
          "grid size-10 place-items-center rounded-full text-lg transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-rotate-45",
          variant === "red" ? "bg-ink/25" : variant === "cream" ? "bg-ink/10" : "bg-current/10",
        )}
      >
        {icon ?? (isExternal ? <ArrowUpRight /> : <ArrowRight />)}
      </span>
    );

  if (isExternal) {
    const newTab = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        data-cursor={cursor}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>{children}</span>
        {iconNode}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-cursor={cursor}>
      <span>{children}</span>
      {iconNode}
    </Link>
  );
}

/** Underlined text link with arrow. */
export function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const isExternal = external ?? /^https?:/.test(href);
  const cls = cn(
    "group inline-flex items-center gap-2 eyebrow text-cream",
    "bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 hover:bg-[length:0%_1px] transition-[background-size] duration-500",
    className,
  );
  const arrow = isExternal ? (
    <ArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  ) : (
    <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
  );
  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      {arrow}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}
