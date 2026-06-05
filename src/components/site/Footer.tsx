import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Clock, Lock } from "lucide-react";
import { getClinicSettings, getServices } from "@/lib/firebaseServices";
import { clinic as fallbackClinic } from "@/lib/clinic";
import { services as fallbackServices } from "@/lib/data";

export function Footer() {
  const [clinic, setClinic] = useState(fallbackClinic);
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    getClinicSettings().then(setClinic);
    getServices().then(setServices);
  }, []);

  const telLink = `tel:${clinic.phone.replace(/\s/g, "")}`;
  const whatsappLink = `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(clinic.whatsappMessage)}`;

  return (
    <footer className="mt-20 border-t bg-soft-band">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 ring-soft">
              <span className="text-sm font-semibold text-gradient">DJ</span>
            </div>
            <div className="font-semibold">{clinic.name}</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Premium dermatology, hair & cosmetology care led by {clinic.doctor}.
          </p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href={clinic.socials.instagram} aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href={clinic.socials.facebook} aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href={clinic.socials.youtube} aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">Explore</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Doctor</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
            <li><Link to="/appointment" className="hover:text-foreground">Book Appointment</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Top Treatments</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-foreground">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Visit Us</div>
          <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {clinic.address.line1}, {clinic.address.line2}, {clinic.address.city} – {clinic.address.pincode}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4" /> <a href={telLink}>{clinic.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${clinic.email}`}>{clinic.email}</a></li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                {clinic.timings.map((t) => (
                  <div key={t.day}><span className="text-foreground/80">{t.day}:</span> {t.hours}</div>
                ))}
              </div>
            </li>
          </ul>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-emerald-500/90 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-500">
            WhatsApp Consultation
          </a>
        </div>
      </div>
      <div className="border-t/50 border-t border-white/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link to="/admin" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>Admin Login</span>
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link to="/receptionist" className="hover:text-foreground transition-colors flex items-center gap-1">
              <span>Receptionist Login</span>
            </Link>
          </div>
          <p>Designed with care · Premium dermatology in Katraj, Pune</p>
        </div>
      </div>
    </footer>
  );
}
