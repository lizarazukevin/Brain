import type { ReactNode } from "react";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalFooter } from "./TerminalFooter";

type TerminalProps = {
  children: ReactNode;
  className?: string;
};

export function Terminal({ children, className = "" }: TerminalProps) {
  return (
    <div className="h-[100dvh] overflow-hidden flex items-center justify-center p-0 lg:p-4">
      <div className="relative z-10 w-full lg:w-[90vw] lg:max-w-5xl">
        <div aria-hidden className="terminal-glow hidden lg:block" />
        <div
          className={`
            relative flex flex-col h-[100dvh] lg:h-auto lg:max-h-[85vh]
            bg-space-dark/75 backdrop-blur-xl backdrop-saturate-150
            rounded-none lg:rounded-xl
            overflow-hidden
            shadow-terminal-edge
            ${className}
          `}
        >
          <TerminalHeader />

          <div className="flex-1 min-h-0 p-4 sm:p-8 overflow-y-auto font-mono text-offwhite selection:bg-llama/30">
            {children}
          </div>

          <TerminalFooter />
        </div>

        <div aria-hidden className="edge-light rounded-none lg:rounded-xl" />
      </div>
    </div>
  );
}
