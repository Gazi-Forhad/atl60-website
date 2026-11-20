import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ClipReveal, Reveal, SplitReveal } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { Timecode } from "@/components/ui/Timecode";

/** Shared inner-page hero: timecode, masked H1, intro and a cinematic image band. */
export function PageHero({
  code,
  label,
  title,
  intro,
  image,
  imageAlt = "",
  aside,
  imageClassName = "aspect-[16/10] md:aspect-[21/9]",
  titleSize = "text-[clamp(3.3rem,11vw,12.5rem)]",
}: {
  titleSize?: string;
  code: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
  imageClassName?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-[calc(var(--nav-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--nav-h)+5rem)]">
      <div className="container-x">
        <Timecode code={code} label={label} />
        <SplitReveal as="h1" trigger="load" delay={0.45} className={cn("display mt-8", titleSize)}>
          {title}
        </SplitReveal>
        {(intro || aside) && (
          <Reveal className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12" delay={0.6} start="top 100%">
            {intro && <div className="text-lg leading-relaxed text-cream/75 md:text-xl lg:col-span-5">{intro}</div>}
            {aside && <div className="lg:col-span-6 lg:col-start-7 lg:justify-self-end">{aside}</div>}
          </Reveal>
        )}
      </div>
      {image && (
        <div className="container-x mt-14 md:mt-20">
          <ClipReveal className={cn("relative overflow-hidden rounded-[1.5rem] bg-coal-2", imageClassName)} parallax delay={0.3}>
            <div className="absolute inset-0">
              <Img src={image} alt={imageAlt} fill preload sizes="(min-width: 1600px) 1520px, 96vw" className="object-cover" />
            </div>
          </ClipReveal>
        </div>
      )}
    </section>
  );
}
