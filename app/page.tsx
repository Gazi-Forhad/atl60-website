import { metroAreas } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Discoveries } from "@/components/home/Discoveries";
import { VideoExperiences } from "@/components/home/VideoExperiences";
import { Services } from "@/components/home/Services";
import { ProcessReel } from "@/components/services/ProcessReel";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { Social } from "@/components/home/Social";
import { CollabCTA } from "@/components/home/CollabCTA";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Crossed tapes: the metro cities they navigate */}
      <div className="relative z-10 -mt-6 overflow-hidden py-10" aria-label="Metro Atlanta areas we cover">
        <Marquee
          items={metroAreas}
          className="-rotate-2 scale-105 bg-red py-3 text-cream"
          itemClassName="display text-[clamp(1.6rem,3vw,2.6rem)] italic"
          separator="✦"
          duration={42}
        />
        <Marquee
          items={["Food reviews", "UGC creators", "Food marketing", "Hidden gems", "Events", "Interviews"]}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[1.5deg] scale-105 bg-cream py-3 text-ink opacity-95"
          itemClassName="display text-[clamp(1.2rem,2vw,1.8rem)]"
          separator="●"
          reverse
          duration={50}
        />
      </div>

      <Intro />
      <Discoveries />
      <VideoExperiences />
      <Services />
      <ProcessReel code="00:40" />
      <AboutTeaser />
      <Testimonials code="00:50" />
      <Social code="00:54" />
      <CollabCTA code="00:58" />
    </>
  );
}
