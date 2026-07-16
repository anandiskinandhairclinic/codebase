import { createFileRoute } from "@tanstack/react-router";
import { getProductsList, productImage, type Product, addDocToCollection, updateDocInCollection, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";
import { skinConcernsList, skinTypesList } from "@/components/site/Chatbot";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [blurb, setBlurb] = useState("");
  const [benefits, setBenefits] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    getProductsList().then(list => {
      setProducts(list);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditProduct(null);
    setName("");
    setCategory("Moisturizers");
    setPrice("");
    setBlurb("");
    setBenefits("");
    setIngredients("");
    setImageUrl("");
    setSelectedConcerns([]);
    setIsOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditProduct(p);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price.toString());
    setBlurb(p.blurb);
    setBenefits(p.benefits.join("\n"));
    setIngredients(p.ingredients.join("\n"));
    setImageUrl(p.imageUrl || "");
    setSelectedConcerns(p.concerns || []);
    setIsOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await deleteDocFromCollection("products", id);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = {
        name,
        category,
        price: Number(price) || 0,
        skin: null,
        hair: null,
        blurb,
        benefits: benefits.split("\n").map(b => b.trim()).filter(Boolean),
        ingredients: ingredients.split("\n").map(i => i.trim()).filter(Boolean),
        imageUrl: imageUrl || null,
        concerns: selectedConcerns,
      };

      if (editProduct) {
        await updateDocInCollection("products", editProduct.id, data);
        toast.success("Product updated successfully");
      } else {
        await addDocToCollection("products", data);
        toast.success("Product created successfully");
      }
      setIsOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Products" actionLabel="Add product" onAction={handleOpenAdd} />
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/60 text-left">
                <tr>{["Product", "Category", "Skin/Hair / Concerns", "Price", ""].map(h => <th key={h} className="px-5 py-3 font-medium text-muted-foreground">{h}</th>)}</tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="px-5 py-3 flex items-center gap-3">
                      <img src={p.imageUrl || productImage} alt="" className="size-10 rounded-lg object-cover" />
                      <span className="font-medium">{p.name}</span>
                    </td>
                    <td className="px-5 py-3">{p.category}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[250px]">
                        {(p.skin && p.skin !== "None" && p.skin !== "All") && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-full">{p.skin}</span>
                        )}
                        {(p.hair && p.hair !== "None" && p.hair !== "All") && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-full">{p.hair}</span>
                        )}
                        {p.concerns?.map(c => (
                          <span key={c} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                            {c}
                          </span>
                        ))}
                        {!(p.skin && p.skin !== "None" && p.skin !== "All") && !(p.hair && p.hair !== "None" && p.hair !== "All") && (!p.concerns || p.concerns.length === 0) && "—"}
                      </div>
                    </td>
                    <td className="px-5 py-3">₹{p.price.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1 justify-end">
                        <IconBtn icon={Pencil} onClick={() => handleOpenEdit(p)} />
                        <IconBtn icon={Trash2} onClick={() => handleDelete(p.id, p.name)} className="text-red-500 hover:bg-red-50" />
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
        <DialogContent className="w-[95vw] sm:max-w-lg bg-white p-4 sm:p-6 rounded-2xl border border-[#ecdcc9] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">
              {editProduct ? `Edit ${editProduct.name}` : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="prod-name">Product Name</Label>
                <Input id="prod-name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="prod-cat">Category</Label>
                <select
                  id="prod-cat"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full text-sm rounded-full bg-muted/60 px-4 py-2.5 focus:outline-none border border-input"
                  required
                >
                  {["Cleansers", "Moisturizers", "Serums", "Sunscreen", "Hair Care", "Kits"].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="prod-price">Price (₹)</Label>
                <Input id="prod-price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-1">
              <CloudinaryUpload
                label="Product Image (Cloudinary)"
                value={imageUrl}
                onUploadSuccess={(url) => setImageUrl(url)}
              />
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <Label className="font-semibold text-xs text-[#5c4a37]">Chatbot Prescriptions</Label>
              
              <div className="flex flex-col gap-4">
                {/* Column 1: Skin Types */}
                <div className="space-y-2 bg-muted/30 p-3.5 rounded-2xl border border-border/50">
                  <div className="text-[10px] font-bold text-[#5c4a37] uppercase tracking-wider mb-1">Skin Types</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {skinTypesList.map((type) => (
                      <label key={type} className="flex items-center gap-2 text-xs font-medium cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={selectedConcerns.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedConcerns([...selectedConcerns, type]);
                            } else {
                              setSelectedConcerns(selectedConcerns.filter((c) => c !== type));
                            }
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary size-4 cursor-pointer"
                        />
                        <span className="text-foreground/80">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Column 2: Skin Concerns */}
                <div className="space-y-2 bg-muted/30 p-3.5 rounded-2xl border border-border/50">
                  <div className="text-[10px] font-bold text-[#5c4a37] uppercase tracking-wider mb-1">Skin Concerns</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-[160px] overflow-y-auto pr-1">
                    {skinConcernsList.map((concern) => (
                      <label key={concern} className="flex items-center gap-2 text-xs font-medium cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={selectedConcerns.includes(concern)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedConcerns([...selectedConcerns, concern]);
                            } else {
                              setSelectedConcerns(selectedConcerns.filter((c) => c !== concern));
                            }
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary size-4 cursor-pointer"
                        />
                        <span className="text-foreground/80">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="prod-blurb">Tag Line</Label>
              <textarea
                id="prod-blurb"
                rows={2}
                value={blurb}
                onChange={e => setBlurb(e.target.value)}
                className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="Brief tag line summary..."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="prod-benefits">Benefits (one per line)</Label>
                <textarea
                  id="prod-benefits"
                  rows={3}
                  value={benefits}
                  onChange={e => setBenefits(e.target.value)}
                  className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none"
                  placeholder="Reduces breakouts&#10;Unclogs pores"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="prod-ingredients">Ingredients (one per line)</Label>
                <textarea
                  id="prod-ingredients"
                  rows={3}
                  value={ingredients}
                  onChange={e => setIngredients(e.target.value)}
                  className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none"
                  placeholder="Salicylic Acid 2%&#10;Tea Tree Oil"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">Cancel</Button>
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? "Saving..." : "Save Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function Header({ title, actionLabel, onAction }: { title: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-display text-3xl text-[#5c4a37]">{title}</h1>
      {actionLabel && (
        <button onClick={onAction} className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground px-4 py-2 text-sm inline-flex items-center gap-1.5 cursor-pointer">
          <Plus className="size-4" /> {actionLabel}
        </button>
      )}
    </div>
  );
}

export function IconBtn({ icon: Icon, onClick, className }: { icon: any; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`size-8 rounded-lg hover:bg-muted grid place-items-center cursor-pointer ${className}`}>
      <Icon className="size-4 text-muted-foreground" />
    </button>
  );
}
