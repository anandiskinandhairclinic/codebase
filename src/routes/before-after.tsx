import { createFileRoute } from "@tanstack/react-router";
import { getBeforeAfterList, type BeforeAfterItem } from "@/lib/firebaseDataAdapter";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/before-after")({
  head: () => ({ meta: [{ title: "Real Results — Anandi Skin & Hair Clinic" }] }),
  component: Page,
});

function Page() {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBeforeAfterList().then(list => {
      setItems(list);
      setLoading(false);
    });
  }, []);

  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">Real Results</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">Clinical proof, visualized.</h1>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">All images shared with patient consent. Privacy masks applied.</p>
      </section>
      <section className="px-5 lg:px-10">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse">Loading gallery...</div>
        ) : (
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
            {items.map(b => <ResultCard key={b.id} item={b} />)}
          </div>
        )}
      </section>
    </main>
  );
}

function ResultCard({ item }: { item: BeforeAfterItem }) {
  const [pos, setPos] = useState(50);
  const isPair = !!(item.beforeSrc && item.afterSrc);

  return (
    <div className="rounded-3xl bg-card border border-border overflow-hidden">
      <div className="relative aspect-[4/3] select-none overflow-hidden bg-muted">
        {isPair ? (
          <>
            <img src={item.afterSrc} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img src={item.beforeSrc} alt="" className="size-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} />
            </div>
            <div className="absolute top-3 left-3 chip bg-card/80">Before</div>
            <div className="absolute top-3 right-3 chip bg-card/80">After</div>
            <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="w-0.5 h-full bg-card shadow-card" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-9 rounded-full bg-card grid place-items-center text-xs font-medium shadow-card">⇆</div>
            </div>
            <input type="range" min={0} max={100} value={pos} onChange={e => setPos(Number(e.target.value))} className="absolute inset-0 size-full opacity-0 cursor-ew-resize" />
          </>
        ) : (
          <img src={item.afterSrc || item.beforeSrc} alt={item.treatment} className="size-full object-cover" />
        )}
        <div className="absolute bottom-3 right-3 text-xs bg-foreground/70 text-background rounded-full px-2 py-1">© Anandi Clinic</div>
      </div>
      <div className="p-6">
        {item.weeks > 0 && <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.weeks} weeks</div>}
        <div className="font-display text-2xl mt-1">{item.treatment}</div>
        <p className="text-muted-foreground text-sm mt-2">{item.story}</p>
      </div>
    </div>
  );
}
