import { Section, SectionHeader } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { media, rooms, services } from "@/lib/data";

export default function Gallery() {
  const images = [
    media.heroLobby,
    media.hotelExterior,
    ...rooms.flatMap((r) => r.images.slice(0, 1)),
    ...services.map((s) => s.image),
  ];

  return (
    <div>
      <Section>
        <div className="aurum-container">
          <SectionHeader
            kicker="Gallery"
            title="The Artisan Lakeview in frames"
            description="A quick look at the textures, light, and calm moments across the property."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, idx) => (
              <Card key={idx} className="overflow-hidden bg-card">
                <img src={img} alt={`Gallery ${idx + 1}`} className="h-64 w-full object-cover" loading="lazy" />
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
