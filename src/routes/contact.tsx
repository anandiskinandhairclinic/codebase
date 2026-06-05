import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Siren, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { getClinicSettings, createAppointment } from "@/lib/firebaseServices";
import { clinic as fallbackClinic } from "@/lib/clinic";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Dr Jain's Skin Care Clinic, Katraj, Pune" },
      { name: "description", content: "Call clinic directly or visit Katraj, Pune. WhatsApp booking available." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [clinic, setClinic] = useState(fallbackClinic);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getClinicSettings().then(setClinic);
  }, []);

  const telLink = `tel:${clinic.phone.replace(/\s/g, "")}`;
  const whatsappLink = `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(clinic.whatsappMessage)}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !phone || !msg) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      await createAppointment({
        name,
        phone,
        email,
        service: "General Message Inquiry",
        preferredDate: "ASAP",
        message: msg
      });
      toast.success("Message sent — we'll get back to you shortly.");
      setName("");
      setPhone("");
      setEmail("");
      setMsg("");
    } catch (err: any) {
      toast.error("Error sending message: " + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Get in touch"
        title={<>We're here to <span className="text-gradient">help</span></>}
        description="Reach us via phone, WhatsApp or by filling the form below."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <section className="relative isolate overflow-hidden mx-auto grid max-w-7xl gap-8 px-4 py-10 md:py-14 md:grid-cols-3">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/10 via-brand-frost/10 to-transparent -z-10 bg-dot-pattern opacity-50" />
        
        <div className="space-y-4 md:col-span-1">
          <div className="rounded-2xl border bg-white/70 glass p-5 shadow-sm border-glow-hover hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary shrink-0" /><div className="text-sm font-extrabold text-foreground">Address</div></div>
            <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{clinic.address.line1}<br />{clinic.address.line2}<br />{clinic.address.city} – {clinic.address.pincode}</p>
          </div>
          <div className="rounded-2xl border bg-white/70 glass p-5 shadow-sm border-glow-hover hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary shrink-0" /><div className="text-sm font-extrabold text-foreground">Phone</div></div>
            <a href={telLink} className="mt-2 block text-xs md:text-sm font-bold text-primary hover:underline">{clinic.phone}</a>
          </div>
          <div className="rounded-2xl border bg-white/70 glass p-5 shadow-sm border-glow-hover hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary shrink-0" /><div className="text-sm font-extrabold text-foreground">Email</div></div>
            <a href={`mailto:${clinic.email}`} className="mt-2 block text-xs md:text-sm font-semibold text-primary hover:underline">{clinic.email}</a>
          </div>
          <div className="rounded-2xl border bg-white/70 glass p-5 shadow-sm border-glow-hover hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-primary shrink-0" /><div className="text-sm font-extrabold text-foreground">Timings</div></div>
            <div className="mt-2 space-y-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed">
              {clinic.timings.map((t) => <div key={t.day}><span className="font-bold text-foreground/80">{t.day}:</span> {t.hours}</div>)}
            </div>
          </div>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-xs md:text-sm font-bold text-white shadow-md hover:bg-emerald-600 hover:-translate-y-0.5 transition-all">
            <MessageCircle className="h-4 w-4" /> WhatsApp Consultation
          </a>
          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 shadow-sm">
            <div className="flex items-center gap-3"><Siren className="h-4 w-4 text-rose-600 shrink-0" /><div className="text-sm font-extrabold text-rose-700">Emergency?</div></div>
            <p className="mt-2 text-xs text-rose-700/80 leading-relaxed">For severe allergic reactions or acute skin emergencies, please call us directly at <a className="font-bold underline text-rose-800" href={telLink}>{clinic.phone}</a> or visit your nearest hospital.</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <form onSubmit={onSubmit} className="rounded-[2.5rem] border bg-white/70 glass p-6 md:p-8 shadow-md">
            <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">Send us a message</h2>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-relaxed">We typically respond to clinical inquiries within a few hours.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-xs font-bold text-foreground">Full Name</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 bg-white/50 border-primary/20 focus-visible:ring-primary rounded-xl" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs font-bold text-foreground">Phone Number</Label>
                <Input id="phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 bg-white/50 border-primary/20 focus-visible:ring-primary rounded-xl" placeholder="+91" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email" className="text-xs font-bold text-foreground">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 bg-white/50 border-primary/20 focus-visible:ring-primary rounded-xl" placeholder="you@email.com" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="msg" className="text-xs font-bold text-foreground">Message / Clinical Concerns</Label>
                <Textarea id="msg" required rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} className="mt-1.5 bg-white/50 border-primary/20 focus-visible:ring-primary rounded-2xl" placeholder="Briefly describe your skin or hair concern..." />
              </div>
            </div>
            <Button type="submit" disabled={sending} className="mt-6 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all font-bold">
              {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send clinical message"}
            </Button>
          </form>
          <div className="overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-xl">
            <iframe title="Map" src={clinic.mapEmbed} className="h-[360px] w-full" loading="lazy" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}