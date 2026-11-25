import type { CSSProperties } from "react";

type OrbNodeProps = { color: string; dim?: boolean; delay?: number };

export function OrbNode({ color, dim = false, delay = 0 }: OrbNodeProps) {
  return (
    <span
      aria-hidden
      className="orb"
      data-continued={dim ? "" : undefined}
      style={{ "--node": color, animationDelay: `${delay}ms` } as CSSProperties}
    />
  );
}
