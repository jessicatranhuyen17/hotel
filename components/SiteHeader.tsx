// Quiet Luxury design notes:
// - Glassy surfaces, warm off-white, hairline brass dividers
// - Typography: serif headings, clean sans body
// - Conversion first: always expose a primary CTA (Book)

import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Phone, Globe, Coins, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/I18nContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const navKeys = [
  { href: "/", key: "home" },
  { href: "/rooms", key: "rooms" },
  { href: "/services", key: "services" },
  { href: "/dining", key: "dining" },
  { href: "/gallery", key: "gallery" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

function isActive(current: string, href: string) {
  if (href === "/") return current === "/";
  return current.startsWith(href);
}

export default function SiteHeader() {
  const [location] = useLocation();
  const { t, lang, setLang } = useI18n();
  const { currency, setCurrency } = useCurrency();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 aurum-grain border-b border-border/70 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      <div className="aurum-container">
        <div className="flex h-16 items-center gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="group inline-flex items-baseline gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-card text-[11px] font-semibold tracking-[0.28em]">
                A
              </span>
              <span className="font-[600] tracking-tight">
                <span className="font-[700]" style={{ fontFamily: "var(--font-serif)" }}>
                  The Artisan
                </span>{" "}
                <span className="text-muted-foreground">Lakeview Hotel</span>
              </span>
            </Link>
            <span className="hidden md:inline-block text-xs text-muted-foreground">
              Luxury stays · Seamless booking
            </span>
          </div>

          <div className="ml-auto hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-5 text-sm">
              {navKeys.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-muted-foreground transition-colors hover:text-foreground",
                    isActive(location, item.href) && "text-foreground"
                  )}
                >
                  {t(item.key)}
                  {isActive(location, item.href) && (
                    <span className="absolute -bottom-2 left-0 right-0 h-px bg-[oklch(0.72_0.11_85)]" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link href="/account" className="hidden lg:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {user?.name}
                  </Link>
                  <Button variant="outline" onClick={() => logout()} className="hidden lg:inline-flex">
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="hidden lg:inline-flex">Log in</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="hidden lg:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">Create account</Button>
                  </Link>
                </>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label={t("language")}>
                    <Globe className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[{ v: "en", label: "English" }, { v: "vi", label: "Vietnamese" }, { v: "fr", label: "French" }].map((opt) => (
                    <DropdownMenuItem key={opt.v} onClick={() => setLang(opt.v as any)} className="flex items-center justify-between">
                      <span>{opt.label}</span>
                      {lang === opt.v && <Check className="size-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label={t("currency")}>
                    <Coins className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel>{t("currency")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {["USD", "EUR", "VND"].map((c) => (
                    <DropdownMenuItem key={c} onClick={() => setCurrency(c as any)} className="flex items-center justify-between">
                      <span>{c}</span>
                      {currency === c && <Check className="size-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" className="gap-2">
                <Phone className="size-4" />
                <span className="hidden xl:inline">+1 (555) 012-9000</span>
              </Button>
              <Link href="/booking">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("bookNow")}</Button>
              </Link>
            </div>
          </div>

          <div className="ml-auto flex lg:hidden items-center gap-2">
            <Link href="/booking">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("book")}</Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] bg-background">
                <SheetHeader>
                  <SheetTitle style={{ fontFamily: "var(--font-serif)" }}>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 grid gap-2">
                  {navKeys.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm hover:bg-accent/15">
                      {t(item.key)}
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <div className="grid gap-2">
                    {isAuthenticated ? (
                      <>
                        <Link href="/account" className="rounded-md px-3 py-2 text-sm hover:bg-accent/15">
                          Account
                        </Link>
                        <Button variant="outline" className="justify-start" onClick={() => logout()}>
                          Log out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="rounded-md px-3 py-2 text-sm hover:bg-accent/15">
                          Log in
                        </Link>
                        <Link href="/register" className="rounded-md px-3 py-2 text-sm hover:bg-accent/15">
                          Create account
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Button variant="outline" className="justify-start gap-2" onClick={() => setLang(lang === "en" ? "vi" : "en")}>
                      <Globe className="size-4" /> {t("language")}
                    </Button>
                    <Button variant="outline" className="justify-start gap-2" onClick={() => setCurrency(currency === "USD" ? "VND" : "USD")}>
                      <Coins className="size-4" /> {t("currency")}
                    </Button>
                    <Button variant="outline" className="justify-start gap-2">
                      <Phone className="size-4" /> Call concierge
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
