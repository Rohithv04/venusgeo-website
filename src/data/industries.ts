export interface IndustryCapability {
  delivered: string;
  solving: string;
  enable: string;
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
    capabilities: {
      delivered: 'Identity and document workflows, verification systems, secure data handling and automation for compliance-heavy environments.',
      solving: 'Reducing onboarding friction, improving fraud detection, automating document processing and integrating fragmented financial workflows.',
      enable: 'AI-assisted document intelligence, KYC/KYB workflows, identity verification, fraud monitoring, workflow orchestration, secure integrations and modern customer onboarding.'
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
    capabilities: {
      delivered: 'Digital patient journeys, information workflows, connected operational systems and healthcare-facing interfaces.',
      solving: 'Disconnected patient experiences, administrative friction, fragmented information and inefficient check-in workflows.',
      enable: 'AI-assisted operational workflows, digital intake, patient portals, connected health data experiences, scheduling, identity workflows and intelligent automation.'
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
    capabilities: {
      delivered: 'Scalable digital workflows, distributed system integrations, identity processes and enterprise operational tooling.',
      solving: 'Complex onboarding, distributed customer operations, identity verification, support workflow fragmentation and large-scale system integration.',
      enable: 'AI-powered support workflows, intelligent onboarding, verification, workflow automation, field operations platforms, analytics and enterprise system orchestration.'
    }
  },
  {
    id: 'cruise',
    num: '04',
    title: 'Cruise',
    shortName: 'Cruise',
    iconName: 'Ship',
    description: 'Mobile dining POS, offline-first connectivity, and seamless crew mobility engineered for open-ocean hospitality.',
    image: '/assets/industries/cruise.jpg',
    capabilities: {
      delivered: 'Mobile operational experiences, hospitality workflows, offline-first applications and distributed onboard systems.',
      solving: 'Intermittent connectivity, mobile workforce requirements, onboard hospitality operations and synchronized ship/shore processes.',
      enable: 'Offline-capable applications, mobile POS, crew applications, passenger experiences, onboard workflow automation, synchronized data systems and AI-assisted hospitality operations.'
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
    capabilities: {
      delivered: 'Mobile commerce workflows, ordering systems, payment experiences and operational synchronization.',
      solving: 'Slow order flow, disconnected inventory, payment friction, fragmented store operations and inconsistent digital experiences.',
      enable: 'AI-enabled ordering, digital menus, mobile POS, inventory intelligence, workforce tools, loyalty experiences, operational analytics and omnichannel workflows.'
    }
  },
  {
    id: 'maritime',
    num: '06',
    title: 'Maritime',
    shortName: 'Maritime',
    iconName: 'Compass',
    description: 'Comprehensive fleet device visibility, telemetry management, and remote endpoint security across vessels and shore teams.',
    image: '/assets/industries/maritime.jpg',
    capabilities: {
      delivered: 'Distributed device management, fleet visibility, remote operational workflows and telemetry-driven systems.',
      solving: 'Low-connectivity environments, distributed assets, remote support, device visibility and ship-to-shore operational complexity.',
      enable: 'Fleet intelligence, IoT monitoring, telemetry dashboards, remote endpoint management, predictive operations, workflow automation and AI-assisted fleet insights.'
    }
  }
];
