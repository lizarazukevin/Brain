import { Terminal } from "#/components/terminal";
import { useProfile } from "#/hooks/usePortfolio";
import { TypewriterTitles } from "./TypewriterTitles";

export function Home() {
  const { data: profile, isLoading, error } = useProfile();

  return (
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
          <p>
            This portfolio serves as a testament to my academic and research pursuits, encompassing
            personal projects and experiences that demonstrate dedication and a desire to keep
            learning; in addition to my technical work, I plan on including some of my own hobbies
            and interests to provide insight into who I am and my ideas.
          </p>
          <br />
          <p>
            I welcome collaboration opportunities and discussion regarding Web Development,
            Reinforcement Learning, and AI Security, so feel free to reach out!
          </p>
        </div>
      </div>
    </Terminal>
  );
}
