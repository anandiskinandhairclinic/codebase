import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProductById, getProductsList, productImage, type Product } from "@/lib/firebaseDataAdapter";
import { Star, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/products/$id")({
  component: Detail,
  notFoundComponent: () => <div className="p-20 text-center">Not found.</div>,
});

function Detail() {
  const { id } = Route.useParams();
  const { addToCart, setCartOpen } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(id).then(prod => {
      if (prod) {
        setProduct(prod);
        getProductsList().then(allProducts => {
          setRelated(allProducts.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 3));
          setLoading(false);
        });
      } else {
        setProduct(null);
        setLoading(false);
      }
    });
  }, [id]);

  if (loading) {
    return (
      <main className="pb-24 flex items-center justify-center min-h-[50vh]">
        <div className="text-muted-foreground font-display text-xl animate-pulse">Loading product details...</div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pb-24">
        <div className="px-5 lg:px-10 pt-10">
          <Link to="/products" className="text-sm text-muted-foreground inline-flex items-center gap-1"><ArrowLeft className="size-4" /> Back to shop</Link>
        </div>
        <div className="p-20 text-center text-muted-foreground">Product not found.</div>
      </main>
    );
  }

  return (
    <main className="pb-24">
      <div className="px-5 lg:px-10 pt-10">
        <Link to="/products" className="text-sm text-muted-foreground inline-flex items-center gap-1"><ArrowLeft className="size-4" /> Back to shop</Link>
      </div>
      <section className="px-5 lg:px-10 mt-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-4 rounded-[2.5rem] overflow-hidden aspect-square bg-muted">
              <img src={product.imageUrl || productImage} alt={product.name} className="size-full object-cover" />
            </div>
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-square bg-muted opacity-70 hover:opacity-100 transition-opacity">
                <img src={product.imageUrl || productImage} alt="" className="size-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <span className="chip">{product.category}</span>
            <h1 className="mt-4 font-display text-4xl lg:text-6xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-secondary text-secondary" />)}</div>
              <span className="text-muted-foreground">4.9 (218 reviews)</span>
            </div>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{product.blurb}</p>
            <div className="mt-6 font-display text-3xl">₹{product.price.toLocaleString()}</div>
            <button
              onClick={() => {
                if (product) {
                  addToCart(product);
                  setCartOpen(true);
                }
              }}
              className="mt-6 w-full md:w-auto rounded-full bg-primary hover:bg-primary/95 text-primary-foreground px-8 py-3.5 font-medium cursor-pointer transition-colors"
            >
              Add to Cart
            </button>
            <div className="mt-10 space-y-6">
              <Block t="Benefits" items={product.benefits} />
              <Block t="Ingredients" items={product.ingredients} />
              <Block t="How to use" items={["Apply 2–3 drops to clean skin", "Follow with moisturiser", "Use at night, 3–4× weekly"]} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 lg:px-10 mt-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl mb-8">You may also love</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.id} to="/products/$id" params={{ id: p.id }} className="rounded-3xl bg-card border border-border overflow-hidden">
                <div className="aspect-square bg-muted"><img src={p.imageUrl || productImage} alt={p.name} className="size-full object-cover" loading="lazy" /></div>
                <div className="p-5"><div className="font-display text-xl">{p.name}</div><div className="text-sm mt-2">₹{p.price.toLocaleString()}</div></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Block({ t, items }: { t: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-xl">{t}</h3>
      <ul className="mt-3 space-y-1.5 text-muted-foreground text-sm">{items.map(i => <li key={i}>· {i}</li>)}</ul>
    </div>
  );
}
