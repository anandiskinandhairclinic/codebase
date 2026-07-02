import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getTreatments, type Treatment, updateSingleDoc, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

function AdminServices() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [editTreatment, setEditTreatment] = useState<Treatment | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [blurb, setBlurb] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // Advanced details
  const [symptoms, setSymptoms] = useState("");
  const [causes, setCauses] = useState("");
  const [benefits, setBenefits] = useState("");
  const [processList, setProcessList] = useState<{ step: string; detail: string }[]>([]);
  const [faqList, setFaqList] = useState<{ q: string; a: string }[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const fetchTreatments = () => {
    setLoading(true);
    getTreatments().then(list => {
      setTreatments(list);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleOpenAdd = () => {
    setEditTreatment(null);
    setName("");
    setSlug("");
    setCategory("Skin");
    setDuration("45 min");
    setPrice("");
    setBlurb("");
    setDescription("");
    setImageUrl("");
    setSymptoms("");
    setCauses("");
    setBenefits("");
    setProcessList([]);
    setFaqList([]);
    setIsOpen(true);
  };

  const handleOpenEdit = (t: Treatment) => {
    setEditTreatment(t);
    setName(t.name);
    setSlug(t.slug);
    setCategory(t.category);
    setDuration(t.duration);
    setPrice(t.price ? t.price.toString() : "");
    setBlurb(t.blurb);
    setDescription(t.overview || t.blurb);
    setImageUrl(t.image || "");
    
    setSymptoms(t.symptoms ? t.symptoms.join("\n") : "");
    setCauses(t.causes ? t.causes.join("\n") : "");
    setBenefits(t.benefits ? t.benefits.join("\n") : "");
    
    setProcessList(t.process || []);
    setFaqList(t.faqs || []);

    setIsOpen(true);
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete service ${name}?`)) return;
    try {
      await deleteDocFromCollection("services", slug);
      toast.success("Service deleted successfully");
      fetchTreatments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete service");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const activeSlug = editTreatment ? editTreatment.slug : slug.trim().toLowerCase().replace(/\s+/g, "-");
      if (!activeSlug) {
        toast.error("Invalid slug");
        return;
      }

      // Parse advanced fields
      const symptomsList = symptoms.split("\n").map(s => s.trim()).filter(Boolean);
      const causesList = causes.split("\n").map(c => c.trim()).filter(Boolean);
      const benefitsList = benefits.split("\n").map(b => b.trim()).filter(Boolean);
      
      const filteredProcess = processList.filter(p => p.step.trim() || p.detail.trim());
      const filteredFaqs = faqList.filter(f => f.q.trim() || f.a.trim());

      const data = {
        slug: activeSlug,
        title: name,
        name,
        category,
        duration,
        price: Number(price) || 0,
        short: blurb,
        overview: description || blurb,
        image: imageUrl,
        imageUrl: imageUrl, // double key compatibility
        symptoms: symptomsList,
        causes: causesList,
        benefits: benefitsList,
        process: filteredProcess,
        faqs: filteredFaqs,
      };

      await updateSingleDoc("services", activeSlug, data);
      toast.success(editTreatment ? "Service updated successfully" : "Service created successfully");
      setIsOpen(false);
      fetchTreatments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save service");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Services" actionLabel="Add service" onAction={handleOpenAdd} />
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Loading services...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/60 text-left">
                <tr>
                  {["Service", "Category", "Duration", "Price", ""].map(h => (
                    <th key={h} className="px-5 py-3 font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {treatments.map((t, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-5 py-3 flex items-center gap-3">
                      <img 
                        src={t.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=70"} 
                        alt="" 
                        className="size-10 rounded-lg object-cover bg-muted border border-border" 
                      />
                      <span className="font-medium">{t.name}</span>
                    </td>
                    <td className="px-5 py-3">{t.category}</td>
                    <td className="px-5 py-3">{t.duration}</td>
                    <td className="px-5 py-3">{t.price ? `₹${t.price.toLocaleString()}` : "On consult"}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1 justify-end">
                        <IconBtn icon={Pencil} onClick={() => handleOpenEdit(t)} />
                        <IconBtn icon={Trash2} onClick={() => handleDelete(t.slug, t.name)} className="text-red-500 hover:bg-red-50" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl bg-white p-4 sm:p-6 rounded-2xl border border-[#ecdcc9] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">
              {editTreatment ? `Edit Service ${editTreatment.name}` : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="srv-name">Service Name</Label>
                <Input id="srv-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Laser Scar Therapy" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="srv-slug">URL Slug</Label>
                <Input
                  id="srv-slug"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="e.g. laser-scar-therapy"
                  disabled={!!editTreatment}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="srv-cat">Category</Label>
                <select
                  id="srv-cat"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full text-sm rounded-full bg-muted/60 px-4 py-2.5 focus:outline-none border border-input"
                  required
                >
                  <option value="Skin">Skin</option>
                  <option value="Nail">Nail</option>
                  <option value="Hair">Hair</option>
                  <option value="Lasers">Lasers</option>
                  <option value="Procedure">Procedure</option>
                  <option value="Aesthetic Procedure">Aesthetic Procedure</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="srv-duration">Duration</Label>
                <Input id="srv-duration" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 45 min" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="srv-price">Price (₹, 0 for consult)</Label>
                <Input id="srv-price" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 1500" />
              </div>
            </div>

            <div className="space-y-1">
              <CloudinaryUpload
                label="Treatment Cover Image (Cloudinary)"
                value={imageUrl}
                onUploadSuccess={(url) => setImageUrl(url)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="srv-blurb">Tag Line</Label>
              <textarea
                id="srv-blurb"
                rows={2}
                value={blurb}
                onChange={e => setBlurb(e.target.value)}
                className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none"
                placeholder="Brief tag line summary..."
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="srv-desc">Overview / Description</Label>
              <textarea
                id="srv-desc"
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none"
                placeholder="Full details of treatment..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="srv-symptoms">Symptoms (one per line)</Label>
                <textarea
                  id="srv-symptoms"
                  rows={3}
                  value={symptoms}
                  onChange={e => setSymptoms(e.target.value)}
                  className="w-full text-xs rounded-xl border border-border p-3 focus-visible:outline-none"
                  placeholder="Acne cysts&#10;Enlarged pores"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="srv-causes">Causes (one per line)</Label>
                <textarea
                  id="srv-causes"
                  rows={3}
                  value={causes}
                  onChange={e => setCauses(e.target.value)}
                  className="w-full text-xs rounded-xl border border-border p-3 focus-visible:outline-none"
                  placeholder="Hormonal triggers&#10;Excess oil"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="srv-benefits">Benefits (one per line)</Label>
              <textarea
                id="srv-benefits"
                rows={3}
                value={benefits}
                onChange={e => setBenefits(e.target.value)}
                className="w-full text-xs rounded-xl border border-border p-3 focus-visible:outline-none"
                placeholder="Clears active breakouts&#10;Reduces marks"
              />
            </div>

            <div className="space-y-2 border-t border-[#ecdcc9]/25 pt-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-[#5c4a37]">Treatment Pathway Steps</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setProcessList([...processList, { step: "", detail: "" }])}
                  className="rounded-full text-xs"
                >
                  + Add Step
                </Button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {processList.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start bg-muted/40 p-2.5 rounded-xl border border-border">
                    <div className="flex-1 space-y-2">
                      <Input 
                        placeholder={`Step ${idx + 1} Title`} 
                        value={item.step} 
                        onChange={e => {
                          const newList = [...processList];
                          newList[idx].step = e.target.value;
                          setProcessList(newList);
                        }} 
                        className="h-8 text-xs rounded-lg"
                        required
                      />
                      <textarea 
                        placeholder="Step detail description..." 
                        rows={2}
                        value={item.detail} 
                        onChange={e => {
                          const newList = [...processList];
                          newList[idx].detail = e.target.value;
                          setProcessList(newList);
                        }} 
                        className="w-full text-xs rounded-lg border border-border p-2 focus-visible:outline-none"
                        required
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setProcessList(processList.filter((_, i) => i !== idx))} 
                      className="size-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center border border-transparent hover:border-red-200 transition-colors mt-0.5 text-lg font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {processList.length === 0 && (
                  <p className="text-[11px] text-muted-foreground text-center py-4 bg-muted/20 rounded-xl border border-dashed">
                    No steps added. Click "+ Add Step" to build the pathway.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 border-t border-[#ecdcc9]/25 pt-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-[#5c4a37]">Frequently Asked Questions</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFaqList([...faqList, { q: "", a: "" }])}
                  className="rounded-full text-xs"
                >
                  + Add FAQ
                </Button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {faqList.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start bg-muted/40 p-2.5 rounded-xl border border-border">
                    <div className="flex-1 space-y-2">
                      <Input 
                        placeholder="Question text..." 
                        value={item.q} 
                        onChange={e => {
                          const newList = [...faqList];
                          newList[idx].q = e.target.value;
                          setFaqList(newList);
                        }} 
                        className="h-8 text-xs rounded-lg"
                        required
                      />
                      <textarea 
                        placeholder="Answer details..." 
                        rows={2}
                        value={item.a} 
                        onChange={e => {
                          const newList = [...faqList];
                          newList[idx].a = e.target.value;
                          setFaqList(newList);
                        }} 
                        className="w-full text-xs rounded-lg border border-border p-2 focus-visible:outline-none"
                        required
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setFaqList(faqList.filter((_, i) => i !== idx))} 
                      className="size-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center border border-transparent hover:border-red-200 transition-colors mt-0.5 text-lg font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {faqList.length === 0 && (
                  <p className="text-[11px] text-muted-foreground text-center py-4 bg-muted/20 rounded-xl border border-dashed">
                    No FAQs added. Click "+ Add FAQ" to add questions.
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">Cancel</Button>
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? "Saving..." : "Save Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
