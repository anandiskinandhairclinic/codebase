import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/data";

const getCategory = (slug: string) => {
  if (["prp-therapy", "hair-fall-treatment"].includes(slug)) return "Trichology";
  if (["anti-aging-treatment", "cosmetology-procedures"].includes(slug)) return "Cosmetology";
  if (["nail-disorders", "skin-allergy-treatment"].includes(slug)) return "Medical Care";
  return "Dermatology";
};

export function ServiceCard({ service }: { service: Service }) {
  const cat = getCategory(service.slug);
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
    >
      {/* Decorative luxury gradient glow at the top-right */}
      <div className="absolute -right-16 -top-16 -z-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-secondary/40" />

      <div>
        <div className="flex items-center justify-between">
          <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/80 text-primary transition-all duration-500 group-hover:scale-105 group-hover:bg-primary group-hover:text-white shadow-sm ring-4 ring-secondary/30">
            <ServiceIcon name={service.icon} className="h-5.5 w-5.5" />
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/10 bg-accent px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary shadow-xs">
            <Sparkles className="h-3 w-3 text-primary/75" />
            {cat}
          </span>
        </div>
        
        <h3 className="text-xl font-extrabold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>
        
        <p className="mt-3.5 text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {service.short}
        </p>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-border/40 pt-4">
        <span className="text-xs font-bold text-muted-foreground transition-all duration-300 group-hover:text-foreground">
          View Details
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-white shadow-xs">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}