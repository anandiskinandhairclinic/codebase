import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Folder, Trash2, Pencil, Check, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getGalleryImages, getTreatments, addDocToCollection, updateDocInCollection, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { services as localServices } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

type GalleryItem = {
  id: string;
  src?: string;
  imageUrl?: string;
  category: string;
  caption: string;
  
  // Before & After fields
  treatment?: string;
  weeks?: number;
  story?: string;
  beforeSrc?: string;
  afterSrc?: string;
};

const CATEGORIES = ["Clinic", "Treatments", "Products", "Team", "Events", "Doctor", "Patient Photos"];

function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [treatmentsList, setTreatmentsList] = useState<string[]>([]);

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);

  // Form states
  const [category, setCategory] = useState("Clinic");
  
  // Standard fields
  const [src, setSrc] = useState("");
  const [caption, setCaption] = useState("");
  
  // Before & After fields
  const [treatment, setTreatment] = useState("");
  const [weeks, setWeeks] = useState("12");
  const [story, setStory] = useState("");
  const [imageType, setImageType] = useState<"single" | "pair">("pair");
  const [beforeSrc, setBeforeSrc] = useState("");
  const [afterSrc, setAfterSrc] = useState("");
  const [singleSrc, setSingleSrc] = useState("");
  
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    getGalleryImages().then((list) => {
      setItems(list || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchItems();
    
    // Load treatments for dropdown
    getTreatments().then(list => {
      const dbNames = list.map(t => t.name);
      const localNames = localServices.map(s => s.title);
      const combined = Array.from(new Set([...localNames, ...dbNames]));
      setTreatmentsList(combined);
      if (combined.length > 0) {
        setTreatment(combined[0]);
      }
    });
  }, []);

  const handleOpenAdd = () => {
    setEditItem(null);
    setCategory("Clinic");
    setSrc("");
    setCaption("");
    setTreatment(treatmentsList[0] || "");
    setWeeks("12");
    setStory("");
    setImageType("pair");
    setBeforeSrc("");
    setAfterSrc("");
    setSingleSrc("");
    setIsOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditItem(item);
    setCategory(item.category || "Clinic");
    
    if (item.category === "Before & After" || item.category === "Patient Photos") {
      setTreatment(item.treatment || item.caption || treatmentsList[0] || "");
      setWeeks(item.weeks?.toString() || "0");
      setStory(item.story || "");
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
      setSrc("");
      setCaption("");
    } else {
      setSrc(item.src || item.imageUrl || "");
      setCaption(item.caption || "");
      
      // reset B/A states
      setTreatment("");
      setWeeks("12");
      setStory("");
      setImageType("pair");
      setBeforeSrc("");
      setAfterSrc("");
      setSingleSrc("");
    }
    setIsOpen(true);
  };

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to delete this gallery item "${label}"?`)) return;
    try {
      await deleteDocFromCollection("gallery", id);
      toast.success("Gallery item deleted successfully");
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete gallery item");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let data: any = { category };

      if (category === "Before & After" || category === "Patient Photos") {
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

        data = {
          ...data,
          caption: treatment,
          treatment,
          weeks: Number(weeks) || 0,
          story,
          beforeSrc: finalBefore,
          afterSrc: finalAfter,
          src: finalAfter || finalBefore, // compatibility
        };
      } else {
        if (!src.trim()) {
          toast.error("Please provide an image");
          setSubmitting(false);
          return;
        }
        data = {
          ...data,
          src: src.trim(),
          imageUrl: src.trim(), // save both keys for compatibility
          caption: caption.trim(),
        };
      }

      if (editItem) {
        await updateDocInCollection("gallery", editItem.id, data);
        toast.success("Gallery item updated successfully");
      } else {
        await addDocToCollection("gallery", data);
        toast.success("Gallery item created successfully");
      }
      setIsOpen(false);
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save gallery item");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredItems = items.filter(
    (item) => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Patient Photos") {
        return item.category === "Patient Photos" || item.category === "Before & After";
      }
      return item.category === activeCategory;
    }
  );

  return (
    <div className="space-y-6">
      <Header title="Unified Media Gallery" actionLabel="Add image or result" onAction={handleOpenAdd} />

      {/* Category selector */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full border px-4 py-2 text-sm inline-flex items-center gap-2 cursor-pointer transition-colors ${
            activeCategory === "All"
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card border-border hover:bg-muted"
          }`}
        >
          <Folder className="size-3.5" /> All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-2 text-sm inline-flex items-center gap-2 cursor-pointer transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card border-border hover:bg-muted"
            }`}
          >
            <Folder className="size-3.5" /> {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted-foreground animate-pulse">Loading gallery images...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isBeforeAfter = item.category === "Before & After" || item.category === "Patient Photos";
            const isPair = !!(item.beforeSrc && item.afterSrc);
            const imageDisplay = isBeforeAfter 
              ? (item.afterSrc || item.beforeSrc || "")
              : (item.src || item.imageUrl || "");

            return (
              <div 
                key={item.id} 
                className="group relative rounded-3xl bg-card border border-border overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Image Section */}
                {isBeforeAfter && isPair ? (
                  <div className="grid grid-cols-2 gap-0.5 bg-muted aspect-[4/3] relative">
                    <div className="overflow-hidden bg-[#faf6f0]">
                      <img src={item.beforeSrc} alt="Before" className="size-full object-cover" />
                      <span className="absolute top-2 left-2 text-[9px] bg-black/60 text-white px-2 py-0.5 rounded uppercase font-semibold">Before</span>
                    </div>
                    <div className="overflow-hidden bg-[#faf6f0]">
                      <img src={item.afterSrc} alt="After" className="size-full object-cover" />
                      <span className="absolute top-2 right-2 text-[9px] bg-black/60 text-white px-2 py-0.5 rounded uppercase font-semibold">After</span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                    <img src={imageDisplay} alt={item.caption} className="size-full object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                    <span className="absolute top-2 left-2 text-[9px] bg-black/60 text-white px-2.5 py-0.75 rounded-full uppercase font-bold tracking-wider">
                      {isBeforeAfter && !isPair ? "Single Result" : item.category}
                    </span>
                  </div>
                )}

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {isBeforeAfter ? (
                      <>
                        {item.weeks ? (
                          <div className="text-[10px] uppercase tracking-wider text-primary font-bold">
                            {item.weeks} weeks transformation
                          </div>
                        ) : null}
                        <h3 className="font-display text-lg mt-1 text-[#5c4a37] font-semibold">{item.treatment || item.caption}</h3>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">{item.story}</p>
                      </>
                    ) : (
                      <>
                        <h3 className="font-display text-lg text-[#5c4a37] font-semibold">{item.caption || "No caption"}</h3>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold">
                          Category: {item.category}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#ecdcc9]/40 flex justify-end gap-2">
                    <IconBtn icon={Pencil} onClick={() => handleOpenEdit(item)} title="Edit Details" />
                    <IconBtn 
                      icon={Trash2} 
                      onClick={() => handleDelete(item.id, isBeforeAfter ? (item.treatment || item.caption) : item.caption)} 
                      className="text-red-500 hover:bg-red-50" 
                      title="Delete Item"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="text-muted-foreground col-span-full text-center py-12 bg-white border border-[#ecdcc9]/30 rounded-3xl">
              No gallery items available in this category.
            </div>
          )}
        </div>
      )}

      {/* Edit/Add Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95vw] sm:max-w-md bg-white p-6 rounded-2xl border border-[#ecdcc9] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">
              {editItem ? "Edit Gallery Item" : "Add Image or Result"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-1">
              <Label htmlFor="gal-cat">Category</Label>
              <select
                id="gal-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm rounded-full bg-muted/60 px-4 py-2.5 focus:outline-none border border-input"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {category === "Before & After" || category === "Patient Photos" ? (
              // Before & After Fields
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1">
                    <Label htmlFor="ba-treat">Treatment Name</Label>
                    <select
                      id="ba-treat"
                      value={treatment}
                      onChange={e => setTreatment(e.target.value)}
                      className="w-full text-sm rounded-full bg-muted/60 px-4 py-2.5 focus:outline-none border border-input"
                      required
                    >
                      {treatmentsList.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ba-weeks">Weeks</Label>
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
                    <label className={`flex items-center justify-center text-center gap-2 rounded-xl border p-3 bg-white hover:bg-[#faf6f0] cursor-pointer transition-colors ${imageType === "single" ? "border-primary bg-primary/[0.03]" : "border-[#ecdcc9]"}`}>
                      <RadioGroupItem value="single" className="sr-only" />
                      <span className="text-xs font-semibold text-[#5c4a37]">Single Image</span>
                    </label>
                    <label className={`flex items-center justify-center text-center gap-2 rounded-xl border p-3 bg-white hover:bg-[#faf6f0] cursor-pointer transition-colors ${imageType === "pair" ? "border-primary bg-primary/[0.03]" : "border-[#ecdcc9]"}`}>
                      <RadioGroupItem value="pair" className="sr-only" />
                      <span className="text-xs font-semibold text-[#5c4a37]">Before/After Pair</span>
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
              </>
            ) : (
              // Standard Gallery Fields
              <>
                <div className="space-y-1">
                  <CloudinaryUpload
                    label="Gallery Image (Cloudinary)"
                    value={src}
                    onUploadSuccess={(url) => setSrc(url)}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="gal-cap">Caption / Description</Label>
                  <Input
                    id="gal-cap"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Reception area, Procedure suite"
                    required
                  />
                </div>
              </>
            )}

            <DialogFooter className="pt-4 border-t border-[#ecdcc9]/20">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? "Saving..." : editItem ? "Save Changes" : "Add to Gallery"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
