/**
 * KINGDOM RISE COMPANY (KRC) - CORPORATE DATA
 * Primary Source of Truth: Corporate Profile & Portfolio (87 pages)
 * Headquarters: Jeddah, Saudi Arabia
 * Established: 2015 (Foundational roots dating to 2002)
 */

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  year: string;
  era: '2002-2008' | '2009-2015' | '2016-2020' | '2021-2023+';
  sector: 'Civil' | 'Electrical' | 'Mechanical' | 'Oil & Gas' | 'Water & Power' | 'Aviation' | 'Industrial';
  category: string;
  location: string;
  description: string;
  scope: string[];
  featured?: boolean;
  image?: string;
}

export interface ServiceItem {
  id: string;
  divisionNumber: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: { title: string; desc: string }[];
  teamComposition: string[];
  keyHighlights: string[];
  image: string;
}

export interface DepartmentItem {
  id: string;
  deptNumber: string;
  title: string;
  managerTitle: string;
  description: string;
  primaryResponsibilities: string[];
  teamComposition: string[];
  keyFocusAreas: string[];
}

export interface EquipmentCategory {
  categoryNumber: string;
  title: string;
  description: string;
  items: { name: string; specs: string }[];
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation: string;
  estimatedBudget: string;
  timeline: string;
  scopeDescription: string;
  submittedAt: string;
  status: 'New' | 'Under Review' | 'Quoted' | 'Archived';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'Unread' | 'Replied';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content: string[];
  tags: string[];
}

export const COMPANY_PROFILE = {
  name: "Kingdom Rise Limited",
  acronym: "KRC",
  arabicName: "شركة صعود المملكة للمقاولات",
  tagline: "Your Blueprint to Success",
  subTagline: "Excellence in Civil, Electrical, and Mechanical Construction",
  summary: "Established in 2015 as a premier Saudi entity delivering civil, electrical, and mechanical infrastructure excellence across the Kingdom of Saudi Arabia. Corporate offices located in Jeddah.",
  headquarters: "Jeddah, Kingdom of Saudi Arabia",
  country: "Saudi Arabia",
  email: "info@kingdomrise.com",
  website: "www.kingdomrise.com",
  phone: "+966 56 299 7929",
  presentedBy: "Executive Directorate",
  establishedYear: "2015",
  trackRecordSince: "2002",
  registrations: [
    { title: "Commercial Registration", status: "Active & Compliant" },
    { title: "Chamber of Commerce", status: "Registered Member (Jeddah)" },
    { title: "VAT Registration", status: "Fully Registered & Verified" },
  ],
  bankingPartners: [
    { name: "SNB - Saudi National Bank", role: "Primary Corporate Banking Partner" },
    { name: "Al Rajhi Bank", role: "Corporate Financing Partner" },
  ],
  metrics: {
    totalProjects: "53+",
    equipmentFleet: "Extensive Fleet",
    civilProjects: "20+",
    electricalProjects: "25+",
    mechanicalProjects: "15+",
    avgExperience: "8+ Years",
    ltiTarget: "0 LTI",
    ppeCompliance: "100%",
    auditCompliance: "98%",
    safetySupervisors: "10 Supervisors",
  },
  ceoMessage: {
    title: "Executive Message from the CEO",
    lead: "As the CEO of Kingdom Rise Company, I am both honored and excited to lead a team of dedicated professionals committed to shaping the future of construction and contracting in Saudi Arabia. Our journey is rooted in a profound passion for excellence, innovation, and a relentless pursuit of perfection.",
    paragraphs: [
      "At Kingdom Rise, our mission extends beyond building structures—we create lasting impressions that resonate with the communities we serve. With a strong focus on integrity, quality, and sustainability, we aim to set new benchmarks for construction practices.",
      "Our team embodies the spirit of collaboration and ingenuity. Together, we push the boundaries of what's possible, infusing each project with creativity, functionality, and elegance. We embrace technology and best practices to ensure our projects are state-of-the-art and environmentally conscious.",
    ],
    quote: "Kingdom Rise is not just a company; it is a commitment to excellence, a dedication to progress, and a promise to create spaces that inspire and endure."
  },
  vision: "To be recognized as a premier construction company in Saudi Arabia, shaping the future of infrastructure development through innovation, quality, and sustainable practices that contribute to Vision 2030 objectives.",
  mission: "Deliver high-quality, innovative, and sustainable construction services across all sectors—Civil, Electrical, and Mechanical—while maintaining the highest standards of safety, integrity, and client satisfaction.",
  coreValues: [
    {
      name: "Honesty",
      desc: "Being truthful, accurate, and straightforward in all communications and conduct with clients and partners.",
    },
    {
      name: "Integrity",
      desc: "Maintaining consistency between our beliefs and behavior—walking our talk across every job site.",
    },
    {
      name: "Fairness",
      desc: "Being reasonable, open-minded, impartial, and non-discriminatory in all commercial dealings.",
    },
    {
      name: "Accountability",
      desc: "Accepting responsibility for our actions and taking prompt steps to correct mistakes without delay.",
    },
    {
      name: "Consideration",
      desc: "Practicing the Golden Rule—respecting dignity, rights, and safety of others on every project.",
    },
    {
      name: "Excellence",
      desc: "Consistently applying diligence, perseverance, and meticulous attention to engineering detail.",
    },
    {
      name: "Reliability",
      desc: "Making realistic commitments and following through on every promise made to stakeholders.",
    },
    {
      name: "Citizenship",
      desc: "Complying with Saudi laws, supporting national development, and showing consideration for the environment.",
    },
  ],
  keyClients: [
    { name: "Saudi Aramco", category: "Oil & Gas", highlight: "Surveillance pole civil works & industrial packages" },
    { name: "Ministry of Defense (MOD)", category: "Government", highlight: "100m Wireless Tower Infrastructure" },
    { name: "SWCC (Saline Water Conversion Corp)", category: "Water & Power", highlight: "Instrumentation, loop testing & boiler replacements" },
    { name: "SEC (Saudi Electricity Company)", category: "Water & Power", highlight: "380kV & 132kV OHTL high-voltage transmission lines" },
    { name: "MARAFIQ", category: "Water & Power", highlight: "Jubail Site civil repairs & 32 sluice gates replacement" },
    { name: "Saudi Airlines Cargo", category: "Aviation", highlight: "Cargo office building construction & BMS integration" },
    { name: "Madina Airport", category: "Aviation", highlight: "132kV OHTL Madina East Substation to Airport" },
    { name: "Global Chemical Industries", category: "Oil & Gas", highlight: "MPP Stage-1 civil & industrial construction" },
    { name: "IFFCO", category: "Industrial", highlight: "Tank Management System (TMS) supply & commissioning" },
    { name: "TETRA Pack", category: "Industrial", highlight: "Annual instrumentation and control system contract" },
    { name: "Al Reef Sugar Refinery", category: "Industrial", highlight: "Packing process line & control system integration" },
    { name: "Institute of Public Administration", category: "Government", highlight: "Staff Housing Building construction" },
    { name: "Middle East Paper Company", category: "Industrial", highlight: "Industrial instrumentation & process systems" },
    { name: "King Abdullah Economic City (KAEC)", category: "Infrastructure", highlight: "RO Plant installation & commissioning" },
  ],
  competitiveAdvantages: [
    {
      title: "Integrated Turnkey Capabilities",
      description: "One-stop solution for Civil, Electrical, and Mechanical services under a single point of accountability, streamlining coordination and driving cost efficiency.",
    },
    {
      title: "Skilled Technical Workforce",
      description: "Multidisciplinary team of licensed civil, electrical, mechanical, and instrumentation engineers with an average of 8+ years of hands-on Saudi field experience.",
    },
    {
      title: "Comprehensive Modern Equipment Fleet",
      description: "Company-owned modern fleet (2018+) including excavators, bulldozers, boom trucks, mobile power generation, and Leica precision total stations.",
    },
    {
      title: "Proven 53+ Project Track Record",
      description: "Proven execution across public and private sector projects since 2002, consistently delivering on time and within allocated resources.",
    },
    {
      title: "Elite Saudi Client Relationships",
      description: "Trusted partner status with national icons including Saudi Aramco, Ministry of Defense, SEC, SWCC, MARAFIQ, and Saudi Airlines.",
    },
    {
      title: "Zero Accident Safety Culture",
      description: "Strict written Accident Prevention Program with 10 on-site safety supervisors, 100% PPE compliance, and a strict 0 LTI target.",
    },
  ],
  safetyPrograms: [
    "Formal Written Accident Prevention Program",
    "15-Minute Mandatory New Hire Safety Orientation",
    "Weekly Toolbox Meetings across all active sites",
    "Qualified Scaffolding & Work-at-Height (above 6ft) Inspectors",
    "Permit to Work (PTW) certified receivers",
    "Incident reports within 24 hours & monthly audit cycles",
    "Third-Party Quality Verification (Hold, Witness, Review Points)",
    "Strict PPE enforcement: hard hats, steel-toe boots, eye & hearing protection",
  ],
  softwareTools: [
    "AutoCAD & Revit (Design & Modeling)",
    "Primavera P6 (Project Scheduling)",
    "MS Project (Resource Allocation)",
    "BIM Modeling (Clash Detection & 3D Coordination)",
    "SCADA & PLC Programming Suites",
    "Structural Analysis Software",
  ],
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "civil-engineering",
    divisionNumber: "01",
    title: "Civil Engineering Services",
    slug: "civil-engineering",
    shortDesc: "Comprehensive civil construction covering heavy foundations, earthworks, reinforced concrete, highways, and architectural finishing.",
    fullDesc: "Our Civil Division handles residential, commercial, and industrial infrastructure projects across the Kingdom of Saudi Arabia. With advanced heavy machinery and seasoned site engineers, we execute precision earthworks, deep pile foundations, reinforced concrete structures, and asphalt road networks with zero compromise on safety.",
    capabilities: [
      {
        title: "Foundations & Structural Works",
        desc: "Deep pile foundations, pile caps, heavy structural steel erection, and seismic-resistant ground preparation."
      },
      {
        title: "Earthworks & Excavation",
        desc: "Bulk site preparation, precision trenching, rock excavation, grading, soil stabilization, and compaction."
      },
      {
        title: "Reinforced Concrete Works",
        desc: "Cast-in-place retaining walls, heavy slabs, culverts, drainage channels, and precast concrete elements."
      },
      {
        title: "Road & Highway Construction",
        desc: "Complete asphalt paving, sub-base preparation, curb installation, signage, and internal industrial road networks."
      },
      {
        title: "Building Finishing Works",
        desc: "Turnkey interior and exterior architectural finishing, masonry, industrial plastering, waterproofing, and facade installation."
      },
    ],
    teamComposition: ["Civil Engineers", "Structural Engineers", "Site Foremen", "Masons", "Steel Fixers", "Surveyors", "Skilled Laborers"],
    keyHighlights: [
      "20+ Major civil & structural projects delivered across Saudi Arabia",
      "Overhead Transmission Line (OHTL) heavy foundation specialist (380kV & 132kV)",
      "100% on-time handover record across government and industrial packages",
      "Leica Total Station precision surveying for millimeters-level accuracy",
    ],
    image: "/src/assets/images/projects/kingdom-rise-makkah-foundations.jpg",
  },
  {
    id: "electrical-engineering",
    divisionNumber: "02",
    title: "Electrical Engineering Services",
    slug: "electrical-engineering",
    shortDesc: "High and low voltage power distribution, substation works, industrial automation, SCADA integration, and Building Management Systems.",
    fullDesc: "Our Electrical Division delivers high-performance electrical infrastructure for commercial complexes, power transmission lines, and automated industrial plants. From 380kV transmission civil interfaces to advanced SCADA telemetry and building automation, our certified engineers ensure flawless power distribution and energy efficiency.",
    capabilities: [
      {
        title: "Power Distribution (HV / LV)",
        desc: "High, medium, and low voltage switchgear installation, step-down transformers, cable tray networks, and backup power generation."
      },
      {
        title: "Industrial Electrical Installations",
        desc: "Turnkey power solutions for refineries, packaging plants, manufacturing facilities, and heavy industrial complexes."
      },
      {
        title: "Instrumentation & Process Control",
        desc: "Sensor calibration, transmitter loops, automated valves, flowmeters, and precision process monitoring systems."
      },
      {
        title: "SCADA & Tank Management Systems",
        desc: "Real-time supervisory control, PLC programming, telemetry networks, and automated fuel storage monitoring."
      },
      {
        title: "Building Management Systems (BMS)",
        desc: "Intelligent digital control systems integrating HVAC, energy metering, smart lighting, and surveillance."
      },
    ],
    teamComposition: ["Electrical Engineers", "Instrumentation Engineers", "PLC/SCADA Specialists", "Electrical Technicians", "Cable Jointers"],
    keyHighlights: [
      "25+ Electrical & instrumentation contracts completed successfully",
      "Overhead transmission line power infrastructure for SEC and Madina Airport",
      "Building Management System execution for Saudi Airline Cargo Facility",
      "Tank Management System (TMS) deployment for IFFCO and oil refineries",
    ],
    image: "/src/assets/images/services/kingdom-rise-electrical-engineering.jpg",
  },
  {
    id: "mechanical-engineering",
    divisionNumber: "03",
    title: "Mechanical Engineering Services",
    slug: "mechanical-engineering",
    shortDesc: "Industrial HVAC systems, high-capacity plumbing, certified fire suppression networks, plant piping, and heavy equipment installation.",
    fullDesc: "Our Mechanical Division specializes in precision mechanical installations for mission-critical facilities, processing plants, and commercial developments. We provide end-to-end HVAC engineering, certified NFPA-compliant fire protection systems, process piping, boiler installations, and water desalination plant mechanical works.",
    capabilities: [
      {
        title: "HVAC Systems & Ventilation",
        desc: "Central chilled water systems, rooftop package units, air handling units (AHU), duct fabrication, and cleanroom ventilation."
      },
      {
        title: "Plumbing & Drainage Networks",
        desc: "Industrial water supply, sanitary drainage, stormwater retention, booster pump stations, and sewage treatment piping."
      },
      {
        title: "Fire-Fighting & Suppression Systems",
        desc: "UL/FM sprinkler networks, fire hydrants, gas suppression (FM-200 / CO2), diesel fire pumps, and alarm integration."
      },
      {
        title: "Industrial Plant Machinery Installation",
        desc: "Rigging, alignment, and commissioning of heavy industrial machinery, crushers, compressors, and packaging lines."
      },
      {
        title: "Process Piping & Storage Vessels",
        desc: "High-pressure stainless steel and carbon steel process piping, cryogenic oxygen tanks, CO2 plants, and steam boilers."
      },
    ],
    teamComposition: ["Mechanical Engineers", "HVAC Specialists", "Certified Pipe Fitters", "ASME Welders", "Commissioning Technicians"],
    keyHighlights: [
      "15+ Major mechanical & process plant installations delivered",
      "Replacement of boiler fuel supply systems for SWCC Phase 2",
      "RO desalination plant commissioning at King Abdullah Economic City (KAEC)",
      "Cryogenic oxygen tank monitoring systems at Abdullah Hashim Plant",
    ],
    image: "/src/assets/images/services/kingdom-rise-mechanical-engineering.jpg",
  },
  {
    id: "specialized-services",
    divisionNumber: "04",
    title: "Value-Added Specialized Engineering",
    slug: "specialized-engineering",
    shortDesc: "Instrumentation loop testing, PLC automation, annual maintenance contracts (AMC), and technical engineering consultancy.",
    fullDesc: "To provide our clients with complete lifecycle support, Kingdom Rise Company offers dedicated value-added engineering services. From routine equipment calibration and predictive maintenance to complex technical feasibility studies and retrofits, our specialists keep client infrastructure operating at peak efficiency.",
    capabilities: [
      {
        title: "Process Instrumentation & Loop Testing",
        desc: "End-to-end loop testing, sensor verification, transmitter calibration, and third-party laboratory attested certifications."
      },
      {
        title: "Process Automation (PLC / DCS)",
        desc: "Programming and commissioning of Siemens, Allen-Bradley, and ABB programmable logic controllers with DCS architecture."
      },
      {
        title: "Annual Maintenance Contracts (AMC)",
        desc: "Comprehensive 24/7 facility and process line maintenance ensuring zero unplanned downtime for industrial facilities."
      },
      {
        title: "Technical Engineering Consultancy",
        desc: "Value engineering, BOQ preparation, quantity surveying, constructability reviews, and compliance advisory for Saudi Vision 2030 projects."
      },
    ],
    teamComposition: ["Senior Technical Consultants", "Instrumentation Engineers", "Calibration Specialists", "Maintenance Crew"],
    keyHighlights: [
      "Annual maintenance contract partner for TETRA Pack operations",
      "Process loop calibration contracts with SWCC and power generation plants",
      "Comprehensive BOQ and cost optimization savings of 15-20% for clients",
      "Third-party laboratory accredited testing and documentation",
    ],
    image: "/src/assets/images/technology/kingdom-rise-technology-bim.jpg",
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  // Era 4: 2021-2023+ (Recent & Ongoing Live Projects)
  {
    id: "proj-makkah-foundations",
    title: "Makkah Principality Transmission Tower Stub Foundations & Continuous Concrete Raft Pouring",
    client: "Saudi Electricity Company (SEC) / Makkah Province",
    year: "2025",
    era: "2021-2023+",
    sector: "Civil",
    category: "Heavy Civil & Transmission Line Foundations",
    location: "Makkah Principality, Makkah Province, Saudi Arabia",
    description: "Deep excavation, high-density reinforced steel rebar cage placement, and continuous day/night concrete boom pumping for high-voltage transmission tower stub foundations in Makkah.",
    scope: [
      "Precision survey and excavation of deep foundation pits in rocky terrain",
      "Assembly of heavy multi-layer high-yield steel rebar foundation mats",
      "Continuous concrete boom pump casting with internal vibrator compaction",
      "Night shift lighting, temperature control, and 100% PPE safety oversight",
      "Accredited third-party cube compressive strength testing and QA/QC documentation",
    ],
    featured: true,
    image: "/src/assets/images/projects/kingdom-rise-makkah-foundations.jpg",
  },
  {
    id: "proj-tabuk-buqaylah-earthworks",
    title: "Tabuk & Buqaylah Mountain Highway Earthworks & Hydraulic Rock Fracturing",
    client: "Ministry of Transport and Logistic Services",
    year: "2024",
    era: "2021-2023+",
    sector: "Civil",
    category: "Heavy Earthmoving & Mountain Excavation",
    location: "Buqaylah, Tabuk Province (25°19'N 37°22'E), Saudi Arabia",
    description: "Heavy hydraulic excavator fleet deployment cutting multi-kilometer mountain corridors, crushing granite formations with hydraulic breakers, and grading roadbed profiles in Tabuk.",
    scope: [
      "Fleet deployment of Hyundai 220/380 crawler excavators and heavy rock breakers",
      "Controlled rock splitting and volumetric bulk earth excavation exceeding 180,000 m³",
      "Hillside stabilization, boulder clearing, and bench slope profiling",
      "Subbase compaction using vibratory plate compactors and water tanker wetting",
    ],
    featured: true,
    image: "/src/assets/images/projects/kingdom-rise-tabuk-earthwork.jpg",
  },
  {
    id: "proj-transmission-bored-piling",
    title: "High-Voltage Power Corridor Deep Bored Piling & Bauer Rotary Drilling",
    client: "Saudi Electricity Company (SEC)",
    year: "2024",
    era: "2021-2023+",
    sector: "Electrical",
    category: "Deep Piling & Substation Foundations",
    location: "Western & Central Power Grid Corridors, Saudi Arabia",
    description: "Deep foundation bored piling execution utilizing Bauer BG 25 C rotary drilling rigs, reinforced cylindrical cage fabrication, and 100-ton crane tandem lifting for transmission corridors.",
    scope: [
      "Bauer BG 25 C continuous flight auger (CFA) and rotary bored pile drilling to 24m depth",
      "On-site fabrication of high-tensile steel cylindrical pile reinforcement cages",
      "Telescopic crane rigging and precision vertical lowering of rebar cages",
      "Tremie concrete placement and crosshole sonic logging (CSL) integrity testing",
    ],
    featured: true,
    image: "/src/assets/images/projects/kingdom-rise-deep-piling.jpg",
  },
  {
    id: "proj-mountain-asphalt-highway",
    title: "Al-Hasan Mountain Access Highway Asphalt Paving & Compaction",
    client: "Makkah Regional Development Authority",
    year: "2024",
    era: "2021-2023+",
    sector: "Civil",
    category: "Road Paving & Transportation Infrastructure",
    location: "Al-Hasan Mountain Pass, Makkah Province, Saudi Arabia",
    description: "Complete bituminous base and asphalt wearing course installation across steep serpentine mountain terrain with pedestrian and ride-on vibratory compaction rollers.",
    scope: [
      "Aggregate subbase preparation and prime coat (MC-70) application",
      "Hot mix asphalt (HMA) laydown across challenging mountain gradient passes",
      "Precision density rolling with Dynapac vibratory rollers and compactors",
      "Stormwater roadside runoffs, asphalt berms, and protective slope curbing",
    ],
    featured: true,
    image: "/src/assets/images/projects/kingdom-rise-asphalt-paving.jpg",
  },
  {
    id: "proj-stormwater-box-culvert",
    title: "Precast Concrete Stormwater Box Culvert & Flood Mitigation System",
    client: "National Water Company (NWC) / Jeddah Municipality",
    year: "2023",
    era: "2021-2023+",
    sector: "Civil",
    category: "Stormwater Infrastructure & Deep Trenching",
    location: "Jeddah & Western Province Flood Channels, Saudi Arabia",
    description: "Deep trench excavation, crushed rock leveling bedding, and heavy mobile crane lowering of large-scale precast concrete box culvert storm drainage networks.",
    scope: [
      "Engineered open-cut trenching up to 6m depth with safety perimeter netting",
      "Compacted granular leveling pad and geofabric subgrade reinforcement",
      "Tandem mobile crane placement of 12-ton modular precast concrete box culverts",
      "Bituminous waterproof joint sealing, granular backfilling, and soil compaction testing",
    ],
    featured: true,
    image: "/src/assets/images/projects/kingdom-rise-culvert-infrastructure.jpg",
  },
  {
    id: "proj-marafiq-jubail",
    title: "MARAFIQ Jubail Site Civil Work Repairs",
    client: "MARAFIQ",
    year: "2021",
    era: "2021-2023+",
    sector: "Water & Power",
    category: "Civil & Marine Infrastructure",
    location: "Jubail Industrial City, Saudi Arabia",
    description: "Extensive civil repair works and precision structural replacement of 32 sluice gates within MARAFIQ's critical industrial water distribution infrastructure.",
    scope: [
      "Civil work repairs on reinforced water intake channels",
      "Precision rigging, extraction, and replacement of 32 sluice gates",
      "Waterproofing, anti-corrosive epoxy coating, and concrete rehabilitation",
      "Inspection and load testing under high flow conditions",
    ],
    featured: true,
    image: "/src/assets/images/projects/kingdom-rise-industrial-facility.jpg",
  },
  {
    id: "proj-swcc-instrumentation",
    title: "SWCC Plant Instrumentation Verification & Loop Testing",
    client: "SWCC (Saline Water Conversion Corp)",
    year: "2021",
    era: "2021-2023+",
    sector: "Water & Power",
    category: "Electrical & Instrumentation",
    location: "Western Province, Saudi Arabia",
    description: "Verification, precision calibration, and comprehensive loop testing for vital desalination plant instrumentation systems.",
    scope: [
      "Verification and calibration of flow, temperature, and pressure transmitters",
      "Comprehensive loop testing across control cabinets and central DCS",
      "Emergency shutdown (ESD) logic validation and safety interlocks",
      "Third-party traceable certification and quality audit reporting",
    ],
    featured: true,
    image: "/src/assets/images/services/kingdom-rise-electrical-engineering.jpg",
  },
  {
    id: "proj-iffco-tms",
    title: "IFFCO Tank Management System (TMS)",
    client: "IFFCO",
    year: "2022",
    era: "2021-2023+",
    sector: "Oil & Gas",
    category: "SCADA & Process Automation",
    location: "Yanbu / Jeddah, Saudi Arabia",
    description: "Turnkey supply, installation, and commissioning of an intelligent automated Tank Management System (TMS) for industrial bulk storage tanks.",
    scope: [
      "Supply and mounting of radar level gauges and temperature sensors",
      "SCADA network integration for real-time tank level and inventory tracking",
      "Automated overfill prevention and safety shutdown systems",
      "Operator workstation commissioning and client engineering training",
    ],
    featured: true,
    image: "/src/assets/images/projects/kingdom-rise-industrial-facility.jpg",
  },
  {
    id: "proj-tetra-pack-amc",
    title: "TETRA Pack Annual Instrumentation & Control Contract",
    client: "TETRA Pack",
    year: "2023",
    era: "2021-2023+",
    sector: "Industrial",
    category: "Annual Maintenance Contract",
    location: "Jeddah Industrial Area, Saudi Arabia",
    description: "Multi-year annual maintenance and calibration contract for packaging lines, process instrumentation, and automated control systems.",
    scope: [
      "Scheduled preventive maintenance of sensitive process transmitters",
      "24/7 on-call emergency instrumentation response",
      "Calibration and certification compliant with food-grade sanitary standards",
      "Spare parts inventory optimization and logistics management",
    ],
    featured: false,
    image: "/src/assets/images/technology/kingdom-rise-technology-bim.jpg",
  },
  {
    id: "proj-mpp-stage1-global-chem",
    title: "MPP Stage-1 Global Chemical Industries Construction",
    client: "Global Company for Chemical Industries",
    year: "2020",
    era: "2021-2023+",
    sector: "Oil & Gas",
    category: "Civil & Industrial Construction",
    location: "Jubail / Eastern Province, Saudi Arabia",
    description: "Comprehensive civil and structural package for the MPP Stage-1 chemical plant expansion, including heavy equipment foundations and chemical containment basins.",
    scope: [
      "Heavy reinforced concrete machine foundations and vibrating pedestals",
      "Acid-resistant lining and chemical spill retention dykes",
      "Steel structure fabrication and building envelope construction",
      "Underground drainage, duct banks, and utility trenching",
    ],
    featured: true,
    image: "/src/assets/images/services/kingdom-rise-civil-engineering.jpg",
  },
  {
    id: "proj-ohtl-madina-airport",
    title: "132kV OHTL Madina East Substation to Airport",
    client: "SEC / Madina Airport Authority",
    year: "2020",
    era: "2021-2023+",
    sector: "Electrical",
    category: "High-Voltage Power Transmission",
    location: "Madina Al-Munawwarah, Saudi Arabia",
    description: "Civil works, foundation construction, and tower reinforcement for the 132kV overhead transmission line connecting Madina East Substation directly to the Airport.",
    scope: [
      "Excavation and rock anchoring for transmission tower footings",
      "High-strength reinforced concrete stub foundations",
      "Earthing grid installation and soil resistivity mitigation",
      "Logistical coordination along active airport security corridors",
    ],
    featured: true,
    image: "/src/assets/images/corporate/kingdom-rise-saudi-infrastructure-hero.jpg",
  },
  {
    id: "proj-swcc-extension",
    title: "SWCC Water Pipeline Receiver & Launcher Area Extension",
    client: "SWCC (Saline Water Conversion Corp)",
    year: "2020",
    era: "2021-2023+",
    sector: "Water & Power",
    category: "Mechanical & Piping Infrastructure",
    location: "Western Province, Saudi Arabia",
    description: "Mechanical expansion and structural reinforcement of the pig launcher and receiver stations along major high-capacity saline water transmission conduits.",
    scope: [
      "Mechanical piping fabrication, tie-ins, and high-pressure testing",
      "Concrete anchor blocks and heavy pipe support pedestals",
      "Valve chamber construction with remote telemetry controls",
      "Cathodic protection monitoring integration",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-mechanical-engineering.jpg",
  },

  // Era 3: 2016-2020 (Major Infrastructure Projects)
  {
    id: "proj-mod-tower",
    title: "Ministry of Defense 100m Wireless Communications Tower",
    client: "Ministry of Defense (MOD)",
    year: "2016",
    era: "2016-2020",
    sector: "Civil",
    category: "Government & Telecommunications",
    location: "Western Region, Saudi Arabia",
    description: "Complete turnkey construction of a 100-meter self-supporting wireless communication lattice tower including deep geotechnical foundation works and perimeter security.",
    scope: [
      "Geotechnical soil analysis and deep mass concrete pad foundations",
      "Lattice steel tower assembly and vertical crane erection to 100 meters",
      "Aviation obstruction lighting and lightning protection dissipation grid",
      "High-security compound fencing and solar backup shelter",
    ],
    featured: true,
    image: "/src/assets/images/services/kingdom-rise-civil-engineering.jpg",
  },
  {
    id: "proj-aramco-surveillance",
    title: "Saudi Aramco Surveillance Infrastructure Civil Works",
    client: "Saudi Aramco",
    year: "2016",
    era: "2016-2020",
    sector: "Oil & Gas",
    category: "Industrial Security & Civil Works",
    location: "Rabigh / Western Area, Saudi Arabia",
    description: "Specialized civil works, reinforced concrete bases, and cable trenching for Saudi Aramco facility perimeter surveillance and radar systems.",
    scope: [
      "Excavation and casting of vibration-free surveillance pole foundations",
      "Armored underground power and fiber optic trenching across rocky terrain",
      "Strict compliance with Saudi Aramco Construction Safety Standards",
      "Work permit receiver management and zero-incident execution",
    ],
    featured: true,
    image: "/src/assets/images/projects/kingdom-rise-aramco-infrastructure.jpg",
  },
  {
    id: "proj-132kv-muhayil",
    title: "132kV OHTL Muhayil ~ Shabian Concrete & Reinforcement",
    client: "SEC - Saudi Electricity Company",
    year: "2016",
    era: "2016-2020",
    sector: "Electrical",
    category: "Power Transmission Infrastructure",
    location: "Asir / Southern Region, Saudi Arabia",
    description: "Massive concrete works and steel reinforcement for overhead transmission line towers across rugged mountainous terrain between Muhayil and Shabian.",
    scope: [
      "Mountainous access road cutting and heavy machinery positioning",
      "Reinforced concrete foundations with high sulfate-resisting cement",
      "Precision anchor bolt cage setting for high-capacity steel towers",
      "100% QA/QC compressive cube testing and third-party laboratory verification",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-electrical-engineering.jpg",
  },
  {
    id: "proj-380kv-rabigh-makkah",
    title: "380kV OHTL Rabigh to Makkah Transmission Reinforcement",
    client: "SEC - Saudi Electricity Company",
    year: "2016",
    era: "2016-2020",
    sector: "Electrical",
    category: "High-Voltage Power Transmission",
    location: "Rabigh - Makkah Corridor, Saudi Arabia",
    description: "Heavy structural reinforcement and foundation enhancement for the primary 380kV ultra-high-voltage transmission corridor supplying power to Makkah.",
    scope: [
      "Foundation remediation and concrete collar encasement under live lines",
      "Steel reinforcement and micro-piling across shifting desert sands",
      "High-voltage safety clearances and coordinated outage management",
      "Rigid environmental protection controls for desert ecosystems",
    ],
    featured: false,
    image: "/src/assets/images/corporate/kingdom-rise-saudi-infrastructure-hero.jpg",
  },
  {
    id: "proj-mbcc-crusher",
    title: "MBCC Site Crusher Instrumentation & Control System",
    client: "MBCC",
    year: "2017-2018",
    era: "2016-2020",
    sector: "Industrial",
    category: "Process Automation",
    location: "Western Province, Saudi Arabia",
    description: "Engineering, installation, and commissioning of heavy industrial automation and electrical control systems for a commercial rock crusher facility.",
    scope: [
      "Motor control center (MCC) panels and variable frequency drives (VFD)",
      "Vibration sensor monitoring and automated conveyor trip interlocks",
      "Dust suppression control valves and water metering systems",
      "Centralized operator control cabin with graphical HMI interface",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-electrical-engineering.jpg",
  },
  {
    id: "proj-al-reef-sugar",
    title: "Al Reef Sugar Refinery Process Packing & Control Line",
    client: "Al Reef Sugar Refinery",
    year: "2016-2018",
    era: "2016-2020",
    sector: "Industrial",
    category: "Mechanical & Process Automation",
    location: "King Fahd Industrial Port, Yanbu, Saudi Arabia",
    description: "Complete mechanical assembly and instrumentation integration for automated sugar packaging lines and material handling conveyors.",
    scope: [
      "Mechanical installation of multi-head bagging machines and conveyors",
      "Food-grade stainless steel pneumatics and product chutes",
      "PLC automation, batch weight verification, and checkweighers",
      "Integrated emergency stop cables and safety light curtains",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-mechanical-engineering.jpg",
  },
  {
    id: "proj-ymwts-terminal",
    title: "YMWTS Water Terminal Station Construction",
    client: "YMWTS (Yanbu-Madinah Water Transmission)",
    year: "2018",
    era: "2016-2020",
    sector: "Water & Power",
    category: "Civil & Infrastructure",
    location: "Yanbu - Madinah Route, Saudi Arabia",
    description: "Full civil and structural construction of the regional water terminal station building, surge tanks, pump foundations, and site perimeter.",
    scope: [
      "Heavy concrete foundation slabs for surge protection vessels",
      "Control building construction including masonry, MEP, and finishes",
      "Asphalt access roads, perimeter security fencing, and drainage channels",
      "Hydrostatic testing coordination with national water authorities",
    ],
    featured: true,
    image: "/src/assets/images/services/kingdom-rise-civil-engineering.jpg",
  },
  {
    id: "proj-oil-refining-control",
    title: "Private Oil Refinery Control & Monitoring System",
    client: "Private Oil Refineries",
    year: "2018-2019",
    era: "2016-2020",
    sector: "Oil & Gas",
    category: "Instrumentation & SCADA",
    location: "Jeddah Industrial City, Saudi Arabia",
    description: "Comprehensive control and real-time monitoring system integration for high-temperature distillation and refining process circuits.",
    scope: [
      "Explosion-proof hazardous area (ATEX/IECEx) instrumentation",
      "Redundant SCADA servers with remote telemetry terminal units",
      "Automatic thermal relief valve actuation and alarm thresholds",
      "Comprehensive hazop safety verification and loop attestations",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-mechanical-engineering.jpg",
  },

  // Era 2: 2009-2015 (Growth Period Projects)
  {
    id: "proj-saudi-airline-cargo-bldg",
    title: "Saudi Airline Cargo Office Building Construction",
    client: "Saudi Airlines Cargo",
    year: "2011",
    era: "2009-2015",
    sector: "Aviation",
    category: "Commercial Building & MEP",
    location: "King Abdulaziz International Airport, Jeddah",
    description: "Turnkey building construction for the commercial office building of Saudi Airline Cargo, integrating complete architectural, structural, and electro-mechanical systems.",
    scope: [
      "Multi-story reinforced concrete building frame and exterior curtain wall",
      "High-efficiency central HVAC air conditioning and distribution ducting",
      "Complete electrical power, emergency lighting, and IT network risers",
      "Building Management System (BMS) integration for environmental controls",
    ],
    featured: true,
    image: "/src/assets/images/services/kingdom-rise-civil-engineering.jpg",
  },
  {
    id: "proj-kaec-ro-plant",
    title: "Reverse Osmosis (RO) Desalination Plant Commissioning",
    client: "King Abdullah Economic City (KAEC)",
    year: "2011",
    era: "2009-2015",
    sector: "Water & Power",
    category: "Mechanical & Process Engineering",
    location: "KAEC, Rabigh, Saudi Arabia",
    description: "Installation and mechanical commissioning of the heavy seawater Reverse Osmosis (RO) desalination plant units serving King Abdullah Economic City.",
    scope: [
      "High-pressure duplex stainless steel membrane vessel piping",
      "Installation of VFD-driven high pressure feed pumps and energy recovery turbines",
      "Chemical dosing skids, intake filtration units, and brine outfall headers",
      "Process loop calibration and 72-hour continuous performance test run",
    ],
    featured: true,
    image: "/src/assets/images/services/kingdom-rise-mechanical-engineering.jpg",
  },
  {
    id: "proj-380kv-jeddah",
    title: "380kV OHTL Jeddah Concrete & Structural Reinforcement",
    client: "SEC - Saudi Electricity Company",
    year: "2013",
    era: "2009-2015",
    sector: "Electrical",
    category: "Power Transmission",
    location: "Jeddah Metropolitan Outskirts, Saudi Arabia",
    description: "Concrete and rebar reinforcement works for 380kV heavy overhead transmission line pylons across varied coastal and sandy geotechnical conditions.",
    scope: [
      "Mass foundation excavations and dewatering in coastal salinity zones",
      "Sulfate-resistant reinforced concrete casting and curing management",
      "Transmission tower steel footings inspection and torque verification",
      "Strict compliance with SEC transmission construction guidelines",
    ],
    featured: false,
    image: "/src/assets/images/corporate/kingdom-rise-saudi-infrastructure-hero.jpg",
  },
  {
    id: "proj-swcc-boilers",
    title: "SWCC Boilers Fuel Supply System Replacement Phase 2",
    client: "SWCC (Saline Water Conversion Corp)",
    year: "2011-2013",
    era: "2009-2015",
    sector: "Water & Power",
    category: "Mechanical & Boilers",
    location: "Western Coast Desalination Complex, Saudi Arabia",
    description: "Complete replacement and overhaul of fuel supply systems for high-pressure power generation boilers in Phase 2 alongside modern digital burner control systems.",
    scope: [
      "Dismantling of aged high-pressure fuel oil piping and pump skids",
      "Installation of automated dual-fuel manifold systems with flow instrumentation",
      "Upgraded burner management system (BMS) with optical flame detectors",
      "Hydrostatic pressure testing and live boiler synchronization",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-mechanical-engineering.jpg",
  },
  {
    id: "proj-scaffolding-factory",
    title: "Industrial Scaffolding Manufacturing Plant Construction",
    client: "Private Industrial Client",
    year: "2010",
    era: "2009-2015",
    sector: "Industrial",
    category: "Industrial Facility Construction",
    location: "Jeddah Industrial City Phase 3",
    description: "Civil and structural construction of a heavy industrial facility dedicated to scaffolding manufacturing, fabrication workshops, and overhead gantry cranes.",
    scope: [
      "Heavy load-bearing floor slabs designed for heavy metal coil storage",
      "Pre-engineered steel building (PEB) structure with 15-ton crane runway beams",
      "Industrial electrical power sub-station and welding busduct layout",
      "Administrative office wing, loading docks, and exterior concrete aprons",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-civil-engineering.jpg",
  },
  {
    id: "proj-ipa-housing",
    title: "Institute of Public Administration Staff Housing Building",
    client: "Institute of Public Administration (IPA)",
    year: "2012",
    era: "2009-2015",
    sector: "Civil",
    category: "Residential & Institutional",
    location: "Jeddah Campus, Saudi Arabia",
    description: "General contracting and building construction for staff residential apartment blocks with modern finishes, elevators, landscaping, and dedicated parking.",
    scope: [
      "Reinforced concrete frame structure with thermal blockwork masonry",
      "Luxury interior finishes, ceramic tiling, and solid wood millwork",
      "Energy-efficient VRF air conditioning and solar thermal domestic hot water",
      "External landscaping, shade structures, and stormwater drainage",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-civil-engineering.jpg",
  },

  // Era 1: 2002-2008 (Foundation Projects)
  {
    id: "proj-tank-scada",
    title: "SCADA Tank Management System Integration",
    client: "Petrochemical Logistics",
    year: "2007-2008",
    era: "2002-2008",
    sector: "Oil & Gas",
    category: "Instrumentation & SCADA",
    location: "Jeddah Marine Terminal, Saudi Arabia",
    description: "Design and deployment of SCADA software and field telemetry for multi-product fuel storage tank farms.",
    scope: [
      "Installation of servo level gauges and multi-spot temperature transmitters",
      "Fiber optic ring communications across hazardous tank zones",
      "SCADA control room human-machine interface (HMI) screens",
      "Custody transfer accuracy calibration according to API standards",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-electrical-engineering.jpg",
  },
  {
    id: "proj-gas-turbine-flowmeters",
    title: "Gas Turbine Units Fuel Flowmeter Systems",
    client: "Power Generation Authority",
    year: "2006",
    era: "2002-2008",
    sector: "Electrical",
    category: "Instrumentation & Power",
    location: "Western Province, Saudi Arabia",
    description: "Supply, high-precision calibration, and integration of Coriolis fuel flowmeter systems on heavy industrial gas turbines.",
    scope: [
      "Precision flow calibration across extreme temperature and pressure cycles",
      "Digital integration with turbine Woodward governors and alarm panels",
      "Transient flow surge testing and loop documentation",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-electrical-engineering.jpg",
  },
  {
    id: "proj-drug-warehouse-temp",
    title: "Drug Storage Warehouse Temperature Control & Monitoring",
    client: "National Medical Storage Facilities",
    year: "2002",
    era: "2002-2008",
    sector: "Mechanical",
    category: "HVAC & Temperature Control",
    location: "Jeddah, Saudi Arabia",
    description: "Foundational pharmaceutical cold-chain temperature control, monitoring, and certified multi-channel data logging system.",
    scope: [
      "Multi-zone HVAC temperature and humidity stabilization systems",
      "Redundant digital temperature sensors and circular chart recorders",
      "Automated SMS and audible alarm triggers for temperature excursions",
      "Ministry of Health compliance validation documentation",
    ],
    featured: false,
    image: "/src/assets/images/services/kingdom-rise-mechanical-engineering.jpg",
  },
];

export const FLEET_CATEGORIES: EquipmentCategory[] = [
  {
    categoryNumber: "01",
    title: "Earthmoving & Heavy Construction Machinery",
    description: "High-capacity earthmoving fleet maintained to strict Saudi safety standards with certified operators.",
    items: [
      { name: "Heavy Hydraulic Excavators", specs: "Caterpillar & Komatsu 20-35T for deep rock excavation & trenching" },
      { name: "Heavy Crawler Bulldozers", specs: "High-efficiency blade grading, leveling, and site clearing" },
      { name: "Hydraulic Boom Trucks", specs: "Lifting, material placement, and high-reach structural positioning" },
      { name: "JCB Backhoe Loaders", specs: "Multi-purpose site excavation, utility trenches, and pipe handling" },
      { name: "Bobcats (Compact Skid-Steer Loaders)", specs: "Confined space earthwork, building interiors, and cleanup" },
      { name: "Heavy Wheel Loaders", specs: "Aggregate loading, bulk earth removal, and stockpiling" },
      { name: "Heavy Dump Trucks (Tri-Axle)", specs: "Bulk soil and debris transport across project corridors" },
      { name: "Lowbed Equipment Trailers", specs: "Heavy plant mobilization between Jeddah and provincial sites" },
      { name: "High-Capacity Water Tankers", specs: "Dust suppression, compaction moisture conditioning, and site water" },
    ],
  },
  {
    categoryNumber: "02",
    title: "Transportation & Support Fleet",
    description: "Reliable logistics ensuring safe and punctual transport of engineering personnel, labor crews, and site tools.",
    items: [
      { name: "Coaster Buses (25-Passenger Capacity)", specs: "Dedicated daily workforce site transportation" },
      { name: "Dyna 12-Seater Vans", specs: "Specialized technical crew and supervisor transport" },
      { name: "Crew Cab Heavy Pickups", specs: "Multi-purpose site support with built-in tool beds" },
      { name: "4x4 Heavy Duty Pickups", specs: "Rapid response site coordination and material delivery" },
      { name: "Off-Road 4x4 Survey Jeeps", specs: "Rugged desert and mountainous transmission line access" },
    ],
  },
  {
    categoryNumber: "03",
    title: "Power Generation & On-Site Workshop Equipment",
    description: "Self-sufficient mobile power and fabrication units enabling continuous operations on remote Saudi sites.",
    items: [
      { name: "Heavy Silent Generators 220 kVA", specs: "High-capacity prime power generation for large sites" },
      { name: "Medium Generators 115 kVA", specs: "Distributed power generation for camps, lighting, and testing" },
      { name: "Industrial Welding Sets 400 AMS", specs: "Heavy duty diesel welding units for ASME pipe & structural steel" },
      { name: "Concrete Vibrators (High-Frequency)", specs: "Ensuring air-bubble-free structural concrete consolidation" },
      { name: "Plate & Jumper Soil Compactors", specs: "Foundation sub-base and trench layer-by-layer compaction" },
      { name: "Carpenter Power Tool Workshop Mobile Trailers", specs: "Complete on-site formwork shaping and wood fabrication" },
    ],
  },
  {
    categoryNumber: "04",
    title: "Survey & Precision Measurement Instruments",
    description: "Millimeter-accuracy surveying tools with up-to-date third-party calibration certificates.",
    items: [
      { name: "Leica Total Stations (High-Precision)", specs: "Laser coordinate layout, boundary control, and 3D terrain mapping" },
      { name: "Digital Optical Theodolites", specs: "Accurate angular alignment for towers and vertical columns" },
      { name: "Auto Level Optical Instruments", specs: "Precise elevation, foundation leveling, and road grading profiles" },
      { name: "Certified Calibration Standards", specs: "All instruments tested and attested by accredited third-party laboratories" },
    ],
  },
];

export const DEPARTMENTS: DepartmentItem[] = [
  {
    id: "ops",
    deptNumber: "01",
    title: "Projects Operations Department",
    managerTitle: "Projects Operations Manager",
    description: "The central pivotal department of the company, with all other departments supporting its mission. This department has the critical responsibility of handing over projects on time and within target budget without sacrificing quality and safety.",
    primaryResponsibilities: [
      "Management and supervision of all projects from site mobilization to final client handover",
      "Coordination of daily work permits, manpower deployment, and heavy equipment allocation",
      "Direct oversight of subcontractor activities and material delivery sequencing",
      "Maintaining weekly progress milestones against approved Primavera master schedules",
    ],
    teamComposition: ["Project Managers", "Site Construction Managers", "Senior Site Engineers", "Discipline Foremen", "Certified Skilled Craftsmen", "Safety Officers"],
    keyFocusAreas: ["On-time Delivery", "Budget Control", "Quality Standards", "Safety First"],
  },
  {
    id: "tech",
    deptNumber: "02",
    title: "Tendering & Technical Department",
    managerTitle: "Tendering & Technical Manager",
    description: "The main duty of this department is to provide technical assistance to all projects and perform research and study of current trends in technology and information.",
    primaryResponsibilities: [
      "Comprehensive technical design review, geotechnical investigation, queries, and engineering studies",
      "Preparation of shop drawings, as-built documentation, submittals, and material compliance certificates",
      "Monitoring contracts, variation orders, and technical correspondence with clients and consultants",
      "Pre-bidding analysis, estimation, quantity takeoff, and formal tender proposal submissions",
    ],
    teamComposition: ["Tendering Engineers", "BIM Specialists", "AutoCAD Draftsmen", "Quantity Surveyors", "Cost Estimators"],
    keyFocusAreas: ["Technical Design & Drafting", "BIM Modeling", "Bid Preparation & Management", "Cost Optimization"],
  },
  {
    id: "planning",
    deptNumber: "03",
    title: "Planning & Development Department",
    managerTitle: "Planning & Development Manager",
    description: "The Planning Department is essential in controlling, monitoring, evaluating, scheduling, and budgeting of projects, ensuring efficient resource allocation and timely completion.",
    primaryResponsibilities: [
      "Determining detailed cost estimates, quantity surveys, preparing BOQs, and assigning weight percentages",
      "Developing master schedules in Primavera P6 and MS Project with critical path analysis",
      "Monitoring ongoing site progress, identifying bottlenecks, and issuing corrective action recommendations",
      "Managing monthly client payment applications, invoice preparations, and milestone audits",
    ],
    teamComposition: ["Planning Engineers", "Cost Control Engineers", "Primavera Schedulers", "BOQ Specialists"],
    keyFocusAreas: ["Cost Estimation & BOQ", "Scheduling & Critical Path", "Progress Monitoring", "Resource Optimization"],
  },
  {
    id: "qaqc",
    deptNumber: "04",
    title: "Quality Assurance & Control Department",
    managerTitle: "QA/QC Manager",
    description: "The department guarantees the quality of all works by conducting inspection, controlling and assuring quality, and maintaining comprehensive records through the Project Quality Initiative (PQI).",
    primaryResponsibilities: [
      "Formulating project-specific Inspection and Test Plans (ITPs) with Hold, Witness, and Review points",
      "Conducting receiving inspections on all incoming raw materials, concrete mix batches, and steel heats",
      "Ensuring all testing equipment, batching plants, and survey instruments are regularly calibrated",
      "Liaising with third-party accredited laboratories for independent testing and concrete compressive strength certificates",
    ],
    teamComposition: ["QA Coordinators", "Senior QC Civil Engineers", "QC Electrical Inspectors", "Site Laboratory Technicians"],
    keyFocusAreas: ["Incoming Material Inspection", "In-Process Quality Checks", "Third-Party Verification", "Full Traceability to Origin"],
  },
  {
    id: "procurement",
    deptNumber: "05",
    title: "Procurement Department",
    managerTitle: "Procurement Manager",
    description: "The Procurement Department is in-charge of sourcing all project requirements except human resources, ensuring timely availability of quality materials and equipment at competitive costs.",
    primaryResponsibilities: [
      "Canvassing local and international supply chains for high-grade construction materials and parts",
      "Managing sample submissions, technical data sheets (TDS), and consultant approvals",
      "Negotiating purchase contracts and bulk material pricing discounts (achieving 15-20% cost optimization)",
      "Coordinating timely logistics, customs clearances, and secure site delivery schedules (95%+ on-time rate)",
    ],
    teamComposition: ["Procurement Officers", "Material Sourcing Specialists", "Logistics Coordinators", "Expediting Agents"],
    keyFocusAreas: ["Supplier Canvassing", "Sample Approvals", "Cost Optimization (15-20%)", "On-time Delivery (95%+)"],
  },
  {
    id: "logistics",
    deptNumber: "06",
    title: "Equipment & Logistics Department",
    managerTitle: "Equipment & Logistics Manager",
    description: "This department manages and supervises acquisitions, maintenance, repairs, and performance of our extensive company-owned equipment fleet and operators, ensuring optimal utilization across the Kingdom.",
    primaryResponsibilities: [
      "Comprehensive oversight of machinery acquisitions, preventive maintenance schedules, and oil inspections",
      "Mandatory operator certification, defensive driving tests, and safety compliance evaluations",
      "Mobilization of heavy excavators, bulldozers, and trailers across project sites in Saudi Arabia",
      "Minimizing plant breakdown downtime through dedicated mobile workshop vans and genuine spare parts",
    ],
    teamComposition: ["Heavy Equipment Fleet Supervisors", "Master Mechanics", "Hydraulic Specialists", "Certified Heavy Operators"],
    keyFocusAreas: ["Fleet Maintenance", "Operator Certification", "High Utilization", "Minimal Operating Cost"],
  },
  {
    id: "safety",
    deptNumber: "07",
    title: "Safety & Loss Prevention Department",
    managerTitle: "Safety Manager",
    description: "It is a priority to ensure safety and maintenance of properties in good working condition and to prevent loss and damage to environments, property, and people. Driven by our Zero Accident goal.",
    primaryResponsibilities: [
      "Enforcing the written Accident Prevention Program across all projects with 10 on-site safety supervisors",
      "Conducting mandatory 15-minute new hire orientations and weekly toolbox safety talks",
      "Rigid enforcement of 100% PPE compliance (hard hats, steel-toe boots, safety vests, glasses, harness above 6ft)",
      "Executing weekly safety audits, near-miss logging, and reporting all incidents within 24 hours",
    ],
    teamComposition: ["Safety Director", "Safety Manager", "10 Site Safety Supervisors", "Scaffolding Inspectors", "PTW Permit Receivers"],
    keyFocusAreas: ["Zero LTI Target", "100% PPE Compliance", "Toolbox Meetings", "Emergency Response Readiness"],
  },
  {
    id: "admin",
    deptNumber: "08",
    title: "Finance & Administration Department",
    managerTitle: "Finance & Admin Manager",
    description: "Ensures seamless corporate operations, fiscal health, regulatory compliance with Saudi business frameworks, and strategic banking partnerships.",
    primaryResponsibilities: [
      "Corporate financial accounting, audits, VAT compliance, and payroll management for our skilled workforce",
      "Managing credit facilities, project performance bonds, and guarantees with SNB and Al Rajhi Bank",
      "Human resources, government relations (GOSI, Qiwa, Chamber of Commerce), and visa processing",
      "Legal and corporate governance ensuring compliance with Kingdom of Saudi Arabia commercial laws",
    ],
    teamComposition: ["Senior Accountants", "HR Managers", "Government Relations Officers (GRO)", "Legal Counsel"],
    keyFocusAreas: ["Financial Integrity", "Bonding Capacity", "Regulatory Compliance", "Workforce Welfare"],
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Saudi Vision 2030 and the Surge in Heavy Civil Infrastructure",
    slug: "saudi-vision-2030-infrastructure-growth",
    category: "Infrastructure",
    date: "March 2026",
    readTime: "5 min read",
    author: "KRC Engineering Directorate",
    summary: "How Saudi Arabia's transformative Vision 2030 is driving unprecedented standards for heavy civil contracting, logistics resilience, and engineering precision.",
    tags: ["Vision 2030", "Civil Engineering", "Saudi Infrastructure", "Jeddah Projects"],
    content: [
      "The rapid transformation of the Kingdom of Saudi Arabia under Vision 2030 has reshaped the construction sector into an engine of high-tech infrastructure development. Heavy civil contractors are no longer judged solely on earthmoving volume, but on strict quality compliance, environmental stewardship, and digital scheduling precision.",
      "At Kingdom Rise Company (KRC), our foundation in heavy civil projects—from the 100-meter Ministry of Defense communications tower to 380kV high-voltage transmission foundations—positions us at the center of this transformation.",
      "With strategic bases in Jeddah, the gateway to the holy cities, and projects spanning Makkah, Yanbu, Madinah, Jubail, and Tabuk, our extensive fleet of modern machinery units and seasoned engineering cadres provide the dependable execution required by national giga-developments.",
    ],
  },
  {
    id: "post-2",
    title: "Critical Factors in 380kV and 132kV Overhead Transmission Line Foundations",
    slug: "ohtl-power-transmission-foundations-engineering",
    category: "Power & Electrical",
    date: "February 2026",
    readTime: "6 min read",
    author: "Electrical & Structural Division",
    summary: "A technical examination of soil-structure interaction, sulfate resistance, and precision anchor cage setting in desert and coastal Saudi environments.",
    tags: ["Electrical", "OHTL", "Power Transmission", "SEC Guidelines", "Concrete Engineering"],
    content: [
      "Constructing overhead transmission line (OHTL) infrastructure across Saudi Arabia presents unique geotechnical hurdles: shifting desert sands, hard volcanic rock basalt layers, and high-salinity coastal water tables.",
      "Over our history of delivering 20+ major civil packages for SEC and regional infrastructure, including the 380kV Jeddah corridor and the 132kV Madina Airport link, Kingdom Rise Company has established rigorous concrete mix design parameters utilizing sulfate-resistant cements and micro-silica enhancements.",
      "Our survey crews deploy Leica Total Stations to verify anchor bolt placement within millimeter tolerances, ensuring that high-voltage lattice towers endure extreme thermal expansion and lateral wind shears.",
    ],
  },
  {
    id: "post-3",
    title: "Industrial Automation and SCADA: Maximizing Plant Reliability in Petrochemicals",
    slug: "industrial-automation-scada-petrochemical-plants",
    category: "Process Automation",
    date: "January 2026",
    readTime: "4 min read",
    author: "Instrumentation & Control Team",
    summary: "How integrated Tank Management Systems (TMS) and redundant loop calibration prevent costly downtime in refineries and bulk storage facilities.",
    tags: ["SCADA", "Automation", "Tank Management", "Petrochemicals", "Aramco Standards"],
    content: [
      "In heavy process industries such as chemical production, sugar refining, and petroleum storage, uninterrupted operation depends on the integrity of field instrumentation loops. An inaccurate sensor or latency in a SCADA terminal can disrupt an entire refining cycle.",
      "Our work on the IFFCO Tank Management System and extensive loop testing contracts with SWCC illustrates the importance of third-party attested calibrations and failsafe emergency shutdown (ESD) logic.",
      "By integrating PLC automation with modern Building Management Systems (BMS), plant operators achieve full real-time visibility, automated batch verification, and compliance with stringent environmental safety mandates.",
    ],
  },
];
