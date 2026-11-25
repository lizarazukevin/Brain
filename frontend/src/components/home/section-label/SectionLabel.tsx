import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
};

/** Gold eyebrow label used above every pane section, e.g. "// SYSTEM.BOOT". */
export function SectionLabel({ children }: SectionLabelProps) {
  return <p className="text-gold text-xs opacity-80 mb-4">{children}</p>;
}
