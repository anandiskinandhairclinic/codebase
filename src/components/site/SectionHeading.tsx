import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-primary/25 bg-secondary/90 px-3.5 py-1 text-[11px] font-bold tracking-wide text-primary shadow-sm backdrop-blur">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3.5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl leading-tight">{title}</h2>
      {description && (
        <p className="mt-3 text-sm text-muted-foreground md:text-base leading-relaxed">{description}</p>
      )}
    </div>
  );
}