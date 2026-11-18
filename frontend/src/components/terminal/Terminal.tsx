import type { ReactNode } from "react";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalFooter } from "./TerminalFooter";

type TerminalProps = {
  children: ReactNode;
  className?: string;
};

export function Terminal({ children, className = "" }: TerminalProps) {
  return (
    <div
      className={`flex flex-col w-full h-[100dvh] sm:h-auto sm:max-h-[85vh] sm:w-[90vw] sm:max-w-5xl bg-space-dark/80 backdrop-blur-2xl rounded-none sm:rounded-xl overflow-hidden shadow-terminal relative z-10 ${className}`}
    >
      <TerminalHeader />

      <div className="flex-1 p-4 sm:p-8 overflow-y-auto font-mono text-offwhite selection:bg-llama/30">
        {children}
      </div>

      <TerminalFooter />
    </div>
  );
}
