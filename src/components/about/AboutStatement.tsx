import React, { useEffect, useRef } from 'react';
import { Layers, Network, CheckCircle2 } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const AboutStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.statement-highlight-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-statement-section" aria-label="Brand Philosophy Statement">
      <div className="container">
        <div className="statement-inner-box">
          <div className="statement-eyebrow-tag">
            <span className="statement-dot" />
            <span>CORE SYNTHESIS</span>
          </div>

          <h2 className="statement-highlight-text">
            Technology works best<br />
            <span className="text-red">when everything works together.</span>
          </h2>

          <p className="statement-supporting-copy">
            VenusGeo specializes in helping technology stacks work seamlessly across complex enterprise environments, disparate hardware, and critical operational sectors.
          </p>

          <div className="statement-pillars-accent">
            <div className="accent-pill">
              <Layers size={14} className="text-red" />
              <span>Modular Architecture</span>
            </div>
            <div className="accent-pill">
              <Network size={14} className="text-red" />
              <span>Interoperable Systems</span>
            </div>
            <div className="accent-pill">
              <CheckCircle2 size={14} className="text-red" />
              <span>Mission-Critical Continuity</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-statement-section {
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding-top: 92px;
          padding-bottom: 92px;
          text-align: center;
          position: relative;
        }

        @media (max-width: 768px) {
          .about-statement-section {
            padding-top: 48px;
            padding-bottom: 48px;
          }
        }

        .statement-inner-box {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .statement-eyebrow-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--brand-red);
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 24px;
        }

        @media (max-width: 600px) {
          .statement-eyebrow-tag {
            margin-bottom: 16px;
          }
        }

        .statement-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .statement-highlight-text {
          font-size: clamp(2rem, 3.8vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.14;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        @media (max-width: 600px) {
          .statement-highlight-text {
            font-size: clamp(1.5rem, 5vw, 2.1rem);
            margin-bottom: 16px;
          }
        }

        .statement-supporting-copy {
          font-size: clamp(1.05rem, 1.35vw, 1.25rem);
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 32px;
          max-width: 680px;
        }

        @media (max-width: 600px) {
          .statement-supporting-copy {
            font-size: 0.95rem;
            line-height: 1.55;
            margin-bottom: 24px;
          }
        }

        .statement-pillars-accent {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .statement-pillars-accent {
            gap: 8px;
          }
          .accent-pill {
            font-size: 0.75rem !important;
            padding: 6px 12px !important;
          }
        }

        .accent-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          padding: 8px 16px;
          border-radius: 20px;
        }
      `}</style>
    </section>
  );
};
