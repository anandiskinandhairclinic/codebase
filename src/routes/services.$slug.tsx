import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowLeft, Calendar, Clock, CheckCircle2, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { getServiceBySlug } from "@/lib/firebaseDataAdapter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
  notFoundComponent: () => <div className="p-20 text-center">Treatment not found.</div>,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getServiceBySlug(slug).then((data) => {
      setService(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <main className="pb-24 flex items-center justify-center min-h-[60vh] bg-[#fdfaf6]">
        <div className="text-primary font-display text-2xl animate-pulse">Loading treatment information...</div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="pb-24 bg-[#fdfaf6] min-h-[60vh] flex flex-col justify-center items-center">
        <p className="text-lg text-muted-foreground mb-4">We couldn't find this treatment profile.</p>
        <Link to="/services">
          <Button className="rounded-full bg-primary hover:bg-primary/95 text-white">Back to Treatments</Button>
        </Link>
      </main>
    );
  }

  // Fallback image if none specified
  const displayImage = service.image || service.imageUrl || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=70";

  return (
    <main className="pb-24 bg-[#fdfaf6] min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-10">
        <Link to="/services" className="text-sm text-[#8a7560] inline-flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="size-4" /> Back to all treatments
        </Link>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-8 pb-12 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="chip bg-primary/10 text-primary border-primary/20">
            {service.category || "Treatment"}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-[#5c4a37]">
            {service.title || service.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            {service.short || service.blurb}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-[#5c4a37] bg-white border border-[#ecdcc9] px-4 py-2 rounded-full shadow-sm">
              <Clock className="size-4 text-primary" />
              <span>{service.duration || "45 min"} duration</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#5c4a37] bg-white border border-[#ecdcc9] px-4 py-2 rounded-full shadow-sm">
              <Sparkles className="size-4 text-primary" />
              <span>{service.price ? `Starts from ₹${service.price.toLocaleString()}` : "Pricing on consult"}</span>
            </div>
          </div>

          <div className="pt-4">
            <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/95 text-white px-8 h-12">
              <Link to="/appointment" search={{ service: service.title || service.name }}>
                <Calendar className="size-4 mr-2" /> Book Consultation
              </Link>
            </Button>
          </div>
        </div>

        {/* Banner Image */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -top-6 -left-6 size-48 bg-[#ecdcc9]/40 blob -z-10" />
          <div className="rounded-[2.5rem] overflow-hidden shadow-soft aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] border border-[#ecdcc9]/40">
            <img src={displayImage} alt={service.title} className="size-full object-cover" />
          </div>
        </div>
      </section>

      {/* Clinical Overview */}
      <section className="border-t border-[#ecdcc9]/40 py-16 bg-[#faf6f0]">
        <div className="mx-auto max-w-4xl px-5 text-center space-y-4">
          <h2 className="font-display text-3xl text-[#5c4a37]">Clinical Overview</h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {service.overview || "This clinical treatment protocol is designed to provide effective, targeted care under expert dermatologist guidance. Please book a physical consultation to establish your fully personalized management plan."}
          </p>
        </div>
      </section>

      {/* Symptoms & Causes Split */}
      {((service.symptoms && service.symptoms.length > 0) || (service.causes && service.causes.length > 0)) && (
        <section className="mx-auto max-w-7xl px-5 lg:px-10 py-16 grid md:grid-cols-2 gap-8">
          {service.symptoms && service.symptoms.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-[#ecdcc9]/60 shadow-sm space-y-4">
              <h3 className="font-display text-2xl text-[#5c4a37] flex items-center gap-2">
                <ShieldAlert className="size-5 text-primary" /> Target Symptoms & Concerns
              </h3>
              <ul className="space-y-2.5">
                {service.symptoms.map((sym: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-[#ecdcc9] mt-2 flex-shrink-0" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.causes && service.causes.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-[#ecdcc9]/60 shadow-sm space-y-4">
              <h3 className="font-display text-2xl text-[#5c4a37] flex items-center gap-2">
                <Sparkles className="size-5 text-primary" /> Underlying Causes
              </h3>
              <ul className="space-y-2.5">
                {service.causes.map((cause: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-[#ecdcc9] mt-2 flex-shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Treatment Process & Benefits */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-12">
        {/* Treatment Process Timeline */}
        {service.process && service.process.length > 0 && (
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-3xl text-[#5c4a37]">The Treatment Pathway</h3>
            <div className="relative border-l border-[#ecdcc9] pl-6 ml-4 space-y-8">
              {service.process.map((p: any, i: number) => (
                <div key={i} className="relative">
                  <div className="absolute -left-10 top-0 size-8 rounded-full bg-white border border-[#ecdcc9] flex items-center justify-center text-xs font-semibold text-primary shadow-sm">
                    {i + 1}
                  </div>
                  <h4 className="font-medium text-base text-[#5c4a37]">{p.step}</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits Box */}
        {service.benefits && service.benefits.length > 0 && (
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#ecdcc9]/60 shadow-sm h-fit space-y-6">
            <h3 className="font-display text-2xl text-[#5c4a37]">Treatment Benefits</h3>
            <div className="space-y-4">
              {service.benefits.map((b: string, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#5c4a37] leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FAQ Accordion */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 py-12 space-y-6">
          <h3 className="font-display text-3xl text-center text-[#5c4a37]">Common Questions</h3>
          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-[#ecdcc9]/60 p-6 space-y-2">
            {service.faqs.map((faq: any, i: number) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#ecdcc9]/30 last:border-b-0">
                <AccordionTrigger className="text-left font-medium text-[#5c4a37] py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </main>
  );
}
