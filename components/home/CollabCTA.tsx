import { site } from "@/content/site";
import { SplitReveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SpeedLines } from "@/components/ui/Brand";
import { Timecode } from "@/components/ui/Timecode";
import { CollabForm } from "@/components/forms/CollabForm";

/** Section 9: the conversion point. Brand red, big type, real form. */
export function CollabCTA({ code = "00:58" }: { code?: string }) {
  return (
    <section id="collaborate" className="relative overflow-hidden bg-red py-24 text-ink md:py-32" aria-labelledby="cta-title">
      <SpeedLines className="pointer-events-none absolute -left-[8vw] top-10 h-[34vw] w-[60vw] text-ink/[0.07]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-between gap-12 lg:col-span-6">
          <div>
            <Timecode code={code} label="Collaborate" tone="ink" />
            <SplitReveal id="cta-title" className="display mt-8 text-[clamp(3.2rem,8vw,8.6rem)]">
              Your business deserves to be <span className="serif-accent">seen.</span>
            </SplitReveal>
            <p className="mt-8 max-w-md text-xl leading-snug text-ink/80">
              Let&apos;s tell your story, showcase your brand and connect you with the Atlanta community.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="#collab-form" variant="ink">
                Book a collaboration
              </Button>
              <Button href="/contact" variant="ink-outline">
                Let&apos;s create together
              </Button>
            </div>
          </div>
          <div className="grid gap-1 font-mono text-sm text-ink/75">
            <a href={`mailto:${site.contact.email}`} className="hover:text-ink">
              {site.contact.email}
            </a>
            <a href={site.contact.phoneHref} className="hover:text-ink">
              {site.contact.phone}
            </a>
          </div>
        </div>

        <div id="collab-form" className="scroll-mt-28 rounded-[1.5rem] bg-ink p-6 text-cream shadow-[0_40px_100px_-30px_rgba(0,0,0,.6)] sm:p-10 lg:col-span-6">
          <div className="mb-8 flex items-center justify-between">
            <p className="display text-3xl">Start a collab</p>
            <span className="eyebrow flex items-center gap-2 text-cream/50">
              <span className="rec-dot size-2 rounded-full bg-red" aria-hidden /> Replies within 48h
            </span>
          </div>
          <CollabForm compact />
        </div>
      </div>
    </section>
  );
}
