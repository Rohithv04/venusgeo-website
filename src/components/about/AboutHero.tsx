import React, { useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const AboutHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.about-hero-eyebrow', {
        opacity: 0,
        y: -12,
        duration: 0.6
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 24,
            duration: 0.85
          },
          '-=0.35'
        )
        .from(
          copyRef.current,
          {
            opacity: 0,
            y: 18,
            duration: 0.75
          },
          '-=0.45'
        )
        .from(
          badgesRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.65
          },
          '-=0.35'
        )
        .from(
          visualRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.9
          },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="about-hero-section" aria-label="About VenusGeo Hero">
      {/* Subtle background tech grid */}
      <div className="about-hero-grid-bg" aria-hidden="true" />

      <div className="container">
        <div className="about-hero-layout">
          {/* Left Column: Eyebrow, Large Headline, Story Copy, Heritage Strip */}
          <div className="about-hero-content">
            <div className="eyebrow about-hero-eyebrow">ABOUT VENUSGEO</div>

            <h1 ref={headlineRef} className="about-hero-headline">
              Built on experience.<br />
              <span className="text-red">Driven by what comes next.</span>
            </h1>

            <p ref={copyRef} className="about-hero-copy">
              VenusGeo has been helping enterprises navigate technology transformation since 2001.
              Our work combines deep research, disciplined engineering and an understanding of
              real-world business operations to create technology that remains relevant long after launch.
            </p>

            {/* Meta heritage statement pill */}
            <div className="about-hero-meta-pill">
              <span className="meta-dot" />
              <span>Founded in 2001 · Doral, Florida · Serving enterprises across industries</span>
            </div>

            {/* Key Stat Blocks Strip */}
            <div ref={badgesRef} className="about-hero-metrics">
              <div className="metric-box">
                <div className="metric-box-val">2001</div>
                <div className="metric-box-lbl">Founded</div>
              </div>
              <div className="metric-divider" />
              <div className="metric-box">
                <div className="metric-box-val text-red">25+</div>
                <div className="metric-box-lbl">Years Engineering</div>
              </div>
              <div className="metric-divider" />
              <div className="metric-box">
                <div className="metric-box-val">AI-First</div>
                <div className="metric-box-lbl">Architecture</div>
              </div>
              <div className="metric-divider" />
              <div className="metric-box">
                <div className="metric-box-val">100%</div>
                <div className="metric-box-lbl">Accountability</div>
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="about-hero-actions">
              <a href="#overview" className="btn btn-primary">
                Our Story <ArrowRight size={16} />
              </a>
              <a href="#pillars" className="btn btn-secondary">
                The 5 Principles
              </a>
            </div>
          </div>

          {/* Right Column: High-Precision Enterprise Topology Visual */}
          <div ref={visualRef} className="about-hero-visual-col">
            <div className="topology-card card-panel">
              <div className="topology-header">
                <div className="topology-status">
                  <span className="topology-indicator-dot" />
                  <span className="topology-code">SYSTEM PERSPECTIVE // ARCHITECTURE MATRIX</span>
                </div>
                <span className="topology-version-tag">EST. 2001</span>
              </div>

              {/* Orbital Interactive SVG Visual */}
              <div className="topology-svg-wrapper">
                <svg
                  viewBox="0 0 460 380"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="topology-svg"
                  aria-label="VenusGeo enterprise technology architecture diagram"
                >
                  <defs>
                    <radialGradient id="heroRedGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ed1b24" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#ed1b24" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ed1b24" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8c8c94" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Red Central Glow */}
                  <circle cx="230" cy="190" r="140" fill="url(#heroRedGlow)" />

                  {/* Concentric Coordinate Rings */}
                  <circle cx="230" cy="190" r="150" stroke="#e5e5ea" strokeWidth="1" strokeDasharray="3 4" />
                  <circle cx="230" cy="190" r="105" stroke="#e2e2e8" strokeWidth="1" />
                  <circle cx="230" cy="190" r="60" stroke="rgba(237, 27, 36, 0.25)" strokeWidth="1.2" />

                  {/* Connecting Vector Rays */}
                  <line x1="230" y1="40" x2="230" y2="340" stroke="#eeeff2" strokeWidth="1" />
                  <line x1="80" y1="190" x2="380" y2="190" stroke="#eeeff2" strokeWidth="1" />
                  <line x1="124" y1="84" x2="336" y2="296" stroke="#eeeff2" strokeWidth="1" strokeDasharray="2 4" />
                  <line x1="336" y1="84" x2="124" y2="296" stroke="#eeeff2" strokeWidth="1" strokeDasharray="2 4" />

                  {/* Dynamic Trajectory Vectors */}
                  <path d="M 110 115 Q 160 190 230 190" stroke="url(#heroLineGrad)" strokeWidth="1.8" />
                  <path d="M 350 115 Q 300 190 230 190" stroke="url(#heroLineGrad)" strokeWidth="1.8" />
                  <path d="M 230 190 Q 230 265 140 280" stroke="url(#heroLineGrad)" strokeWidth="1.8" />
                  <path d="M 230 190 Q 300 240 330 270" stroke="url(#heroLineGrad)" strokeWidth="1.8" />

                  {/* Center Node: VenusGeo Core */}
                  <circle cx="230" cy="190" r="28" fill="#141416" />
                  <circle cx="230" cy="190" r="24" fill="#ffffff" />
                  <circle cx="230" cy="190" r="9" fill="#ed1b24" />
                  <circle cx="230" cy="190" r="16" stroke="#ed1b24" strokeWidth="1.5" strokeDasharray="2 2" className="rotating-ring" />

                  {/* Outer Orbit Nodes */}
                  {/* Node 1: AI & Research */}
                  <g transform="translate(110, 115)">
                    <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="6" fill="#ed1b24" />
                    <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="#121214" letterSpacing="0.02em">
                      RESEARCH
                    </text>
                    <text x="0" y="44" textAnchor="middle" fontSize="9" fill="#8c8c94">
                      Initiation & AI
                    </text>
                  </g>

                  {/* Node 2: Sourcing & Ecosystem */}
                  <g transform="translate(350, 115)">
                    <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="6" fill="#141416" />
                    <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="#121214" letterSpacing="0.02em">
                      SOURCING
                    </text>
                    <text x="0" y="44" textAnchor="middle" fontSize="9" fill="#8c8c94">
                      Global Tech Stack
                    </text>
                  </g>

                  {/* Node 3: Quality & Reliability */}
                  <g transform="translate(140, 280)">
                    <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="6" fill="#141416" />
                    <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="#121214" letterSpacing="0.02em">
                      QUALITY
                    </text>
                    <text x="0" y="44" textAnchor="middle" fontSize="9" fill="#8c8c94">
                      Enterprise SLA
                    </text>
                  </g>

                  {/* Node 4: Guarantee & Accountability */}
                  <g transform="translate(330, 270)">
                    <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="6" fill="#ed1b24" />
                    <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="#121214" letterSpacing="0.02em">
                      GUARANTEE
                    </text>
                    <text x="0" y="44" textAnchor="middle" fontSize="9" fill="#8c8c94">
                      Operational Trust
                    </text>
                  </g>

                  {/* Node 5: Top Zenith Diversity */}
                  <g transform="translate(230, 48)">
                    <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#e2e2e8" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="5" fill="#ed1b24" />
                    <text x="0" y="-12" textAnchor="middle" fontSize="10" fontWeight="700" fill="#121214">
                      DIVERSITY OF THOUGHT
                    </text>
                  </g>
                </svg>
              </div>

              {/* Visual Card Bottom Info Bar */}
              <div className="topology-footer">
                <div className="topology-badge-item">
                  <ShieldCheck size={14} className="text-red" />
                  <span>Disciplined Engineering</span>
                </div>
                <div className="topology-badge-item">
                  <Cpu size={14} className="text-red" />
                  <span>Real-World Context</span>
                </div>
                <div className="topology-badge-item">
                  <Layers size={14} className="text-red" />
                  <span>Enduring Relevance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-hero-section {
          position: relative;
          padding-top: 56px;
          padding-bottom: 72px;
          background: linear-gradient(180deg, #ffffff 0%, var(--surface-soft) 100%);
          border-bottom: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .about-hero-section {
            padding-top: 36px;
            padding-bottom: 48px;
          }
        }

        .about-hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(18, 18, 20, 0.04) 1px, transparent 0);
          background-size: 28px 28px;
          pointer-events: none;
          opacity: 0.8;
        }

        .about-hero-layout {
          position: relative;
          display: grid;
          grid-template-columns: 1.18fr 0.95fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .about-hero-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        .about-hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .about-hero-eyebrow {
          margin-bottom: 16px;
        }

        .about-hero-headline {
          font-size: var(--font-hero);
          letter-spacing: var(--tracking-hero);
          line-height: 1.08;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .about-hero-copy {
          font-size: clamp(1.05rem, 1.35vw, 1.2rem);
          line-height: 1.62;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 620px;
        }

        @media (max-width: 600px) {
          .about-hero-copy {
            font-size: 0.95rem;
            line-height: 1.55;
            margin-bottom: 18px;
          }
        }

        .about-hero-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-secondary);
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        @media (max-width: 600px) {
          .about-hero-meta-pill {
            font-size: 0.75rem;
            padding: 6px 12px;
            margin-bottom: 20px;
            line-height: 1.4;
          }
        }

        .meta-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .about-hero-metrics {
          display: flex;
          align-items: center;
          gap: 20px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          padding: 16px 22px;
          border-radius: var(--panel-radius-sm);
          box-shadow: var(--shadow-subtle);
          margin-bottom: 28px;
          width: 100%;
          max-width: 580px;
        }

        @media (max-width: 600px) {
          .about-hero-metrics {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            padding: 14px 16px;
            margin-bottom: 24px;
          }
          .metric-divider {
            display: none;
          }
        }

        .metric-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .metric-box-val {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .metric-box-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }

        .metric-divider {
          width: 1px;
          height: 32px;
          background-color: var(--border-subtle);
        }

        .about-hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .about-hero-actions {
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }
          .about-hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Right Column Topology Visual */
        .about-hero-visual-col {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .topology-card {
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          padding: 20px;
          border-radius: var(--panel-radius);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          position: relative;
        }

        @media (max-width: 600px) {
          .topology-card {
            padding: 16px 14px;
          }
        }

        .topology-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 10px;
        }

        .topology-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .topology-indicator-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--brand-red);
          box-shadow: 0 0 8px rgba(237, 27, 36, 0.5);
          animation: pulseDot 2.4s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .topology-code {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        .topology-version-tag {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--brand-red);
          background-color: var(--brand-red-light);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .topology-svg-wrapper {
          width: 100%;
          position: relative;
        }

        .topology-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .rotating-ring {
          transform-origin: 230px 190px;
          animation: slowRotate 24s linear infinite;
        }

        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .topology-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          margin-top: 8px;
        }

        @media (max-width: 480px) {
          .topology-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }

        .topology-badge-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
};
