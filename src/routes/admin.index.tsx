import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Package, FileText, MessageSquare, ShoppingBag, TrendingUp, Check, Clock } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { getDashboardData } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState<any>({
    appointmentsCount: 0,
    productsCount: 0,
    blogsCount: 0,
    testimonialsCount: 0,
    ordersCount: 0,
    pendingCount: 0,
    confirmedCount: 0,
    estimatedRevenue: 0,
    apptChart: [],
    orderChart: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading dashboard metrics...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">A live snapshot of Anandi Clinic.</p>
      </div>

      {/* Top metrics - Executive view */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="md:col-span-2 rounded-3xl border border-[#ebdcc9] bg-gradient-to-tr from-[#faf6f0] to-[#f4ece1] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute right-6 top-6 size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp className="size-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8a7560] font-bold">Est. Clinic Revenue</div>
            <div className="mt-3 font-display text-4xl lg:text-5xl font-bold text-[#5c4a37]">
              ₹{stats.estimatedRevenue.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-[#8a7560] mt-2">Sum of confirmed consultations (₹500/appt estimate) and product orders.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Confirmed Consultations</span>
            <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Check className="size-4" /></div>
          </div>
          <div className="mt-4 font-display text-3xl font-bold text-[#5c4a37]">{stats.confirmedCount}</div>
          <div className="text-xs text-muted-foreground mt-2">Consultation bookings confirmed.</div>
        </div>

        <div className={`rounded-3xl border p-6 flex flex-col justify-between shadow-sm transition-colors duration-300 ${stats.pendingCount > 0 ? "border-amber-200 bg-amber-50/20" : "border-border bg-card"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Pending Bookings</span>
            <div className={`size-8 rounded-lg flex items-center justify-center ${stats.pendingCount > 0 ? "bg-amber-100 text-amber-600" : "bg-muted text-muted-foreground"}`}><Clock className="size-4" /></div>
          </div>
          <div className="mt-4 font-display text-3xl font-bold text-[#5c4a37]">{stats.pendingCount}</div>
          <div className="text-xs text-muted-foreground mt-2">
            {stats.pendingCount > 0 ? `${stats.pendingCount} bookings need action.` : "All requests confirmed."}
          </div>
        </div>
      </div>

      {/* Sub-metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { icon: Calendar, l: "Total Bookings", v: stats.appointmentsCount.toString() },
          { icon: ShoppingBag, l: "Product Orders", v: stats.ordersCount.toString() },
          { icon: Package, l: "Products Library", v: stats.productsCount.toString() },
          { icon: FileText, l: "Blog Articles", v: stats.blogsCount.toString() },
          { icon: MessageSquare, l: "Testimonials", v: stats.testimonialsCount.toString() },
        ].map(c => (
          <div key={c.l} className="rounded-2xl border border-border bg-card p-4.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between"><c.icon className="size-4 text-primary/80" /></div>
            <div className="mt-4 font-display text-2xl font-bold text-[#5c4a37]">{c.v}</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold truncate">{c.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-medium mb-4">Appointments by Day of Week</div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.apptChart}>
                <XAxis dataKey="d" />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2} name="Appointments" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-medium mb-4">Orders by Day of Week</div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.orderChart}>
                <XAxis dataKey="d" />
                <Tooltip />
                <Bar dataKey="v" fill="var(--color-accent)" radius={8} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
