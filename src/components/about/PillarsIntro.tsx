import React, { useEffect, useRef } from 'react';
import { ArrowDown, Search, Cpu, CheckSquare, ShieldCheck, HeartHandshake } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const PillarsIntro: React.FC = () => {
  const introRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !introRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.pillar-preview-chip', {
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out'
      });
    }, introRef);

    return () => ctx.revert();
  }, []);

  const pillarsList = [
    { num: '01', title: 'Research & Initiation', icon: Search, id: 'pillar-01' },
    { num: '02', title: 'Sourcing', icon: Cpu, id: 'pillar-02' },
    { num: '03', title: 'Quality', icon: CheckSquare, id: 'pillar-03' },
    { num: '04', title: 'Guarantee', icon: ShieldCheck, id: 'pillar-04' },
    { num: '05', title: 'Diversity', icon: HeartHandshake, id: 'pillar-05' }
  ];

  return (
    <section id="pillars" ref={introRef} className="section pillars-intro-section" aria-label="Five Core Principles Introduction">
      <div className="container">
        <div className="pillars-intro-card card-panel-soft">
          <div className="pillars-intro-header">
            <div className="eyebrow">HOW WE WORK</div>
            <h2 className="pillars-intro-headline">
              Five principles behind how we build.
            </h2>
            <p className="pillars-intro-subtext">
              Our approach to enterprise technology is shaped by five principles that influence how we research
              opportunities, select technology, engineer products and stand behind what we deliver.
            </p>
          </div>

          {/* Interactive preview pills */}
          <div className="pillars-preview-row">
            {pillarsList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={`#${item.id}`}
                  className="pillar-preview-chip"
                >
                  <span className="chip-num">{item.num}</span>
                  <Icon size={16} className="chip-icon text-red" />
                  <span className="chip-name">{item.title}</span>
                </a>
              );
            })}
          </div>

          <div className="scroll-indicator-hint">
            <span>Explore each principle in depth below</span>
            <ArrowDown size={14} className="text-red bounce-anim" />
          </div>
        </div>
      </div>

      <style>{`
        .pillars-intro-section {
          padding-top: 40px;
          padding-bottom: 24px;
          background-color: var(--surface-white);
        }

        .pillars-intro-card {
          padding: 48px;
          border-radius: var(--panel-radius);
          background: linear-gradient(180deg, var(--surface-soft) 0%, #ffffff 100%);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        @media (max-width: 768px) {
          .pillars-intro-card {
            padding: 32px 20px;
          }
        }

        @media (max-width: 600px) {
          .pillars-intro-card {
            padding: 24px 16px;
          }
          .pillars-intro-subtext {
            font-size: 0.9375rem !important;
            line-height: 1.55 !important;
          }
          .pillars-preview-row {
            gap: 8px;
            margin-bottom: 20px;
          }
          .pillar-preview-chip {
            padding: 8px 12px !important;
            font-size: 0.8125rem !important;
          }
        }

        .pillars-intro-header {
          max-width: 680px;
          margin-bottom: 32px;
        }

        .pillars-intro-headline {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .pillars-intro-subtext {
          font-size: clamp(1rem, 1.25vw, 1.125rem);
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .pillars-preview-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
          width: 100%;
          max-width: 920px;
        }

        .pillar-preview-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          padding: 10px 16px;
          border-radius: 24px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
        }

        .pillar-preview-chip:hover {
          transform: translateY(-2px);
          border-color: var(--brand-red);
          box-shadow: 0 4px 12px rgba(237, 27, 36, 0.1);
          color: var(--brand-red);
        }

        .chip-num {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
          letter-spacing: 0.04em;
        }

        .chip-icon {
          flex-shrink: 0;
        }

        .chip-name {
          letter-spacing: -0.01em;
        }

        .scroll-indicator-hint {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 8px;
        }

        .bounce-anim {
          animation: subtleBounce 2s infinite ease-in-out;
        }

        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
};
