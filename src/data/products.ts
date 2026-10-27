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

export interface ProcessCapability {
  title: string;
  desc: string;
}

export interface ProductProcess {
  intro: string;
  fullDescription?: string;
  headline?: string;
  steps: ProcessStep[];
  capabilities?: (ProcessCapability | string)[];
  benefits?: string[];
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

export interface ProductGroup {
  id: string;
  name: string;
  industry: string;
  productIds: string[];
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
    shortBenefit: 'Move guests from terminal to ship with less friction.',
    description: 'Mobile-first check-in, identity verification and boarding workflows built for high-volume cruise operations.',
    image: '/assets/products/embarkation.jpg',
    imageAlt: 'Passengers moving through a digital cruise terminal check-in process with modern identity kiosks',
    actionText: 'Explore Product',
    destinationType: 'internal-panel',
    process: {
      headline: 'Move guests from terminal to ship with less friction.',
      intro: "VenusGeo's Embarkation software helps cruise operators manage high-volume passenger check-in through a mobile-first digital workflow. It supports guest identification, document verification, boarding validation and operational status updates — helping teams move passengers through the terminal faster and with greater visibility.",
      fullDescription: 'The goal of the product is to reduce dependence on manual or fixed check-in workflows and create a smoother boarding experience for both guests and terminal teams.',
      capabilities: [
        {
          title: 'MOBILE CHECK-IN',
          desc: 'Allow cruise staff to process guests using mobile or touchscreen devices instead of relying only on fixed counters.'
        },
        {
          title: 'IDENTITY & DOCUMENT VERIFICATION',
          desc: 'Capture and verify guest information required for embarkation.'
        },
        {
          title: 'BOARDING VALIDATION',
          desc: 'Confirm guest boarding status before ship entry.'
        },
        {
          title: 'REAL-TIME STATUS',
          desc: 'Give operational teams clearer visibility into passenger progression through the embarkation process.'
        },
        {
          title: 'OFFLINE / CONNECTIVITY SUPPORT',
          desc: 'Maintain continuity across varying network conditions with robust local verification.'
        }
      ],
      steps: [
        {
          step: '01',
          title: 'ARRIVAL',
          desc: 'Guest reaches the cruise terminal.'
        },
        {
          step: '02',
          title: 'CHECK-IN',
          desc: 'Staff begins the embarkation workflow through a mobile or kiosk-assisted interface.'
        },
        {
          step: '03',
          title: 'VERIFY',
          desc: 'Guest identity and required documents are validated.'
        },
        {
          step: '04',
          title: 'CONFIRM',
          desc: 'Boarding status is confirmed.'
        },
        {
          step: '05',
          title: 'BOARD',
          desc: 'Guest proceeds to the vessel.'
        }
      ],
      benefits: [
        'Faster passenger movement.',
        'Clearer operational visibility.',
        'Less manual processing.'
      ]
    }
  },

  // Row 2, Right: Cruise Operations 02 - Gangway
  {
    id: 'gangway',
    name: 'Gangway',
    industry: 'Cruise Operations',
    shortBenefit: 'Know every movement between ship and shore.',
    description: 'Mobile identity verification and IN / OUT tracking for guests, crew and visitors at vessel access points.',
    image: '/assets/products/gangway.jpg',
    imageAlt: 'Cruise ship gangway entry with officer conducting mobile identity check between ship and shore',
    actionText: 'Explore Product',
    destinationType: 'internal-panel',
    process: {
      headline: 'Know every movement between ship and shore.',
      intro: "VenusGeo's Gangway software helps cruise operators manage guest, crew and visitor movement at vessel entry and exit points. Mobile identity verification and digital check-in/check-out workflows give teams clearer visibility into who is onboard and who has gone ashore.",
      fullDescription: 'The software helps replace fragmented manual processes with a more connected and traceable gangway operation.',
      capabilities: [
        {
          title: 'MOBILE IDENTITY CHECK',
          desc: 'Verify guests, crew and visitors at the gangway.'
        },
        {
          title: 'IN / OUT TRACKING',
          desc: 'Record whether a person is entering or leaving the vessel.'
        },
        {
          title: 'ONBOARD STATUS',
          desc: 'Maintain clearer visibility of current onboard and off-board movement.'
        },
        {
          title: 'MOBILE OPERATIONS',
          desc: 'Allow personnel to perform gangway workflows using handheld mobile devices rather than fixed-only stations.'
        },
        {
          title: 'OPERATIONAL VISIBILITY',
          desc: 'Give teams a clearer real-time view of movement activity.'
        }
      ],
      steps: [
        {
          step: '01',
          title: 'IDENTIFY',
          desc: 'Guest, crew member or visitor approaches the gangway.'
        },
        {
          step: '02',
          title: 'VERIFY',
          desc: 'Identity is checked through the digital workflow.'
        },
        {
          step: '03',
          title: 'CHECK IN / OUT',
          desc: 'The system records whether the person is boarding or leaving.'
        },
        {
          step: '04',
          title: 'UPDATE STATUS',
          desc: 'Onboard / off-board status is updated for operational visibility.'
        }
      ],
      benefits: [
        'Controlled ship/shore movement.',
        'Clearer operational visibility.',
        'Less manual processing.'
      ]
    }
  },

  // Row 3, Left: Cruise Operations 03 - Mustering
  {
    id: 'mustering',
    name: 'Mustering',
    industry: 'Cruise Operations',
    shortBenefit: 'Make safety accountability clearer and faster.',
    description: 'Digital identification and attendance workflows that give teams clearer visibility during onboard muster operations.',
    image: '/assets/products/mustering.jpg',
    imageAlt: 'Cruise passengers gathered at an organized muster station with crew managing attendance on tablets',
    actionText: 'Explore Product',
    destinationType: 'internal-panel',
    process: {
      headline: 'Make safety accountability clearer and faster.',
      intro: "VenusGeo's Mustering software supports digital identification and attendance workflows during onboard safety drills and muster operations. It helps crew teams confirm participation, identify outstanding passengers or crew, and maintain a clearer operational view of muster status.",
      fullDescription: 'The product is designed to replace fragmented manual tracking with a more structured, mobile-first safety workflow.',
      capabilities: [
        {
          title: 'DIGITAL IDENTIFICATION',
          desc: 'Confirm passenger or crew identity during muster operations.'
        },
        {
          title: 'ATTENDANCE CAPTURE',
          desc: 'Record participation and completion status digitally.'
        },
        {
          title: 'STATUS MONITORING',
          desc: 'See which passengers or crew have completed the muster workflow and which remain outstanding.'
        },
        {
          title: 'MOBILE CREW WORKFLOW',
          desc: 'Allow crew to perform checks using normal mobile devices.'
        },
        {
          title: 'CENTRAL VISIBILITY',
          desc: 'Provide operational teams with a clearer aggregated muster status.'
        }
      ],
      steps: [
        {
          step: '01',
          title: 'IDENTIFY',
          desc: 'Passenger or crew member reaches the designated muster location.'
        },
        {
          step: '02',
          title: 'CHECK STATUS',
          desc: 'The system identifies the relevant record and current status.'
        },
        {
          step: '03',
          title: 'CONFIRM',
          desc: 'Attendance or completion is recorded.'
        },
        {
          step: '04',
          title: 'MONITOR',
          desc: 'Operations teams see confirmed and outstanding status.'
        }
      ],
      benefits: [
        'Clearer safety accountability.',
        'Faster safety drill completion.',
        'Structured crew visibility.'
      ]
    }
  },

  // Row 3, Right: Cruise Operations 04 - Debarkation
  {
    id: 'debarkation',
    name: 'Debarkation',
    industry: 'Cruise Operations',
    shortBenefit: 'Make the final passenger movement smoother.',
    description: 'Structured digital departure workflows that help teams verify guests, update status and manage passenger flow from ship to shore.',
    image: '/assets/products/debarkation.jpg',
    imageAlt: 'Passengers departing cruise vessel through terminal corridor with staff performing mobile departure verification',
    actionText: 'Explore Product',
    destinationType: 'internal-panel',
    process: {
      headline: 'Make the final passenger movement smoother.',
      intro: "VenusGeo's Debarkation software helps cruise operators manage passenger departure through structured identity confirmation, status updates and digital checkout workflows. It gives operational teams clearer visibility as guests complete their journey and leave the vessel.",
      fullDescription: 'The product helps reduce manual processing while supporting a more organized final stage of the cruise guest journey.',
      capabilities: [
        {
          title: 'DEPARTURE IDENTIFICATION',
          desc: 'Confirm the departing guest.'
        },
        {
          title: 'STATUS VERIFICATION',
          desc: 'Check relevant departure status before final checkout.'
        },
        {
          title: 'DIGITAL CHECKOUT',
          desc: 'Register the guest leaving the vessel.'
        },
        {
          title: 'OPERATIONAL STATUS',
          desc: 'Update the system so departure progress is visible to operations teams.'
        },
        {
          title: 'MOBILE WORKFLOW',
          desc: 'Allow departure processing through mobile or touchscreen devices.'
        }
      ],
      steps: [
        {
          step: '01',
          title: 'IDENTIFY',
          desc: 'Guest approaches the departure point.'
        },
        {
          step: '02',
          title: 'VERIFY',
          desc: 'Identity and relevant departure status are confirmed.'
        },
        {
          step: '03',
          title: 'CHECK OUT',
          desc: 'The system records the guest leaving the vessel.'
        },
        {
          step: '04',
          title: 'COMPLETE',
          desc: 'Departure status is finalized for operational visibility.'
        }
      ],
      benefits: [
        'Smoother departure flow.',
        'Clearer operational visibility.',
        'Less manual processing.'
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

  // TM Hub (Maritime & Enterprise Fleet Workforce)
  {
    id: 'tm-hub',
    name: 'TM Hub',
    industry: 'Crew Operations',
    shortBenefit: 'Connected shift, travel and roster management for crew.',
    description: 'Digital crew management platform for shift schedules, rosters, travel coordination, and operational compliance across maritime and enterprise fleets.',
    image: '/assets/products/tmhub.jpg',
    imageAlt: 'Mobile application interface showing crew rosters, shift schedules, and profile management',
    actionText: 'Explore TM Hub',
    destinationType: 'internal-panel',
    tags: [
      'Crew Shifts',
      'Rosters',
      'Travel & Flights',
      'Workforce'
    ],
    detail: {
      eyebrow: 'MARITIME WORKFORCE & CREW OPERATIONS',
      headline: 'Keep shipboard teams organized across every voyage.',
      overview: 'TM Hub is a digital workforce management platform engineered for maritime and enterprise fleet operations. It simplifies crew scheduling, shift rotations, travel and embarkation coordination, and flight tracking while giving crew members direct mobile access to their schedules and profiles.',
      workflowSteps: [
        'ROSTER',
        'SCHEDULE',
        'ENGAGE',
        'TRACK',
        'COMPLIANCE'
      ],
      features: [
        'SHIFT & ROSTER SCHEDULING: Coordinate bridge watch, deck, engineering, and hotel service rosters in real time.',
        'CREW PROFILE & COMPLIANCE: Verify officer licenses, maritime certifications, and document validity across voyages.',
        'TRAVEL & TRANSIT MANAGEMENT: Coordinate port transfers, flight manifests, and hotel reservations for embarking/debarking crew.',
        'MOBILE-FIRST CREW ACCESS: Enable crew members to check upcoming duty, request roster swaps, and receive shift notifications on personal mobile devices.',
        'OFFLINE-FIRST SYNCHRONIZATION: Maintain active roster access and attendance verification with automatic sync when satellite connectivity resumes.'
      ],
      useCases: [
        'CRUISE FLEETS: Centralized management of hospitality, deck, and marine crew rotations across global voyages.',
        'OFFSHORE & MARITIME: Watchkeeping schedule enforcement and compliance tracking for offshore support and commercial ships.',
        'DISTRIBUTED ENTERPRISE TEAMS: Roster and shift management for multi-site industrial and port terminal operations.'
      ],
      technicalHighlights: [
        'Offline-capable local client storage with lightweight conflict-free delta sync',
        'Granular role-based permissions separating marine crew, hotel management, and corporate HR',
        'Seamless integration with shoreside ERP, payroll, and maritime travel management systems'
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
    name: 'DrQueues',
    industry: 'Healthcare',
    shortBenefit: 'A smoother journey to care.',
    description: 'Connect patient check-in, live queues, and digital report delivery.',
    image: '/assets/products/dr-queues.jpg',
    actionText: 'Explore DrQueues',
    destinationType: 'external',
    url: 'https://www.drqueues.com/'
  },

  // Row 6, Left: Network Services
  {
    id: 'network-services',
    name: 'Network Services',
    industry: 'Telecom',
    shortBenefit: 'Powering reliable connections across the telecom ecosystem.',
    description: 'Enterprise telecom services that support roaming data exchange, network interoperability, secure service enablement and reliable connectivity across mobile networks.',
    image: '/assets/products/network-services.jpg',
    imageAlt: 'Modern telecom cellular towers providing mobile network coverage and connectivity infrastructure',
    actionText: 'Explore Network Services',
    destinationType: 'external',
    url: 'https://www.gsmaservices.com/my-services/',
    ariaLabel: 'Explore Network Services on GSMA Services',
    tags: [
      'Roaming',
      'Interoperability',
      'Network Data',
      'Service Enablement'
    ],
    variant: 'light-red'
  },

  // Row 6, Right: Device Services
  {
    id: 'device-services',
    name: 'Device Services',
    industry: 'Telecom',
    shortBenefit: 'Trusted device intelligence for every connection.',
    description: 'Device verification and intelligence services that help organizations identify devices, check status, understand compatibility and make informed decisions across the connected-device lifecycle.',
    image: '/assets/products/device-services.jpg',
    imageAlt: 'Modern smartphones arranged on a clean testing desk representing connected device verification and intelligence',
    actionText: 'Explore Device Services',
    destinationType: 'external',
    url: 'https://www.gsmaservices.com/my-services/',
    ariaLabel: 'Explore Device Services on GSMA Services',
    tags: [
      'Device Verification',
      'Identity',
      'Status',
      'Compatibility'
    ],
    variant: 'light-red'
  }
];

export const enterpriseProductGroups: ProductGroup[] = [
  {
    id: 'cruise-hospitality',
    name: 'Cruise & Hospitality',
    industry: 'CRUISE & HOSPITALITY',
    productIds: [
      'pammy-ai',
      'fido2-ultrapass',
      'embarkation',
      'gangway',
      'mustering',
      'posmate',
      'tm-hub',
      'ital',
      'debarkation'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    industry: 'HEALTHCARE',
    productIds: [
      'medugo',
      'dr-queues'
    ]
  },
  {
    id: 'telecom',
    name: 'Telecom',
    industry: 'TELECOM',
    productIds: [
      'network-services',
      'device-services'
    ]
  }
];

