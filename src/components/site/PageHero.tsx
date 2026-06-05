import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb?: { label: string; to?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-soft-radial bg-dot-pattern opacity-95" />
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        {breadcrumb && (
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1">
                {b.to ? (
                  <Link to={b.to} className="hover:text-primary transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-foreground">{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-secondary/80 px-3.5 py-1 text-[10px] font-bold text-primary uppercase tracking-wider">{eyebrow}</span>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-foreground md:text-4xl leading-tight">{title}</h1>
        {description && (
          <p className="mt-3.5 max-w-2xl text-xs md:text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}