import { SectionLabel } from "./SectionLabel";

type ConnectLinksProps = {
  githubUrl?: string;
  linkedinUrl?: string;
  mediumUrl?: string;
  email?: string;
};

type ConnectItemProps = {
  href: string;
  label: string;
  external?: boolean;
};

function ConnectItem({ href, label, external = false }: ConnectItemProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="flex items-center gap-2 text-llama hover:text-offwhite transition-colors group w-fit"
    >
      <span className="opacity-50 group-hover:opacity-100 transition-opacity">&gt;</span>
      <span>{label}</span>
    </a>
  );
}

export function ConnectLinks({ githubUrl, linkedinUrl, mediumUrl, email }: ConnectLinksProps) {
  return (
    <section className="mt-8 pt-6 border-t border-space-border/30 flex-1">
      <SectionLabel>// CONNECT</SectionLabel>
      <div className="flex flex-col gap-3 text-sm">
        {githubUrl && <ConnectItem href={githubUrl} label="GitHub" external />}
        {linkedinUrl && <ConnectItem href={linkedinUrl} label="LinkedIn" external />}
        {mediumUrl && <ConnectItem href={mediumUrl} label="Medium" external />}
        <ConnectItem href={`mailto:${email}`} label="Email" />
      </div>
    </section>
  );
}
