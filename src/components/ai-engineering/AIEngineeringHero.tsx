import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Cpu, Database, Network, Shield, Workflow, Users, Code2 } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const AIEngineeringHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-eyebrow-ai', {
        opacity: 0,
        y: -12,
        duration: 0.6
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8
          },
          '-=0.35'
        )
        .from(
          copyRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.7
          },
          '-=0.45'
        )
        .from(
          ctaGroupRef.current,
          {
            opacity: 0,
            y: 14,
            duration: 0.6
          },
          '-=0.4'
        )
        .from(
          visualRef.current,
          {
            opacity: 0,
            scale: 0.98,
            duration: 0.8
          },
          '-=0.45'
        )
        .from(
          '.arch-node',
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.5,
            stagger: 0.05
          },
          '-=0.5'
        )
        .from(
          '.hero-pipeline-strip',
          {
            opacity: 0,
            y: 8,
            duration: 0.5
          },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToCapabilities = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#capabilities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Compact layout coordinates around center (230, 140) in a 460x280 viewBox
  const systemNodes = [
    { id: 'data', label: 'DATA', icon: Database, x: 75, y: 55, desc: 'Enterprise records, vector indices & schemas' },
    { id: 'apps', label: 'APPLICATIONS', icon: Code2, x: 230, y: 40, desc: 'Production web, mobile & back-office apps' },
    { id: 'rules', label: 'BUSINESS RULES', icon: Shield, x: 385, y: 55, desc: 'Governance, compliance bounds & validation' },
    { id: 'ai', label: 'AI ENGINE', icon: Cpu, x: 230, y: 140, desc: 'Foundation models, custom agents & orchestrators', isCore: true },
    { id: 'apis', label: 'APIs', icon: Network, x: 75, y: 225, desc: 'Microservices & secure data endpoints' },
    { id: 'workflows', label: 'WORKFLOWS', icon: Workflow, x: 230, y: 240, desc: 'Event orchestrations & transactional queues' },
    { id: 'people', label: 'PEOPLE', icon: Users, x: 385, y: 225, desc: 'Human oversight, review & sign-off' }
  ];

  const pipelineStages = [
    { step: '01', name: 'BUSINESS' },
    { step: '02', name: 'CONTEXT' },
    { step: '03', name: 'AI' },
    { step: '04', name: 'ENGINEERING' },
    { step: '05', name: 'VALIDATION' },
    { step: '06', name: 'PRODUCTION' }
  ];

  return (
    <section ref={heroRef} className="ai-hero-section" aria-label="AI Engineering Hero">
      <div className="ai-hero-grid-bg" aria-hidden="true" />

      <div className="container">
        <div className="ai-hero-layout">
          {/* Left Column: 55-60% width - Headline dominant */}
          <div className="ai-hero-content">
            <div className="eyebrow hero-eyebrow-ai">AI ENGINEERING</div>

            <h1 ref={headlineRef} className="ai-hero-headline">
              Twenty years of engineering.<br />
              <span className="text-red">Built for what&apos;s next.</span>
            </h1>

            <p ref={copyRef} className="ai-hero-copy">
              AI is changing what businesses build, and how software gets built. VenusGeo brings deep
              enterprise engineering experience to both.
              <br /><br />
              We build AI-powered products, make existing products intelligent, modernize legacy
              systems, and help engineering teams deliver faster with AI.
            </p>

            <div ref={ctaGroupRef} className="ai-hero-actions">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="btn btn-primary hero-btn-main"
              >
                Talk to our AI engineers
                <ArrowRight size={16} />
              </a>

              <a
                href="#capabilities"
                onClick={scrollToCapabilities}
                className="btn btn-secondary hero-btn-sub"
              >
                Explore our AI capabilities
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Experience anchor trust strip */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <span className="trust-number">20+</span>
                <span className="trust-label">Years Enterprise Engineering</span>
              </div>
              <div className="trust-sep" />
              <div className="trust-item">
                <span className="trust-number text-red">4</span>
                <span className="trust-label">Core AI Disciplines</span>
              </div>
              <div className="trust-sep" />
              <div className="trust-item">
                <span className="trust-number">100%</span>
                <span className="trust-label">Human Accountable</span>
              </div>
            </div>
          </div>

          {/* Right Column: 40-45% width - Compact supporting technical architecture */}
          <div ref={visualRef} className="ai-hero-visual-panel">
            <div className="system-diagram-card card-panel">
              <div className="diagram-header">
                <div className="diagram-title-wrap">
                  <span className="diagram-status-pulse" />
                  <span className="diagram-title">ENTERPRISE AI ARCHITECTURE</span>
                </div>
                <span className="diagram-badge">LIVE ORCHESTRATION</span>
              </div>

              {/* Compact SVG Diagram */}
              <div className="diagram-canvas-container">
                <svg
                  className="diagram-svg"
                  viewBox="0 0 460 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Enterprise AI Architecture diagram connecting Data, Applications, Rules, AI Engine, APIs, Workflows, and People"
                >
                  {/* Shortened connector lines connecting surrounding nodes to the center AI Engine (230, 140) */}
                  <g className="arch-lines">
                    <line x1="125" y1="75" x2="230" y2="140" stroke="#ed1b24" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />
                    <line x1="230" y1="65" x2="230" y2="140" stroke="#ed1b24" strokeWidth="1.2" opacity="0.85" />
                    <line x1="335" y1="75" x2="230" y2="140" stroke="#ed1b24" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />
                    <line x1="125" y1="205" x2="230" y2="140" stroke="#ed1b24" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />
                    <line x1="230" y1="215" x2="230" y2="140" stroke="#ed1b24" strokeWidth="1.2" opacity="0.85" />
                    <line x1="335" y1="205" x2="230" y2="140" stroke="#ed1b24" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />

                    {/* Subtle perimeter links */}
                    <line x1="130" y1="55" x2="175" y2="42" stroke="#e5e5ea" strokeWidth="1" />
                    <line x1="285" y1="42" x2="330" y2="55" stroke="#e5e5ea" strokeWidth="1" />
                    <line x1="130" y1="225" x2="175" y2="238" stroke="#e5e5ea" strokeWidth="1" />
                    <line x1="285" y1="238" x2="330" y2="225" stroke="#e5e5ea" strokeWidth="1" />
                  </g>

                  {/* Render compact nodes */}
                  {systemNodes.map((node) => {
                    const isHovered = activeNode === node.id;
                    return (
                      <g
                        key={node.id}
                        className={`arch-node ${node.isCore ? 'node-core' : ''} ${isHovered ? 'node-hovered' : ''}`}
                        transform={`translate(${node.x}, ${node.y})`}
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        {node.isCore ? (
                          <>
                            <circle r="38" fill="#ffffff" stroke="#ed1b24" strokeWidth="1.8" filter="drop-shadow(0 2px 10px rgba(237,27,36,0.15))" />
                            <circle r="30" fill="rgba(237,27,36,0.05)" />
                          </>
                        ) : (
                          <rect
                            x="-52"
                            y="-18"
                            width="104"
                            height="36"
                            rx="6"
                            fill="#ffffff"
                            stroke={isHovered ? '#ed1b24' : '#e2e2e8'}
                            strokeWidth={isHovered ? '1.5' : '1'}
                            filter={isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))' : 'drop-shadow(0 1px 4px rgba(0,0,0,0.03))'}
                          />
                        )}
                        <text
                          y={node.isCore ? -2 : 4}
                          textAnchor="middle"
                          fill={node.isCore ? '#ed1b24' : '#121214'}
                          fontSize={node.isCore ? '10' : '9'}
                          fontWeight="700"
                          letterSpacing="0.05em"
                          fontFamily="Satoshi, sans-serif"
                        >
                          {node.label}
                        </text>
                        {node.isCore && (
                          <text
                            y="12"
                            textAnchor="middle"
                            fill="#5e5e66"
                            fontSize="7.5"
                            fontWeight="500"
                            letterSpacing="0.04em"
                            fontFamily="Satoshi, sans-serif"
                          >
                            DISCIPLINE
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Dynamic node detail info pill */}
              <div className="diagram-node-info">
                {activeNode ? (
                  <div className="info-active">
                    <span className="info-dot" />
                    <span className="info-node-id">{systemNodes.find((n) => n.id === activeNode)?.label}:</span>
                    <span className="info-text">{systemNodes.find((n) => n.id === activeNode)?.desc}</span>
                  </div>
                ) : (
                  <div className="info-hint">
                    <span className="info-dot-subtle" />
                    <span>Hover nodes to inspect enterprise integration points</span>
                  </div>
                )}
              </div>

              {/* Bottom Pipeline Bar */}
              <div className="hero-pipeline-strip">
                <span className="pipeline-label">PIPELINE:</span>
                <div className="pipeline-steps-wrap">
                  {pipelineStages.map((st, idx) => (
                    <React.Fragment key={st.step}>
                      <div className="pipeline-stage-tag">
                        <span className="stage-idx">{st.step}</span>
                        <span className="stage-name">{st.name}</span>
                      </div>
                      {idx < pipelineStages.length - 1 && <span className="pipeline-arrow">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-hero-section {
          position: relative;
          background-color: var(--surface-white);
          padding-top: 64px;
          padding-bottom: 72px;
          overflow: hidden;
          border-bottom: 1px solid var(--border-subtle);
        }

        .ai-hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse at 50% 20%, rgba(0,0,0,1) 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 20%, rgba(0,0,0,1) 30%, transparent 80%);
        }

        /* 58% Content / 42% Visual Proportions on Desktop */
        .ai-hero-layout {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 48px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .ai-hero-content {
          display: flex;
          flex-direction: column;
        }

        .ai-hero-headline {
          font-size: var(--font-hero);
          line-height: 1.08;
          font-weight: 700;
          letter-spacing: var(--tracking-hero);
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .ai-hero-copy {
          font-size: 1.0625rem;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 560px;
          margin-bottom: 28px;
        }

        .ai-hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .hero-btn-main {
          padding: 12px 24px;
          font-size: 0.9375rem;
        }

        .hero-btn-main:hover svg {
          transform: translateX(4px);
        }

        .hero-btn-main svg {
          transition: transform 160ms ease;
        }

        .hero-btn-sub {
          padding: 12px 22px;
          font-size: 0.9375rem;
        }

        .hero-btn-sub:hover svg {
          transform: translateY(2px);
        }

        .hero-btn-sub svg {
          transition: transform 160ms ease;
        }

        .hero-trust-bar {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }

        .trust-item {
          display: flex;
          flex-direction: column;
        }

        .trust-number {
          font-size: 1.1875rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .trust-label {
          font-size: 0.6875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-top: 2px;
        }

        .trust-sep {
          width: 1px;
          height: 28px;
          background-color: var(--border-subtle);
        }

        /* Compact Architecture Visual Card */
        .ai-hero-visual-panel {
          position: relative;
          display: flex;
          justify-content: flex-end;
        }

        .system-diagram-card {
          width: 100%;
          max-width: 520px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          padding: 20px;
          box-shadow: var(--shadow-card);
          position: relative;
        }

        .diagram-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .diagram-title-wrap {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .diagram-status-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--brand-red);
          box-shadow: 0 0 0 2px rgba(237, 27, 36, 0.2);
          animation: subtlePulse 2.5s infinite;
        }

        @keyframes subtlePulse {
          0% { box-shadow: 0 0 0 0 rgba(237, 27, 36, 0.35); }
          70% { box-shadow: 0 0 0 5px rgba(237, 27, 36, 0); }
          100% { box-shadow: 0 0 0 0 rgba(237, 27, 36, 0); }
        }

        .diagram-title {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-primary);
        }

        .diagram-badge {
          font-size: 0.625rem;
          font-weight: 600;
          padding: 2px 6px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .diagram-canvas-container {
          position: relative;
          width: 100%;
          margin: 6px 0;
        }

        .diagram-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .diagram-node-info {
          min-height: 32px;
          padding: 6px 10px;
          border-radius: 6px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .info-active {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
        }

        .info-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .info-node-id {
          font-weight: 700;
          color: var(--brand-red);
        }

        .info-text {
          color: var(--text-secondary);
        }

        .info-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .info-dot-subtle {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--border-subtle);
        }

        .hero-pipeline-strip {
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
        }

        .pipeline-label {
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        .pipeline-steps-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .pipeline-stage-tag {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.625rem;
          background: #ffffff;
          padding: 2px 5px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-weight: 600;
        }

        .pipeline-stage-tag .stage-idx {
          color: var(--brand-red);
          font-size: 0.5625rem;
          font-weight: 700;
        }

        .pipeline-arrow {
          color: var(--text-muted);
          font-size: 0.6875rem;
        }

        @media (max-width: 1024px) {
          .ai-hero-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .ai-hero-visual-panel {
            justify-content: center;
          }
          .system-diagram-card {
            max-width: 560px;
          }
        }

        @media (max-width: 640px) {
          .ai-hero-section {
            padding-top: 36px;
            padding-bottom: 44px;
          }
          .ai-hero-headline {
            font-size: clamp(1.85rem, 6.8vw, 2.5rem);
            margin-bottom: 16px;
          }
          .ai-hero-copy {
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .ai-hero-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-bottom: 24px;
          }
          .hero-btn-main, .hero-btn-sub {
            width: 100%;
            justify-content: center;
          }
          .hero-trust-bar {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding-top: 16px;
          }
          .trust-sep {
            display: none;
          }
          .trust-number {
            font-size: 1.0625rem;
          }
          .trust-label {
            font-size: 0.625rem;
            line-height: 1.25;
          }
          .system-diagram-card {
            padding: 16px 14px;
          }
          .diagram-header {
            flex-wrap: wrap;
            gap: 6px;
          }
          .diagram-title {
            font-size: 0.625rem;
          }
          .diagram-node-info {
            min-height: 28px;
            padding: 5px 8px;
            font-size: 0.6875rem;
          }
          .info-active, .info-hint {
            font-size: 0.6875rem;
            flex-wrap: wrap;
          }
          .hero-pipeline-strip {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            width: 100%;
          }
          .pipeline-steps-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            white-space: normal;
          }
          .pipeline-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
