import { SplitReveal } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { Timecode } from "@/components/ui/Timecode";
import { ServiceStack } from "@/components/services/ServiceStack";

/** Section 5: our services. */
export function Services() {
  return (
    <section id="services" className="relative bg-ink pb-24 pt-28 md:pt-36" aria-labelledby="services-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <Timecode code="00:32" label="Services" />
            <SplitReveal id="services-title" className="display mt-8 text-[clamp(2.8rem,7.4vw,8.2rem)]">
              <span className="block">Your brand.</span>
              <span className="block serif-accent text-red">Our storytelling.</span>
              <span className="block">Atlanta&apos;s attention.</span>
            </SplitReveal>
          </div>
          <div className="lg:col-span-3">
            <p className="text-cream/65">
              Four ways we put restaurants and brands in front of the people who actually go out and eat in Atlanta.
            </p>
            <TextLink href="/services" className="mt-6">
              Services in detail
            </TextLink>
          </div>
        </div>
        <div className="mt-16 md:mt-24">
          <ServiceStack />
        </div>
      </div>
    </section>
  );
}
