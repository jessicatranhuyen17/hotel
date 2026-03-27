import { Section, SectionHeader } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { media } from "@/lib/data";

export default function About() {
  return (
    <div>
      <Section>
        <div className="aurum-container">
          <SectionHeader
            kicker="About"
            title="A modern sanctuary, built with intention"
            description="The Artisan Lakeview was designed for guests who value quiet details — the kind you feel more than you notice."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="space-y-5 text-sm text-muted-foreground">
              <p>
                The Artisan Lakeview Hotel began as an idea: create a luxury stay that feels calm, fast, and genuinely human.
                No friction, no noise — just thoughtful design, exceptional sleep, and service that reads the room.
              </p>
              <p>
                We built our booking flow to be as intentional as our rooms. Dates, guests, room choice — then a
                confirmation that arrives instantly.
              </p>

              <Card className="p-6 bg-card">
                <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Mission</div>
                <div className="mt-2 text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                  Make luxury feel effortless.
                </div>
                <p className="mt-2">
                  Deliver calm spaces and fast, confident booking — so guests can focus on the stay, not the process.
                </p>
              </Card>

              <Card className="p-6 bg-card">
                <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Vision</div>
                <div className="mt-2 text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                  Set a new standard for quiet hospitality.
                </div>
                <p className="mt-2">
                  Use design and technology responsibly to remove friction while keeping the experience personal.
                </p>
              </Card>
            </div>

            <div className="grid gap-4">
              <Card className="overflow-hidden bg-card">
                <img src={media.hotelExterior} alt="Hotel exterior" className="h-72 w-full object-cover" loading="lazy" />
              </Card>
              <Card className="overflow-hidden bg-card">
                <img src={media.heroLobby} alt="Lobby" className="h-72 w-full object-cover" loading="lazy" />
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
