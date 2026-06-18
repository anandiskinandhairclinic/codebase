import { createFileRoute } from "@tanstack/react-router";
import { productList, productImage } from "@/lib/firebaseDataAdapter";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  component: () => (
    <div className="space-y-6">
      <Header title="Products" actionLabel="Add product" />
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>{["Product", "Category", "Skin", "Price", ""].map(h => <th key={h} className="px-5 py-3 font-medium text-muted-foreground">{h}</th>)}</tr>
          </thead>
          <tbody>
            {productList.map(p => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-5 py-3 flex items-center gap-3">
                  <img src={productImage} alt="" className="size-10 rounded-lg object-cover" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="px-5 py-3">{p.category}</td>
                <td className="px-5 py-3">{p.skin ?? p.hair ?? "—"}</td>
                <td className="px-5 py-3">₹{p.price.toLocaleString()}</td>
                <td className="px-5 py-3"><div className="flex gap-1 justify-end"><IconBtn icon={Pencil} /><IconBtn icon={Trash2} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});

export function Header({ title, actionLabel }: { title: string; actionLabel?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-display text-3xl">{title}</h1>
      {actionLabel && <button className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm inline-flex items-center gap-1.5"><Plus className="size-4" /> {actionLabel}</button>}
    </div>
  );
}
export function IconBtn({ icon: Icon }: { icon: any }) {
  return <button className="size-8 rounded-lg hover:bg-muted grid place-items-center"><Icon className="size-4 text-muted-foreground" /></button>;
}
