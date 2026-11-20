import { Terminal } from "#/components/terminal";
import { useWorkExperiences } from "#/hooks";

export function Career() {
  const { data: experiences, isLoading, error } = useWorkExperiences();

  return (
    <Terminal>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {experiences?.map((exp) => (
            <li key={exp.id}>
              <h3>
                {exp.role} @ {exp.company}
              </h3>
              <p>{exp.objective}</p>
              <p>
                {exp.location} — {exp.start_date} to {exp.end_date ?? "Present"}
              </p>
              <p style={{ whiteSpace: "pre-line" }}>{exp.description}</p>
              {exp.skills.length > 0 && <p>{exp.skills.map((s) => s.name).join(" · ")}</p>}
            </li>
          ))}
        </ul>
      )}
    </Terminal>
  );
}
