import React, { useEffect, useRef } from 'react';
import {
  FileCheck2,
  BookOpenCheck,
  Headset,
  Users2,
  BarChart3,
  Bot,
  Sparkles
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface CapabilityItem {
  num: string;
  title: string;
  copy: string;
  visualCues: string[];
  icon: React.ElementType;
  specialSequence?: string[];
}

export const AICapabilities: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const capabilities: CapabilityItem[] = [
    {
      num: '01',
      title: 'DOCUMENT AI',
      copy: 'Turn documents into usable information: classification, extraction, validation and human review for medical, identity, certificate, form and enterprise documents.',
      visualCues: ['Document', 'Scan & Demarcate', 'AI Extract', 'Validate & Review'],
      icon: FileCheck2
    },
    {
      num: '02',
      title: 'ENTERPRISE KNOWLEDGE AI',
      copy: 'Make organizational knowledge usable with semantic search and knowledge assistants that give source-grounded answers.',
      visualCues: ['Documents', 'Vector Retrieval', 'Context Synthesis', 'Source-Grounded Answer'],
      icon: BookOpenCheck
    },
    {
      num: '03',
      title: 'CUSTOMER SUPPORT AI',
      copy: 'Contextual support that combines knowledge and enterprise systems: customer assistants, ticket understanding, agent assistance and clean human escalation.',
      visualCues: ['Customer Query', 'Enterprise Context', 'Agent Assist', 'Human Escalation'],
      icon: Headset
    },
    {
      num: '04',
      title: 'HR AI',
      copy: 'Employee assistants for policy questions, onboarding, recruitment data extraction and document generation.',
      visualCues: ['Policy Ingestion', 'Recruitment Parsing', 'Automated Onboarding', 'Doc Generation'],
      icon: Users2
    },
    {
      num: '05',
      title: 'INTELLIGENT REPORTING',
      copy: 'Turn data into a story customers understand: executive summaries, trend explanations, exceptions and personalized insights.',
      visualCues: ['Data Aggregation', 'Trend Analysis', 'Exception Flagging', 'Executive Narrative'],
      icon: BarChart3
    },
    {
      num: '06',
      title: 'AGENTIC AI',
      copy: 'Move from AI that answers to AI that acts, connected to the systems and APIs that run your business.',
      visualCues: ['Autonomous Policy', 'Multi-System Tooling', 'State Machine', 'Audit Logging'],
      icon: Bot,
      specialSequence: ['UNDERSTAND', 'RETRIEVE', 'DECIDE', 'EXECUTE', 'VALIDATE', 'ESCALATE']
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.capability-card', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" ref={sectionRef} className="section ai-capabilities-section" aria-label="AI Capabilities What We Build">
      <div className="container">
        {/* Section Header */}
        <div className="capabilities-header">
          <div className="eyebrow">AI CAPABILITIES</div>
          <h2 className="section-heading capabilities-heading">
            AI that works inside your business,<br />
            <span className="text-red">not next to it.</span>
          </h2>
          <p className="capabilities-lead-copy">
            We don’t build demos. We build AI capabilities connected to your data, applications,
            workflows and people.
          </p>
        </div>

        {/* 2x3 Grid of Capabilities */}
        <div ref={gridRef} className="capabilities-grid">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.num} className="capability-card card-panel">
                {/* Subtle red corner indicator */}
                <div className="corner-accent" />

                <div className="cap-top-row">
                  <span className="cap-num">{cap.num}</span>
                  <div className="icon-red-outline">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="cap-title">{cap.title}</h3>
                <p className="cap-copy">{cap.copy}</p>

                {/* Animated Process Line / Visual Cues */}
                <div className="cap-cues-wrap">
                  <div className="cues-title">EXECUTION CUES:</div>
                  <div className="cues-flow">
                    {cap.visualCues.map((cue, cIdx) => (
                      <React.Fragment key={cIdx}>
                        <span className="cue-pill">{cue}</span>
                        {cIdx < cap.visualCues.length - 1 && (
                          <span className="cue-arrow">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* If Agentic AI, show the exact mandatory 6-step sequence */}
                {cap.specialSequence && (
                  <div className="agentic-sequence-box">
                    <div className="agentic-seq-header">
                      <Sparkles size={12} className="text-red" />
                      <span>AGENTIC EXECUTION PIPELINE</span>
                    </div>
                    <div className="agentic-steps-row">
                      {cap.specialSequence.map((step, sIdx) => (
                        <React.Fragment key={step}>
                          <span className="agentic-step">{step}</span>
                          {sIdx < cap.specialSequence!.length - 1 && (
                            <span className="agentic-sep">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .ai-capabilities-section {
          background-color: var(--surface-white);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .capabilities-header {
          max-width: 760px;
          margin-bottom: 48px;
        }

        .capabilities-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .capabilities-lead-copy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.62;
        }

        /* 2x3 Grid */
        .capabilities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .capability-card {
          padding: 32px 28px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 220ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .capability-card:hover {
          transform: translateY(-4px);
          border-color: #cacace;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.07);
        }

        .corner-accent {
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 16px 16px 0;
          border-color: transparent var(--brand-red) transparent transparent;
          border-top-right-radius: var(--panel-radius);
          opacity: 0.85;
        }

        .cap-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .cap-num {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--brand-red);
          letter-spacing: 0.04em;
        }

        .cap-title {
          font-size: 1.1875rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 12px;
        }

        .cap-copy {
          font-size: 0.9375rem;
          line-height: 1.62;
          color: var(--text-secondary);
          margin-bottom: 24px;
          flex-grow: 1;
        }

        /* Visual cues flow */
        .cap-cues-wrap {
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .cues-title {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .cues-flow {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .cue-pill {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 3px 8px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          color: var(--text-primary);
        }

        .cue-arrow {
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        /* Agentic AI special sequence */
        .agentic-sequence-box {
          margin-top: 16px;
          padding: 12px 14px;
          background-color: var(--brand-red-light);
          border: 1px solid rgba(237, 27, 36, 0.16);
          border-radius: 8px;
        }

        .agentic-seq-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--brand-red);
          margin-bottom: 8px;
        }

        .agentic-steps-row {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .agentic-step {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-primary);
          background: #ffffff;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid rgba(237, 27, 36, 0.2);
        }

        .agentic-sep {
          color: var(--brand-red);
          font-size: 0.6875rem;
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          .capabilities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .capabilities-grid {
            grid-template-columns: 1fr;
          }
          .capability-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
};
