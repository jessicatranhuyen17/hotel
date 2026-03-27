import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Section, SectionHeader } from "@/components/Section";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import restaurantPhoto from "@/assets/photos/service-restaurant.webp";

import phoImg from "@/assets/food/pho.jpg";
import banhMiImg from "@/assets/food/banh-mi.jpg";
import yogurtImg from "@/assets/food/yogurt-granola.jpg";
import steakImg from "@/assets/food/steak.jpg";
import pastaImg from "@/assets/food/mushroom-pasta.jpg";
import mocktailImg from "@/assets/food/mocktail.jpg";

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  image: string;
};

type MenuBlock = {
  title: string;
  hours: string;
  items: MenuItem[];
};

const menu: MenuBlock[] = [
  {
    title: "Lakeside breakfast",
    hours: "07:00 – 10:30",
    items: [
      { name: "Artisan beef pho", desc: "12-hour broth, seasonal herbs", price: "85.000₫", image: phoImg },
      { name: "Egg banh mi", desc: "Cultured butter, herb sauce", price: "69.000₫", image: banhMiImg },
      { name: "Yogurt & granola", desc: "Wildflower honey, fresh fruit", price: "75.000₫", image: yogurtImg },
    ],
  },
  {
    title: "Lunch / dinner",
    hours: "11:30 – 22:00",
    items: [
      { name: "Pan-seared fish, salted lime sauce", desc: "Roasted vegetables, mashed potatoes", price: "245.000₫", image: steakImg },
      { name: "Charcoal-grilled beef, green pepper sauce", desc: "Tender, lightly smoky", price: "320.000₫", image: steakImg },
      { name: "Wild mushroom pasta", desc: "Parmesan cream, truffle oil", price: "210.000₫", image: pastaImg },
    ],
  },
  {
    title: "Craft drinks",
    hours: "All day",
    items: [
      { name: "Licorice cold brew", desc: "Smooth, clean finish", price: "65.000₫", image: mocktailImg },
      { name: "Cold-brew lotus tea", desc: "Light lotus aroma, low sugar", price: "55.000₫", image: mocktailImg },
      { name: "Lake Breeze mocktail", desc: "Pineapple, lime, mint, soda", price: "85.000₫", image: mocktailImg },
    ],
  },
];

export default function DiningMenu() {
  usePageMeta({ title: "Dining — The Artisan Lakeview Hotel", description: "View the restaurant menu and opening hours." });

  return (
    <div>
      <Section>
        <div className="aurum-container">
          <SectionHeader
            kicker="Dining"
            title="Crafted flavors by the lake"
            description="Seasonal menu built around local ingredients — from easy breakfasts to satisfying dinners."
          />

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={restaurantPhoto}
              alt="Signature dishes at The Artisan Lakeview Hotel"
              className="h-[260px] w-full object-cover sm:h-[360px]"
              loading="lazy"
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {menu.map((block) => (
              <Card key={block.title} className="overflow-hidden bg-card">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                        {block.title}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{block.hours}</p>
                    </div>
                    <Badge variant="secondary" className="bg-secondary/70">
                      Menu
                    </Badge>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4">
                    {block.items.map((it) => (
                      <div key={it.name} className="grid gap-3 rounded-2xl border border-border/70 bg-background/40 p-3">
                        <div className="grid grid-cols-[84px_1fr] gap-3">
                          <div className="overflow-hidden rounded-xl border border-border bg-card">
                            <img src={it.image} alt={it.name} className="h-20 w-full object-cover" loading="lazy" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="font-medium leading-snug truncate">{it.name}</div>
                              <div className="shrink-0 text-sm text-muted-foreground">{it.price}</div>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{it.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/40 p-6 aurum-grain">
            <div className="min-w-[220px]">
              <div className="text-base" style={{ fontFamily: "var(--font-serif)" }}>
                Quick reservation
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Log in to save your details and special requests.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/contact">
                <Button>Contact the restaurant</Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
