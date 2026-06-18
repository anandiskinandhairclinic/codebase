import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { getTreatments, type Treatment } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Treatments — Dr. Jain's Skin Care Clinic" }, { name: "description", content: "Full menu of skin & hair treatments by Dr. Amit Jain." }] }),
  component: Services,
});

function Services() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  useEffect(() => { getTreatments().then(setTreatments); }, []);

  const skin = treatments.filter(t => t.category === "Skin");
  const hair = treatments.filter(t => t.category === "Hair");

  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">Treatments</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">Our treatment protocols.</h1>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Medical, cosmetic, restorative. Each plan begins with a consult to find your right protocol.</p>
      </section>

      {[{ title: "Skin", list: skin }, { title: "Hair", list: hair }].map(group => (
        <section key={group.title} className="px-5 lg:px-10 py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl mb-8">{group.title} treatments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.list.map(t => (
                <div key={t.slug} className="rounded-3xl bg-card border border-border p-8 hover:shadow-card transition-shadow">
                  <div className="size-12 grid place-items-center rounded-2xl bg-primary/10 text-primary mb-5"><Sparkles className="size-5" /></div>
                  <h3 className="font-display text-2xl">{t.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{t.blurb}</p>
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="benefits" className="border-b border-border/60">
                      <AccordionTrigger className="text-sm py-2">Benefits</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">Visible improvement from session 1–3 · Safe for sensitive skin · Personalised plan</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="procedure" className="border-b border-border/60">
                      <AccordionTrigger className="text-sm py-2">Procedure</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">Consult → patch test → treatment ({t.duration}) → aftercare kit.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq" className="border-b border-border/60">
                      <AccordionTrigger className="text-sm py-2">FAQs</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">Most patients see noticeable change in 4–6 weeks. Downtime is minimal.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-medium">{t.price ? `From ₹${t.price.toLocaleString()}` : "On consult"}</span>
                    <Link to="/appointment" className="text-sm text-primary inline-flex items-center gap-1">Book <ArrowRight className="size-4" /></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
