import ReactMarkdown from "react-markdown";
import { SectionLabel } from "../section-label/SectionLabel";

type ProfileBioProps = {
  content: string;
};

export function ProfileBio({ content }: ProfileBioProps) {
  return (
    <section className="flex-1">
      <SectionLabel>// PROFILE.MD</SectionLabel>
      <div className="docs-prose prose prose-invert prose-sm sm:prose-base max-w-2xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  );
}
