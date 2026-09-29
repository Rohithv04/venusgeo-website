import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle hash scrolling when navigating between pages
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        {/* Logo: Preserved original white wave, red square, black lowercase venusgeo */}
        <Link to="/" className="header-logo-link" aria-label="VenusGeo Homepage">
          <img
            src="/assets/brand/venusgeo-logo.png"
            alt="VenusGeo Logo"
            className="site-logo"
            width="170"
            height="52"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav-desktop" aria-label="Main Navigation">
          <Link
            to="/about-us"
            className={`nav-link ${location.pathname.startsWith('/about-us') ? 'active' : ''}`}
          >
            About Us
          </Link>
          <Link
            to="/ai-engineering"
            className={`nav-link ${location.pathname.startsWith('/ai-engineering') ? 'active' : ''}`}
          >
            AI Engineering
          </Link>
          <Link
            to="/enterprise-mobility/"
            className={`nav-link ${location.pathname.startsWith('/enterprise-mobility') ? 'active' : ''}`}
          >
            Enterprise Mobility
          </Link>
          <a
            href="/#products"
            onClick={(e) => handleAnchorClick(e, '#products')}
            className="nav-link"
          >
            Products
          </a>
          <a
            href="/#industries"
            onClick={(e) => handleAnchorClick(e, '#industries')}
            className="nav-link"
          >
            Industries
          </a>
        </nav>

        {/* Header Action */}
        <div className="header-actions">
          <a
            href="/#contact"
            onClick={(e) => handleAnchorClick(e, '#contact')}
            className="btn btn-primary header-cta-btn"
          >
            Contact Us
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <nav className="mobile-nav-list" aria-label="Mobile Navigation">
            <Link
              to="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className={`mobile-nav-link ${location.pathname.startsWith('/about-us') ? 'active' : ''}`}
            >
              About Us
            </Link>
            <Link
              to="/ai-engineering"
              onClick={() => setMobileMenuOpen(false)}
              className={`mobile-nav-link ${location.pathname.startsWith('/ai-engineering') ? 'active' : ''}`}
            >
              AI Engineering
            </Link>
            <Link
              to="/enterprise-mobility/"
              onClick={() => setMobileMenuOpen(false)}
              className={`mobile-nav-link ${location.pathname.startsWith('/enterprise-mobility') ? 'active' : ''}`}
            >
              Enterprise Mobility
            </Link>
            <a
              href="/#products"
              onClick={(e) => handleAnchorClick(e, '#products')}
              className="mobile-nav-link"
            >
              Products
            </a>
            <a
              href="/#industries"
              onClick={(e) => handleAnchorClick(e, '#industries')}
              className="mobile-nav-link"
            >
              Industries
            </a>
            <div className="mobile-nav-cta">
              <a
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Contact Us
              </a>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 500;
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          transition: background-color var(--transition-quick), box-shadow var(--transition-quick);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 74px;
        }

        .header-logo-link {
          display: flex;
          align-items: center;
          padding: 8px 0;
          outline-offset: 4px;
        }

        .site-logo {
          width: 170px;
          height: auto;
          max-height: 48px;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .site-logo {
            width: 140px;
          }
          .header-inner {
            height: 64px;
          }
        }

        .header-nav-desktop {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        @media (max-width: 992px) {
          .header-nav-desktop {
            display: none;
          }
        }

        .nav-link {
          font-size: 0.9375rem;
          font-weight: 500;
          letter-spacing: var(--tracking-button);
          color: var(--text-primary);
          padding: 6px 0;
          position: relative;
        }

        .nav-link:hover {
          color: var(--brand-red);
        }

        .nav-link.active {
          color: var(--brand-red);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--brand-red);
          border-radius: 1px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-cta-btn {
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: var(--tracking-button);
          padding: 9px 18px;
        }

        @media (max-width: 992px) {
          .header-cta-btn {
            display: none;
          }
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          padding: 8px;
          cursor: pointer;
          border-radius: 4px;
        }

        @media (max-width: 992px) {
          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .mobile-drawer {
          display: none;
          position: fixed;
          top: 74px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--surface-white);
          border-top: 1px solid var(--border-subtle);
          padding: 24px var(--page-padding-mobile);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          z-index: 499;
          animation: fadeIn 150ms ease;
        }

        @media (max-width: 992px) {
          .mobile-drawer {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .mobile-drawer {
            top: 64px;
          }
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-nav-link {
          font-size: 1.0625rem;
          font-weight: 600;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          padding: 14px 4px;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--brand-red);
        }

        .mobile-nav-cta {
          margin-top: 24px;
        }
      `}</style>
    </header>
  );
};
