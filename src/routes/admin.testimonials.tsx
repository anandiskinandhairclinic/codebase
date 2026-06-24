import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Pencil, Trash2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getTestimonialsList, type Testimonial, addDocToCollection, updateDocInCollection, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
});

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState("");
  const [rating, setRating] = useState("5");
  const [quote, setQuote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = () => {
    setLoading(true);
    getTestimonialsList().then(list => {
      setTestimonials(list);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditTestimonial(null);
    setName("");
    setTreatment("");
    setRating("5");
    setQuote("");
    setIsOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditTestimonial(t);
    setName(t.name);
    setTreatment(t.treatment);
    setRating(t.rating.toString());
    setQuote(t.quote);
    setIsOpen(true);
  };

  const handleDelete = async (id: string | undefined, name: string) => {
    if (!id) return;
    if (!confirm(`Are you sure you want to delete testimonial from ${name}?`)) return;
    try {
      await deleteDocFromCollection("testimonials", id);
      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete testimonial");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = {
        name,
        treatment,
        rating: Number(rating) || 5,
        quote,
      };

      if (editTestimonial && editTestimonial.id) {
        await updateDocInCollection("testimonials", editTestimonial.id, data);
        toast.success("Testimonial updated successfully");
      } else {
        await addDocToCollection("testimonials", data);
        toast.success("Testimonial added successfully");
      }
      setIsOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Testimonials" actionLabel="Add testimonial" onAction={handleOpenAdd} />
      {loading ? (
        <div className="p-8 text-center text-muted-foreground animate-pulse">Loading testimonials...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <div key={t.id || i} className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-[#5c4a37]">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.treatment}</div>
                  </div>
                  <div className="flex gap-1">
                    <IconBtn icon={Pencil} onClick={() => handleOpenEdit(t)} />
                    <IconBtn icon={Trash2} onClick={() => handleDelete(t.id, t.name)} className="text-red-500 hover:bg-red-50" />
                  </div>
                </div>
                <div className="flex mt-2 mb-3">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="size-3.5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-[#ecdcc9]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">
              {editTestimonial ? `Edit Testimonial` : "Add New Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-1">
              <Label htmlFor="tst-name">Patient Name</Label>
              <Input id="tst-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sakshi Patil" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="tst-treat">Treatment / Service</Label>
                <Input id="tst-treat" value={treatment} onChange={e => setTreatment(e.target.value)} placeholder="e.g. Acne Therapy" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="tst-rate">Rating (1-5)</Label>
                <select
                  id="tst-rate"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  className="w-full text-sm rounded-full bg-muted/60 px-4 py-2 focus:outline-none"
                  required
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>{num} Stars</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="tst-quote">Patient Quote / Review</Label>
              <textarea
                id="tst-quote"
                rows={4}
                value={quote}
                onChange={e => setQuote(e.target.value)}
                className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none"
                placeholder="What did the patient say about their experience?"
                required
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">Cancel</Button>
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? "Saving..." : "Save Testimonial"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
