import { SectionLabel } from "../section-label/SectionLabel";

const BRACKET_CORNERS = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
] as const;

function CornerBrackets() {
  return (
    <>
      {BRACKET_CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={`pointer-events-none absolute size-4 border-llama/80 ${corner}`}
        />
      ))}
    </>
  );
}

type VisualFeedProps = {
  avatar: string | null;
  name: string;
};

export function VisualFeed({ avatar, name }: VisualFeedProps) {
  return (
    <section>
      <SectionLabel>// VISUAL.FEED</SectionLabel>

      {/* p-2 leaves a gutter so the brackets sit just outside the image */}
      <div className="relative w-full max-w-[240px] mx-auto md:mx-0 p-2">
        <CornerBrackets />

        <div className="bg-space-light/40 ring-1 ring-white/10">
          {avatar ? (
            <img
              src={avatar}
              alt={`Portrait of ${name}`}
              loading="lazy"
              decoding="async"
              className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition duration-500"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center text-gold/40 text-xs text-center">
              &gt; awaiting_visual_feed<span className="animate-blink">_</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
