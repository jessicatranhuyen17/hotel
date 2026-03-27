// Demo email confirmation.
// To enable real email sending without a backend, you can connect EmailJS.
// Set env vars in .env:
// - VITE_EMAILJS_SERVICE_ID
// - VITE_EMAILJS_TEMPLATE_ID
// - VITE_EMAILJS_PUBLIC_KEY

import type { BookingRecord } from "@/lib/bookingStore";

export async function sendConfirmationEmail(booking: BookingRecord) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

  if (!serviceId || !templateId || !publicKey) {
    return { ok: false, reason: "Email not configured" } as const;
  }

  // EmailJS REST API
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        booking_id: booking.id,
        full_name: booking.guest.fullName,
        email: booking.guest.email,
        room_id: booking.roomId,
        check_in: booking.checkInIso,
        check_out: booking.checkOutIso,
        guests: booking.guests,
        total: booking.total,
        currency: booking.currency,
      },
    }),
  });

  if (!res.ok) {
    return { ok: false, reason: `EmailJS error (${res.status})` } as const;
  }

  return { ok: true } as const;
}
