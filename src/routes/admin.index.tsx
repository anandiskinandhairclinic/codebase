import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Package, FileText, MessageSquare, Users, TrendingUp } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

const apptData = [
  { d: "Mon", v: 18 }, { d: "Tue", v: 22 }, { d: "Wed", v: 26 }, { d: "Thu", v: 24 },
  { d: "Fri", v: 32 }, { d: "Sat", v: 41 }, { d: "Sun", v: 14 },
];
const leadData = apptData.map(x => ({ ...x, v: x.v * 2 + 6 }));

export const Route = createFileRoute("/admin/")({
  component: () => (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">A snapshot of your clinic.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { icon: Calendar, l: "Appointments", v: "127" },
          { icon: Package, l: "Products", v: "42" },
          { icon: FileText, l: "Blog Posts", v: "18" },
          { icon: MessageSquare, l: "Testimonials", v: "94" },
          { icon: Users, l: "Leads", v: "236" },
        ].map(c => (
          <div key={c.l} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between"><c.icon className="size-4 text-primary" /><TrendingUp className="size-3 text-success" /></div>
            <div className="mt-4 font-display text-3xl">{c.v}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{c.l}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-medium mb-4">Appointments — past 7 days</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={apptData}><XAxis dataKey="d" /><Tooltip /><Line type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2} /></LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-medium mb-4">Leads — past 7 days</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leadData}><XAxis dataKey="d" /><Tooltip /><Bar dataKey="v" fill="var(--color-accent)" radius={8} /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  ),
});
