import { Terminal } from "#/components/terminal";
import { BootHeader } from "./boot-header/BootHeader";
import { ConnectLinks } from "./connect-links/ConnectLinks";
import { FeaturedProjects } from "./featured-projects/FeaturedProjects";
import { ProfileBio } from "./profile-bio/ProfileBio";
import { VisualFeed } from "./visual-feed/VisualFeed";
import { ResumeAction } from "./resume-action/ResumeAction";
import { useProfile } from "#/hooks/usePortfolio";

export function Home() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <Terminal>
        <p className="text-gold animate-pulse font-mono">~ initializing secure connection...</p>
      </Terminal>
    );
  }

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
      <div className="flex flex-col h-full font-mono">
        <div className="border-b border-space-border/60 pb-6 mb-6">
          <BootHeader name={profile.name} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 flex-1">
          <div className="md:col-span-2 flex flex-col md:pr-6 md:border-r border-space-border/60 pb-6 md:pb-0">
            <ProfileBio content={profile.bio} />
            <FeaturedProjects />
          </div>

          <div className="md:pl-6 flex flex-col pt-6 md:pt-0 pb-6 md:pb-0">
            <div className="w-full max-w-[240px] mx-auto md:mx-0">
              <VisualFeed avatar={profile.avatar} name={profile.name} />
              {profile.resume && <ResumeAction />}
            </div>

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
