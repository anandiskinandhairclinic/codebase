import { createFileRoute } from "@tanstack/react-router";
import { beforeAfter, productImage } from "@/lib/firebaseDataAdapter";
import { useState } from "react";

export const Route = createFileRoute("/before-after")({
  head: () => ({ meta: [{ title: "Real Results — Dr. Jain's Skin Care Clinic" }] }),
  component: Page,
});

function Page() {
  return (
    <main className="pb-24">
      <section className="px-5 lg:px-10 pt-16 pb-10 text-center">
        <span className="chip">Real Results</span>
        <h1 className="mt-5 font-display text-5xl lg:text-7xl">Clinical proof, visualized.</h1>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">All images shared with patient consent. Privacy masks applied.</p>
      </section>
      <section className="px-5 lg:px-10">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          {beforeAfter.map(b => <ResultCard key={b.id} item={b} />)}
        </div>
      </section>
    </main>
  );
}

function ResultCard({ item }: { item: typeof beforeAfter[number] }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="rounded-3xl bg-card border border-border overflow-hidden">
      <div className="relative aspect-[4/3] select-none overflow-hidden">
        <img src={productImage} alt="" className="absolute inset-0 size-full object-cover sepia" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={productImage} alt="" className="size-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} />
        </div>
        <div className="absolute top-3 left-3 chip bg-card/80">Before</div>
        <div className="absolute top-3 right-3 chip bg-card/80">After</div>
        <div className="absolute bottom-3 right-3 text-xs bg-foreground/70 text-background rounded-full px-2 py-1">© Dr. Jain's Clinic</div>
        <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="w-0.5 h-full bg-card shadow-card" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-9 rounded-full bg-card grid place-items-center text-xs font-medium shadow-card">⇆</div>
        </div>
        <input type="range" min={0} max={100} value={pos} onChange={e => setPos(Number(e.target.value))} className="absolute inset-0 size-full opacity-0 cursor-ew-resize" />
      </div>
      <div className="p-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.weeks} weeks</div>
        <div className="font-display text-2xl mt-1">{item.treatment}</div>
        <p className="text-muted-foreground text-sm mt-2">{item.story}</p>
      </div>
    </div>
  );
}
