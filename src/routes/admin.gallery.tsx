import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./admin.products";
import { productImage } from "@/lib/firebaseDataAdapter";
import { Upload, Folder } from "lucide-react";

export const Route = createFileRoute("/admin/gallery")({
  component: () => (
    <div className="space-y-6">
      <Header title="Gallery" actionLabel="Upload image" />
      <div className="flex gap-2 flex-wrap">
        {["All", "Clinic", "Treatments", "Products", "Team", "Events"].map(a => (
          <button key={a} className="rounded-full bg-card border border-border px-4 py-2 text-sm inline-flex items-center gap-2"><Folder className="size-3.5" /> {a}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted">
            <img src={productImage} alt="" className="size-full object-cover" loading="lazy" />
          </div>
        ))}
        <div className="aspect-square rounded-2xl border-2 border-dashed border-border grid place-items-center text-muted-foreground">
          <div className="text-center"><Upload className="size-5 mx-auto" /><div className="text-xs mt-1">Drop here</div></div>
        </div>
      </div>
    </div>
  ),
});
