import { differenceInCalendarDays, isValid } from "date-fns";
import type { Room } from "@/lib/data";

export type PriceBreakdown = {
  nights: number;
  base: number;
  taxes: number;
  serviceFee: number;
  total: number;
};

export function calcPrice({
  room,
  checkIn,
  checkOut,
}: {
  room: Room;
  checkIn: Date;
  checkOut: Date;
}): PriceBreakdown {
  if (!isValid(checkIn) || !isValid(checkOut)) {
    return { nights: 0, base: 0, taxes: 0, serviceFee: 0, total: 0 };
  }

  const nights = Math.max(1, differenceInCalendarDays(checkOut, checkIn));
  const base = nights * room.priceUsd;
  const taxes = base * 0.1;
  const serviceFee = base * 0.05;
  const total = base + taxes + serviceFee;
  return { nights, base, taxes, serviceFee, total };
}
