import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getBlogPosts, productImage, type BlogPost } from "@/lib/firebaseDataAdapter";

const categories = ["All", "Skin Care", "Hair Care", "Dermatology", "Nutrition", "Lifestyle", "Beauty Tips"];

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Journal — Anandi Skin & Hair Clinic" }] }),
  component: Page,
});

function Page() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [cat, setCat] = useState("All");
  useEffect(() => { getBlogPosts().then(setAllPosts); }, []);

  const posts = allPosts.filter(b => cat === "All" || b.category === cat);

  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">Journal</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">Skin, hair & wellness insights.</h1>
      </section>
      <section className="px-5 lg:px-10 mb-10">
        <div className="mx-auto max-w-7xl flex flex-wrap justify-center gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm border transition-colors ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>{c}</button>
          ))}
        </div>
      </section>
      <section className="px-5 lg:px-10">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(p => (
            <article key={p.slug} className="group rounded-3xl bg-card border border-border overflow-hidden">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="block aspect-[4/3] bg-muted overflow-hidden">
                <img src={p.imageUrl || productImage} alt="" loading="lazy" className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </Link>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-primary">{p.category} · {p.read}</div>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary transition-colors">
                  <h2 className="font-display text-2xl mt-2 leading-snug">{p.title}</h2>
                </Link>
                <p className="text-sm text-muted-foreground mt-3">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{p.date}</span>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-primary font-semibold">Read ›</Link>
                </div>
              </div>
            </article>
          ))}
          {posts.length === 0 && <div className="text-muted-foreground col-span-full text-center py-12">No posts in this category yet.</div>}
        </div>
      </section>
    </main>
  );
}
