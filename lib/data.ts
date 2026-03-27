// Quiet Luxury data notes:
// - Keep content crisp, specific, and sales-oriented
// - Prices are base USD; currency conversion handled elsewhere

import heroLobby from "@/assets/photos/hero-lobby.webp";
import hotelExterior from "@/assets/photos/hotel-exterior.webp";
import roomStandard from "@/assets/photos/room-standard.webp";
import roomSuite from "@/assets/photos/room-suite.webp";
import spa from "@/assets/photos/service-spa.webp";
import restaurant from "@/assets/photos/service-restaurant.webp";
import gym from "@/assets/photos/service-gym.webp";
import transfer from "@/assets/photos/service-transfer.webp";

export const brand = {
  name: "The Artisan Lakeview Hotel",
  tagline: "Luxury stays · Seamless booking",
  phone: "+1 (555) 012-9000",
  email: "hello@aurumhotel.example",
  address: "88 Aurelia Avenue, Waterfront District",
};

export const media = {
  heroLobby,
  hotelExterior,
};

export type Room = {
  id: "standard" | "deluxe" | "suite" | "penthouse";
  name: string;
  priceUsd: number;
  capacity: { adults: number; children: number };
  sizeSqm: number;
  beds: string;
  highlights: string[];
  amenities: string[];
  images: string[];
  description: string;
};

export const rooms: Room[] = [
  {
    id: "standard",
    name: "Standard King",
    priceUsd: 180,
    capacity: { adults: 2, children: 1 },
    sizeSqm: 28,
    beds: "1 King",
    highlights: ["City view", "Rain shower", "Soundproofed"],
    amenities: [
      "High-speed Wi‑Fi",
      "55” 4K TV",
      "Nespresso machine",
      "Blackout curtains",
      "Premium linens",
    ],
    images: [roomStandard, heroLobby],
    description:
      "A refined, minimalist space designed for deep rest — with warm woods, soft lighting, and a perfectly quiet night.",
  },
  {
    id: "deluxe",
    name: "Deluxe Corner",
    priceUsd: 260,
    capacity: { adults: 2, children: 2 },
    sizeSqm: 38,
    beds: "1 King or 2 Twins",
    highlights: ["Corner windows", "Extra lounge area", "Brass details"],
    amenities: [
      "High-speed Wi‑Fi",
      "65” 4K TV",
      "Mini bar (curated)",
      "Larger workspace",
      "Turndown service",
    ],
    images: [heroLobby, roomStandard],
    description:
      "More light, more calm — a generous corner layout with space to lounge, work, and reset between city adventures.",
  },
  {
    id: "suite",
    name: "Signature Suite",
    priceUsd: 420,
    capacity: { adults: 3, children: 2 },
    sizeSqm: 56,
    beds: "1 King + sofa bed",
    highlights: ["Separate living room", "Panoramic skyline", "Deep soaking tub"],
    amenities: [
      "Butler-style refreshments",
      "Premium sound system",
      "Soaking tub",
      "Oversized wardrobe",
      "Late checkout on request",
    ],
    images: [roomSuite, heroLobby],
    description:
      "A true retreat with a living room to host, unwind, or stretch out — framed by skyline views and quiet luxury.",
  },
  {
    id: "penthouse",
    name: "Artisan Lakeview Penthouse",
    priceUsd: 890,
    capacity: { adults: 4, children: 2 },
    sizeSqm: 110,
    beds: "2 Kings",
    highlights: ["Private dining", "Terrace", "Concierge priority"],
    amenities: [
      "Private terrace",
      "Dining table for 6",
      "Dedicated concierge",
      "Premium bar setup",
      "Priority spa reservations",
    ],
    images: [hotelExterior, roomSuite, heroLobby],
    description:
      "Designed for arrivals that matter — a private floor experience with terrace light, dinner-ready space, and tailored service.",
  },
];

export type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    id: "spa",
    name: "Artisan Lakeview Spa",
    description:
      "Signature treatments, deep heat rituals, and skin-focused facials — delivered with calm precision.",
    image: spa,
    bullets: ["Couples suites", "Steam & sauna", "Therapist-led rituals"],
  },
  {
    id: "restaurant",
    name: "Fine Dining",
    description:
      "Seasonal tasting menus, local seafood, and a wine list built for slow evenings.",
    image: restaurant,
    bullets: ["Chef’s counter", "Vegetarian tasting", "Late-night room service"],
  },
  {
    id: "gym",
    name: "Fitness Studio",
    description:
      "Natural light, premium equipment, and a quiet space to train — open 24/7.",
    image: gym,
    bullets: ["Technogym cardio", "Free weights", "Yoga essentials"],
  },
  {
    id: "transfer",
    name: "Airport Transfer",
    description:
      "Arrive smoothly with private chauffeur service and real-time flight tracking.",
    image: transfer,
    bullets: ["VIP meet & greet", "Luxury sedans", "Fixed transparent pricing"],
  },
];

export const highlights = [
  { title: "Waterfront location", desc: "Steps from galleries, dining, and city views." },
  { title: "Fast booking", desc: "Reserve in under 60 seconds — mobile-first." },
  { title: "Concierge-led stays", desc: "Local access, thoughtful details, zero friction." },
  { title: "Member upgrades", desc: "Free late checkout & seasonal offers via newsletter." },
];

export const testimonials = [
  {
    name: "Mina R.",
    meta: "Stayed in Signature Suite",
    quote:
      "The room felt like a calm gallery. Booking was effortless, and the staff anticipated everything without being intrusive.",
  },
  {
    name: "Daniel K.",
    meta: "Business traveler",
    quote:
      "Quiet, fast Wi‑Fi, perfect sleep. The mobile check-in experience is the best I’ve used in any hotel.",
  },
  {
    name: "Sofia & Luca",
    meta: "Weekend getaway",
    quote:
      "Spa ritual + sunset dinner = flawless. We booked in a minute and got a confirmation instantly.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  minutes: number;
  tags: string[];
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "three-day-waterfront-itinerary",
    title: "A 3‑Day Waterfront Itinerary (No Rush, All Style)",
    excerpt:
      "Our favorite slow itinerary: sunrise coffee, gallery afternoons, and a dinner reservation worth dressing up for.",
    date: "2026-02-10",
    minutes: 6,
    tags: ["Travel tips", "City"],
    content:
      "## Day 1 — Arrive softly\n\nStart with a walk along the waterfront promenade...\n\n## Day 2 — Culture + calm\n\nBook a morning spa ritual, then spend the afternoon in the design district...\n\n## Day 3 — A final view\n\nLate checkout is our love language. Ask concierge for a skyline table...",
  },
  {
    slug: "spring-staycation-offer",
    title: "Spring Staycation: 15% Off + Late Checkout",
    excerpt:
      "For a limited season: save 15% on Deluxe and above, plus 2pm late checkout on request.",
    date: "2026-03-01",
    minutes: 3,
    tags: ["Promotions"],
    content:
      "Book Deluxe Corner, Signature Suite, or Penthouse for spring dates and enjoy 15% off. \n\n**How to claim:** book online and add note \"SPRING15\" in the special requests field.",
  },
];
