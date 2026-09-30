import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Cpu,
  CheckSquare,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/animations';

interface PipelineStep {
  step: string;
  desc: string;
}

interface DimensionItem {
  title: string;
  desc: string;
}

interface EquationTerm {
  term: string;
  note: string;
}

interface KpiItem {
  label: string;
  val: string;
  sub: string;
}

interface PillarData {
  id: string;
  num: string;
  title: string;
  tagline: string;
  statement?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  content: string;
  secondaryContent: string;
  microLabels?: string[];
  pipeline?: PipelineStep[];
  evaluationFactors?: string[];
  constellationNodes?: string[];
  equation?: EquationTerm[];
  kpis?: KpiItem[];
  guaranteePoints?: string[];
  dimensions?: DimensionItem[];
}

export const FivePillarsSection: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pillars: PillarData[] = [
    {
      id: 'pillar-01',
      num: '01',
      title: 'Research & Initiation',
      tagline: 'Innovation begins long before development',
      icon: Search,
      content:
        'VenusGeo approaches enterprise product development through investigation, assessment, analysis and validation. Our research can span computer science, intelligent algorithms, digital devices and emerging technology ecosystems.',
      secondaryContent:
        'Rather than optimizing only for immediate returns, we evaluate ideas against their ability to create lasting operational efficiency, business value and competitive relevance.',
      microLabels: ['ASSESS', 'ANALYZE', 'VALIDATE', 'BUILD'],
      pipeline: [
        { step: 'Opportunity', desc: 'Enterprise domain discovery' },
        { step: 'Research', desc: 'Algorithm & feasibility study' },
        { step: 'Validation', desc: 'Proof of concept & security check' },
        { step: 'Prototype', desc: 'Interactive system test' },
        { step: 'Product', desc: 'Resilient production release' }
      ]
    },
    {
      id: 'pillar-02',
      num: '02',
      title: 'Sourcing',
      tagline: 'Great products depend on more than great software',
      icon: Cpu,
      content:
        'Selecting the right platforms, infrastructure, devices, technologies and vendors is a critical part of product engineering. Our sourcing approach considers the wider global ecosystem rather than treating technology selection as a single-vendor decision.',
      secondaryContent:
        'We systematically evaluate technology stacks across architectural capability, compliance frameworks, long-term vendor stability, and enterprise interoperability.',
      evaluationFactors: [
        'Capability',
        'Interoperability',
        'Enterprise Integration',
        'Compliance',
        'Security',
        'Licensing',
        'Vendor Support',
        'Performance',
        'Usability',
        'Aesthetics',
        'Total Cost'
      ],
      constellationNodes: [
        'Software',
        'Hardware',
        'Cloud',
        'Security',
        'Compliance',
        'Devices',
        'Partners'
      ]
    },
    {
      id: 'pillar-03',
      num: '03',
      title: 'Quality',
      tagline: 'Quality should make complexity feel simple',
      statement: 'Quality should make complexity feel simple.',
      icon: CheckSquare,
      content:
        'VenusGeo defines product quality through stability, reliability and clear business outcomes. Quality begins early—by defining product goals and measurable KPIs before unnecessary complexity enters the product.',
      secondaryContent:
        'Experienced multidisciplinary teams, strong delivery practices and lessons accumulated through years of real-world implementation help turn initial concepts into dependable products.',
      equation: [
        { term: 'SIMPLICITY', note: 'Intuitive enterprise interfaces' },
        { term: 'RELIABILITY', note: 'Zero-fault edge fault tolerance' },
        { term: 'MEASURABLE OUTCOMES', note: 'Auditable business KPIs' },
        { term: 'ENTERPRISE QUALITY', note: 'Enduring product excellence' }
      ],
      kpis: [
        { label: 'Uptime Target', val: '99.9%+', sub: 'Critical workflows' },
        { label: 'Audit Logging', val: '100%', sub: 'Zero-leak boundaries' },
        { label: 'Telemetry', val: '<50ms', sub: 'Real-time sync' }
      ]
    },
    {
      id: 'pillar-04',
      num: '04',
      title: 'Guarantee',
      tagline: 'We stand behind what we build',
      statement: 'We stand behind what we build.',
      icon: ShieldCheck,
      content:
        'Building technology means accepting experimentation while taking responsibility for outcomes. VenusGeo works to deliver products at a high standard while relying on carefully selected technology partners and vendors.',
      secondaryContent:
        'When technology impacts customer operations, our responsibility does not end at deployment. We work alongside customers to investigate issues, mitigate operational impact and drive resolution.',
      guaranteePoints: [
        'Lifecycle Engineering Partnership',
        'Active Mitigation of Operational Impacts',
        'Rigorous Verification against Enterprise SLA',
        'Co-Piloted Incident Resolution'
      ]
    },
    {
      id: 'pillar-05',
      num: '05',
      title: 'Diversity',
      tagline: 'Different perspectives create stronger technology',
      statement: 'Different perspectives create stronger technology.',
      icon: HeartHandshake,
      content:
        'VenusGeo believes meaningful innovation comes from environments where people with different backgrounds, experiences and ways of thinking can contribute.',
      secondaryContent:
        'Our view of diversity extends across identity, age, ability, culture, belief, experience and perspective. Diverse teams bring different ways of understanding problems—and that makes teams more adaptable, creative and capable of solving complex challenges.',
      dimensions: [
        { title: 'Identity & Culture', desc: 'Global context for worldwide enterprise deployments' },
        { title: 'Multidisciplinary Skill', desc: 'AI researchers, system architects, and field specialists' },
        { title: 'Cognitive Variety', desc: 'Alternative problem formulations that unblock complexity' },
        { title: 'Experience & Heritage', desc: '25-year institutional memory coupled with modern velocity' }
      ]
    }
  ];

  // Synchronize active pillar on scroll
  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      pillarRefs.current.forEach((el, idx) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActivePillarIndex(idx),
          onEnterBack: () => setActivePillarIndex(idx)
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePillarClick = (idx: number, id: string) => {
    setActivePillarIndex(idx);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div ref={containerRef} className="five-pillars-wrapper" aria-label="Five Core Philosophy Pillars">
      <div className="container">
        <div className="pillars-split-layout">
          {/* Left Column: Sticky Storytelling Controller (Desktop) */}
          <aside className="pillars-sticky-sidebar" aria-label="Pillars Navigation">
            <div className="sticky-controller-inner card-panel">
              <div className="controller-eyebrow">
                <span className="controller-dot" />
                <span>CORE PILLARS // 0{activePillarIndex + 1} OF 05</span>
              </div>

              {/* Large Active Number Transition */}
              <div className="active-num-display">
                <span className="num-large">{pillars[activePillarIndex].num}</span>
                <span className="num-slash">/</span>
                <span className="num-total">05</span>
              </div>

              <div className="active-pillar-title">
                {pillars[activePillarIndex].title}
              </div>

              <p className="active-pillar-summary">
                {pillars[activePillarIndex].tagline}
              </p>

              {/* Interactive Pillar Selector Tabs */}
              <div className="pillars-nav-list" role="tablist">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isActive = activePillarIndex === idx;
                  return (
                    <button
                      key={pillar.id}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      className={`pillar-nav-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handlePillarClick(idx, pillar.id)}
                    >
                      <span className="nav-btn-num">{pillar.num}</span>
                      <Icon size={16} className={`nav-btn-icon ${isActive ? 'text-red' : ''}`} />
                      <span className="nav-btn-label">{pillar.title}</span>
                      {isActive && <div className="nav-btn-active-bar" />}
                    </button>
                  );
                })}
              </div>

              <div className="controller-footer">
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${((activePillarIndex + 1) / pillars.length) * 100}%` }}
                  />
                </div>
                <div className="progress-caption">
                  <span>Scroll or select to explore principles</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: In-depth Interactive Story Panels */}
          <div className="pillars-content-stack">
            {/* ================= PILLAR 01: RESEARCH & INITIATION ================= */}
            <div
              id="pillar-01"
              ref={(el) => {
                pillarRefs.current[0] = el;
              }}
              className="pillar-card card-panel"
            >
              <div className="pillar-header-row">
                <div className="pillar-index-badge">
                  <span className="badge-num">01</span>
                  <span className="badge-sep">·</span>
                  <span className="badge-name">RESEARCH & INITIATION</span>
                </div>
                <div className="pillar-indicator-pill">
                  <Search size={14} className="text-red" />
                  <span>Deep Investigation</span>
                </div>
              </div>

              <h3 className="pillar-heading">
                Innovation begins long before development.
              </h3>

              <p className="pillar-text">{pillars[0].content}</p>
              <p className="pillar-text">{pillars[0].secondaryContent}</p>

              {/* Micro Labels */}
              {pillars[0].microLabels && (
                <div className="micro-labels-row">
                  {pillars[0].microLabels.map((lbl, i) => (
                    <span key={i} className="micro-label-pill">
                      {lbl}
                    </span>
                  ))}
                </div>
              )}

              {/* Animated Research Pipeline Visual */}
              {pillars[0].pipeline && (
                <div className="pipeline-card card-panel-soft">
                  <div className="pipeline-header">
                    <span className="pipeline-title">RESEARCH-TO-PRODUCT CONTINUUM</span>
                    <span className="pipeline-status">Validated Iteration</span>
                  </div>

                  <div className="pipeline-stepper-track">
                    {pillars[0].pipeline.map((p, i) => (
                      <div key={i} className="pipeline-step-node">
                        <div className="node-circle-wrap">
                          <div className={`node-circle ${i === 0 || i === 4 ? 'highlight' : ''}`}>
                            {i + 1}
                          </div>
                          {pillars[0].pipeline && i < pillars[0].pipeline.length - 1 && (
                            <div className="node-line-connector" />
                          )}
                        </div>
                        <div className="node-label-wrap">
                          <div className="node-step-name">{p.step}</div>
                          <div className="node-step-sub">{p.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ================= PILLAR 02: SOURCING ================= */}
            <div
              id="pillar-02"
              ref={(el) => {
                pillarRefs.current[1] = el;
              }}
              className="pillar-card card-panel"
            >
              <div className="pillar-header-row">
                <div className="pillar-index-badge">
                  <span className="badge-num">02</span>
                  <span className="badge-sep">·</span>
                  <span className="badge-name">SOURCING</span>
                </div>
                <div className="pillar-indicator-pill">
                  <Cpu size={14} className="text-red" />
                  <span>Global Ecosystem</span>
                </div>
              </div>

              <h3 className="pillar-heading">
                Great products depend on more than great software.
              </h3>

              <p className="pillar-text">{pillars[1].content}</p>
              <p className="pillar-text">{pillars[1].secondaryContent}</p>

              {/* Constellation / Ecosystem Diagram */}
              <div className="constellation-box card-panel-soft">
                <div className="constellation-title-bar">
                  <span className="constellation-title">GLOBAL TECHNOLOGY ECOSYSTEM</span>
                  <span className="constellation-tag">Multi-Vendor Holistic Synthesis</span>
                </div>

                {/* SVG Constellation */}
                <div className="constellation-svg-wrap">
                  <svg viewBox="0 0 540 220" fill="none" className="constellation-svg" aria-label="Constellation network of sourcing technologies">
                    {/* Interconnecting Lines */}
                    <line x1="270" y1="110" x2="90" y2="60" stroke="#e2e2e8" strokeWidth="1.2" strokeDasharray="3 3" />
                    <line x1="270" y1="110" x2="270" y2="40" stroke="#e2e2e8" strokeWidth="1.2" strokeDasharray="3 3" />
                    <line x1="270" y1="110" x2="450" y2="60" stroke="#e2e2e8" strokeWidth="1.2" strokeDasharray="3 3" />
                    <line x1="270" y1="110" x2="110" y2="165" stroke="#e2e2e8" strokeWidth="1.2" strokeDasharray="3 3" />
                    <line x1="270" y1="110" x2="430" y2="165" stroke="#e2e2e8" strokeWidth="1.2" strokeDasharray="3 3" />
                    <line x1="270" y1="110" x2="270" y2="180" stroke="#e2e2e8" strokeWidth="1.2" strokeDasharray="3 3" />

                    {/* Lateral Outer Connectors */}
                    <path d="M 90 60 Q 270 20 450 60" stroke="rgba(237, 27, 36, 0.2)" strokeWidth="1.2" />
                    <path d="M 110 165 Q 270 210 430 165" stroke="rgba(237, 27, 36, 0.2)" strokeWidth="1.2" />

                    {/* Central Core: VenusGeo Evaluation Engine */}
                    <circle cx="270" cy="110" r="32" fill="#141416" />
                    <circle cx="270" cy="110" r="28" fill="#ffffff" />
                    <circle cx="270" cy="110" r="10" fill="#ed1b24" />
                    <text x="270" y="114" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">
                      VENUSGEO
                    </text>

                    {/* Node 1: Software */}
                    <g transform="translate(90, 60)">
                      <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="5" fill="#ed1b24" />
                      <text x="0" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#121214">Software</text>
                    </g>

                    {/* Node 2: Cloud */}
                    <g transform="translate(270, 40)">
                      <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="5" fill="#141416" />
                      <text x="0" y="-12" textAnchor="middle" fontSize="10" fontWeight="700" fill="#121214">Cloud & Edge</text>
                    </g>

                    {/* Node 3: Hardware */}
                    <g transform="translate(450, 60)">
                      <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="5" fill="#ed1b24" />
                      <text x="0" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#121214">Hardware</text>
                    </g>

                    {/* Node 4: Security */}
                    <g transform="translate(110, 165)">
                      <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="5" fill="#141416" />
                      <text x="0" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#121214">Security</text>
                    </g>

                    {/* Node 5: Compliance */}
                    <g transform="translate(270, 180)">
                      <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="5" fill="#ed1b24" />
                      <text x="0" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#121214">Compliance</text>
                    </g>

                    {/* Node 6: Partners */}
                    <g transform="translate(430, 165)">
                      <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="5" fill="#141416" />
                      <text x="0" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#121214">Partners</text>
                    </g>
                  </svg>
                </div>

                {/* Factors Tag Cloud */}
                <div className="sourcing-factors-cloud">
                  <div className="factors-label">Evaluation Criteria:</div>
                  <div className="factors-pills">
                    {pillars[1].evaluationFactors?.map((factor, i) => (
                      <span key={i} className="factor-tag">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= PILLAR 03: QUALITY ================= */}
            <div
              id="pillar-03"
              ref={(el) => {
                pillarRefs.current[2] = el;
              }}
              className="pillar-card card-panel"
            >
              <div className="pillar-header-row">
                <div className="pillar-index-badge">
                  <span className="badge-num">03</span>
                  <span className="badge-sep">·</span>
                  <span className="badge-name">QUALITY</span>
                </div>
                <div className="pillar-indicator-pill">
                  <CheckSquare size={14} className="text-red" />
                  <span>Engineering Rigor</span>
                </div>
              </div>

              {/* Callout Quote */}
              <div className="quality-callout-quote">
                &ldquo;Quality should make complexity feel simple.&rdquo;
              </div>

              <p className="pillar-text">{pillars[2].content}</p>
              <p className="pillar-text">{pillars[2].secondaryContent}</p>

              {/* Large Quality Equation */}
              <div className="quality-equation-card card-panel-soft">
                <div className="equation-label">THE ENTERPRISE QUALITY EQUATION</div>
                <div className="equation-formula">
                  <div className="equation-term">
                    <span className="term-main">SIMPLICITY</span>
                    <span className="term-sub">Intuitive UX & flow</span>
                  </div>
                  <div className="equation-operator">+</div>
                  <div className="equation-term">
                    <span className="term-main">RELIABILITY</span>
                    <span className="term-sub">High-availability logic</span>
                  </div>
                  <div className="equation-operator">+</div>
                  <div className="equation-term">
                    <span className="term-main">MEASURABLE OUTCOMES</span>
                    <span className="term-sub">Auditable business KPIs</span>
                  </div>
                  <div className="equation-operator text-red">=</div>
                  <div className="equation-term result-term">
                    <span className="term-main text-red">QUALITY</span>
                    <span className="term-sub">Enterprise durability</span>
                  </div>
                </div>
              </div>

              {/* 3 Quality KPI Indicators */}
              <div className="quality-kpi-grid">
                {pillars[2].kpis?.map((k, i) => (
                  <div key={i} className="quality-kpi-box">
                    <div className="kpi-val text-red">{k.val}</div>
                    <div className="kpi-label">{k.label}</div>
                    <div className="kpi-sub">{k.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= PILLAR 04: GUARANTEE ================= */}
            <div
              id="pillar-04"
              ref={(el) => {
                pillarRefs.current[3] = el;
              }}
              className="pillar-card card-panel"
            >
              <div className="pillar-header-row">
                <div className="pillar-index-badge">
                  <span className="badge-num">04</span>
                  <span className="badge-sep">·</span>
                  <span className="badge-name">GUARANTEE</span>
                </div>
                <div className="pillar-indicator-pill">
                  <ShieldCheck size={14} className="text-red" />
                  <span>Total Accountability</span>
                </div>
              </div>

              {/* Visually Prominent Supporting Statement */}
              <div className="guarantee-statement-box">
                <div className="guarantee-accent-line" />
                <h3 className="guarantee-prominent-heading">
                  We stand behind what we build.
                </h3>
              </div>

              <p className="pillar-text">{pillars[3].content}</p>
              <p className="pillar-text">{pillars[3].secondaryContent}</p>

              {/* Guarantee Points Grid */}
              <div className="guarantee-points-grid">
                {pillars[3].guaranteePoints?.map((pt, i) => (
                  <div key={i} className="guarantee-point-item card-panel-soft">
                    <CheckCircle2 size={18} className="text-red" />
                    <span className="point-text">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="guarantee-sla-bar card-panel-soft">
                <div className="sla-icon-wrap">
                  <Activity size={20} className="text-red" />
                </div>
                <div className="sla-text-block">
                  <span className="sla-title">Active Operational Continuity</span>
                  <span className="sla-desc">
                    When technology touches production systems, our engineering team works alongside your operational leads to safeguard business momentum.
                  </span>
                </div>
              </div>
            </div>

            {/* ================= PILLAR 05: DIVERSITY ================= */}
            <div
              id="pillar-05"
              ref={(el) => {
                pillarRefs.current[4] = el;
              }}
              className="pillar-card card-panel"
            >
              <div className="pillar-header-row">
                <div className="pillar-index-badge">
                  <span className="badge-num">05</span>
                  <span className="badge-sep">·</span>
                  <span className="badge-name">DIVERSITY</span>
                </div>
                <div className="pillar-indicator-pill">
                  <HeartHandshake size={14} className="text-red" />
                  <span>Cognitive Breadth</span>
                </div>
              </div>

              <h3 className="pillar-heading">
                Different perspectives create stronger technology.
              </h3>

              <p className="pillar-text">{pillars[4].content}</p>
              <p className="pillar-text">{pillars[4].secondaryContent}</p>

              {/* Abstract Representation of Interconnected Perspectives */}
              <div className="diversity-dimensions-grid">
                {pillars[4].dimensions?.map((dim, i) => (
                  <div key={i} className="dimension-mosaic-item card-panel-soft">
                    <div className="mosaic-header">
                      <span className="mosaic-num">0{i + 1}</span>
                      <span className="mosaic-dot" />
                    </div>
                    <div className="mosaic-title">{dim.title}</div>
                    <div className="mosaic-desc">{dim.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .five-pillars-wrapper {
          padding-top: 48px;
          padding-bottom: 72px;
          background-color: var(--surface-white);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        @media (max-width: 768px) {
          .five-pillars-wrapper {
            padding-top: 32px;
            padding-bottom: 48px;
          }
        }

        .pillars-split-layout {
          display: grid;
          grid-template-columns: 360px minmax(0, 1fr);
          gap: 48px;
          align-items: flex-start;
          position: relative;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 992px) {
          .pillars-split-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 24px;
            width: 100%;
            max-width: 100%;
          }
        }

        /* Sticky Left Sidebar (Desktop) */
        .pillars-sticky-sidebar {
          position: sticky;
          top: 96px;
          z-index: 10;
          min-width: 0;
          max-width: 100%;
        }

        @media (max-width: 992px) {
          .pillars-sticky-sidebar {
            position: static;
            top: auto;
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }
        }

        .sticky-controller-inner {
          padding: 28px 24px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 992px) {
          .sticky-controller-inner {
            padding: 16px 14px;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            box-sizing: border-box;
          }
          .active-num-display {
            display: none !important;
          }
          .active-pillar-summary {
            display: none !important;
          }
          .controller-eyebrow {
            margin-bottom: 8px !important;
          }
          .active-pillar-title {
            font-size: 1.1rem !important;
            margin-bottom: 12px !important;
          }
          .pillars-nav-list {
            display: flex !important;
            flex-direction: row !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            overflow-x: auto;
            gap: 8px !important;
            margin-bottom: 12px !important;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            box-sizing: border-box;
          }
          .pillars-nav-list::-webkit-scrollbar {
            display: none;
          }
          .pillar-nav-btn {
            flex-shrink: 0;
            padding: 8px 12px !important;
            font-size: 0.8125rem !important;
            white-space: nowrap;
          }
          .nav-btn-active-bar {
            display: none !important;
          }
        }

        .controller-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--brand-red);
          margin-bottom: 16px;
        }

        .controller-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .active-num-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 6px;
        }

        .num-large {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--brand-red);
          line-height: 1;
        }

        .num-slash {
          font-size: 1.5rem;
          color: var(--border-card);
          font-weight: 400;
        }

        .num-total {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .active-pillar-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .active-pillar-summary {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-bottom: 24px;
        }

        /* Pillars Nav List */
        .pillars-nav-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 24px;
          min-width: 0;
          max-width: 100%;
        }

        .pillar-nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: none;
          border: 1px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          text-align: left;
          transition: background-color var(--transition-quick), color var(--transition-quick);
        }

        .pillar-nav-btn:hover {
          background-color: var(--surface-soft);
        }

        .pillar-nav-btn.active {
          background-color: var(--brand-red-light);
          border-color: rgba(237, 27, 36, 0.16);
        }

        .nav-btn-num {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
          letter-spacing: 0.04em;
          width: 20px;
        }

        .nav-btn-icon {
          flex-shrink: 0;
          color: var(--text-muted);
        }

        .nav-btn-label {
          font-size: 0.84375rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          flex-grow: 1;
        }

        .nav-btn-active-bar {
          position: absolute;
          right: 0;
          top: 6px;
          bottom: 6px;
          width: 3px;
          background-color: var(--brand-red);
          border-radius: 2px;
        }

        .controller-footer {
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .progress-bar-container {
          width: 100%;
          height: 3px;
          background-color: var(--border-subtle);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-bar-fill {
          height: 100%;
          background-color: var(--brand-red);
          transition: width 300ms ease;
        }

        .progress-caption {
          font-size: 0.6875rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Right Column Content Cards */
        .pillars-content-stack {
          display: flex;
          flex-direction: column;
          gap: 48px;
          min-width: 0;
          max-width: 100%;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .pillars-content-stack {
            gap: 28px;
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }
        }

        .pillar-card {
          padding: 40px;
          scroll-margin-top: 100px;
          transition: border-color var(--transition-normal);
          min-width: 0;
          max-width: 100%;
          width: 100%;
          box-sizing: border-box;
          overflow-wrap: break-word;
          word-break: normal;
        }

        @media (max-width: 600px) {
          .pillar-card {
            padding: 20px 14px;
            scroll-margin-top: 70px;
            border-radius: var(--panel-radius-sm);
          }
          .pillar-heading {
            font-size: 1.25rem !important;
            line-height: 1.28 !important;
            margin-bottom: 12px !important;
            overflow-wrap: break-word !important;
            word-break: normal !important;
          }
          .pillar-text {
            font-size: 0.875rem !important;
            line-height: 1.55 !important;
            margin-bottom: 12px !important;
            overflow-wrap: break-word !important;
            word-break: normal !important;
          }
          .pipeline-card {
            padding: 16px 12px !important;
            width: 100%;
            box-sizing: border-box;
          }
          .constellation-box {
            padding: 16px 12px !important;
            width: 100%;
            box-sizing: border-box;
          }
          .constellation-title-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            width: 100%;
          }
        }

        .pillar-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pillar-index-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--brand-red);
        }

        .badge-sep {
          color: var(--border-card);
        }

        .pillar-indicator-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }

        .pillar-heading {
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 800;
          letter-spacing: var(--tracking-heading);
          line-height: 1.2;
          margin-bottom: 16px;
          overflow-wrap: break-word;
          word-break: normal;
        }

        .pillar-text {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 14px;
          overflow-wrap: break-word;
          word-break: normal;
        }

        /* Micro-Labels Row */
        .micro-labels-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 18px 0 24px;
          width: 100%;
        }

        .micro-label-pill {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 4px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          color: var(--brand-red);
        }

        /* Pipeline Visual */
        .pipeline-card {
          padding: 24px;
          border-radius: var(--panel-radius-sm);
          margin-top: 20px;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .pipeline-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          flex-wrap: wrap;
          gap: 6px;
        }

        .pipeline-status {
          color: var(--brand-red);
        }

        .pipeline-stepper-track {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .pipeline-step-node {
          display: grid;
          grid-template-columns: 28px minmax(0, 1fr);
          gap: 14px;
          align-items: flex-start;
          position: relative;
          min-width: 0;
          width: 100%;
        }

        .node-circle-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .node-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--surface-white);
          border: 1.5px solid var(--border-card);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-primary);
          flex-shrink: 0;
          z-index: 1;
        }

        .node-circle.highlight {
          background-color: var(--brand-red);
          border-color: var(--brand-red);
          color: #ffffff;
        }

        .node-line-connector {
          width: 2px;
          flex-grow: 1;
          background-color: var(--border-subtle);
          min-height: 18px;
        }

        .node-label-wrap {
          padding-bottom: 8px;
          min-width: 0;
          overflow-wrap: break-word;
        }

        .node-step-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .node-step-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Constellation / Sourcing Visual */
        .constellation-box {
          padding: 24px;
          border-radius: var(--panel-radius-sm);
          margin-top: 20px;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .constellation-title-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          flex-wrap: wrap;
          gap: 6px;
          width: 100%;
        }

        .constellation-tag {
          color: var(--brand-red);
        }

        .constellation-svg-wrap {
          width: 100%;
          max-width: 100%;
          margin-bottom: 16px;
          overflow: hidden;
        }

        .constellation-svg {
          width: 100%;
          max-width: 100%;
          height: auto;
          display: block;
        }

        .sourcing-factors-cloud {
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          width: 100%;
        }

        .factors-label {
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .factors-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          width: 100%;
        }

        .factor-tag {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 12px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }

        /* Quality Quote and Equation */
        .quality-callout-quote {
          font-size: clamp(1.2rem, 1.8vw, 1.45rem);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          padding-left: 18px;
          border-left: 3px solid var(--brand-red);
          margin-bottom: 18px;
          overflow-wrap: break-word;
          word-break: normal;
        }

        @media (max-width: 600px) {
          .quality-callout-quote {
            font-size: 1.05rem !important;
            padding-left: 12px !important;
            margin-bottom: 14px !important;
          }
        }

        .quality-equation-card {
          padding: 24px;
          border-radius: var(--panel-radius-sm);
          margin-top: 20px;
          margin-bottom: 20px;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 600px) {
          .quality-equation-card {
            padding: 16px 12px !important;
            margin-top: 14px !important;
            margin-bottom: 14px !important;
          }
          .equation-formula {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .equation-operator {
            text-align: center;
            font-size: 1.1rem !important;
            line-height: 1;
            padding: 2px 0;
          }
          .equation-term {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 10px 12px !important;
            box-sizing: border-box !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .term-main {
            font-size: 0.8125rem !important;
            word-break: break-word;
          }
          .term-sub {
            font-size: 0.6875rem !important;
            word-break: break-word;
          }
        }

        .equation-label {
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 14px;
        }

        .equation-formula {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          width: 100%;
          box-sizing: border-box;
        }

        .equation-term {
          display: flex;
          flex-direction: column;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          padding: 10px 14px;
          border-radius: 6px;
          box-sizing: border-box;
          min-width: 0;
        }

        .equation-term.result-term {
          border-color: rgba(237, 27, 36, 0.4);
          background-color: var(--brand-red-light);
        }

        .term-main {
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: var(--text-primary);
        }

        .term-sub {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }

        .equation-operator {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-muted);
        }

        .quality-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
        }

        @media (max-width: 600px) {
          .quality-kpi-grid {
            grid-template-columns: 1fr;
            gap: 10px;
            width: 100%;
          }
          .quality-kpi-box {
            padding: 12px 14px !important;
            box-sizing: border-box !important;
            width: 100%;
          }
        }

        .quality-kpi-box {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          padding: 16px;
          border-radius: 6px;
          min-width: 0;
          box-sizing: border-box;
        }

        .kpi-val {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .kpi-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 4px;
        }

        .kpi-sub {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }

        /* Guarantee Section */
        .guarantee-statement-box {
          margin-bottom: 18px;
          width: 100%;
        }

        .guarantee-accent-line {
          width: 50px;
          height: 3px;
          background-color: var(--brand-red);
          margin-bottom: 12px;
          border-radius: 2px;
        }

        .guarantee-prominent-heading {
          font-size: clamp(1.4rem, 2vw, 1.8rem);
          font-weight: 800;
          letter-spacing: var(--tracking-heading);
          color: var(--text-primary);
          overflow-wrap: break-word;
          word-break: normal;
        }

        @media (max-width: 600px) {
          .guarantee-prominent-heading {
            font-size: 1.25rem !important;
          }
        }

        .guarantee-points-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 20px;
          margin-bottom: 20px;
          width: 100%;
        }

        @media (max-width: 600px) {
          .guarantee-points-grid {
            grid-template-columns: 1fr;
            gap: 8px;
            width: 100%;
          }
          .guarantee-point-item {
            padding: 12px 14px !important;
            box-sizing: border-box !important;
            width: 100%;
          }
        }

        .guarantee-point-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-radius: 6px;
          min-width: 0;
          box-sizing: border-box;
        }

        .point-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          min-width: 0;
          overflow-wrap: break-word;
        }

        .guarantee-sla-bar {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px;
          border-radius: 6px;
          border-left: 3px solid var(--brand-red);
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 600px) {
          .guarantee-sla-bar {
            padding: 14px !important;
            gap: 10px !important;
            width: 100%;
          }
        }

        .sla-title {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .sla-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .sla-text-block {
          min-width: 0;
          overflow-wrap: break-word;
        }

        /* Diversity Mosaic */
        .diversity-dimensions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 22px;
          width: 100%;
        }

        @media (max-width: 600px) {
          .diversity-dimensions-grid {
            grid-template-columns: 1fr;
            gap: 10px;
            width: 100%;
          }
          .dimension-mosaic-item {
            padding: 16px 14px !important;
            box-sizing: border-box !important;
            width: 100%;
          }
        }

        .dimension-mosaic-item {
          padding: 20px;
          border-radius: 8px;
          transition: transform 160ms ease, border-color 160ms ease;
          min-width: 0;
          box-sizing: border-box;
        }

        .dimension-mosaic-item:hover {
          transform: translateY(-2px);
          border-color: #d1d1d8;
        }

        .mosaic-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .mosaic-num {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
        }

        .mosaic-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .mosaic-title {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .mosaic-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
      `}</style>
    </div>
  );
};
