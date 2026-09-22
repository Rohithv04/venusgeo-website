import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-logo-surface">
              <img
                src="/assets/brand/venusgeo-logo.png"
                alt="VenusGeo Logo"
                className="footer-logo"
                width="170"
                height="52"
              />
            </div>
            <p className="footer-tagline">
              AI-first product development and enterprise engineering for software built to scale.
            </p>
            <div className="footer-address">
              3750 NW 87th Avenue, Suite 700<br />
              Doral, Florida 33166
            </div>
          </div>

          {/* Group 1: Products */}
          <div className="footer-links-col">
            <h4 className="footer-group-title">Products</h4>
            <ul className="footer-link-list">
              <li><a href="/#card-document-ai" className="footer-link">Document AI</a></li>
              <li><a href="https://privateid.com/" target="_blank" rel="noopener noreferrer" className="footer-link">Private ID</a></li>
              <li><a href="/#card-posmate" className="footer-link">Posmate</a></li>
              <li><a href="/#card-ital" className="footer-link">ITAL</a></li>
              <li><a href="https://www.medugo.com/" target="_blank" rel="noopener noreferrer" className="footer-link">Medugo</a></li>
              <li><a href="https://www.drqueues.com/" target="_blank" rel="noopener noreferrer" className="footer-link">Dr Queues</a></li>
            </ul>
          </div>

          {/* Group 2: Explore */}
          <div className="footer-links-col">
            <h4 className="footer-group-title">Explore</h4>
            <ul className="footer-link-list">
              <li>
                <a
                  href="https://www.venusgeo.com/gen-ai-integration/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  AI Engineering
                </a>
              </li>
              <li>
                <a href="/#industries" className="footer-link">Industries</a>
              </li>
              <li>
                <Link to="/enterprise-mobility/" className="footer-link">Enterprise Mobility</Link>
              </li>
            </ul>
          </div>

          {/* Group 3: Company */}
          <div className="footer-links-col">
            <h4 className="footer-group-title">Company</h4>
            <ul className="footer-link-list">
              <li>
                <a
                  href="https://www.venusgeo.com/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  About
                </a>
              </li>
              <li>
                <a href="/#contact" className="footer-link">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Group 4: Legal */}
          <div className="footer-links-col">
            <h4 className="footer-group-title">Legal</h4>
            <ul className="footer-link-list">
              <li><a href="#privacy" onClick={(e) => e.preventDefault()} className="footer-link">Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()} className="footer-link">Terms of Service</a></li>
              <li><a href="#security" onClick={(e) => e.preventDefault()} className="footer-link">Security Overview</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} VenusGeo Solutions Inc. All rights reserved.
          </p>
          <div className="footer-status-pill">
            <span className="status-dot"></span>
            <span>Enterprise Systems Operational</span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          padding-top: 64px;
          padding-bottom: 40px;
          margin-top: auto;
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
          gap: 36px;
          margin-bottom: 48px;
        }

        @media (max-width: 992px) {
          .footer-main-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 600px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        .footer-logo-surface {
          display: inline-flex;
          align-items: center;
          background-color: var(--surface-white);
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          margin-bottom: 16px;
        }

        .footer-logo {
          width: 160px;
          height: auto;
          display: block;
        }

        .footer-tagline {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 14px;
          max-width: 280px;
        }

        .footer-address {
          font-size: 0.8125rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .footer-group-title {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .footer-link-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-link {
          font-size: 0.875rem;
          color: var(--text-secondary);
          transition: color var(--transition-quick);
        }

        .footer-link:hover {
          color: var(--brand-red);
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 28px;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        @media (max-width: 600px) {
          .footer-bottom-bar {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }

        .footer-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #22c55e;
        }
      `}</style>
    </footer>
  );
};
