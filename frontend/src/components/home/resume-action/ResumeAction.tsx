import { getResumeUrl } from "#/api/portfolio";

export function ResumeAction() {
  return (
    <a
      href={getResumeUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-2 mt-3 flex items-center justify-between rounded-sm border border-llama/30 px-3 py-2 text-xs text-llama transition-colors hover:border-llama hover:bg-llama/10"
    >
      <span>&gt; open resume.pdf</span>
      <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
        ↓
      </span>
    </a>
  );
}
