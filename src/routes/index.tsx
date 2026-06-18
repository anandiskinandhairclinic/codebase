import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Leaf, ShieldCheck, Heart, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import {
  getTreatments,
  getTestimonialsList,
  getStatsList,
  getFaqList,
  getDoctorsList,
  productList,
  productImage,
  type Treatment,
  type Testimonial,
  type Stat,
  type FAQ,
  type Doctor,
} from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Jain's Skin Care Clinic — Advanced Skin & Hair Solutions in Pune" },
      { name: "description", content: "Expert dermatology, cosmetology, and hair transplant solutions by Dr. Amit Jain. MBBS, MD Skin. Located in Katraj, Pune." },
    ],
  }),
  component: Home,
});

function Home() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<Stat[]>([
    { value: "10+", label: "Years experience" },
    { value: "15k+", label: "Happy patients" },
    { value: "4.8★", label: "Google rating" },
  ]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    getTreatments().then(setTreatments);
    getTestimonialsList().then(setTestimonials);
    getStatsList().then(setStats);
    getFaqList().then(setFaqs);
    getDoctorsList().then((docs) => setDoctor(docs[0] || null));
  }, []);

  const featured = treatments.slice(0, 6);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-12 lg:pt-20 pb-20 grid lg:grid-cols-12 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-6">
            <span className="chip"><Leaf className="size-3" /> Dermatology · Cosmetology · Hair Transplant</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              Beautiful, <em className="text-primary not-italic">healthy skin</em> starts with <em className="text-accent not-italic">expert</em> clinical care.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Advanced dermatology, cosmetology, and laser solutions customized for Indian skin by Dr. Amit Jain.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 h-12">
                <Link to="/appointment">Book Consultation <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 border-foreground/20 hover:bg-foreground hover:text-background">
                <Link to="/contact">Free Skin Analysis</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {stats.slice(0, 3).map(s => (
                <div key={s.label}>
                  <div className="font-display text-3xl text-foreground">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="lg:col-span-6 relative">
            <div className="absolute -top-10 -right-10 size-72 bg-secondary/40 blob -z-10" />
            <div className="absolute -bottom-10 -left-6 size-56 bg-primary/15 blob -z-10" />
            <div className="rounded-[3rem] overflow-hidden shadow-soft aspect-[4/5]">
              <img src={hero} alt="Dr. Jain's Skin Care Clinic" className="size-full object-cover" />
            </div>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
              className="absolute -bottom-6 left-6 bg-card rounded-2xl shadow-card p-4 flex items-center gap-3 w-64">
              <div className="size-11 grid place-items-center rounded-full bg-success/15 text-success"><Heart className="size-5" /></div>
              <div>
                <div className="text-sm font-medium">15,000+ patients treated</div>
                <div className="text-xs text-muted-foreground">with care & expertise</div>
              </div>
            </motion.div>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
              className="absolute top-6 -left-6 bg-card rounded-2xl shadow-card p-4 hidden md:flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="size-8 rounded-full bg-muted border-2 border-card" />)}
              </div>
              <div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-secondary text-secondary" />)}</div>
                <div className="text-xs text-muted-foreground">4.8 · 140+ reviews</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="section-alt py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="chip">Our Treatments</span>
              <h2 className="mt-4 font-display text-4xl lg:text-5xl max-w-2xl">Personalised skin & hair care protocols.</h2>
            </div>
            <Link to="/services" className="text-sm text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">Explore all treatments <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((t, i) => (
              <motion.div key={t.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="group rounded-3xl bg-card p-8 hover:shadow-card transition-shadow border border-border/60">
                <div className="size-12 grid place-items-center rounded-2xl bg-primary/10 text-primary mb-6"><Sparkles className="size-5" /></div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.category}</div>
                <h3 className="mt-2 font-display text-2xl">{t.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.blurb}</p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.duration}</span>
                  <span className="font-medium">{t.price ? `₹${t.price.toLocaleString()}` : "On consult"}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      {doctor && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-8 -left-6 size-64 bg-primary/15 blob -z-10" />
              <div className="rounded-[3rem] overflow-hidden shadow-soft aspect-[4/5] max-w-md">
                <img src={doctor.image} alt={doctor.name} className="size-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="chip">Meet your doctor</span>
              <h2 className="mt-4 font-display text-4xl lg:text-5xl">A practice built on clinical integrity & patient trust.</h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">{doctor.name}</strong> — {doctor.title}. {doctor.bio}
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: ShieldCheck, label: "MBBS, MD Skin" },
                  { icon: Heart, label: "15k+ patients" },
                  { icon: Star, label: `${doctor.experience}` },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
                    <Icon className="size-5 text-primary" />
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 rounded-full bg-foreground text-background hover:bg-foreground/90"><Link to="/doctors">Learn more about Dr. Jain</Link></Button>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCTS */}
      <section className="section-alt py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="chip">Clinic Cosmeceuticals</span>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl">Doctor-recommended skin & hair care.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The exact formulations we recommend in-clinic, curated for your daily routine at home.
            </p>
            <Button asChild className="mt-8 rounded-full bg-primary hover:bg-primary/90"><Link to="/products">Shop the edit <ArrowRight className="ml-1 size-4" /></Link></Button>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {productList.slice(0, 4).map(p => (
                <div key={p.id} className="rounded-2xl bg-card border border-border p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</div>
                  <div className="font-display text-lg mt-1">{p.name}</div>
                  <div className="text-sm mt-2">₹{p.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="absolute -top-8 -right-6 size-72 bg-accent/20 blob -z-10" />
            <div className="rounded-[3rem] overflow-hidden shadow-soft aspect-[4/3]">
              <img src={productImage} alt="Clinic products" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="chip">Real stories</span>
              <h2 className="mt-4 font-display text-4xl lg:text-5xl">What our patients say.</h2>
            </div>
            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.figure key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-3xl bg-card border border-border p-8">
                  <div className="flex gap-0.5 mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="size-4 fill-secondary text-secondary" />)}</div>
                  <blockquote className="font-display text-xl leading-snug">"{t.quote}"</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-muted-foreground">{t.treatment}</div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STATS */}
      <section className="section-alt py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="font-display text-5xl lg:text-6xl text-primary">{s.value}</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-10">
            <div className="text-center mb-12">
              <span className="chip">FAQ</span>
              <h2 className="mt-4 font-display text-4xl">Frequently asked questions.</h2>
            </div>
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f${i}`} className="border-b border-border">
                  <AccordionTrigger className="text-left font-display text-xl py-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-5 lg:px-10 pb-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-foreground text-background p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-80 bg-primary/30 blob" />
          <div className="absolute -bottom-20 -left-20 size-80 bg-accent/20 blob" />
          <div className="relative">
            <h2 className="font-display text-4xl lg:text-6xl max-w-3xl mx-auto leading-tight">Begin with a complimentary skin & hair consultation.</h2>
            <p className="mt-6 text-background/70 max-w-xl mx-auto">Meet Dr. Amit Jain for a personalised analysis. No commitment, just clarity.</p>
            <Button asChild size="lg" className="mt-8 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8"><Link to="/appointment">Book my free consult</Link></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
