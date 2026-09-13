export type CommandType = "mess" | "climate" | "maintenance" | "emergency";

export interface CommandData {
  id: CommandType;
  code: string;
  title: string;
  subtitle: string;
  color: string;
  accentHex: string;
  data: {
    heading: string;
    metrics: Array<{ label: string; value: string; status?: string }>;
    statusLabel: string;
    details?: string;
  };
}

export const NOVA_COMMANDS: Record<CommandType, CommandData> = {
  mess: {
    id: "mess",
    code: "[01]",
    title: "MESS & NUTRITION",
    subtitle: "AUTONOMOUS NUTRITION MATRIX",
    color: "cyan",
    accentHex: "#00F2FE",
    data: {
      heading: "NOVA // NUTRITION MATRIX",
      metrics: [
        { label: "BREAKFAST", value: "07:30 — HIGH PROTEIN / FRESH", status: "SERVED" },
        { label: "LUNCH", value: "13:00 — BALANCED ENERGY", status: "ACTIVE" },
        { label: "DINNER", value: "20:00 — LIGHT / RECOVERY", status: "SCHEDULED" },
      ],
      statusLabel: "NUTRITION STATUS: OPTIMAL",
      details: "Molecular caloric matching: 2,450 kcal balanced for cognitive endurance.",
    },
  },
  climate: {
    id: "climate",
    code: "[02]",
    title: "POD CLIMATE MATRIX",
    subtitle: "CIRCADIAN & BIOMETRIC ATMOSPHERE",
    color: "cyan",
    accentHex: "#00F2FE",
    data: {
      heading: "NOVA // POD ENVIRONMENT",
      metrics: [
        { label: "TEMPERATURE", value: "22.4°C", status: "CALIBRATED" },
        { label: "AIR PURITY", value: "98.8%", status: "OPTIMAL" },
        { label: "HUMIDITY", value: "46%", status: "BALANCED" },
        { label: "ACOUSTICS", value: "31 dB", status: "SILENT" },
      ],
      statusLabel: "POD BIOMETRICS: OPTIMAL",
      details: "Active acoustic cancellation enabled. Oxygen enrichment level at 21.4%.",
    },
  },
  maintenance: {
    id: "maintenance",
    code: "[03]",
    title: "MAINTENANCE DISPATCH",
    subtitle: "AUTONOMOUS REPAIR DRONES",
    color: "blue",
    accentHex: "#2B7FFF",
    data: {
      heading: "NOVA // DRONE TELEMETRY",
      metrics: [
        { label: "DISPATCHED UNIT", value: "DRONE DR-07", status: "IN TRANSIT" },
        { label: "TARGET SECTOR", value: "SECTOR 07 // LEVEL 28", status: "LOCKED" },
        { label: "ESTIMATED ARRIVAL", value: "02:14 MIN", status: "EN ROUTE" },
      ],
      statusLabel: "STATUS: DISPATCHED",
      details: "Diagnostic scan detected micro-variance in pod conduit 28-C. Autonomic patch scheduled.",
    },
  },
  emergency: {
    id: "emergency",
    code: "[04]",
    title: "EMERGENCY OVERRIDE",
    subtitle: "CALM SYSTEM FAILSAFE",
    color: "amber",
    accentHex: "#FF453A",
    data: {
      heading: "NOVA // EMERGENCY GRID ACTIVE",
      metrics: [
        { label: "MEDICAL BEACON", value: "ONLINE // SECTOR 07", status: "SYNCED" },
        { label: "EVACUATION VECTOR", value: "MAG-LEV CHUTE 02 READY", status: "OPEN" },
        { label: "SECURITY NETWORK", value: "AUTONOMOUS SHIELD ACTIVE", status: "SECURE" },
      ],
      statusLabel: "FAILSAFE STATUS: ALL SYSTEMS MONITORED",
      details: "Habitation integrity at 99.4%. Pressurized escape conduits pressurized on standby.",
    },
  },
};
