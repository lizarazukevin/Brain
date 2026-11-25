import { useRef } from "react";
import { YearSection } from "./YearSection";
import { useActiveSection } from "./useActiveSection";
import type { YearGroup } from "../timeline-data/timeline";

export function CareerTimeline({ years }: { years: YearGroup[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeIndex = useActiveSection(scrollRef, years.length);

  const yearNumbers = years.map((g) => g.year);
  const newest = Math.max(...yearNumbers);
  const oldest = Math.min(...yearNumbers);

  const markerFor = (year: number) => {
    if (year === newest) return year === new Date().getFullYear() ? "NOW" : "LATEST";
    return year === oldest ? "ORIGIN" : null;
  };

  return (
    <div
      ref={scrollRef}
      className="min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto hide-scrollbar"
    >
      {years.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-gold/50">
          No records found for this filter.
        </div>
      ) : (
        years.map((group, index) => (
          <YearSection
            key={group.year}
            group={group}
            index={index}
            position={index < activeIndex ? "before" : index > activeIndex ? "after" : "active"}
            marker={markerFor(group.year)}
            isFirst={index === 0}
            isLast={index === years.length - 1}
          />
        ))
      )}
    </div>
  );
}
