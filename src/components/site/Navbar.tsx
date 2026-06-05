import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClinicSettings } from "@/lib/firebaseServices";
import { clinic as fallbackClinic } from "@/lib/clinic";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [clinic, setClinic] = useState(fallbackClinic);

  useEffect(() => {
    getClinicSettings().then(setClinic);

    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const telLink = `tel:${clinic.phone.replace(/\s/g, "")}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled ? "glass border-b border-primary/10 shadow-sm py-2" : "bg-transparent py-3 md:py-4"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary font-extrabold shadow-sm border border-primary/10">
            <span className="text-xs text-gradient-teal">DJ</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight text-foreground md:text-base">{clinic.name}</div>
            <div className="hidden text-[10px] font-bold text-muted-foreground md:block">{clinic.credentials.split("(")[0]}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary bg-secondary font-bold border-primary/20" }}
              className="rounded-full border border-transparent px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-all duration-200 hover:bg-secondary/80 hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={telLink} className="hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors xl:inline-flex">
            <Phone className="h-3.5 w-3.5" /> {clinic.phone}
          </a>
          <Button asChild className="rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Link to="/appointment">Book Appointment</Link>
          </Button>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="rounded-md p-2 lg:hidden text-foreground hover:bg-secondary" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-background/95 backdrop-blur-md lg:hidden shadow-lg animate-fade-up">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeProps={{ className: "text-primary bg-secondary font-bold" }} className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">
                {n.label}
              </Link>
            ))}
            <Button asChild className="mt-2 rounded-full">
              <Link to="/appointment" onClick={() => setOpen(false)}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
