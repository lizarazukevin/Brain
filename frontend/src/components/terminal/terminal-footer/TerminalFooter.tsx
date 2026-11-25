import { WarpLink } from "./WarpLink";

export function TerminalFooter() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-space-light/50 border-t border-space-border font-mono text-[11px] sm:text-xs text-gold/80">
      <div className="hidden sm:flex items-center gap-4 px-6 py-2 w-full sm:w-auto">
        <span>
          REPOS: <span className="text-offwhite">42</span>
        </span>
        <span className="text-space-border">|</span>
        <span>
          PRS: <span className="text-offwhite">128</span>
        </span>
        <span className="text-space-border">|</span>
        <span>
          ARTICLES: <span className="text-offwhite">12</span>
        </span>
      </div>

      <nav className="flex w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-space-border">
        <WarpLink to="/" label="HOME" />
        <WarpLink to="/career" label="CAREER" />
        <WarpLink to="/blog" label="BLOG" />
        <WarpLink to="/gallery" label="GALLERY" />
      </nav>
    </div>
  );
}
