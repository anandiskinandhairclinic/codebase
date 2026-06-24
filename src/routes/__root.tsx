import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Chatbot } from "@/components/site/Chatbot";
import { seedClinicDatabase } from "@/lib/firebaseSeeding";
import { CartProvider } from "@/context/CartContext";
import { FloatingActions } from "@/components/site/FloatingActions";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <p className="mt-3 text-muted-foreground">This page seems to have wandered off. Let's head back.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Return home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something didn't load.</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Anandi Skin & Hair Clinic — Expert Dermatologist in Ambegaon & Katraj, Pune" },
      { name: "description", content: "Advanced skin, hair, and cosmetology care by Dr. Vishakha Padmakar Patil at Anandi Skin & Hair Clinic, Dattanagar, Ambegaon Budruk, Pune." },
      { property: "og:title", content: "Anandi Skin & Hair Clinic — Expert Dermatology & Cosmetology" },
      { property: "og:description", content: "Personalized clinical treatments for skin, hair, and cosmetic concerns by Dr. Vishakha Padmakar Patil in Pune." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

import { Toaster } from "@/components/ui/sonner";

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    // Trigger clinic database seeding and updates check
    seedClinicDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {!isAdmin && <Header />}
        <Outlet />
        {!isAdmin && <Footer />}
        {!isAdmin && <Chatbot />}
        {!isAdmin && <FloatingActions />}
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}


