import logo from "../../../assets/pixelated_logo.png";

export function TerminalHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-space-light/50 border-b border-space-border select-none">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-space-border" />
        <div className="w-3 h-3 rounded-full bg-space-border" />
        <div className="w-3 h-3 rounded-full bg-space-border" />
      </div>

      <div className="text-[10px] sm:text-xs text-gold/80 tracking-widest uppercase font-semibold">
        SYS://KLIZ
      </div>

      <div className="w-8 h-8 opacity-90">
        <img src={logo} alt="logo" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
