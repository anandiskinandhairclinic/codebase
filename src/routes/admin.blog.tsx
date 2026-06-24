import { createFileRoute } from "@tanstack/react-router";
import { Header, IconBtn } from "./admin.products";
import { getBlogPosts, type BlogPost, updateSingleDoc, deleteDocFromCollection } from "@/lib/firebaseDataAdapter";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
});

function AdminBlog() {
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchBlog = () => {
    setLoading(true);
    getBlogPosts().then(list => {
      setBlog(list);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleOpenAdd = () => {
    setEditPost(null);
    setTitle("");
    setSlug("");
    setCategory("Skin Care");
    setReadTime("5 min");
    setImageUrl("");
    setExcerpt("");
    setContent("");
    setIsOpen(true);
  };

  const handleOpenEdit = (p: BlogPost) => {
    setEditPost(p);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setReadTime(p.read);
    setImageUrl(p.imageUrl || "");
    setExcerpt(p.excerpt);
    setContent(p.content || p.excerpt);
    setIsOpen(true);
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete post "${title}"?`)) return;
    try {
      await deleteDocFromCollection("blogs", slug);
      toast.success("Blog post deleted successfully");
      fetchBlog();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog post");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const activeSlug = editPost ? editPost.slug : slug.trim().toLowerCase().replace(/\s+/g, "-");
      if (!activeSlug) {
        toast.error("Invalid slug");
        return;
      }

      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const data = {
        slug: activeSlug,
        title,
        category,
        date: editPost ? editPost.date : today,
        readTime,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1556228525-013a776c56b1?w=900&q=70",
        excerpt,
        content: content || excerpt,
      };

      await updateSingleDoc("blogs", activeSlug, data);
      toast.success(editPost ? "Blog post updated successfully" : "Blog post created successfully");
      setIsOpen(false);
      fetchBlog();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save blog post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Blog" actionLabel="Create post" onAction={handleOpenAdd} />
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Loading blog posts...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>{["Title", "Category", "Date", ""].map(h => <th key={h} className="px-5 py-3 font-medium text-muted-foreground">{h}</th>)}</tr>
            </thead>
            <tbody>
              {blog.map(p => (
                <tr key={p.slug} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{p.title}</td>
                  <td className="px-5 py-3">{p.category}</td>
                  <td className="px-5 py-3">{p.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1 justify-end">
                      <IconBtn icon={Pencil} onClick={() => handleOpenEdit(p)} />
                      <IconBtn icon={Trash2} onClick={() => handleDelete(p.slug, p.title)} className="text-red-500 hover:bg-red-50" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl bg-white p-6 rounded-2xl border border-[#ecdcc9] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#5c4a37]">
              {editPost ? `Edit "${editPost.title}"` : "Create New Post"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="blg-title">Blog Title</Label>
                <Input id="blg-title" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="blg-slug">Slug Path</Label>
                <Input id="blg-slug" value={slug} onChange={e => setSlug(e.target.value)} placeholder="e.g. acne-myths" disabled={!!editPost} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="blg-cat">Category</Label>
                <select
                  id="blg-cat"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full text-sm rounded-full bg-muted/60 px-4 py-2.5 focus:outline-none"
                  required
                >
                  <option value="Skin Care">Skin Care</option>
                  <option value="Hair Care">Hair Care</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Beauty Tips">Beauty Tips</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="blg-read">Read Time</Label>
                <Input id="blg-read" value={readTime} onChange={e => setReadTime(e.target.value)} placeholder="e.g. 5 min" required />
              </div>
            </div>

            <div className="space-y-1">
              <CloudinaryUpload
                label="Featured Image (Cloudinary)"
                value={imageUrl}
                onUploadSuccess={(url) => setImageUrl(url)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="blg-exc">Excerpt / Short Summary</Label>
              <textarea
                id="blg-exc"
                rows={2}
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none"
                placeholder="A short sentence summarizing this post..."
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="blg-cont">Main Content</Label>
              <textarea
                id="blg-cont"
                rows={5}
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full text-sm rounded-xl border border-border p-3 focus-visible:outline-none"
                placeholder="Write the full post here..."
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">Cancel</Button>
              <Button type="submit" disabled={submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? "Publishing..." : "Save Post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
