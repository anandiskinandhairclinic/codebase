import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Pencil, Trash2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getTestimonialsList, type Testimonial } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/admin/testimonials")({
  component: () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    useEffect(() => { getTestimonialsList().then(setTestimonials); }, []);

    return (
      <div className="space-y-6">
        <Header title="Testimonials" actionLabel="Add testimonial" />
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.treatment}</div>
                </div>
                <div className="flex gap-1"><IconBtn icon={Pencil} /><IconBtn icon={Trash2} /></div>
              </div>
              <div className="flex mt-2 mb-3">{[...Array(t.rating)].map((_, i) => <Star key={i} className="size-3.5 fill-secondary text-secondary" />)}</div>
              <p className="text-sm text-muted-foreground">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
