import React, { useEffect, useRef } from 'react';
import { Search, CheckCircle2, Cpu } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const AIModernization: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const analysisGridRef = useRef<HTMLDivElement>(null);

  const analyzeItems = [
    'Code',
    'Architecture',
    'Databases',
    'APIs',
    'Integrations',
    'Business rules',
    'Workflows',
    'Dependencies',
    'Technical debt'
  ];

  const receiveItems = [
    'A map of the current architecture, data flows and integrations',
    'An inventory of the business rules hidden in the code',
    'Current-state documentation your team can actually use',
    'A risk view covering technical debt, outdated components and dependency exposure',
    'Structured specifications ready to guide AI-assisted development'
  ];

  const modernSteps = [
    { num: '01', name: 'Understanding' },
    { num: '02', name: 'Specification' },
    { num: '03', name: 'Modernization plan' },
    { num: '04', name: 'New architecture' },
    { num: '05', name: 'Implementation' },
    { num: '06', name: 'Validation' }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Progressive entrance of the modernization flow diagram
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: flowRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.fromTo(
        '.flow-box-legacy',
        { opacity: 0.4, x: -16 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          '.flow-box-engine',
          { opacity: 0.4, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.25'
        )
        .fromTo(
          '.flow-box-outputs',
          { opacity: 0.4, x: 16 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.25'
        );

      // Analysis 2-column cards
      gsap.fromTo(
        '.modern-compare-card',
        { opacity: 0.4, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: analysisGridRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="modernization" ref={sectionRef} className="section ai-modernization-section" aria-label="AI-Powered Modernization">
      <div className="container">
        {/* Section Header */}
        <div className="modernization-header">
          <div className="eyebrow">AI-POWERED MODERNIZATION</div>
          <h2 className="section-heading modern-heading">
            Understand the system<br />
            <span className="text-red">before you transform it.</span>
          </h2>
          <p className="modern-lead-copy">
            Legacy systems hold years of business knowledge, often hidden in code, databases and
            integrations. Most modernization efforts start by guessing what the system does. We start
            by finding out.
          </p>
        </div>

        {/* Visual Transformation Flow: Legacy System -> AI-Assisted Analysis -> Structured Outputs */}
        <div ref={flowRef} className="modern-flow-diagram card-panel">
          <div className="flow-diagram-titlebar">
            <span className="flow-status-dot" />
            <span className="flow-diagram-heading">BROWNFIELD REVERSE-ENGINEERING PIPELINE</span>
            <span className="flow-diagram-tag">EVIDENCE-BASED DISCOVERY</span>
          </div>

          <div className="flow-grid-cols">
            {/* Left: Abstract Legacy System */}
            <div className="flow-col flow-box-legacy">
              <span className="col-subheading">LEGACY SYSTEM</span>
              <h4 className="col-heading">Uncharted Codebase</h4>
              <p className="col-mini-desc">Monolithic repos, obscure SQL, and undocumented edge-case integrations</p>

              <div className="legacy-stack">
                <span className="legacy-chip">CODE</span>
                <span className="legacy-chip">DATABASE</span>
                <span className="legacy-chip">API</span>
                <span className="legacy-chip">RULES</span>
                <span className="legacy-chip">INTEGRATIONS</span>
              </div>
            </div>

            {/* Connecting Stream 1 */}
            <div className="flow-connector">
              <div className="flow-stream-line" />
              <span className="stream-text">INGEST</span>
              <div className="flow-stream-line" />
            </div>

            {/* Center: AI-Assisted Analysis */}
            <div className="flow-col flow-box-engine">
              <div className="engine-badge">
                <Cpu size={14} className="text-red" />
                <span>AI ANALYSIS</span>
              </div>
              <h4 className="col-heading text-red">AI-Assisted Analysis</h4>
              <p className="col-mini-desc">Reverse-engineers code semantics, constructs call graphs, and extracts domain rules</p>

              <div className="engine-ops-list">
                <div className="engine-op-item">
                  <span className="op-bullet" />
                  <span>Static AST Analysis &amp; Schema Extraction</span>
                </div>
                <div className="engine-op-item">
                  <span className="op-bullet" />
                  <span>Call Graph &amp; Dependency Resolution</span>
                </div>
                <div className="engine-op-item">
                  <span className="op-bullet" />
                  <span>Implicit Logic &amp; Edge-Case Detection</span>
                </div>
              </div>
            </div>

            {/* Connecting Stream 2 */}
            <div className="flow-connector">
              <div className="flow-stream-line" />
              <span className="stream-text">STRUCTURE</span>
              <div className="flow-stream-line" />
            </div>

            {/* Right: Structured Outputs */}
            <div className="flow-col flow-box-outputs">
              <span className="col-subheading">DELIVERABLES</span>
              <h4 className="col-heading">Structured Outputs</h4>
              <p className="col-mini-desc">Complete, verifiable documentation ready to steer engineering</p>

              <div className="output-stack">
                <span className="output-chip">ARCHITECTURE MAP</span>
                <span className="output-chip">BUSINESS RULES</span>
                <span className="output-chip">DOCUMENTATION</span>
                <span className="output-chip">RISKS</span>
                <span className="output-chip">SPECIFICATIONS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brownfield Analysis Breakdown: WE ANALYZE vs YOU RECEIVE */}
        <div className="brownfield-overview-block">
          <div className="brownfield-meta">
            <h3 className="brownfield-title">Brownfield analysis</h3>
            <p className="brownfield-desc">
              Our AI-assisted brownfield analysis reverse-engineers your existing web, mobile and
              enterprise applications, so that modernization starts from facts, not assumptions.
            </p>
          </div>

          <div ref={analysisGridRef} className="compare-grid">
            {/* WE ANALYZE */}
            <div className="modern-compare-card card-panel">
              <div className="compare-card-head">
                <div className="icon-red-outline">
                  <Search size={18} />
                </div>
                <div>
                  <span className="compare-badge">INVESTIGATION SCOPE</span>
                  <h4 className="compare-title">WE ANALYZE</h4>
                </div>
              </div>

              <div className="analyze-tags-cloud">
                {analyzeItems.map((item, idx) => (
                  <div key={idx} className="analyze-tag-item">
                    <span className="analyze-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* YOU RECEIVE */}
            <div className="modern-compare-card card-panel card-panel-highlighted">
              <div className="compare-card-head">
                <div className="icon-red-outline">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <span className="compare-badge text-red">ACTIONABLE VALUE</span>
                  <h4 className="compare-title">YOU RECEIVE</h4>
                </div>
              </div>

              <div className="receive-list">
                {receiveItems.map((item, idx) => (
                  <div key={idx} className="receive-item">
                    <span className="receive-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Six-step sequence: Understanding → Specification → Modernization plan → New architecture → Implementation → Validation */}
        <div className="modern-sequence-strip card-panel">
          <div className="sequence-label">THE 6-PHASE TRANSFORMATION PATHWAY:</div>
          <div className="sequence-steps-container">
            {modernSteps.map((st, idx) => (
              <React.Fragment key={st.num}>
                <div className="sequence-step-card">
                  <span className="seq-num">{st.num}</span>
                  <span className="seq-name">{st.name}</span>
                </div>
                {idx < modernSteps.length - 1 && <span className="seq-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="modern-closing-quote">
            &ldquo;You get a clear, evidence-based path forward, and the business logic your system has
            accumulated stays intact.&rdquo;
          </div>
        </div>
      </div>

      <style>{`
        .ai-modernization-section {
          background-color: var(--surface-white);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .modernization-header {
          max-width: 760px;
          margin-bottom: 48px;
        }

        .modern-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 18px;
        }

        .modern-lead-copy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* Flow Diagram Card */
        .modern-flow-diagram {
          padding: 32px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-card);
          margin-bottom: 48px;
        }

        .flow-diagram-titlebar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 28px;
        }

        .flow-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .flow-diagram-heading {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-primary);
        }

        .flow-diagram-tag {
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
          background-color: var(--surface-soft);
          color: var(--text-muted);
          margin-left: auto;
        }

        .flow-grid-cols {
          display: grid;
          grid-template-columns: 1fr auto 1.15fr auto 1fr;
          gap: 16px;
          align-items: center;
        }

        .flow-col {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 24px 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .flow-box-engine {
          background-color: #ffffff;
          border: 1.5px solid var(--brand-red);
          box-shadow: 0 4px 16px rgba(237, 27, 36, 0.08);
        }

        .col-subheading {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .col-heading {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 6px;
        }

        .col-mini-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-bottom: 16px;
        }

        .legacy-stack, .output-stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .legacy-chip {
          padding: 6px 10px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          font-family: monospace;
          letter-spacing: 0.04em;
        }

        .output-chip {
          padding: 6px 10px;
          background-color: var(--surface-white);
          border: 1px solid #d1d1d8;
          border-left: 3px solid var(--brand-red);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: monospace;
          letter-spacing: 0.04em;
        }

        .engine-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--brand-red);
          background-color: var(--brand-red-light);
          padding: 4px 10px;
          border-radius: 4px;
          width: fit-content;
          margin-bottom: 8px;
        }

        .engine-ops-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .engine-op-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-primary);
          font-weight: 500;
          padding: 6px 8px;
          background-color: var(--surface-soft);
          border-radius: 4px;
        }

        .op-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .flow-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          width: 48px;
        }

        .flow-stream-line {
          width: 100%;
          height: 2px;
          background-color: var(--brand-red);
          opacity: 0.8;
        }

        .stream-text {
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        /* Brownfield Overview 2-Col Compare */
        .brownfield-overview-block {
          margin-bottom: 48px;
        }

        .brownfield-meta {
          max-width: 720px;
          margin-bottom: 28px;
        }

        .brownfield-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .brownfield-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .compare-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .modern-compare-card {
          padding: 32px 28px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          display: flex;
          flex-direction: column;
        }

        .card-panel-highlighted {
          border-color: #d8d8de;
          box-shadow: var(--shadow-subtle);
        }

        .compare-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 24px;
        }

        .compare-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          display: block;
        }

        .compare-title {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
        }

        .analyze-tags-cloud {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .analyze-tag-item {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .analyze-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #8c8c94;
        }

        .receive-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .receive-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--text-primary);
          font-weight: 500;
        }

        .receive-check {
          color: var(--brand-red);
          font-weight: 800;
          font-size: 0.875rem;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* 6-phase Sequence Strip */
        .modern-sequence-strip {
          padding: 28px 32px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: var(--panel-radius);
        }

        .sequence-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .sequence-steps-container {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }

        .sequence-step-card {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: 6px;
          white-space: nowrap;
        }

        .seq-num {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
        }

        .seq-name {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .seq-arrow {
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .modern-closing-quote {
          font-size: 0.9375rem;
          font-weight: 600;
          font-style: italic;
          color: var(--text-primary);
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
          text-align: center;
        }

        @media (max-width: 1024px) {
          .flow-grid-cols {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .flow-connector {
            transform: rotate(90deg);
            margin: 10px auto;
          }
          .compare-grid {
            grid-template-columns: 1fr;
          }
          .analyze-tags-cloud {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .modern-flow-diagram {
            padding: 20px;
          }
          .analyze-tags-cloud {
            grid-template-columns: 1fr;
          }
          .sequence-steps-container {
            flex-direction: column;
            align-items: stretch;
          }
          .seq-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
