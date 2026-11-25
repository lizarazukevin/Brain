import { useEffect, useState, type RefObject } from "react";

/** Index of the snap section currently filling the scroll container. */
export function useActiveSection(rootRef: RefObject<HTMLElement | null>, sectionCount: number) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { root, threshold: 0.6 },
    );

    root.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef, sectionCount]);

  return active;
}
