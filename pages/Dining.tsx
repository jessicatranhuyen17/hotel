import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Section, SectionHeader } from "@/components/Section";
import restaurantPhoto from "@/assets/photos/service-restaurant.webp";
import { usePageMeta } from "@/hooks/use-page-meta";

const sections = [
  {
    title: "Lakeside breakfast",
    note: "07:00 – 10:30",
    items: [
      { name: "Artisan beef pho", desc: "12-hour broth, seasonal herbs", price: "85.000₫" },
      { name: "Egg banh mi", desc: "Cultured butter, herb sauce", price: "69.000₫" },
      { name: "Yogurt & granola", desc: "Wildflower honey, fresh fruit", price: "75.000₫" },
    ],
  },
  {
    title: "Lunch / dinner",
    note: "11:30 – 22:00",
    items: [
      { name: "Pan-seared fish, salted lime sauce", desc: "Roasted vegetables, mashed potatoes", price: "245.000₫" },
      { name: "Charcoal-grilled beef, green pepper sauce", desc: "Tender, lightly smoky", price: "320.000₫" },
      { name: "Wild mushroom pasta", desc: "Parmesan cream, truffle oil", price: "210.000₫" },
    ],
  },
  {
    title: "Craft drinks",
    note: "All day",
    items: [
      { name: "Licorice cold brew", desc: "Smooth, clean finish", price: "65.000₫" },
      { name: "Cold-brew lotus tea", desc: "Light lotus aroma, low sugar", price: "55.000₫" },
      { name: "Lake Breeze mocktail", desc: "Pineapple, lime, mint, soda", price: "85.000₫" },
    ],
  },
];

export default function Dining() {
  usePageMeta({ title: "Dining — The Artisan Lakeview Hotel", description: "Restaurant hours and menu." });

  return (
    <div>
      <Section>
        <div className="aurum-container">
          <SectionHeader
            kicker="Dining"
            title="Restaurant & menu"
            description="Seasonal menu built around local ingredients — crafted for calm mornings and memorable evenings."
          />

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={restaurantPhoto}
              alt="Dining at The Artisan Lakeview Hotel"
              className="h-[260px] w-full object-cover sm:h-[360px]"
              loading="lazy"
            />
          </div>

          <Separator className="my-10" />

          <div className="grid gap-6 md:grid-cols-3">
            {sections.map((s) => (
              <Card key={s.title} className="overflow-hidden bg-card">
                <CardHeader>
                  <CardTitle className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                    {s.title}
                  </CardTitle>
                  <CardDescription>{s.note}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {s.items.map((it) => (
                    <div key={it.name} className="space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-medium leading-snug">{it.name}</p>
                        <p className="shrink-0 text-sm text-muted-foreground">{it.price}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{it.desc}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
