import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Upload, Folder, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { getGalleryImages, addDocToCollection, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

type GalleryItem = {
  id: string;
  src?: string;
  imageUrl?: string; // some records might use imageUrl
  category: string;
  caption: string;
};

const CATEGORIES = ["Clinic", "Treatments", "Products", "Team", "Events", "Doctor"];

function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [category, setCategory] = useState("Clinic");
  const [caption, setCaption] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchImages = () => {
    setLoading(true);
    getGalleryImages().then((list) => {
      // Map and filter out Before & After images
      const galleryList = (list || [])
        .map((item: any) => ({
          id: item.id || "",
          src: item.src || item.imageUrl || "",
          category: item.category || "Clinic",
          caption: item.caption || "",
        }))
        .filter((item) => item.category !== "Before & After");
      setItems(galleryList);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleOpenAdd = () => {
    setSrc("");
    setCategory("Clinic");
    setCaption("");
    setIsOpen(true);
  };

  const handleDelete = async (id: string, captionText: string) => {
    if (!confirm(`Are you sure you want to delete this image ${captionText ? `"${captionText}"` : ""}?`)) return;
    try {
      await deleteDocFromCollection("gallery", id);
      toast.success("Image deleted successfully");
      fetchImages();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!src.trim()) {
      toast.error("Please enter an image URL");
      return;
    }
    setSubmitting(true);
    try {
      const data = {
        src: src.trim(),
        imageUrl: src.trim(), // save both keys for compatibility
        category,
        caption: caption.trim(),
      };
      await addDocToCollection("gallery", data);
      toast.success("Image added to gallery successfully");
      setIsOpen(false);
      fetchImages();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add image");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredItems = items.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="space-y-6">
      <Header title="Gallery" actionLabel="Upload image" onAction={handleOpenAdd} />

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full border px-4 py-2 text-sm inline-flex items-center gap-2 cursor-pointer transition-colors ${
            activeCategory === "All"
              ? "bg-primary text-primary-foreground border-primary"
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
                ? "bg-primary text-primary-foreground border-primary"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-sm"
            >
              <img src={item.src} alt={item.caption} className="size-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id, item.caption)}
                    className="size-8 rounded-lg bg-red-600 hover:bg-red-700 grid place-items-center cursor-pointer transition-colors text-white"
                    title="Delete Image"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <p className="text-xs font-medium line-clamp-2 leading-relaxed">{item.caption || "No caption"}</p>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-muted-foreground col-span-full text-center py-12">
              No images available in this category.
            </div>
          )}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-[#ecdcc9]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">Add Image to Gallery</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-1">
              <CloudinaryUpload
                label="Gallery Image (Cloudinary)"
                value={src}
                onUploadSuccess={(url) => setSrc(url)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <Label htmlFor="gal-cat">Category</Label>
                <select
                  id="gal-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm rounded-full bg-muted/60 px-4 py-2.5 focus:outline-none"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="gal-cap">Caption / Description</Label>
              <Input
                id="gal-cap"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Modern consultation chambers"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? "Saving..." : "Add Image"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
