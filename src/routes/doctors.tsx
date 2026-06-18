import { createFileRoute } from "@tanstack/react-router";
import { Award, GraduationCap, Sparkles, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { getDoctorsList, type Doctor } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/doctors")({
  head: () => ({ meta: [{ title: "Our Doctor — Dr. Jain's Skin Care Clinic" }] }),
  component: Page,
});

function Page() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  useEffect(() => { getDoctorsList().then(setDoctors); }, []);

  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">The Doctor</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">Expert care you can trust.</h1>
      </section>
      <section className="px-5 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-16">
          {doctors.map((d, i) => (
            <div key={d.slug} className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-5">
                <div className="rounded-[3rem] overflow-hidden aspect-[4/5] shadow-soft">
                  <img src={d.image} alt={d.name} className="size-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="text-sm uppercase tracking-wider text-primary">{d.title}</div>
                <h2 className="font-display text-4xl lg:text-5xl mt-2">{d.name}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{d.bio}</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <Info icon={GraduationCap} t="Qualifications" items={d.qualifications} />
                  <Info icon={Sparkles} t="Specialties" items={d.specialties} />
                  {d.awards.length > 0 && <Info icon={BookOpen} t="Publications & Awards" items={d.awards} />}
                  <Info icon={Award} t="Experience" items={[d.experience]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Info({ icon: Icon, t, items }: { icon: any; t: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-center gap-2 text-sm font-medium"><Icon className="size-4 text-primary" />{t}</div>
      <ul className="mt-2 text-sm text-muted-foreground space-y-1">{items.map(i => <li key={i}>· {i}</li>)}</ul>
    </div>
  );
}
