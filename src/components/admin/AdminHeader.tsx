export function AdminHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-brass/15 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-saffron/85">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-display text-3xl font-light text-cream md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl font-body text-sm text-cream/55">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="glass rounded-2xl p-5 brass-edge">
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-cream/55">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl text-cream">
        <span className="text-saffron-gradient">{value}</span>
      </p>
      {hint && (
        <p className="mt-1 font-mono text-[11px] text-cream/45">{hint}</p>
      )}
    </div>
  );
}
