import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Pencil, Trash2, Plus } from "lucide-react";

const rules = [
  { if: ["Skin", "Acne", "Oily Skin"], then: ["Soft Foam Oil Wash", "Clear Skin Spot Serum", "Acne Treatment Consultation"] },
  { if: ["Skin", "Pigmentation", "Dark Spots"], then: ["Glow Renew Serum", "Velvet Veil SPF 50", "Pigmentation Reset Session"] },
  { if: ["Skin", "Dry Skin", "Fine Lines"], then: ["Ceramide Cloud Cream", "Timeless Retinol", "Anti Aging Lift"] },
  { if: ["Hair", "Hair Fall", "Oily Scalp"], then: ["Clarifying Scalp Tonic", "Root Revive Serum", "PRP Hair Consultation"] },
  { if: ["Hair", "Bald Patches"], then: ["PRP Hair Therapy", "Hair Transplant Consultation"] },
];

export const Route = createFileRoute("/admin/chatbot")({
  component: () => (
    <div className="space-y-6">
      <Header title="Chatbot Rules" actionLabel="Add rule" />
      <div className="space-y-3">
        {rules.map((r, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 grid lg:grid-cols-[1fr_auto_1fr_auto] items-center gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">If user picks</div>
              <div className="mt-1 flex flex-wrap gap-1.5">{r.if.map(x => <span key={x} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{x}</span>)}</div>
            </div>
            <div className="text-muted-foreground hidden lg:block">→</div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Recommend</div>
              <div className="mt-1 flex flex-wrap gap-1.5">{r.then.map(x => <span key={x} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">{x}</span>)}</div>
            </div>
            <div className="flex gap-1"><IconBtn icon={Pencil} /><IconBtn icon={Trash2} /></div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center">
        <Plus className="size-6 mx-auto text-muted-foreground" />
        <div className="mt-3 font-medium">Visual Rule Builder</div>
        <div className="text-xs text-muted-foreground mt-1">Drag concerns and recommended actions to compose new flows.</div>
      </div>
    </div>
  ),
});
