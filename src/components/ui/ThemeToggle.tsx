"use client";

import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({
  className = "",
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Avoid layout shift before mount
  if (!mounted) {
    return (
      <div
        className={`h-7 w-24 rounded border border-[#252C3A] bg-[#0C0E13]/40 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`group relative flex items-center p-0.5 rounded-sm border border-[#252C3A] hover:border-[#00F2FE]/80 bg-[#0C0E13]/70 hover:bg-[#0C0E13] transition-all duration-300 cursor-pointer font-mono select-none ${className}`}
      data-cursor="interactive"
      aria-label={`Current theme: ${theme}. Click to switch to ${isDark ? "architectural light" : "futuristic dark"} mode.`}
      title={`Switch to ${isDark ? "Light (ARCH)" : "Dark (2088)"} mode`}
    >
      {/* Telemetry Indicator Slot: DARK */}
      <span
        className={`relative z-10 flex items-center gap-1.5 px-2 py-1 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase transition-colors duration-200 ${
          isDark
            ? "text-white font-semibold bg-[#161A22] rounded-[1px] shadow-[0_0_8px_rgba(0,242,254,0.15)]"
            : "text-[#8F99AE] hover:text-white"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            isDark ? "bg-[#00F2FE] shadow-[0_0_6px_#00F2FE]" : "bg-[#252C3A]"
          }`}
        />
        <span>DARK</span>
      </span>

      {/* Telemetry Indicator Slot: ARCH (Light) */}
      <span
        className={`relative z-10 flex items-center gap-1.5 px-2 py-1 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase transition-colors duration-200 ${
          !isDark
            ? "text-[#0A0E17] font-semibold bg-white rounded-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
            : "text-[#8F99AE] hover:text-white"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            !isDark ? "bg-[#0284C7] shadow-[0_0_6px_#0284C7]" : "bg-[#252C3A]"
          }`}
        />
        <span>ARCH</span>
      </span>
    </button>
  );
}
