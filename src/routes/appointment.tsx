import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getClinicSettings } from "@/lib/firebaseServices";
import { clinic as fallbackClinic } from "@/lib/clinic";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book Appointment | Dr Jain's Skin Care Clinic" },
      { name: "description", content: "Book an appointment online via WhatsApp with Dr. Amit Jain — dermatologist in Katraj, Pune." },
    ],
    links: [{ rel: "canonical", href: "/appointment" }],
  }),
  component: AppointmentPage,
});

function AppointmentPage() {
  useEffect(() => {
    getClinicSettings().then((c) => {
      const phoneRaw = c.phoneRaw || fallbackClinic.phoneRaw;
      // Tailored appointment booking message
      const defaultMsg = "Hello Dr. Jain's Clinic, I would like to book an appointment for a clinical consultation. Please let me know the available slots.";
      const message = c.whatsappMessage || defaultMsg;
      
      const whatsappUrl = `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`;
      
      // Use window.location.replace to replace /appointment in the browser history stack,
      // avoiding back-button loop traps!
      window.location.replace(whatsappUrl);
    });
  }, []);

  return (
    <SiteLayout>
      <section className="flex min-h-[65vh] items-center justify-center bg-soft-radial bg-dot-pattern px-4">
        <div className="w-full max-w-md rounded-3xl border bg-white/90 p-8 shadow-xl backdrop-blur-md text-center animate-pulse space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Loader2 className="h-7 w-7 animate-spin text-emerald-600" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground flex items-center justify-center gap-1.5">
            <MessageCircle className="h-5 w-5 text-emerald-500 fill-emerald-500" />
            Connecting to WhatsApp...
          </h1>
          <p className="text-xs text-muted-foreground font-semibold leading-relaxed max-w-xs mx-auto">
            Opening our clinical helpdesk on WhatsApp for your instant appointment booking.
          </p>
          <div className="pt-2">
            <a href="/" className="text-xs text-primary hover:underline font-extrabold">
              ← Return to homepage
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}