import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Layers, Award } from 'lucide-react';

export const EnterpriseMobilityBanner: React.FC = () => {
  return (
    <section className="section mobility-banner-section" aria-label="Enterprise Mobility Spotlight">
      <div className="container">
        <div className="mobility-editorial-card card-panel">
          <div className="mobility-editorial-grid">
            {/* Left Content */}
            <div className="mobility-editorial-content">
              <div className="eyebrow">Modernization & Mobility</div>

              <h2 className="mobility-editorial-title">Enterprise Mobility</h2>

              <p className="mobility-editorial-copy">
                Explore our mobile application expertise and enterprise delivery experience.
              </p>

              <div className="mobility-spec-highlights">
                <div className="spec-row">
                  <div className="icon-red-outline">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="spec-row-title">Legacy App Modernization & Migration</div>
                    <div className="spec-row-desc">Transitioning monolithic and legacy systems to hybrid digital ecosystems.</div>
                  </div>
                </div>

                <div className="spec-row">
                  <div className="icon-red-outline">
                    <Layers size={18} />
                  </div>
                  <div>
                    <div className="spec-row-title">Xamarin, MAUI & Connected IoT Fleets</div>
                    <div className="spec-row-desc">Active in 25+ cruise ships, port terminals, and distributed enterprise teams.</div>
                  </div>
                </div>
              </div>

              <div className="mobility-editorial-action">
                <Link
                  to="/enterprise-mobility/"
                  className="btn btn-primary mobility-cta-btn"
                >
                  <span>Explore Enterprise Mobility</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Media: Authentic Mobile App Imagery */}
            <div className="mobility-editorial-media">
              <div className="media-container-frame">
                <img
                  src="/assets/mobility/enterprise-mobility.png"
                  alt="VenusGeo Enterprise Mobility applications and connected fleet systems"
                  className="editorial-img"
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <div className="media-corner-badge">
                  <Award size={14} className="text-red" />
                  <span>25+ Apps Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mobility-banner-section {
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .mobility-editorial-card {
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-subtle);
          overflow: hidden;
        }

        .mobility-editorial-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 36px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .mobility-editorial-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        .mobility-editorial-content {
          padding: 52px;
        }

        @media (max-width: 768px) {
          .mobility-editorial-content {
            padding: 28px 20px;
          }
        }

        .mobility-editorial-title {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 12px;
          line-height: 1.12;
          color: var(--text-primary);
        }

        .mobility-editorial-copy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.55;
          letter-spacing: var(--tracking-body);
          margin-bottom: 28px;
        }

        .mobility-spec-highlights {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .spec-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .spec-row-title {
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .spec-row-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
          letter-spacing: var(--tracking-body);
        }

        .mobility-cta-btn {
          padding: 12px 24px;
          font-size: 0.9375rem;
        }

        @media (max-width: 600px) {
          .mobility-cta-btn {
            width: 100%;
          }
        }

        .mobility-editorial-media {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 40px 32px 0;
        }

        @media (max-width: 992px) {
          .mobility-editorial-media {
            padding: 0 24px 32px 24px;
          }
        }

        .media-container-frame {
          position: relative;
          width: 100%;
          border-radius: var(--panel-radius-sm);
          background-color: var(--surface-soft);
          border: 1px solid var(--border-card);
          padding: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
        }

        .editorial-img {
          width: 100%;
          height: auto;
          max-height: 360px;
          object-fit: contain;
          transition: transform 300ms ease;
        }

        .mobility-editorial-card:hover .editorial-img {
          transform: scale(1.02);
        }

        .media-corner-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(6px);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 4px 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: var(--tracking-pill);
          color: var(--text-primary);
          box-shadow: var(--shadow-subtle);
        }
      `}</style>
    </section>
  );
};
