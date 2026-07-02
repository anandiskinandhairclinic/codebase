import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Leaf, ShieldCheck, Heart, Star, MapPin, Clock, MessageSquare, CheckCircle } from "lucide-react";
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
  getProductsList,
  getClinicInfo,
  productImage,
  type Treatment,
  type Testimonial,
  type Stat,
  type FAQ,
  type Doctor,
  type Product,
} from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anandi Skin & Hair Clinic — Advanced Skin & Hair Solutions in Pune" },
      { name: "description", content: "Expert dermatology, cosmetology, and hair transplant solutions by Dr. Vishakha Patil. MBBS, MD Skin. Located in Katraj/Ambegaon, Pune." },
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
  const [products, setProducts] = useState<Product[]>([]);
  const [clinicDetails, setClinicDetails] = useState<any>(null);

  useEffect(() => {
    getTreatments().then(setTreatments);
    getTestimonialsList().then(setTestimonials);
    getStatsList().then(setStats);
    getFaqList().then(setFaqs);
    getDoctorsList().then((docs) => setDoctor(docs[0] || null));
    getProductsList().then(setProducts);
    getClinicInfo().then(setClinicDetails);
  }, []);

  const featured = treatments.slice(0, 6);

  return (
    <main className="bg-[#fdfaf6] min-h-screen text-[#5c4a37]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-12 lg:pt-20 pb-20 grid lg:grid-cols-12 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-6">
            <span className="chip"><Leaf className="size-3" /> Dermatology · Cosmetology · Hair Transplant</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-[#5c4a37]">
              Beautiful, <em className="text-primary not-italic">healthy skin</em> starts with <em className="text-accent not-italic">expert</em> clinical care.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Advanced dermatology, cosmetology, and laser solutions customized for Indian skin by Dr. Vishakha Patil.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 h-12">
                <Link to="/appointment">Book Consultation <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 border-foreground/20 hover:bg-[#faf6f0]">
                <Link to="/contact">Free Skin Analysis</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {stats.slice(0, 3).map(s => (
                <div key={s.label}>
                  <div className="font-display text-3xl text-[#5c4a37]">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="lg:col-span-6 relative">
            <div className="absolute -top-10 -right-10 size-72 bg-secondary/40 blob -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-6 size-56 bg-primary/15 blob -z-10 animate-pulse" />
            <div className="rounded-[3rem] overflow-hidden shadow-soft aspect-[4/5] border border-[#ecdcc9]/30">
              <img src={hero} alt="Anandi Skin & Hair Clinic" className="size-full object-cover" />
            </div>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
              className="absolute -bottom-6 left-6 bg-card rounded-2xl shadow-card p-4 flex items-center gap-3 w-64 border border-[#ecdcc9]/40">
              <div className="size-11 grid place-items-center rounded-full bg-success/15 text-success"><Heart className="size-5" /></div>
              <div>
                <div className="text-sm font-semibold text-[#5c4a37]">15,000+ Patients Treated</div>
                <div className="text-xs text-muted-foreground">with ethical clinical care</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TREATMENTS (Redesigned with Images & CTAs) */}
      <section className="section-alt py-24 border-y border-[#ecdcc9]/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="chip bg-primary/10 text-primary border-primary/20">Our Services</span>
              <h2 className="mt-4 font-display text-4xl lg:text-5xl max-w-2xl text-[#5c4a37]">Personalised skin & hair protocols.</h2>
            </div>
            <Link to="/services" className="text-sm text-primary font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">Explore all treatments <ArrowRight className="size-4" /></Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((t, i) => {
              const displayImg = t.image || t.imageUrl || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=70";
              return (
                <motion.div
                  key={t.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-[2rem] bg-white border border-[#ecdcc9]/50 overflow-hidden flex flex-col justify-between hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] overflow-hidden relative bg-[#faf6f0] border-b border-[#ecdcc9]/30">
                    <img
                      src={displayImg}
                      alt={t.name}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider bg-white/95 text-[#5c4a37] px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                      {t.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5 text-primary/75" />
                        <span>{t.duration || "45 min"} duration</span>
                      </div>
                      <h3 className="font-display text-2xl text-[#5c4a37] group-hover:text-primary transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {t.blurb}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#ecdcc9]/40 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#5c4a37]">
                        {t.price ? `Starts from ₹${t.price.toLocaleString()}` : "Price on consult"}
                      </span>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline" className="rounded-full text-xs border-[#ecdcc9] hover:bg-[#faf6f0] px-4">
                          <Link to="/services/$slug" params={{ slug: t.slug }}>Info</Link>
                        </Button>
                        <Button asChild size="sm" className="rounded-full text-xs bg-primary hover:bg-primary/95 text-white px-4">
                          <Link to="/appointment" search={{ service: t.name }}>Book</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEET DOCTOR */}
      {doctor && (
        <section className="py-24 bg-[#fdfaf6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-8 -left-6 size-64 bg-primary/15 blob -z-10 animate-pulse" />
              <div className="rounded-[3rem] overflow-hidden shadow-soft aspect-[4/5] max-w-md border border-[#ecdcc9]/30">
                <img src={doctor.image} alt={doctor.name} className="size-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="chip bg-primary/10 text-primary border-primary/20">Meet your doctor</span>
              <h2 className="font-display text-4xl lg:text-5xl text-[#5c4a37]">A practice built on clinical integrity & patient trust.</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-[#5c4a37]">{doctor.name}</strong> — {doctor.title}. {doctor.bio}
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {[
                  { icon: ShieldCheck, label: "MBBS, MD Skin" },
                  { icon: Heart, label: "15k+ Patients" },
                  { icon: Star, label: `${doctor.experience} Experience` },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl border border-[#ecdcc9]/50 bg-white p-4 flex items-center gap-3 shadow-sm">
                    <Icon className="size-5 text-primary" />
                    <span className="text-xs font-semibold text-[#5c4a37]">{label}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Button asChild className="rounded-full bg-[#5c4a37] hover:bg-[#483a2b] text-white"><Link to="/about">Learn more about Dr. Vishakha Patil</Link></Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCTS */}
      <section className="section-alt py-24 border-t border-[#ecdcc9]/40 bg-[#faf6f0]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div>
              <span className="chip bg-primary/10 text-primary border-primary/20">Clinic Cosmeceuticals</span>
              <h2 className="mt-4 font-display text-4xl lg:text-5xl text-[#5c4a37]">Doctor-recommended skin & hair care.</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The exact formulations we recommend in-clinic, curated for your daily routine at home.
            </p>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/95 text-white"><Link to="/products">Shop the edit <ArrowRight className="ml-1 size-4" /></Link></Button>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {products.slice(0, 4).map(p => (
                <div key={p.id} className="rounded-2xl bg-white border border-[#ecdcc9]/50 p-4 shadow-sm">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-primary">{p.category}</div>
                  <div className="font-display text-base text-[#5c4a37] mt-1 truncate">{p.name}</div>
                  <div className="text-xs font-medium text-muted-foreground mt-2">₹{p.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="absolute -top-8 -right-6 size-72 bg-accent/20 blob -z-10 animate-pulse" />
            <div className="rounded-[3rem] overflow-hidden shadow-soft aspect-[4/3] border border-[#ecdcc9]/30">
              <img src={productImage} alt="Clinic products" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Realistic Google Reviews) */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-[#fdfaf6] border-t border-[#ecdcc9]/40">
          <div className="mx-auto max-w-7xl px-5 lg:px-10 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="chip bg-primary/10 text-primary border-primary/20">Social Proof</span>
              <h2 className="font-display text-4xl lg:text-5xl text-[#5c4a37]">Google Reviews & Feedback</h2>
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#ecdcc9] shadow-sm text-xs">
                {/* Google Logo SVG */}
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-semibold text-[#5c4a37]">{clinicDetails?.rating || "5.0"} Stars Rating</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{clinicDetails?.reviews || "17"} verified reviews</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 6).map((t, i) => {
                return (
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-3xl bg-white border border-[#ecdcc9]/60 p-7 shadow-sm flex flex-col justify-between hover:shadow-soft transition-all relative group"
                  >
                    {/* Google watermark */}
                    <svg className="absolute right-6 top-6 size-5 opacity-10 group-hover:opacity-20 transition-opacity text-[#a1a1aa]" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                    </svg>
                    
                    <div className="space-y-4 flex-1 flex flex-col justify-between mb-6">
                      <div className="space-y-4">
                        {/* Stars and verified */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-0.5">
                            {[...Array(t.rating)].map((_, idx) => (
                              <Star key={idx} className="size-4 fill-[#fbbc05] text-[#fbbc05]" />
                            ))}
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="size-3" /> Verified Google Review
                          </span>
                        </div>

                        <blockquote className="text-sm font-medium italic text-[#5c4a37] leading-relaxed">
                          "{t.quote}"
                        </blockquote>
                      </div>

                      {t.ownerReply && (
                        <div className="mt-3 p-3 bg-[#faf6f0] border border-[#ecdcc9]/40 rounded-2xl text-[10px] text-[#8a7560] leading-relaxed">
                          <span className="font-bold block text-[#5c4a37] mb-0.5">Anandi Clinic (owner):</span>
                          "{t.ownerReply}"
                        </div>
                      )}
                    </div>

                    <figcaption className="mt-6 flex items-center gap-3 pt-4 border-t border-[#ecdcc9]/30">
                      <div className="size-10 rounded-full bg-[#f4ece1] text-[#5c4a37] font-semibold text-sm flex items-center justify-center uppercase">
                        {t.name.substring(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-[#5c4a37] flex items-center gap-1.5">
                          <span className="truncate">{t.name}</span>
                          <span className="size-3.5 rounded-full bg-[#fbbc05] flex items-center justify-center text-white flex-shrink-0" title="Google Reviewer">
                            <span className="text-[8px] font-bold">G</span>
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground flex flex-wrap items-center gap-1 mt-0.5">
                          <span>{t.sub || "1 review"}</span>
                          <span>·</span>
                          <span>{t.date || "1 month ago"}</span>
                        </div>
                        <div className="text-[9px] text-[#8a7560] font-medium mt-1">
                          Treatment: {t.treatment}
                        </div>
                      </div>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      {faqs.length > 0 && (
        <section className="py-24 bg-[#faf6f0] border-t border-[#ecdcc9]/40">
          <div className="mx-auto max-w-3xl px-5 lg:px-10">
            <div className="text-center mb-12">
              <span className="chip">Clarification</span>
              <h2 className="mt-4 font-display text-4xl text-[#5c4a37]">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="bg-white rounded-3xl border border-[#ecdcc9]/60 p-6 shadow-sm space-y-2">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f${i}`} className="border-b border-[#ecdcc9]/30 last:border-0">
                  <AccordionTrigger className="text-left font-display text-lg py-4 text-[#5c4a37] hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* VISIT US & MAP */}
      {clinicDetails && (
        <section className="py-24 border-t border-[#ecdcc9]/40 bg-[#fdfaf6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="chip bg-primary/10 text-primary border-primary/20">Clinic Location</span>
              <h2 className="font-display text-4xl lg:text-5xl text-[#5c4a37]">Visit Anandi Skin & Hair Clinic</h2>
              <p className="text-muted-foreground leading-relaxed">
                Come visit Dr. Vishakha Patil for specialized physical examinations. Our clinic is conveniently located with comfortable interiors and sterile procedural suites.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex gap-3 items-start">
                  <MapPin className="size-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-[#5c4a37]">Address</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {clinicDetails.address?.line1}, {clinicDetails.address?.line2}, {clinicDetails.address?.city}, {clinicDetails.address?.state} - {clinicDetails.address?.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Clock className="size-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-[#5c4a37]">Hours & Timings</h4>
                    <div className="text-sm text-muted-foreground mt-0.5 space-y-1">
                      {clinicDetails.timings?.map((t: any, idx: number) => (
                        <p key={idx}><span className="font-medium text-[#5c4a37]">{t.day}:</span> {t.hours}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden aspect-video border border-[#ecdcc9]/40 shadow-soft bg-muted relative">
              {clinicDetails.mapEmbed ? (
                <iframe
                  title="Anandi Clinic Map Location"
                  src={clinicDetails.mapEmbed}
                  className="size-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="size-full flex items-center justify-center text-muted-foreground text-xs p-4">Google Map coordinate not configured in settings.</div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-5 lg:px-10 pb-24 bg-[#fdfaf6]">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-foreground text-background p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-80 bg-primary/30 blob" />
          <div className="absolute -bottom-20 -left-20 size-80 bg-accent/20 blob" />
          <div className="relative">
            <h2 className="font-display text-4xl lg:text-6xl max-w-3xl mx-auto leading-tight text-white">Begin with a clinical skin & hair consultation.</h2>
            <p className="mt-6 text-background/70 max-w-xl mx-auto">Meet Dr. Vishakha Patil for an in-depth visual analysis. No forced packages, just clinical clarity.</p>
            <Button asChild size="lg" className="mt-8 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-8">
              <Link to="/appointment">Book Slot Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
