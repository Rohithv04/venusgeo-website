export interface ProductPdf {
  title: string;
  subtitle?: string;
  url: string;
  fileName: string;
  slideCount?: number;
  fileSize?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc?: string;
}

export interface ProductProcess {
  intro: string;
  steps: ProcessStep[];
  capabilities?: string[];
  supportingStatement?: string;
}

export interface ProductDetail {
  eyebrow?: string;
  headline?: string;
  overview: string;
  workflowSteps?: string[];
  features: string[];
  useCases: string[];
  technicalHighlights: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  industry: string;
  shortBenefit: string;
  description: string;
  image: string;
  imageAlt?: string;
  actionText: string;
  destinationType: 'external' | 'internal-panel';
  url?: string;
  pdf?: ProductPdf;
  tags?: string[];
  process?: ProductProcess;
  ariaLabel?: string;
  variant?: 'standard' | 'light-red';
  detail?: ProductDetail;
}

export const products: ProductItem[] = [
  // Row 1, Left: Pammy AI (Standalone Document Intelligence Product)
  {
    id: 'pammy-ai',
    name: 'Pammy AI',
    industry: 'Document Intelligence',
    shortBenefit: 'AI-powered document verification for regulated workflows.',
    description: 'Pammy AI uses AI to extract, verify and validate information from business documents — helping teams automate document-heavy workflows while keeping rules and human review in control.',
    image: '/assets/products/pammy-ai.jpg',
    imageAlt: 'AI-assisted enterprise document verification workflow',
    actionText: 'Explore Pammy AI',
    destinationType: 'internal-panel',
    tags: [
      'Document Extraction',
      'Verification',
      'Rule Validation',
      'Human Review'
    ],
    pdf: {
      title: 'Pammy AI Business Presentation',
      subtitle: 'AI Document Intelligence & Verification Platform (12 Slides)',
      url: '/assets/docs/document-ai-business-presentation.pdf',
      fileName: 'Pammy-AI-Business-Presentation.pdf',
      slideCount: 12,
      fileSize: '2.5 MB'
    },
    detail: {
      eyebrow: 'DOCUMENT VERIFICATION AI',
      headline: 'Verify documents faster. Keep decisions accountable.',
      overview: 'Pammy AI is an AI-powered document intelligence and verification platform designed for document-heavy and regulated workflows. It extracts information, validates it against defined rules, identifies exceptions, and keeps human review available where confidence or compliance requires it.',
      workflowSteps: [
        'INGEST',
        'EXTRACT',
        'VERIFY',
        'VALIDATE',
        'REVIEW'
      ],
      features: [
        'MULTI-FORMAT DOCUMENT INGESTION: Process business documents, forms, reports, certificates and identity-related documents.',
        'AI-ASSISTED EXTRACTION: Convert unstructured document content into structured, usable information.',
        'DOCUMENT VERIFICATION: Compare extracted information, required fields and document data for consistency.',
        'RULE & REGULATORY VALIDATION: Validate information against configured business, compliance or regulatory requirements.',
        'CONFIDENCE & EXCEPTION HANDLING: Identify uncertain or anomalous information instead of allowing AI to guess silently.',
        'HUMAN REVIEW: Route exceptions or sensitive decisions for human confirmation.'
      ],
      useCases: [
        'FINANCIAL SERVICES: Document verification, onboarding documents, identity-related workflows and KYC/KYB support.',
        'HEALTHCARE: Medical reports, certificates, forms and structured information extraction.',
        'HR & WORKFORCE: Employee documentation, onboarding records and verification workflows.',
        'COMPLIANCE & ENTERPRISE OPERATIONS: Forms, certificates, licenses and other document-heavy operational processes.'
      ],
      technicalHighlights: [
        'Enterprise neural extraction models fine-tuned on diverse structured and semi-structured business forms',
        'Deterministic validation engines with real-time discrepancy alerts and confidence thresholding',
        'Zero-data retention architecture with end-to-end audit trails and cryptographic security'
      ]
    }
  },

  // Row 1, Right: FIDO2 Ultrapass™
  {
    id: 'fido2-ultrapass',
    name: 'FIDO2 Ultrapass™',
    industry: 'Identity & Security',
    shortBenefit: 'On-device biometric authentication in 25ms without any images leaving your device.',
    description: 'Privacy-preserving identity powered by homomorphic tokens at the Edge.',
    image: '/assets/products/private-id.jpg',
    actionText: 'Explore FIDO2 Ultrapass™',
    destinationType: 'internal-panel',
    pdf: {
      title: 'Ultrapass® for Carnival',
      subtitle: 'Standards-Based Identity for Guests, Crew, and the Connected Ship (14 Slides)',
      url: '/assets/docs/fido2-ultrapass-business-presentation.pdf',
      fileName: 'Ultrapass-Carnival-Business-Presentation.pdf',
      slideCount: 14,
      fileSize: '844 KB'
    },
    tags: [
      'On-Device Biometrics',
      'FIDO2 Passkeys',
      'NIST 800-63 IAL2/AAL2',
      'Zero Central Database'
    ],
    detail: {
      overview: 'FIDO2 Ultrapass™ delivers standards-based, on-device biometric identity verification and FIDO2 passkey authentication for cruise guests and crew. Operating on the principle that "answers travel, biometrics do not," all face matching, liveness detection, and age estimation run on-device in 25ms—transmitting kilobyte-scale cryptographic verdicts with zero central biometric databases and full offline-first resilience at sea.',
      features: [
        'Guest DigitalID Wallet: Remote identity proofing to NIST 800-63 IAL2 at home (passport ICAO Doc 9303 & DMV records) into an ISO/IEC 18013-5 & W3C Verifiable Credential wallet',
        'CrewID Workforce Access: Sub-second on-device face match + FIDO2 passkey login across shared shipboard devices—eliminating PINs, passwords, and credential sharing',
        'Real-Time On-Device Age Assurance: Instant 18/21 age verification at bars, casino entrances, and adult venues without handling physical documents',
        'Manager Selfie Approvals: Instant cryptographic sign-off for comps, refunds, and voids on any nearby tablet with an immutable audit trail',
        'Signed Bluetooth Presence: Emergency muster station accountability and watchkeeping check-in via BLE presence rolling up to the bridge in real time',
        'Privacy-by-Design Posture: Zero central biometric database to breach or secure, ensuring natural compliance with GDPR Article 9 and BIPA statutes'
      ],
      useCases: [
        'Pre-cruise online verification & ~94% embarkation processing time reduction (~2 hrs cut to ~30 mins)',
        'Frictionless onboard purchases, bar orders, and casino access with selfie re-authentication',
        'Shared-tablet crew authentication across dining, housekeeping, POS, inventory, and property management',
        'Emergency muster accountability and SOLAS Chapter III compliance with offline-ready bridge roll-call'
      ],
      technicalHighlights: [
        'NIST FRTE 1:1 Verification track participant (privid_004) with certified Level 3 presentation attack detection (ISO/IEC 30107-3)',
        'NIST CMVP validated cryptographic module (Certificate #4985) and FIDO2 / WebAuthn / CTAP2 standards compliance',
        'Offline-native architecture: Local matching, signed verdict queues, and zero satellite dependency in the identity critical path',
        'Low adoption cost: Software-only SDK integration in ~1–2 weeks per application with zero middleware server estate'
      ]
    }
  },

  // Row 2, Left: Cruise Operations 01 - Embarkation
  {
    id: 'embarkation',
    name: 'Embarkation',
    industry: 'Cruise Operations',
    shortBenefit: 'Faster check-in from port to ship.',
    description: 'Mobile-first guest check-in and identity capture designed to reduce reliance on traditional fixed check-in podiums and create a smoother embarkation experience.',
    image: '/assets/products/embarkation.jpg',
    actionText: 'Explore Product',
    destinationType: 'internal-panel',
    process: {
      intro: 'Embarkation is designed to simplify guest check-in using a lightweight mobile workflow. It helps cruise teams move away from traditional standalone podium setups while securely capturing guest information and supporting smoother boarding operations.',
      steps: [
        {
          step: '01',
          title: 'CHECK IN',
          desc: 'Start the guest check-in workflow from a mobile device.'
        },
        {
          step: '02',
          title: 'CAPTURE IDENTITY',
          desc: 'Capture the required guest identity information digitally.'
        },
        {
          step: '03',
          title: 'VERIFY',
          desc: 'Validate guest and boarding information.'
        },
        {
          step: '04',
          title: 'BOARD',
          desc: 'Confirm the guest and complete the embarkation process.'
        }
      ],
      capabilities: [
        'Mobile check-in',
        'Secure identity capture',
        'Wi-Fi / cellular operation',
        'Offline-capable workflow'
      ]
    }
  },

  // Row 2, Right: Cruise Operations 02 - Gangway
  {
    id: 'gangway',
    name: 'Gangway',
    industry: 'Cruise Operations',
    shortBenefit: "Know who's on board. And who's off.",
    description: 'Mobile identity verification for guests, crew and visitors moving between ship and port, with clear IN / OUT movement visibility.',
    image: '/assets/products/gangway.jpg',
    actionText: 'Explore Product',
    destinationType: 'internal-panel',
    process: {
      intro: 'Gangway supports mobile identity verification for guests, crew and visitors moving between the ship and port. The workflow helps operators register IN / OUT movement and maintain clearer onboard status without relying entirely on traditional fixed gangway podiums.',
      steps: [
        {
          step: '01',
          title: 'IDENTIFY',
          desc: 'Identify the guest, crew member or visitor.'
        },
        {
          step: '02',
          title: 'VERIFY',
          desc: 'Confirm identity through the mobile workflow.'
        },
        {
          step: '03',
          title: 'CHECK IN / OUT',
          desc: 'Register whether the person is entering or leaving the vessel.'
        },
        {
          step: '04',
          title: 'UPDATE STATUS',
          desc: 'Update onboard or off-board status.'
        }
      ],
      supportingStatement: 'Clearer souls-on-board and souls-off-board visibility.'
    }
  },

  // Row 3, Left: Cruise Operations 03 - Mustering
  {
    id: 'mustering',
    name: 'Mustering',
    industry: 'Cruise Operations',
    shortBenefit: 'Clear visibility when every person matters.',
    description: 'Digital identification and attendance workflows designed to support clearer onboard muster operations.',
    image: '/assets/products/mustering.jpg',
    actionText: 'Explore Product',
    destinationType: 'internal-panel',
    process: {
      intro: 'Mustering can support digital identification and attendance capture during onboard muster operations, helping teams maintain clearer visibility into confirmed and outstanding participation.',
      steps: [
        {
          step: '01',
          title: 'IDENTIFY',
          desc: 'Confirm the passenger or crew member.'
        },
        {
          step: '02',
          title: 'CHECK STATUS',
          desc: 'Match the person to the relevant muster workflow.'
        },
        {
          step: '03',
          title: 'CONFIRM',
          desc: 'Record attendance or completion status.'
        },
        {
          step: '04',
          title: 'MONITOR',
          desc: 'Maintain visibility of confirmed and outstanding status.'
        }
      ]
    }
  },

  // Row 3, Right: Cruise Operations 04 - Debarkation
  {
    id: 'debarkation',
    name: 'Debarkation',
    industry: 'Cruise Operations',
    shortBenefit: 'A smoother final step in the guest journey.',
    description: 'Structured mobile departure workflows designed to simplify guest verification and status updates as passengers leave the vessel.',
    image: '/assets/products/debarkation.jpg',
    actionText: 'Explore Product',
    destinationType: 'internal-panel',
    process: {
      intro: 'Debarkation can support structured guest departure workflows, helping teams verify passenger identity and update departure status as guests complete their journey and leave the vessel.',
      steps: [
        {
          step: '01',
          title: 'IDENTIFY',
          desc: 'Identify the departing guest.'
        },
        {
          step: '02',
          title: 'VERIFY',
          desc: 'Confirm identity and departure status.'
        },
        {
          step: '03',
          title: 'CHECK OUT',
          desc: 'Register the guest leaving the vessel.'
        },
        {
          step: '04',
          title: 'COMPLETE',
          desc: 'Complete the departure workflow and update status.'
        }
      ]
    }
  },

  // Row 4, Left: POSMATE
  {
    id: 'posmate',
    name: 'POSMATE',
    industry: 'Restaurant & Hospitality',
    shortBenefit: 'One POS for modern restaurant operations.',
    description: 'POSMATE is a restaurant and hospitality POS platform that brings ordering, billing, payments and day-to-day service workflows into one connected system.',
    image: '/assets/products/posmate.jpg',
    imageAlt: 'Restaurant staff using a modern POS system',
    actionText: 'Explore POSMATE',
    destinationType: 'internal-panel',
    tags: [
      'Ordering',
      'Billing',
      'Payments',
      'Restaurant Operations'
    ],
    pdf: {
      title: 'POSMATE Business Presentation',
      subtitle: 'Modern Restaurant & Hospitality POS Platform (10 Slides)',
      url: '/assets/docs/posmate-business-presentation.pdf',
      fileName: 'POSMATE-Business-Presentation.pdf',
      slideCount: 10,
      fileSize: '2.4 MB'
    },
    detail: {
      eyebrow: 'RESTAURANT & HOSPITALITY POS',
      headline: 'Run restaurant service from one connected POS.',
      overview: 'POSMATE is a modern restaurant and hospitality POS platform designed to simplify ordering, billing, payments and service workflows across busy restaurant environments. It supports restaurant teams from order capture through guest billing while helping front-of-house and service operations stay connected.',
      workflowSteps: [
        'ORDER',
        'KITCHEN / SERVICE',
        'BILL',
        'PAY'
      ],
      features: [
        'ORDER MANAGEMENT: Capture and manage restaurant orders through a connected POS workflow.',
        'MOBILE / HANDHELD SERVICE: Support faster table-side or mobile order processing where the existing product capability allows it.',
        'BILLING & PAYMENTS: Manage guest billing and payment workflows through the same operational system.',
        'MENU & ITEM MANAGEMENT: Keep menu items and ordering workflows organized for service teams.',
        'RECEIPTS & SERVICE WORKFLOW: Support the operational flow from order capture through billing and receipt completion.'
      ],
      useCases: [
        'RESTAURANTS & CAFÉS: Fast ordering, table-side service, and instant checkout for full-service and quick-service dining.',
        'BARS & HOSPITALITY VENUES: Rapid tab management, mobile payment terminals, and peak-hour service coordination.',
        'MULTI-LOCATION OPERATIONS: Centralized menu orchestration and consistent service operations across multiple dining locations.',
        'ONBOARD HOSPITALITY: POSMATE supports restaurant and hospitality POS workflows that can also extend into onboard food and beverage operations.'
      ],
      technicalHighlights: [
        'Sub-second transaction latency optimized for high-turnover service environments',
        'Resilient offline-first mesh caching with automatic background synchronization',
        'PCI-DSS compliant payment processing paired with modern EMV handheld terminals'
      ]
    }
  },

  // Row 4, Right: ITAL
  {
    id: 'ital',
    name: 'ITAL',
    industry: 'Device Management',
    shortBenefit: 'Every device. One clear view.',
    description: 'Visibility into devices, crews and applications across fleet',
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

  // Row 5, Left: Medugo
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

  // Row 5, Right: Dr Queues
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
  },

  // Row 6, Left: Network Services
  {
    id: 'network-services',
    name: 'Network Services',
    industry: 'Telecom',
    shortBenefit: 'Reliable connectivity. Smarter network operations.',
    description: 'Solutions that support mobile network reliability, interoperability and service quality across modern 4G/5G environments — from network settings and roaming to fraud intelligence and messaging.',
    image: '/assets/products/network-services.jpg',
    actionText: 'Explore Network Services',
    destinationType: 'external',
    url: 'https://www.gsmaservices.com/network-services/',
    ariaLabel: 'Explore Network Services on GSMA Services',
    tags: [
      '4G/5G',
      'Interoperability',
      'Roaming',
      'Fraud Intelligence'
    ],
    variant: 'light-red'
  },

  // Row 6, Right: Device Services
  {
    id: 'device-services',
    name: 'Device Services',
    industry: 'Telecom',
    shortBenefit: 'Know every device. Protect every interaction.',
    description: 'Device intelligence and validation capabilities that help businesses identify devices, understand compatibility, verify device status and support secure connected-device operations.',
    image: '/assets/products/device-services.jpg',
    actionText: 'Explore Device Services',
    destinationType: 'external',
    url: 'https://www.gsmaservices.com/device-services/',
    ariaLabel: 'Explore Device Services on GSMA Services',
    tags: [
      'Device Identity',
      'Compatibility',
      'Status',
      'eSIM'
    ],
    variant: 'light-red'
  }
];
