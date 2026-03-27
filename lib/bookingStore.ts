import { nanoid } from "nanoid";

export type BookingRecord = {
  id: string;
  createdAt: string;
  roomId: string;
  checkInIso: string;
  checkOutIso: string;
  guests: number;
  currency: string;
  total: number;
  guest: {
    fullName: string;
    email: string;
    phone: string;
    requests?: string;
  };
  payment: {
    method: "card" | "paypal" | "local";
    status: "demo_confirmed";
  };
};

const KEY = "aurum.bookings.v1";

export function createBookingId() {
  return `AR-${nanoid(10).toUpperCase()}`;
}

export function saveBooking(b: BookingRecord) {
  const all = getBookings();
  all.unshift(b);
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 20)));
}

export function getBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as BookingRecord[];
  } catch {
    return [];
  }
}
