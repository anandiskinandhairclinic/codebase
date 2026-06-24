import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Pencil, Trash2, Plus, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { getChatbotRules, addDocToCollection, updateDocInCollection, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/chatbot")({
  component: AdminChatbot,
});

type Rule = {
  id?: string;
  track: "skin" | "hair";
  if: string[];
  then: string[];
};

function AdminChatbot() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editRule, setEditRule] = useState<Rule | null>(null);

  // Form states
  const [track, setTrack] = useState<"skin" | "hair">("skin");
  const [ifInput, setIfInput] = useState("");
  const [thenInput, setThenInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchRules = () => {
    setLoading(true);
    getChatbotRules().then(list => {
      setRules(list || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      toast.error("Failed to load rules");
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleOpenAdd = () => {
    setEditRule(null);
    setTrack("skin");
    setIfInput("");
    setThenInput("");
    setIsOpen(true);
  };

  const handleOpenEdit = (rule: Rule) => {
    setEditRule(rule);
    setTrack(rule.track);
    setIfInput(rule.if.join(", "));
    setThenInput(rule.then.join(", "));
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chatbot recommendation rule?")) return;
    try {
      await deleteDocFromCollection("chatbotRules", id);
      toast.success("Rule deleted successfully");
      fetchRules();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete rule");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const ifList = ifInput.split(",").map(i => i.trim()).filter(Boolean);
    const thenList = thenInput.split(",").map(t => t.trim()).filter(Boolean);

    if (ifList.length === 0 || thenList.length === 0) {
      toast.error("Both conditions (IF) and recommendations (THEN) are required");
      setSubmitting(false);
      return;
    }

    try {
      const data = {
        track,
        if: ifList,
        then: thenList,
      };

      if (editRule?.id) {
        await updateDocInCollection("chatbotRules", editRule.id, data);
        toast.success("Rule updated successfully");
      } else {
        await addDocToCollection("chatbotRules", data);
        toast.success("Rule created successfully");
      }
      setIsOpen(false);
      fetchRules();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save rule");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Chatbot Rules" actionLabel="Add rule" onAction={handleOpenAdd} />
      
      {loading ? (
        <div className="p-8 text-center text-muted-foreground animate-pulse">Loading chatbot rules...</div>
      ) : (
        <div className="space-y-3">
          {rules.map((r, i) => (
            <div key={r.id || i} className="rounded-2xl border border-border bg-card p-5 grid lg:grid-cols-[1fr_auto_1fr_auto] items-center gap-4 hover:shadow-xs transition-shadow">
              <div className="space-y-1 col-span-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {r.track}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">If user picks</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {r.if.map(x => (
                    <span key={x} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-muted-foreground hidden lg:block">→</div>
              <div className="space-y-1 col-span-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Recommend</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {r.then.map(x => (
                    <span key={x} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 justify-end lg:justify-start border-t lg:border-t-0 pt-3 lg:pt-0 border-border/40">
                <IconBtn icon={Pencil} onClick={() => handleOpenEdit(r)} />
                {r.id && (
                  <IconBtn icon={Trash2} onClick={() => handleDelete(r.id!)} className="text-red-500 hover:bg-red-50" />
                )}
              </div>
            </div>
          ))}

          {rules.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center">
              <Sparkles className="size-6 mx-auto text-muted-foreground" />
              <div className="mt-3 font-medium">No Custom Rules Configured</div>
              <div className="text-xs text-muted-foreground mt-1">
                Currently running on the default seeded recommendation rules. Add your first custom rule to override!
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95vw] sm:max-w-md bg-white p-5 rounded-2xl border border-[#ecdcc9]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">
              {editRule ? "Edit Recommendation Rule" : "Add Recommendation Rule"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <Label htmlFor="rule-track">Concern Category (Track)</Label>
              <select
                id="rule-track"
                value={track}
                onChange={e => setTrack(e.target.value as "skin" | "hair")}
                className="w-full text-sm rounded-full bg-muted/60 px-4 py-2.5 focus:outline-none border border-input"
                required
              >
                <option value="skin">Skin</option>
                <option value="hair">Hair</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rule-if">If User Selects Concerns (comma-separated)</Label>
              <Input
                id="rule-if"
                value={ifInput}
                onChange={e => setIfInput(e.target.value)}
                placeholder="e.g. Acne, Oily Skin"
                required
              />
              <span className="text-[10px] text-muted-foreground block">
                Must match concern names exactly (e.g. Acne, Dry Skin, Hair Fall, Bald Patches, etc.)
              </span>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rule-then">Then Recommend (comma-separated products/treatments)</Label>
              <textarea
                id="rule-then"
                rows={3}
                value={thenInput}
                onChange={e => setThenInput(e.target.value)}
                className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="e.g. Soft Foam Oil Wash, Clear Skin Spot Serum, Acne Treatment Consultation"
                required
              />
              <span className="text-[10px] text-muted-foreground block">
                Must match product names or treatment names exactly to link properly.
              </span>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? "Saving..." : "Save Rule"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
