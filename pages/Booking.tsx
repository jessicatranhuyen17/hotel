import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { addDays, format, isValid } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Section, SectionHeader } from "@/components/Section";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { rooms } from "@/lib/data";
import { calcPrice } from "@/lib/pricing";
import { useCurrency } from "@/contexts/CurrencyContext";
import { createBookingId, saveBooking, type BookingRecord } from "@/lib/bookingStore";
import { sendConfirmationEmail } from "@/lib/email";

function useQuery() {
  // hash routing: /#/booking?x=1
  const raw = typeof window !== "undefined" ? window.location.hash : "";
  const idx = raw.indexOf("?");
  const qs = idx >= 0 ? raw.slice(idx + 1) : "";
  return new URLSearchParams(qs);
}

const guestSchema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a phone number"),
  requests: z.string().optional(),
});

type GuestForm = z.infer<typeof guestSchema>;

export default function Booking() {
  usePageMeta({ title: "Booking — The Artisan Lakeview Hotel", description: "Select dates, choose a room, and confirm your stay." });
  const [, setLocation] = useLocation();
  const { moneyFromUsd, rawFromUsd, currency } = useCurrency();
  const q = useQuery();

  const roomIdFromQuery = q.get("room") ?? "";
  const guestsFromQuery = q.get("guests") ?? "2";

  const parsedCheckIn = q.get("checkIn") ? new Date(q.get("checkIn") as string) : undefined;
  const parsedCheckOut = q.get("checkOut") ? new Date(q.get("checkOut") as string) : undefined;

  const [checkIn, setCheckIn] = useState<Date>(() => {
    if (parsedCheckIn && isValid(parsedCheckIn)) return parsedCheckIn;
    return addDays(new Date(), 7);
  });
  const [checkOut, setCheckOut] = useState<Date>(() => {
    if (parsedCheckOut && isValid(parsedCheckOut)) return parsedCheckOut;
    return addDays(new Date(), 9);
  });
  const [guests, setGuests] = useState<string>(guestsFromQuery);
  const [roomId, setRoomId] = useState<string>(roomIdFromQuery || rooms[0].id);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "local">("card");
  const [confirmed, setConfirmed] = useState<BookingRecord | null>(null);

  const room = useMemo(() => rooms.find((r) => r.id === roomId) ?? rooms[0], [roomId]);
  const price = useMemo(() => calcPrice({ room, checkIn, checkOut }), [room, checkIn, checkOut]);

  const form = useForm<GuestForm>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      requests: "",
    },
  });

  const canContinue = price.nights > 0;

  async function confirmBooking(values: GuestForm) {
    const id = createBookingId();
    const record: BookingRecord = {
      id,
      createdAt: new Date().toISOString(),
      roomId: room.id,
      checkInIso: checkIn.toISOString(),
      checkOutIso: checkOut.toISOString(),
      guests: Number(guests),
      currency,
      total: rawFromUsd(price.total),
      guest: values,
      payment: { method: paymentMethod, status: "demo_confirmed" },
    };

    saveBooking(record);
    setConfirmed(record);

    toast.success("Booking confirmed (demo)");

    const emailResult = await sendConfirmationEmail(record);
    if (emailResult.ok) {
      toast.success("Confirmation email sent");
    } else {
      toast.message("Email not sent", { description: emailResult.reason });
    }
  }

  if (confirmed) {
    return (
      <Section>
        <div className="aurum-container">
          <SectionHeader kicker="Confirmed" title="Your stay is reserved" description="A confirmation has been created for this demo booking." />

          <Card className="mt-8 p-6 bg-card">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-3">
                <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Confirmation</div>
                <div className="text-3xl" style={{ fontFamily: "var(--font-serif)" }}>{confirmed.id}</div>
                <p className="text-sm text-muted-foreground">
                  We’ve saved this to your browser (localStorage). In production, this would be stored securely on a server.
                </p>

                <Separator />
                <div className="grid gap-2 text-sm">
                  <div><span className="text-muted-foreground">Room:</span> {room.name}</div>
                  <div><span className="text-muted-foreground">Dates:</span> {format(new Date(confirmed.checkInIso), "MMM d, yyyy")} → {format(new Date(confirmed.checkOutIso), "MMM d, yyyy")}</div>
                  <div><span className="text-muted-foreground">Guests:</span> {confirmed.guests}</div>
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-background p-5">
                <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Total (demo)</div>
                <div className="mt-2 text-3xl font-semibold text-[oklch(0.72_0.11_85)]">{new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: currency === "VND" ? 0 : 2 }).format(confirmed.total)}</div>
                <div className="mt-2 text-sm text-muted-foreground">Payment method: {confirmed.payment.method.toUpperCase()}</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => { setConfirmed(null); setLocation("/booking"); }}>
                    Make another booking
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setLocation("/rooms")}>Explore rooms</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    );
  }

  return (
    <div>
      <Section>
        <div className="aurum-container">
          <SectionHeader
            kicker="Booking"
            title="Reserve your stay"
            description="Select dates, choose a room, confirm details, then proceed to payment (demo)."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Card className="p-6 bg-card">
              <Tabs defaultValue="dates">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dates">Dates</TabsTrigger>
                  <TabsTrigger value="room">Room</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="dates" className="mt-6 space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Check-in</div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="mt-2 w-full justify-start bg-background">
                            {format(checkIn, "MMM d, yyyy")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3" align="start">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={(d) => {
                              if (!d) return;
                              setCheckIn(d);
                              if (checkOut && d >= checkOut) setCheckOut(addDays(d, 2));
                            }}
                            disabled={{ before: new Date() }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Check-out</div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="mt-2 w-full justify-start bg-background">
                            {format(checkOut, "MMM d, yyyy")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={(d) => d && setCheckOut(d)}
                            disabled={{ before: checkIn }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Guests</div>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="mt-2 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["1", "2", "3", "4", "5", "6"].map((g) => (
                          <SelectItem key={g} value={g}>
                            {g} guest{g === "1" ? "" : "s"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => toast.success("Dates saved")}
                    disabled={!canContinue}
                  >
                    Continue
                  </Button>
                </TabsContent>

                <TabsContent value="room" className="mt-6 space-y-5">
                  <div>
                    <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Room type</div>
                    <Select value={roomId} onValueChange={setRoomId}>
                      <SelectTrigger className="mt-2 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.name} — from ${r.priceUsd}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
                    <img src={room.images[0]} alt={room.name} className="h-56 w-full object-cover" loading="lazy" />
                    <div className="p-4">
                      <div className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>{room.name}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{room.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {room.highlights.map((h) => (
                          <Badge key={h} variant="secondary" className="bg-secondary/70">{h}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => toast.success("Room selected")}>Continue</Button>
                </TabsContent>

                <TabsContent value="details" className="mt-6 space-y-6">
                  <div>
                    <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Payment method (demo)</div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <Button
                        type="button"
                        variant={paymentMethod === "card" ? "default" : "outline"}
                        className={paymentMethod === "card" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                        onClick={() => setPaymentMethod("card")}
                      >
                        Card
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === "paypal" ? "default" : "outline"}
                        className={paymentMethod === "paypal" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        PayPal
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === "local" ? "default" : "outline"}
                        className={paymentMethod === "local" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                        onClick={() => setPaymentMethod("local")}
                      >
                        Local
                      </Button>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      For production, connect Stripe Checkout / PayPal Checkout and redirect after payment success.
                    </p>
                  </div>

                  <Separator />

                  <form
                    className="grid gap-3"
                    onSubmit={form.handleSubmit(confirmBooking)}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Input placeholder="Full name" {...form.register("fullName")} />
                        {form.formState.errors.fullName && (
                          <div className="mt-1 text-xs text-destructive">{form.formState.errors.fullName.message}</div>
                        )}
                      </div>
                      <div>
                        <Input placeholder="Email" type="email" {...form.register("email")} />
                        {form.formState.errors.email && (
                          <div className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Input placeholder="Phone" {...form.register("phone")} />
                      {form.formState.errors.phone && (
                        <div className="mt-1 text-xs text-destructive">{form.formState.errors.phone.message}</div>
                      )}
                    </div>
                    <Textarea placeholder="Special requests (optional)" rows={4} {...form.register("requests")} />

                    <Button
                      type="submit"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={form.formState.isSubmitting}
                    >
                      Confirm booking
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>

            <div className="space-y-4">
              <Card className="p-6 bg-card">
                <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Summary</div>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Room</span>
                    <span className="text-right">{room.name}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Dates</span>
                    <span className="text-right">{format(checkIn, "MMM d")} → {format(checkOut, "MMM d")}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="text-right">{guests}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Base ({price.nights} nights)</span>
                    <span>{moneyFromUsd(price.base)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>{moneyFromUsd(price.taxes)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span>{moneyFromUsd(price.serviceFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-[oklch(0.72_0.11_85)]">{moneyFromUsd(price.total)}</span>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-border/70 bg-background p-4 text-xs text-muted-foreground">
                  Demo note: No real payment is processed on this static site. Connect Stripe/PayPal for production.
                </div>
              </Card>

              <Card className="p-6 bg-card">
                <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Need help?</div>
                <p className="mt-2 text-sm text-muted-foreground">Concierge can arrange airport transfer and special requests.</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" onClick={() => toast.message("Call concierge", { description: "+1 (555) 012-9000" })}>
                    Call
                  </Button>
                  <Button variant="outline" onClick={() => toast.message("Email concierge", { description: "hello@aurumhotel.example" })}>
                    Email
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
