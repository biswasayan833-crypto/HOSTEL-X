"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { prefersReducedMotion } from "@/lib/gsap-core";
import { RESIDENT_CREDENTIAL_DATA, ScanStatus } from "@/lib/access-data";

interface HolographicPassProps {
  scanStatus: ScanStatus;
  scanProgress?: number;
}

export function HolographicPass({ scanStatus, scanProgress = 0 }: HolographicPassProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tilt & Refraction coordinates
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    setIsReduced(prefersReducedMotion());
  }, []);

  // Smooth mouse move handling
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isReduced || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
    const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1

    // Desktop ±12 deg, Tablet ±6 deg
    const maxTilt = window.innerWidth < 768 ? 4 : window.innerWidth < 1024 ? 7 : 12;

    setRotateX(-normalizedY * maxTilt);
    setRotateY(normalizedX * maxTilt);

    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  }, [isReduced]);

  const handlePointerEnter = () => {
    if (!isReduced) setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const data = RESIDENT_CREDENTIAL_DATA;
  const isScanning = scanStatus === "scanning";
  const isVerified = scanStatus === "verified" || scanStatus === "granted";
  const isGranted = scanStatus === "granted";

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center p-2 sm:p-4 select-none [perspective:1200px]"
      aria-label="3D Interactive Holographic Resident Credential Card"
    >
      {/* Background ambient back-glow behind card */}
      <div
        className={`absolute w-72 sm:w-96 h-96 sm:h-[480px] rounded-full blur-[90px] transition-all duration-700 pointer-events-none ${
          isGranted
            ? "bg-[#00F2FE]/25 scale-110"
            : isVerified
            ? "bg-[#00F2FE]/20 scale-105"
            : isScanning
            ? "bg-[#7928CA]/30 animate-pulse scale-100"
            : "bg-[#00F2FE]/12 scale-95"
        }`}
      />

      {/* ────────────────────────────────────────────────────────────
          CARD SHELL WITH 3D PERSPECTIVE & PRESERVE-3D
          ──────────────────────────────────────────────────────────── */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        data-cursor="pass"
        style={{
          transform: isReduced
            ? "none"
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        data-surface="cinematic"
        className={`surface-cinematic holographic-card relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] aspect-[1/1.55] rounded-lg bg-[#0C0E13]/90 backdrop-blur-xl border transition-colors duration-500 overflow-hidden shadow-2xl ${
          isGranted
            ? "border-[#00F2FE] shadow-[0_0_40px_rgba(0,242,254,0.35)]"
            : isVerified
            ? "border-[#00F2FE]/80 shadow-[0_0_30px_rgba(0,242,254,0.25)]"
            : isScanning
            ? "border-[#7928CA] shadow-[0_0_35px_rgba(121,40,202,0.35)]"
            : "border-[#252C3A]/90 hover:border-[#00F2FE]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        }`}
      >
        {/* ────────────────────────────────────────────────────────────
            LAYER 01: CARBON FIBER SUBSTRATE & MICRO-GRID (Z: 0px)
            ──────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#252C3A_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Subtle diagonal micro-texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,#161A22_2px,#161A22_4px)]" />

        {/* ────────────────────────────────────────────────────────────
            LAYER 02: ORBITAL ACCESS RINGS & RETICLE (Z: 18px)
            ──────────────────────────────────────────────────────────── */}
        <div
          style={{ transform: isReduced ? "none" : "translateZ(18px)" }}
          className="absolute -right-16 -top-16 w-64 h-64 pointer-events-none opacity-35"
        >
          {/* Outer ring */}
          <div
            className={`w-full h-full rounded-full border border-dashed border-[#00F2FE]/50 ${
              isReduced ? "" : "animate-[spin_40s_linear_infinite]"
            }`}
          />
          {/* Middle ring */}
          <div
            className={`absolute inset-4 rounded-full border border-white/20 ${
              isReduced ? "" : "animate-[spin_25s_linear_infinite_reverse]"
            }`}
          />
          {/* Inner ring with degree ticks */}
          <div className="absolute inset-10 rounded-full border border-[#7928CA]/50">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[7px] text-[#00F2FE]">0°</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-mono text-[7px] text-[#00F2FE]">180°</span>
            <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[7px] text-[#00F2FE]">270°</span>
            <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 font-mono text-[7px] text-[#00F2FE]">90°</span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            LAYER 03: DYNAMIC SCANNING BEAM (Z: 24px)
            ──────────────────────────────────────────────────────────── */}
        {!isReduced && (
          <div
            style={{ transform: "translateZ(24px)" }}
            className={`absolute left-0 right-0 h-[2px] pointer-events-none transition-opacity duration-300 ${
              isScanning
                ? "animate-[scanBeam_1.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent shadow-[0_0_16px_#00F2FE] opacity-100"
                : "animate-[scanBeam_4.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#00F2FE]/60 to-transparent opacity-40"
            }`}
          />
        )}

        {/* ────────────────────────────────────────────────────────────
            LAYER 04: HOLOGRAPHIC SPECULAR / IRIDESCENT REFRACTION (Z: 40px)
            ──────────────────────────────────────────────────────────── */}
        {!isReduced && (
          <div
            style={{
              transform: "translateZ(40px)",
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 242, 254, 0.18) 0%, rgba(121, 40, 202, 0.12) 35%, transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-90 transition-opacity duration-200"
          />
        )}

        {/* Diagonal iridescent refraction sheen line */}
        <div
          style={{ transform: isReduced ? "none" : "translateZ(44px)" }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-70"
        />

        {/* ────────────────────────────────────────────────────────────
            LAYER 05: CARD CONTENT & TELEMETRY TYPOGRAPHY (Z: 32px)
            ──────────────────────────────────────────────────────────── */}
        <div
          style={{ transform: isReduced ? "none" : "translateZ(32px)" }}
          className="relative h-full flex flex-col justify-between p-5 sm:p-6 text-white"
        >
          {/* Top Header: Brand, Class & Security Indicator */}
          <div>
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-3.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
                    HOSTEL<span className="text-[#00F2FE]">-</span>X
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#00F2FE]" />
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#00F2FE] uppercase">
                    2088
                  </span>
                </div>
                <div className="font-mono text-[9px] tracking-[0.25em] text-[#8F99AE] uppercase mt-0.5">
                  {data.credentialTitle}
                </div>
              </div>

              {/* Status Badge */}
              <div
                className={`px-2 py-1 rounded-[2px] border font-mono text-[8px] sm:text-[9px] tracking-[0.18em] uppercase flex items-center gap-1.5 transition-colors duration-300 ${
                  isGranted
                    ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE]"
                    : isVerified
                    ? "bg-[#00F2FE]/15 border-[#00F2FE]/80 text-[#00F2FE]"
                    : isScanning
                    ? "bg-[#7928CA]/20 border-[#7928CA] text-[#A855F7] animate-pulse"
                    : "bg-[#161A22] border-[#252C3A] text-white/80"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isGranted || isVerified
                      ? "bg-[#00F2FE] animate-ping"
                      : isScanning
                      ? "bg-[#A855F7] animate-pulse"
                      : "bg-[#00F2FE]"
                  }`}
                />
                <span>
                  {isGranted
                    ? "GRANTED"
                    : isVerified
                    ? "VERIFIED"
                    : isScanning
                    ? `SCAN ${scanProgress}%`
                    : data.status}
                </span>
              </div>
            </div>

            {/* Cryptographic Smart Chip & Access Class */}
            <div className="flex items-center justify-between mt-4">
              {/* Gold/Cyan Micro-chip graphic */}
              <div className="w-9 h-7 rounded-[3px] bg-gradient-to-br from-[#252C3A] to-[#0C0E13] border border-white/20 relative flex items-center justify-center overflow-hidden">
                <div className="w-full h-[1px] bg-[#00F2FE]/40" />
                <div className="h-full w-[1px] bg-[#00F2FE]/40 absolute" />
                <div className="w-4 h-3 rounded-[1px] border border-[#00F2FE]/60 absolute bg-[#00F2FE]/10" />
              </div>

              {/* Freq & Sync Telemetry */}
              <div className="text-right font-mono text-[8px] tracking-[0.18em] text-[#8F99AE]">
                <div>FREQ: <span className="text-white">{data.neuralFrequency}</span></div>
                <div>SYNC: <span className="text-[#00F2FE]">{data.bioSyncRate}</span></div>
              </div>
            </div>
          </div>

          {/* Center Identity Section */}
          <div className="my-auto py-2">
            <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
              ACCESS ID // RESIDENT
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white mt-0.5">
              {data.accessId}
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <div className="font-display text-sm sm:text-base font-semibold text-white tracking-wide">
                  {data.residentName}
                </div>
                <div className="font-mono text-[9px] text-[#8F99AE] tracking-wider uppercase mt-0.5">
                  {data.discipline}
                </div>
              </div>
            </div>

            {/* Spatial Location Matrix: Sector & Level */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/[0.06]">
              <div className="p-2 bg-black/40 border border-white/[0.05] rounded-[2px]">
                <span className="font-mono text-[7px] sm:text-[8px] text-[#8F99AE] uppercase tracking-wider block">
                  SECTOR
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#00F2FE]">
                  {data.sector}
                </span>
                <span className="font-mono text-[7px] text-white/40 block">PRIMARY ZONE</span>
              </div>

              <div className="p-2 bg-black/40 border border-white/[0.05] rounded-[2px]">
                <span className="font-mono text-[7px] sm:text-[8px] text-[#8F99AE] uppercase tracking-wider block">
                  LEVEL
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-white">
                  {data.level}
                </span>
                <span className="font-mono text-[7px] text-white/40 block">SKYBRIDGE NEXUS</span>
              </div>
            </div>

            {/* Biometric Neural Waveform Vector */}
            <div className="mt-3">
              <div className="flex items-center justify-between font-mono text-[7px] text-[#8F99AE] tracking-widest uppercase mb-1">
                <span>NEURAL BIOMETRIC HARMONIC</span>
                <span className="text-[#00F2FE]">RESONANT</span>
              </div>
              <svg
                viewBox="0 0 200 24"
                className="w-full h-5 stroke-[#00F2FE] fill-none stroke-[1.2] opacity-85"
                preserveAspectRatio="none"
              >
                <path d="M0,12 L30,12 L40,4 L48,20 L56,6 L64,16 L72,12 L110,12 L118,2 L126,22 L134,7 L142,15 L150,12 L200,12" />
              </svg>
            </div>
          </div>

          {/* Bottom Row: Futuristic Matrix Glyph & Verification Metadata */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            {/* Holographic QR / Cyber Datamatrix glyph */}
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 40 40"
                className="w-9 h-9 sm:w-10 sm:h-10 fill-white/80 p-0.5 bg-black/50 border border-white/10 rounded-[2px]"
                aria-label="Quantum Cryptographic Datamatrix"
              >
                {/* 4 Corner Markers */}
                <rect x="2" y="2" width="10" height="10" fill="none" stroke="#00F2FE" strokeWidth="1.5" />
                <rect x="5" y="5" width="4" height="4" fill="#00F2FE" />
                <rect x="28" y="2" width="10" height="10" fill="none" stroke="#00F2FE" strokeWidth="1.5" />
                <rect x="31" y="5" width="4" height="4" fill="#00F2FE" />
                <rect x="2" y="28" width="10" height="10" fill="none" stroke="#00F2FE" strokeWidth="1.5" />
                <rect x="5" y="31" width="4" height="4" fill="#00F2FE" />
                {/* Matrix Nodes */}
                <rect x="15" y="4" width="3" height="3" />
                <rect x="21" y="4" width="3" height="3" />
                <rect x="15" y="10" width="3" height="3" />
                <rect x="18" y="16" width="4" height="4" fill="#7928CA" />
                <rect x="25" y="16" width="3" height="3" />
                <rect x="15" y="22" width="3" height="3" />
                <rect x="21" y="22" width="3" height="3" />
                <rect x="28" y="22" width="3" height="3" />
                <rect x="15" y="28" width="4" height="4" />
                <rect x="22" y="32" width="3" height="3" />
                <rect x="28" y="30" width="4" height="4" fill="#00F2FE" />
              </svg>

              <div className="font-mono text-[7px] sm:text-[8px] text-[#8F99AE] tracking-widest leading-tight">
                <div className="text-white/80">VALIDITY: {data.validity}</div>
                <div>CLASS: {data.accessClass}</div>
                <div className="text-[#00F2FE]/70 mt-0.5 font-mono">HASH: 7F4A:09E1</div>
              </div>
            </div>

            {/* Coordinates / Security Seal */}
            <div className="text-right font-mono text-[7px] sm:text-[8px] text-white/50 tracking-wider">
              <div>LAT {data.coordinates.lat}</div>
              <div>LON {data.coordinates.lon}</div>
              <div className="text-[#00F2FE] mt-0.5">ENCRYPTED</div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            LAYER 06: CORNER BRACKETS & HARDWARE ACCENTS (Z: 50px)
            ──────────────────────────────────────────────────────────── */}
        <div style={{ transform: isReduced ? "none" : "translateZ(50px)" }} className="pointer-events-none">
          {/* Top-left corner */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00F2FE]" />
          {/* Top-right corner */}
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00F2FE]" />
          {/* Bottom-left corner */}
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00F2FE]" />
          {/* Bottom-right corner */}
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00F2FE]" />
        </div>
      </div>
    </div>
  );
}
