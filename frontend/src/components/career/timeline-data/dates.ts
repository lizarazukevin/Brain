/**
 * Timeline dates are "YYYY-MM-DD", which JS parses as UTC. Every formatter here
 * pins timeZone to UTC, otherwise US timezones shift 1 Jan to 31 Dec.
 */
const shortMonthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const numericMonthYear = new Intl.DateTimeFormat("en-US", {
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export const yearOf = (date: string) => new Date(date).getUTCFullYear();

function rangeFormatter(format: Intl.DateTimeFormat, presentLabel: string) {
  return (start: string, end: string | null) =>
    `${format.format(new Date(start))} – ${end ? format.format(new Date(end)) : presentLabel}`;
}

/** "May 2024 – Aug 2024", open-ended: "May 2024 – Present" */
export const formatRange = rangeFormatter(shortMonthYear, "PRESENT");

/** "05/2024 – 08/2024", open-ended: "05/2024 – PRESENT" */
export const formatNumericRange = rangeFormatter(numericMonthYear, "PRESENT");
