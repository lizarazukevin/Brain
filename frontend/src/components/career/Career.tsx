import { useMemo, useState } from "react";
import { Terminal } from "#/components/terminal";
import { CareerHeader } from "./header/CareerHeader";
import { CareerTimeline } from "./timeline/CareerTimeline";
import { FlowToggle } from "./controls/FlowToggle";
import { TimelineFilters } from "./controls/TimelineFilters";
import { computeStats, groupByYear } from "./timeline-data/timeline";
import { useTimelineItems } from "./timeline-data/useTimelineItems";
import type { TimelineFilter } from "./timeline-data/types";

export function Career() {
  const items = useTimelineItems();
  const [filter, setFilter] = useState<TimelineFilter>("all");
  const [newestFirst, setNewestFirst] = useState(true);

  const stats = useMemo(() => computeStats(items), [items]);

  const filter_counts = useMemo(() => {
    const c: Record<TimelineFilter, number> = {
      all: items.length,
      experience: 0,
      project: 0,
      education: 0,
    };
    for (const item of items) c[item.type]++;
    return c;
  }, [items]);

  const years = useMemo(() => {
    const visible = filter === "all" ? items : items.filter((i) => i.type === filter);
    const groups = groupByYear(visible);
    return newestFirst ? groups : groups.reverse();
  }, [items, filter, newestFirst]);

  return (
    <Terminal fill>
      <div className="flex min-h-0 flex-1 flex-col font-mono">
        <div className="mb-4 shrink-0 border-b border-space-border/60 pb-4">
          <CareerHeader stats={stats} />
        </div>

        <div className="mb-3 flex shrink-0 items-center justify-end gap-2">
          <FlowToggle newestFirst={newestFirst} onToggle={() => setNewestFirst((v) => !v)} />
          <TimelineFilters active={filter} counts={filter_counts} onChange={setFilter} />
        </div>

        <CareerTimeline key={`${filter}-${newestFirst}`} years={years} />
      </div>
    </Terminal>
  );
}
