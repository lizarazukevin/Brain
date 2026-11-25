type FlowToggleProps = { newestFirst: boolean; onToggle: () => void };

export function FlowToggle({ newestFirst, onToggle }: FlowToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={
        newestFirst
          ? "Showing newest first. Switch to oldest first"
          : "Showing oldest first. Switch to newest first"
      }
      className="flex items-center gap-2 rounded-sm border border-space-border/50 px-3 py-1.5 text-xs text-gold/70 transition-colors hover:border-llama hover:text-llama"
    >
      <span
        aria-hidden
        className={`inline-block transition-transform duration-300 ${newestFirst ? "" : "rotate-180"}`}
      >
        ↓
      </span>
      {newestFirst ? "now → origin" : "origin → now"}
    </button>
  );
}
