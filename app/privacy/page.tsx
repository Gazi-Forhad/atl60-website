import type { Metadata } from "next";
import { site } from "@/content/site";
import { Timecode } from "@/components/ui/Timecode";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ATL in 60 Seconds handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

// NOTE: Starter policy written for the pitch. Have the client review it (and a lawyer if needed) before launch.
export default function PrivacyPage() {
  return (
    <section className="bg-ink pb-28 pt-[calc(var(--nav-h)+4rem)]">
      <div className="container-x max-w-3xl">
        <Timecode code="§" label="Legal" />
        <h1 className="display mt-8 text-[clamp(3rem,8vw,7rem)]">
          Privacy <span className="serif-accent text-red">policy.</span>
        </h1>
        <p className="eyebrow mt-6 text-cream/45">Last updated: November 2026</p>

        <div className="mt-12 space-y-10 text-lg leading-relaxed text-cream/75 [&_h2]:display [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:text-cream">
          <div>
            <h2>What we collect</h2>
            <p>
              When you use our collaboration or contact form we collect the details you choose to share: your name,
              business name, email, phone number (optional), collaboration type, budget range (optional) and your
              message.
            </p>
          </div>
          <div>
            <h2>How we use it</h2>
            <p>
              Only to respond to your request and discuss a potential collaboration. We don&apos;t sell your
              information and we don&apos;t add you to marketing lists without asking.
            </p>
          </div>
          <div>
            <h2>Who processes it</h2>
            <p>
              Form submissions are delivered to our inbox through an email delivery provider. The site is hosted on a
              cloud platform that may keep standard server logs (such as IP address and browser type) for security
              and performance.
            </p>
          </div>
          <div>
            <h2>Embedded and linked content</h2>
            <p>
              Links to Instagram, Facebook and YouTube take you to those platforms, which have their own privacy
              policies. Video and images on this site may be served from third-party content delivery networks.
            </p>
          </div>
          <div>
            <h2>Your choices</h2>
            <p>
              Want us to delete what you sent? Email{" "}
              <a href={`mailto:${site.contact.email}`} className="text-cream underline underline-offset-4 hover:text-red">
                {site.contact.email}
              </a>{" "}
              and we&apos;ll take care of it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
