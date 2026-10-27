import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { GatedPdfDownload } from '../components/GatedPdfDownload';
import {
  enterpriseProductGroups,
  type ProductItem,
  type ProductPdf
} from '../data/products';
import {
  ArrowRight,
  X,
  CheckCircle2,
  FileText,
  Download,
  Mail,
  Sparkles
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../utils/animations';

export const EnterpriseProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [previewPdf, setPreviewPdf] = useState<ProductPdf | null>(null);
  const [gatedProduct, setGatedProduct] = useState<ProductItem | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Set document title and meta description
  useEffect(() => {
    document.title = 'Enterprise Products | VenusGeo';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Explore VenusGeo enterprise products across cruise and hospitality, healthcare, and telecom — engineered for connected operations, secure workflows, and digital transformation.'
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://venusgeo.com/enterprise-products');

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Keyboard navigation & modal lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (gatedProduct) {
          setGatedProduct(null);
        } else if (previewPdf) {
          setPreviewPdf(null);
        } else if (selectedProduct) {
          setSelectedProduct(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewPdf, selectedProduct, gatedProduct]);

  useEffect(() => {
    if (selectedProduct || previewPdf || gatedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct, previewPdf, gatedProduct]);

  // GSAP animation per industry group
  useEffect(() => {
    if (prefersReducedMotion() || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.ep-hero-card', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Independent stagger animation for each industry group
      const groups = pageRef.current?.querySelectorAll('.industry-group-section');
      groups?.forEach((group) => {
        const header = group.querySelector('.industry-group-header');
        const cards = group.querySelectorAll('.grid-item');

        if (header) {
          gsap.from(header, {
            scrollTrigger: {
              trigger: group,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            y: 14,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'all'
          });
        }

        if (cards && cards.length > 0) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            y: 18,
            opacity: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'all'
          });
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleInquire = () => {
    const productName = selectedProduct?.name;
    setSelectedProduct(null);
    window.location.href = `/#contact?subject=${encodeURIComponent(`Inquiry regarding ${productName || 'Enterprise Products'}`)}`;
  };

  return (
    <div ref={pageRef} className="page-wrapper enterprise-products-page">
      <Header />

      <main id="main-content">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="section ep-hero-section" aria-label="Enterprise Products Hero">
          <div className="container">
            <div className="ep-hero-card card-panel">
              <div className="ep-hero-content">
                <div className="eyebrow ep-eyebrow">
                  <Sparkles size={13} className="text-red" aria-hidden="true" />
                  <span>ENTERPRISE PRODUCTS</span>
                </div>
                <h1 className="ep-hero-title">
                  Products engineered around real business operations.
                </h1>
                <p className="ep-hero-desc">
                  Explore VenusGeo products across cruise and hospitality, healthcare, and telecom — built to simplify complex workflows, improve visibility, and connect digital operations.
                </p>
              </div>

              <div className="ep-hero-action">
                <a href="/#contact" className="btn btn-primary ep-contact-btn">
                  <span>Talk to Engineering</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THREE INDUSTRY PRODUCT GROUPS                                             */}
        {/* ========================================================================= */}
        <div className="ep-groups-container">
          <div className="container">
            {enterpriseProductGroups.map((group, groupIdx) => (
              <React.Fragment key={group.id}>
                {/* Visual Gap & Elegant Divider between Industry Groups */}
                {groupIdx > 0 && (
                  <div className="industry-group-divider" role="separator" aria-hidden="true">
                    <span className="divider-line" />
                    <span className="divider-tag">{group.name.toUpperCase()}</span>
                    <span className="divider-line" />
                  </div>
                )}

                <section
                  id={`group-${group.id}`}
                  className="industry-group-section"
                  aria-labelledby={`heading-${group.id}`}
                >
                  {/* Restrained Section Identifier */}
                  <div className="industry-group-header">
                    <div className="industry-group-eyebrow">{group.name.toUpperCase()}</div>
                    <h2 id={`heading-${group.id}`} className="industry-group-title">
                      {group.name}
                    </h2>
                    <p className="industry-group-tagline">{group.tagline}</p>
                  </div>

                  {/* Product Cards Grid */}
                  <div className="products-grid" role="list">
                    {group.products.map((product) => (
                      <div key={product.id} className="grid-item" role="listitem">
                        <ProductCard
                          product={product}
                          onOpenDetail={(prod) => setSelectedProduct(prod)}
                          onPreviewPdf={(pdf) => setPreviewPdf(pdf)}
                          onDownloadPdf={(prod) => setGatedProduct(prod)}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* PRODUCT DETAIL MODAL                                                      */}
      {/* ========================================================================= */}
      {selectedProduct && selectedProduct.detail && (
        <div className="product-modal-backdrop" onClick={() => setSelectedProduct(null)} role="dialog" aria-modal="true">
          <div
            className="product-modal-content card-panel"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <div className="modal-header-bar">
              <div className="modal-header-meta">
                <span className="modal-badge">{selectedProduct.industry}</span>
                <span className="modal-eyebrow">
                  {selectedProduct.detail.eyebrow || 'PRODUCT OVERVIEW'}
                </span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-scroll-body">
              <div className="modal-hero-strip">
                <h3 className="modal-title">{selectedProduct.name}</h3>
                <p className="modal-headline">
                  {selectedProduct.detail.headline || selectedProduct.shortBenefit}
                </p>
                <p className="modal-overview">{selectedProduct.detail.overview}</p>
              </div>

              {selectedProduct.detail.features && (
                <div className="modal-section-block">
                  <h4 className="modal-subheading">Core Capabilities</h4>
                  <div className="modal-features-grid">
                    {selectedProduct.detail.features.map((feature, idx) => (
                      <div key={idx} className="modal-feature-pill">
                        <CheckCircle2 size={16} className="text-red flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.detail.useCases && (
                <div className="modal-section-block">
                  <h4 className="modal-subheading">Enterprise Deployment Scenarios</h4>
                  <div className="modal-usecases-list">
                    {selectedProduct.detail.useCases.map((uc, idx) => (
                      <div key={idx} className="modal-usecase-row">
                        <span className="usecase-number">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="usecase-text">{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.detail.technicalHighlights && (
                <div className="modal-section-block">
                  <h4 className="modal-subheading">Technical Architecture Highlights</h4>
                  <div className="modal-tech-list">
                    {selectedProduct.detail.technicalHighlights.map((tech, idx) => (
                      <div key={idx} className="modal-tech-row">
                        <span className="tech-dot" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer-action-bar">
              <button
                type="button"
                className="btn btn-secondary modal-cancel-btn"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary modal-inquire-btn"
                onClick={handleInquire}
              >
                <Mail size={15} />
                <span>Inquire About {selectedProduct.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PDF PRESENTATION PREVIEW MODAL                                            */}
      {/* ========================================================================= */}
      {previewPdf && (
        <div className="pdf-modal-backdrop" onClick={() => setPreviewPdf(null)} role="dialog" aria-modal="true">
          <div
            className="pdf-modal-card card-panel"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <div className="pdf-modal-header">
              <div className="pdf-modal-info">
                <FileText size={18} className="text-red" />
                <div>
                  <h3 className="pdf-title">{previewPdf.title}</h3>
                  {previewPdf.subtitle && (
                    <p className="pdf-subtitle">{previewPdf.subtitle}</p>
                  )}
                </div>
              </div>
              <div className="pdf-header-actions">
                <a
                  href={previewPdf.url}
                  download={previewPdf.fileName}
                  className="btn btn-secondary pdf-direct-download"
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  className="pdf-modal-close"
                  onClick={() => setPreviewPdf(null)}
                  aria-label="Close PDF preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="pdf-viewer-frame">
              <iframe
                src={`${previewPdf.url}#toolbar=0&navpanes=0`}
                title={previewPdf.title}
                className="pdf-iframe"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GATED PDF DOWNLOAD MODAL                                                  */}
      {/* ========================================================================= */}
      {gatedProduct && gatedProduct.pdf && (
        <GatedPdfDownload
          product={gatedProduct}
          onClose={() => setGatedProduct(null)}
        />
      )}

      <Footer />

      <style>{`
        .enterprise-products-page {
          background-color: var(--surface-soft);
          min-height: 100vh;
        }

        /* Hero */
        .ep-hero-section {
          padding-top: 104px;
          padding-bottom: 24px;
        }

        .ep-hero-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 40px 48px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-subtle);
        }

        .ep-hero-content {
          max-width: 780px;
        }

        .ep-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .ep-hero-title {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.18;
          color: var(--text-primary);
          margin-bottom: 12px;
          letter-spacing: -0.025em;
        }

        .ep-hero-desc {
          font-size: 1.0625rem;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        .ep-hero-action {
          flex-shrink: 0;
        }

        .ep-contact-btn {
          white-space: nowrap;
          padding: 12px 22px;
        }

        @media (max-width: 992px) {
          .ep-hero-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 32px 28px;
            gap: 20px;
          }
          .ep-hero-title {
            font-size: 1.875rem;
          }
        }

        @media (max-width: 600px) {
          .ep-hero-section {
            padding-top: 88px;
            padding-bottom: 16px;
          }
          .ep-hero-card {
            padding: 24px 20px;
          }
          .ep-hero-title {
            font-size: 1.5rem;
          }
          .ep-hero-desc {
            font-size: 0.9375rem;
          }
        }

        /* Industry Groups Container */
        .ep-groups-container {
          padding-top: 16px;
          padding-bottom: 96px;
        }

        .industry-group-section {
          position: relative;
        }

        .industry-group-header {
          margin-bottom: 32px;
        }

        .industry-group-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brand-red);
          margin-bottom: 4px;
        }

        .industry-group-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .industry-group-tagline {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin: 0;
          max-width: 640px;
        }

        /* Divider & Gap between Groups: 110px desktop, 72px mobile */
        .industry-group-divider {
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 110px 0 60px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.04) 0%, rgba(237, 27, 36, 0.22) 50%, rgba(0, 0, 0, 0.04) 100%);
        }

        .divider-tag {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--brand-red);
          background-color: rgba(237, 27, 36, 0.06);
          border: 1px solid rgba(237, 27, 36, 0.2);
          border-radius: 999px;
          padding: 5px 14px;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .industry-group-divider {
            margin: 72px 0 40px 0;
            gap: 12px;
          }
          .industry-group-title {
            font-size: 1.45rem;
          }
        }

        /* Products Grid: 2-column layout matching site */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .grid-item {
          display: flex;
          width: 100%;
        }

        @media (max-width: 992px) {
          .products-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        /* Modals: Product Detail */
        .product-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(10, 11, 14, 0.65);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: epFadeIn 200ms ease;
        }

        .product-modal-content {
          width: 100%;
          max-width: 720px;
          max-height: 88vh;
          background-color: var(--surface-white);
          border-radius: var(--panel-radius);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.18);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--border-card);
        }

        .modal-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-header-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
          background-color: rgba(237, 27, 36, 0.08);
          color: var(--brand-red);
          border: 1px solid rgba(237, 27, 36, 0.2);
        }

        .modal-eyebrow {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }

        .modal-close-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border-subtle);
          background-color: transparent;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .modal-close-btn:hover {
          background-color: var(--surface-soft);
          color: var(--text-primary);
          border-color: var(--border-subtle-hover);
        }

        .modal-scroll-body {
          padding: 28px;
          overflow-y: auto;
          flex: 1;
        }

        .modal-title {
          font-size: 1.625rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .modal-headline {
          font-size: 1.0625rem;
          font-weight: 500;
          color: var(--brand-red);
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .modal-overview {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }

        .modal-section-block {
          margin-bottom: 28px;
        }

        .modal-subheading {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 14px;
        }

        .modal-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .modal-feature-pill {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.875rem;
          line-height: 1.45;
          color: var(--text-primary);
          background-color: var(--surface-soft);
          padding: 10px 14px;
          border-radius: var(--button-radius);
          border: 1px solid var(--border-subtle);
        }

        .modal-usecases-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-usecase-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--text-secondary);
          padding: 10px 14px;
          background-color: var(--surface-soft);
          border-radius: var(--button-radius);
        }

        .usecase-number {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-red);
          font-family: monospace;
          margin-top: 2px;
        }

        .modal-tech-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-tech-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .tech-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .modal-footer-action-bar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          padding: 18px 28px;
          border-top: 1px solid var(--border-subtle);
          background-color: var(--surface-white);
        }

        .modal-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* PDF Preview Modal */
        .pdf-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(10, 11, 14, 0.7);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: epFadeIn 200ms ease;
        }

        .pdf-modal-card {
          width: 100%;
          max-width: 980px;
          height: 90vh;
          background-color: var(--surface-white);
          border-radius: var(--panel-radius);
          box-shadow: 0 24px 56px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--border-card);
        }

        .pdf-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .pdf-modal-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pdf-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .pdf-subtitle {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .pdf-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pdf-direct-download {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          font-size: 0.8125rem;
        }

        .pdf-modal-close {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border-subtle);
          background-color: transparent;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .pdf-modal-close:hover {
          background-color: var(--surface-soft);
          color: var(--text-primary);
        }

        .pdf-viewer-frame {
          flex: 1;
          width: 100%;
          background-color: #2a2a2e;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        @keyframes epFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
