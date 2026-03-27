import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { convertUsd, formatMoney } from "@/lib/money";
import type { CurrencyCode } from "@/lib/money";

type CurrencyValue = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  moneyFromUsd: (usd: number) => string;
  rawFromUsd: (usd: number) => number;
};

const CurrencyContext = createContext<CurrencyValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem("aurum.currency");
    if (saved === "USD" || saved === "EUR" || saved === "VND") return saved;
    return "USD";
  });

  useEffect(() => {
    localStorage.setItem("aurum.currency", currency);
  }, [currency]);

  const value = useMemo<CurrencyValue>(
    () => ({
      currency,
      setCurrency,
      rawFromUsd: (usd) => convertUsd(usd, currency),
      moneyFromUsd: (usd) => formatMoney(convertUsd(usd, currency), currency),
    }),
    [currency]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const v = useContext(CurrencyContext);
  if (!v) throw new Error("useCurrency must be used inside CurrencyProvider");
  return v;
}
