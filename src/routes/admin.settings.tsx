import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./admin.products";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <div className="space-y-6">
      <Header title="Settings" />
      <div className="grid lg:grid-cols-2 gap-5">
        {[
          { t: "Branding", fields: ["Clinic name", "Tagline", "Logo (upload)"] },
          { t: "SEO", fields: ["Meta title", "Meta description", "OG image"] },
          { t: "Social media", fields: ["Instagram URL", "Facebook URL", "YouTube URL"] },
          { t: "Contact", fields: ["Phone", "Email", "Address", "Working hours"] },
        ].map(card => (
          <div key={card.t} className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="font-medium">{card.t}</div>
            {card.fields.map(f => (
              <label key={f} className="block">
                <span className="text-xs text-muted-foreground">{f}</span>
                <input className="mt-1 w-full rounded-full bg-muted/60 px-4 py-2 text-sm" />
              </label>
            ))}
            <button className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm">Save</button>
          </div>
        ))}
      </div>
    </div>
  ),
});
