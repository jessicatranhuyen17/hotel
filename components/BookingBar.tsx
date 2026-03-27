// Quiet Luxury booking bar notes:
// - Default to speed: minimal fields, one primary CTA

import { useMemo, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { useLocation } from "wouter";

export type QuickBookingState = {
  checkIn?: Date;
  checkOut?: Date;
  guests: string;
};

export default function BookingBar({
  initial,
  compact,
}: {
  initial?: Partial<QuickBookingState>;
  compact?: boolean;
}) {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const [checkIn, setCheckIn] = useState<Date | undefined>(initial?.checkIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(initial?.checkOut);
  const [guests, setGuests] = useState<string>(initial?.guests ?? "2");

  const label = useMemo(() => {
    if (!checkIn || !checkOut) return "Select dates";
    return `${format(checkIn, "MMM d")} → ${format(checkOut, "MMM d")}`;
  }, [checkIn, checkOut]);

  function go() {
    const qs = new URLSearchParams();
    if (checkIn) qs.set("checkIn", checkIn.toISOString());
    if (checkOut) qs.set("checkOut", checkOut.toISOString());
    qs.set("guests", guests);
    setLocation(`/booking?${qs.toString()}`);
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-background/80 p-4 backdrop-blur",
        "shadow-[0_10px_40px_oklch(0.19_0.02_75_/0.12)]",
        compact ? "" : "md:p-5"
      )}
    >
      <div className={cn("grid gap-3", compact ? "sm:grid-cols-[1fr_0.7fr_auto]" : "md:grid-cols-[1fr_0.7fr_auto]")}> 
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start gap-2 bg-background">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span className={cn("truncate", !checkIn || !checkOut ? "text-muted-foreground" : "")}>{label}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <div className="grid gap-3">
              <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Check-in</div>
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(d) => {
                  setCheckIn(d);
                  if (d && checkOut && d >= checkOut) setCheckOut(addDays(d, 2));
                }}
                disabled={{ before: new Date() }}
              />
              <div className="aurum-hairline" />
              <div className="text-xs tracking-[0.26em] uppercase text-muted-foreground">Check-out</div>
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={{ before: checkIn ?? new Date() }}
              />
            </div>
          </PopoverContent>
        </Popover>

        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger className="bg-background">
            <Users className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Guests" />
          </SelectTrigger>
          <SelectContent>
            {["1", "2", "3", "4", "5", "6"].map((g) => (
              <SelectItem key={g} value={g}>
                {g} guest{g === "1" ? "" : "s"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={go} className="bg-primary text-primary-foreground hover:bg-primary/90">
          {t("checkAvailability")}
        </Button>
      </div>
    </div>
  );
}
