import React, { useEffect, useRef } from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const AboutCTA: React.FC = () => {
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-cta-card', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} className="section about-cta-section" aria-label="Call to Action">
      <div className="container">
        <div className="about-cta-card card-panel">
          <div className="cta-left-content">
            <div className="eyebrow">LET&apos;S BUILD WHAT&apos;S NEXT</div>
            <h2 className="cta-headline">
              Turn complexity into your next advantage.
            </h2>
            <p className="cta-supporting">
              Whether you&apos;re modernizing an existing enterprise platform or building something entirely new with AI and mobile edge technology, VenusGeo can help shape the path forward.
            </p>

            <div className="cta-btn-group">
              <a href="/#contact" className="btn btn-primary cta-action-btn">
                Start a Conversation <ArrowRight size={16} />
              </a>
              <Link to="/enterprise-mobility/" className="btn btn-secondary cta-action-btn">
                Explore Enterprise Mobility
              </Link>
            </div>
          </div>

          <div className="cta-contact-direct-card card-panel-soft">
            <div className="direct-header">
              <span className="direct-status-dot" />
              <span className="direct-title">Direct Engineering Inquiries</span>
            </div>

            <div className="direct-channels">
              <div className="channel-item">
                <span className="icon-red-outline">
                  <Mail size={16} />
                </span>
                <div>
                  <div className="channel-lbl">Email Our Team</div>
                  <a href="mailto:contact@venusgeo.com" className="channel-val text-red">
                    contact@venusgeo.com
                  </a>
                </div>
              </div>

              <div className="channel-item">
                <span className="icon-red-outline">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="channel-lbl">Corporate Headquarters</div>
                  <div className="channel-val-text">
                    3750 NW 87th Avenue, Suite 700<br />
                    Doral, Florida 33166
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-cta-section {
          background-color: var(--surface-white);
          padding-top: 56px;
          padding-bottom: 84px;
        }

        @media (max-width: 768px) {
          .about-cta-section {
            padding-top: 40px;
            padding-bottom: 56px;
          }
        }

        .about-cta-card {
          padding: 48px;
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
          gap: 40px;
          align-items: center;
          border-radius: var(--panel-radius);
          background: linear-gradient(135deg, #ffffff 0%, var(--surface-soft) 100%);
          border: 1px solid var(--border-card);
          box-shadow: var(--shadow-card);
        }

        @media (max-width: 992px) {
          .about-cta-card {
            grid-template-columns: 1fr;
            padding: 32px 24px;
            gap: 32px;
          }
        }

        @media (max-width: 600px) {
          .about-cta-card {
            padding: 24px 18px;
            gap: 24px;
          }
          .cta-supporting {
            font-size: 0.95rem !important;
            line-height: 1.55 !important;
            margin-bottom: 20px !important;
          }
          .cta-btn-group {
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }
          .cta-action-btn {
            width: 100%;
            justify-content: center;
          }
          .cta-contact-direct-card {
            padding: 20px 16px !important;
          }
        }

        .cta-left-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .cta-headline {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .cta-supporting {
          font-size: clamp(1rem, 1.2vw, 1.125rem);
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 540px;
        }

        .cta-btn-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .cta-action-btn {
          padding: 12px 24px;
        }

        /* Direct contact box on right */
        .cta-contact-direct-card {
          padding: 28px;
          border-radius: var(--panel-radius-sm);
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
        }

        .direct-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .direct-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #22c55e;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
        }

        .direct-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        .direct-channels {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .channel-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .channel-lbl {
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .channel-val {
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .channel-val:hover {
          text-decoration: underline;
        }

        .channel-val-text {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
};
