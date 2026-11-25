type CareerHeaderProps = { stats: { label: string; value: number }[] };

export function CareerHeader({ stats }: CareerHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs text-gold opacity-80">// SYSTEM.LOG</p>
        <h1 className="text-3xl font-bold tracking-tight text-offwhite sm:text-4xl">
          Career Graph
        </h1>
      </div>

      <dl className="flex flex-wrap gap-x-6 gap-y-2">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-[10px] uppercase tracking-wider text-gold/60 font-bold">{label}</dt>
            <dd className="text-xl font-bold text-llama">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
