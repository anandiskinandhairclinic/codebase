import { createFileRoute } from "@tanstack/react-router";
import { Play, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getTestimonialsList, type Testimonial } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/testimonials")({
  head: () => ({ meta: [{ title: "Patient Stories — Dr. Jain's Skin Care Clinic" }] }),
  component: Page,
});

function Page() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => { getTestimonialsList().then(setTestimonials); }, []);

  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">Stories</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">What our patients say.</h1>
      </section>
      <section className="px-5 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl mb-6">Video reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map(t => (
              <div key={t.name} className="rounded-3xl aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-muted to-secondary/30 grid place-items-center">
                <button className="size-16 rounded-full bg-card grid place-items-center shadow-card"><Play className="size-6" /></button>
                <div className="absolute bottom-4 left-4 right-4 text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-muted-foreground">{t.treatment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 lg:px-10 mt-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl mb-6">Written stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure key={i} className="rounded-3xl bg-card border border-border p-7">
                <div className="flex gap-0.5 mb-3">{[...Array(t.rating)].map((_, i) => <Star key={i} className="size-4 fill-secondary text-secondary" />)}</div>
                <blockquote className="font-display text-lg leading-snug">"{t.quote}"</blockquote>
                <figcaption className="mt-5 text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-muted-foreground">{t.treatment}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
