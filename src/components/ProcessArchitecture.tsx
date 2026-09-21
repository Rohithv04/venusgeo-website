import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Box, Clock, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../utils/animations';

export const ProcessArchitecture: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const metricExpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Ensure 25+ Years of Experience in metrics strip renders crisply
      if (metricExpRef.current) {
        metricExpRef.current.textContent = '25+';
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stages = [
    {
      num: '01',
      title: 'Ingestion & Privacy Perimeter',
      desc: 'Local-first data capture, zero-knowledge biometric hashing, and document boundary detection without storing raw sensitive identifiers.',
      img: '/assets/products/document-ai.jpg'
    },
    {
      num: '02',
      title: 'Intelligent Orchestration',
      desc: 'Domain-specific neural pipelines, tabular extraction, offline POS reconciliation, and low-latency maritime satellite sync.',
      img: '/assets/brand/hero-interface.jpg'
    },
    {
      num: '03',
      title: 'Enterprise Edge Dispatch',
      desc: 'Seamless delivery to ERPs, handheld devices, check-in kiosks, and onboard crew systems with full audit logging.',
      img: '/assets/products/postmate.jpg'
    }
  ];

  return (
    <section ref={sectionRef} className="section architecture-section" aria-label="Enterprise Architecture & Process">
      <div className="container">
        {/* Section Heading */}
        <div className="architecture-header">
          <div className="eyebrow">Production Architecture</div>
          <h2 className="section-heading">
            Comprehensive AI &<br />
            Enterprise Engineering
          </h2>
        </div>

        {/* Split Box: 3-Panel Sequential Stages (Left) + End-to-End Process Card with Red Radial Glow (Right) */}
        <div className="architecture-split-grid">
          {/* Left: 3-Panel Sequential Tabs with Visuals */}
          <div className="stages-visual-panel card-panel">
            <div className="stage-selectors-bar">
              {stages.map((stage, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`stage-tab-btn ${activeStage === idx ? 'active' : ''}`}
                  onClick={() => setActiveStage(idx)}
                >
                  <span className="stage-num">{stage.num}</span>
                  <span className="stage-tab-title">{stage.title}</span>
                </button>
              ))}
            </div>

            <div className="stage-display-media">
              <img
                src={stages[activeStage].img}
                alt={stages[activeStage].title}
                className="stage-img"
                loading="eager"
              />
              <div className="stage-media-caption">
                <span className="caption-badge">Stage {stages[activeStage].num}</span>
                <p className="caption-desc">{stages[activeStage].desc}</p>
              </div>
            </div>
          </div>

          {/* Right: End-to-End Process Card with Timeline and Red Radial Glow */}
          <div className="process-timeline-card card-panel">
            <div className="timeline-card-content">
              <h3 className="process-card-title">End-to-End Process</h3>

              <div className="timeline-stepper">
                <div className="step-item">
                  <div className="step-node-col">
                    <span className="step-node active" />
                    <span className="step-line" />
                  </div>
                  <div className="step-info">
                    <h4 className="step-title">Ingestion, inspection & parsing</h4>
                    <p className="step-desc">High-throughput intake across multi-channel inputs and documents.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-node-col">
                    <span className="step-node active" />
                    <span className="step-line" />
                  </div>
                  <div className="step-info">
                    <h4 className="step-title">Zero-knowledge extraction & privacy</h4>
                    <p className="step-desc">Model inference without persisting raw biometric signatures.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-node-col">
                    <span className="step-node active" />
                    <span className="step-line" />
                  </div>
                  <div className="step-info">
                    <h4 className="step-title">Policy validation & audit logging</h4>
                    <p className="step-desc">Compliance verification against enterprise security boundaries.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-node-col">
                    <span className="step-node final" />
                  </div>
                  <div className="step-info">
                    <h4 className="step-title">Delivery to your workflows</h4>
                    <p className="step-desc">Instant synchronization with downstream applications and edge fleets.</p>
                  </div>
                </div>
              </div>

              {/* Red Glow Accent & Circular Action Button in Bottom Corner */}
              <div className="card-red-glow" aria-hidden="true" />

              <div className="process-action-corner">
                <Link
                  to="/enterprise-mobility/"
                  className="circular-red-btn"
                  aria-label="Explore Enterprise Mobility"
                >
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Bottom Metrics Strip */}
        <div className="metrics-strip-card card-panel">
          <div className="metric-col">
            <div className="metric-icon-wrap">
              <Box size={22} className="text-red" />
            </div>
            <div className="metric-text-block">
              <div className="metric-number">99.8%</div>
              <div className="metric-caption">Extraction accuracy</div>
            </div>
          </div>

          <div className="metric-col">
            <div className="metric-icon-wrap">
              <Clock size={22} className="text-red" />
            </div>
            <div className="metric-text-block">
              <div className="metric-number">24/7</div>
              <div className="metric-caption">Support and control</div>
            </div>
          </div>

          <div className="metric-col">
            <div className="metric-icon-wrap">
              <Globe size={22} className="text-red" />
            </div>
            <div className="metric-text-block">
              <div className="metric-number">500+</div>
              <div className="metric-caption">Functional modules</div>
            </div>
          </div>

          <div className="metric-col">
            <div className="metric-icon-wrap">
              <Users size={22} className="text-red" />
            </div>
            <div className="metric-text-block">
              <div ref={metricExpRef} className="metric-number">25+</div>
              <div className="metric-caption">Years of experience</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .architecture-section {
          background-color: var(--surface-white);
        }

        .architecture-header {
          max-width: 640px;
          margin-bottom: 40px;
        }

        .section-heading {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          line-height: 1.12;
        }

        .architecture-split-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (max-width: 992px) {
          .architecture-split-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Left: 3-Panel Sequential Display */
        .stages-visual-panel {
          overflow: hidden;
          background-color: var(--surface-white);
          display: flex;
          flex-direction: column;
        }

        .stage-selectors-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid var(--border-subtle);
          background-color: var(--surface-soft);
        }

        .stage-tab-btn {
          padding: 14px 12px;
          background: none;
          border: none;
          border-right: 1px solid var(--border-subtle);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: background-color var(--transition-quick);
        }

        .stage-tab-btn:last-child {
          border-right: none;
        }

        .stage-tab-btn.active {
          background-color: var(--surface-white);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .stage-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-red);
          background-color: rgba(237, 27, 36, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .stage-tab-title {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          text-align: center;
          line-height: 1.25;
        }

        .stage-display-media {
          position: relative;
          height: 320px;
          background-color: var(--surface-charcoal);
          overflow: hidden;
        }

        .stage-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 240ms ease;
        }

        .stage-media-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(18, 18, 20, 0.92) 0%, rgba(18, 18, 20, 0.4) 75%, transparent 100%);
          padding: 24px 20px 16px 20px;
          color: #ffffff;
        }

        .caption-badge {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--brand-red);
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          margin-bottom: 4px;
        }

        .caption-desc {
          font-size: 0.8125rem;
          color: #e4e4e7;
          line-height: 1.45;
        }

        /* Right: End-to-End Process Card */
        .process-timeline-card {
          position: relative;
          background-color: var(--surface-white);
          padding: 36px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .process-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 28px;
        }

        .timeline-stepper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .step-item {
          display: flex;
          gap: 16px;
        }

        .step-node-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 16px;
          flex-shrink: 0;
        }

        .step-node {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--brand-red);
          background-color: var(--surface-white);
          margin-top: 4px;
        }

        .step-node.final {
          background-color: var(--brand-red);
        }

        .step-line {
          width: 1px;
          flex-grow: 1;
          background-color: var(--border-subtle);
          margin: 4px 0;
          min-height: 28px;
        }

        .step-info {
          flex-grow: 1;
        }

        .step-title {
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 2px;
          line-height: 1.3;
        }

        .step-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        /* Soft Red Ambient Radial Glow */
        .card-red-glow {
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(237, 27, 36, 0.28) 0%, rgba(237, 27, 36, 0.08) 50%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .process-action-corner {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .circular-red-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--brand-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(237, 27, 36, 0.35);
          transition: transform var(--transition-quick), background-color var(--transition-quick);
        }

        .circular-red-btn:hover {
          background-color: var(--action-red);
          transform: scale(1.06);
        }

        /* 4-Column Bottom Metrics Strip */
        .metrics-strip-card {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 24px 32px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
        }

        @media (max-width: 860px) {
          .metrics-strip-card {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .metrics-strip-card {
            grid-template-columns: 1fr;
          }
        }

        .metric-col {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .metric-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-number {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.035em;
        }

        .metric-caption {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
          letter-spacing: var(--tracking-pill);
        }
      `}</style>
    </section>
  );
};
