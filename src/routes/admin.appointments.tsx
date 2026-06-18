import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

type Appointment = {
  id: string;
  name: string;
  service: string;
  preferredDate: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
};

const statusColor = (s: string) => s === "Confirmed" ? "bg-success/15 text-success" : s === "Pending" ? "bg-secondary/40 text-foreground" : "bg-muted text-muted-foreground";

export const Route = createFileRoute("/admin/appointments")({
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const [appts, setAppts] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const q2 = query(collection(db, "appointments"), orderBy("createdAt", "desc"), limit(50));
        const snap = await getDocs(q2);
        const items: Appointment[] = [];
        snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Appointment));
        setAppts(items);
      } catch (err) {
        console.warn("Failed to load appointments:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <Header title="Appointments" />
      <div className="flex gap-2 flex-wrap">
        <input placeholder="Search…" className="rounded-full bg-card border border-border px-4 py-2 text-sm" />
      </div>
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading appointments…</div>
      ) : appts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No appointments yet.</div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>{["Client", "Treatment", "Date", "Phone", "Status", ""].map(h => <th key={h} className="px-5 py-3 font-medium text-muted-foreground">{h}</th>)}</tr>
            </thead>
            <tbody>
              {appts.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{a.name}</td>
                  <td className="px-5 py-3">{a.service}</td>
                  <td className="px-5 py-3">{a.preferredDate || "—"}</td>
                  <td className="px-5 py-3">{a.phone}</td>
                  <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-full text-xs ${statusColor("Pending")}`}>Pending</span></td>
                  <td className="px-5 py-3"><div className="flex gap-1 justify-end"><IconBtn icon={Pencil} /><IconBtn icon={Trash2} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
