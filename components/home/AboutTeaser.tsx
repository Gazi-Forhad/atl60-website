import { photos } from "@/content/media";
import { ClipReveal, Reveal, SplitReveal } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Timecode } from "@/components/ui/Timecode";

const frames = [
  { src: photos.streetNightTall, alt: "Street food stall at night (placeholder photo)", label: "The streets", cls: "aspect-[3/4]" },
  { src: photos.atlNightAerial, alt: "Atlanta skyline at night (placeholder photo)", label: "The city", cls: "aspect-[4/5] md:mt-24" },
  { src: photos.friendsLaugh, alt: "Friends laughing over dinner (placeholder photo)", label: "The people", cls: "aspect-[3/4] md:mt-10" },
];

/** Section 6: about the brand (home teaser). */
export function AboutTeaser() {
  return (
    <section className="relative bg-ink py-28 md:py-40" aria-labelledby="about-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Timecode code="00:44" label="About the brand" />
            <SplitReveal id="about-title" className="display mt-8 text-[clamp(2.8rem,7vw,7.6rem)]">
              We don&apos;t just visit Atlanta. <span className="serif-accent text-red">We experience it.</span>
            </SplitReveal>
          </div>
          <Reveal className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
            <p className="text-lg text-cream/75">
              At ATL in 60 Seconds, we&apos;re passionate about discovering the people, places and flavors that make
              Atlanta special. Through food reviews, local experiences and creative content, we bring businesses and
              communities together, one story at a time.
            </p>
            <blockquote className="border-l-2 border-red pl-5">
              <p className="serif-accent text-2xl leading-snug">&ldquo;Designed for and by Atlanteans, new and old.&rdquo;</p>
              <footer className="eyebrow mt-3 text-cream/45">Our mission since 2017</footer>
            </blockquote>
            <TextLink href="/about">Our story</TextLink>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {frames.map((f, i) => (
            <figure key={f.label} className={i === 2 ? "col-span-2 md:col-span-1" : ""}>
              <ClipReveal className={`relative overflow-hidden rounded-[1rem] bg-coal-2 ${f.cls}`} delay={i * 0.12} parallax>
                <div className="absolute inset-0">
                  <Img src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 32vw, 48vw" className="object-cover" />
                </div>
              </ClipReveal>
              <figcaption className="eyebrow mt-3 flex justify-between text-cream/50">
                <span>{f.label}</span>
                <span>0{i + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
