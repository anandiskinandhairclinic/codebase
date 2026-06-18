import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { getDoctorsList, type Doctor } from "@/lib/firebaseDataAdapter";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/doctors")({
  component: () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    useEffect(() => {
      getDoctorsList().then(setDoctors);
    }, []);

    return (
      <div className="space-y-6">
        <Header title="Doctors" actionLabel="Add doctor" />
        <div className="grid md:grid-cols-2 gap-5">
          {doctors.map(d => (
            <div key={d.slug} className="rounded-2xl border border-border bg-card p-5 flex gap-4">
              <img src={d.image} alt={d.name} className="size-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.title}</div>
                  </div>
                  <div className="flex gap-1"><IconBtn icon={Pencil} /><IconBtn icon={Trash2} /></div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{d.qualifications.join(" · ")}</div>
                <div className="mt-1 text-xs text-muted-foreground">{d.experience} · {d.awards.length} publications</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
