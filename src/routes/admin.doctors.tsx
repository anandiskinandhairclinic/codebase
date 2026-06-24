import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./admin.products";
import { useState, useEffect } from "react";
import { getDoctorInfo } from "@/lib/firebaseServices";
import { updateSingleDoc } from "@/lib/firebaseDataAdapter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, User } from "lucide-react";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export const Route = createFileRoute("/admin/doctors")({
  component: AdminDoctors,
});

function AdminDoctors() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    getDoctorInfo().then(doc => {
      if (doc) {
        setName(doc.name || "");
        setRole(doc.role || "");
        setQualifications(Array.isArray(doc.qualifications) ? doc.qualifications.join(", ") : "");
        setImageUrl(doc.imageUrl || "");
        setBio(doc.bio || "");
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        name,
        role,
        qualifications: qualifications.split(",").map(q => q.trim()).filter(Boolean),
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
        bio,
      };

      await updateSingleDoc("doctor", "info", data);
      toast.success("Doctor details updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update doctor details");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading doctor details...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Header title="Doctors / Staff Bio" />
        <p className="text-sm text-muted-foreground mt-1">Manage credentials and biographies displayed on the website.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-4 border-b border-[#ecdcc9]/40 pb-4">
          <div className="size-16 rounded-2xl bg-[#f4ece1] grid place-items-center text-primary flex-shrink-0">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="size-full rounded-2xl object-cover" />
            ) : (
              <User className="size-8" />
            )}
          </div>
          <div>
            <h3 className="font-display text-lg text-[#5c4a37] font-semibold">{name || "Doctor Name"}</h3>
            <p className="text-xs text-muted-foreground">{role || "Role / Title"}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="doc-name">Full Name</Label>
            <Input id="doc-name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="doc-role">Role / Title</Label>
            <Input id="doc-role" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Chief Dermatologist" required />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="doc-quals">Qualifications (comma separated)</Label>
          <Input id="doc-quals" value={qualifications} onChange={e => setQualifications(e.target.value)} placeholder="e.g. MBBS, MD - Skin, DDV" required />
        </div>

        <div className="space-y-1">
          <CloudinaryUpload
            label="Doctor Profile Photo (Cloudinary)"
            value={imageUrl}
            onUploadSuccess={(url) => setImageUrl(url)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="doc-bio">Biography</Label>
          <textarea
            id="doc-bio"
            rows={5}
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            placeholder="Write full biography here..."
            required
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" disabled={saving} className="rounded-full bg-primary text-primary-foreground px-6 flex items-center gap-2">
            <Save className="size-4" />
            {saving ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
