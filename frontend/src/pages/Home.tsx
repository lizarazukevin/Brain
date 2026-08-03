import { useProfile } from "../hooks/usePortfolio";

export default function Home() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{profile?.name}</h1>
      <p>{profile?.tagline}</p>
      <p>{profile?.bio}</p>
      {profile?.avatar && <img src={profile.avatar} alt={profile.name} width="150" height="150" />}
      <ul>
        {profile?.linkedin_url && (
          <li>
            <a href={profile.linkedin_url}>LinkedIn</a>
          </li>
        )}
        {profile?.github_url && (
          <li>
            <a href={profile.github_url}>GitHub</a>
          </li>
        )}
      </ul>
      {profile?.resume && <a href={profile.resume}>Download Resume</a>}
    </div>
  );
}
