import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Leaf, ShieldCheck, Sparkles, Users } from "lucide-react";
import { clinic } from "@/lib/clinic";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Dr. Jain's Skin Care Clinic" }, { name: "description", content: `About ${clinic.name} — ${clinic.tagline}` }] }),
  component: About,
});

function About() {
  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-12">
        <div className="mx-auto max-w-5xl text-center">
          <span className="chip">Our story</span>
          <h1 className="mt-5 font-display text-5xl lg:text-7xl leading-tight">Skin & hair care, powered by clinical expertise.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {clinic.name} was founded by {clinic.doctor} with a vision to provide evidence-based dermatology, cosmetology, and hair solutions in {clinic.address.city}. We believe in transparent, ethical care — no forced packages, no hidden costs. Just honest medicine.
          </p>
        </div>
      </section>
      <section className="px-5 lg:px-10 py-20">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-3 gap-8">
          {[
            { icon: Heart, t: "Mission", d: "To make medical-grade skin and hair care accessible, effective, and patient-first." },
            { icon: Sparkles, t: "Vision", d: "A clinic where every patient leaves with healthy skin, not just prescriptions." },
            { icon: Leaf, t: "Values", d: "Clinical integrity, transparent pricing, and evidence-based protocols. We never sell what you don't need." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-card border border-border p-8">
              <Icon className="size-6 text-primary" />
              <h3 className="mt-4 font-display text-2xl">{t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section-alt py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: Users, v: "15k+", l: "Patients treated" },
            { icon: Award, v: "3", l: "Intl. publications" },
            { icon: ShieldCheck, v: "MBBS, MD", l: "Qualified specialist" },
            { icon: Sparkles, v: "20+", l: "Treatment protocols" },
          ].map(({ icon: Icon, v, l }) => (
            <div key={l} className="rounded-3xl bg-card border border-border p-8">
              <Icon className="size-5 text-primary mx-auto" />
              <div className="font-display text-4xl mt-3">{v}</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
