import { useEffect, useState, type RefObject } from "react";

/** Whether the scroller has hidden content before (start) and after (end) the viewport. */
export function useScrollEdges(ref: RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const start = el.scrollLeft > 1;
      const end = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });

    // Re-check when the viewport or the content width changes (resize, filter change)
    const resize = new ResizeObserver(update);
    resize.observe(el);
    if (el.firstElementChild) resize.observe(el.firstElementChild);

    return () => {
      el.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, [ref]);

  return edges;
}
