import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center bg-ink px-4 pt-[var(--nav-h)] text-center">
      <div>
        <p className="eyebrow text-red">● 00:00 · Signal lost</p>
        <h1 className="display mt-6 text-[clamp(4rem,16vw,15rem)]">
          4<span className="text-red italic">0</span>4
        </h1>
        <p className="serif-accent mt-2 text-3xl text-cream/80">This spot isn&apos;t on the map. Yet.</p>
        <div className="mt-10 flex justify-center">
          <Button href="/">Back to the city</Button>
        </div>
      </div>
    </section>
  );
}
