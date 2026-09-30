import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const AboutOverview: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate overview cards on scroll
      gsap.from('.overview-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Animate progress line connector
      if (trackRef.current) {
        gsap.fromTo(
          '.overview-progress-line',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 1
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="overview" ref={sectionRef} className="section about-overview-section" aria-label="Company Overview and Heritage">
      <div className="container">
        {/* Section Header */}
        <div className="overview-header-row">
          <div className="overview-header-content">
            <div className="eyebrow">COMPANY OVERVIEW</div>
            <h2 className="overview-title">
              Engineering with purpose,<br />
              <span className="text-red">tested by two decades of scale.</span>
            </h2>
          </div>
          <div className="overview-statement-badge">
            <Sparkles size={16} className="text-red" />
            <span>Heritage & Forward Momentum</span>
          </div>
        </div>

        {/* Large Typographic Moment: 2001 -> TODAY */}
        <div ref={trackRef} className="heritage-connector-container card-panel">
          <div className="heritage-milestone-block start-milestone">
            <div className="milestone-year-text">2001</div>
            <div className="milestone-sub">Where the journey began</div>
            <p className="milestone-desc">
              Founded in Doral, Florida to architect high-reliability business systems and enterprise software that perform under demand.
            </p>
          </div>

          <div className="heritage-line-wrap">
            <div className="heritage-line-bg">
              <div className="overview-progress-line" />
            </div>
            <div className="heritage-badge-center">
              <span className="heritage-span-tag">25+ Years of Continuous Innovation</span>
            </div>
          </div>

          <div className="heritage-milestone-block end-milestone">
            <div className="milestone-year-text text-red">TODAY</div>
            <div className="milestone-sub">Building AI-first enterprise technology</div>
            <p className="milestone-desc">
              Harnessing agentic intelligence, zero-knowledge biometric validation, and distributed mobility to power tomorrow's enterprises.
            </p>
          </div>
        </div>

        {/* Narrative & 3 Focus Columns */}
        <div className="overview-narrative-grid">
          {/* Main Story Panel */}
          <div className="narrative-main-panel card-panel-soft">
            <h3 className="narrative-heading">
              Technology must respond to the realities of the business using it.
            </h3>
            <p className="narrative-body">
              VenusGeo was founded in 2001 and has spent more than two decades helping enterprises adopt and evolve digital technology.
              Our approach has always been grounded in a simple principle: technology must respond to the realities of the business using it.
            </p>
            <p className="narrative-body">
              Market research, operational context, customer behavior and long-term technology relevance shape how we design and deliver solutions.
              This approach enables organizations to innovate without losing sight of reliability, scalability or commercial outcomes.
            </p>

            <div className="narrative-keypoints">
              <div className="keypoint-item">
                <CheckCircle2 size={18} className="text-red" />
                <span>Market research & operational context lead every architectural decision.</span>
              </div>
              <div className="keypoint-item">
                <CheckCircle2 size={18} className="text-red" />
                <span>Decades of real-world implementation experience applied to modern AI stacks.</span>
              </div>
              <div className="keypoint-item">
                <CheckCircle2 size={18} className="text-red" />
                <span>Zero compromise on security, compliance, or mission-critical uptime.</span>
              </div>
            </div>
          </div>

          {/* 3 Value Dimensions (Cards) */}
          <div className="overview-dimensions-stack">
            <div className="overview-card dimension-card card-panel">
              <div className="dimension-top">
                <span className="dimension-num">01</span>
                <span className="dimension-tag">Discipline</span>
              </div>
              <h4 className="dimension-title">Research-Driven Engineering</h4>
              <p className="dimension-desc">
                We test assumptions before writing production code, evaluating technology against lasting business value and competitive relevance.
              </p>
            </div>

            <div className="overview-card dimension-card card-panel">
              <div className="dimension-top">
                <span className="dimension-num">02</span>
                <span className="dimension-tag">Interoperability</span>
              </div>
              <h4 className="dimension-title">Ecosystem Integration</h4>
              <p className="dimension-desc">
                Enterprise technology rarely lives in a silo. We build systems that interoperate cleanly with existing enterprise workflows, legacy backends, and cloud networks.
              </p>
            </div>

            <div className="overview-card dimension-card card-panel">
              <div className="dimension-top">
                <span className="dimension-num">03</span>
                <span className="dimension-tag">Accountability</span>
              </div>
              <h4 className="dimension-title">Lifetime Partnership</h4>
              <p className="dimension-desc">
                Our responsibility doesn't end at deployment. We stand alongside our clients throughout the product lifecycle to safeguard performance and operational continuity.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-overview-section {
          background-color: var(--surface-white);
        }

        .overview-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .overview-header-row {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 28px;
            gap: 16px;
          }
          .overview-statement-badge {
            font-size: 0.75rem;
            padding: 6px 12px;
            white-space: normal;
          }
        }

        .overview-title {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          line-height: 1.14;
        }

        .overview-statement-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          padding: 8px 16px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .about-overview-section {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        /* Heritage Connector: 2001 -> TODAY */
        .heritage-connector-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 24px;
          align-items: center;
          padding: 32px 36px;
          margin-bottom: 48px;
          background: linear-gradient(135deg, #ffffff 0%, var(--surface-soft) 100%);
          border: 1px solid var(--border-card);
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 860px) {
          .heritage-connector-container {
            grid-template-columns: minmax(0, 1fr);
            padding: 20px 14px;
            gap: 16px;
            margin-bottom: 32px;
            width: 100%;
            overflow: hidden;
          }
          .heritage-line-wrap {
            margin: 8px 0;
            padding: 0;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }
          .heritage-line-bg {
            width: 100% !important;
            max-width: 100%;
            margin-bottom: 8px;
          }
          .heritage-span-tag {
            white-space: normal;
            text-align: center;
            line-height: 1.35;
            display: inline-block;
            max-width: 100%;
            box-sizing: border-box;
          }
          .milestone-desc {
            max-width: 100% !important;
          }
        }

        .heritage-milestone-block {
          display: flex;
          flex-direction: column;
        }

        .milestone-year-text {
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .milestone-sub {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .milestone-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
          max-width: 320px;
        }

        .heritage-line-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 16px;
        }

        .heritage-line-bg {
          width: 160px;
          height: 2px;
          background-color: var(--border-subtle);
          position: relative;
          margin-bottom: 12px;
        }

        .overview-progress-line {
          position: absolute;
          inset: 0;
          background-color: var(--brand-red);
          transform-origin: left center;
        }

        .heritage-badge-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heritage-span-tag {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--brand-red);
          background-color: var(--brand-red-light);
          padding: 4px 10px;
          border-radius: 12px;
          white-space: nowrap;
        }

        /* Narrative Grid */
        .overview-narrative-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 28px;
        }

        @media (max-width: 992px) {
          .overview-narrative-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .narrative-main-panel {
          padding: 36px;
          border-radius: var(--panel-radius);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 600px) {
          .narrative-main-panel {
            padding: 20px 16px;
          }
          .narrative-heading {
            font-size: 1.2rem !important;
            margin-bottom: 14px !important;
          }
          .narrative-body {
            font-size: 0.875rem !important;
            line-height: 1.55 !important;
          }
          .keypoint-item {
            font-size: 0.8125rem !important;
          }
          .dimension-card {
            padding: 18px 16px !important;
          }
          .dimension-title {
            font-size: 0.95rem !important;
          }
          .dimension-desc {
            font-size: 0.8125rem !important;
            line-height: 1.5 !important;
          }
        }

        .narrative-heading {
          font-size: clamp(1.25rem, 1.8vw, 1.55rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: var(--tracking-title);
          margin-bottom: 18px;
          color: var(--text-primary);
        }

        .narrative-body {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .narrative-keypoints {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 12px;
          padding-top: 18px;
          border-top: 1px solid var(--border-subtle);
        }

        .keypoint-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.45;
        }

        .overview-dimensions-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .dimension-card {
          padding: 22px 24px;
          transition: transform var(--transition-normal), border-color var(--transition-normal);
        }

        .dimension-card:hover {
          transform: translateY(-2px);
          border-color: #cacace;
        }

        .dimension-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .dimension-num {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--brand-red);
        }

        .dimension-tag {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .dimension-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
          letter-spacing: var(--tracking-subheading);
        }

        .dimension-desc {
          font-size: 0.84375rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </section>
  );
};
