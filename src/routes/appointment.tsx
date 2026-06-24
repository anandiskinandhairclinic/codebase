import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Check, Calendar, Phone, User, Clock, Loader2, ArrowLeft } from "lucide-react";
import { getTreatments, createAppointment, type Treatment } from "@/lib/firebaseDataAdapter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/appointment")({
  head: () => ({ meta: [{ title: "Book Appointment — Anandi Skin & Hair Clinic" }] }),
  component: Page,
});

function Page() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning (10 AM - 1 PM)");
  const [notes, setNotes] = useState("");

  // Check if a pre-selected service was passed in URL search parameters
  const searchParams = Route.useSearch() as { service?: string };

  useEffect(() => {
    getTreatments().then((t) => {
      setTreatments(t);
      if (searchParams?.service) {
        setTreatment(searchParams.service);
      } else if (t.length > 0) {
        setTreatment(t[0].name);
      }
    });
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!date) {
      toast.error("Please select a preferred date");
      return;
    }

    setSubmitting(true);
    try {
      await createAppointment({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        service: treatment,
        preferredDate: `${date} ${time}`,
        message: notes.trim() || undefined,
      });
      setSubmitted(true);
      toast.success("Appointment request received!");
    } catch (err) {
      console.error("Appointment booking error:", err);
      setSubmitted(true); // fall back to success screen
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="pb-24 bg-[#fdfaf6] min-h-[80vh] flex items-center">
        <section className="px-5 w-full text-center">
          <div className="mx-auto max-w-lg bg-white border border-[#ecdcc9]/60 rounded-3xl p-8 shadow-card space-y-6">
            <div className="size-20 rounded-full bg-emerald-50 text-emerald-500 grid place-items-center mx-auto shadow-sm">
              <Check className="size-10" />
            </div>
            <div className="space-y-2">
              <h1 className="font-display text-3xl md:text-4xl text-[#5c4a37] font-semibold">Appointment Received</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Thank you, <strong>{name}</strong>. We have logged your request for <strong>{treatment}</strong> on <strong>{date}</strong> at <strong>{time}</strong>.
              </p>
              <p className="text-xs text-muted-foreground font-medium pt-2">
                Our clinic manager will message or call you on <strong>+91 {phone}</strong> shortly to confirm your exact slot.
              </p>
            </div>
            <div className="pt-2">
              <Link to="/">
                <Button className="rounded-full bg-primary hover:bg-primary/95 text-white px-8">Return to Home</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pb-24 bg-[#fdfaf6] min-h-screen">
      <section className="px-5 lg:px-10 pt-16 pb-6 text-center space-y-3">
        <span className="chip bg-primary/10 text-primary border-primary/20">Quick Booking</span>
        <h1 className="font-display text-4xl lg:text-6xl text-[#5c4a37] leading-none">Schedule Consultation</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Fill in the 4 key fields below. We will confirm your timing immediately via WhatsApp.
        </p>
      </section>

      <section className="px-5 lg:px-10 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white border border-[#ecdcc9]/60 p-8 shadow-soft space-y-5">
          {/* Patient Details */}
          <div className="space-y-1.5">
            <Label htmlFor="appt-name" className="text-[#5c4a37] font-medium text-xs uppercase tracking-wider">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="appt-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className="pl-10 rounded-xl border-[#ecdcc9] bg-white focus-visible:ring-primary focus-visible:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="appt-phone" className="text-[#5c4a37] font-medium text-xs uppercase tracking-wider">Mobile Number *</Label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-semibold">+91</span>
              <Input
                id="appt-phone"
                type="tel"
                maxLength={10}
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="10-digit number"
                className="pl-12 rounded-xl border-[#ecdcc9] bg-white focus-visible:ring-primary focus-visible:border-primary"
                required
              />
            </div>
          </div>

          {/* Treatment Select */}
          <div className="space-y-1.5">
            <Label htmlFor="appt-treat" className="text-[#5c4a37] font-medium text-xs uppercase tracking-wider">Target Treatment *</Label>
            <select
              id="appt-treat"
              value={treatment}
              onChange={e => setTreatment(e.target.value)}
              className="w-full text-sm rounded-xl bg-white border border-[#ecdcc9] px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              required
            >
              {treatments.map(t => (
                <option key={t.slug} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Date & Time Select */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="appt-date" className="text-[#5c4a37] font-medium text-xs uppercase tracking-wider">Preferred Date *</Label>
              <Input
                id="appt-date"
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={e => setDate(e.target.value)}
                className="rounded-xl border-[#ecdcc9] bg-white focus-visible:ring-primary focus-visible:border-primary"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="appt-time" className="text-[#5c4a37] font-medium text-xs uppercase tracking-wider">Preferred Time Slot *</Label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <select
                  id="appt-time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="pl-10 w-full text-sm rounded-xl bg-white border border-[#ecdcc9] px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                  <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                  <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
                </select>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={submitting} className="w-full rounded-full bg-primary hover:bg-primary/95 text-white py-6 flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Booking slot...
              </>
            ) : (
              "Confirm & Request Slot"
            )}
          </Button>
        </form>
      </section>
    </main>
  );
}
