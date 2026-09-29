import React, { useEffect, useRef } from 'react';
import { Layers, ShieldCheck, Terminal, Check } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const WhyVenusGeoAI: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  const principles = [
    {
      num: '01',
      title: 'WE UNDERSTAND COMPLEX SYSTEMS',
      statement: 'AI has to connect to your data, applications and people, not sit beside them.',
      body:
        'A disconnected model is just an isolated demo. Real utility emerges when models interface with distributed databases, comply with enterprise IAM, observe rate limits, and orchestrate across existing business workflows.',
      icon: Layers,
      highlight: 'Deep integration over surface-level chatbots.'
    },
    {
      num: '02',
      title: 'WE PROTECT WHAT YOU’VE BUILT',
      statement: 'We add intelligence without discarding your technology investments.',
      body:
        'You do not need to abandon stable backends, proven database schemas, or established operational rules. We engineer non-invasive AI service layers that empower your core systems while safeguarding business stability.',
      icon: ShieldCheck,
      highlight: 'Incremental intelligence without high-risk platform rewrites.'
    },
    {
      num: '03',
      title: 'WE USE AI OURSELVES',
      statement: 'The way we engineer software has changed, and we practice what we advise.',
      body:
        'We do not treat AI as a speculative research experiment. Our daily engineering pipelines run on AI-assisted spec generation, continuous validation, automated unit coverage, and brownfield code analysis.',
      icon: Terminal,
      highlight: 'Real-world practitioner discipline in every client engagement.'
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate principles on scroll
      gsap.from('.principle-card', {
        scrollTrigger: {
          trigger: principlesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 24,
        stagger: 0.18,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section why-venusgeo-section" aria-label="Why VenusGeo AI Engineering">
      <div className="container">
        <div className="why-layout-grid">
          {/* Left Column: Sticky Editorial Heading & Heritage Statement */}
          <div className="why-sticky-col">
            <div className="sticky-content-wrap">
              <div className="eyebrow">WHY VENUSGEO</div>

              <h2 className="why-headline">
                AI is easier to start<br />
                than to make work.<br />
                <span className="text-red">We’ve spent 20 years on the second part.</span>
              </h2>

              <p className="why-lead-copy">
                Enterprise applications, legacy platforms, integrations, data and business workflows:
                this is the ground we’ve worked for two decades. It’s where AI succeeds or fails, and we
                know it well.
              </p>

              <div className="why-proven-box">
                <div className="proven-stat-row">
                  <span className="proven-stat-num">2001</span>
                  <div className="proven-stat-desc">
                    <strong>Enterprise Rooted</strong>
                    <span>Deploying production software for 25+ years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Three Scrolling Principles */}
          <div ref={principlesRef} className="why-principles-col">
            {principles.map((pr) => {
              const Icon = pr.icon;
              return (
                <div key={pr.num} className="principle-card card-panel">
                  <div className="principle-card-inner">
                    {/* Header bar with number and active red indicator */}
                    <div className="principle-top-row">
                      <div className="principle-num-badge">
                        <span className="principle-num">{pr.num}</span>
                        <div className="principle-indicator-line" />
                      </div>
                      <div className="icon-red-outline">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="principle-title">{pr.title}</h3>
                    <p className="principle-statement">&ldquo;{pr.statement}&rdquo;</p>
                    <p className="principle-body">{pr.body}</p>

                    <div className="principle-highlight-tag">
                      <Check size={14} className="text-red" />
                      <span>{pr.highlight}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .why-venusgeo-section {
          background-color: var(--surface-white);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .why-layout-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .why-sticky-col {
          position: sticky;
          top: 100px;
        }

        .sticky-content-wrap {
          display: flex;
          flex-direction: column;
        }

        .why-headline {
          font-size: var(--font-section-heading);
          line-height: 1.14;
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          margin-bottom: 24px;
        }

        .why-lead-copy {
          font-size: 1.0625rem;
          line-height: 1.68;
          color: var(--text-secondary);
          margin-bottom: 32px;
          max-width: 520px;
        }

        .why-proven-box {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: var(--panel-radius-sm);
          padding: 16px 20px;
          max-width: 420px;
        }

        .proven-stat-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .proven-stat-num {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--brand-red);
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .proven-stat-desc {
          display: flex;
          flex-direction: column;
          font-size: 0.8125rem;
          line-height: 1.4;
          color: var(--text-secondary);
        }

        .proven-stat-desc strong {
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        /* Right Column Principles */
        .why-principles-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .principle-card {
          padding: 32px;
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
          border: 1px solid var(--border-card);
        }

        .principle-card:hover {
          border-color: #cfcfd6;
          transform: translateY(-2px);
          box-shadow: var(--shadow-card);
        }

        .principle-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .principle-num-badge {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .principle-num {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--brand-red);
          letter-spacing: 0.04em;
        }

        .principle-indicator-line {
          width: 36px;
          height: 2px;
          background-color: var(--brand-red);
        }

        .principle-title {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .principle-statement {
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--brand-red);
          line-height: 1.45;
          margin-bottom: 12px;
        }

        .principle-body {
          font-size: 0.9375rem;
          line-height: 1.62;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .principle-highlight-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 6px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (max-width: 992px) {
          .why-layout-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .why-sticky-col {
            position: static;
          }
          .why-lead-copy {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .principle-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
};
