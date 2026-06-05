import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { getClinicSettings, getTestimonials } from "@/lib/firebaseServices";
import { clinic as fallbackClinic } from "@/lib/clinic";
import { testimonials as fallbackTestimonials } from "@/lib/data";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Patient Reviews | Dr Jain's Skin Care Clinic, Pune" },
      { name: "description", content: "Read Google-verified patient reviews of Dr. Amit Jain — dermatologist in Katraj, Pune. 4.8★ with 140+ reviews." },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [clinic, setClinic] = useState(fallbackClinic);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    getClinicSettings().then(setClinic);
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Patient stories"
        title={<>Loved by <span className="text-gradient">our patients</span></>}
        description="Honest words from people we've cared for."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Reviews" }]}
      />
      <section className="relative isolate overflow-hidden mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/10 via-brand-frost/10 to-transparent -z-10 bg-dot-pattern opacity-50" />
        
        <div className="mb-10 rounded-3xl border bg-white/70 glass p-8 text-center md:p-10 shadow-sm relative overflow-hidden bg-gradient-to-br from-white/95 to-brand-frost/20">
          <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40" />
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Overall Clinic Rating</div>
          <div className="mt-2.5 flex items-center justify-center gap-4">
            <span className="text-5xl font-extrabold tracking-tight text-foreground">{clinic.rating}</span>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              </div>
              <div className="mt-1 text-left text-[11px] font-bold text-muted-foreground">{clinic.reviews}+ verified Google reviews</div>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => <TestimonialCard key={idx} t={t} />)}
        </div>
      </section>
    </SiteLayout>
  );
}