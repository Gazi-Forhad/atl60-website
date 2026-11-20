import type { Metadata } from "next";
import { socials } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { VideoGallery } from "@/components/video/VideoGallery";
import { SocialIcon, ArrowUpRight } from "@/components/ui/Icons";
import { Timecode } from "@/components/ui/Timecode";
import { CollabCTA } from "@/components/home/CollabCTA";

export const metadata: Metadata = {
  title: "Video Experiences | 60-Second Atlanta Food Reels",
  description:
    "Watch ATL in 60 Seconds food reviews, hidden gems, restaurant experiences and Atlanta events, one minute at a time.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        code="00:24"
        label="Video experiences"
        title={
          <>
            <span className="block">60 seconds.</span>
            <span className="block text-outline">Endless flavor.</span>
          </>
        }
        intro="Vertical, honest and made for your feed. Hover to preview, tap to watch full screen, filter by what you're craving."
        aside={
          <ul className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2.5 text-sm transition-colors hover:border-red hover:bg-red"
                >
                  <SocialIcon id={s.id} /> {s.label} <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        }
      />

      <section className="bg-ink pb-32" aria-label="Video library">
        <div className="container-x">
          <Timecode code="▶" label="The library" className="mb-8" />
          <VideoGallery variant="grid" />
        </div>
      </section>

      <CollabCTA />
    </>
  );
}
