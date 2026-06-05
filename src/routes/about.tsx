import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Award, BookOpen, GraduationCap, ShieldCheck, Stethoscope, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getDoctorInfo, getClinicSettings } from "@/lib/firebaseServices";
import { clinic as fallbackClinic } from "@/lib/clinic";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Amit Jain | Dermatologist in Pune" },
      { name: "description", content: "Dr. Amit Jain, MBBS (B.J Medical College), MD Dermatology (Bharati Vidyapeeth, university first rank). 10+ years of experience, published researcher." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [clinic, setClinic] = useState(fallbackClinic);
  const [doctor, setDoctor] = useState({
    name: "Dr. Amit Jain",
    role: "Chief Dermatologist & Hair Transplant Specialist",
    qualifications: [
      "MBBS from B.J Government Medical College & Sassoon Hospital, Pune",
      "MD - Skin (Dermatology, Venereology & Leprosy) Bharati Vidyapeeth topper",
    ],
    memberships: [
      "Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)",
      "Cosmetology Society of India (CSI)",
      "Association of Hair Restoration Surgeons (AHRS)",
    ],
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=70",
    bio: "Dr. Amit Jain is a highly experienced skin specialist based in Katraj, Pune. Over the last 10+ years, he has successfully delivered clinical and aesthetic solutions for thousands of patients with a patient-first ethos.",
  });

  useEffect(() => {
    getClinicSettings().then(setClinic);
    getDoctorInfo().then(setDoctor);
  }, []);

  const qualifications = [
    { icon: GraduationCap, t: "MD - Dermatology topper", d: doctor.qualifications[1] || "Secured first rank in university" },
    { icon: GraduationCap, t: "MBBS Specialist", d: doctor.qualifications[0] || "B.J Government Medical College, Pune" },
    { icon: Trophy, t: "Best Research Paper Award", d: "Recognised for clinical research contribution, 2021" },
    { icon: BookOpen, t: "Published Research", d: "Multiple peer-reviewed publications in dermatology" },
  ];

  const achievements = [
    { icon: Users, t: "15,000+ Patients" },
    { icon: Award, t: "10+ Years Experience" },
    { icon: ShieldCheck, t: "Ethical Practice" },
    { icon: Stethoscope, t: "Personalised Care" },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="About the doctor"
        title={<>Meet <span className="text-gradient">Dr. Amit Jain</span></>}
        description={`${clinic.credentials} — leading dermatology, hair & cosmetology care in Katraj, Pune.`}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
      />
      <section className="relative isolate overflow-hidden mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="absolute -left-20 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand-teal/5 blur-3xl" />
        
        <div className="grid items-start gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-40 translate-x-3 translate-y-3 rounded-[2rem]" />
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-xl hover:scale-[1.005] transition-transform duration-300">
                <img src={doctor.imageUrl} alt={doctor.name} className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="mt-5 rounded-2xl border bg-white/70 glass p-5 shadow-sm">
              <div className="text-sm font-extrabold text-foreground">{doctor.name}</div>
              <div className="text-xs font-semibold text-primary">{doctor.role}</div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-bold text-muted-foreground">
                {achievements.map((a) => (
                  <div key={a.t} className="flex items-center gap-2 bg-secondary/60 rounded-lg p-2">
                    <a.icon className="h-3.5 w-3.5 text-primary shrink-0" /> 
                    <span>{a.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">A practice built on science, warmth and consistency</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              {doctor.bio}
            </p>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              Having topped his MD program and led published research in clinical dermatology, Dr. Jain blends academic rigour with a real-world, patient-first approach. His protocols are calibrated for Indian skin and designed for sustainable, natural-looking results.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {qualifications.map((q) => (
                <div key={q.t} className="rounded-2xl border bg-white/70 glass p-5 shadow-sm hover:-translate-y-0.5 transition-all border-glow-hover">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary">
                    <q.icon className="h-4 w-4" />
                  </div>
                  <div className="mt-3 font-extrabold text-sm text-foreground">{q.t}</div>
                  <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{q.d}</div>
                </div>
              ))}
            </div>

            <SectionHeading align="left" eyebrow="Professional memberships" title="Affiliations & accreditations" className="mt-10" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {doctor.memberships.map((m) => (
                <li key={m} className="flex items-start gap-2.5 rounded-xl border bg-white/70 glass p-4 text-xs font-semibold text-foreground hover:bg-white/95 transition-all">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {m}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="rounded-full shadow-md hover:shadow-lg"><Link to="/appointment">Book a consultation</Link></Button>
              <Button asChild variant="outline" className="rounded-full"><Link to="/services">View services catalog</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}