import React, { useEffect, useRef } from 'react';
import {
  MessageSquare,
  Sliders,
  Search,
  CheckCircle,
  TrendingUp,
  FileSpreadsheet,
  Cpu
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface AppCapability {
  title: string;
  copy: string;
  icon: React.ElementType;
}

export const AIApplicationLayer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const ruleTriadRef = useRef<HTMLDivElement>(null);

  const inAppCapabilities: AppCapability[] = [
    {
      title: 'IN-APP ASSISTANTS AND CHATBOTS',
      copy: 'Assistants that live inside your product, understand its context and data, answer questions with sources, and hand over to a human when needed.',
      icon: MessageSquare
    },
    {
      title: 'AI-ASSISTED CONFIGURATION',
      copy: 'Complex settings screens and long forms are where users struggle most. Let them describe what they want in plain language. AI fills in the configuration, validates it against your business rules, and the user reviews and confirms before anything is applied.',
      icon: Sliders
    },
    {
      title: 'NATURAL-LANGUAGE INTERFACES',
      copy: 'Search, filter, query and command your application the way people actually talk.',
      icon: Search
    },
    {
      title: 'INTELLIGENT VALIDATION AND AUTOMATION',
      copy: 'Catch errors, flag exceptions and automate repetitive steps, with your rules in control.',
      icon: CheckCircle
    },
    {
      title: 'INSIGHTS AND RECOMMENDATIONS',
      copy: 'AI-generated summaries, explanations and next-best actions from the data you already hold.',
      icon: TrendingUp
    },
    {
      title: 'DOCUMENT INTELLIGENCE INSIDE WORKFLOWS',
      copy: 'Extract and validate information from documents directly where users work.',
      icon: FileSpreadsheet
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Architectural diagram entrance sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: diagramRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.from('.diag-col-app', {
        opacity: 0,
        x: -24,
        duration: 0.7,
        ease: 'power3.out'
      })
        .from(
          '.diag-col-service',
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.75,
            ease: 'back.out(1.4)'
          },
          '-=0.3'
        )
        .from(
          '.diag-col-capabilities',
          {
            opacity: 0,
            x: 24,
            duration: 0.7,
            ease: 'power3.out'
          },
          '-=0.4'
        )
        .from(
          '.connector-beam',
          {
            scaleX: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          },
          '-=0.3'
        );

      // Triad statement sequential reveal
      gsap.from('.triad-box', {
        scrollTrigger: {
          trigger: ruleTriadRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.18,
        duration: 0.7,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="application-layer" ref={sectionRef} className="section ai-app-layer-section" aria-label="AI Inside Your Applications">
      <div className="container">
        {/* Section Header */}
        <div className="app-layer-header">
          <div className="eyebrow">AI-ENABLED PRODUCTS</div>
          <h2 className="section-heading app-layer-heading">
            You don’t always need a new product.<br />
            <span className="text-red">Sometimes you need intelligence inside the one you have.</span>
          </h2>
          <p className="app-layer-copy">
            You already have users, data, workflows, APIs and business rules. We add AI as a service
            layer that plugs into your existing web, mobile and enterprise applications, without
            rewriting what already works.
          </p>
        </div>

        {/* Major Architectural Diagram: Left App | Center AI Service Layer | Right Capabilities */}
        <div ref={diagramRef} className="app-architecture-diagram card-panel">
          <div className="diagram-top-bar">
            <span className="diagram-indicator-dot" />
            <span className="diagram-label">UNIFIED ARCHITECTURAL INSERTION</span>
            <span className="diagram-subtag">NON-INVASIVE AI INTEGRATION</span>
          </div>

          <div className="diagram-columns-grid">
            {/* Column 1: Existing Application */}
            <div className="diag-col diag-col-app">
              <div className="col-header">
                <span className="col-tag">EXISTING FOUNDATION</span>
                <h4 className="col-title">Existing Application</h4>
                <p className="col-desc">Your proven software assets and established operational investments</p>
              </div>

              <div className="app-elements-stack">
                <div className="element-chip">
                  <span className="chip-indicator" />
                  <span>Users &amp; Roles</span>
                </div>
                <div className="element-chip">
                  <span className="chip-indicator" />
                  <span>UI / Front-End (Web &amp; Mobile)</span>
                </div>
                <div className="element-chip">
                  <span className="chip-indicator" />
                  <span>Core Workflows</span>
                </div>
                <div className="element-chip">
                  <span className="chip-indicator" />
                  <span>Business Rules Engine</span>
                </div>
                <div className="element-chip">
                  <span className="chip-indicator" />
                  <span>Production Databases</span>
                </div>
                <div className="element-chip">
                  <span className="chip-indicator" />
                  <span>Enterprise APIs</span>
                </div>
              </div>
            </div>

            {/* Connecting Bridge Left-to-Center */}
            <div className="diag-connector">
              <div className="connector-beam" />
              <span className="connector-label">SECURE BUS</span>
              <div className="connector-beam" />
            </div>

            {/* Column 2: AI Service Layer (Centerpiece) */}
            <div className="diag-col diag-col-service">
              <div className="service-badge-pill">
                <Cpu size={14} className="text-red" />
                <span>INTELLIGENCE LAYER</span>
              </div>
              <h4 className="col-title text-red">AI Service Layer</h4>
              <p className="col-desc">Plugs seamlessly into runtime without refactoring core business logic</p>

              <div className="service-modules-list">
                <div className="service-feature">
                  <strong>Semantic Context Indexer</strong>
                  <span>Vector embeddings &amp; document chunking</span>
                </div>
                <div className="service-feature">
                  <strong>Domain LLM &amp; SLM Orchestrator</strong>
                  <span>Model routing, latency optimization &amp; fallback</span>
                </div>
                <div className="service-feature">
                  <strong>Validation &amp; Policy Guardrails</strong>
                  <span>Zero-hallucination checks against business rules</span>
                </div>
                <div className="service-feature">
                  <strong>Human-in-the-Loop Gateway</strong>
                  <span>Seamless operator escalation &amp; sign-off</span>
                </div>
              </div>
            </div>

            {/* Connecting Bridge Center-to-Right */}
            <div className="diag-connector">
              <div className="connector-beam" />
              <span className="connector-label">EVENT EMITTER</span>
              <div className="connector-beam" />
            </div>

            {/* Column 3: AI Capabilities Connected */}
            <div className="diag-col diag-col-capabilities">
              <div className="col-header">
                <span className="col-tag">UNLOCKED EXPERIENCES</span>
                <h4 className="col-title">Target Capabilities</h4>
                <p className="col-desc">Intelligent features rendered directly inside existing views</p>
              </div>

              <div className="capabilities-mini-stack">
                <div className="cap-mini-item">In-App Chat &amp; Search</div>
                <div className="cap-mini-item">Auto-Filled Configurations</div>
                <div className="cap-mini-item">Natural-Language Queries</div>
                <div className="cap-mini-item">Exception &amp; Error Flagging</div>
                <div className="cap-mini-item">Executive Summaries</div>
                <div className="cap-mini-item">Workflow Document OCR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Six Concrete In-App Capability Explanations */}
        <div className="in-app-features-grid">
          {inAppCapabilities.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="in-app-feat-card card-panel">
                <div className="feat-card-top">
                  <div className="icon-red-outline">
                    <Icon size={18} />
                  </div>
                  <span className="feat-card-idx">0{idx + 1}</span>
                </div>
                <h4 className="feat-card-title">{feat.title}</h4>
                <p className="feat-card-copy">{feat.copy}</p>
              </div>
            );
          })}
        </div>

        {/* Finishing Prominent Rule: AI suggests. Your business rules validate. People confirm. */}
        <div ref={ruleTriadRef} className="ai-rule-triad-wrap">
          <div className="triad-label">THE GOVERNANCE MANDATE</div>
          <div className="triad-grid">
            <div className="triad-box">
              <span className="triad-step">01</span>
              <h3 className="triad-text">AI suggests.</h3>
              <p className="triad-sub">Rapid extraction, synthesis and contextual options.</p>
            </div>
            <div className="triad-divider">
              <span className="triad-arrow-desktop">→</span>
              <span className="triad-arrow-mobile">↓</span>
            </div>
            <div className="triad-box">
              <span className="triad-step">02</span>
              <h3 className="triad-text text-red">Your business rules validate.</h3>
              <p className="triad-sub">Deterministic thresholds, compliance bounds and API contracts.</p>
            </div>
            <div className="triad-divider">
              <span className="triad-arrow-desktop">→</span>
              <span className="triad-arrow-mobile">↓</span>
            </div>
            <div className="triad-box">
              <span className="triad-step">03</span>
              <h3 className="triad-text">People confirm.</h3>
              <p className="triad-sub">Accountable human review and production authorization.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-app-layer-section {
          background-color: var(--surface-soft);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .app-layer-header {
          max-width: 780px;
          margin-bottom: 48px;
        }

        .app-layer-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 18px;
        }

        .app-layer-copy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* Large Architectural Insertion Diagram */
        .app-architecture-diagram {
          padding: 32px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-card);
          margin-bottom: 48px;
        }

        .diagram-top-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 28px;
        }

        .diagram-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .diagram-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-primary);
        }

        .diagram-subtag {
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
          background-color: var(--surface-soft);
          color: var(--text-muted);
          margin-left: auto;
        }

        .diagram-columns-grid {
          display: grid;
          grid-template-columns: 1fr auto 1.15fr auto 1fr;
          gap: 16px;
          align-items: center;
        }

        .diag-col {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 24px 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .diag-col-service {
          background-color: #ffffff;
          border: 1.5px solid var(--brand-red);
          box-shadow: 0 4px 16px rgba(237, 27, 36, 0.08);
          position: relative;
        }

        .col-tag {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }

        .service-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--brand-red);
          background-color: var(--brand-red-light);
          padding: 4px 10px;
          border-radius: 4px;
          width: fit-content;
          margin-bottom: 8px;
        }

        .col-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 6px;
        }

        .col-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-bottom: 16px;
        }

        .app-elements-stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .element-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .chip-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #8c8c94;
        }

        .service-modules-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .service-feature {
          display: flex;
          flex-direction: column;
          padding: 8px 10px;
          background-color: var(--surface-soft);
          border-radius: 6px;
          border-left: 2px solid var(--brand-red);
        }

        .service-feature strong {
          font-size: 0.75rem;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .service-feature span {
          font-size: 0.6875rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .capabilities-mini-stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cap-mini-item {
          padding: 7px 10px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Connectors */
        .diag-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          width: 48px;
        }

        .connector-beam {
          width: 100%;
          height: 2px;
          background-color: var(--brand-red);
          opacity: 0.8;
        }

        .connector-label {
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          white-space: nowrap;
        }

        /* 6 In-app Features Grid */
        .in-app-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }

        .in-app-feat-card {
          padding: 28px 24px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          display: flex;
          flex-direction: column;
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }

        .in-app-feat-card:hover {
          transform: translateY(-3px);
          border-color: #cacace;
          box-shadow: var(--shadow-card);
        }

        .feat-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .feat-card-idx {
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--brand-red);
          letter-spacing: 0.05em;
        }

        .feat-card-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 10px;
        }

        .feat-card-copy {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Rule Triad Statement */
        .ai-rule-triad-wrap {
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          padding: 36px 32px;
          text-align: center;
        }

        .triad-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--brand-red);
          margin-bottom: 24px;
        }

        .triad-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 16px;
          align-items: center;
        }

        .triad-box {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 24px 20px;
          text-align: left;
        }

        .triad-step {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-red);
          margin-bottom: 6px;
          display: block;
        }

        .triad-text {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .triad-sub {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .triad-divider {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-muted);
        .triad-arrow-mobile {
          display: none;
        }

        @media (max-width: 1024px) {
          .diagram-columns-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .diag-connector {
            width: 100%;
            height: auto;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin: 6px 0;
            transform: none;
          }
          .connector-beam {
            width: 36px;
            height: 2px;
          }
          .connector-label {
            font-size: 0.625rem;
            color: var(--brand-red);
          }
          .in-app-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .triad-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .triad-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            color: var(--brand-red);
            font-size: 1.1rem;
            transform: none;
            margin: 0 auto;
          }
          .triad-arrow-desktop {
            display: none;
          }
          .triad-arrow-mobile {
            display: inline;
          }
        }

        @media (max-width: 640px) {
          .app-layer-header {
            margin-bottom: 28px;
          }
          .app-layer-copy {
            font-size: 0.95rem;
            line-height: 1.55;
          }
          .app-architecture-diagram {
            padding: 18px 14px;
            margin-bottom: 32px;
          }
          .diagram-top-bar {
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 18px;
            padding-bottom: 14px;
          }
          .diag-col {
            padding: 18px 14px;
          }
          .in-app-features-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-bottom: 32px;
          }
          .in-app-feat-card {
            padding: 20px 16px;
          }
          .ai-rule-triad-wrap {
            padding: 22px 14px;
          }
          .triad-box {
            padding: 16px 14px;
          }
          .triad-text {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};
