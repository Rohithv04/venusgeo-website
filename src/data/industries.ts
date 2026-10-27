export interface IndustryCapability {
  delivering: string;
  solving: string;
  enabling: string;
}

export interface ProductIndicator {
  name: string;
  role: string;
}

export interface IndustryItem {
  id: string;
  num: string;
  title: string;
  shortName: string;
  iconName: 'Landmark' | 'HeartPulse' | 'Radio' | 'Ship' | 'Store' | 'Compass';
  description: string;
  image: string;
  capabilities: IndustryCapability;
  productIndicators?: ProductIndicator[];
  optionalSummary?: string;
}

export const industries: IndustryItem[] = [
  {
    id: 'financial-services',
    num: '01',
    title: 'Financial Services',
    shortName: 'Financial Services',
    iconName: 'Landmark',
    description: 'Privacy-first verification, fraud prevention, and automated document extraction built for rigorous regulatory compliance.',
    image: '/assets/industries/finance.jpg',
    productIndicators: [
      { name: 'Pammy AI', role: 'Document Intelligence' },
      { name: 'Ultrapass™', role: 'FIDO2 Authentication' }
    ],
    capabilities: {
      delivering: "We're delivering secure document intelligence with Pammy AI and privacy-first authentication with FIDO2 Ultrapass™ — helping financial institutions digitize documents, verify identity, and strengthen customer access.",
      solving: "We're solving manual document processing, onboarding friction, identity risk, and password-dependent authentication by combining Pammy AI document workflows with Ultrapass™ passwordless, phishing-resistant access.",
      enabling: "We're enabling faster KYC and document workflows, secure customer authentication, fraud-resistant access, and modern digital onboarding while keeping business rules and human validation in control."
    }
  },
  {
    id: 'healthcare',
    num: '02',
    title: 'Healthcare',
    shortName: 'Healthcare',
    iconName: 'HeartPulse',
    description: 'Connected patient journeys, unified medical records, and digital check-in systems that elevate clinical throughput.',
    image: '/assets/industries/healthcare.jpg',
    productIndicators: [
      { name: 'MEDUGO', role: 'Connected Healthcare' },
      { name: 'DRQUEUES', role: 'Patient Flow & Queue Management' }
    ],
    capabilities: {
      delivering: "We're delivering connected healthcare operations through MEDUGO and DRQUEUES — supporting digital patient journeys, structured medical information, queue visibility, and more efficient clinical workflows.",
      solving: "We're solving fragmented patient information, manual intake, long waiting times, disconnected departments, and operational bottlenecks by bringing patient data and real-time queue workflows into one connected experience.",
      enabling: "We're enabling faster patient movement, better visibility across departments, digital records and reports, smoother doctor workflows, and more coordinated care across consultation, diagnostics, pharmacy, and follow-up."
    }
  },
  {
    id: 'telecom',
    num: '03',
    title: 'Telecom',
    shortName: 'Telecom',
    iconName: 'Radio',
    description: 'High-availability customer onboarding, identity verification pipelines, and distributed operations at scale.',
    image: '/assets/industries/telecom.jpg',
    productIndicators: [
      { name: 'Network Devices', role: 'Connectivity & Interoperability' },
      { name: 'Device Services', role: 'Device Intelligence & Validation' }
    ],
    capabilities: {
      delivering: "We're delivering Network Devices and Device Services supporting connectivity, interoperability, device intelligence and validation.",
      solving: "We're solving roaming/network complexity, interoperability, fraud exposure, and uncertainty around device identity/status.",
      enabling: "We're enabling reliable network operations, informed device decisions, and stronger telecom ecosystem workflows."
    }
  },
  {
    id: 'cruise',
    num: '04',
    title: 'Cruise & Hospitality',
    shortName: 'Cruise & Hospitality',
    iconName: 'Ship',
    description: 'Connected guest, crew, and shipboard commerce workflows engineered for open-ocean hospitality and multi-division operations.',
    image: '/assets/industries/cruise.jpg',
    optionalSummary: "Across 12 cruise divisions, we're connecting guest experience, crew operations, safety, and revenue-generating services.",
    capabilities: {
      delivering: "We're delivering connected guest and commercial experiences across Reservations & Sales, Embarkation, Accommodation, Food & Beverage, Entertainment, and Recreation & Wellness — from booking and check-in to onboard dining, stays, activities, and experiences.",
      solving: "We're solving fragmented shipboard operations across Retail & Shopping, Shore Excursions, Guest Services, and Safety & Security — improving service requests, excursion coordination, retail workflows, mustering, gangway control, and guest movement.",
      enabling: "We're enabling more connected Marine Operations and Debarkation, while linking the wider cruise journey through digital workflows, mobile operations, operational visibility, and better coordination from arrival through final departure."
    }
  },
  {
    id: 'retail-restaurants',
    num: '05',
    title: 'Retail & Restaurants',
    shortName: 'Retail & Restaurants',
    iconName: 'Store',
    description: 'Fast handheld ordering, frictionless payments, and inventory synchronization across high-volume venues.',
    image: '/assets/industries/retail.jpg',
    productIndicators: [
      { name: 'POSMATE', role: 'Restaurant Operations Platform' }
    ],
    capabilities: {
      delivering: "We're delivering POSMATE as a modern restaurant operations platform for ordering, billing, payments, menu management, and day-to-day service workflows across restaurants and hospitality businesses.",
      solving: "We're solving slow order flow, disconnected front-of-house and kitchen operations, billing friction, fragmented menus, and operational complexity that limits service speed and consistency.",
      enabling: "We're enabling faster ordering, smoother table and counter service, connected restaurant workflows, clearer operational visibility, and a more scalable digital foundation for single-location and multi-location restaurant businesses."
    }
  }
];
