import { getTypePill } from "../../timeline-data/types";
import type { TimelineItem } from "../../timeline-data/types";

/** Employment/type chip, e.g. "Full-Time". Colors come from the ancestor's `--aura`. */
export function TypePill({ item }: { item: TimelineItem }) {
  return (
    <span className="block rounded-sm border border-aura bg-aura-tint px-2 py-1 text-xs leading-none font-bold tracking-widest text-(--aura) uppercase">
      {getTypePill(item).title}
    </span>
  );
}
