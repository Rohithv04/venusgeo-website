export interface IndustryItem {
  id: string;
  title: string;
  iconName: 'Landmark' | 'HeartPulse' | 'Radio' | 'Ship' | 'Store' | 'Compass';
  description: string;
}

export const industries: IndustryItem[] = [
  {
    id: 'financial-services',
    title: 'Financial Services',
    iconName: 'Landmark',
    description: 'Privacy-first verification, fraud prevention, and automated document extraction built for rigorous regulatory compliance.'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    iconName: 'HeartPulse',
    description: 'Connected patient journeys, unified medical records, and digital check-in systems that elevate clinical throughput.'
  },
  {
    id: 'telecom',
    title: 'Telecom',
    iconName: 'Radio',
    description: 'High-availability customer onboarding, identity verification pipelines, and distributed operations at scale.'
  },
  {
    id: 'cruise',
    title: 'Cruise',
    iconName: 'Ship',
    description: 'Mobile dining POS, offline-first connectivity, and seamless crew mobility engineered for open-ocean hospitality.'
  },
  {
    id: 'retail-restaurants',
    title: 'Retail & Restaurants',
    iconName: 'Store',
    description: 'Fast handheld ordering, frictionless payments, and inventory synchronization across high-volume venues.'
  },
  {
    id: 'maritime',
    title: 'Maritime',
    iconName: 'Compass',
    description: 'Comprehensive fleet device visibility, telemetry management, and remote endpoint security across vessels and shore teams.'
  }
];
