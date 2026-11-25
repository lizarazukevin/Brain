import { useEffect, useRef, useState } from "react";
import type { TimelineFilter } from "../timeline-data/types";

const FILTERS: TimelineFilter[] = ["all", "experience", "project", "education"];

type TimelineFiltersProps = {
  active: TimelineFilter;
  counts: Record<TimelineFilter, number>;
  onChange: (filter: TimelineFilter) => void;
};

export function TimelineFilters({ active, counts, onChange }: TimelineFiltersProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Registers event listeners only when the filter is opened
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative text-xs">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-sm border border-space-border/50 px-3 py-1.5 text-gold/70 transition-colors hover:border-llama hover:text-llama"
      >
        <span className="text-gold/50">filter</span>
        <span className="text-llama">{active}</span>
        <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-md border border-space-border bg-space-dark/95 py-1 backdrop-blur-md"
        >
          {FILTERS.map((value) => (
            <li key={value} role="option" aria-selected={active === value}>
              <button
                onClick={() => {
                  onChange(value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-left transition-colors hover:bg-llama/10 ${
                  active === value ? "text-llama" : "text-gold/70"
                }`}
              >
                <span>{value}</span>
                <span className="opacity-60">{counts[value]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
