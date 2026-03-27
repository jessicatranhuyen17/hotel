import { Section, SectionHeader } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Blog() {
  return (
    <div>
      <Section>
        <div className="aurum-container">
          <SectionHeader
            kicker="Blog"
            title="Travel tips & offers"
            description="SEO-friendly articles, local guides, and seasonal promotions — written for real travelers."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {blogPosts.map((p) => (
              <Card key={p.slug} className="p-6 bg-card">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{format(new Date(p.date), "MMM d, yyyy")}</span>
                  <span>·</span>
                  <span>{p.minutes} min read</span>
                </div>
                <div className="mt-3 text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                  {p.title}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4">
                  <Link href={`/blog/${p.slug}`}>
                    <Button variant="outline">Read article</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
