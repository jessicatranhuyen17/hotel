// Quiet Luxury layout notes:
// - Header stays sticky for conversion
// - Footer appears on every page

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ChatWidget from "@/components/ChatWidget";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="min-h-[70vh]">{children}</main>
      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
