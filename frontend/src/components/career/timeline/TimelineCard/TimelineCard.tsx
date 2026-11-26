import type { CSSProperties } from "react";
import { formatNumericRange } from "../../timeline-data/dates";
import type { TimelineItem } from "../../timeline-data/types";
import { LogoMark } from "./LogoMark";
import { TypePill } from "./TypePill";

function CardHeading({ item }: { item: TimelineItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <LogoMark src={item.logoUrl} name={item.subtitle} />

      <div className="min-w-0 flex-1">
        <h3
          title={item.title}
          className="truncate text-[1.4rem] leading-tight font-extrabold tracking-[-0.045em] text-white"
        >
          {item.title}
        </h3>
        <span aria-hidden className="mt-2 block h-0.75 w-9 rounded-full bg-(--aura)" />
      </div>
    </div>
  );
}

/** 2 columns x 2 rows: company + pill, location + date range. */
function CardMeta({ item }: { item: TimelineItem }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2">
      <p title={item.subtitle} className="truncate text-base font-bold text-gold">
        {item.subtitle}
      </p>
      <div className="justify-self-end">
        <TypePill item={item} />
      </div>

      <p title={item.location} className="truncate text-sm text-gold/60">
        {item.location}
      </p>
      <p className="justify-self-end text-sm whitespace-nowrap text-gold/70">
        {formatNumericRange(item.startDate, item.endDate)}
      </p>
    </div>
  );
}

export function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <article
      className="relative flex w-90 shrink-0 flex-col gap-4 overflow-hidden rounded-xl border border-aura bg-space-dark/90 p-4 backdrop-blur-md transition-shadow duration-300 hover:shadow-aura"
      style={{ "--aura": item.glowColor } as CSSProperties}
    >
      {/* Light bar on the left edge, always visible */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-0.75 rounded-l-xl bg-(--aura)" />

      <CardHeading item={item} />
      <CardMeta item={item} />
    </article>
  );
}
