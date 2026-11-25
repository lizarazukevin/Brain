import type { TimelineItem } from "./types";

// Entry on a timeline, continued determines it's node's glow, brightest the first year it shows
export type YearEntry = { item: TimelineItem; continued: boolean };
export type YearGroup = { year: number; entries: YearEntry[] };

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

// Dates are "YYYY-MM-DD", which JS parses as UTC. Reading them in local time
// would shift Jan 1 to Dec 31 of the prior year for US timezones, so everything is UTC.
const yearOf = (date: string) => new Date(date).getUTCFullYear();

const monthYear = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export const formatRange = (start: string, end: string | null) =>
  `${monthYear(start)} – ${end ? monthYear(end) : "Present"}`;

export function groupByYear(items: readonly TimelineItem[]): YearGroup[] {
  const thisYear = new Date().getUTCFullYear();
  const sorted = [...items].sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate));
  const groups = new Map<number, YearEntry[]>();

  /* Per item gets the first and last year, and spans the items through years of activity */
  for (const item of sorted) {
    const first = yearOf(item.startDate);
    const last = Math.max(first, item.endDate ? yearOf(item.endDate) : thisYear);
    for (let year = first; year <= last; year++) {
      groups.set(year, [...(groups.get(year) ?? []), { item, continued: year > first }]);
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
