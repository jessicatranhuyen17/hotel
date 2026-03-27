import { Section, SectionHeader } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { brand, media } from "@/lib/data";

export default function Contact() {
  return (
    <div>
      <Section>
        <div className="aurum-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHeader
                kicker="Contact"
                title="Talk to concierge"
                description="Need airport pickup, a skyline table, or a room recommendation? We reply quickly."
              />

              <div className="mt-6 grid gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Phone:</span> {brand.phone}
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span> {brand.email}
                </div>
                <div>
                  <span className="text-muted-foreground">Address:</span> {brand.address}
                </div>
              </div>

              <Card className="mt-8 overflow-hidden bg-card">
                <iframe
                  title="Map"
                  loading="lazy"
                  className="h-[320px] w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.927019083842!2d105.817272!3d21.012227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9d5b3e6d2d%3A0x1b5b6f6e5b6f6e5b!2sHotel!5e0!3m2!1sen!2s!4v1720000000000"
                />
              </Card>
            </div>

            <Card className="overflow-hidden bg-card">
              <div className="relative">
                <img src={media.hotelExterior} alt="Hotel exterior" className="h-48 w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                  Send a message
                </div>
                <p className="mt-1 text-sm text-muted-foreground">We typically respond within the hour during the day.</p>

                <form
                  className="mt-5 grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Message sent (demo)");
                    (e.currentTarget as HTMLFormElement).reset();
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input placeholder="Full name" required />
                    <Input placeholder="Email" type="email" required />
                  </div>
                  <Input placeholder="Subject" required />
                  <Textarea placeholder="Tell us what you need…" rows={5} required />
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Send</Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
