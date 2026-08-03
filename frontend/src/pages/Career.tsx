import { useWorkExperiences } from "../hooks/usePortfolio";

export default function Career() {
  const { data: experiences, isLoading, error } = useWorkExperiences();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {experiences?.map((exp) => (
        <li key={exp.id}>
          <h3>
            {exp.role} @ {exp.company}
          </h3>
          <p>
            {exp.location} — {exp.start_date} to {exp.end_date ?? "Present"}
          </p>
          <p>{exp.description}</p>
          {exp.skills.length > 0 && <p>{exp.skills.map((s) => s.name).join(" · ")}</p>}
        </li>
      ))}
    </ul>
  );
}
