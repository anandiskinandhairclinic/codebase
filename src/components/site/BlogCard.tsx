import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-primary/10 bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary shadow-xs backdrop-blur-xs">
          {post.category}
        </span>
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <BookOpen className="h-3 w-3 text-primary/75" />
          <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          <span>·</span>
          <span>{post.readMins} min read</span>
        </div>
        
        <h3 className="mt-3.5 text-lg font-extrabold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary leading-snug">
          {post.title}
        </h3>
        
        <p className="mt-2.5 text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/40">
          <span className="text-xs font-bold text-primary transition-all duration-300">
            Read Full Article
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-white shadow-3xs">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}