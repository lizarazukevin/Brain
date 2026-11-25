import { SectionLabel } from "../section-label/SectionLabel";

type FeaturedProject = {
  name: string;
  desc: string;
  link: string;
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  { name: "GitKord", desc: "GitHub Pull Requests on Discord", link: "https://gitkord.com" },
  {
    name: "Quri",
    desc: "Personal Finance Assistant",
    link: "https://github.com/lizarazukevin/qurimanagementservice",
  },
];

type ProjectRowProps = {
  project: FeaturedProject;
};

function ProjectRow({ project }: ProjectRowProps) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm group">
      <span className="text-llama group-hover:text-offwhite transition-colors min-w-[120px]">
        &gt; {project.name}
      </span>
      <span className="text-space-border hidden sm:inline">|</span>
      <span className="text-gold/70 flex-1">{project.desc}</span>
      <a
        href={project.link}
        className="text-offwhite/50 hover:text-llama transition-colors mt-1 sm:mt-0"
      >
        [ view ]
      </a>
    </li>
  );
}

export function FeaturedProjects() {
  return (
    <section className="mt-8 pt-6 border-t border-space-border/30">
      <SectionLabel>// FEATURED.PROJECTS</SectionLabel>
      <ul className="space-y-3">
        {FEATURED_PROJECTS.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </ul>
    </section>
  );
}
