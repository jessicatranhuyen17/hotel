// Quiet Luxury chat widget notes:
// - Should feel like a concierge note, not a generic chatbot

import { useMemo, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Msg = { role: "guest" | "concierge"; text: string };

const presets = [
  "Airport transfer",
  "Late checkout",
  "Best room for couples",
  "Spa reservation",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "concierge",
      text: "Welcome to The Artisan Lakeview Hotel. I’m your concierge — how can I help with your stay today?",
    },
  ]);

  const conciergeReply = useMemo(() => {
    const lower = text.toLowerCase();
    if (lower.includes("airport")) return "Absolutely. We can arrange a private sedan pickup — would you like VIP meet & greet?";
    if (lower.includes("late")) return "Late checkout is often possible. What’s your departure time?";
    if (lower.includes("spa")) return "Our signature is the deep-heat ritual. Which day are you checking in?";
    if (lower.includes("suite") || lower.includes("couple")) return "For couples, Signature Suite is our favorite: separate lounge + skyline views.";
    return "Noted. Share your dates and preferences, and I’ll suggest the best option.";
  }, [text]);

  function send() {
    if (!text.trim()) return;
    const next: Msg[] = [...msgs, { role: "guest", text: text.trim() }, { role: "concierge", text: conciergeReply }];
    setMsgs(next);
    setText("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <Card className="mb-3 w-[340px] max-w-[90vw] overflow-hidden bg-card shadow-[0_20px_80px_oklch(0.19_0.02_75_/0.22)]">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
            <div className="text-sm" style={{ fontFamily: "var(--font-serif)" }}>
              Concierge
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>

          <div className="max-h-[340px] space-y-3 overflow-auto p-4">
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <Button
                  key={p}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setText(p)}
                >
                  {p}
                </Button>
              ))}
            </div>

            {msgs.map((m, idx) => (
              <div
                key={idx}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                  m.role === "guest"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-background text-foreground border border-border/70"
                )}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="border-t border-border/70 p-3">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask concierge…" className="bg-background" />
              <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90" aria-label="Send">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}

      <Button
        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
        size="lg"
        onClick={() => setOpen((v) => !v)}
      >
        <MessageCircle className="mr-2 size-5" />
        {open ? "Hide" : "Chat"}
      </Button>
    </div>
  );
}
