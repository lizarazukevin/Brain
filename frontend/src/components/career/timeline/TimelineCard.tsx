import { useState } from "react";
import { formatRange } from "../timeline-data/timeline";
import type { TimelineItem } from "../timeline-data/types";

function LogoMark({ src, name, color }: { src: string | null; name: string; color: string }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border"
      style={{
        borderColor: `${color}50`,
        // Light plate keeps dark logos legible on the dark card
        backgroundColor: showImage ? "rgb(255 255 255 / 0.92)" : `${color}15`,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-contain p-1"
        />
      ) : (
        <span className="text-sm font-bold" style={{ color }}>
          {name.trim().charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export function TimelineCard({ item }: { item: TimelineItem }) {
  const aura = item.glowColor;

  const hasDetails = item.details?.length > 0;
  const hasSummary = Boolean(item.summary);

  return (
    <article
      className="flex h-[17rem] w-[240px] shrink-0 flex-col gap-2 overflow-hidden rounded-xl border bg-space-dark/90 p-4 backdrop-blur-md sm:h-[18rem] sm:w-[280px] sm:gap-2.5 sm:p-5"
      style={{ borderColor: `${aura}50`, boxShadow: `0 0 24px -6px ${aura}66` }}
    >
      <div className="flex items-start justify-between">
        <LogoMark src={item.logoUrl} name={item.subtitle} color={aura} />
        <span
          className="rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-widest"
          style={{ color: aura, borderColor: `${aura}50`, backgroundColor: `${aura}10` }}
        >
          {item.employmentType ?? item.type}
        </span>
      </div>

      <div className="min-w-0">
        {/* min-h-[2lh] always reserves two lines, so one-line and two-line titles take the same space */}
        <h3
          title={item.title}
          className="line-clamp-2 min-h-[2lh] text-sm font-bold leading-snug text-offwhite sm:text-base"
        >
          {item.title}
        </h3>
        <p className="mt-1 truncate text-xs text-gold sm:text-sm">{item.subtitle}</p>
        <p className="truncate text-[11px] text-gold/50 sm:text-xs">{item.location}</p>
      </div>

      <p className="text-[11px] text-gold/60 sm:text-xs">
        {formatRange(item.startDate, item.endDate)}
      </p>

      {/* mt-auto pins this block to the bottom, so the divider sits at the same height on every card */}
      <div
        className={`mt-auto min-w-0 ${
          hasDetails || hasSummary ? "border-t border-space-border/30 pt-2.5" : ""
        }`}
      >
        {hasDetails ? (
          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-[11px] sm:text-xs">
            {item
              .details!.filter(({ label }) => label !== "GPA")
              .map(({ label, value }) => (
                <div key={label} className="contents">
                  <dt className="text-[10px] uppercase tracking-wider text-gold/50">{label}</dt>
                  <dd title={value} className="truncate text-offwhite/80">
                    {value}
                  </dd>
                </div>
              ))}
          </dl>
        ) : (
          hasSummary && (
            <p className="line-clamp-3 text-[11px] leading-relaxed text-offwhite/70 sm:text-xs">
              {item.summary}
            </p>
          )
        )}
      </div>
    </article>
  );
}
