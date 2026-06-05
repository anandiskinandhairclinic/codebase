import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarCheck, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { ServiceCard } from "@/components/site/ServiceCard";
import { getServices, getClinicSettings } from "@/lib/firebaseServices";
import { clinic as fallbackClinic } from "@/lib/clinic";
import { services as fallbackServices, type Service } from "@/lib/data";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const list = await getServices();
    const s = list.find((x) => x.slug === params.slug);
    if (!s) {
      // Fallback local search just in case database loading delays
      const fallback = fallbackServices.find((x) => x.slug === params.slug);
      if (!fallback) throw notFound();
      return fallback;
    }
    return s;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Service"} | Dr Jain's Skin Care Clinic` },
      { name: "description", content: loaderData?.short ?? "" },
    ],
    links: [{ rel: "canonical", href: `/services/${loaderData?.slug ?? ""}` }],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const s = Route.useLoaderData() as Service;
  const [clinic, setClinic] = useState(fallbackClinic);
  const [others, setOthers] = useState<Service[]>([]);

  useEffect(() => {
    getClinicSettings().then(setClinic);
    getServices().then((list) => {
      setOthers(list.filter((x) => x.slug !== s.slug).slice(0, 3));
    });
  }, [s.slug]);

  const whatsappLink = `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(`Hi, I'd like to book an appointment for ${s.title}.`)}`;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Treatment"
        title={s.title}
        description={s.short}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: s.title }]}
      />
      <section className="relative isolate overflow-hidden mx-auto max-w-7xl px-4 py-10 md:py-14">
        {/* Subtle mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/10 via-brand-frost/10 to-transparent -z-10 bg-dot-pattern opacity-50" />
        
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <div className="rounded-2xl border bg-white/70 glass p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary"><ServiceIcon name={s.icon} className="h-5 w-5" /></div>
                <h2 className="text-xl font-extrabold tracking-tight text-foreground">Treatment Overview</h2>
              </div>
              <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">{s.overview}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border bg-white/70 glass p-6 shadow-sm border-glow-hover">
                <h3 className="text-base font-extrabold text-foreground">Symptoms & Concerns</h3>
                <ul className="mt-3.5 space-y-2 text-xs text-muted-foreground leading-relaxed">
                  {s.symptoms.map((x) => <li key={x} className="flex gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0" /> <span>{x}</span></li>)}
                </ul>
              </div>
              <div className="rounded-2xl border bg-white/70 glass p-6 shadow-sm border-glow-hover">
                <h3 className="text-base font-extrabold text-foreground">Common Causes</h3>
                <ul className="mt-3.5 space-y-2 text-xs text-muted-foreground leading-relaxed">
                  {s.causes.map((x) => <li key={x} className="flex gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0" /> <span>{x}</span></li>)}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border bg-white/70 glass p-6 md:p-8 shadow-sm border-glow-hover">
              <h3 className="text-lg font-extrabold text-foreground">Our Treatment Process</h3>
              <ol className="mt-6 space-y-4">
                {s.process.map((p, i) => (
                  <li key={p.step} className="flex gap-4 items-start">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-extrabold text-primary border border-primary/20">{i + 1}</span>
                    <div>
                      <div className="text-sm font-bold text-foreground">{p.step}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{p.detail}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border bg-white/70 glass p-6 md:p-8 shadow-sm border-glow-hover">
              <h3 className="text-lg font-extrabold text-foreground">Benefits of Treatment</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-xs font-semibold text-muted-foreground leading-relaxed"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0 bg-secondary rounded-full p-0.5" /> <span>{b}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-foreground">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="mt-4 rounded-2xl border bg-white/70 glass p-1 shadow-sm">
                {s.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`f-${i}`} className="px-4 border-b last:border-b-0">
                    <AccordionTrigger className="text-left text-sm font-bold text-foreground py-3.5 hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-3.5">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="sticky top-24 rounded-2xl border bg-gradient-to-br from-brand-deep via-primary to-brand-emerald p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 -z-10 opacity-20 bg-dot-pattern" />
              <h4 className="text-lg font-extrabold text-white">Ready to start?</h4>
              <p className="mt-1.5 text-xs text-white/85 leading-relaxed">Book a personalized clinical consultation with Dr. Amit Jain.</p>
              <div className="mt-6 grid gap-2.5">
                <Button asChild className="rounded-full bg-white text-primary hover:bg-white/95 font-bold shadow-md hover:-translate-y-0.5 transition-all">
                  <Link to="/appointment"><CalendarCheck className="mr-2 h-4 w-4" /> Book Appointment</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 font-bold shadow-md hover:-translate-y-0.5 transition-all">
                  <a href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us</a>
                </Button>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="text-xl font-semibold tracking-tight">Explore related treatments</h3>
            <Link to="/services" className="text-sm text-primary">All services <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => <ServiceCard key={o.slug} service={o} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}