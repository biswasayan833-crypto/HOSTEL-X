"use client";

import { useEffect, useState } from "react";
import { CommandType, NOVA_COMMANDS } from "@/data/mock-data";
import { NovaCommandButton } from "./NovaCommandButton";

interface NovaTerminalProps {
  activeCommandId: CommandType;
  onSelectCommand: (id: CommandType) => void;
  className?: string;
}

export function NovaTerminal({
  activeCommandId,
  onSelectCommand,
  className = "",
}: NovaTerminalProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const command = NOVA_COMMANDS[activeCommandId];
  const isEmergency = command.id === "emergency";

  // Fast technical typewriter / reveal animation when command switches
  useEffect(() => {
    setIsRevealing(true);
    const timer = setTimeout(() => {
      setIsRevealing(false);
    }, 180);
    return () => clearTimeout(timer);
  }, [activeCommandId]);

  return (
    <div
      className={`flex flex-col gap-4 max-w-xl w-full ${className}`}
      aria-label="Nova Command Interface"
    >
      {/* 4 Command Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {(Object.keys(NOVA_COMMANDS) as CommandType[]).map((key) => {
          const item = NOVA_COMMANDS[key];
          return (
            <NovaCommandButton
              key={item.id}
              command={item}
              isActive={activeCommandId === item.id}
              onSelect={onSelectCommand}
            />
          );
        })}
      </div>

      {/* Futuristic Command Output Display Screen */}
      <div
        className={`relative p-5 sm:p-6 bg-[#0C0E13]/90 backdrop-blur-md border transition-all duration-300 ${
          isEmergency
            ? "border-[#FF453A]/60 shadow-[0_0_24px_rgba(255,69,58,0.15)]"
            : "border-[#252C3A] hover:border-[#00F2FE]/40"
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#8F99AE] pb-3 border-b border-[#252C3A]/60">
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isEmergency ? "bg-[#FF453A] animate-pulse" : "bg-[#00F2FE] animate-pulse"
              }`}
            />
            <span className="text-white/80">{command.data.heading}</span>
          </div>
          <span className="text-white/40">QUERY // EXEC_OK</span>
        </div>

        {/* Dynamic Content Body */}
        <div
          className={`mt-4 space-y-3 font-mono transition-opacity duration-200 ${
            isRevealing ? "opacity-30" : "opacity-100"
          }`}
        >
          {/* Metrics Rows */}
          <div className="space-y-2.5">
            {command.data.metrics.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-2.5 bg-[#050608]/60 border border-[#252C3A]/40 text-xs"
              >
                <span className="text-[10px] tracking-[0.18em] text-[#8F99AE] uppercase shrink-0">
                  {m.label}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium tracking-tight text-[11px] sm:text-xs">
                    {m.value}
                  </span>
                  {m.status && (
                    <span
                      className={`text-[8px] tracking-widest px-1.5 py-0.5 border ${
                        isEmergency
                          ? "bg-[#FF453A]/15 border-[#FF453A]/40 text-[#FF453A]"
                          : "bg-[#00F2FE]/10 border-[#00F2FE]/30 text-[#00F2FE]"
                      }`}
                    >
                      {m.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Telemetry Detail Description */}
          {command.data.details && (
            <p className="text-[10px] text-[#8F99AE]/80 font-light leading-relaxed pt-1 border-t border-white/[0.04]">
              {command.data.details}
            </p>
          )}

          {/* Status Badge */}
          <div className="pt-2 flex items-center justify-between text-[9px] tracking-[0.2em] text-[#8F99AE]">
            <span
              className={
                isEmergency ? "text-[#FF453A] font-semibold" : "text-[#00F2FE] font-semibold"
              }
            >
              {command.data.statusLabel}
            </span>
            <span className="text-white/40">SECTOR 07 // HOSTEL-X</span>
          </div>
        </div>

        {/* Subtle Scanline Accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-[1px] ${
            isEmergency ? "bg-[#FF453A]" : "bg-[#00F2FE]"
          } opacity-60`}
        />
      </div>
    </div>
  );
}
