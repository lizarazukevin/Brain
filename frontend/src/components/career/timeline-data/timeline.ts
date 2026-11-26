import { yearOf } from "./dates";
import type { TimelineItem } from "./types";

export type YearEntry = { item: TimelineItem; continued: boolean };
export type YearGroup = { year: number; entries: YearEntry[] };

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export function groupByYear(items: readonly TimelineItem[]): YearGroup[] {
  const thisYear = new Date().getUTCFullYear();
  const sorted = [...items].sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate));
  const groups = new Map<number, YearEntry[]>();

  // Each item spans every year from its start to its end (or now if still open).
  for (const item of sorted) {
    const first = yearOf(item.startDate);
    const last = Math.max(first, item.endDate ? yearOf(item.endDate) : thisYear);
    for (let year = first; year <= last; year++) {
      const entries = groups.get(year) ?? [];
      entries.push({ item, continued: year > first });
      groups.set(year, entries);
    }
  }

  return [...groups].sort(([a], [b]) => b - a).map(([year, entries]) => ({ year, entries }));
}

export function computeStats(items: readonly TimelineItem[]) {
  const jobs = items.filter((i) => i.type === "experience");
  const count = (type: TimelineItem["type"]) => items.filter((i) => i.type === type).length;
  const earliest = Math.min(...jobs.map((j) => Date.parse(j.startDate)));

  return [
    { label: "Yrs Exp", value: jobs.length ? Math.floor((Date.now() - earliest) / YEAR_MS) : 0 },
    { label: "Roles", value: count("experience") },
    { label: "Projects", value: count("project") },
    { label: "Degrees", value: count("education") },
    { label: "Tech", value: new Set(items.flatMap((i) => i.skills.map((s) => s.id))).size },
  ];
}
