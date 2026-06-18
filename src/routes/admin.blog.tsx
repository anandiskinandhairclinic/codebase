import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { getBlogPosts, type BlogPost } from "@/lib/firebaseDataAdapter";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/blog")({
  component: () => {
    const [blog, setBlog] = useState<BlogPost[]>([]);
    useEffect(() => {
      getBlogPosts().then(setBlog);
    }, []);

    return (
      <div className="space-y-6">
        <Header title="Blog" actionLabel="Create post" />
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                {["Title", "Category", "Date", ""].map(h => (
                  <th key={h} className="px-5 py-3 font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blog.map(p => (
                <tr key={p.slug} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{p.title}</td>
                  <td className="px-5 py-3">{p.category}</td>
                  <td className="px-5 py-3">{p.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1 justify-end">
                      <IconBtn icon={Pencil} />
                      <IconBtn icon={Trash2} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});
