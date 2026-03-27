import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/Section";
import { useAuth } from "@/contexts/AuthContext";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link, useLocation } from "wouter";

export default function Account() {
  usePageMeta({ title: "Account — The Artisan Lakeview Hotel", description: "Manage your account." });

  const { user, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div>
      <Section>
        <div className="aurum-container">
          <SectionHeader kicker="Account" title="Account" description="Account details (localStorage demo)." />

          {!isAuthenticated ? (
            <Card className="mt-10 bg-card">
              <div className="p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                    You are not signed in
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Sign in to save your details and make next time faster.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/login">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Log in</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline">Create account</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="mt-10 bg-card">
              <div className="p-6 grid gap-4">
                <div>
                  <div className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                    {user?.name}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/dining">
                    <Button variant="outline">View Dining</Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Section>
    </div>
  );
}
