import type { ReactNode } from "react";
import { TerminalHeader } from "./terminal-header/TerminalHeader";
import { TerminalFooter } from "./terminal-footer/TerminalFooter";

type TerminalProps = {
  children: ReactNode;
  className?: string;
  fill?: boolean;
};

export function Terminal({ children, className = "", fill = false }: TerminalProps) {
  return (
    <div className="h-[100dvh] overflow-hidden flex items-center justify-center p-0 lg:p-4">
      <div className="relative z-10 w-full lg:w-[90vw] lg:max-w-5xl">
        <div aria-hidden className="terminal-glow hidden lg:block" />
        <div
          className={`
            relative flex flex-col h-[100dvh]
            ${fill ? "lg:h-[85dvh]" : "lg:h-auto lg:max-h-[85vh]"}
            bg-space-dark/75 backdrop-blur-xl backdrop-saturate-150
            rounded-none lg:rounded-xl
            overflow-hidden
            shadow-terminal
            ${className}
          `}
        >
          <TerminalHeader />

          <div
            className={`min-h-0 flex-1 p-4 font-mono text-offwhite selection:bg-llama/30 sm:p-8 ${
              fill ? "flex flex-col overflow-hidden" : "overflow-y-auto"
            }`}
          >
            {children}
          </div>

          <TerminalFooter />
        </div>

        <div aria-hidden className="edge-light rounded-none lg:rounded-xl" />
      </div>
    </div>
  );
}
