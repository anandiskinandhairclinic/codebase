import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Pencil, Trash2, Check, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { updateDocInCollection, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { toast } from "sonner";

type Appointment = {
  id: string;
  name: string;
  service: string;
  preferredDate: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  status?: "Pending" | "Confirmed";
};

const statusColor = (s: string) => 
  s === "Confirmed" 
    ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
    : "bg-amber-50 text-amber-600 border border-amber-200";

export const Route = createFileRoute("/admin/appointments")({
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const [appts, setAppts] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const q2 = query(collection(db, "appointments"), orderBy("createdAt", "desc"), limit(50));
      const snap = await getDocs(q2);
      const items: Appointment[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Appointment));
      setAppts(items);
    } catch (err) {
      console.warn("Failed to load appointments:", err);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus?: "Pending" | "Confirmed") => {
    const nextStatus = currentStatus === "Confirmed" ? "Pending" : "Confirmed";
    try {
      await updateDocInCollection("appointments", id, { status: nextStatus });
      toast.success(`Appointment status updated to ${nextStatus}!`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete appointment log for ${name}?`)) return;
    try {
      await deleteDocFromCollection("appointments", id);
      toast.success("Appointment log deleted successfully");
      fetchAppointments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete appointment");
    }
  };

  const filtered = appts.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <Header title="Appointments Lead Panel" />
      <div className="flex gap-2 flex-wrap">
        <input 
          placeholder="Search client or treatment..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="rounded-full bg-card border border-[#ecdcc9]/80 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64 shadow-sm" 
        />
      </div>
      {loading ? (
        <div className="text-center py-12 text-muted-foreground animate-pulse">Loading appointments…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl border border-border">No appointments matching filters.</div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-[#faf6f0] text-left">
              <tr>{["Client", "Treatment", "Requested Date", "Phone", "Status", ""].map(h => <th key={h} className="px-5 py-4.5 font-medium text-[#5c4a37]">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const currentStatus = a.status || "Pending";
                return (
                  <tr key={a.id} className="border-t border-border hover:bg-[#faf6f0]/20 transition-colors">
                    <td className="px-5 py-4 font-medium text-[#5c4a37]">
                      <div>{a.name}</div>
                      {a.email && <div className="text-xs text-muted-foreground font-normal">{a.email}</div>}
                    </td>
                    <td className="px-5 py-4">{a.service}</td>
                    <td className="px-5 py-4">{a.preferredDate || "—"}</td>
                    <td className="px-5 py-4">{a.phone}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${statusColor(currentStatus)}`}>
                        {currentStatus === "Confirmed" ? <Check className="size-3" /> : <Clock className="size-3" />}
                        {currentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 justify-end">
                        <IconBtn 
                          icon={currentStatus === "Confirmed" ? Clock : Check} 
                          onClick={() => handleToggleStatus(a.id, currentStatus)} 
                          className={currentStatus === "Confirmed" ? "text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"}
                          title={currentStatus === "Confirmed" ? "Mark Pending" : "Confirm Appointment"}
                        />
                        <IconBtn 
                          icon={Trash2} 
                          onClick={() => handleDelete(a.id, a.name)} 
                          className="text-red-500 hover:bg-red-50" 
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
