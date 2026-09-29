import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const HumanAccountability: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const equationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: equationRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.from('.eq-term-1', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out'
      })
        .from(
          '.eq-plus-1',
          {
            opacity: 0,
            scale: 0.6,
            duration: 0.4,
            ease: 'back.out(2)'
          },
          '-=0.2'
        )
        .from(
          '.eq-term-2',
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: 'power3.out'
          },
          '-=0.2'
        )
        .from(
          '.eq-plus-2',
          {
            opacity: 0,
            scale: 0.6,
            duration: 0.4,
            ease: 'back.out(2)'
          },
          '-=0.2'
        )
        .from(
          '.eq-term-3',
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: 'power3.out'
          },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section human-accountability-section" aria-label="Human Accountability in AI Engineering">
      <div className="container">
        <div className="accountability-content">
          <div className="eyebrow">GOVERNANCE &amp; DISCIPLINE</div>

          <h2 className="accountability-headline">
            AI moves fast.<br />
            <span className="text-red">Humans stay accountable.</span>
          </h2>

          <p className="accountability-lead">
            AI accelerates analysis, generation, testing, transformation and automation. People
            remain responsible for architecture, business decisions, security, quality and
            production approval.
          </p>

          {/* Large Typographic Equation */}
          <div ref={equationRef} className="equation-container">
            <div className="eq-term eq-term-1 card-panel">
              <span className="eq-sub">VELOCITY</span>
              <div className="eq-main">AI SPEED</div>
              <p className="eq-note">Rapid ingestion, synthesis, draft code &amp; test coverage</p>
            </div>

            <div className="eq-plus eq-plus-1">+</div>

            <div className="eq-term eq-term-2 card-panel">
              <span className="eq-sub text-red">GOVERNANCE</span>
              <div className="eq-main text-red">HUMAN JUDGMENT</div>
              <p className="eq-note">Architecture boundaries, intent validation &amp; compliance</p>
            </div>

            <div className="eq-plus eq-plus-2">+</div>

            <div className="eq-term eq-term-3 card-panel">
              <span className="eq-sub">FOUNDATION</span>
              <div className="eq-main">ENGINEERING DISCIPLINE</div>
              <p className="eq-note">Resilient telemetry, contract testing &amp; zero-trust security</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .human-accountability-section {
          background-color: var(--surface-white);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
          text-align: center;
        }

        .accountability-content {
          max-width: 980px;
          margin: 0 auto;
        }

        .accountability-headline {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 24px;
        }

        .accountability-lead {
          font-size: 1.125rem;
          line-height: 1.68;
          color: var(--text-secondary);
          max-width: 680px;
          margin: 0 auto 56px auto;
        }

        /* Large Equation Styling */
        .equation-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .eq-term {
          flex: 1;
          padding: 36px 24px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          text-align: center;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }

        .eq-term:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-card);
        }

        .eq-sub {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-muted);
          margin-bottom: 10px;
          display: block;
        }

        .eq-main {
          font-size: clamp(1.25rem, 2vw, 1.65rem);
          font-weight: 800;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.15;
          margin-bottom: 12px;
        }

        .eq-note {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .eq-plus {
          font-size: 2rem;
          font-weight: 700;
          color: var(--brand-red);
          flex-shrink: 0;
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .accountability-lead {
            font-size: 0.95rem;
            line-height: 1.55;
            margin-bottom: 32px;
          }
          .equation-container {
            flex-direction: column;
            gap: 10px;
          }
          .eq-term {
            width: 100%;
            padding: 20px 16px;
          }
          .eq-main {
            font-size: 1.2rem;
            margin-bottom: 8px;
          }
          .eq-note {
            font-size: 0.8125rem;
          }
          .eq-plus {
            height: 24px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};
