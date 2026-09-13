/**
 * HOSTEL-X — CITADEL INTELLIGENCE DATA ARCHITECTURE
 * Centralized fictional telemetry and systems instrumentation for the year 2088.
 * NOTE: Fictional world-building data for creative frontend demonstration.
 */

export interface SystemMetricItem {
  id: string;
  value: number;
  decimals: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  changeRate: string;
  status: "optimal" | "active" | "harvesting" | "stable";
}

export interface StatusRailItem {
  id: string;
  label: string;
  value: string;
  state: "active" | "optimal" | "nominal" | "locked";
  code: string;
}

export interface EnergyNode {
  id: string;
  name: string;
  output: string;
  efficiency: string;
  capacity: string;
  status: "optimal" | "active";
}

export interface EnergyTelemetryData {
  solarHarvest: { value: number; unit: string; label: string };
  gridLoad: { value: number; unit: string; label: string };
  storage: { value: number; unit: string; label: string };
  distribution: { value: number; unit: string; label: string };
  nodes: EnergyNode[];
  flowStages: { from: string; to: string; rate: string }[];
}

export interface AirTelemetryData {
  purity: { value: number; unit: string; label: string };
  co2: { value: number; unit: string; label: string };
  oxygen: { value: number; unit: string; label: string };
  filtration: { value: string; label: string };
  acoustic: { value: number; unit: string; label: string };
  historyPoints: number[];
  bioScrubbers: { id: string; sector: string; efficiency: string; status: string }[];
}

export interface HydroLoopStage {
  id: string;
  step: number;
  name: string;
  desc: string;
  flowRate: string;
  status: "optimal" | "recycling" | "purifying" | "stable";
}

export interface WaterTelemetryData {
  reclamation: { value: number; unit: string; label: string };
  purification: { value: string; label: string };
  reservoir: { value: number; unit: string; label: string };
  cycleStatus: { value: string; label: string };
  stages: HydroLoopStage[];
}

export interface DroneUnit {
  id: string;
  type: "inspection" | "repair" | "cleaning" | "emergency";
  status: "en_route" | "operating" | "standby";
  targetSector: string;
  targetLevel: string;
  battery: number;
}

export interface MaintenanceTelemetryData {
  totalDrones: number;
  breakdown: {
    inspection: number;
    repair: number;
    cleaning: number;
    emergency: number;
  };
  activeRoute: {
    origin: string;
    destinationSector: string;
    destinationLevel: string;
    assignedDrone: string;
    mission: string;
    etaSeconds: number;
    integrityStatus: string;
  };
  drones: DroneUnit[];
}

export interface StructuralPoint {
  id: string;
  zone: string;
  stressFactor: string;
  tolerance: string;
  status: "optimal" | "stable" | "nominal";
}

export interface StructuralTelemetryData {
  coreLoad: { value: number; unit: string; label: string };
  exoskeleton: { value: string; label: string };
  floorStress: { value: number; unit: string; label: string };
  podAnchors: { value: number; unit: string; label: string };
  skybridge: { value: string; label: string };
  points: StructuralPoint[];
}

export interface SpatialNodeData {
  id: "power" | "air" | "water" | "maintenance" | "structure";
  name: string;
  subsystem: string;
  floorLevel: string;
  xPercent: number; // For responsive orthographic HUD placement
  yPercent: number;
  primaryMetric: string;
  secondaryMetric: string;
  efficiency: string;
  status: string;
  description: string;
}

// ────────────────────────────────────────────────────────────
// 01. PRIMARY SYSTEM METRICS
// ────────────────────────────────────────────────────────────
export const SYSTEM_METRICS: SystemMetricItem[] = [
  {
    id: "metric-residents",
    value: 512,
    decimals: 0,
    label: "ACTIVE RESIDENT NODES",
    sublabel: "RESIDENTS",
    changeRate: "+12 INGRESS (24H)",
    status: "active",
  },
  {
    id: "metric-blocks",
    value: 8,
    decimals: 0,
    prefix: "0",
    label: "AUTONOMOUS HABITAT SECTORS",
    sublabel: "LIVING BLOCKS",
    changeRate: "100% OPERATIONAL",
    status: "optimal",
  },
  {
    id: "metric-health",
    value: 99.4,
    decimals: 1,
    suffix: "%",
    label: "SYSTEM INTEGRITY",
    sublabel: "NODE HEALTH",
    changeRate: "ZERO FAULT ANOMALIES",
    status: "stable",
  },
  {
    id: "metric-energy",
    value: 1.42,
    decimals: 2,
    suffix: " MW",
    label: "CURRENT ENERGY CAPTURE",
    sublabel: "SOLAR HARVEST",
    changeRate: "+0.18 MW SURPLUS PEAK",
    status: "harvesting",
  },
];

// ────────────────────────────────────────────────────────────
// 02. LIVE SYSTEM STATUS RAIL
// ────────────────────────────────────────────────────────────
export const SYSTEM_STATUS_RAIL: StatusRailItem[] = [
  { id: "core", label: "CORE", value: "ONLINE", state: "active", code: "CX-01" },
  { id: "air", label: "AIR", value: "OPTIMAL", state: "optimal", code: "AX-04" },
  { id: "water", label: "WATER", value: "RECYCLING", state: "active", code: "WX-09" },
  { id: "power", label: "POWER", value: "HARVESTING", state: "optimal", code: "PX-12" },
  { id: "fleet", label: "DRONE FLEET", value: "14 ACTIVE", state: "active", code: "DX-14" },
  { id: "load", label: "STRUCTURAL LOAD", value: "0.02%", state: "nominal", code: "SX-02" },
  { id: "perimeter", label: "PERIMETER", value: "LOCKED", state: "locked", code: "SEC-07" },
];

// ────────────────────────────────────────────────────────────
// 03. ENERGY MATRIX DATA
// ────────────────────────────────────────────────────────────
export const ENERGY_DATA: EnergyTelemetryData = {
  solarHarvest: { value: 1.42, unit: "MW", label: "SOLAR HARVEST" },
  gridLoad: { value: 0.86, unit: "MW", label: "GRID LOAD" },
  storage: { value: 78, unit: "%", label: "STORAGE BUFFER" },
  distribution: { value: 96.2, unit: "%", label: "DISTRIBUTION EFFICIENCY" },
  nodes: [
    { id: "alpha", name: "SOLAR ARRAY 01 [ALPHA]", output: "420 KW", efficiency: "96.4%", capacity: "450 KW", status: "optimal" },
    { id: "beta", name: "SOLAR ARRAY 02 [BETA]", output: "380 KW", efficiency: "94.8%", capacity: "400 KW", status: "optimal" },
    { id: "gamma", name: "SOLAR ARRAY 03 [GAMMA]", output: "310 KW", efficiency: "95.1%", capacity: "350 KW", status: "active" },
    { id: "delta", name: "SOLAR ARRAY 04 [DELTA]", output: "310 KW", efficiency: "93.9%", capacity: "350 KW", status: "active" },
  ],
  flowStages: [
    { from: "CITADEL PHOTOVOLTAIC SKIN", to: "SOLAR CONVERTERS", rate: "1.42 MW" },
    { from: "SOLAR CONVERTERS", to: "CENTRAL ENERGY CORE", rate: "1.38 MW" },
    { from: "CENTRAL ENERGY CORE", to: "HABITAT SECTORS 01-08", rate: "0.86 MW" },
    { from: "CENTRAL ENERGY CORE", to: "SOLID-STATE BUFFER", rate: "0.52 MW" },
  ],
};

// ────────────────────────────────────────────────────────────
// 04. ATMOSPHERIC INTELLIGENCE DATA
// ────────────────────────────────────────────────────────────
export const AIR_DATA: AirTelemetryData = {
  purity: { value: 99.4, unit: "%", label: "AIR PURITY" },
  co2: { value: 410, unit: "PPM", label: "CARBON DIOXIDE" },
  oxygen: { value: 20.9, unit: "%", label: "OXYGEN BALANCE" },
  filtration: { value: "ACTIVE", label: "BIO-FILTRATION" },
  acoustic: { value: 31, unit: "DB", label: "ACOUSTIC FIELD" },
  historyPoints: [98.8, 99.1, 99.0, 99.3, 99.2, 99.4, 99.4, 99.5, 99.3, 99.4, 99.6, 99.4],
  bioScrubbers: [
    { id: "BS-01", sector: "SECTOR 01 [CORE SPINE]", efficiency: "99.8%", status: "OPTIMAL" },
    { id: "BS-02", sector: "SECTOR 07 [SKYBRIDGE]", efficiency: "99.4%", status: "ACTIVE" },
    { id: "BS-03", sector: "SECTOR 04 [LIVING PODS]", efficiency: "99.2%", status: "ACTIVE" },
    { id: "BS-04", sector: "SECTOR 08 [ATRIUM]", efficiency: "99.6%", status: "OPTIMAL" },
  ],
};

// ────────────────────────────────────────────────────────────
// 05. WATER RECLAMATION (HYDRO LOOP) DATA
// ────────────────────────────────────────────────────────────
export const WATER_DATA: WaterTelemetryData = {
  reclamation: { value: 99.4, unit: "%", label: "RECLAMATION RATE" },
  purification: { value: "ACTIVE", label: "PURIFICATION MATRIX" },
  reservoir: { value: 72, unit: "%", label: "RESERVOIR LEVEL" },
  cycleStatus: { value: "STABLE", label: "CLOSED CYCLE STATUS" },
  stages: [
    { id: "stage-1", step: 1, name: "COLLECTION", desc: "Atmospheric condensers & greywater reclamation channels", flowRate: "8,400 L/h", status: "recycling" },
    { id: "stage-2", step: 2, name: "PURIFICATION", desc: "Graphene nano-filtration & catalytic oxidation matrix", flowRate: "8,380 L/h", status: "purifying" },
    { id: "stage-3", step: 3, name: "RECLAMATION", desc: "Mineral remounting & electrolytic balancing protocol", flowRate: "8,360 L/h", status: "optimal" },
    { id: "stage-4", step: 4, name: "RESERVOIR", desc: "Pressurized subterranean vacuum storage tanks (72%)", flowRate: "62,000 L CAP", status: "stable" },
    { id: "stage-5", step: 5, name: "DISTRIBUTION", desc: "Smart closed-loop micro-hydro conduit to all living pods", flowRate: "7,950 L/h", status: "optimal" },
  ],
};

// ────────────────────────────────────────────────────────────
// 06. AUTONOMOUS MAINTENANCE NETWORK DATA
// ────────────────────────────────────────────────────────────
export const MAINTENANCE_DATA: MaintenanceTelemetryData = {
  totalDrones: 14,
  breakdown: {
    inspection: 3,
    repair: 5,
    cleaning: 4,
    emergency: 2,
  },
  activeRoute: {
    origin: "DRONE HUB 01 [BASE]",
    destinationSector: "SECTOR 07",
    destinationLevel: "LEVEL 28",
    assignedDrone: "DRONE-09 [REPAIR]",
    mission: "SKYBRIDGE JOINT MICRO-CALIBRATION",
    etaSeconds: 42,
    integrityStatus: "ROUTE CLEAR // VELOCITY 14 M/S",
  },
  drones: [
    { id: "DR-01", type: "inspection", status: "operating", targetSector: "SECTOR 02", targetLevel: "LVL 14", battery: 94 },
    { id: "DR-02", type: "inspection", status: "operating", targetSector: "SECTOR 05", targetLevel: "LVL 42", battery: 88 },
    { id: "DR-03", type: "inspection", status: "standby", targetSector: "HANGAR", targetLevel: "LVL 01", battery: 100 },
    { id: "DR-04", type: "repair", status: "operating", targetSector: "SECTOR 03", targetLevel: "LVL 08", battery: 76 },
    { id: "DR-05", type: "repair", status: "en_route", targetSector: "SECTOR 07", targetLevel: "LVL 28", battery: 92 },
    { id: "DR-06", type: "repair", status: "operating", targetSector: "CORE", targetLevel: "LVL 20", battery: 81 },
    { id: "DR-07", type: "repair", status: "standby", targetSector: "HANGAR", targetLevel: "LVL 01", battery: 100 },
    { id: "DR-08", type: "repair", status: "operating", targetSector: "SECTOR 08", targetLevel: "LVL 35", battery: 69 },
    { id: "DR-09", type: "cleaning", status: "operating", targetSector: "SECTOR 01", targetLevel: "LVL 18", battery: 85 },
    { id: "DR-10", type: "cleaning", status: "operating", targetSector: "SECTOR 06", targetLevel: "LVL 12", battery: 90 },
    { id: "DR-11", type: "cleaning", status: "operating", targetSector: "SECTOR 04", targetLevel: "LVL 24", battery: 72 },
    { id: "DR-12", type: "cleaning", status: "standby", targetSector: "HANGAR", targetLevel: "LVL 01", battery: 100 },
    { id: "DR-13", type: "emergency", status: "standby", targetSector: "RESERVE DOCK", targetLevel: "LVL 40", battery: 100 },
    { id: "DR-14", type: "emergency", status: "standby", targetSector: "RESERVE DOCK", targetLevel: "LVL 02", battery: 100 },
  ],
};

// ────────────────────────────────────────────────────────────
// 07. STRUCTURAL INTEGRITY DATA
// ────────────────────────────────────────────────────────────
export const STRUCTURAL_DATA: StructuralTelemetryData = {
  coreLoad: { value: 0.02, unit: "%", label: "CORE LOAD RATIO" },
  exoskeleton: { value: "OPTIMAL", label: "EXOSKELETON STATE" },
  floorStress: { value: 0.01, unit: "%", label: "MAX FLOOR STRESS" },
  podAnchors: { value: 100, unit: "%", label: "POD ANCHOR INTEGRITY" },
  skybridge: { value: "STABLE", label: "SKYBRIDGE RESONANCE" },
  points: [
    { id: "SP-01", zone: "PRIMARY PYLON 01 [NORTH]", stressFactor: "0.018%", tolerance: "0.850%", status: "optimal" },
    { id: "SP-02", zone: "PRIMARY PYLON 02 [SOUTH]", stressFactor: "0.021%", tolerance: "0.850%", status: "optimal" },
    { id: "SP-03", zone: "SECTOR 07 CANTILEVER TRUSS", stressFactor: "0.034%", tolerance: "0.600%", status: "stable" },
    { id: "SP-04", zone: "APEX STABILIZER GYRO", stressFactor: "0.009%", tolerance: "0.500%", status: "optimal" },
    { id: "SP-05", zone: "SUBTERRANEAN ANCHOR GRID", stressFactor: "0.014%", tolerance: "1.200%", status: "optimal" },
  ],
};

// ────────────────────────────────────────────────────────────
// 08. INTERACTIVE SPATIAL TELEMETRY NODES
// ────────────────────────────────────────────────────────────
export const SPATIAL_NODES: SpatialNodeData[] = [
  {
    id: "power",
    name: "SOLAR ARRAY 04 [DELTA]",
    subsystem: "POWER TELEMETRY",
    floorLevel: "LEVEL 42 // APEX HARVEST",
    xPercent: 78,
    yPercent: 18,
    primaryMetric: "312 KW",
    secondaryMetric: "EFFICIENCY 94.8%",
    efficiency: "94.8%",
    status: "OPTIMAL",
    description: "High-yield photovoltaic perimeter collector delivering continuous low-loss transmission into core buffer.",
  },
  {
    id: "air",
    name: "BIO-SCRUBBER ARRAY 02",
    subsystem: "ATMOSPHERIC INTELLIGENCE",
    floorLevel: "LEVEL 28 // SECTOR 07",
    xPercent: 24,
    yPercent: 44,
    primaryMetric: "14,200 M³/H",
    secondaryMetric: "PURITY 99.4%",
    efficiency: "99.4%",
    status: "ACTIVE",
    description: "Multi-chamber catalytic air treatment removing particulates, balancing oxygen ratios, and damping acoustic resonance.",
  },
  {
    id: "water",
    name: "HYDRO RECYCLING CORE",
    subsystem: "WATER RECLAMATION",
    floorLevel: "LEVEL 14 // RECLAMATION SPINE",
    xPercent: 72,
    yPercent: 62,
    primaryMetric: "8,380 L/H",
    secondaryMetric: "PURIFICATION 99.4%",
    efficiency: "99.4%",
    status: "STABLE",
    description: "Closed-loop graphene membrane purification recycling 99.4% of all resident greywater into pristine drinking standards.",
  },
  {
    id: "maintenance",
    name: "DRONE HUB 07 [FLEET DISPATCH]",
    subsystem: "AUTONOMOUS FLEET",
    floorLevel: "LEVEL 28 // SKYBRIDGE",
    xPercent: 32,
    yPercent: 32,
    primaryMetric: "14 ACTIVE DRONES",
    secondaryMetric: "DRONE-09 EN ROUTE",
    efficiency: "100%",
    status: "IN PROGRESS",
    description: "Automated autonomous drone deployment hub conducting micro-inspections and rapid maintenance across all 8 sectors.",
  },
  {
    id: "structure",
    name: "PRIMARY EXOSKELETON PYLON 01",
    subsystem: "STRUCTURAL TELEMETRY",
    floorLevel: "LEVEL 01 // FOUNDATION CORE",
    xPercent: 50,
    yPercent: 82,
    primaryMetric: "LOAD 0.02%",
    secondaryMetric: "TENSION NOMINAL",
    efficiency: "100%",
    status: "NOMINAL",
    description: "Carbon-nanotube reinforced brutalist pylon with fiber-optic strain gauges continuously logging seismic and thermal stresses.",
  },
];
