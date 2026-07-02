import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, Calendar, FileText, MessageSquare, Image as ImageIcon, Bot, Stethoscope, Settings, GalleryVertical, Briefcase, Sparkles, Key, Mail, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const nav: { to: string; label: string; icon: any; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/appointments", label: "Appointments", icon: Calendar },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/chatbot", label: "Chatbot Rules", icon: Bot },
  { to: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/gallery", label: "Gallery", icon: GalleryVertical },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Anandi CMS" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
        <div className="text-[#5c4a37] font-display text-xl animate-pulse">Verifying credentials...</div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-card hidden lg:flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center gap-2">
            <span className="grid place-items-center size-8 rounded-full bg-primary text-primary-foreground"><Sparkles className="size-4" /></span>
            <span className="font-display text-xl">Anandi CMS</span>
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
        </div>
        <div className="p-4 space-y-2 border-t border-border/60">
          <Link to="/" className="block text-xs text-muted-foreground hover:underline">← Back to site</Link>
          <button
            onClick={() => signOut(auth).then(() => toast.success("Signed out successfully"))}
            className="w-full text-left text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-card border-r border-border flex flex-col justify-between h-full">
          <div>
            <div className="p-6 flex items-center gap-2">
              <span className="grid place-items-center size-8 rounded-full bg-primary text-primary-foreground"><Sparkles className="size-4" /></span>
              <span className="font-display text-xl">Anandi CMS</span>
            </div>
            <nav className="px-3 space-y-0.5">
              {nav.map(n => {
                const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to as any}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
                  >
                    <n.icon className="size-4" />{n.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="p-4 space-y-2 border-t border-border/60">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-xs text-muted-foreground hover:underline">← Back to site</Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                signOut(auth).then(() => toast.success("Signed out successfully"));
              }}
              className="w-full text-left text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <main className="flex-1 min-w-0">
        <header className="h-16 border-b border-border px-6 flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground flex-shrink-0 cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="size-5" />
            </button>
            <div className="text-sm text-muted-foreground font-semibold lg:font-normal">Admin Panel — Anandi Skin & Hair Clinic</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground hidden sm:block">{user.email}</div>
            <div className="size-9 rounded-full bg-primary/10 grid place-items-center text-primary font-bold text-xs uppercase">
              {user.email?.substring(0, 2) ?? "AD"}
            </div>
            {/* Mobile Log out */}
            <button
              onClick={() => signOut(auth).then(() => toast.success("Signed out successfully"))}
              className="lg:hidden text-xs text-red-500 font-medium ml-2 cursor-pointer hover:underline"
            >
              Logout
            </button>
          </div>
        </header>
        <div className="p-6 lg:p-10"><Outlet /></div>
      </main>
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to sign in. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl bg-white border border-[#ecdcc9] p-8 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto size-12 rounded-full bg-[#f4ece1] grid place-items-center text-primary">
            <Sparkles className="size-6 text-primary" />
          </div>
          <h2 className="font-display text-3xl text-[#5c4a37] font-semibold">Clinic CMS Login</h2>
          <p className="text-sm text-[#8a7560]">Authenticate to manage Anandi Skin & Hair Clinic</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email" className="text-[#5c4a37]">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="login-email"
                type="email"
                placeholder="doctor@anandiclinic.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 rounded-xl border-[#ecdcc9] bg-white focus-visible:ring-primary focus-visible:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="login-pass" className="text-[#5c4a37]">Password</Label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="login-pass"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 rounded-xl border-[#ecdcc9] bg-white focus-visible:ring-primary focus-visible:border-primary"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary hover:bg-primary/95 text-primary-foreground py-6 mt-2">
            {loading ? "Signing in..." : "Sign In with Email"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#ecdcc9]/60" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-[#8a7560]">Or continue with</span></div>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={handleGoogleLogin}
          className="w-full rounded-full border-[#ecdcc9] bg-white text-[#5c4a37] hover:bg-[#faf6f0] py-6 flex items-center justify-center gap-2"
        >
          <svg className="size-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google Account
        </Button>
      </div>
    </div>
  );
}
