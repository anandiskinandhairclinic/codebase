import React, { useState } from "react";
import { Upload, Loader2, Image as ImageIcon, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import { getGalleryImages } from "@/lib/firebaseDataAdapter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  value?: string;
  label?: string;
}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUploadSuccess,
  value,
  label = "Upload Image",
}) => {
  const [loading, setLoading] = useState(false);
  
  // Gallery library states
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const openGalleryPicker = async () => {
    setGalleryOpen(true);
    setGalleryLoading(true);
    try {
      const list = await getGalleryImages();
      const urls: string[] = [];
      list.forEach((item: any) => {
        if (item.src) urls.push(item.src);
        if (item.imageUrl) urls.push(item.imageUrl);
        if (item.beforeSrc) urls.push(item.beforeSrc);
        if (item.afterSrc) urls.push(item.afterSrc);
      });
      setGalleryImages(Array.from(new Set(urls.filter(Boolean))));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load gallery images");
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setLoading(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dbxlgrkjz";
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "my_uploads";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const data = await res.json();
      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("No secure URL returned");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image to Cloudinary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <span className="text-sm font-medium text-[#5c4a37] block">{label}</span>}
      <div className="flex items-center gap-4">
        <div className="size-20 rounded-2xl bg-[#faf6f0] border border-[#ecdcc9] overflow-hidden flex items-center justify-center relative flex-shrink-0">
          {value ? (
            <img src={value} alt="Preview" className="size-full object-cover" />
          ) : (
            <ImageIcon className="size-8 text-[#bbaaa6]" />
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
              <Loader2 className="size-5 animate-spin" />
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-[#ecdcc9] hover:bg-[#faf6f0] transition-colors rounded-full text-xs font-semibold text-[#5c4a37] cursor-pointer">
            <Upload className="size-3.5" />
            {loading ? "Uploading..." : "Choose File"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </label>
          
          <button
            type="button"
            onClick={openGalleryPicker}
            className="flex items-center gap-2 px-4 py-2 bg-[#f4ece1] hover:bg-[#ebdcc9] transition-colors rounded-full text-xs font-semibold text-[#5c4a37] cursor-pointer"
            disabled={loading}
          >
            <FolderOpen className="size-3.5" />
            Choose from Gallery
          </button>
        </div>
      </div>

      {/* Gallery Selector Dialog */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl bg-white p-6 rounded-2xl border border-[#ecdcc9] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">
              Choose from Gallery
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto min-h-[300px] py-4">
            {galleryLoading ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground">
                <Loader2 className="size-8 animate-spin text-primary" />
                <span className="text-sm">Loading gallery library...</span>
              </div>
            ) : galleryImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-2 text-muted-foreground text-center">
                <FolderOpen className="size-10 text-muted-foreground/60" />
                <span className="text-sm">No images in your gallery yet.</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {galleryImages.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onUploadSuccess(url);
                      setGalleryOpen(false);
                      toast.success("Image selected from gallery!");
                    }}
                    className="aspect-square rounded-xl overflow-hidden border border-border bg-[#faf6f0] hover:border-primary hover:shadow-sm focus:outline-none transition-all relative group cursor-pointer"
                  >
                    <img src={url} alt="Gallery item" className="size-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end pt-3 border-t border-[#ecdcc9]/20">
            <Button type="button" variant="outline" onClick={() => setGalleryOpen(false)} className="rounded-full">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
