import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getTreatments, type Treatment } from "@/lib/firebaseDataAdapter";

export const Route = createFileRoute("/admin/services")({
  component: () => {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    useEffect(() => { getTreatments().then(setTreatments); }, []);

    return (
      <div className="space-y-6">
        <Header title="Services" actionLabel="Add service" />
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>{["Name", "Category", "Duration", "Price", ""].map(h => <th key={h} className="px-5 py-3 font-medium text-muted-foreground">{h}</th>)}</tr>
            </thead>
            <tbody>
              {treatments.map((t, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{t.name}</td>
                  <td className="px-5 py-3">{t.category}</td>
                  <td className="px-5 py-3">{t.duration}</td>
                  <td className="px-5 py-3">{t.price ? `₹${t.price.toLocaleString()}` : "On consult"}</td>
                  <td className="px-5 py-3"><div className="flex gap-1 justify-end"><IconBtn icon={Pencil} /><IconBtn icon={Trash2} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});
