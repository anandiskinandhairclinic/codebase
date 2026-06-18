import { Link } from "@tanstack/react-router";
import { Menu, X, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Treatments" },
  { to: "/products", label: "Shop" },
  { to: "/doctors", label: "Our Doctor" },
  { to: "/before-after", label: "Results" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center size-9 rounded-full bg-primary text-primary-foreground">
            <Stethoscope className="size-4" strokeWidth={1.6} />
          </span>
          <span className="font-display text-2xl tracking-tight">Dr. Jain's<span className="text-primary">.</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-9 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/75 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="ghost" className="rounded-full"><Link to="/admin">Admin</Link></Button>
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"><Link to="/appointment">Book Consult</Link></Button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="px-5 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1.5">{n.label}</Link>
            ))}
            <Link to="/appointment" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm">Book Consult</Link>
          </div>
        </div>
      )}
    </header>
  );
}
