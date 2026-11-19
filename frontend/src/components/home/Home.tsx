import { Terminal } from "#/components/terminal";
import { useProfile } from "#/hooks/usePortfolio";
import { TypewriterTitles } from "./TypewriterTitles";

export function Home() {
  const { data: profile, isLoading, error } = useProfile();

  return (
    <div className="min-h-screen overflow-hidden bg-black flex items-center justify-center p-0 sm:p-4">
      <Terminal>
        <div className="space-y-4">
          <p className="text-gold text-sm opacity-80">~ /sys/boot</p>

          <p className="text-llama text-sm">
            &gt; whoami<span className="animate-pulse">_</span>
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold text-offwhite pt-2 tracking-tight">
            {profile?.name}
          </h1>

          <TypewriterTitles />

          <div className="py-8">
            <div className="w-full h-32 border border-dashed border-space-border flex items-center justify-center text-gold/50 text-sm">
              [ AVATAR / CONTENT AREA ]
            </div>
          </div>
        </div>
      </Terminal>
    </div>
  );
}
