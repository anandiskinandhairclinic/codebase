import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Clock, ShieldCheck, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { getTreatments, type Treatment } from "@/lib/firebaseDataAdapter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Clinical Treatments — Anandi Skin & Hair Clinic" },
      { name: "description", content: "Explore our dermatologist-led medical, cosmetic, and hair restoration treatment menu in Pune." }
    ]
  }),
  component: Services,
});

function Services() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [activeTab, setActiveTab] = useState<"All" | "Skin" | "Nail" | "Hair" | "Lasers" | "Procedure" | "Aesthetic Procedure">("All");

  useEffect(() => {
    getTreatments().then(setTreatments);
  }, []);

  const filtered = treatments.filter((t) => {
    if (activeTab === "All") return true;
    return t.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <main className="pb-24 bg-[#fdfaf6] min-h-screen">
      {/* Visual Header */}
      <section className="px-5 lg:px-10 pt-24 pb-20 relative overflow-hidden bg-gradient-to-b from-[#faf6f0] to-[#fdfaf6] border-b border-[#ecdcc9]/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute -top-32 -left-32 size-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 size-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          <span className="chip bg-primary/10 text-primary border-primary/20">Clinical Offerings</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-[#5c4a37]">
            Dermatology & <em className="text-primary not-italic">Cosmetology</em> menu.
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Evidence-based treatment protocols customized for Indian skin. Find your targeted plan below or book a consultation for full assessment.
          </p>

          {/* Categories Tab selector */}
          <div className="pt-8 flex justify-center gap-3 flex-wrap">
            {(["All", "Skin", "Nail", "Hair", "Lasers", "Procedure", "Aesthetic Procedure"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 shadow-sm border cursor-pointer ${
                  activeTab === tab
                    ? "bg-primary text-white border-primary shadow-soft scale-[1.03]"
                    : "bg-white text-[#8a7560] border-[#ecdcc9] hover:bg-[#faf6f0] hover:scale-[1.01]"
                }`}
              >
                {tab === "All" ? "All Services" : 
                 tab === "Lasers" ? "Lasers" : 
                 tab === "Procedure" ? "Procedures" : 
                 tab === "Aesthetic Procedure" ? "Aesthetic Procedures" : 
                 `${tab} Treatments`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments List Grid */}
      <section className="px-5 lg:px-10 py-16">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-white border border-[#ecdcc9]/40 rounded-3xl">
              No treatments listed in this category yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((t, idx) => {
                const treatmentImg = t.image || t.imageUrl || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=70";
                return (
                  <motion.div
                    key={t.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    className="group rounded-[2rem] bg-white border border-[#ecdcc9]/60 overflow-hidden flex flex-col justify-between shadow-card hover:shadow-soft transition-all duration-500 hover:-translate-y-1.5"
                  >
                    {/* Image Header */}
                    <div className="aspect-[16/10] overflow-hidden relative bg-[#faf6f0] border-b border-[#ecdcc9]/30">
                      <img
                        src={treatmentImg}
                        alt={t.name}
                        className="size-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-wider bg-white text-[#5c4a37] border border-[#ecdcc9]/40 px-3.5 py-1.5 rounded-full shadow-sm">
                        {t.category}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-[#8a7560] font-medium">
                          <Clock className="size-3.5 text-primary" />
                          <span>{t.duration || "45 min"} duration</span>
                        </div>
                        <h3 className="font-display text-2xl text-[#5c4a37] group-hover:text-primary transition-colors duration-300">
                          {t.name}
                        </h3>
                        <p className="text-xs text-[#8a7560] leading-relaxed line-clamp-3 font-normal">
                          {t.blurb}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#ecdcc9]/40 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#5c4a37] tracking-tight">
                          {t.price ? `Starts from ₹${t.price.toLocaleString()}` : "Price on consult"}
                        </span>
                        <div className="flex gap-2">
                          <Button asChild size="sm" variant="outline" className="rounded-full text-[10px] border-[#ecdcc9] hover:bg-[#faf6f0] px-4 font-semibold">
                            <Link to="/services/$slug" params={{ slug: t.slug }}>Info</Link>
                          </Button>
                          <Button asChild size="sm" className="rounded-full text-[10px] bg-primary hover:bg-primary/95 text-white px-4 font-semibold">
                            <Link to="/appointment" search={{ service: t.name }}>Book</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Safety Section */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-12">
        <div className="rounded-[2.5rem] bg-[#faf6f0] border border-[#ecdcc9]/50 p-8 md:p-12 grid md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-white grid place-items-center text-primary border border-[#ecdcc9]/40"><ShieldCheck className="size-6" /></div>
            <div>
              <h4 className="font-display font-medium text-lg text-[#5c4a37]">100% Sterile Procedures</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Strict hygiene protocols followed.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-white grid place-items-center text-primary border border-[#ecdcc9]/40"><Heart className="size-6" /></div>
            <div>
              <h4 className="font-display font-medium text-lg text-[#5c4a37]">Personalized Guidance</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Dermatologist-led custom routines.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-white grid place-items-center text-primary border border-[#ecdcc9]/40"><Sparkles className="size-6" /></div>
            <div>
              <h4 className="font-display font-medium text-lg text-[#5c4a37]">U.S. FDA Approved Tech</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Only globally trusted lasers & tools.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
