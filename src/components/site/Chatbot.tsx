import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight, Sparkles, ShoppingCart, Calendar, Bot } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductsList, type Product, getChatbotRules, type ChatbotRule } from "@/lib/firebaseDataAdapter";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

type Msg = { from: "bot" | "user"; text: string };

export const skinConcerns = [
  "Acne", 
  "Pigmentation", 
  "Fine Lines", 
  "Dark Spots", 
  "Open Pores", 
  "Sunburn & Tan", 
  "Under-Eye Circles", 
  "Uneven Texture", 
  "Acne Scars",
  "Dullness / Brightening"
];

export const skinTypesList = [
  "Oily Skin",
  "Dry Skin",
  "Sensitive Skin",
  "Combination Skin",
  "Normal Skin"
];

export const skinConcernsList = skinConcerns;

const hairConcerns = [
  "Hair Fall", 
  "Dandruff", 
  "Oily Scalp", 
  "Dry Scalp", 
  "Bald Patches",
  "Split Ends",
  "Premature Graying",
  "Itchy Scalp",
  "Thin Hair"
];

const defaultChatbotRules: ChatbotRule[] = [
  { track: "skin", if: ["Acne", "Oily Skin"], then: ["Soft Foam Oil Wash", "Clear Skin Spot Serum", "Acne Treatment Consultation"] },
  { track: "skin", if: ["Acne", "Sensitive Skin"], then: ["Gentle Calm Cleanser", "Clear Skin Spot Serum", "Acne Treatment Consultation"] },
  { track: "skin", if: ["Pigmentation"], then: ["Glow Renew Serum", "Velvet Veil SPF 50", "Pigmentation Reset Session"] },
  { track: "skin", if: ["Dark Spots"], then: ["Glow Renew Serum", "Velvet Veil SPF 50", "Pigmentation Reset Session"] },
  { track: "skin", if: ["Dry Skin", "Fine Lines"], then: ["Ceramide Cloud Cream", "Timeless Retinol", "Anti Aging Lift"] },
  { track: "skin", if: ["Sensitive Skin"], then: ["Gentle Calm Cleanser", "Hydra Mist"] },
  { track: "skin", if: ["Fine Lines"], then: ["Timeless Retinol", "Bright Eye Elixir"] },
  { track: "skin", if: ["Oily Skin"], then: ["Soft Foam Oil Wash", "Velvet Veil SPF 50"] },
  { track: "skin", if: ["Open Pores"], then: ["Soft Foam Oil Wash", "Glow Renew Serum"] },
  { track: "skin", if: ["Sunburn & Tan"], then: ["Velvet Veil SPF 50", "Hydra Mist"] },
  { track: "skin", if: ["Under-Eye Circles"], then: ["Bright Eye Elixir"] },
  { track: "skin", if: ["Uneven Texture"], then: ["Glow Renew Serum", "Timeless Retinol"] },
  { track: "skin", if: ["Acne Scars"], then: ["Glow Renew Serum", "Acne Treatment Consultation"] },
  { track: "hair", if: ["Hair Fall", "Oily Scalp"], then: ["Clarifying Scalp Tonic", "Root Revive Serum", "PRP Hair Consultation"] },
  { track: "hair", if: ["Hair Fall", "Dry Scalp"], then: ["Silken Hair Mask", "Root Revive Serum"] },
  { track: "hair", if: ["Bald Patches"], then: ["PRP Hair Therapy", "Hair Transplant Consultation"] },
  { track: "hair", if: ["Dandruff"], then: ["Clarifying Scalp Tonic"] },
  { track: "hair", if: ["Split Ends"], then: ["Silken Hair Mask"] },
  { track: "hair", if: ["Premature Graying"], then: ["Root Revive Serum", "Free Hair Analysis"] },
  { track: "hair", if: ["Itchy Scalp"], then: ["Clarifying Scalp Tonic"] },
  { track: "hair", if: ["Thin Hair"], then: ["Root Revive Serum", "PRP Hair Consultation"] }
];

function recommend(track: "skin" | "hair", picks: string[], rules: ChatbotRule[], products: Product[]): string[] {
  const has = (k: string) => picks.includes(k);
  const recs: string[] = [];

  // Filter rules by track
  const trackRules = rules.filter(r => r.track === track);

  // Find matching rules
  trackRules.forEach(rule => {
    const matches = rule.if.length > 0 && rule.if.every(cond => has(cond));
    if (matches) {
      recs.push(...rule.then);
    }
  });

  // Find products matching the concerns
  products.forEach(product => {
    if (product.concerns && product.concerns.some(c => has(c))) {
      recs.push(product.name);
    }
  });

  // Fallbacks if no rules matched
  if (recs.length === 0) {
    if (track === "skin") {
      recs.push("Glow Renew Serum", "Velvet Veil SPF 50", "Free Skin Analysis");
    } else {
      recs.push("Root Revive Serum", "Free Hair Analysis");
    }
  }

  return Array.from(new Set(recs));
}

const durations = [
  "Under 3 months",
  "3 to 12 months",
  "Over a year"
];

const skinTypes = [
  "Oily Skin",
  "Dry Skin",
  "Sensitive Skin",
  "Normal / Combination"
];

const hairTypes = [
  "Oily Scalp",
  "Dry Scalp",
  "Normal / Dry"
];

const skinAdditional = [
  "Dark Spots",
  "Fine Lines",
  "Open Pores",
  "Acne Scars",
  "None"
];

const hairAdditional = [
  "Itchy Scalp",
  "Thin Hair",
  "Split Ends",
  "None"
];

interface ChatbotProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function Chatbot({ open: propOpen, setOpen: propSetOpen }: ChatbotProps = {}) {
  const { addToCart, setCartOpen } = useCart();
  const [localOpen, setLocalOpen] = useState(false);
  const open = propOpen !== undefined ? propOpen : localOpen;
  const setOpen = propSetOpen !== undefined ? propSetOpen : setLocalOpen;
  const [step, setStep] = useState<"intro" | "concern" | "duration" | "type" | "additional" | "result">("intro");
  const [track, setTrack] = useState<"skin" | "hair" | null>("skin");
  const [selectedConcern, setSelectedConcern] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedAdditional, setSelectedAdditional] = useState<string>("");

  const [products, setProducts] = useState<Product[]>([]);
  const [chatbotRules, setChatbotRules] = useState<ChatbotRule[]>([]);

  useEffect(() => {
    getProductsList().then(setProducts);
    getChatbotRules().then((res) => {
      if (res && res.length > 0) {
        const mapped = res.map((r: any) => ({
          id: r.id,
          track: r.track || "skin",
          if: Array.isArray(r.if) ? r.if : [],
          then: Array.isArray(r.then) ? r.then : [],
        }));
        setChatbotRules(mapped);
      } else {
        setChatbotRules(defaultChatbotRules);
      }
    }).catch(() => {
      setChatbotRules(defaultChatbotRules);
    });
  }, []);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-chatbot", handleOpen);
    return () => window.removeEventListener("open-chatbot", handleOpen);
  }, [setOpen]);

  const [showPromotion, setShowPromotion] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("skin_quiz_promo_dismissed");
    if (!open && !dismissed) {
      const timer = setTimeout(() => {
        setShowPromotion(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setShowPromotion(false);
    }
  }, [open]);

  const reset = () => { 
    setStep("intro"); 
    setTrack("skin"); 
    setSelectedConcern("");
    setSelectedDuration("");
    setSelectedType("");
    setSelectedAdditional("");
  };

  const handleAddToCart = (productName: string) => {
    const matched = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    if (matched) {
      addToCart(matched, 1);
      toast.success(`${matched.name} added to cart!`);
      setCartOpen(true);
    } else {
      toast.error("Product details couldn't be loaded.");
    }
  };

  const picks = [
    selectedConcern,
    selectedType,
    selectedType === "Normal / Combination" ? "Normal Skin" : "",
    selectedType === "Normal / Combination" ? "Combination Skin" : "",
    selectedAdditional !== "None" ? selectedAdditional : ""
  ].filter(Boolean);

  return (
    <>
      <AnimatePresence>
        {showPromotion && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-40 max-w-[320px] rounded-2xl bg-white border border-[#ecdcc9] p-4 shadow-card flex gap-3 items-start max-sm:bottom-4 max-sm:left-4 max-sm:right-4 max-sm:max-w-none"
          >
            <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Sparkles className="size-4 animate-pulse text-primary" />
            </div>
            <div className="flex-grow space-y-1.5 text-xs text-foreground/80">
              <div className="font-semibold text-xs text-[#5c4a37]">Smart Skin Analysis Quiz</div>
              <p className="leading-relaxed">Get a personalized clinical routine recommended by our dermatologist in 60 seconds.</p>
              <div className="flex gap-2.5 pt-1">
                <button
                  onClick={() => {
                    setShowPromotion(false);
                    setOpen(true);
                  }}
                  className="bg-primary text-primary-foreground font-semibold px-3 py-1.5 rounded-full hover:bg-primary/95 transition-colors cursor-pointer text-[10px]"
                >
                  Start Quiz
                </button>
                <button
                  onClick={() => {
                    setShowPromotion(false);
                    sessionStorage.setItem("skin_quiz_promo_dismissed", "true");
                  }}
                  className="text-muted-foreground hover:text-foreground font-medium px-2 py-1.5 cursor-pointer text-[10px]"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-6 z-50 w-[min(92vw,380px)] rounded-3xl bg-card shadow-card border border-border overflow-hidden max-sm:left-1/2 max-sm:-translate-x-1/2"
          >
            <div className="px-5 py-4 bg-primary text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="size-5" />
                <div>
                  <div className="font-display text-lg leading-tight">Skin Guide</div>
                  <div className="text-xs opacity-80">by Anandi Clinic</div>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/90 hover:text-white"
                aria-label="Close Chat"
              >
                <X className="size-5" />
              </button>
            </div>
            
            <div className="p-5 max-h-[440px] overflow-y-auto space-y-4 text-sm">
              {step === "intro" && (
                <>
                  <Msg from="bot">Hi! I'm Anandi Clinic's skin guide. Let's find your ideal personalized routine.</Msg>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setTrack("skin");
                        setStep("concern");
                      }}
                      className="w-full rounded-2xl border border-border bg-muted/40 hover:bg-[#faf6f0] hover:border-primary/50 py-4 font-semibold text-[#5c4a37] cursor-pointer transition-all text-center flex items-center justify-center gap-2"
                    >
                      <Sparkles className="size-4" /> Start Skin Analysis
                    </button>
                  </div>
                </>
              )}
              
              {step === "concern" && track && (
                <>
                  <Msg from="bot">What is your primary concern?</Msg>
                  <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1">
                    {(track === "skin" ? skinConcerns : hairConcerns).map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedConcern(c)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          selectedConcern === c
                            ? "bg-primary/10 border-primary text-primary font-semibold"
                            : "bg-white border-border hover:bg-[#faf6f0]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button onClick={reset} className="flex-1 text-xs border border-border rounded-full py-2 hover:bg-[#faf6f0] text-muted-foreground cursor-pointer">
                      Back
                    </button>
                    <button
                      disabled={!selectedConcern}
                      onClick={() => setStep("duration")}
                      className="flex-1 text-xs bg-primary text-primary-foreground rounded-full py-2 disabled:opacity-40 cursor-pointer font-semibold"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === "duration" && track && (
                <>
                  <Msg from="bot">How long has this concern been present?</Msg>
                  <div className="flex flex-col gap-2">
                    {durations.map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDuration(d);
                          setStep("type");
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          selectedDuration === d
                            ? "bg-primary/10 border-primary text-primary font-semibold"
                            : "bg-white border-border hover:bg-[#faf6f0]"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button onClick={() => setStep("concern")} className="flex-1 text-xs border border-border rounded-full py-2 hover:bg-[#faf6f0] text-muted-foreground cursor-pointer">
                      Back
                    </button>
                  </div>
                </>
              )}

              {step === "type" && track && (
                <>
                  <Msg from="bot">{track === "skin" ? "What is your skin type?" : "What is your scalp type?"}</Msg>
                  <div className="flex flex-col gap-2">
                    {(track === "skin" ? skinTypes : hairTypes).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelectedType(t);
                          setStep("additional");
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          selectedType === t
                            ? "bg-primary/10 border-primary text-primary font-semibold"
                            : "bg-white border-border hover:bg-[#faf6f0]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button onClick={() => setStep("duration")} className="flex-1 text-xs border border-border rounded-full py-2 hover:bg-[#faf6f0] text-muted-foreground cursor-pointer">
                      Back
                    </button>
                  </div>
                </>
              )}

              {step === "additional" && track && (
                <>
                  <Msg from="bot">Are there any other symptoms or secondary concerns?</Msg>
                  <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1">
                    {(track === "skin" ? skinAdditional : hairAdditional).map((a) => (
                      <button
                        key={a}
                        onClick={() => {
                          setSelectedAdditional(a);
                          setStep("result");
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          selectedAdditional === a
                            ? "bg-primary/10 border-primary text-primary font-semibold"
                            : "bg-white border-border hover:bg-[#faf6f0]"
                        }`}
                      >
                        {a === "None" ? "None of these" : a}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button onClick={() => setStep("type")} className="flex-1 text-xs border border-border rounded-full py-2 hover:bg-[#faf6f0] text-muted-foreground cursor-pointer">
                      Back
                    </button>
                  </div>
                </>
              )}

              {step === "result" && track && (
                <>
                  <div className="rounded-2xl bg-white border border-[#ecdcc9]/60 p-3.5 space-y-2 shadow-xs">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Your Skin Profile</div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">{selectedConcern}</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#f4ece1] text-[#8a7560] font-semibold">{selectedDuration}</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#f4ece1] text-[#8a7560] font-semibold">{selectedType}</span>
                      {selectedAdditional !== "None" && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent font-semibold">{selectedAdditional}</span>
                      )}
                    </div>
                  </div>

                  <Msg from="bot">Based on your consultation details, we recommend the following clinical routine:</Msg>
                  <ul className="space-y-2">
                    {recommend(track, picks, chatbotRules, products).map((r) => {
                      const hasProduct = products.some(p => p.name.toLowerCase() === r.toLowerCase());
                      return (
                        <li key={r} className="rounded-2xl bg-white border border-[#ecdcc9]/50 p-3.5 flex items-center justify-between shadow-xs gap-3">
                          <span className="font-medium text-xs text-[#5c4a37]">{r}</span>
                          {hasProduct ? (
                            <button
                              onClick={() => handleAddToCart(r)}
                              className="text-[10px] bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white px-2.5 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors font-semibold flex-shrink-0"
                            >
                              <ShoppingCart className="size-3" /> Add
                            </button>
                          ) : (
                            <Link
                              to="/appointment"
                              search={{ service: r }}
                              onClick={() => setOpen(false)}
                              className="text-[10px] bg-accent/15 text-accent border border-accent/25 hover:bg-accent hover:text-white px-2.5 py-1.5 rounded-full flex items-center gap-1 transition-colors font-semibold flex-shrink-0"
                            >
                              <Calendar className="size-3" /> Book
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="pt-2 flex justify-between">
                    <button onClick={reset} className="text-xs underline text-muted-foreground cursor-pointer">Start over</button>
                    <button onClick={() => setOpen(false)} className="text-xs underline text-[#5c4a37] font-semibold cursor-pointer">Close Chat</button>
                  </div>
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
    <div className={from === "bot" ? "text-[#5c4a37] leading-relaxed" : "text-right text-primary font-medium"}>
      {children}
    </div>
  );
}
