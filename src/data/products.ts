export interface ProductItem {
  id: string;
  name: string;
  shortBenefit: string;
  description: string;
  image: string;
  actionText: string;
  destinationType: 'external' | 'internal-panel';
  url?: string;
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
    id: 'document-ai',
    name: 'Document AI',
    shortBenefit: 'From documents to clear action.',
    description: 'Turn document-heavy workflows into structured information and clearer decisions.',
    image: '/assets/products/document-ai.jpg',
    actionText: 'Explore Document AI',
    destinationType: 'internal-panel',
    detail: {
      overview: 'Document AI automates end-to-end data extraction and classification from complex, unstructured documents, invoices, legal contracts, and forms.',
      features: [
        'Multi-format intelligent document ingestion (PDF, scan, image)',
        'Key-value and tabular entity recognition with confidence scoring',
        'Human-in-the-loop exception handling and automated validation',
        'Enterprise ERP and workflow integrations'
      ],
      useCases: [
        'Invoice processing and accounts payable automation',
        'Compliance documentation verification and KYC onboarding',
        'Regulatory filing parsing and audit preparation'
      ],
      technicalHighlights: [
        'Fine-tuned domain OCR pipelines',
        'Zero-data retention option for sensitive workloads',
        'High-throughput asynchronous processing API'
      ]
    }
  },
  // Row 1, Right
  {
    id: 'private-id',
    name: 'Private ID',
    shortBenefit: 'Verify identity. Preserve privacy.',
    description: 'Privacy-preserving identity verification for trusted digital access.',
    image: '/assets/products/private-id.jpg',
    actionText: 'Explore Private ID',
    destinationType: 'external',
    url: 'https://privateid.com/'
  },
  // Row 2, Left
  {
    id: 'postmate',
    name: 'Postmate',
    shortBenefit: 'Service that moves with the guest.',
    description: 'Mobile ordering and payments for connected onboard experiences.',
    image: '/assets/products/postmate.jpg',
    actionText: 'Explore Postmate',
    destinationType: 'internal-panel',
    detail: {
      overview: 'Postmate powers seamless, real-time handheld ordering, table management, and instant payment processing across hospitality venues and cruise vessels.',
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
    shortBenefit: 'Every device. One clear view.',
    description: 'Visibility into devices, users, and applications across vessels and teams.',
    image: '/assets/products/ital.jpg',
    actionText: 'Explore ITAL',
    destinationType: 'internal-panel',
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
    shortBenefit: 'A smoother journey to care.',
    description: 'Connect patient check-in, live queues, and digital report delivery.',
    image: '/assets/products/dr-queues.jpg',
    actionText: 'Explore Dr Queues',
    destinationType: 'external',
    url: 'https://www.drqueues.com/'
  }
];
