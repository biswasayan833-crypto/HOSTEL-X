"use client";

interface FloorSelectorProps {
  activeFloor: number | null;
  onSelectFloor: (floor: number | null) => void;
  className?: string;
}

const FLOORS = [
  { level: 42, name: "SKY ATRIUM", tag: "L42" },
  { level: 28, name: "LIVING PODS", tag: "L28", isSector07: true },
  { level: 14, name: "MESS HUB", tag: "L14" },
  { level: 1, name: "INGRESS", tag: "L01" },
];

export function FloorSelector({
  activeFloor,
  onSelectFloor,
  className = "",
}: FloorSelectorProps) {
  return (
    <aside
      aria-label="Architectural Floor Selector"
      className={`flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] pointer-events-auto select-none ${className}`}
    >
      <div className="flex items-center gap-2 text-[9px] text-[#8F99AE]/70 tracking-[0.25em] pb-1 border-b border-[#252C3A]/50">
        <span className="w-1 h-1 rounded-full bg-[#00F2FE]" />
        <span>FLOOR MATRIX</span>
      </div>

      <div className="flex flex-row sm:flex-col flex-wrap gap-1.5 mt-1">
        {FLOORS.map((f) => {
          const isActive = activeFloor === f.level;
          return (
            <button
              key={f.level}
              type="button"
              onClick={() => onSelectFloor(isActive ? null : f.level)}
              data-cursor="interactive"
              className={`group flex items-center justify-between gap-2 sm:gap-4 px-2.5 py-1.5 sm:px-3 sm:py-2 border text-left transition-all duration-300 ${
                isActive
                  ? "bg-[#00F2FE]/15 border-[#00F2FE] text-white shadow-[0_0_12px_rgba(0,242,254,0.25)]"
                  : "bg-[#0C0E13]/80 border-[#252C3A]/70 text-[#8F99AE] hover:border-[#00F2FE]/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 transition-colors duration-200 ${
                    isActive
                      ? "bg-[#00F2FE]"
                      : f.isSector07
                      ? "bg-[#00F2FE]/60"
                      : "bg-[#252C3A] group-hover:bg-[#00F2FE]/40"
                  }`}
                />
                <span className="font-semibold">{f.tag}</span>
                <span className="text-[9px] text-[#8F99AE]/80 hidden sm:inline">
                  {f.name}
                </span>
              </div>

              {f.isSector07 && (
                <span className="text-[8px] tracking-wider px-1 py-0.5 bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40">
                  SEC_07
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeFloor !== null && (
        <button
          type="button"
          onClick={() => onSelectFloor(null)}
          className="text-[8px] text-[#8F99AE]/60 hover:text-[#00F2FE] tracking-[0.2em] uppercase text-right pt-1 transition-colors duration-200"
        >
          [RESET CAMERA]
        </button>
      )}
    </aside>
  );
}
