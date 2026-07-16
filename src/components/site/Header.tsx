import { Link } from "@tanstack/react-router";
import { Menu, X, Stethoscope, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/site/CartDrawer";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Treatments" },
  { to: "/products", label: "Shop" },
  { to: "/before-after", label: "Results" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, isCartOpen, setCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center size-9 rounded-full bg-primary text-primary-foreground">
            <Stethoscope className="size-4" strokeWidth={1.6} />
          </span>
          <span className="font-display text-2xl tracking-tight">Anandi Clinic<span className="text-primary">.</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-9 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/75 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          {/* Cart Icon Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 hover:bg-muted rounded-full transition-colors cursor-pointer text-foreground/80 hover:text-foreground mr-1"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full size-4.5 flex items-center justify-center animate-in scale-in duration-300">
                {cartCount}
              </span>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
              className="rounded-full border border-border/80 hover:bg-[#faf6f0] px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              Skin Quiz <Sparkles className="size-3.5 text-primary animate-pulse" />
            </button>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"><Link to="/appointment">Book Consult</Link></Button>
          </div>

          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="px-5 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1.5">{n.label}</Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new CustomEvent("open-chatbot"));
              }}
              className="text-left py-1.5 text-foreground cursor-pointer flex items-center gap-1.5 font-medium"
            >
              Skin Quiz <Sparkles className="size-3.5 text-primary animate-pulse" />
            </button>
            <Link to="/appointment" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm">Book Consult</Link>
          </div>
        </div>
      )}

      {/* Cart Side Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
