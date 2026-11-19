import { useEffect, useReducer } from "react";

const TITLES = [
  "Software Engineer",
  "Photographer",
  "Hokie",
  "Tennis Player",
  "Musician",
  "Entrepreneur",
  "Bolivian",
];

const DELAY_MS = {
  typing: 80,
  holding: 2000,
  deleting: 40,
} as const;

type Phase = keyof typeof DELAY_MS;

interface State {
  titleIndex: number;
  length: number;
  phase: Phase;
}

const INITIAL_STATE: State = { titleIndex: 0, length: 0, phase: "typing" };

function advance(state: State, titles: readonly string[]): String {
  const title = titles[state.titleIndex];

  switch (state.phase) {
    case "typing": {
      const length = state.length + 1;
      return { ...state, length, phase: length === title.length ? "holding" : "typing" };
    }
    case "holding": {
      return { ...state, phase: "deleting" };
    }
    case "deleting": {
      const length = state.length - 1;
      if (length > 0) return { ...state, length };
      return { titleIndex: (state.titleIndex + 1) % titles.length, length: 0, phase: "typing" };
    }
  }
}

/**
 * Cycles through `titles`, typing, holding, then deleting them.
 */
function useTypewriter(titles: readonly string[]) {
  // STATE
  // Reducer owns animation state (role, length, phase).
  // Every update runs through `advance`, only event is time passing.
  const [state, tick] = useReducer((s: State) => advance(s, titles), INITIAL_STATE);

  // SCHEDULING
  // After rendering, schedule exactly one future tick.
  useEffect(() => {
    const id = setTimeout(tick, DELAY_MS[state.phase]);

    // CLEANUP
    // Cancel pending timer if state changes first or component unmounts.
    return () => clearTimeout(id);
  }, [state]);

  // DERIVED VALUES
  // Nothing below is stored in state, view uses `holding` to decide cursor blink.
  return {
    text: titles[state.titleIndex].slice(0, state.length),
    isHolding: state.phase === "holding",
  };
}

export function TypewriterTitles() {
  const { text, isHolding } = useTypewriter(TITLES);

  return (
    <div className="flex items-center gap-2 text-gold text-sm sm:text-base font-mono h-6">
      <span className="text-space-border">/</span>
      <span>{text}</span>
      <span
        aria-hidden
        className={`inline-block w-2 h-[1.1em] bg-gold ${isHolding ? "animate-blink" : ""}`}
      />
    </div>
  );
}
