// Quiet Luxury design notes:
// - Footer feels like letterpress: serif headline, small caps links
// - Always include conversion hooks (newsletter + book CTA)

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Camera, Video, Users, AtSign } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="aurum-grain border-t border-border/70 bg-card">
      <div className="aurum-container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="text-xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
              The Artisan Lakeview Hotel
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              A modern sanctuary of calm textures, exceptional service, and a booking experience built for speed.
            </p>
            <div className="text-sm">
              <div>88 Aurelia Avenue, Waterfront District</div>
              <div className="text-muted-foreground">Concierge: +1 (555) 012-9000 · hello@aurumhotel.example</div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-border bg-background p-2 text-muted-foreground hover:text-foreground">
                <Camera className="size-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-border bg-background p-2 text-muted-foreground hover:text-foreground">
                <Users className="size-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="rounded-full border border-border bg-background p-2 text-muted-foreground hover:text-foreground">
                <Video className="size-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border bg-background p-2 text-muted-foreground hover:text-foreground">
                <AtSign className="size-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Navigate</div>
            <div className="grid gap-2 text-sm">
              <Link href="/rooms" className="hover:underline">Rooms</Link>
              <Link href="/services" className="hover:underline">Services</Link>
              <Link href="/gallery" className="hover:underline">Gallery</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Policies</div>
            <div className="grid gap-2 text-sm">
              <Link href="/privacy" className="hover:underline">Privacy policy</Link>
              <Link href="/refund" className="hover:underline">Refund policy</Link>
              <Link href="/terms" className="hover:underline">Terms</Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Newsletter</div>
            <p className="text-sm text-muted-foreground">
              Get seasonal offers, member-only upgrades, and curated travel tips.
            </p>
            <div className="flex gap-2">
              <Input placeholder="you@example.com" type="email" className="bg-background" />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Join</Button>
            </div>
            <Separator />
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} The Artisan Lakeview Hotel. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
