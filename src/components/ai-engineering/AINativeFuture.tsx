import React, { useEffect, useRef } from 'react';
import { Sparkles, UserCheck, Cpu } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface LifecycleStage {
  step: string;
  title: string;
  role: 'human' | 'ai' | 'both';
  badge: string;
  desc: string;
}

export const AINativeFuture: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const stages: LifecycleStage[] = [
    {
      step: '01',
      title: 'HUMAN INTENT',
      role: 'human',
      badge: 'HUMAN INITIATION',
      desc: 'Strategic requirements & domain vision'
    },
    {
      step: '02',
      title: 'STRUCTURED CONTEXT',
      role: 'both',
      badge: 'SPECIFICATION',
      desc: 'Machine-verifiable schemas & constraints'
    },
    {
      step: '03',
      title: 'AI AGENTS',
      role: 'ai',
      badge: 'AI PARTICIPATION',
      desc: 'Multi-agent draft code & test synthesis'
    },
    {
      step: '04',
      title: 'ENGINEERING EXECUTION',
      role: 'ai',
      badge: 'AI IMPLEMENTATION',
      desc: 'Deterministic compilation & integration'
    },
    {
      step: '05',
      title: 'AUTOMATED VALIDATION',
      role: 'both',
      badge: 'AUTOMATED CHECK',
      desc: 'Continuous regression & contract checks'
    },
    {
      step: '06',
      title: 'HUMAN APPROVAL',
      role: 'human',
      badge: 'HUMAN ACCOUNTABILITY',
      desc: 'Production release sign-off & audit'
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    // Optional progressive enhancement: animate nodes only if GSAP is available,
    // without ever hiding them initially in CSS!
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.native-step-card',
        { y: 12 },
        {
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="next-engineering-model" ref={sectionRef} className="section ai-future-section" aria-label="The Next Engineering Model Where We Are Going">
      <div className="container">
        {/* Section Header */}
        <div className="future-header">
          <div className="eyebrow">THE NEXT ENGINEERING MODEL</div>
          <h2 className="section-heading future-heading">
            From AI-assisted<br />
            <span className="text-red">to AI-native engineering.</span>
          </h2>
          <p className="future-lead-copy">
            Today, developers use AI to write code. Tomorrow, AI will take part across the entire
            engineering lifecycle.
          </p>
        </div>

        {/* Compact, Reliable 6-Step Engineering Flow Card */}
        <div ref={trackRef} className="future-pipeline-wrapper card-panel">
          <div className="pipeline-top-meta">
            <div className="meta-left">
              <span className="status-ping" />
              <span className="meta-text">THE AI-NATIVE LIFECYCLE</span>
            </div>
            <div className="meta-legend">
              <span className="legend-item"><span className="legend-dot dot-human" /> Human Governed</span>
              <span className="legend-item"><span className="legend-dot dot-ai" /> AI Accelerated</span>
            </div>
          </div>

          {/* Desktop Horizontal Lifecycle Flow (Visible on desktop & tablet) */}
          <div className="native-stages-horizontal">
            {stages.map((st, idx) => {
              const isHuman = st.role === 'human';
              return (
                <React.Fragment key={st.step}>
                  <div className={`native-step-card ${isHuman ? 'step-human-governed' : ''}`}>
                    <div className="step-card-header">
                      <span className="step-num">{st.step}</span>
                      <span className={`step-badge ${isHuman ? 'badge-red' : ''}`}>{st.badge}</span>
                    </div>

                    <h3 className="step-title">{st.title}</h3>
                    <p className="step-desc">{st.desc}</p>

                    <div className="step-role-indicator">
                      {isHuman ? (
                        <span className="role-tag tag-human"><UserCheck size={12} /> Human</span>
                      ) : (
                        <span className="role-tag tag-ai"><Cpu size={12} /> AI</span>
                      )}
                    </div>
                  </div>

                  {idx < stages.length - 1 && (
                    <div className="step-arrow-divider" aria-hidden="true">
                      <span>→</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile Vertical Timeline (Visible only on narrow screens) */}
          <div className="native-stages-vertical">
            {stages.map((st, idx) => {
              const isHuman = st.role === 'human';
              return (
                <div key={st.step} className="mobile-step-row">
                  <div className="mobile-step-left">
                    <span className="mobile-num-bubble">{st.step}</span>
                    {idx < stages.length - 1 && <span className="mobile-timeline-line" />}
                  </div>
                  <div className={`mobile-step-content ${isHuman ? 'border-human' : ''}`}>
                    <div className="mobile-step-header">
                      <h4 className="mobile-step-title">{st.title}</h4>
                      <span className={`mobile-step-badge ${isHuman ? 'badge-red' : ''}`}>{st.badge}</span>
                    </div>
                    <p className="mobile-step-desc">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Single Concluding Brand Statement */}
          <div className="future-statement-footer">
            <div className="footer-statement-inner">
              <Sparkles size={16} className="text-red" />
              <p className="footer-statement-text">
                &ldquo;This is the engineering model we are building at VenusGeo, and the one we bring to our clients.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-future-section {
          background-color: var(--surface-white);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .future-header {
          max-width: 760px;
          margin-bottom: 36px;
        }

        .future-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 14px;
        }

        .future-lead-copy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Compact Container (approx 300-360px tall) */
        .future-pipeline-wrapper {
          padding: 24px 28px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-card);
        }

        .pipeline-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 22px;
        }

        .meta-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-ping {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .meta-text {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-primary);
        }

        .meta-legend {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.6875rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .legend-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .dot-human {
          background-color: var(--brand-red);
        }

        .dot-ai {
          background-color: #5e5e66;
        }

        /* Desktop Horizontal 6-Step Flow */
        .native-stages-horizontal {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          align-items: stretch;
          margin-bottom: 22px;
        }

        /* Essential content is visible by default (opacity 1) */
        .native-step-card {
          padding: 16px 14px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: var(--panel-radius-sm);
          display: flex;
          flex-direction: column;
          position: relative;
          opacity: 1;
          visibility: visible;
          transition: border-color 160ms ease, background-color 160ms ease, transform 160ms ease;
        }

        .native-step-card:hover {
          background-color: #ffffff;
          border-color: #cfcfd6;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
        }

        .step-human-governed {
          border-top: 2.5px solid var(--brand-red);
          background-color: #ffffff;
        }

        .step-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .step-num {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
        }

        .step-badge {
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 2px 5px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          color: var(--text-muted);
        }

        .badge-red {
          color: var(--brand-red);
          border-color: rgba(237, 27, 36, 0.2);
          background-color: var(--brand-red-light);
        }

        .step-title {
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 6px;
        }

        .step-desc {
          font-size: 0.75rem;
          line-height: 1.45;
          color: var(--text-secondary);
          margin-bottom: 12px;
          flex-grow: 1;
        }

        .step-role-indicator {
          margin-top: auto;
        }

        .role-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .tag-human {
          color: var(--brand-red);
          background-color: var(--brand-red-light);
        }

        .tag-ai {
          color: var(--text-secondary);
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
        }

        .step-arrow-divider {
          display: none;
        }

        /* Mobile Vertical Timeline (hidden on desktop) */
        .native-stages-vertical {
          display: none;
        }

        /* Single Concluding Callout */
        .future-statement-footer {
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .footer-statement-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background-color: var(--brand-red-light);
          border-radius: 6px;
          border: 1px solid rgba(237, 27, 36, 0.16);
        }

        .footer-statement-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .native-stages-horizontal {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 768px) {
          .native-stages-horizontal {
            display: none;
          }
          .native-stages-vertical {
            display: flex;
            flex-direction: column;
            gap: 0;
            margin-bottom: 18px;
          }

          .mobile-step-row {
            display: flex;
            gap: 14px;
            position: relative;
          }

          .mobile-step-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 28px;
            flex-shrink: 0;
          }

          .mobile-num-bubble {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: var(--brand-red);
            color: #ffffff;
            font-size: 0.6875rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
          }

          .mobile-timeline-line {
            width: 2px;
            flex-grow: 1;
            background-color: var(--border-subtle);
            min-height: 24px;
            margin: 4px 0;
          }

          .mobile-step-content {
            background-color: var(--surface-soft);
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            padding: 12px 14px;
            margin-bottom: 12px;
            flex-grow: 1;
          }

          .border-human {
            border-left: 3px solid var(--brand-red);
            background-color: #ffffff;
          }

          .mobile-step-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 4px;
          }

          .mobile-step-title {
            font-size: 0.8125rem;
            font-weight: 800;
            color: var(--text-primary);
          }

          .mobile-step-badge {
            font-size: 0.5625rem;
            font-weight: 700;
            padding: 2px 5px;
            background-color: var(--surface-white);
            border-radius: 3px;
            border: 1px solid var(--border-subtle);
            color: var(--text-muted);
          }

          .mobile-step-desc {
            font-size: 0.75rem;
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.4;
          }

          .future-pipeline-wrapper {
            padding: 18px 16px;
          }
        }
      `}</style>
    </section>
  );
};
