import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BlogCard } from "@/components/site/BlogCard";
import { getBlogs } from "@/lib/firebaseServices";
import { blogs as fallbackBlogs, type BlogPost } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const list = await getBlogs();
    const p = list.find((b) => b.slug === params.slug);
    if (!p) {
      const fallback = fallbackBlogs.find((b) => b.slug === params.slug);
      if (!fallback) throw notFound();
      return fallback;
    }
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Blog"} | Dr Jain's Skin Care Clinic` },
      { name: "description", content: loaderData?.excerpt ?? "" },
    ],
    links: [{ rel: "canonical", href: `/blog/${loaderData?.slug ?? ""}` }],
  }),
  component: BlogDetail,
});

function BlogDetail() {
  const post = Route.useLoaderData() as BlogPost;
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogs().then((list) => {
      setRelated(list.filter((b) => b.slug !== post.slug).slice(0, 3));
    });
  }, [post.slug]);

  return (
    <SiteLayout>
      <article>
        <div className="bg-soft-band/60 border-b">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Back to blog</Link>
            <span className="mt-4 inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readMins} min read</span>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <img src={post.cover} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
          <div className="prose prose-neutral mt-8 max-w-none">
            {post.body.map((para, i) => (
              <p key={i} className="mb-5 text-base leading-relaxed text-foreground/85">{para}</p>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border bg-soft-band p-6 text-center">
            <h3 className="text-lg font-semibold">Have a skin or hair concern?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Book a consultation with Dr. Amit Jain.</p>
            <Button asChild className="mt-4 rounded-full"><Link to="/appointment">Book Appointment</Link></Button>
          </div>
        </div>
      </article>
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h3 className="mb-6 text-xl font-semibold tracking-tight">Related articles</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <BlogCard key={r.slug} post={r} />)}
        </div>
      </section>
    </SiteLayout>
  );
}