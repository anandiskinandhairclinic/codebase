import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getBeforeAfterList, type BeforeAfterItem, addDocToCollection, updateDocInCollection, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export const Route = createFileRoute("/admin/before-after")({
  component: AdminBeforeAfter,
});

function AdminBeforeAfter() {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<BeforeAfterItem | null>(null);

  // Form states
  const [treatment, setTreatment] = useState("");
  const [weeks, setWeeks] = useState("");
  const [story, setStory] = useState("");
  const [imageType, setImageType] = useState<"single" | "pair">("pair");
  const [beforeSrc, setBeforeSrc] = useState("");
  const [afterSrc, setAfterSrc] = useState("");
  const [singleSrc, setSingleSrc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    getBeforeAfterList().then(list => {
      setItems(list);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setEditItem(null);
    setTreatment("");
    setWeeks("12");
    setStory("");
    setImageType("pair");
    setBeforeSrc("");
    setAfterSrc("");
    setSingleSrc("");
    setIsOpen(true);
  };

  const handleOpenEdit = (item: BeforeAfterItem) => {
    setEditItem(item);
    setTreatment(item.treatment);
    setWeeks(item.weeks.toString());
    setStory(item.story);
    
    if (item.beforeSrc && item.afterSrc) {
      setImageType("pair");
      setBeforeSrc(item.beforeSrc);
      setAfterSrc(item.afterSrc);
      setSingleSrc("");
    } else {
      setImageType("single");
      setSingleSrc(item.afterSrc || item.beforeSrc || "");
      setBeforeSrc("");
      setAfterSrc("");
    }
    setIsOpen(true);
  };

  const handleDelete = async (id: string, treatmentName: string) => {
    if (!confirm(`Are you sure you want to delete result for ${treatmentName}?`)) return;
    try {
      await deleteDocFromCollection("gallery", id);
      toast.success("Result pair deleted successfully");
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete result");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const finalBefore = imageType === "pair" ? beforeSrc : "";
      const finalAfter = imageType === "pair" ? afterSrc : singleSrc;

      if (imageType === "pair" && (!beforeSrc || !afterSrc)) {
        toast.error("Please upload both Before and After images");
        setSubmitting(false);
        return;
      }
      if (imageType === "single" && !singleSrc) {
        toast.error("Please upload a result image");
        setSubmitting(false);
        return;
      }

      const data = {
        category: "Before & After",
        caption: treatment,
        treatment,
        weeks: Number(weeks) || 0,
        story,
        beforeSrc: finalBefore,
        afterSrc: finalAfter,
        src: finalAfter || finalBefore, // compatibility
      };

      if (editItem) {
        await updateDocInCollection("gallery", editItem.id, data);
        toast.success("Result details updated successfully");
      } else {
        await addDocToCollection("gallery", data);
        toast.success("Result details created successfully");
      }
      setIsOpen(false);
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save result details");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Results Gallery" actionLabel="Add new result" onAction={handleOpenAdd} />
      {loading ? (
        <div className="p-8 text-center text-muted-foreground animate-pulse">Loading results...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => {
            const isPair = !!(item.beforeSrc && item.afterSrc);
            return (
              <div key={item.id} className="rounded-3xl bg-card border border-border overflow-hidden flex flex-col justify-between shadow-sm">
                {isPair ? (
                  <div className="grid grid-cols-2 gap-1 bg-muted aspect-[4/3] relative">
                    <div className="overflow-hidden bg-[#faf6f0]">
                      <img src={item.beforeSrc} alt="Before" className="size-full object-cover" />
                      <span className="absolute top-2 left-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">Before</span>
                    </div>
                    <div className="overflow-hidden bg-[#faf6f0]">
                      <img src={item.afterSrc} alt="After" className="size-full object-cover" />
                      <span className="absolute top-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">After</span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] relative bg-[#faf6f0] overflow-hidden">
                    <img src={item.afterSrc || item.beforeSrc} alt="Result" className="size-full object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] bg-primary text-white px-2 py-0.5 rounded">Single Image</span>
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {item.weeks > 0 && (
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        {item.weeks} weeks transformation
                      </div>
                    )}
                    <h3 className="font-display text-lg mt-1 text-[#5c4a37]">{item.treatment}</h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.story}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#ecdcc9]/40 flex justify-end gap-2">
                    <IconBtn icon={Pencil} onClick={() => handleOpenEdit(item)} />
                    <IconBtn icon={Trash2} onClick={() => handleDelete(item.id, item.treatment)} className="text-red-500 hover:bg-red-50" />
                  </div>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <div className="text-muted-foreground col-span-full text-center py-12">No result cards available.</div>}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-[#ecdcc9] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">
              {editItem ? "Edit Result Card" : "Add New Result Card"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1">
                <Label htmlFor="ba-treat">Treatment Name</Label>
                <Input id="ba-treat" value={treatment} onChange={e => setTreatment(e.target.value)} placeholder="e.g. Acne Therapy" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ba-weeks">Weeks (0 for N/A)</Label>
                <Input id="ba-weeks" type="number" value={weeks} onChange={e => setWeeks(e.target.value)} placeholder="12" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#5c4a37]">Display Type</Label>
              <RadioGroup
                value={imageType}
                onValueChange={(val) => setImageType(val as "single" | "pair")}
                className="grid grid-cols-2 gap-3"
              >
                <label className={`flex items-center gap-2 rounded-xl border p-3 bg-white hover:bg-[#faf6f0] cursor-pointer transition-colors ${imageType === "single" ? "border-primary bg-primary/[0.03]" : "border-[#ecdcc9]"}`}>
                  <RadioGroupItem value="single" className="sr-only" />
                  <span className="text-xs font-semibold text-[#5c4a37]">Single Image</span>
                </label>
                <label className={`flex items-center gap-2 rounded-xl border p-3 bg-white hover:bg-[#faf6f0] cursor-pointer transition-colors ${imageType === "pair" ? "border-primary bg-primary/[0.03]" : "border-[#ecdcc9]"}`}>
                  <RadioGroupItem value="pair" className="sr-only" />
                  <span className="text-xs font-semibold text-[#5c4a37]">Before & After Pair</span>
                </label>
              </RadioGroup>
            </div>

            {imageType === "single" ? (
              <div className="space-y-1">
                <CloudinaryUpload
                  label="Result Image"
                  value={singleSrc}
                  onUploadSuccess={(url) => setSingleSrc(url)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <CloudinaryUpload
                    label="Before Image"
                    value={beforeSrc}
                    onUploadSuccess={(url) => setBeforeSrc(url)}
                  />
                </div>
                <div className="space-y-1">
                  <CloudinaryUpload
                    label="After Image"
                    value={afterSrc}
                    onUploadSuccess={(url) => setAfterSrc(url)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="ba-story">Case Study / Story</Label>
              <textarea
                id="ba-story"
                rows={3}
                value={story}
                onChange={e => setStory(e.target.value)}
                className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none"
                placeholder="Describe the clinical process and patient progress..."
                required
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">Cancel</Button>
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? "Saving..." : "Save Pair"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
