import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight, Sparkles } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string };

const skinConcerns = ["Acne", "Pigmentation", "Dry Skin", "Oily Skin", "Sensitive Skin", "Fine Lines", "Dark Spots"];
const hairConcerns = ["Hair Fall", "Dandruff", "Oily Scalp", "Dry Scalp", "Bald Patches"];

function recommend(track: "skin" | "hair", picks: string[]): string[] {
  const has = (k: string) => picks.includes(k);
  const recs: string[] = [];
  if (track === "skin") {
    if (has("Acne") && has("Oily Skin")) recs.push("Soft Foam Oil Wash", "Clear Skin Spot Serum", "Acne Treatment Consultation");
    if (has("Acne") && has("Sensitive Skin")) recs.push("Gentle Calm Cleanser", "Clear Skin Spot Serum (alt-day)", "Acne Treatment Consultation");
    if (has("Pigmentation") && has("Dark Spots")) recs.push("Glow Renew Serum", "Velvet Veil SPF 50", "Pigmentation Reset Session");
    if (has("Dry Skin") && has("Fine Lines")) recs.push("Ceramide Cloud Cream", "Timeless Retinol", "Anti Aging Lift");
    if (has("Sensitive Skin")) recs.push("Gentle Calm Cleanser", "Hydra Mist");
    if (has("Fine Lines") || has("Dark Spots")) recs.push("Timeless Retinol", "Bright Eye Elixir");
    if (has("Oily Skin") && !has("Acne")) recs.push("Soft Foam Oil Wash", "Velvet Veil SPF 50");
    if (recs.length === 0) recs.push("Glow Renew Serum", "Velvet Veil SPF 50", "Free Skin Analysis");
  } else {
    if (has("Hair Fall") && has("Oily Scalp")) recs.push("Clarifying Scalp Tonic", "Root Revive Serum", "PRP Hair Consultation");
    if (has("Hair Fall") && has("Dry Scalp")) recs.push("Silken Hair Mask", "Root Revive Serum", "Scalp Therapy");
    if (has("Bald Patches")) recs.push("PRP Hair Therapy", "Hair Transplant Consultation");
    if (has("Dandruff")) recs.push("Clarifying Scalp Tonic", "Dandruff Treatment");
    if (has("Oily Scalp") && !has("Hair Fall")) recs.push("Clarifying Scalp Tonic");
    if (has("Dry Scalp")) recs.push("Silken Hair Mask", "Scalp Therapy");
    if (recs.length === 0) recs.push("Root Revive Serum", "Free Hair Analysis");
  }
  return Array.from(new Set(recs));
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intro" | "concerns" | "result">("intro");
  const [track, setTrack] = useState<"skin" | "hair" | null>(null);
  const [picks, setPicks] = useState<string[]>([]);

  const reset = () => { setStep("intro"); setTrack(null); setPicks([]); };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 size-14 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-soft hover:scale-105 transition-transform"
        aria-label="Skin & Hair guide"
      >
        {open ? <X /> : <MessageCircle />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[min(92vw,380px)] rounded-3xl bg-card shadow-card border border-border overflow-hidden"
          >
            <div className="px-5 py-4 bg-primary text-primary-foreground flex items-center gap-3">
              <Sparkles className="size-5" />
              <div>
                <div className="font-display text-lg leading-tight">Skin & Hair Guide</div>
                <div className="text-xs opacity-80">by Dr. Jain's Clinic</div>
              </div>
            </div>
            <div className="p-5 max-h-[440px] overflow-y-auto space-y-4 text-sm">
              {step === "intro" && (
                <>
                  <Msg from="bot">Hi! I'm Dr. Jain's skin & hair guide. What would you like help with today?</Msg>
                  <div className="grid grid-cols-2 gap-2">
                    {(["skin", "hair"] as const).map((t) => (
                      <button key={t} onClick={() => { setTrack(t); setStep("concerns"); }}
                        className="rounded-2xl border border-border bg-muted/40 hover:bg-muted py-4 capitalize">
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === "concerns" && track && (
                <>
                  <Msg from="bot">Pick everything that sounds like you (one or more):</Msg>
                  <div className="flex flex-wrap gap-2">
                    {(track === "skin" ? skinConcerns : hairConcerns).map((c) => {
                      const active = picks.includes(c);
                      return (
                        <button key={c} onClick={() => setPicks(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>
                          {c}
                        </button>
                      );
                    })}
                  </div>
                  <button disabled={!picks.length} onClick={() => setStep("result")}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm disabled:opacity-40">
                    See my routine <ArrowRight className="size-4" />
                  </button>
                </>
              )}
              {step === "result" && track && (
                <>
                  <Msg from="bot">Based on {picks.join(" + ")}, here's what I'd start with:</Msg>
                  <ul className="space-y-2">
                    {recommend(track, picks).map((r) => (
                      <li key={r} className="rounded-xl bg-muted/60 px-3 py-2.5 flex items-center justify-between">
                        <span>{r}</span>
                        <span className="text-xs text-primary">Add ›</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={reset} className="text-xs underline text-muted-foreground">Start over</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Msg({ from, children }: { from: "bot" | "user"; children: React.ReactNode }) {
  return (
    <div className={from === "bot" ? "text-foreground" : "text-right text-primary"}>
      {children}
    </div>
  );
}
