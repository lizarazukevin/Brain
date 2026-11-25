import { Link } from "@tanstack/react-router";

type WarpLinkProps = {
  to: string;
  label: string;
};

export function WarpLink({ to, label }: WarpLinkProps) {
  return (
    <Link
      to={to}
      className="flex-1 flex justify-center items-center py-3 px-2 sm:px-6 text-[11px] sm:text-xs tracking-wider hover:bg-white/5 hover:text-llama transition-colors border-r border-space-border last:border-r-0"
      activeProps={{ className: "bg-white/5 text-llama font-bold" }}
    >
      {label}
    </Link>
  );
}
