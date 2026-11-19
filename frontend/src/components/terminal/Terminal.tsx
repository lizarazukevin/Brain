import type { ReactNode } from "react";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalFooter } from "./TerminalFooter";

type TerminalProps = {
  children: ReactNode;
  className?: string;
};

export function Terminal({ children, className = "" }: TerminalProps) {
  return (
    <div className="relative z-10 w-full sm:w-[90vw] sm:max-w-5xl">
      <div aria-hidden className="terminal-glow hidden sm:block" />
      <div
        className={`
          relative flex flex-col h-[100dvh] sm:h-auto sm:max-h-[85vh]
          bg-space-dark/75 backdrop-blur-xl backdrop-saturate-150
          rounded-none sm:rounded-xl
          overflow-hidden
          shadow-terminal-edge
          ${className}
        `}
      >
        <TerminalHeader />

        <div className="flex-1 p-4 sm:p-8 overflow-y-auto font-mono text-offwhite selection:bg-llama/30">
          {children}
        </div>

        <TerminalFooter />
      </div>

      <div aria-hidden className="edge-light rounded-none sm:rounded-xl" />
    </div>
  );
}
