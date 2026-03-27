// Quiet Luxury design notes:
// - Use to keep consistent vertical rhythm and section headers

import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("space-y-3", align === "center" && "mx-auto max-w-2xl text-center")}>
      {kicker && (
        <div className="text-xs tracking-[0.32em] uppercase text-muted-foreground">{kicker}</div>
      )}
      <h2 className="text-3xl sm:text-4xl leading-[1.1]">{title}</h2>
      {description && <p className="text-muted-foreground max-w-2xl">{description}</p>}
    </div>
  );
}
