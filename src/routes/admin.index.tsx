import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CalendarCheck, Eye, MessageSquare, Star, TrendingUp, Clock, User, Phone,
  Mail, CheckCircle2, XCircle, AlertCircle, BarChart3, ChevronRight, PhoneCall
} from "lucide-react";
import { getServices, getBlogs, getTestimonials } from "@/lib/firebaseServices";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as ChartTooltip, PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const COLORS = ["#0d9488", "#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];

function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [counts, setCounts] = useState({ services: 0, blogs: 0, testimonials: 0 });
  const [activeTab, setActiveTab] = useState<"todays" | "live" | "previous" | "all">("todays");

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function loadData() {
      try {
        // Load ALL appointments for stats and charts
        const apptsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
        const apptsSnap = await getDocs(apptsQuery);
        const apptsList: any[] = [];
        apptsSnap.forEach((doc) => {
          apptsList.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(apptsList);

        // Load collection counts
        const sList = await getServices();
        const bList = await getBlogs();
        const tList = await getTestimonials();
        setCounts({
          services: sList.length,
          blogs: bList.length,
          testimonials: tList.length,
        });
      } catch (error) {
        console.error("Error loading admin dashboard stats: ", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdateAppointmentStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const apptDoc = appointments.find((x) => x.id === id);
      if (!apptDoc) return;

      const updatedDoc = {
        ...apptDoc,
        status: newStatus
      };

      await setDoc(doc(db, "appointments", id), updatedDoc);
      toast.success(`Appointment status updated to ${newStatus}`);
      setAppointments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update status: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper parsing for Date from preferredDate (formatted as "YYYY-MM-DD at HH:MM AM/PM" or similar)
  const getApptDateString = (appt: any) => {
    if (!appt.preferredDate) return "";
    return appt.preferredDate.split(" at ")[0] || "";
  };

  // Segments
  const todaysAppointments = appointments.filter((a) => {
    const apptDate = getApptDateString(a);
    return apptDate === todayStr;
  });

  const liveAppointments = appointments.filter((a) => {
    const status = (a.status || "Pending").toLowerCase();
    const apptDate = getApptDateString(a);
    return status === "pending" || (status === "confirmed" && apptDate === todayStr);
  });

  const previousAppointments = appointments.filter((a) => {
    const status = (a.status || "").toLowerCase();
    const apptDate = getApptDateString(a);
    return status === "done" || status === "cancelled" || (apptDate < todayStr && status !== "pending");
  });

  // Stats
  const pendingCount = appointments.filter((a) => (a.status || "Pending").toLowerCase() === "pending").length;
  const confirmedCount = appointments.filter((a) => (a.status || "").toLowerCase() === "confirmed").length;
  const doneCount = appointments.filter((a) => (a.status || "").toLowerCase() === "done").length;
  const cancelledCount = appointments.filter((a) => (a.status || "").toLowerCase() === "cancelled").length;

  const stats = [
    { label: "Total Bookings", value: appointments.length.toString(), icon: CalendarCheck, trend: `${doneCount} Completed`, color: "text-primary" },
    { label: "Today's Scheduled", value: todaysAppointments.length.toString(), icon: Clock, trend: `${todaysAppointments.filter(x => (x.status || "").toLowerCase() === "confirmed").length} Confirmed`, color: "text-blue-600" },
    { label: "Pending Inquiries", value: pendingCount.toString(), icon: AlertCircle, trend: "Requires verification", color: "text-amber-500" },
    { label: "Google Rating", value: "4.8★", icon: Star, trend: "140+ reviews", color: "text-emerald-600" },
  ];

  // Prepare Chart Data
  // 1. Weekly Trend of Bookings (Last 7 days of bookings based on createdAt date)
  const getWeeklyTrendData = () => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    const countsMap: Record<string, number> = {};
    last7Days.forEach(day => { countsMap[day] = 0; });

    appointments.forEach((appt) => {
      if (appt.createdAt) {
        const dateStr = appt.createdAt.split("T")[0];
        if (dateStr in countsMap) {
          countsMap[dateStr]++;
        }
      } else if (appt.preferredDate) {
        const dateStr = getApptDateString(appt);
        if (dateStr in countsMap) {
          countsMap[dateStr]++;
        }
      }
    });

    return last7Days.map((day) => {
      const dateObj = new Date(day);
      const label = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      return {
        date: label,
        Bookings: countsMap[day]
      };
    });
  };

  // 2. Popular Treatments breakdown
  const getTreatmentBreakdownData = () => {
    const srvMap: Record<string, number> = {};
    appointments.forEach((appt) => {
      const srv = appt.service || "General";
      const formatted = srv.split("-").map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
      srvMap[formatted] = (srvMap[formatted] || 0) + 1;
    });

    return Object.keys(srvMap).map((key) => ({
      name: key,
      value: srvMap[key]
    })).sort((a, b) => b.value - a.value).slice(0, 5);
  };

  const trendData = getWeeklyTrendData();
  const treatmentData = getTreatmentBreakdownData();

  // Active list based on Tab selection
  const getActiveList = () => {
    switch (activeTab) {
      case "todays": return todaysAppointments;
      case "live": return liveAppointments;
      case "previous": return previousAppointments;
      case "all": return appointments;
    }
  };

  const activeList = getActiveList();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Clinic CMS Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your clinic contents and track incoming patient appointments in real-time.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/$section" params={{ section: "appointments" }} className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold bg-primary text-white hover:bg-primary/95 transition-all rounded-xl shadow-sm">
            Manage Appoinments <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-white/90 p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">{s.value}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-primary/80">
              <TrendingUp className="h-3 w-3" /> {s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts */}
      {!loading && appointments.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white/90 p-5 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-extrabold tracking-tight uppercase">Recent Booking Volume (Past 7 Days)</h2>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                  <ChartTooltip
                    contentStyle={{ background: "rgba(255, 255, 255, 0.95)", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    labelStyle={{ fontWeight: "bold", color: "#1e293b", fontSize: "12px" }}
                    itemStyle={{ color: "#0d9488", fontWeight: "600", fontSize: "12px" }}
                  />
                  <Area type="monotone" dataKey="Bookings" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBookings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border bg-white/90 p-5 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-extrabold tracking-tight uppercase">Top 5 Treatment Inquiries</h2>
            </div>
            <div className="h-48 w-full flex-1 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={treatmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {treatmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    contentStyle={{ background: "rgba(255, 255, 255, 0.95)", border: "1px solid #e2e8f0", borderRadius: "12px" }}
                    itemStyle={{ fontSize: "11px", fontWeight: "600" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1.5 max-h-24 overflow-y-auto pr-1">
              {treatmentData.map((d, index) => (
                <div key={d.name} className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2 text-muted-foreground truncate max-w-[170px]">
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="truncate">{d.name}</span>
                  </div>
                  <span className="text-foreground">{d.value} ({Math.round((d.value / appointments.length) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Segmented Appointments List */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white/90 p-6 lg:col-span-2 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 gap-2">
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Appointment Registers</h2>
              <p className="text-xs text-muted-foreground">Detailed logs segmented for receptionist operations.</p>
            </div>
            <div className="flex flex-wrap gap-1 bg-secondary/35 p-1 rounded-xl">
              {[
                { id: "todays", label: "Today" },
                { id: "live", label: "Live/Pending" },
                { id: "previous", label: "History" },
                { id: "all", label: "All Booked" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${activeTab === tab.id
                      ? "bg-white text-primary shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">Loading registries...</div>
          ) : activeList.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground border border-dashed rounded-xl mt-4">
              No appointments found in this segment.
            </div>
          ) : (
            <div className="divide-y space-y-4">
              {activeList.map((a) => {
                const status = (a.status || "Pending").toLowerCase();
                let statusColor = "text-amber-600 bg-amber-50 border-amber-100";
                if (status === "confirmed") statusColor = "text-blue-600 bg-blue-50 border-blue-100";
                if (status === "done") statusColor = "text-emerald-600 bg-emerald-50 border-emerald-100";
                if (status === "cancelled") statusColor = "text-destructive bg-destructive/10 border-destructive/20";

                return (
                  <div key={a.id} className="pt-4 first:pt-0 group">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-sm text-foreground flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-primary shrink-0" />
                            {a.name}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${statusColor}`}>
                            {a.status || "Pending"}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-foreground uppercase text-[10px] bg-secondary/50 px-2 py-0.5 rounded">
                            {a.service ? a.service.replace(/-/g, " ") : "General Consultation"}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary" />
                            {a.preferredDate}
                          </span>
                        </div>
                      </div>

                      {/* Status changes direct actions */}
                      <div className="flex items-center gap-1 flex-wrap self-end sm:self-start">
                        {status === "pending" && (
                          <button
                            disabled={updatingId === a.id}
                            onClick={() => handleUpdateAppointmentStatus(a.id, "Confirmed")}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-all rounded-lg shadow-sm"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Confirm
                          </button>
                        )}
                        {status === "confirmed" && (
                          <button
                            disabled={updatingId === a.id}
                            onClick={() => handleUpdateAppointmentStatus(a.id, "Done")}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-all rounded-lg shadow-sm"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Mark Done
                          </button>
                        )}
                        {(status === "pending" || status === "confirmed") && (
                          <button
                            disabled={updatingId === a.id}
                            onClick={() => handleUpdateAppointmentStatus(a.id, "Cancelled")}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-white text-destructive border border-destructive/20 hover:bg-destructive/5 disabled:opacity-50 transition-all rounded-lg shadow-sm"
                          >
                            <XCircle className="h-3 w-3" /> Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-2.5 grid sm:grid-cols-2 gap-2 text-[11px] text-muted-foreground bg-secondary/15 rounded-xl p-3 border">
                      <div className="space-y-1">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider block">Patient Contact</span>
                        <div className="flex flex-col gap-0.5">
                          <a
                            href={`tel:${a.phone}`}
                            className="font-bold text-primary hover:text-primary-hover flex items-center gap-1 hover:underline"
                            title={`Call ${a.name}`}
                          >
                            <PhoneCall className="h-3 w-3 text-primary" />
                            {a.phone}
                          </a>
                          <div className="font-semibold text-foreground truncate">{a.email || "No email listed"}</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider block">Patient Notes / Concern</span>
                        <p className="italic text-foreground line-clamp-2">"{a.message || "No specific concern described."}"</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Database Index Info */}
        <div className="rounded-2xl border bg-white/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-extrabold tracking-tight">Database Index</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Quick lookup sizing for seeded collections.</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-muted-foreground">Active Treatments</span>
                <span className="font-extrabold text-foreground">{counts.services}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-muted-foreground">Blog Articles</span>
                <span className="font-extrabold text-foreground">{counts.blogs}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-muted-foreground">Verified Reviews</span>
                <span className="font-extrabold text-foreground">{counts.testimonials}</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-xl bg-secondary/40 p-4 border text-[11px] text-muted-foreground leading-relaxed">
            <strong className="text-primary font-bold block mb-1">💡 CMS Replication Note:</strong>
            To reuse this doctor website template, simply copy this repository, change the keys in `.env`, and load the homepage. The database will auto-seed automatically!
          </div>
        </div>
      </div>
    </div>
  );
}