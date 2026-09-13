export type SubsystemId = "pod" | "nutrition" | "atrium" | "infrastructure";

export interface SubsystemMetric {
  label: string;
  value: string;
  unit?: string;
  status: "OPTIMAL" | "ACTIVE" | "CALIBRATED" | "SYNCED" | "STANDBY" | "BALANCED";
  change?: string;
}

export interface SubsystemMode {
  id: string;
  name: string;
  tag: string;
  description: string;
  accentColor: string;
  metrics: SubsystemMetric[];
}

export interface SubsystemData {
  id: SubsystemId;
  index: string;
  code: string;
  title: string;
  tagline: string;
  subtitle: string;
  description: string;
  accentColor: string;
  accentHex: string;
  secondaryHex: string;
  category: string;
  coreBenefit: string;
  architecturalLayer: string;
  modes: SubsystemMode[];
  specifications: Array<{ key: string; val: string }>;
  telemetryStream: Array<{ time: string; event: string; status: string }>;
}

export const SMART_LIVING_SUBSYSTEMS: Record<SubsystemId, SubsystemData> = {
  pod: {
    id: "pod",
    index: "01",
    code: "SYS-POD-28A",
    title: "BIOMETRIC RESIDENTIAL PODS",
    tagline: "AUTONOMOUS PRIVATE LIVING CAPSULES",
    subtitle: "CIRCADIAN HARMONIZATION & ZERO ACOUSTIC FRICTION",
    description:
      "Engineered as an isolated bio-sanctuary within Sector 07. Each cantilevered pod features structural acoustic isolation, dynamic circadian spectrum daylighting, and micro-climate filtration calibrated to your sleep and cognitive cycles.",
    accentColor: "cyan",
    accentHex: "#00F2FE",
    secondaryHex: "#4FACFE",
    category: "PERSONAL SANCTUARY",
    coreBenefit: "Uncompromised sleep recovery and uninterrupted deep study states.",
    architecturalLayer: "LEVEL 28 // CANTILEVERED SHELL",
    modes: [
      {
        id: "focus",
        name: "DEEP FOCUS",
        tag: "5400K SPECTRUM",
        description: "Cool blue-shifted circadian illumination with 28 dB structural anti-noise suppression.",
        accentColor: "#00F2FE",
        metrics: [
          { label: "TEMPERATURE", value: "20.5", unit: "°C", status: "CALIBRATED" },
          { label: "AIR PURITY", value: "99.4", unit: "%", status: "OPTIMAL" },
          { label: "ACOUSTIC LEVEL", value: "28.2", unit: "dB", status: "OPTIMAL" },
          { label: "CO2 LEVEL", value: "410", unit: "ppm", status: "OPTIMAL" },
        ],
      },
      {
        id: "recovery",
        name: "BIO RECOVERY",
        tag: "2700K SPECTRUM",
        description: "Balanced thermal relaxation and 22% enriched oxygenation for post-academic restoration.",
        accentColor: "#FFB020",
        metrics: [
          { label: "TEMPERATURE", value: "22.8", unit: "°C", status: "CALIBRATED" },
          { label: "AIR PURITY", value: "99.1", unit: "%", status: "OPTIMAL" },
          { label: "ACOUSTIC LEVEL", value: "32.0", unit: "dB", status: "OPTIMAL" },
          { label: "HUMIDITY", value: "48.5", unit: "%", status: "CALIBRATED" },
        ],
      },
      {
        id: "circadian",
        name: "SLEEP MATRIX",
        tag: "1800K AMBER",
        description: "Melatonin-stimulating warm amber shift with complete electrochromic window opacity.",
        accentColor: "#7928CA",
        metrics: [
          { label: "TEMPERATURE", value: "19.0", unit: "°C", status: "CALIBRATED" },
          { label: "AIR PURITY", value: "99.8", unit: "%", status: "OPTIMAL" },
          { label: "ACOUSTIC LEVEL", value: "24.5", unit: "dB", status: "OPTIMAL" },
          { label: "LIGHT POLARIZATION", value: "100", unit: "%", status: "ACTIVE" },
        ],
      },
    ],
    specifications: [
      { key: "SHELL COMPOSITION", val: "Carbon-Silicon Aerogel Core" },
      { key: "ACOUSTIC SHIELDING", val: "-48 dB Active Cancelling" },
      { key: "ATMOSPHERIC FEED", val: "HEPA-Bio Triple Scrubbed" },
      { key: "CIRCADIAN DRIVER", val: "Full-Spectrum Photonic Grid" },
      { key: "POWER COUPLING", val: "Resonant Inductive Floor Pad" },
    ],
    telemetryStream: [
      { time: "14:22:01", event: "Circadian spectrum adjusted to 5400K daylight peak", status: "NOMINAL" },
      { time: "14:20:45", event: "Acoustic micro-dampers engaged against external wind shear", status: "ACTIVE" },
      { time: "14:18:12", event: "Oxygen enrichment normalized to 21.4% ambient", status: "OPTIMAL" },
    ],
  },

  nutrition: {
    id: "nutrition",
    index: "02",
    code: "SYS-NUT-07",
    title: "AUTONOMOUS NUTRITION MATRIX",
    tagline: "REENGINEERING THE CAMPUS MESS",
    subtitle: "PRECISION MACRONUTRIENT SYNTHESIS & ZERO QUEUES",
    description:
      "No queues. No nutritional guesswork. The Citadel Autonomous Nutrition Matrix synthesizes molecularly balanced, hyper-fresh meals tailored to individual resident metabolic load and cognitive study schedules.",
    accentColor: "emerald",
    accentHex: "#00F5A0",
    secondaryHex: "#00D9F5",
    category: "MOLECULAR SUSTENANCE",
    coreBenefit: "Zero dining friction, zero food waste, and personalized athletic/study nutrition.",
    architecturalLayer: "LEVEL 14 // ROTATIONAL REFECTION RING",
    modes: [
      {
        id: "breakfast",
        name: "07:30 BREAKFAST",
        tag: "HIGH PROTEIN / PEAK",
        description: "Rapid metabolic kickstart engineered for mental acuity and blood-sugar balance.",
        accentColor: "#00F5A0",
        metrics: [
          { label: "PROTEIN", value: "38", unit: "g", status: "OPTIMAL" },
          { label: "COMPLEX CARBS", value: "52", unit: "g", status: "BALANCED" },
          { label: "CLEAN LIPIDS", value: "14", unit: "g", status: "OPTIMAL" },
          { label: "CALORIC LOAD", value: "580", unit: "kcal", status: "ACTIVE" },
        ],
      },
      {
        id: "lunch",
        name: "13:00 LUNCH",
        tag: "SUSTAINED ENDURANCE",
        description: "Slow-glycemic fuel formulated to prevent afternoon cognitive crashes during lab sessions.",
        accentColor: "#00D9F5",
        metrics: [
          { label: "PROTEIN", value: "48", unit: "g", status: "OPTIMAL" },
          { label: "COMPLEX CARBS", value: "78", unit: "g", status: "BALANCED" },
          { label: "CLEAN LIPIDS", value: "22", unit: "g", status: "OPTIMAL" },
          { label: "CALORIC LOAD", value: "820", unit: "kcal", status: "ACTIVE" },
        ],
      },
      {
        id: "dinner",
        name: "20:00 DINNER",
        tag: "CELLULAR REPAIR",
        description: "Magnesium-infused micronutrients to accelerate neuro-muscular recovery before sleep.",
        accentColor: "#7928CA",
        metrics: [
          { label: "PROTEIN", value: "42", unit: "g", status: "OPTIMAL" },
          { label: "COMPLEX CARBS", value: "44", unit: "g", status: "BALANCED" },
          { label: "MICRONUTRIENTS", value: "100", unit: "%", status: "OPTIMAL" },
          { label: "CALORIC LOAD", value: "640", unit: "kcal", status: "ACTIVE" },
        ],
      },
    ],
    specifications: [
      { key: "DISPENSATION SPEED", val: "45 Seconds From Pod Prompt" },
      { key: "WASTE REDUCTION", val: "99.8% Zero-Residual Biocycle" },
      { key: "INGREDIENT PURITY", val: "Hydroponic Sector Vertical Farms" },
      { key: "DELIVERY PIPELINE", val: "Pneumatic Mag-Chute to Sector 07" },
      { key: "ALLERGY ISOLATION", val: "Molecular Particulate Scrubbers" },
    ],
    telemetryStream: [
      { time: "13:45:10", event: "Daily nutrition balance achieved: 2,450 kcal synchronized", status: "OPTIMAL" },
      { time: "13:30:02", event: "Automated replenishment of hydroponic organic greens complete", status: "NOMINAL" },
      { time: "13:12:44", event: "Batch #412 dispensed with 0.00% cross-allergen detected", status: "VERIFIED" },
    ],
  },

  atrium: {
    id: "atrium",
    index: "03",
    code: "SYS-ATR-24",
    title: "KINETIC SOCIAL ATRIUM",
    tagline: "ADAPTIVE COLLABORATIVE SPATIAL MATRIX",
    subtitle: "DYNAMIC ACOUSTIC ZONES & SHIFTING STUDY HORIZONS",
    description:
      "A soaring 40-meter central architectural void featuring suspended study platforms, acoustic dampening zones, and biometric micro-climates. The space dynamically reconfigures its geometry between high-energy team collaboration and silent research solitude.",
    accentColor: "violet",
    accentHex: "#A855F7",
    secondaryHex: "#EC4899",
    category: "COMMUNAL INTELLIGENCE",
    coreBenefit: "Fluid transition between intense collaborative energy and pin-drop silent scholarship.",
    architecturalLayer: "LEVEL 24 // SKYBRIDGE VOID",
    modes: [
      {
        id: "collaborative",
        name: "TEAM SYNERGY",
        tag: "ACTIVE DISCOURSE",
        description: "Open spatial acoustics permitting dynamic ideation without sound bleeding into quiet pods.",
        accentColor: "#A855F7",
        metrics: [
          { label: "ACTIVE ZONES", value: "08", unit: "TIERS", status: "ACTIVE" },
          { label: "RESEARCHERS", value: "384", unit: "RESIDENTS", status: "SYNCED" },
          { label: "COLLAB INDEX", value: "94.2", unit: "%", status: "OPTIMAL" },
          { label: "AMBIENT SOUND", value: "48.0", unit: "dB", status: "ACTIVE" },
        ],
      },
      {
        id: "silent",
        name: "DEEP SCHOLARSHIP",
        tag: "SILENT MATRIX",
        description: "Sub-audible sound dampening barriers deployed across upper catwalk reading alcoves.",
        accentColor: "#00F2FE",
        metrics: [
          { label: "ACTIVE ZONES", value: "04", unit: "TIERS", status: "CALIBRATED" },
          { label: "RESEARCHERS", value: "128", unit: "RESIDENTS", status: "SYNCED" },
          { label: "COLLAB INDEX", value: "32.0", unit: "%", status: "STANDBY" },
          { label: "AMBIENT SOUND", value: "26.5", unit: "dB", status: "OPTIMAL" },
        ],
      },
      {
        id: "biophilic",
        name: "SKY GARDEN DOCK",
        tag: "O2 REPLENISHMENT",
        description: "Vertical hydroponic air filters generate 100% natural convective airflow.",
        accentColor: "#00F5A0",
        metrics: [
          { label: "O2 OUTPUT", value: "23.2", unit: "%", status: "OPTIMAL" },
          { label: "HUMIDITY", value: "52.0", unit: "%", status: "BALANCED" },
          { label: "FOLIAGE INDEX", value: "1,240", unit: "PLANTS", status: "ACTIVE" },
          { label: "SOLAR FACTOR", value: "88.4", unit: "%", status: "OPTIMAL" },
        ],
      },
    ],
    specifications: [
      { key: "VERTICAL CLEARANCE", val: "42.5 Meters Unobstructed Void" },
      { key: "PLATFORM ACTUATION", val: "Magnetic Levitation Struts" },
      { key: "ACOUSTIC SEPARATION", val: "Phase-Inverted Sound Walls" },
      { key: "AIR EXCHANGE RATE", val: "12 Full Volume Cycles / Hour" },
      { key: "NATURAL DAYLIGHTING", val: "Photovoltaic Prismatic Skylights" },
    ],
    telemetryStream: [
      { time: "14:15:33", event: "Level 24 bridge platform shifted to 18-person seminar geometry", status: "ALIGNED" },
      { time: "14:02:19", event: "Acoustic curtain engaged around Pod Cluster 04", status: "ISOLATED" },
      { time: "13:58:00", event: "Biophilic ventilation cycle increased 15% due to high occupancy", status: "COMPENSATED" },
    ],
  },

  infrastructure: {
    id: "infrastructure",
    index: "04",
    code: "SYS-INF-99",
    title: "PREDICTIVE INFRASTRUCTURE",
    tagline: "AUTONOMIC RESOURCE INTEGRITY",
    subtitle: "CLOSED-LOOP WATER, SOLAR EXOSKELETON & ZERO DEFECTS",
    description:
      "The invisible backbone of HOSTEL-X. Citadel infrastructure is not merely maintained—it is continuously predicted. Machine intelligence preemptively reroutes power, recycles 99.4% of water, and dispatches repair drones before microscopic conduit fatigue becomes noticeable.",
    accentColor: "cyan",
    accentHex: "#00F2FE",
    secondaryHex: "#2B7FFF",
    category: "CITADEL NERVOUS SYSTEM",
    coreBenefit: "Zero downtime, 100% renewable energy autonomy, self-healing architecture.",
    architecturalLayer: "CITADEL-WIDE EMBEDDED CONDUIT GRID",
    modes: [
      {
        id: "energy",
        name: "POWER GRID",
        tag: "PHOTOVOLTAIC MATRIX",
        description: "Nanostructured solar glass exterior skin harvesting kinetic and solar energy.",
        accentColor: "#00F2FE",
        metrics: [
          { label: "GRID EFFICIENCY", value: "99.8", unit: "%", status: "OPTIMAL" },
          { label: "SOLAR HARVEST", value: "1.42", unit: "MW", status: "ACTIVE" },
          { label: "BATTERY BUFFER", value: "98.5", unit: "%", status: "OPTIMAL" },
          { label: "NET CONSUMPTION", value: "-0.24", unit: "MW", status: "OPTIMAL" },
        ],
      },
      {
        id: "water",
        name: "HYDRO LOOP",
        tag: "TRIPLE RECLAMATION",
        description: "Closed-circuit multi-stage filtration reclaiming grey and black water seamlessly.",
        accentColor: "#2B7FFF",
        metrics: [
          { label: "RECLAMATION RATE", value: "99.4", unit: "%", status: "OPTIMAL" },
          { label: "PURITY RATING", value: "99.99", unit: "%", status: "OPTIMAL" },
          { label: "RESERVE LEVEL", value: "840", unit: "kL", status: "OPTIMAL" },
          { label: "FLOW LATENCY", value: "1.2", unit: "ms", status: "CALIBRATED" },
        ],
      },
      {
        id: "maintenance",
        name: "DRONE FLEET",
        tag: "AUTONOMOUS REPAIR",
        description: "Continuous ultrasonic structural scans with micro-drone repair squads on 60-second standby.",
        accentColor: "#FFB020",
        metrics: [
          { label: "ACTIVE DRONES", value: "14", unit: "UNITS", status: "SYNCED" },
          { label: "CRITICAL ALERTS", value: "00", unit: "FAULTS", status: "OPTIMAL" },
          { label: "STRUCTURAL STRESS", value: "0.02", unit: "%", status: "OPTIMAL" },
          { label: "MTBF PROJECTION", value: "48,000", unit: "HRS", status: "OPTIMAL" },
        ],
      },
    ],
    specifications: [
      { key: "ENERGY HARVESTING", val: "BIPV Facade + Vertical Mag-Air Draft" },
      { key: "WATER RECLAMATION", val: "Graphene Nano-Osmosis Triple Loop" },
      { key: "ATMOSPHERE CYCLING", val: "Photobioreactor Algae Arrays" },
      { key: "STRUCTURAL SENSORS", val: "14,200 Embedded Fiber-Bragg Nodes" },
      { key: "FAILSAFE REDUNDANCY", val: "Quad-Redundant Distributed Micro-Grids" },
    ],
    telemetryStream: [
      { time: "14:26:50", event: "Photovoltaic tilt calibrated for afternoon solar azimuth", status: "OPTIMAL" },
      { time: "14:11:18", event: "Closed-loop water recycling verified at 99.4% purity threshold", status: "NOMINAL" },
      { time: "13:54:02", event: "Predictive micro-weld completed by Drone DR-04 on Pod 28-C riser", status: "RESOLVED" },
    ],
  },
};

export const ECOSYSTEM_SUMMARY_POINTS = [
  {
    number: "01",
    title: "BIOMETRIC LIVING",
    desc: "Autonomous pods adapt temperature, circadian photons, and acoustics to maximize your recovery.",
  },
  {
    number: "02",
    title: "MOLECULAR NUTRITION",
    desc: "Automated nutrient dispensation engineered for cognitive stamina without queues or food waste.",
  },
  {
    number: "03",
    title: "KINETIC COMMUNITY",
    desc: "A shifting 40-meter atrium balancing collaborative energy with acoustic-isolated deep focus.",
  },
  {
    number: "04",
    title: "PREDICTIVE INTEGRITY",
    desc: "Self-healing resources, 99.8% energy efficiency, and autonomous drone maintenance.",
  },
];
