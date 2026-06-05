import { Star, CheckCircle2 } from "lucide-react";
import type { Testimonial } from "@/lib/data";

const googleAvatarColors = [
  "bg-red-500 text-white",
  "bg-blue-500 text-white",
  "bg-green-600 text-white",
  "bg-yellow-500 text-white",
  "bg-purple-500 text-white",
  "bg-pink-500 text-white",
  "bg-indigo-500 text-white",
  "bg-orange-500 text-white",
  "bg-teal-500 text-white"
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % googleAvatarColors.length;
  return googleAvatarColors[index];
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  const avatarColor = getAvatarColor(t.name);
  // Get 2 characters for initials
  const initials = t.name ? t.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "G";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-secondary bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
      {/* Official Google logo mark in top-right */}
      <div className="absolute right-6 top-6 opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100">
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.57-1.02-1.34-1.21-2.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      </div>

      <div className="flex items-center gap-3.5">
        <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${avatarColor} border border-black/5 shadow-xs`}>
          {initials}
        </div>
        <div>
          <div className="text-sm font-extrabold text-foreground">{t.name}</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.date} · <span className="text-primary">{t.concern}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 transition-all duration-300 group-hover:scale-105 ${
              i < t.rating ? "fill-[#FBBC05] text-[#FBBC05]" : "text-muted-foreground/20"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-medium flex-1">
        "{t.text}"
      </p>

      <div className="mt-6 pt-4 flex items-center justify-between border-t border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.57-1.02-1.34-1.21-2.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Posted on Google
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] text-emerald-600 border border-emerald-500/20 shadow-3xs font-extrabold">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          Google Verified
        </span>
      </div>
    </div>
  );
}