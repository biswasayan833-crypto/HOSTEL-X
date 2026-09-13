"use client";

import { useEffect, useState, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap-core";
import {
  RESIDENT_CREDENTIAL_DATA,
  SCAN_TELEMETRY_STEPS,
  ScanStatus,
  ScanTelemetryStep,
} from "@/lib/access-data";

interface AccessScannerProps {
  scanStatus: ScanStatus;
  onScanStatusChange: (status: ScanStatus) => void;
  scanProgress: number;
  onScanProgressChange: (progress: number) => void;
}

export function AccessScanner({
  scanStatus,
  onScanStatusChange,
  scanProgress,
  onScanProgressChange,
}: AccessScannerProps) {
  const [currentStep, setCurrentStep] = useState<ScanTelemetryStep>(SCAN_TELEMETRY_STEPS[0]);
  const [consoleLog, setConsoleLog] = useState<string[]>([
    "SYS_INIT: BIOMETRIC SCANNER ONLINE",
    "SECTOR 07: OPTICAL SENSORS IN STANDBY",
  ]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startScan = () => {
    if (scanStatus === "scanning") return;

    onScanStatusChange("scanning");
    onScanProgressChange(0);
    setConsoleLog([
      "SYS_INIT: BIOMETRIC SCANNER ONLINE",
      "INITIATING OPTICAL SENSORS...",
    ]);

    const isReduced = prefersReducedMotion();
    if (isReduced) {
      // Instant transition for reduced motion
      onScanProgressChange(100);
      setCurrentStep(SCAN_TELEMETRY_STEPS[SCAN_TELEMETRY_STEPS.length - 1]);
      onScanStatusChange("verified");
      setTimeout(() => onScanStatusChange("granted"), 200);
      return;
    }

    const duration = 2400; // 2.4s scan simulation
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStepIndex = 0;

    timerRef.current = setInterval(() => {
      currentStepIndex++;
      const currentPct = Math.min(100, Math.round((currentStepIndex / steps) * 100));
      onScanProgressChange(currentPct);

      // Match telemetry milestone
      const matched = [...SCAN_TELEMETRY_STEPS].reverse().find((s) => currentPct >= s.percent);
      if (matched) {
        setCurrentStep(matched);
      }

      if (currentStepIndex >= steps) {
        if (timerRef.current) clearInterval(timerRef.current);
        onScanStatusChange("verified");
        setConsoleLog((prev) => [
          ...prev,
          "BIOMETRICS HARMONIZED: 99.8% MATCH",
          "STATUS: IDENTITY VERIFIED",
        ]);

        // Handshake to granted state
        setTimeout(() => {
          onScanStatusChange("granted");
          setConsoleLog((prev) => [
            ...prev,
            "PERIMETER LOCK: UNLOCKED",
            "PORTAL 07: ACCESS FULLY GRANTED",
          ]);
        }, 900);
      }
    }, intervalTime);
  };

  const resetScan = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    onScanStatusChange("idle");
    onScanProgressChange(0);
    setCurrentStep(SCAN_TELEMETRY_STEPS[0]);
    setConsoleLog([
      "SYS_INIT: BIOMETRIC SCANNER ONLINE",
      "SECTOR 07: OPTICAL SENSORS IN STANDBY",
    ]);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const isScanning = scanStatus === "scanning";
  const isVerified = scanStatus === "verified";
  const isGranted = scanStatus === "granted";

  return (
    <div
      className="flex flex-col justify-between p-6 sm:p-8 bg-[#0C0E13]/80 border border-[#252C3A] rounded-lg backdrop-blur-md relative overflow-hidden"
      aria-label="Resident Credential Scanner Control Terminal"
    >
      {/* Subtle top scan gradient hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F2FE]/50 to-transparent" />

      {/* Top Header & Terminal Status */}
      <div>
        <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#8F99AE] uppercase pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isGranted
                  ? "bg-[#00F2FE]"
                  : isVerified
                  ? "bg-[#00F2FE] animate-ping"
                  : isScanning
                  ? "bg-[#7928CA] animate-pulse"
                  : "bg-white/40"
              }`}
            />
            <span className="text-white">TERMINAL // ACCESS SCANNER</span>
          </div>
          <span className="text-[#00F2FE]">PROTOCOL 2088</span>
        </div>

        {/* Dynamic Verification Status Readout */}
        <div className="mt-5">
          <div className="font-mono text-[9px] text-[#8F99AE] tracking-[0.2em] uppercase">
            AUTHENTICATION STATUS
          </div>
          <div className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            {isGranted ? (
              <span className="text-[#00F2FE] flex items-center gap-2">
                <span className="text-sm">●</span> ACCESS GRANTED
              </span>
            ) : isVerified ? (
              <span className="text-[#00F2FE] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
                IDENTITY VERIFIED
              </span>
            ) : isScanning ? (
              <span className="text-[#A855F7] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
                SCANNING... {scanProgress}%
              </span>
            ) : (
              <span className="text-white/80">STANDBY // READY</span>
            )}
          </div>
          <p className="font-mono text-[10px] text-[#8F99AE] mt-1 leading-relaxed">
            {isGranted
              ? "All physical and digital sector protocols cleared. Welcome to Sector 07."
              : isVerified
              ? "Biometric credentials match Resident 014 (Dr. Aya Lin)."
              : isScanning
              ? currentStep.detail
              : "Position pointer or touch holographic pass to align optical sensors."}
          </p>
        </div>

        {/* Progress Bar & Telemetry Indicator */}
        <div className="mt-5 p-3 bg-black/40 border border-white/[0.04] rounded-sm">
          <div className="flex items-center justify-between font-mono text-[8px] text-[#8F99AE] uppercase tracking-wider mb-1.5">
            <span>NEURAL ENCRYPTION HANDSHAKE</span>
            <span className={isGranted || isVerified ? "text-[#00F2FE]" : "text-white"}>
              {scanProgress}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#161A22] rounded-full overflow-hidden relative">
            <div
              className={`h-full transition-all duration-150 ease-out ${
                isGranted || isVerified
                  ? "bg-[#00F2FE]"
                  : isScanning
                  ? "bg-gradient-to-r from-[#7928CA] to-[#00F2FE]"
                  : "bg-white/20"
              }`}
              style={{ width: `${scanProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[7px] text-white/40 tracking-widest uppercase mt-2">
            <span>KEY: {RESIDENT_CREDENTIAL_DATA.cryptographicHash}</span>
            <span>FREQ: 142.8 GHz</span>
          </div>
        </div>

        {/* Security Matrix Breakdown */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {RESIDENT_CREDENTIAL_DATA.securityAttributes.map((attr, idx) => (
            <div key={idx} className="p-2.5 bg-black/30 border border-white/[0.03] rounded-sm font-mono">
              <div className="text-[7px] text-[#8F99AE] uppercase tracking-wider">{attr.label}</div>
              <div
                className={`text-[9px] font-semibold tracking-tight mt-0.5 ${
                  isGranted
                    ? "text-[#00F2FE]"
                    : isVerified
                    ? "text-white"
                    : "text-white/80"
                }`}
              >
                {attr.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Controls & Telemetry Feed */}
      <div className="mt-6 pt-4 border-t border-white/[0.06]">
        {/* Terminal log window */}
        <div
          aria-live="polite"
          className="p-2.5 bg-black/60 border border-white/[0.04] rounded-sm font-mono text-[8px] text-[#8F99AE] space-y-1 max-h-20 overflow-y-auto mb-4"
        >
          {consoleLog.map((line, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-[#00F2FE]">›</span>
              <span className={i === consoleLog.length - 1 ? "text-white font-medium" : ""}>
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button Row */}
        <div className="flex items-center gap-3">
          <button
            onClick={startScan}
            disabled={isScanning || isGranted}
            className={`group flex-1 relative px-5 py-3.5 rounded-sm font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 border overflow-hidden cursor-pointer ${
              isGranted
                ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] cursor-default"
                : isScanning
                ? "bg-[#7928CA]/30 border-[#7928CA] text-white cursor-wait"
                : "bg-[#00F2FE] text-black border-[#00F2FE] hover:bg-white hover:border-white shadow-[0_0_20px_rgba(0,242,254,0.3)]"
            }`}
            data-cursor="interactive"
            aria-label="Verify Resident Access Credential"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isGranted ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#00F2FE]" />
                  <span>ACCESS CONFIRMED</span>
                </>
              ) : isScanning ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
                  <span>SCANNING CREDENTIAL...</span>
                </>
              ) : (
                <>
                  <span>VERIFY ACCESS</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </>
              )}
            </span>
          </button>

          {(isGranted || isVerified) && (
            <button
              onClick={resetScan}
              className="px-3.5 py-3.5 bg-black/40 border border-[#252C3A] hover:border-white/50 text-[#8F99AE] hover:text-white font-mono text-[10px] tracking-[0.15em] uppercase rounded-sm transition-colors cursor-pointer"
              aria-label="Reset Access Scanner"
              data-cursor="interactive"
            >
              RESET
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
