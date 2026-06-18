import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./admin.products";
import { Upload } from "lucide-react";
import { useState } from "react";
import { productImage, clinic } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/admin/before-after")({
  component: () => {
    const [eyeMask, setEyeMask] = useState(true);
    const [blur, setBlur] = useState(false);
    const [watermark, setWatermark] = useState(true);
    const [logo, setLogo] = useState(true);
    return (
      <div className="space-y-6">
        <Header title="Before / After" />
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center">
              <Upload className="size-6 mx-auto text-muted-foreground" />
              <div className="mt-3 font-medium">Upload Before image</div>
              <div className="text-xs text-muted-foreground mt-1">JPG or PNG, up to 5MB</div>
            </div>
            <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center">
              <Upload className="size-6 mx-auto text-muted-foreground" />
              <div className="mt-3 font-medium">Upload After image</div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 space-y-3">
              <div className="font-medium">Privacy & branding</div>
              {[
                { l: "Add eye mask", v: eyeMask, s: setEyeMask },
                { l: "Blur face", v: blur, s: setBlur },
                { l: "Add watermark", v: watermark, s: setWatermark },
                { l: "Add clinic logo", v: logo, s: setLogo },
              ].map(opt => (
                <label key={opt.l} className="flex items-center justify-between text-sm">
                  <span>{opt.l}</span>
                  <input type="checkbox" checked={opt.v} onChange={e => opt.s(e.target.checked)} className="size-4 accent-primary" />
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="font-medium mb-3">Preview</div>
            <div className="grid grid-cols-2 gap-3">
              {(["Before", "After"] as const).map(label => (
                <div key={label} className="relative rounded-2xl overflow-hidden aspect-square bg-muted">
                  <img src={productImage} alt="" className={`size-full object-cover ${blur ? "blur-sm" : ""} ${label === "Before" ? "sepia" : ""}`} />
                  {eyeMask && <div className="absolute top-1/3 left-1/4 right-1/4 h-6 bg-foreground/85 rounded-sm" />}
                  <div className="absolute top-2 left-2 chip bg-card/80">{label}</div>
                  {logo && <div className="absolute bottom-2 left-2 text-xs font-display text-card bg-foreground/60 px-2 py-1 rounded">{clinic.name}</div>}
                  {watermark && <div className="absolute inset-0 grid place-items-center text-card/40 font-display text-xl rotate-[-20deg] text-center">{clinic.name}</div>}
                </div>
              ))}
            </div>
            <button className="mt-5 w-full rounded-full bg-primary text-primary-foreground py-2.5 text-sm">Save to gallery</button>
          </div>
        </div>
      </div>
    );
  },
});
