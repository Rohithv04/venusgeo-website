import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface LifecycleStep {
  step: string;
  name: string;
  desc: string;
}

export const AIEngineeringLifecycle: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const lifecycleRef = useRef<HTMLDivElement>(null);

  const contextPipeline = [
    'BUSINESS',
    'REQUIREMENTS',
    'ARCHITECTURE',
    'COMPONENTS',
    'DATA',
    'APIs',
    'RULES',
    'TESTS'
  ];

  const lifecycleSteps: LifecycleStep[] = [
    { step: '01', name: 'DISCOVER', desc: 'The business problem and opportunity.' },
    { step: '02', name: 'UNDERSTAND', desc: 'Business and technical context.' },
    { step: '03', name: 'SPECIFY', desc: 'Requirements, architecture and acceptance criteria.' },
    { step: '04', name: 'BUILD', desc: 'AI-assisted engineering.' },
    { step: '05', name: 'VALIDATE', desc: 'Automated testing plus human review.' },
    { step: '06', name: 'DEPLOY', desc: 'Production integration.' },
    { step: '07', name: 'IMPROVE', desc: 'Measure, learn, optimize.' }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the context before code pipeline items safely
      gsap.fromTo(
        '.pipeline-stage-box',
        { opacity: 0.4, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pipelineRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate lifecycle steps safely
      gsap.fromTo(
        '.lifecycle-step-card',
        { opacity: 0.4, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lifecycleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="engineering-model" ref={sectionRef} className="section ai-lifecycle-section" aria-label="Our Engineering Model and AI Development Lifecycle">
      <div className="container">
        {/* Section Header */}
        <div className="lifecycle-header">
          <div className="eyebrow">OUR ENGINEERING MODEL</div>
          <h2 className="section-heading lifecycle-heading">
            Context before code.
          </h2>
          <p className="lifecycle-copy">
            AI coding agents are powerful, but only as good as their understanding of your system.
            We create structured specifications that give them that understanding.
          </p>
        </div>

        {/* Context Pipeline: BUSINESS → REQUIREMENTS → ARCHITECTURE → COMPONENTS → DATA → APIs → RULES → TESTS */}
        <div ref={pipelineRef} className="context-pipeline-container card-panel">
          <div className="pipeline-header-bar">
            <span className="pipeline-indicator" />
            <span className="pipeline-title">STRUCTURED CONTEXT PIPELINE</span>
            <span className="pipeline-note">GROUND TRUTH GENERATION</span>
          </div>

          <div className="context-stages-track">
            {contextPipeline.map((stage, idx) => (
              <React.Fragment key={stage}>
                <div className="pipeline-stage-box">
                  <span className="stage-number">0{idx + 1}</span>
                  <span className="stage-name">{stage}</span>
                </div>
                {idx < contextPipeline.length - 1 && (
                  <div className="stage-arrow-wrap">
                    <span className="stage-arrow">→</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="context-statement-strip">
            <Sparkles size={16} className="text-red" />
            <span>That context becomes the foundation for fast, reliable, AI-assisted development.</span>
          </div>
        </div>

        {/* 7-Step AI Development Lifecycle */}
        <div className="lifecycle-block">
          <div className="lifecycle-subhead">
            <h3 className="subhead-title">AI Development Lifecycle</h3>
            <p className="subhead-desc">
              From initial discovery to continuous post-launch optimization, each stage integrates AI velocity with disciplined human engineering.
            </p>
          </div>

          {/* Desktop Horizontal Lifecycle & Responsive Cards */}
          <div ref={lifecycleRef} className="lifecycle-steps-grid">
            {lifecycleSteps.map((item, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={item.step}
                  className={`lifecycle-step-card card-panel ${isSelected ? 'step-selected' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  <div className="step-card-top">
                    <span className="step-card-num">{item.step}</span>
                    <div className="step-active-dot" />
                  </div>
                  <h4 className="step-card-name">{item.name}</h4>
                  <p className="step-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .ai-lifecycle-section {
          background-color: var(--surface-soft);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .lifecycle-header {
          max-width: 760px;
          margin-bottom: 48px;
        }

        .lifecycle-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .lifecycle-copy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* Context Pipeline Card */
        .context-pipeline-container {
          padding: 32px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-card);
          margin-bottom: 56px;
          overflow: hidden;
        }

        .pipeline-header-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 24px;
        }

        .pipeline-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .pipeline-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-primary);
        }

        .pipeline-note {
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
          background-color: var(--surface-soft);
          color: var(--text-muted);
          margin-left: auto;
        }

        .context-stages-track {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 16px;
          margin-bottom: 20px;
        }

        .pipeline-stage-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 14px 16px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          min-width: 105px;
          flex-shrink: 0;
          transition: border-color 160ms ease, background-color 160ms ease;
        }

        .pipeline-stage-box:hover {
          background-color: var(--surface-white);
          border-color: var(--brand-red);
        }

        .stage-number {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--brand-red);
          margin-bottom: 4px;
        }

        .stage-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }

        .stage-arrow-wrap {
          color: var(--text-muted);
          font-size: 0.875rem;
          padding: 0 2px;
          flex-shrink: 0;
        }

        .context-statement-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background-color: var(--brand-red-light);
          border: 1px solid rgba(237, 27, 36, 0.16);
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* 7-Step Lifecycle */
        .lifecycle-block {
          position: relative;
        }

        .lifecycle-subhead {
          margin-bottom: 28px;
        }

        .subhead-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .subhead-desc {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .lifecycle-steps-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
        }

        .lifecycle-step-card {
          padding: 24px 18px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius-sm);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
          position: relative;
        }

        .lifecycle-step-card:hover,
        .lifecycle-step-card.step-selected {
          transform: translateY(-3px);
          border-color: #d1d1d8;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .lifecycle-step-card.step-selected {
          border-top: 3px solid var(--brand-red);
        }

        .step-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .step-card-num {
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--brand-red);
        }

        .step-active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--border-subtle);
          transition: background-color 160ms ease;
        }

        .lifecycle-step-card.step-selected .step-active-dot {
          background-color: var(--brand-red);
        }

        .step-card-name {
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .step-card-desc {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .lifecycle-steps-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          .context-stages-track {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            overflow-x: visible;
            padding-bottom: 0;
            margin-bottom: 18px;
          }
          .stage-arrow-wrap {
            display: none;
          }
          .pipeline-stage-box {
            min-width: 0;
            width: 100%;
            padding: 12px 10px;
          }
        }

        @media (max-width: 768px) {
          .lifecycle-header {
            margin-bottom: 28px;
          }
          .lifecycle-heading {
            font-size: clamp(1.65rem, 5.5vw, 2.1rem);
            margin-bottom: 14px;
          }
          .lifecycle-copy {
            font-size: 0.95rem;
            line-height: 1.55;
          }
          .context-pipeline-container {
            padding: 20px 16px;
            margin-bottom: 36px;
          }
          .pipeline-header-bar {
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
            padding-bottom: 12px;
            justify-content: space-between;
          }
          .pipeline-note {
            margin-left: 0;
          }
          .context-stages-track {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            overflow-x: visible;
            padding-bottom: 0;
            margin-bottom: 16px;
          }
          .stage-arrow-wrap {
            display: none;
          }
          .pipeline-stage-box {
            min-width: 0;
            width: 100%;
            padding: 12px 10px;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .stage-number {
            font-size: 0.6875rem;
            margin-bottom: 3px;
          }
          .stage-name {
            font-size: 0.75rem;
            letter-spacing: 0.04em;
          }
          .context-statement-strip {
            padding: 12px 14px;
            font-size: 0.8125rem;
            line-height: 1.45;
          }
          .lifecycle-subhead {
            margin-bottom: 20px;
          }
          .subhead-title {
            font-size: 1.25rem;
          }
          .subhead-desc {
            font-size: 0.875rem;
          }
          .lifecycle-steps-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .lifecycle-step-card {
            padding: 16px 14px;
          }
        }
      `}</style>
    </section>
  );
};
