import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "vi" | "fr";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  en: {
    home: "Home",
    dining: "Dining",
    rooms: "Rooms",
    services: "Services",
    diningLabel: "Restaurant",
    restaurant: "Restaurant",
    gallery: "Gallery",
    blog: "Blog",
    contact: "Contact",
    bookNow: "Book now",
    book: "Book",
    checkAvailability: "Check availability",
    language: "Language",
    currency: "Currency",
  },
  vi: {
    home: "Home",
    rooms: "Rooms",
    services: "Services",
    dining: "Dining",
    gallery: "Gallery",
    blog: "Blog",
    contact: "Contact",
    bookNow: "Book now",
    book: "Book",
    checkAvailability: "Check availability",
    language: "Language",
    currency: "Currency",
  },
  fr: {
    home: "Home",
    rooms: "Rooms",
    services: "Services",
    gallery: "Gallery",
    blog: "Blog",
    contact: "Contact",
    bookNow: "Book now",
    book: "Book",
    checkAvailability: "Check availability",
    language: "Language",
    currency: "Currency",
  },
};

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("aurum.lang");
    if (saved === "en" || saved === "vi" || saved === "fr") return saved;
    return "en";
  });

  // Force English UI
  useEffect(() => {
    if (lang !== "en") setLang("en");
  }, []);

  useEffect(() => {
    localStorage.setItem("aurum.lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key,
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const v = useContext(I18nContext);
  if (!v) throw new Error("useI18n must be used inside I18nProvider");
  return v;
}
