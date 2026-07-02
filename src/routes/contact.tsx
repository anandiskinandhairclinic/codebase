import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { clinic, whatsappLink, telLink } from "@/lib/clinic";
import { createAppointment } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Anandi Skin & Hair Clinic" }] }),
  component: Page,
});

function Page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nameVal = (formData.get("name") || "") as string;
    const emailVal = (formData.get("email") || "") as string;
    const phoneVal = (formData.get("phone") || "") as string;
    const messageVal = (formData.get("message") || "") as string;

    try {
      // 1. Submit email alert
      await fetch("https://formsubmit.co/ajax/info@anandiclinic.in", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `Contact Form: ${nameVal}`,
          Name: nameVal,
          Email: emailVal,
          Phone: phoneVal,
          Message: messageVal,
        }),
      });

      // 2. Save in Firestore appointments log
      await createAppointment({
        name: nameVal.trim(),
        phone: phoneVal.trim(),
        email: emailVal.trim() || undefined,
        service: "Contact Inquiry",
        preferredDate: "Contact Form Submission",
        message: messageVal.trim() || undefined,
      });

      alert("Message sent! We'll get back to you shortly.");
      form.reset();
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Message sent! We'll get back to you shortly.");
    }
  };

  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">Get in touch</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">We're listening.</h1>
      </section>
      <section className="px-5 lg:px-10">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-card border border-border p-8 space-y-4">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" />
            <label className="block">
              <span className="text-sm">Message</span>
              <textarea name="message" rows={5} className="mt-2 w-full rounded-2xl bg-muted/60 px-4 py-3 text-sm focus:outline-none" />
            </label>
            <button type="submit" className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium">Send message</button>
          </form>
          <div className="space-y-4">
            <Info icon={MapPin} t="Visit us" v={`${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city}, ${clinic.address.state} — ${clinic.address.pincode}`} />
            <Info icon={Phone} t="Call" v={clinic.phone} href={telLink} />
            <Info icon={Mail} t="Email" v={clinic.email} href={`mailto:${clinic.email}`} />
            <Info icon={Clock} t="Hours" v={clinic.timings.map(t => `${t.day}: ${t.hours}`).join(" | ")} />
            <div className="rounded-3xl overflow-hidden aspect-[16/10]">
              <iframe
                src={clinic.mapEmbed}
                className="size-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm">{label}</span>
      <input type={type} name={name} className="mt-2 w-full rounded-full bg-muted/60 px-4 py-2.5 text-sm focus:outline-none" />
    </label>
  );
}
function Info({ icon: Icon, t, v, href }: { icon: any; t: string; v: string; href?: string }) {
  const content = href ? <a href={href} className="hover:underline">{v}</a> : v;
  return (
    <div className="rounded-2xl bg-card border border-border p-5 flex gap-4">
      <Icon className="size-5 text-primary mt-0.5 shrink-0" />
      <div><div className="font-medium">{t}</div><div className="text-sm text-muted-foreground mt-1">{content}</div></div>
    </div>
  );
}
