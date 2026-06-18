import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, Calendar, FileText, MessageSquare, Image as ImageIcon, Bot, Stethoscope, Settings, GalleryVertical, Briefcase, Sparkles } from "lucide-react";

const nav: { to: string; label: string; icon: any; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/appointments", label: "Appointments", icon: Calendar },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/before-after", label: "Before/After", icon: ImageIcon },
  { to: "/admin/chatbot", label: "Chatbot Rules", icon: Bot },
  { to: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/gallery", label: "Gallery", icon: GalleryVertical },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Dr. Jain's CMS" }] }),
  component: () => {
    const pathname = useRouterState({ select: s => s.location.pathname });
    return (
      <div className="min-h-screen flex bg-background">
        <aside className="w-64 shrink-0 border-r border-border bg-card hidden lg:block">
          <div className="p-6 flex items-center gap-2">
            <span className="grid place-items-center size-8 rounded-full bg-primary text-primary-foreground"><Sparkles className="size-4" /></span>
            <span className="font-display text-xl">Dr. Jain's CMS</span>
          </div>
          <nav className="px-3 space-y-0.5">
            {nav.map(n => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to as any} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                  <n.icon className="size-4" />{n.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 mt-4">
            <Link to="/" className="text-xs text-muted-foreground">← Back to site</Link>
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          <header className="h-16 border-b border-border px-6 flex items-center justify-between bg-card">
            <div className="text-sm text-muted-foreground">Admin Panel — Dr. Jain's Clinic</div>
            <div className="size-9 rounded-full bg-muted" />
          </header>
          <div className="p-6 lg:p-10"><Outlet /></div>
        </main>
      </div>
    );
  },
});
