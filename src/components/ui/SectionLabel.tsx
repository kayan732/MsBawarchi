import { cn } from "@/lib/utils";

export function SectionLabel({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-saffron/85",
        className,
      )}
    >
      <span>{number}</span>
      <span className="h-px w-10 bg-saffron/40" />
      <span>{label}</span>
    </div>
  );
}
