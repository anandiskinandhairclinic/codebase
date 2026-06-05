import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { BlogCard } from "@/components/site/BlogCard";
import { getBlogs } from "@/lib/firebaseServices";
import { blogs as fallbackBlogs } from "@/lib/data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Dr Jain's Skin Care Clinic" },
      { name: "description", content: "Expert articles on skin care, hair loss, PRP, pigmentation, chemical peels and more from Dr. Amit Jain." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [blogsList, setBlogsList] = useState(fallbackBlogs);

  useEffect(() => {
    getBlogs().then(setBlogsList);
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Insights"
        title={<>Dermatologist-written <span className="text-gradient">articles</span></>}
        description="Trusted, no-nonsense advice on skin and hair from Dr. Amit Jain."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogsList.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      </section>
    </SiteLayout>
  );
}