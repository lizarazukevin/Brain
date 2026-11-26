import { useRef } from "react";
import { TimelineCard } from "./TimelineCard";
import { OrbNode } from "./OrbNode";
import { useScrollEdges } from "./useScrollEdges";
import type { YearGroup } from "../timeline-data/timeline";

export type Position = "before" | "active" | "after";

/** Sections above the viewport fade out upward; below, they wait one step down. */
const POSITION_CLASS: Record<Position, string> = {
  before: "-translate-y-6 opacity-0",
  active: "translate-y-0 opacity-100",
  after: "translate-y-6 opacity-0",
};

type YearSectionProps = {
  group: YearGroup;
  index: number;
  position: Position;
  marker: string | null;
  isFirst: boolean;
  isLast: boolean;
};

function BlackHole() {
  return <span aria-hidden className="black-hole" />;
}

export function YearSection({ group, index, position, marker, isFirst, isLast }: YearSectionProps) {
  const isActive = position === "active";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const edges = useScrollEdges(scrollerRef);

  return (
    <section
      data-index={index}
      aria-label={String(group.year)}
      className="grid h-full snap-start snap-always grid-cols-[3.25rem_3rem_1fr]"
    >
      {/* First row of the year column matches the node rail height, so the columns align */}
      <div className="flex flex-col items-end pr-2">
        <span className="flex h-12 items-center text-lg font-bold text-gold/60">{group.year}</span>
        {marker && <span className="text-[10px] tracking-widest text-llama">{marker}</span>}
      </div>

      {/* Vertical trunk through the black hole; it starts/ends at the first/last hole */}
      <div className="relative">
        <span
          aria-hidden
          className="absolute left-1/2 w-px -translate-x-1/2 bg-llama/80"
          style={{ top: isFirst ? "1.5rem" : 0, bottom: isLast ? "calc(100% - 1.5rem)" : 0 }}
        />
        <div className="relative flex h-12 items-center justify-center">
          <BlackHole />
        </div>
      </div>

      {/* One scroll container holds nodes and cards, so they scroll together */}
      <div
        ref={scrollerRef}
        data-start={edges.start ? "" : undefined}
        data-end={edges.end ? "" : undefined}
        className="fade-x hide-scrollbar scroll-pl-12 snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
      >
        <ul className="relative flex h-full w-max min-w-full gap-5 px-5 pb-6">
          {/* Dashed rail behind the orbs. An <li> because <ul> may only contain <li>. */}
          <li
            aria-hidden
            role="presentation"
            className="pointer-events-none absolute inset-x-0 top-6 border-t border-dashed border-space-border/60"
          />

          {group.entries.map(({ item, continued }, i) => (
            <li
              key={item.id}
              className={`relative flex snap-start flex-col transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none ${POSITION_CLASS[position]}`}
              style={{ transitionDelay: isActive ? `${i * 80}ms` : "0ms" }}
            >
              <div className="flex h-12 shrink-0 items-center justify-center">
                <OrbNode color={item.glowColor} dim={continued} delay={i * 400} />
              </div>
              <TimelineCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
