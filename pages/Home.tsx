import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingBar from "@/components/BookingBar";
import RoomCard from "@/components/RoomCard";
import { Section, SectionHeader } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BadgeCheck, MapPin, Sparkles, Star } from "lucide-react";
import { highlights, media, rooms, testimonials } from "@/lib/data";
import { Link } from "wouter";

import { usePageMeta } from "@/hooks/use-page-meta";

export default function Home() {
  usePageMeta({
    title: "The Artisan Lakeview Hotel — Luxury Stays",
    description: "Luxury rooms, spa rituals, and fast booking at The Artisan Lakeview Hotel.",
  });
  return (
    <div>
      {/* Hero */}
      <section className="relative aurum-grain">
        <div className="absolute inset-0">
          <img
            src={media.heroLobby}
            alt="The Artisan Lakeview Hotel lobby"
            className="h-[72vh] w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        </div>

        <div className="relative aurum-container pt-10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-xs backdrop-blur">
              <Sparkles className="size-4 text-[oklch(0.72_0.11_85)]" />
              <span className="text-muted-foreground">Quiet luxury in the heart of the waterfront district</span>
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl leading-[0.98]">
              Arrive softly.
              <br />
              Stay brilliantly.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
              Modern rooms, spa rituals, and a booking experience built for speed. Your best stay starts in under a minute.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/booking">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Book now</Button>
              </Link>
              <Link href="/rooms">
                <Button variant="outline">Explore rooms</Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="size-4 fill-[oklch(0.72_0.11_85)] text-[oklch(0.72_0.11_85)]" />
                4.9 average guest rating
              </div>
            </div>
          </motion.div>

          <div className="mt-10 max-w-4xl">
            <BookingBar />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <Section>
        <div className="aurum-container">
          <SectionHeader
            kicker="Why The Artisan Lakeview"
            title="Designed to feel effortless"
            description="Every touchpoint is intentional: fast booking, calm interiors, and service that anticipates without interruption."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <Card key={h.title} className="p-5 bg-card">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-8 items-center justify-center rounded-full bg-accent/15 text-[oklch(0.72_0.11_85)]">
                    <BadgeCheck className="size-4" />
                  </span>
                  <div>
                    <div className="font-semibold">{h.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{h.desc}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured rooms */}
      <Section className="bg-card">
        <div className="aurum-container">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              kicker="Suites & rooms"
              title="Choose your room style"
              description="From minimalist kings to panoramic suites — all engineered for sleep, light, and calm."
            />
            <Link href="/rooms">
              <Button variant="outline">View all rooms</Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {rooms.slice(0, 3).map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="aurum-container">
          <SectionHeader
            kicker="Guest stories"
            title="Loved for calm details"
            description="Small signals matter: quiet nights, warm textures, and confirmations that arrive instantly."
          />

          <div className="mt-10 relative">
            <Carousel opts={{ align: "start" }}>
              <CarouselContent>
                {testimonials.map((t) => (
                  <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full p-6 bg-card">
                      <div className="flex items-center gap-1 text-[oklch(0.72_0.11_85)]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-4 fill-[oklch(0.72_0.11_85)]" />
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">“{t.quote}”</p>
                      <div className="mt-5 text-sm">
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-muted-foreground">{t.meta}</div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </Section>

      {/* Location */}
      <Section className="bg-card">
        <div className="aurum-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <SectionHeader
                kicker="Location"
                title="On the waterfront — near everything"
                description="Walk to the design district, book a skyline table, or ask concierge for a hidden gallery opening."
              />
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent/15 text-[oklch(0.72_0.11_85)]">
                  <MapPin className="size-4" />
                </span>
                88 Aurelia Avenue, Waterfront District
              </div>
              <div className="mt-7 flex gap-3">
                <Link href="/contact">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Contact</Button>
                </Link>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                >
                  <Button variant="outline">Open in Google Maps</Button>
                </a>
              </div>
            </div>

            <Card className="overflow-hidden bg-background">
              <iframe
                title="The Artisan Lakeview Hotel Location"
                loading="lazy"
                className="h-[360px] w-full"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.927019083842!2d105.817272!3d21.012227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9d5b3e6d2d%3A0x1b5b6f6e5b6f6e5b!2sHotel!5e0!3m2!1sen!2s!4v1720000000000"
              />
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
