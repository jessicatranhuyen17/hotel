// Design note (North-Star): Artisan Lakeview = handcrafted, refined, lakeside; slightly offset layout, generous negative space, hairline borders.

import type { PropsWithChildren } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems: Array<{ label: string; href: string; kind?: "route" | "section" }>= [
  { label: "Rooms", href: "/rooms", kind: "section" },
  { label: "Dining", href: "/dining", kind: "route" },
  { label: "Amenities", href: "/services", kind: "section" },
  { label: "Contact", href: "/contact", kind: "section" },
];

export default function SiteLayout({ children }: PropsWithChildren) {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="group inline-flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight">The Artisan</span>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Lakeview Hotel</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = item.kind === "route" && location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                    active && "bg-accent text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link href="/account" className="hidden sm:inline-flex rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  Hi, {user?.name?.split(" ").slice(-1)[0]}
                </Link>
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex"
                  onClick={() => logout()}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="hidden sm:inline-flex">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button className="hidden sm:inline-flex">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} The Artisan Lakeview Hotel</p>
            <p>Lakeside address • Hotline: 0900 000 000 • Email: hello@artisanlakeview.example</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
