import React, { useState } from "react";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

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
      {label && <span className="text-sm font-medium text-[#5c4a37]">{label}</span>}
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
        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-[#ecdcc9] hover:bg-[#faf6f0] transition-colors rounded-full text-xs font-semibold text-[#5c4a37] cursor-pointer">
          <Upload className="size-3.5 animate-pulse" />
          {loading ? "Uploading..." : "Choose File"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
};
