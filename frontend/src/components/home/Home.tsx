import { Terminal } from "#/components/terminal";
import { useProfile } from "#/hooks/usePortfolio";

import { BootHeader } from "./BootHeader";
import { ConnectLinks } from "./ConnectLinks";
import { FeaturedProjects } from "./FeaturedProjects";
import { ProfileBio } from "./ProfileBio";
import { VisualFeed } from "./VisualFeed";

export function Home() {
  const { data: profile, isLoading, error } = useProfile();

  // LOADING
  if (isLoading) {
    return (
      <Terminal>
        <p className="text-gold animate-pulse font-mono">~ initializing secure connection...</p>
      </Terminal>
    );
  }

  // ERROR
  if (error) {
    return (
      <Terminal>
        <p className="text-red-500 font-mono">~ err: failed to load profile</p>
      </Terminal>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Terminal>
      {/* MULTIPLEXER LAYOUT */}
      <div className="flex flex-col h-full font-mono">
        {/* TOP PANE: identity */}
        <div className="border-b border-space-border/60 pb-6 mb-6">
          <BootHeader name={profile.name} />
        </div>

        {/* BOTTOM PANES: bio/projects | visual feed/connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex-1">
          {/* LEFT PANE (Bio + Projects) */}
          <div className="md:col-span-2 flex flex-col md:pr-6 md:border-r border-space-border/60 pb-6 md:pb-0">
            <ProfileBio content={profile.bio} />
            <FeaturedProjects />
          </div>

          {/* RIGHT PANE (Photo + Links) */}
          <div className="md:pl-6 flex flex-col pt-6 md:pt-0 pb-6 md:pb-0">
            <VisualFeed avatar={profile.avatar} name={profile.name} />
            <ConnectLinks
              githubUrl={profile.github_url}
              linkedinUrl={profile.linkedin_url}
              mediumUrl={profile.medium_url}
              email={profile.email}
            />
          </div>
        </div>
      </div>
    </Terminal>
  );
}
