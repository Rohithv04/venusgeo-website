import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface OutcomePillar {
  num: string;
  keyword: string;
  tagline: string;
  detail: string;
  deliverables: string[];
  schematicType: 'spark' | 'integrate' | 'decompose' | 'velocity';
}

export const AIOutcomes: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  const pillars: OutcomePillar[] = [
    {
      num: '01',
      keyword: 'BUILD',
      tagline: 'Create new AI-powered products and solutions.',
      detail:
        'From zero to production-grade architecture. We engineer end-to-end intelligent applications with integrated foundation models, vector context stores, deterministic business validation, and audit-ready APIs.',
      deliverables: ['Custom AI applications', 'Autonomous agent frameworks', 'Grounded domain assistants', 'Production API endpoints'],
      schematicType: 'spark'
    },
    {
      num: '02',
      keyword: 'TRANSFORM',
      tagline: 'Add intelligence to the products and processes you already run.',
      detail:
        'No costly rip-and-replace. We introduce an AI service layer into your existing enterprise software, enabling natural-language querying, smart forms, automated validation, and predictive workflows.',
      deliverables: ['In-app assistants & chat', 'Natural-language queries', 'Automated anomaly detection', 'Self-filling configurations'],
      schematicType: 'integrate'
    },
    {
      num: '03',
      keyword: 'MODERNIZE',
      tagline: 'Use AI to understand legacy systems and chart the way forward.',
      detail:
        'Reverse-engineer monolithic systems using brownfield analysis. We extract embedded business logic, map data models, assess dependency risks, and generate clear technical roadmaps before altering code.',
      deliverables: ['Brownfield code extraction', 'Architecture mapping', 'Business rules inventory', 'Refactoring blueprints'],
      schematicType: 'decompose'
    },
    {
      num: '04',
      keyword: 'ACCELERATE',
      tagline: 'Make your engineering organization faster with AI.',
      detail:
        'Transform developer throughput and quality without compromising governance. We implement context-rich AI coding workflows, automated test generation, PR review agents, and CI/CD validation pipelines.',
      deliverables: ['Structured specification agents', 'Automated test generation', 'Intelligent code reviews', 'Developer productivity tooling'],
      schematicType: 'velocity'
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.outcome-panel', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="outcomes" ref={sectionRef} className="section ai-outcomes-section" aria-label="Four Ways We Put AI To Work">
      <div className="container">
        {/* Section Header */}
        <div className="outcomes-header-row">
          <div className="eyebrow">HOW WE PUT AI TO WORK</div>
          <h2 className="section-heading outcomes-heading">
            One partner.<br />
            <span className="text-red">Four ways to put AI to work.</span>
          </h2>
          <p className="outcomes-subheading">
            Whether starting fresh, augmenting live software, deciphering legacy platforms, or
            supercharging your internal engineers — VenusGeo provides disciplined, production-tested execution.
          </p>
        </div>

        {/* Four Tall Interactive Vertical Panels */}
        <div ref={panelsRef} className="outcome-panels-grid">
          {pillars.map((pillar, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={pillar.num}
                className={`outcome-panel card-panel ${isActive ? 'panel-focused' : ''}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                tabIndex={0}
                role="article"
                aria-label={`Outcome ${pillar.num}: ${pillar.keyword}`}
              >
                {/* Red Indicator Line at Top */}
                <div className="panel-accent-bar" />

                {/* Top Number & Action Indicator */}
                <div className="panel-top-meta">
                  <span className="panel-number">{pillar.num}</span>
                  <div className="panel-action-icon">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Keyword & Main Tagline */}
                <div className="panel-heading-wrap">
                  <h3 className="panel-keyword">{pillar.keyword}</h3>
                  <p className="panel-tagline">{pillar.tagline}</p>
                </div>

                {/* Technical Schematic Graphic for each discipline */}
                <div className="panel-schematic-wrap" aria-hidden="true">
                  {pillar.schematicType === 'spark' && (
                    <svg className="schematic-svg" viewBox="0 0 160 80" fill="none">
                      <rect x="10" y="20" width="40" height="40" rx="4" stroke="#e2e2e8" strokeWidth="1.2" />
                      <line x1="50" y1="40" x2="110" y2="40" stroke="#ed1b24" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="130" cy="40" r="18" fill="rgba(237,27,36,0.06)" stroke="#ed1b24" strokeWidth="1.5" />
                      <path d="M125 40h10M130 35v10" stroke="#ed1b24" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}

                  {pillar.schematicType === 'integrate' && (
                    <svg className="schematic-svg" viewBox="0 0 160 80" fill="none">
                      <rect x="12" y="14" width="60" height="52" rx="4" stroke="#121214" strokeWidth="1.2" />
                      <rect x="88" y="24" width="60" height="32" rx="4" stroke="#ed1b24" strokeWidth="1.5" strokeDasharray="3 3" />
                      <path d="M72 40h16M82 35l6 5-6 5" stroke="#ed1b24" strokeWidth="1.5" fill="none" />
                    </svg>
                  )}

                  {pillar.schematicType === 'decompose' && (
                    <svg className="schematic-svg" viewBox="0 0 160 80" fill="none">
                      <rect x="15" y="16" width="45" height="48" rx="3" stroke="#8c8c94" strokeWidth="1.2" />
                      <line x1="60" y1="26" x2="95" y2="20" stroke="#ed1b24" strokeWidth="1.2" />
                      <line x1="60" y1="40" x2="95" y2="40" stroke="#ed1b24" strokeWidth="1.2" />
                      <line x1="60" y1="54" x2="95" y2="60" stroke="#ed1b24" strokeWidth="1.2" />
                      <circle cx="110" cy="20" r="6" stroke="#121214" strokeWidth="1" fill="#fff" />
                      <circle cx="110" cy="40" r="6" stroke="#ed1b24" strokeWidth="1.2" fill="rgba(237,27,36,0.1)" />
                      <circle cx="110" cy="60" r="6" stroke="#121214" strokeWidth="1" fill="#fff" />
                    </svg>
                  )}

                  {pillar.schematicType === 'velocity' && (
                    <svg className="schematic-svg" viewBox="0 0 160 80" fill="none">
                      <path d="M10 50 Q 50 48, 80 32 T 150 16" stroke="#e2e2e8" strokeWidth="1.5" />
                      <path d="M10 50 Q 50 48, 80 32 T 150 16" stroke="#ed1b24" strokeWidth="2" strokeDasharray="30 140" strokeDashoffset="-20" />
                      <circle cx="145" cy="17" r="4" fill="#ed1b24" />
                      <line x1="20" y1="65" x2="140" y2="65" stroke="#eeeff2" strokeWidth="1" />
                    </svg>
                  )}
                </div>

                {/* Detailed Description */}
                <p className="panel-detail-copy">{pillar.detail}</p>

                {/* Deliverables Bullet List */}
                <div className="panel-deliverables">
                  <div className="deliverables-title">WHAT WE DELIVER:</div>
                  <ul className="deliverables-list">
                    {pillar.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="deliverable-item">
                        <span className="deliverable-dot" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .ai-outcomes-section {
          background-color: var(--surface-soft);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .outcomes-header-row {
          max-width: 760px;
          margin-bottom: 48px;
        }

        .outcomes-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .outcomes-subheading {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* 4 Tall Vertical Panels Grid */
        .outcome-panels-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .outcome-panel {
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 240ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 240ms cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .outcome-panel:hover,
        .outcome-panel.panel-focused {
          transform: translateY(-4px);
          border-color: #d1d1d8;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
        }

        .panel-accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: transparent;
          transition: background-color 200ms ease;
        }

        .outcome-panel:hover .panel-accent-bar,
        .outcome-panel.panel-focused .panel-accent-bar {
          background-color: var(--brand-red);
        }

        .panel-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .panel-number {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--brand-red);
          letter-spacing: 0.05em;
        }

        .panel-action-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--surface-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: transform 180ms ease, background-color 180ms ease, color 180ms ease;
        }

        .outcome-panel:hover .panel-action-icon,
        .outcome-panel.panel-focused .panel-action-icon {
          transform: translate(2px, -2px);
          background-color: var(--brand-red-light);
          color: var(--brand-red);
        }

        .panel-heading-wrap {
          margin-bottom: 20px;
        }

        .panel-keyword {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .panel-tagline {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--brand-red);
          line-height: 1.4;
        }

        .panel-schematic-wrap {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          padding: 8px;
          background-color: var(--surface-soft);
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
        }

        .schematic-svg {
          width: 100%;
          height: 100%;
          max-height: 60px;
        }

        .panel-detail-copy {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .panel-deliverables {
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .deliverables-title {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .deliverables-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .deliverable-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.8125rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .deliverable-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        @media (max-width: 1100px) {
          .outcome-panels-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 640px) {
          .outcomes-header-row {
            margin-bottom: 28px;
          }
          .outcomes-subheading {
            font-size: 0.95rem;
            line-height: 1.55;
          }
          .outcome-panels-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .outcome-panel {
            padding: 22px 18px;
          }
          .panel-keyword {
            font-size: 1.3rem;
          }
          .panel-detail-copy {
            margin-bottom: 18px;
          }
        }
      `}</style>
    </section>
  );
};
