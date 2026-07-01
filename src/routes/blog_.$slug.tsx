import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar, User, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { getBlogPostBySlug, productImage } from "@/lib/firebaseDataAdapter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog_/$slug")({
  component: BlogDetail,
  notFoundComponent: () => <div className="p-20 text-center">Post not found.</div>,
});

function BlogDetail() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogPostBySlug(slug).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <main className="pb-24 flex items-center justify-center min-h-[60vh] bg-[#fdfaf6]">
        <div className="text-primary font-display text-2xl animate-pulse">Loading article...</div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="pb-24 bg-[#fdfaf6] min-h-[60vh] flex flex-col justify-center items-center">
        <p className="text-lg text-muted-foreground mb-4">Article not found.</p>
        <Link to="/blog">
          <Button className="rounded-full bg-primary hover:bg-primary/95 text-white">Back to Journal</Button>
        </Link>
      </main>
    );
  }

  const blogImg = post.imageUrl || productImage;

  return (
    <main className="pb-24 bg-[#fdfaf6] min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="mx-auto max-w-4xl px-5 pt-10">
        <Link to="/blog" className="text-sm text-[#8a7560] inline-flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="size-4" /> Back to journal
        </Link>
      </div>

      <article className="mx-auto max-w-3xl px-5 mt-8 space-y-8">
        {/* Title and Metadata */}
        <div className="space-y-4">
          <span className="chip bg-primary/10 text-primary border-primary/20">
            {post.category || "Dermatology"}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-[#5c4a37]">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-3.5" />
              <span>{post.read || "5 min"} read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="size-3.5" />
              <span>By Dr. Vishakha Patil</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[2rem] overflow-hidden aspect-[16/9] shadow-soft border border-[#ecdcc9]/40 bg-muted">
          <img src={blogImg} alt={post.title} className="size-full object-cover" />
        </div>

        {/* Blog Post Content */}
        <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-[#5c4a37] text-muted-foreground leading-relaxed space-y-6 pt-4 text-base">
          {post.content ? (
            post.content.split("\n\n").map((para: string, idx: number) => {
              if (para.trim().startsWith("###")) {
                return <h3 key={idx} className="font-display text-2xl text-[#5c4a37] pt-4">{para.replace("###", "").trim()}</h3>;
              }
              if (para.trim().startsWith("##")) {
                return <h2 key={idx} className="font-display text-3xl text-[#5c4a37] pt-6">{para.replace("##", "").trim()}</h2>;
              }
              return <p key={idx}>{para}</p>;
            })
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>

        {/* CTA Footer inside Article */}
        <div className="mt-12 p-8 bg-[#faf6f0] border border-[#ecdcc9]/50 rounded-3xl text-center space-y-4">
          <Sparkles className="size-6 text-primary mx-auto animate-pulse" />
          <h3 className="font-display text-2xl text-[#5c4a37]">Interested in personal skin guidance?</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Book an clinical consultation with Dr. Vishakha Patil at our Pune clinic to receive an evidence-based custom skincare route.
          </p>
          <div className="pt-2">
            <Link to="/appointment">
              <Button className="rounded-full bg-primary hover:bg-primary/95 text-white px-8">Book Consultation</Button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
