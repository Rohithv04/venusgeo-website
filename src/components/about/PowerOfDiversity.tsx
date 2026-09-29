import React, { useEffect, useRef } from 'react';
import { Compass, Users2, Lightbulb, Target } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const PowerOfDiversity: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Gentle horizontal scroll of the background typography
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      // Stagger animate the 4 principles
      gsap.from('.diversity-principle-card', {
        scrollTrigger: {
          trigger: '.principles-row-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      icon: Users2,
      input: 'Different experiences',
      arrow: '→',
      outcome: 'Reveal different opportunities',
      sub: 'Diverse backgrounds surface unexplored market needs and user constraints.'
    },
    {
      icon: Compass,
      input: 'Different perspectives',
      arrow: '→',
      outcome: 'Challenge assumptions',
      sub: 'Rigorous cognitive counterweights prevent architectural groupthink.'
    },
    {
      icon: Lightbulb,
      input: 'Different disciplines',
      arrow: '→',
      outcome: 'Improve problem solving',
      sub: 'AI researchers, domain engineers, and UX architects converge on durable solutions.'
    },
    {
      icon: Target,
      input: 'Shared purpose',
      arrow: '→',
      outcome: 'Turns ideas into outcomes',
      sub: 'United focus translates multifaceted viewpoints into robust enterprise software.'
    }
  ];

  return (
    <section ref={sectionRef} className="section power-of-diversity-section" aria-label="Our Power of Diversity">
      {/* Background Soft Floating Typography */}
      <div className="diversity-marquee-container" aria-hidden="true">
        <div ref={marqueeRef} className="diversity-marquee-track">
          PERSPECTIVE • EXPERIENCE • CURIOSITY • COLLABORATION • INNOVATION • PERSPECTIVE • EXPERIENCE • CURIOSITY • COLLABORATION • INNOVATION
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="diversity-header">
          <div className="eyebrow">OUR POWER OF DIVERSITY</div>
          <h2 className="diversity-main-headline">
            Different perspectives.<br />
            <span className="text-red">One shared direction.</span>
          </h2>
          <p className="diversity-main-copy">
            We believe enterprise technology reaches its highest reliability and ingenuity when built by teams that reflect the wide world they serve.
          </p>
        </div>

        {/* 4 Interactive Principles */}
        <div className="principles-row-grid">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="diversity-principle-card card-panel">
                <div className="card-top-icon-bar">
                  <span className="icon-red-outline">
                    <Icon size={18} />
                  </span>
                  <span className="principle-seq">0{i + 1}</span>
                </div>

                <div className="principle-flow">
                  <div className="principle-input">{p.input}</div>
                  <div className="principle-arrow text-red">{p.arrow}</div>
                  <div className="principle-outcome">{p.outcome}</div>
                </div>

                <p className="principle-subtext">{p.sub}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .power-of-diversity-section {
          position: relative;
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          overflow: hidden;
          padding-top: 80px;
          padding-bottom: 84px;
        }

        @media (max-width: 768px) {
          .power-of-diversity-section {
            padding-top: 48px;
            padding-bottom: 48px;
          }
        }

        .diversity-marquee-container {
          position: absolute;
          top: 36px;
          left: 0;
          right: 0;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0.045;
          user-select: none;
          z-index: 1;
        }

        .diversity-marquee-track {
          font-size: clamp(3.5rem, 8vw, 6.5rem);
          font-weight: 900;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          line-height: 1;
          display: inline-block;
          will-change: transform;
        }

        .diversity-header {
          max-width: 660px;
          margin-bottom: 48px;
        }

        @media (max-width: 600px) {
          .diversity-header {
            margin-bottom: 28px;
          }
          .diversity-main-copy {
            font-size: 0.95rem !important;
            line-height: 1.55 !important;
          }
        }

        .diversity-main-headline {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          line-height: 1.14;
          margin-bottom: 16px;
        }

        .diversity-main-copy {
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .principles-row-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .principles-row-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .principles-row-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .diversity-principle-card {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
        }

        @media (max-width: 600px) {
          .diversity-principle-card {
            padding: 20px 16px;
          }
          .principle-outcome {
            font-size: 1rem !important;
          }
        }

        .diversity-principle-card:hover {
          transform: translateY(-4px);
          border-color: #d1d1d8;
          box-shadow: var(--shadow-card);
        }

        .card-top-icon-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .principle-seq {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .principle-flow {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .principle-input {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .principle-arrow {
          font-size: 1.125rem;
          font-weight: 800;
          line-height: 1;
        }

        .principle-outcome {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: var(--tracking-subheading);
          color: var(--text-primary);
          line-height: 1.25;
        }

        .principle-subtext {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </section>
  );
};
