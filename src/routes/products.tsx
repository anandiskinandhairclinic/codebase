import { createFileRoute, Link } from "@tanstack/react-router";
import { productList, productCategories, skinTypes, hairTypes, productImage } from "@/lib/firebaseDataAdapter";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Shop — Dr. Jain's Skin Care Clinic" }] }),
  component: Products,
});

function Products() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [skin, setSkin] = useState("All");
  const [hair, setHair] = useState("All");

  const filtered = useMemo(() => productList.filter(p =>
    (cat === "All" || p.category === cat) &&
    (skin === "All" || p.skin === skin || p.skin === "All") &&
    (hair === "All" || p.hair === hair) &&
    (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat, skin, hair]);

  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">Clinic Cosmeceuticals</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">Shop with intention.</h1>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Doctor-recommended formulas, curated for your daily skin & hair routine.</p>
      </section>

      <section className="px-5 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-card border border-border p-5 lg:p-7 grid md:grid-cols-4 gap-4">
          <div className="relative md:col-span-1">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" className="w-full rounded-full bg-muted/60 pl-10 pr-4 py-2.5 text-sm focus:outline-none" />
          </div>
          <Select value={cat} onChange={setCat} options={productCategories} label="Category" />
          <Select value={skin} onChange={setSkin} options={skinTypes} label="Skin type" />
          <Select value={hair} onChange={setHair} options={hairTypes} label="Hair type" />
        </div>
      </section>

      <section className="px-5 lg:px-10 mt-12">
        <div className="mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(p => (
            <Link to="/products/$id" params={{ id: p.id }} key={p.id} className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-card transition-shadow">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={productImage} alt={p.name} loading="lazy" className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</div>
                <h3 className="font-display text-xl mt-1.5">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{p.blurb}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium">₹{p.price.toLocaleString()}</span>
                  <span className="text-xs text-primary">View ›</span>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && <div className="text-muted-foreground col-span-full text-center py-12">No products match those filters.</div>}
        </div>
      </section>
    </main>
  );
}

function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-full bg-muted/60 px-4 py-2.5 text-sm focus:outline-none">
        {options.map(o => <option key={o} value={o}>{label}: {o}</option>)}
      </select>
    </label>
  );
}
