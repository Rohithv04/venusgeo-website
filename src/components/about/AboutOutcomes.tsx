import React, { useEffect, useRef } from 'react';
import { TrendingUp, Users, Wrench } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const AboutOutcomes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.outcome-large-panel', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 24,
        stagger: 0.14,
        duration: 0.75,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const outcomes = [
    {
      num: '01',
      domain: 'BUSINESS',
      heading: 'Build what comes next.',
      description:
        'Create next-generation products designed to remain competitive, relevant and adaptable as technology and markets evolve.',
      icon: TrendingUp,
      impacts: [
        'Future-proof architectural flexibility',
        'Accelerated commercial time-to-market',
        'Sustained competitive differentiation'
      ]
    },
    {
      num: '02',
      domain: 'CUSTOMER',
      heading: 'Continuously improve the experience.',
      description:
        'Use thoughtful technology and better digital journeys to improve service quality and strengthen customer engagement.',
      icon: Users,
      impacts: [
        'Frictionless user & patient journeys',
        'Deterministic performance at high load',
        'Zero-compromise privacy and biometric trust'
      ]
    },
    {
      num: '03',
      domain: 'OPERATIONS',
      heading: 'Make complexity easier to operate.',
      description:
        'Build technology that integrates effectively with enterprise environments while remaining intuitive, efficient and simple to use.',
      icon: Wrench,
      impacts: [
        'Seamless integration with legacy ERPs & POS',
        'Distributed edge sync across maritime/remote assets',
        'Autonomous monitoring and self-healing pipelines'
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="section about-outcomes-section" aria-label="Benefits and Outcomes">
      <div className="container">
        {/* Section Header */}
        <div className="outcomes-header">
          <div className="eyebrow">THE OUTCOME</div>
          <h2 className="outcomes-headline">
            Technology that creates value<br />
            <span className="text-red">where it matters.</span>
          </h2>
          <p className="outcomes-subcopy">
            Enterprise products must deliver measurable commercial value, elevated customer trust, and operational clarity.
          </p>
        </div>

        {/* 3 Large Outcome Panels */}
        <div className="outcomes-panels-grid">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="outcome-large-panel card-panel">
                <div className="panel-top-row">
                  <span className="panel-num-tag">{item.num} // {item.domain}</span>
                  <span className="icon-red-outline">
                    <Icon size={18} />
                  </span>
                </div>

                <h3 className="panel-main-heading">{item.heading}</h3>

                <p className="panel-description">{item.description}</p>

                <div className="panel-impact-list">
                  <div className="impact-list-title">Key Impacts:</div>
                  {item.impacts.map((imp, i) => (
                    <div key={i} className="impact-item">
                      <span className="impact-bullet">·</span>
                      <span className="impact-text">{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-outcomes-section {
          background-color: var(--surface-white);
          padding-top: 72px;
          padding-bottom: 72px;
        }

        @media (max-width: 768px) {
          .about-outcomes-section {
            padding-top: 48px;
            padding-bottom: 48px;
          }
        }

        .outcomes-header {
          max-width: 680px;
          margin-bottom: 48px;
        }

        @media (max-width: 600px) {
          .outcomes-header {
            margin-bottom: 28px;
          }
          .outcomes-subcopy {
            font-size: 0.95rem !important;
            line-height: 1.55 !important;
          }
        }

        .outcomes-headline {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          line-height: 1.14;
          margin-bottom: 16px;
        }

        .outcomes-subcopy {
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .outcomes-panels-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 992px) {
          .outcomes-panels-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .outcome-large-panel {
          padding: 36px 30px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
        }

        @media (max-width: 600px) {
          .outcome-large-panel {
            padding: 22px 18px;
          }
          .panel-top-row {
            margin-bottom: 16px !important;
          }
          .panel-main-heading {
            font-size: 1.25rem !important;
            margin-bottom: 12px !important;
          }
          .panel-description {
            font-size: 0.875rem !important;
            line-height: 1.55 !important;
            margin-bottom: 18px !important;
          }
          .panel-impact-list {
            padding-top: 16px !important;
          }
        }

        .outcome-large-panel:hover {
          transform: translateY(-4px);
          border-color: #cacace;
          box-shadow: var(--shadow-card);
        }

        .panel-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .panel-num-tag {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--brand-red);
        }

        .panel-main-heading {
          font-size: clamp(1.35rem, 1.9vw, 1.65rem);
          font-weight: 800;
          letter-spacing: var(--tracking-title);
          line-height: 1.22;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .panel-description {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .panel-impact-list {
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .impact-list-title {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .impact-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 0.8125rem;
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.45;
        }

        .impact-bullet {
          color: var(--brand-red);
          font-weight: 800;
          font-size: 1.1rem;
          line-height: 1;
        }
      `}</style>
    </section>
  );
};
