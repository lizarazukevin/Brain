import { SectionLabel } from "./SectionLabel";
import { TypewriterTitles } from "./TypewriterTitles";

type BootHeaderProps = {
  name: string;
};

/**
 * Identity block at the top of the home terminal: boot label, "whoami"
 * prompt, the profile name, and the rotating typewriter titles.
 */
export function BootHeader({ name }: BootHeaderProps) {
  return (
    <header>
      <SectionLabel>// SYSTEM.BOOT</SectionLabel>
      <p className="text-llama text-sm mb-2">
        &gt; whoami<span className="animate-pulse">_</span>
      </p>
      <h1 className="text-4xl sm:text-6xl font-bold text-offwhite tracking-tight mb-2">{name}</h1>
      <TypewriterTitles />
    </header>
  );
}
