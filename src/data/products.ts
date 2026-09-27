export interface ProductPdf {
  title: string;
  subtitle?: string;
  url: string;
  fileName: string;
  slideCount?: number;
  fileSize?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  industry: string;
  shortBenefit: string;
  description: string;
  image: string;
  actionText: string;
  destinationType: 'external' | 'internal-panel';
  url?: string;
  pdf?: ProductPdf;
  // Detail metadata for products using internal detail panel
  detail?: {
    overview: string;
    features: string[];
    useCases: string[];
    technicalHighlights: string[];
  };
}

export const products: ProductItem[] = [
  // Row 1, Left
  {
    id: 'pammy-ai',
    name: 'Pammy AI',
    industry: 'Maritime Operations',
    shortBenefit: 'Document intelligence for maritime & crew operations.',
    description: 'Automate crew onboarding, flag compliance risks, and streamline maritime documents across fleet operations.',
    image: '/assets/products/pammy-ai.jpg',
    actionText: 'Explore Pammy AI',
    destinationType: 'internal-panel',
    pdf: {
      title: 'Pammy AI Business Presentation',
      subtitle: 'Pammy AI Maritime Operations & Intelligent Automation (12 Slides)',
      url: '/assets/docs/document-ai-business-presentation.pdf',
      fileName: 'Pammy-AI-Business-Presentation.pdf',
      slideCount: 12,
      fileSize: '2.5 MB'
    },
    detail: {
      overview: 'Pammy AI accelerates maritime crew readiness and compliance by automating document ingestion, cross-checks, and validation for cruise lines and commercial vessels.',
      features: [
        'Multi-format document ingestion (Passports, Visas, Seaman Books, STCW certificates)',
        'Automated OCR extraction with real-time confidence scoring and anomaly detection',
        'Regulatory compliance cross-checks against flag state and port authority rules',
        'Direct integration with onboard crew management and enterprise ERP systems'
      ],
      useCases: [
        'Rapid maritime crew onboarding and pre-joining verification',
        'STCW, medical fitness, and seamanship license compliance tracking',
        'Port clearance document preparation and audit readiness'
      ],
      technicalHighlights: [
        'Maritime-specialized OCR models fine-tuned on multinational document standards',
        'Offline-ready edge processing for low-bandwidth satellite connectivity at sea',
        'Zero-data retention and enterprise cryptographic security standards'
      ]
    }
  },
  // Row 1, Right
  {
    id: 'ultra-passkey',
    name: 'Ultra passkey',
    industry: 'Identity & Security',
    shortBenefit: 'Verify identity. Preserve privacy.',
    description: 'Privacy-preserving identity verification for trusted digital access.',
    image: '/assets/products/private-id.jpg',
    actionText: 'Explore Ultra passkey',
    destinationType: 'external',
    url: 'https://privateid.com/'
  },
  // Row 2, Left
  {
    id: 'posmate',
    name: 'Posmate',
    industry: 'Cruise & Hospitality',
    shortBenefit: 'Service that moves with the guest.',
    description: 'Mobile ordering and payments for connected onboard experiences.',
    image: '/assets/products/postmate.jpg',
    actionText: 'Explore Posmate',
    destinationType: 'internal-panel',
    pdf: {
      title: 'POSMATE Business Presentation',
      subtitle: 'Cruise Ship POS Modernization (10 Slides)',
      url: '/assets/docs/posmate-business-presentation.pdf',
      fileName: 'POSMATE-Business-Presentation.pdf',
      slideCount: 10,
      fileSize: '2.4 MB'
    },
    detail: {
      overview: 'Posmate powers seamless, real-time handheld ordering, table management, and instant payment processing across hospitality venues and cruise vessels.',
      features: [
        'Mobile POS optimized for handheld tablets and ruggedized terminals',
        'Offline-first synchronization for connectivity-challenged environments',
        'Live table status, seat-level billing, and split payment flows',
        'Deep integration with galley/kitchen display systems (KDS)'
      ],
      useCases: [
        'Luxury cruise deck and poolside beverage ordering',
        'Fine dining table-side order entry and instant checkout',
        'High-volume event concession and retail transactions'
      ],
      technicalHighlights: [
        'Sub-second transaction latency',
        'PCI-DSS and EMV compliant payment terminal pairing',
        'Resilient mesh local caching during network dropouts'
      ]
    }
  },
  // Row 2, Right
  {
    id: 'ital',
    name: 'ITAL',
    industry: 'Maritime',
    shortBenefit: 'Every device. One clear view.',
    description: 'Visibility into devices, users, and applications across vessels and teams.',
    image: '/assets/products/ital.jpg',
    actionText: 'Explore ITAL',
    destinationType: 'internal-panel',
    pdf: {
      title: 'ITAL Business Presentation',
      subtitle: 'IT Asset Lookup & Fleet Telemetry (15 Slides)',
      url: '/assets/docs/ital-business-presentation.pdf',
      fileName: 'ITAL-Business-Presentation.pdf',
      slideCount: 15,
      fileSize: '2.5 MB'
    },
    detail: {
      overview: 'ITAL provides comprehensive maritime and distributed fleet IT asset management, monitoring connected devices, satellite links, and software health worldwide.',
      features: [
        'Unified fleet IT telemetry and asset lifecycle management',
        'Vessel connectivity status across VSAT, Starlink, and 5G/LTE',
        'Remote endpoint compliance, patch auditing, and policy enforcement',
        'Role-based access controls and rapid maritime support ticketing'
      ],
      useCases: [
        'Commercial fleet vessel IT operations and compliance',
        'Distributed offshore crew device administration',
        'Enterprise vessel software rollout and patch management'
      ],
      technicalHighlights: [
        'Low-bandwidth telemetry protocol optimized for satellite links',
        'Continuous health monitoring and anomaly alert engine',
        'Cross-platform agent support (Windows, macOS, Linux, Android)'
      ]
    }
  },
  // Row 3, Left
  {
    id: 'medugo',
    name: 'Medugo',
    industry: 'Healthcare',
    shortBenefit: 'Health information. All together.',
    description: 'Keep medical records, reports, and vitals organised, accessible, and ready to share.',
    image: '/assets/products/medugo.jpg',
    actionText: 'Explore Medugo',
    destinationType: 'external',
    url: 'https://www.medugo.com/'
  },
  // Row 3, Right
  {
    id: 'dr-queues',
    name: 'Dr Queues',
    industry: 'Healthcare',
    shortBenefit: 'A smoother journey to care.',
    description: 'Connect patient check-in, live queues, and digital report delivery.',
    image: '/assets/products/dr-queues.jpg',
    actionText: 'Explore Dr Queues',
    destinationType: 'external',
    url: 'https://www.drqueues.com/'
  }
];
