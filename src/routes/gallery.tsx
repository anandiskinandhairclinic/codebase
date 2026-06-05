import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { getGallery } from "@/lib/firebaseServices";
import { galleryImages as fallbackGallery } from "@/lib/data";
import { cn } from "@/lib/utils";

// ----------------------------------------------------
// INTERACTIVE BEFORE/AFTER SLIDER COMPONENT (Task 4)
// ----------------------------------------------------
function BeforeAfterSlider({
  before,
  after,
  label
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [percent, setPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, currentTarget: HTMLDivElement) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPercent(newPercent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, e.currentTarget);
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border bg-white/70 p-2 shadow-sm border-glow-hover hover:shadow-lg transition-all duration-300 select-none touch-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX, e.currentTarget);
        }}
      >
        {/* BEFORE IMAGE (Background) */}
        <img
          src={before}
          alt="Before treatment"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

        {/* AFTER IMAGE (Foreground overlay clipping) */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
        >
          <img
            src={after}
            alt="After treatment"
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Draggable Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.35)]"
          style={{ left: `${percent}%` }}
        >
          {/* Double-arrow Handle Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-lg border border-primary/20 flex items-center justify-center text-primary text-xs font-black select-none pointer-events-none">
            ↔
          </div>
        </div>

        {/* Badges overlay */}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm pointer-events-none">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm pointer-events-none">After</span>
      </div>

      <div className="px-3 py-2.5 text-left flex items-center justify-between pointer-events-none">
        <span className="text-xs font-extrabold text-foreground">{label}</span>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Drag Slider</span>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Dr Jain's Skin Care Clinic" },
      { name: "description", content: "Take a tour of our modern clinic, treatment rooms and patient transformations." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(null);
  const [galleryList, setGalleryList] = useState(fallbackGallery);

  useEffect(() => {
    getGallery().then(setGalleryList);
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(galleryList.map((i) => i.category)))], [galleryList]);
  const items = filter === "All" ? galleryList : galleryList.filter((i) => i.category === filter);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Gallery"
        title={<>A look <span className="text-gradient">inside our clinic</span></>}
        description="Calm, modern and meticulously clean — designed for your comfort."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />
      <section className="relative isolate overflow-hidden mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/10 via-brand-frost/10 to-transparent -z-10 bg-dot-pattern opacity-50" />

        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-bold transition-all duration-200",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-primary/25 bg-white/70 text-muted-foreground hover:bg-secondary hover:text-primary"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((img, idx) => {
            // Conditional Render: Drag Slider comparison for Before/After photos
            if (img.beforeSrc && img.afterSrc) {
              return (
                <BeforeAfterSlider
                  key={(img.beforeSrc || "") + idx}
                  before={img.beforeSrc}
                  after={img.afterSrc}
                  label={img.caption}
                />
              );
            }

            // Normal Render: Static Image Card click overlay
            return (
              <button
                key={(img.src || "") + idx}
                onClick={() => setOpen(idx)}
                className="group relative overflow-hidden rounded-2xl border bg-white/70 p-2 shadow-sm border-glow-hover hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  <img src={img.src} alt={img.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-secondary/95 px-2.5 py-0.5 text-[9px] font-bold text-primary shadow-sm backdrop-blur-sm">{img.category}</span>
                </div>
                <div className="px-3 py-2.5 text-left flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{img.caption}</span>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-md">View Room</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {open !== null && items[open] && !items[open].beforeSrc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={() => setOpen(null)}>
          <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2" onClick={() => setOpen(null)}><X className="h-4 w-4" /></button>
          <img src={items[open].src} alt={items[open].caption} className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl" />
        </div>
      )}
    </SiteLayout>
  );
}