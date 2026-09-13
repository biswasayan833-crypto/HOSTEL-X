// ============================================================================
// HOSTEL-X — Phase 7: Holographic Access Pass & Credential Data
// Centralized mock data structures, cryptographic parameters, and scan states.
// ============================================================================

export type ScanStatus = "idle" | "scanning" | "verified" | "granted";

export interface ResidentCredential {
  organization: string;
  credentialTitle: string;
  accessId: string;
  residentName: string;
  discipline: string;
  sector: string;
  level: string;
  podId: string;
  accessClass: string;
  status: string;
  validity: string;
  clearanceLevel: string;
  bioSyncRate: string;
  neuralFrequency: string;
  cryptographicHash: string;
  coordinates: {
    lat: string;
    lon: string;
  };
  securityAttributes: {
    label: string;
    value: string;
    state: "optimal" | "active" | "secured";
  }[];
}

export const RESIDENT_CREDENTIAL_DATA: ResidentCredential = {
  organization: "HOSTEL-X",
  credentialTitle: "RESIDENT CREDENTIAL",
  accessId: "HX-2088-014",
  residentName: "DR. AYA LIN",
  discipline: "NEURO-SPATIAL TOPOLOGY",
  sector: "07",
  level: "28",
  podId: "POD 28-B // SECTOR 07",
  accessClass: "RESIDENT // TIER 01",
  status: "VERIFIED",
  validity: "2088 → ∞",
  clearanceLevel: "LEVEL 04 (FULL BIOPOD & LAB CLEARANCE)",
  bioSyncRate: "99.8%",
  neuralFrequency: "142.8 GHz",
  cryptographicHash: "0x7F4A:09E1:BC88:A912",
  coordinates: {
    lat: "12.9716° N",
    lon: "77.5946° E",
  },
  securityAttributes: [
    { label: "HABITAT PERIMETER", value: "SECTOR 07 AUTHORIZED", state: "secured" },
    { label: "NEURAL COGNITION", value: "CIRCADIAN HARMONIZED", state: "optimal" },
    { label: "BIOPOD CONDUIT", value: "LEVEL 28 LINK ACTIVE", state: "active" },
    { label: "ORBITAL COMMS", value: "ENCRYPTED FREQ 142.8", state: "secured" },
  ],
};

export interface ScanTelemetryStep {
  percent: number;
  label: string;
  detail: string;
}

export const SCAN_TELEMETRY_STEPS: ScanTelemetryStep[] = [
  { percent: 18, label: "INITIATING OPTICAL RETICLE", detail: "CALIBRATING QUANTUM SENSORS..." },
  { percent: 42, label: "READING BIOMETRIC FREQUENCY", detail: "NEURAL HARMONICS MATCHED (142.8 GHz)" },
  { percent: 74, label: "VALIDATING CRYPTO HASH", detail: "DECRYPTING KEY 0x7F4A...09E1" },
  { percent: 93, label: "SYNCHRONIZING SECTOR 07 MESH", detail: "POD 28-B HANDSHAKE CONFIRMED" },
  { percent: 100, label: "AUTHORIZATION SECURED", detail: "RESIDENT ACCESS FULLY GRANTED" },
];
