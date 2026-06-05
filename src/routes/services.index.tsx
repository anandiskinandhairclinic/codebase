import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { getServices } from "@/lib/firebaseServices";
import { services as fallbackServices } from "@/lib/data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | Dr Jain's Skin Care Clinic, Pune" },
      { name: "description", content: "Acne, pigmentation, PRP, hair fall, peels, anti-aging, scars and more. Dermatology and cosmetology services in Katraj, Pune." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const [servicesList, setServicesList] = useState(fallbackServices);

  useEffect(() => {
    getServices().then(setServicesList);
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our services"
        title={<>Complete <span className="text-gradient">skin, hair & cosmetology</span> care</>}
        description="A modern dermatology suite — every treatment delivered by Dr. Amit Jain himself."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />
      <section className="relative isolate overflow-hidden mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/15 via-brand-frost/20 to-transparent -z-10 bg-dot-pattern opacity-60" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}