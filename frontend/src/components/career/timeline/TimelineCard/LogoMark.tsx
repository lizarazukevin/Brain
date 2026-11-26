import { useState } from "react";

type LogoMarkProps = { src: string | null; name: string };

/**
 * Company logo on a light plate, falling back to the name's initial.
 * Colors come from the `--aura` variable set by the nearest ancestor.
 */
export function LogoMark({ src, name }: LogoMarkProps) {
  // Remember *which* src failed, so a new src gets a fresh attempt
  // (a plain boolean would stay stuck after the list is re-filtered).
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = src && src !== failedSrc ? src : null;

  return (
    <div
      className={`flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-aura ${
        // Light plate keeps dark logos legible on the dark card
        imageSrc ? "bg-white/92" : "bg-aura-tint"
      }`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailedSrc(imageSrc)}
          className="size-full object-contain p-1"
        />
      ) : (
        <span className="text-base font-bold text-(--aura)">
          {name.trim().charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
