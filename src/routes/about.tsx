import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Leaf, ShieldCheck, Sparkles, Users, GraduationCap, BookOpen, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getDoctorsList, getGalleryImages, getClinicInfo, type Doctor } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/about")({
  head: () => ({ 
    meta: [
      { title: "About Us & Doctor Bio — Anandi Skin & Hair Clinic" }, 
      { name: "description", content: "Learn about Anandi Clinic, Dr. Vishakha Patil (MBBS, MD), our clinical story, ethics, and modern environment." }
    ] 
  }),
  component: About,
});

function About() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [clinicImages, setClinicImages] = useState<any[]>([]);
  const [clinicDetails, setClinicDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getDoctorsList(),
      getGalleryImages(),
      getClinicInfo()
    ]).then(([docs, gallery, info]) => {
      setDoctor(docs[0] || null);
      
      const clinicPics = (gallery || [])
        .map((item: any) => ({
          id: item.id || "",
          src: item.src || item.imageUrl || "",
          category: item.category || "Clinic",
          caption: item.caption || ""
        }))
        .filter((item) => item.category === "Clinic");
      setClinicImages(clinicPics);
      setClinicDetails(info);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load about us details: ", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main className="pb-24 flex items-center justify-center min-h-[60vh] bg-[#fdfaf6]">
        <div className="text-primary font-display text-2xl animate-pulse">Loading Anandi Clinic details...</div>
      </main>
    );
  }

  return (
    <main className="pb-24 bg-[#fdfaf6] min-h-screen">
      {/* Clinic Story Hero */}
      <section className="px-5 lg:px-10 pt-20 pb-12 relative overflow-hidden bg-[#faf6f0] border-b border-[#ecdcc9]/50 text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-6 relative">
          <span className="chip bg-primary/10 text-primary border-primary/20">Our Story</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-[#5c4a37]">
            Clinical integrity, <em className="text-primary not-italic">expert</em> skin care.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {clinicDetails?.name || "Anandi Skin & Hair Clinic"} was founded with a dedicated vision: to provide evidence-based, highly personalized dermatology, hair care, and aesthetic solutions. We work strictly under medical guidelines, offering transparent treatments with zero pushy sales.
          </p>
        </div>
      </section>

      {/* Meet the Doctor Section */}
      {doctor && (
        <section className="px-5 lg:px-10 py-20 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="chip">Chief Dermatologist</span>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-[#5c4a37]">Expert care led by Dr. Vishakha Patil</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Doctor Photo */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -bottom-6 -left-6 size-48 bg-primary/10 blob -z-10 animate-pulse" />
              <div className="rounded-[3rem] overflow-hidden aspect-[4/5] shadow-soft border border-[#ecdcc9]/40">
                <img src={doctor.image} alt={doctor.name} className="size-full object-cover" loading="lazy" />
              </div>
            </div>

            {/* Doctor Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-bold">{doctor.title}</span>
                <h3 className="font-display text-3xl md:text-4xl text-[#5c4a37] mt-1">{doctor.name}</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                {doctor.bio}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl bg-white border border-[#ecdcc9]/60 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#5c4a37]">
                    <GraduationCap className="size-4 text-primary" /> Qualifications
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                    {doctor.qualifications.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-white border border-[#ecdcc9]/60 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#5c4a37]">
                    <Sparkles className="size-4 text-primary" /> Core Specialties
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                    {doctor.specialties?.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    )) || (
                      <>
                        <li>Clinical Dermatology</li>
                        <li>Aesthetics & Cosmetology</li>
                        <li>Hair Transplant Surgery</li>
                        <li>Laser Procedures</li>
                      </>
                    )}
                  </ul>
                </div>


              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Values Section */}
      <section className="bg-[#faf6f0] border-y border-[#ecdcc9]/40 py-20 px-5 lg:px-10">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-3 gap-8">
          {[
            { icon: Heart, t: "Mission", d: "To deliver ethical, science-backed skin and hair procedures customized perfectly for Indian skin." },
            { icon: Sparkles, t: "Vision", d: "To build a clinic where patients receive honest consultations, premium support, and natural results." },
            { icon: Leaf, t: "Values", d: "Clinical integrity, evidence-based medicines, and transparent price menus. No forced treatments, ever." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-white border border-[#ecdcc9]/60 p-8 shadow-sm space-y-4">
              <Icon className="size-6 text-primary" />
              <h3 className="font-display text-2xl text-[#5c4a37]">{t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clinic Environment Gallery */}
      {clinicImages.length > 0 && (
        <section className="px-5 lg:px-10 py-20 mx-auto max-w-7xl space-y-12">
          <div className="text-center">
            <span className="chip">Our Environment</span>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-[#5c4a37]">Inside Anandi Skin & Hair Clinic</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">A sterile, state-of-the-art atmosphere designed for comfort and premium care.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {clinicImages.map((img) => (
              <div key={img.id} className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#ecdcc9]/30 bg-muted shadow-sm">
                <img src={img.src} alt={img.caption} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white">
                  <p className="text-xs font-semibold">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Clinic Info Grid */}
      {clinicDetails && (
        <section className="mx-auto max-w-7xl px-5 lg:px-10 py-10">
          <div className="rounded-[2.5rem] bg-white border border-[#ecdcc9]/60 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="font-display text-3xl text-[#5c4a37]">Clinic Coordinates</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <MapPin className="size-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-[#5c4a37]">Address</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {clinicDetails.address?.line1}, {clinicDetails.address?.line2}, {clinicDetails.address?.city}, {clinicDetails.address?.state} - {clinicDetails.address?.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Clock className="size-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-[#5c4a37]">Hours</h4>
                    <div className="text-sm text-muted-foreground mt-0.5 space-y-1">
                      {clinicDetails.timings?.map((t: any, idx: number) => (
                        <p key={idx}><span className="font-medium">{t.day}:</span> {t.hours}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden aspect-video bg-muted border border-[#ecdcc9]/40 relative">
              {clinicDetails.mapEmbed ? (
                <iframe
                  title="Google Map Location"
                  src={clinicDetails.mapEmbed}
                  className="size-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="size-full flex items-center justify-center text-muted-foreground text-xs p-4 text-center">Google Map Embed code not configured in settings.</div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
