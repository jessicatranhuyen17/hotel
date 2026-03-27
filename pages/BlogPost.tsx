import { useMemo } from "react";
import { Link } from "wouter";
import { blogPosts } from "@/lib/data";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";
import { format } from "date-fns";

export default function BlogPost({ slug }: { slug: string }) {
  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  if (!post) {
    return (
      <Section>
        <div className="aurum-container">
          <Card className="p-8 bg-card">
            <div className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
              Article not found
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Try our latest posts instead.</p>
            <div className="mt-4">
              <Link href="/blog">
                <Button variant="outline">Back to Blog</Button>
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="aurum-container">
        <div className="max-w-3xl">
          <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
            ← Back to Blog
          </Link>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
            <span>·</span>
            <span>{post.minutes} min read</span>
          </div>
          <h1 className="mt-3 text-4xl leading-[1.05]">{post.title}</h1>
          <p className="mt-4 text-muted-foreground">{post.excerpt}</p>

          <Card className="mt-8 p-6 bg-card">
            <div className="prose prose-neutral max-w-none">
              <Streamdown>{post.content}</Streamdown>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
