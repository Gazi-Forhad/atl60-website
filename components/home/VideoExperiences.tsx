import { socials } from "@/content/site";
import { SplitReveal } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { Timecode } from "@/components/ui/Timecode";
import { VideoGallery } from "@/components/video/VideoGallery";

/** Section 4: 60 seconds. Endless flavor. */
export function VideoExperiences() {
  return (
    <section id="videos" className="relative overflow-hidden bg-coal py-28 md:py-36" aria-labelledby="videos-title">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10vw] top-10 h-[60vw] w-[60vw] rounded-full bg-red/10 blur-[120px]"
      />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Timecode code="00:24" label="Video experiences" />
            <SplitReveal id="videos-title" className="display mt-8 text-[clamp(3.4rem,10vw,11rem)]">
              <span className="block">60 seconds.</span>
              <span className="block text-outline">Endless flavor.</span>
            </SplitReveal>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg text-cream/70">
              Short, honest and made to make you hungry. Reviews, hidden gems and the city after dark, one minute at a
              time.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              {socials.slice(0, 2).map((s) => (
                <TextLink key={s.id} href={s.href}>
                  {s.label}
                </TextLink>
              ))}
              <TextLink href="/videos" external={false}>
                All videos
              </TextLink>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <VideoGallery variant="rail" />
        </div>
      </div>
    </section>
  );
}
