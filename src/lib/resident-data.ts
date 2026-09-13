/**
 * HOSTEL-X — THE RESIDENT COLLECTIVE DATA ARCHITECTURE
 * Centralized fictional resident network, collaboration pathways, research divisions,
 * and collective telemetry for the year 2088.
 * NOTE: Fictional world-building data for creative frontend demonstration.
 */

export type DivisionId =
  | "human_systems"
  | "robotics"
  | "climate_arch"
  | "computational"
  | "bioengineering"
  | "social_intel";

export type ResidentActivity =
  | "RESEARCH"
  | "COLLABORATION"
  | "REST"
  | "SOCIAL"
  | "MOBILITY"
  | "FOCUS";

export interface ResidentNodeData {
  id: string;
  name: string;
  discipline: string;
  sector: string;
  level: string;
  elevationTier: 7 | 14 | 28 | 42 | 48; // Maps directly to Citadel vertical floors
  status: "ACTIVE" | "SYNCHRONIZED" | "COLLABORATING" | "DEEP FOCUS";
  activity: string;
  activityType: ResidentActivity;
  research: string;
  divisionId: DivisionId;
  connections: string[]; // Connected resident IDs
  xPercent: number; // For responsive orthographic HUD layout (0-100)
  yPercent: number; // For responsive orthographic HUD layout (0-100)
  bioSignal: string;
  hardwareAnchor: string;
}

export interface NetworkConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: "RESEARCH" | "COLLABORATION" | "INFRASTRUCTURE" | "SHARED_SPACE";
  flowRate: string;
}

export interface CollectiveMetricItem {
  id: string;
  value: number;
  decimals: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  changeRate: string;
}

export interface ResearchDivision {
  id: DivisionId;
  code: string;
  name: string;
  nodeCount: number;
  collaborativeProjects: number;
  sectors: string;
  description: string;
  leadDisciplines: string[];
}

export interface ActiveCollaboration {
  id: string;
  primaryResidentId: string;
  partnerResidentId: string;
  projectName: string;
  disciplines: [string, string];
  location: string;
  status: "ACTIVE" | "SYNCHRONIZING" | "FINALIZING";
  summary: string;
  bandwidth: string;
}

export interface CollectiveSpace {
  id: string;
  name: string;
  sector: string;
  level: string;
  activeResidents: number;
  capacity: number;
  purpose: string;
  currentAtmosphere: string;
}

// ────────────────────────────────────────────────────────────
// 01. PRIMARY COLLECTIVE METRICS
// ────────────────────────────────────────────────────────────
export const COLLECTIVE_METRICS: CollectiveMetricItem[] = [
  {
    id: "metric-nodes",
    value: 512,
    decimals: 0,
    label: "ACTIVE RESIDENT NODES",
    sublabel: "CONNECTED HUMANS",
    changeRate: "100% NEURAL SYNCHRONY",
  },
  {
    id: "metric-divisions",
    value: 12,
    decimals: 0,
    prefix: "0",
    label: "RESEARCH DIVISIONS",
    sublabel: "DISCIPLINE MATRICES",
    changeRate: "CROSS-POLLINATING",
  },
  {
    id: "metric-collabs",
    value: 87,
    decimals: 0,
    label: "ACTIVE COLLABORATIONS",
    sublabel: "SHARED SYNERGIES",
    changeRate: "+9 FORMING TODAY",
  },
  {
    id: "metric-projects",
    value: 43,
    decimals: 0,
    label: "SHARED PROJECTS",
    sublabel: "HABITAT INITIATIVES",
    changeRate: "14 IN ORBITAL REVIEW",
  },
];

// ────────────────────────────────────────────────────────────
// 02. RESEARCH DIVISIONS (6 STRATEGIC CLUSTERS)
// ────────────────────────────────────────────────────────────
export const RESEARCH_DIVISIONS: ResearchDivision[] = [
  {
    id: "human_systems",
    code: "01 // HUMAN SYSTEMS",
    name: "HUMAN SYSTEMS & COGNITION",
    nodeCount: 22,
    collaborativeProjects: 8,
    sectors: "SECTOR 07 / 28",
    description: "Bio-adaptive human interfaces, cognitive workload damping, and circadian neural equilibrium.",
    leadDisciplines: ["Computational Biology", "Cognitive Science", "Neural Interfaces"],
  },
  {
    id: "robotics",
    code: "02 // ROBOTICS",
    name: "AUTONOMOUS ROBOTICS & SWARMS",
    nodeCount: 18,
    collaborativeProjects: 7,
    sectors: "SECTOR 03 / 07 / 28",
    description: "Kinetic maintenance drones, autonomous habitat actuation, and robotic assistance swarms.",
    leadDisciplines: ["Robotics Engineering", "Mechatronics", "Spatial Scheduling"],
  },
  {
    id: "climate_arch",
    code: "03 // CLIMATE ARCHITECTURE",
    name: "CLIMATE ARCHITECTURE & ENVELOPES",
    nodeCount: 16,
    collaborativeProjects: 6,
    sectors: "SECTOR 08 / 19 / 42",
    description: "Living structural membranes, micro-climate envelopes, and passive vertical thermodynamic chimneys.",
    leadDisciplines: ["Synthetic Architecture", "Climate Systems", "Thermal Dynamics"],
  },
  {
    id: "computational",
    code: "04 // COMPUTATIONAL SCIENCE",
    name: "COMPUTATIONAL SCIENCE & QUANTUM",
    nodeCount: 20,
    collaborativeProjects: 9,
    sectors: "SECTOR 01 / 07 / 35",
    description: "Quantum spatial scheduling, habitat neural telemetry routing, and zero-latency resident mesh.",
    leadDisciplines: ["Quantum Computing", "Algorithmic Ecology", "Spatial Analytics"],
  },
  {
    id: "bioengineering",
    code: "05 // BIOENGINEERING",
    name: "BIOENGINEERING & CLOSED HYDRO",
    nodeCount: 17,
    collaborativeProjects: 7,
    sectors: "SECTOR 06 / 14 / 28",
    description: "Atmospheric bio-scrubbers, closed-circuit graphene water recycling, and cellular nutrition synthesis.",
    leadDisciplines: ["Bioengineering", "Cellular Agriculture", "Micro-Fluidics"],
  },
  {
    id: "social_intel",
    code: "06 // SOCIAL INTELLIGENCE",
    name: "SOCIAL INTELLIGENCE & ATRIUM",
    nodeCount: 19,
    collaborativeProjects: 6,
    sectors: "SECTOR 04 / 08 / 14",
    description: "Dynamic kinetic atrium geometry, communal friction elimination, and collective human resonance.",
    leadDisciplines: ["Urban Ecology", "Human Performance", "Communal Dynamics"],
  },
];

// ────────────────────────────────────────────────────────────
// 03. 20 FICTIONAL RESIDENT NODES (DISTRIBUTED ACROSS HABITAT TIERS)
// ────────────────────────────────────────────────────────────
export const RESIDENT_NODES: ResidentNodeData[] = [
  {
    id: "AYA-014",
    name: "AYA-014",
    discipline: "COMPUTATIONAL BIOLOGY",
    sector: "SECTOR 07",
    level: "LEVEL 28",
    elevationTier: 28,
    status: "ACTIVE",
    activity: "BIO-RESONANCE LAB",
    activityType: "RESEARCH",
    research: "Adaptive Human Systems & Cognitive Resilience",
    divisionId: "human_systems",
    connections: ["KAI-031", "ELI-203", "REN-045", "ARIA-091"],
    xPercent: 32,
    yPercent: 46,
    bioSignal: "98.8 BPM // CALM",
    hardwareAnchor: "POD-07-28A",
  },
  {
    id: "KAI-031",
    name: "KAI-031",
    discipline: "ROBOTICS ENGINEERING",
    sector: "SECTOR 12",
    level: "LEVEL 28",
    elevationTier: 28,
    status: "COLLABORATING",
    activity: "KINETIC MECHATRONICS",
    activityType: "COLLABORATION",
    research: "Autonomous Swarm Maintenance & Drone Aerodynamics",
    divisionId: "robotics",
    connections: ["AYA-014", "MIRA-084", "DEV-142"],
    xPercent: 44,
    yPercent: 42,
    bioSignal: "102 BPM // ACTIVE",
    hardwareAnchor: "POD-12-28C",
  },
  {
    id: "MIRA-084",
    name: "MIRA-084",
    discipline: "SYNTHETIC ARCHITECTURE",
    sector: "SECTOR 03",
    level: "LEVEL 14",
    elevationTier: 14,
    status: "ACTIVE",
    activity: "PARAMETRIC DESIGN STUDIO",
    activityType: "RESEARCH",
    research: "Living Structural Membranes & Cantilever Resilience",
    divisionId: "climate_arch",
    connections: ["KAI-031", "NOAH-117", "CHLOE-033"],
    xPercent: 62,
    yPercent: 64,
    bioSignal: "82 BPM // EQUILIBRIUM",
    hardwareAnchor: "POD-03-14B",
  },
  {
    id: "NOAH-117",
    name: "NOAH-117",
    discipline: "CLIMATE SYSTEMS",
    sector: "SECTOR 19",
    level: "LEVEL 42",
    elevationTier: 42,
    status: "DEEP FOCUS",
    activity: "ATMOSPHERIC CHAMBER",
    activityType: "FOCUS",
    research: "Closed-Loop Microclimate Envelopes & Thermal Spines",
    divisionId: "climate_arch",
    connections: ["MIRA-084", "ELI-203", "LEO-077", "FINN-164"],
    xPercent: 26,
    yPercent: 24,
    bioSignal: "74 BPM // DEEP REST",
    hardwareAnchor: "POD-19-42E",
  },
  {
    id: "ELI-203",
    name: "ELI-203",
    discipline: "COGNITIVE SCIENCE",
    sector: "SECTOR 28",
    level: "LEVEL 35",
    elevationTier: 28,
    status: "ACTIVE",
    activity: "NEURO-ACOUSTIC SUITE",
    activityType: "RESEARCH",
    research: "Circadian Neural Equilibrium & Sensory Damping",
    divisionId: "human_systems",
    connections: ["AYA-014", "NOAH-117", "YUKI-088"],
    xPercent: 70,
    yPercent: 36,
    bioSignal: "79 BPM // OPTIMAL",
    hardwareAnchor: "POD-28-35A",
  },
  {
    id: "REN-045",
    name: "REN-045",
    discipline: "NEURAL INTERFACES",
    sector: "SECTOR 07",
    level: "LEVEL 28",
    elevationTier: 28,
    status: "SYNCHRONIZED",
    activity: "SYNAPTIC MESH LAB",
    activityType: "RESEARCH",
    research: "Direct Habitat Telemetry Link & Non-Invasive BCI",
    divisionId: "human_systems",
    connections: ["AYA-014", "TAI-109", "ELENA-126"],
    xPercent: 38,
    yPercent: 52,
    bioSignal: "88 BPM // ALPHA-WAVE",
    hardwareAnchor: "POD-07-28D",
  },
  {
    id: "TAI-109",
    name: "TAI-109",
    discipline: "QUANTUM COMPUTING",
    sector: "SECTOR 01",
    level: "LEVEL 07",
    elevationTier: 7,
    status: "ACTIVE",
    activity: "QUANTUM CORE NODE",
    activityType: "RESEARCH",
    research: "Spatial Scheduling Algorithms & Predictive Logistics",
    divisionId: "computational",
    connections: ["REN-045", "ZANE-190", "LUCAS-059"],
    xPercent: 48,
    yPercent: 82,
    bioSignal: "76 BPM // SYNCHRONOUS",
    hardwareAnchor: "POD-01-07B",
  },
  {
    id: "SORA-062",
    name: "SORA-062",
    discipline: "URBAN ECOLOGY",
    sector: "SECTOR 08",
    level: "LEVEL 14",
    elevationTier: 14,
    status: "COLLABORATING",
    activity: "KINETIC ATRIUM GARDENS",
    activityType: "SOCIAL",
    research: "Vertical Canopy Symbiosis & Bio-Filtration",
    divisionId: "social_intel",
    connections: ["MIRA-084", "ISLA-155", "NINA-210"],
    xPercent: 78,
    yPercent: 68,
    bioSignal: "84 BPM // RELAXED",
    hardwareAnchor: "POD-08-14A",
  },
  {
    id: "ZANE-190",
    name: "ZANE-190",
    discipline: "MATERIAL SCIENCE",
    sector: "SECTOR 02",
    level: "LEVEL 07",
    elevationTier: 7,
    status: "ACTIVE",
    activity: "NANOTUBE FOUNDRY",
    activityType: "RESEARCH",
    research: "Self-Healing Pylon Composites & Carbon Exoskeletons",
    divisionId: "robotics",
    connections: ["TAI-109", "DEV-142"],
    xPercent: 22,
    yPercent: 86,
    bioSignal: "89 BPM // ALERT",
    hardwareAnchor: "POD-02-07F",
  },
  {
    id: "LEO-077",
    name: "LEO-077",
    discipline: "ENERGY SYSTEMS",
    sector: "SECTOR 04",
    level: "LEVEL 42",
    elevationTier: 42,
    status: "ACTIVE",
    activity: "PHOTOVOLTAIC DECK",
    activityType: "RESEARCH",
    research: "Superconductive Resonance Tuning & High-Yield Solar",
    divisionId: "climate_arch",
    connections: ["NOAH-117", "FINN-164"],
    xPercent: 74,
    yPercent: 20,
    bioSignal: "91 BPM // STABLE",
    hardwareAnchor: "POD-04-42C",
  },
  {
    id: "ISLA-155",
    name: "ISLA-155",
    discipline: "FOOD SYSTEMS",
    sector: "SECTOR 06",
    level: "LEVEL 14",
    elevationTier: 14,
    status: "ACTIVE",
    activity: "CELLULAR AGRICULTURE VAULT",
    activityType: "RESEARCH",
    research: "Nutrient-Dense Synthetic Flora & Molecular Gastronomy",
    divisionId: "bioengineering",
    connections: ["SORA-062", "ARIA-091"],
    xPercent: 18,
    yPercent: 66,
    bioSignal: "78 BPM // BALANCED",
    hardwareAnchor: "POD-06-14A",
  },
  {
    id: "MAX-028",
    name: "MAX-028",
    discipline: "HUMAN PERFORMANCE",
    sector: "SECTOR 05",
    level: "LEVEL 28",
    elevationTier: 28,
    status: "ACTIVE",
    activity: "BIOMETRIC CONDITIONING DECK",
    activityType: "MOBILITY",
    research: "Gravity-Neutral Muscle Optimization & Sleep Metrics",
    divisionId: "social_intel",
    connections: ["AYA-014", "CHLOE-033"],
    xPercent: 54,
    yPercent: 48,
    bioSignal: "115 BPM // INTENSIVE",
    hardwareAnchor: "POD-05-28B",
  },
  {
    id: "ARIA-091",
    name: "ARIA-091",
    discipline: "COMPUTATIONAL BIOLOGY",
    sector: "SECTOR 07",
    level: "LEVEL 35",
    elevationTier: 42,
    status: "ACTIVE",
    activity: "MOLECULAR GENETICS DECK",
    activityType: "RESEARCH",
    research: "Immune Homeostasis in Closed Habitats",
    divisionId: "human_systems",
    connections: ["AYA-014", "ISLA-155"],
    xPercent: 42,
    yPercent: 28,
    bioSignal: "80 BPM // OPTIMAL",
    hardwareAnchor: "POD-07-35C",
  },
  {
    id: "DEV-142",
    name: "DEV-142",
    discipline: "ROBOTICS ENGINEERING",
    sector: "SECTOR 12",
    level: "LEVEL 14",
    elevationTier: 14,
    status: "COLLABORATING",
    activity: "DRONE HANGAR ALPHA",
    activityType: "COLLABORATION",
    research: "Micro-Aerial Precision Repairs & Kinetic Grippers",
    divisionId: "robotics",
    connections: ["KAI-031", "ZANE-190"],
    xPercent: 84,
    yPercent: 58,
    bioSignal: "94 BPM // ACTIVE",
    hardwareAnchor: "POD-12-14D",
  },
  {
    id: "CHLOE-033",
    name: "CHLOE-033",
    discipline: "SYNTHETIC ARCHITECTURE",
    sector: "SECTOR 03",
    level: "LEVEL 28",
    elevationTier: 28,
    status: "ACTIVE",
    activity: "SKYBRIDGE ENGINEERING",
    activityType: "RESEARCH",
    research: "Cantilever Harmonic Dampers & Aero-Elastic Facades",
    divisionId: "climate_arch",
    connections: ["MIRA-084", "MAX-028"],
    xPercent: 16,
    yPercent: 44,
    bioSignal: "86 BPM // CALM",
    hardwareAnchor: "POD-03-28E",
  },
  {
    id: "YUKI-088",
    name: "YUKI-088",
    discipline: "COGNITIVE SCIENCE",
    sector: "SECTOR 28",
    level: "LEVEL 42",
    elevationTier: 42,
    status: "DEEP FOCUS",
    activity: "COGNITIVE LOAD SUITE",
    activityType: "FOCUS",
    research: "Frictionless Human-Machine Symbiosis",
    divisionId: "human_systems",
    connections: ["ELI-203", "ELENA-126"],
    xPercent: 58,
    yPercent: 18,
    bioSignal: "72 BPM // RESTFUL",
    hardwareAnchor: "POD-28-42A",
  },
  {
    id: "FINN-164",
    name: "FINN-164",
    discipline: "CLIMATE SYSTEMS",
    sector: "SECTOR 19",
    level: "LEVEL 14",
    elevationTier: 14,
    status: "ACTIVE",
    activity: "CATALYTIC SCRUBBING",
    activityType: "RESEARCH",
    research: "Nanotube Carbon Fixation & Clean Air Dynamics",
    divisionId: "climate_arch",
    connections: ["NOAH-117", "LEO-077"],
    xPercent: 36,
    yPercent: 72,
    bioSignal: "85 BPM // NOMINAL",
    hardwareAnchor: "POD-19-14C",
  },
  {
    id: "NINA-210",
    name: "NINA-210",
    discipline: "URBAN ECOLOGY",
    sector: "SECTOR 08",
    level: "LEVEL 28",
    elevationTier: 28,
    status: "ACTIVE",
    activity: "ACOUSTIC BOTANICAL SPINE",
    activityType: "RESEARCH",
    research: "Acoustic Vegetation Matrices for Living Blocks",
    divisionId: "social_intel",
    connections: ["SORA-062"],
    xPercent: 66,
    yPercent: 50,
    bioSignal: "81 BPM // PEACEFUL",
    hardwareAnchor: "POD-08-28F",
  },
  {
    id: "LUCAS-059",
    name: "LUCAS-059",
    discipline: "QUANTUM COMPUTING",
    sector: "SECTOR 01",
    level: "LEVEL 35",
    elevationTier: 42,
    status: "ACTIVE",
    activity: "CRYPTOGRAPHIC MESH",
    activityType: "RESEARCH",
    research: "Zero-Latency Resident Auth & Biometric Key Distribution",
    divisionId: "computational",
    connections: ["TAI-109"],
    xPercent: 82,
    yPercent: 30,
    bioSignal: "87 BPM // FOCUSED",
    hardwareAnchor: "POD-01-35B",
  },
  {
    id: "ELENA-126",
    name: "ELENA-126",
    discipline: "NEURAL INTERFACES",
    sector: "SECTOR 07",
    level: "LEVEL 42",
    elevationTier: 48,
    status: "SYNCHRONIZED",
    activity: "APEX NEURAL CANOPY",
    activityType: "RESEARCH",
    research: "Collective Sleep Optimization & Circadian Sync",
    divisionId: "human_systems",
    connections: ["REN-045", "YUKI-088"],
    xPercent: 50,
    yPercent: 12,
    bioSignal: "68 BPM // SYNCHRONIZED",
    hardwareAnchor: "POD-07-48A",
  },
];

// ────────────────────────────────────────────────────────────
// 04. NETWORK CONNECTIONS BETWEEN RESIDENTS
// ────────────────────────────────────────────────────────────
export const NETWORK_CONNECTIONS: NetworkConnection[] = [
  { id: "conn-1", sourceId: "AYA-014", targetId: "KAI-031", type: "COLLABORATION", flowRate: "12.4 GB/s" },
  { id: "conn-2", sourceId: "KAI-031", targetId: "MIRA-084", type: "COLLABORATION", flowRate: "8.6 GB/s" },
  { id: "conn-3", sourceId: "MIRA-084", targetId: "NOAH-117", type: "RESEARCH", flowRate: "14.2 GB/s" },
  { id: "conn-4", sourceId: "NOAH-117", targetId: "ELI-203", type: "RESEARCH", flowRate: "6.8 GB/s" },
  { id: "conn-5", sourceId: "ELI-203", targetId: "AYA-014", type: "COLLABORATION", flowRate: "18.0 GB/s" },
  { id: "conn-6", sourceId: "AYA-014", targetId: "REN-045", type: "RESEARCH", flowRate: "24.5 GB/s" },
  { id: "conn-7", sourceId: "REN-045", targetId: "TAI-109", type: "INFRASTRUCTURE", flowRate: "40.0 GB/s" },
  { id: "conn-8", sourceId: "MIRA-084", targetId: "SORA-062", type: "SHARED_SPACE", flowRate: "4.2 GB/s" },
  { id: "conn-9", sourceId: "TAI-109", targetId: "ZANE-190", type: "RESEARCH", flowRate: "9.1 GB/s" },
  { id: "conn-10", sourceId: "NOAH-117", targetId: "LEO-077", type: "INFRASTRUCTURE", flowRate: "32.0 GB/s" },
  { id: "conn-11", sourceId: "SORA-062", targetId: "ISLA-155", type: "SHARED_SPACE", flowRate: "5.5 GB/s" },
  { id: "conn-12", sourceId: "AYA-014", targetId: "MAX-028", type: "COLLABORATION", flowRate: "11.2 GB/s" },
  { id: "conn-13", sourceId: "KAI-031", targetId: "DEV-142", type: "COLLABORATION", flowRate: "28.4 GB/s" },
  { id: "conn-14", sourceId: "MIRA-084", targetId: "CHLOE-033", type: "RESEARCH", flowRate: "16.8 GB/s" },
  { id: "conn-15", sourceId: "ELI-203", targetId: "YUKI-088", type: "RESEARCH", flowRate: "19.5 GB/s" },
  { id: "conn-16", sourceId: "REN-045", targetId: "ELENA-126", type: "INFRASTRUCTURE", flowRate: "36.0 GB/s" },
  { id: "conn-17", sourceId: "TAI-109", targetId: "LUCAS-059", type: "RESEARCH", flowRate: "22.8 GB/s" },
  { id: "conn-18", sourceId: "SORA-062", targetId: "NINA-210", type: "SHARED_SPACE", flowRate: "7.0 GB/s" },
];

// ────────────────────────────────────────────────────────────
// 05. ACTIVE FEATURED COLLABORATIONS
// ────────────────────────────────────────────────────────────
export const ACTIVE_COLLABORATIONS: ActiveCollaboration[] = [
  {
    id: "collab-bio-robotics",
    primaryResidentId: "AYA-014",
    partnerResidentId: "KAI-031",
    projectName: "BIO-ADAPTIVE ROBOTIC INTERFACES",
    disciplines: ["COMPUTATIONAL BIOLOGY", "ROBOTICS ENGINEERING"],
    location: "SECTOR 07 // LEVEL 28 SKYBRIDGE",
    status: "ACTIVE",
    summary: "Developing non-intrusive neural feedback channels connecting human pod occupant biometrics directly to autonomous habitat micro-drones.",
    bandwidth: "12.4 GB/S SYNCHRONIZED",
  },
  {
    id: "collab-living-facades",
    primaryResidentId: "MIRA-084",
    partnerResidentId: "NOAH-117",
    projectName: "KINETIC MICRO-CLIMATE ENVELOPES",
    disciplines: ["SYNTHETIC ARCHITECTURE", "CLIMATE SYSTEMS"],
    location: "SECTOR 03 // LEVEL 14 ATRIUM",
    status: "ACTIVE",
    summary: "Engineering responsive carbon louvers that modulate passive airflow and solar thermal absorption depending on real-time resident occupancy density.",
    bandwidth: "14.2 GB/S SYNCHRONIZED",
  },
  {
    id: "collab-neural-circadian",
    primaryResidentId: "ELI-203",
    partnerResidentId: "REN-045",
    projectName: "CIRCADIAN NEURAL EQUILIBRIUM",
    disciplines: ["COGNITIVE SCIENCE", "NEURAL INTERFACES"],
    location: "SECTOR 28 // LEVEL 35 SUITE",
    status: "SYNCHRONIZING",
    summary: "Synchronizing sensory damping frequencies within sleep pods to accelerate deep REM recovery for research residents undergoing high cognitive workloads.",
    bandwidth: "18.0 GB/S SYNCHRONIZED",
  },
];

// ────────────────────────────────────────────────────────────
// 06. COLLECTIVE SHARED SPACES
// ────────────────────────────────────────────────────────────
export const COLLECTIVE_SPACES: CollectiveSpace[] = [
  {
    id: "space-labs",
    name: "RESEARCH LABS & SYNTHESIS",
    sector: "SECTOR 07",
    level: "LEVEL 28",
    activeResidents: 42,
    capacity: 64,
    purpose: "Cross-disciplinary prototyping & biochemical modeling",
    currentAtmosphere: "21.4°C • CO2 405 PPM • ACOUSTIC 28 dB",
  },
  {
    id: "space-atrium",
    name: "SOCIAL ATRIUM & MEZZANINE",
    sector: "SECTOR 08",
    level: "LEVEL 14",
    activeResidents: 68,
    capacity: 120,
    purpose: "Communal exchange, organic nutrition, kinetic interaction",
    currentAtmosphere: "22.1°C • CO2 415 PPM • ACOUSTIC 42 dB",
  },
  {
    id: "space-workshop",
    name: "KINETIC FABRICATION WORKSHOP",
    sector: "SECTOR 02",
    level: "LEVEL 07",
    activeResidents: 24,
    capacity: 40,
    purpose: "Physical drone calibration, additive carbon manufacturing",
    currentAtmosphere: "20.8°C • CO2 410 PPM • ACOUSTIC 36 dB",
  },
  {
    id: "space-observatory",
    name: "CLIMATE OBSERVATORY & APEX DECK",
    sector: "SECTOR 19",
    level: "LEVEL 42",
    activeResidents: 18,
    capacity: 32,
    purpose: "Macro atmospheric monitoring, astronomical observation",
    currentAtmosphere: "19.5°C • CO2 395 PPM • ACOUSTIC 24 dB",
  },
];
