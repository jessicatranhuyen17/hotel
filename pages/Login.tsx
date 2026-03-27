import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Section, SectionHeader } from "@/components/Section";
import { useAuth } from "@/contexts/AuthContext";
import { usePageMeta } from "@/hooks/use-page-meta";
import { toast } from "sonner";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Login() {
  usePageMeta({ title: "Login — The Artisan Lakeview Hotel", description: "Sign in to manage your account." });

  const { login } = useAuth();
  const [, navigate] = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Logged in successfully");
      navigate("/account");
    } catch (err: any) {
      toast.error(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Section>
        <div className="aurum-container">
          <SectionHeader kicker="Account" title="Log in" description="Use your email and password." />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="bg-card">
              <div className="p-6">
                <form className="grid gap-4" onSubmit={onSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {loading ? "Signing in..." : "Log in"}
                  </Button>
                </form>

                <Separator className="my-6" />

                <p className="text-sm text-muted-foreground">
                  No account yet? <Link className="underline" href="/register">Create account</Link>
                </p>
              </div>
            </Card>

            <Card className="bg-card/40 aurum-grain">
              <div className="p-6">
                <div className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                  Note
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  This is a local-first demo: account data is stored in your browser (localStorage). No backend is connected.
                </p>
                <div className="mt-5">
                  <Link href="/dining">
                    <Button variant="outline">View Dining</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
