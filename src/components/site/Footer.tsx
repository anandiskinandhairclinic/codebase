import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { clinic, whatsappLink } from "@/lib/clinic";

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20 grid gap-12 lg:grid-cols-4">
        <div>
          <div className="font-display text-3xl">Dr. Jain's.</div>
          <p className="mt-4 text-sm text-background/70 leading-relaxed">
            {clinic.tagline}. Expert dermatology, cosmetology & hair transplant solutions by {clinic.doctor}.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: clinic.socials.instagram },
              { Icon: Facebook, href: clinic.socials.facebook },
              { Icon: Youtube, href: clinic.socials.youtube },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="size-9 grid place-items-center rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-colors">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-xl mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/services">Treatments</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/doctors">Our Doctor</Link></li>
            <li><Link to="/before-after">Real Results</Link></li>
            <li><Link to="/blog">Journal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xl mb-4">Clinic</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex gap-3"><MapPin className="size-4 mt-0.5 shrink-0" /> {clinic.address.line1}, {clinic.address.line2}, {clinic.address.city} — {clinic.address.pincode}</li>
            <li className="flex gap-3"><Phone className="size-4 mt-0.5 shrink-0" /> <a href={`tel:${clinic.phone.replace(/\s/g, "")}`}>{clinic.phone}</a></li>
            <li className="flex gap-3"><Mail className="size-4 mt-0.5 shrink-0" /> <a href={`mailto:${clinic.email}`}>{clinic.email}</a></li>
          </ul>
          <div className="mt-4 text-sm text-background/70">
            {clinic.timings.map(t => (
              <div key={t.day}><strong>{t.day}:</strong> {t.hours}</div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-xl mb-4">Quick Connect</h4>
          <p className="text-sm text-background/70 mb-4">Book a consultation or ask us anything on WhatsApp.</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-medium hover:bg-secondary/90 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
      <div className="border-t border-background/10 py-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} {clinic.name}. All rights reserved.
      </div>
    </footer>
  );
}
