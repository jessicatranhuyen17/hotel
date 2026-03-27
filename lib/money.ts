export type CurrencyCode = "USD" | "EUR" | "VND";

export const currencySymbols: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  VND: "₫",
};

// Static demo rates (update from a real FX API in production)
export const fxFromUsd: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  VND: 25000,
};

export function convertUsd(amountUsd: number, currency: CurrencyCode) {
  return amountUsd * fxFromUsd[currency];
}

export function formatMoney(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(amount);
}
