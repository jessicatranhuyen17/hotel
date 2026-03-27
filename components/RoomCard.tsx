// Quiet Luxury component notes:
// - Card should feel like a boutique brochure: image + serif title + brass price

import type { Room } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BedDouble, Ruler } from "lucide-react";
import { Link } from "wouter";

export default function RoomCard({ room }: { room: Room }) {
  const { moneyFromUsd } = useCurrency();

  return (
    <Card className="overflow-hidden bg-card">
      <div className="relative">
        <img
          src={room.images[0]}
          alt={room.name}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
          From <span className="font-semibold text-[oklch(0.72_0.11_85)]">{moneyFromUsd(room.priceUsd)}</span> / night
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xl" style={{ fontFamily: "var(--font-serif)" }}>
              {room.name}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{room.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {room.highlights.slice(0, 3).map((h) => (
            <Badge key={h} variant="secondary" className="bg-secondary/70">
              {h}
            </Badge>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-foreground/70" />
            {room.capacity.adults}+{room.capacity.children}
          </div>
          <div className="flex items-center gap-2">
            <BedDouble className="size-4 text-foreground/70" />
            {room.beds}
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="size-4 text-foreground/70" />
            {room.sizeSqm}m²
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link href={`/rooms#${room.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View details
            </Button>
          </Link>
          <Link href={`/booking?room=${room.id}`} className="flex-1">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Book now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
