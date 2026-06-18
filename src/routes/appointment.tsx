import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { getTreatments, createAppointment, type Treatment } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/appointment")({
  head: () => ({ meta: [{ title: "Book Appointment — Dr. Jain's Skin Care Clinic" }] }),
  component: Page,
});

function Page() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({ name: "", email: "", phone: "", treatment: "", date: "", time: "10:00", notes: "" });
  const steps = ["You", "Treatment", "When", "Confirm"];

  useEffect(() => {
    getTreatments().then((t) => {
      setTreatments(t);
      if (t.length > 0) setData(d => ({ ...d, treatment: t[0].name }));
    });
  }, []);

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await createAppointment({
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.treatment,
        preferredDate: `${data.date} ${data.time}`,
        message: data.notes,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Appointment error:", err);
      setSubmitted(true); // still show success (fallback behavior from firebaseServices)
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="pb-24">
        <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
          <div className="mx-auto max-w-lg">
            <div className="size-20 rounded-full bg-success/15 grid place-items-center mx-auto mb-6">
              <Check className="size-8 text-success" />
            </div>
            <h1 className="font-display text-4xl lg:text-5xl">Appointment Requested!</h1>
            <p className="mt-4 text-muted-foreground">Thank you, {data.name}. We'll confirm your appointment for <strong>{data.treatment}</strong> on {data.date || "your preferred date"} shortly.</p>
            <p className="mt-2 text-sm text-muted-foreground">You'll receive a confirmation via phone/WhatsApp.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">Book</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">Book your consultation.</h1>
      </section>
      <section className="px-5 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-card border border-border p-8 lg:p-10 shadow-soft">
          <div className="flex justify-between mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`size-8 rounded-full grid place-items-center text-sm ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i < step ? <Check className="size-4" /> : i + 1}
                </div>
                <div className={`text-xs uppercase tracking-wider ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
                {i < steps.length - 1 && <div className="flex-1 h-px bg-border" />}
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              {step === 0 && (
                <>
                  <Field label="Full name" value={data.name} onChange={v => setData({ ...data, name: v })} />
                  <Field label="Email" value={data.email} onChange={v => setData({ ...data, email: v })} />
                  <Field label="Phone" value={data.phone} onChange={v => setData({ ...data, phone: v })} />
                </>
              )}
              {step === 1 && (
                <label className="block">
                  <span className="text-sm">Treatment</span>
                  <select value={data.treatment} onChange={e => setData({ ...data, treatment: e.target.value })} className="mt-2 w-full rounded-full bg-muted/60 px-4 py-2.5 text-sm">
                    {treatments.map(t => <option key={t.slug}>{t.name}</option>)}
                  </select>
                  <label className="block mt-4"><span className="text-sm">Notes / concerns</span>
                    <textarea rows={4} value={data.notes} onChange={e => setData({ ...data, notes: e.target.value })} className="mt-2 w-full rounded-2xl bg-muted/60 px-4 py-3 text-sm" />
                  </label>
                </label>
              )}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Preferred date" type="date" value={data.date} onChange={v => setData({ ...data, date: v })} />
                  <label className="block">
                    <span className="text-sm">Preferred time</span>
                    <select value={data.time} onChange={e => setData({ ...data, time: e.target.value })} className="mt-2 w-full rounded-full bg-muted/60 px-4 py-2.5 text-sm">
                      {["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                </div>
              )}
              {step === 3 && (
                <div className="rounded-3xl section-alt p-6 space-y-2 text-sm">
                  <Row k="Name" v={data.name || "—"} />
                  <Row k="Email" v={data.email || "—"} />
                  <Row k="Phone" v={data.phone || "—"} />
                  <Row k="Treatment" v={data.treatment} />
                  <Row k="When" v={`${data.date || "select date"} · ${data.time}`} />
                  {data.notes && <Row k="Notes" v={data.notes} />}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-between">
            <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-30"><ArrowLeft className="size-4" /> Back</button>
            {step < 3 ? (
              <button onClick={next} className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm">Next <ArrowRight className="size-4" /></button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className="rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm inline-flex items-center gap-2">
                {submitting && <Loader2 className="size-4 animate-spin" />}
                {submitting ? "Booking…" : "Confirm booking"}
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return <label className="block"><span className="text-sm">{label}</span><input type={type} value={value} onChange={e => onChange(e.target.value)} className="mt-2 w-full rounded-full bg-muted/60 px-4 py-2.5 text-sm focus:outline-none" /></label>;
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;
}
