import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { products, type ProductItem } from '../data/products';
import { X, CheckCircle2, MessageSquare, Mail, Check, Activity, ArrowRight } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // ProductGrid is kept 100% visible, sharp, and instant without opacity hiding

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const handleInquire = () => {
    const productName = selectedProduct?.name;
    setSelectedProduct(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      const subjectInput = document.getElementById('contact-subject') as HTMLInputElement;
      if (subjectInput && productName) {
        subjectInput.value = `Inquiry regarding ${productName}`;
        subjectInput.focus();
      }
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="section products-section" aria-label="AI-Powered Products">
      <div className="container">
        {/* Split Section Header */}
        <div className="products-split-header">
          {/* Left: Section Title & Action */}
          <div className="products-header-left">
            <div className="eyebrow">Enterprise Product Suite</div>
            <h2 className="section-heading">
              AI-Powered Products<br />
              <span className="text-secondary">for Your Business</span>
            </h2>
            <div className="products-header-cta">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="btn btn-primary products-quote-btn"
              >
                <span>Talk to Engineering</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right: Operational Status Card */}
          <div className="products-status-card card-panel">
            <div className="status-card-header">
              <div className="status-label">Operational Telemetry</div>
              <div className="status-active-badge">
                <Activity size={13} className="text-red" />
                <span>Live 24/7</span>
              </div>
            </div>

            <div className="status-metric-rows">
              <div className="status-row">
                <span className="status-param">Inference Latency</span>
                <span className="status-val">&lt; 15ms</span>
              </div>
              <div className="status-row highlight-status-row">
                <span className="status-param">Extraction Accuracy</span>
                <div className="status-val-wrap">
                  <span className="status-val">99.8%</span>
                  <div className="red-check-badge">
                    <Check size={11} />
                  </div>
                </div>
              </div>
              <div className="status-row">
                <span className="status-param">System Availability</span>
                <span className="status-val">99.99%</span>
              </div>
            </div>

            <div className="status-footer-text">
              Real-time ingestion, privacy validation & automated edge dispatch.
            </div>
          </div>
        </div>

        {/* 2-Column, 3-Row Grid with exact sequence */}
        <div className="products-grid" role="list">
          {products.map((product) => (
            <div key={product.id} className="grid-item" role="listitem">
              <ProductCard
                product={product}
                onOpenDetail={(prod) => setSelectedProduct(prod)}
              />
            </div>
          ))}
        </div>

        {/* Core Capabilities / Tags Bar */}
        <div className="capabilities-strip">
          <span className="cap-label">Product Capabilities:</span>
          <div className="cap-pills-list">
            <span className="tag-pill">Intelligent OCR</span>
            <span className="tag-pill">Zero-Knowledge Biometrics</span>
            <span className="tag-pill">Handheld POS Mobility</span>
            <span className="tag-pill">Fleet Device Telemetry</span>
            <span className="tag-pill">Unified Health Records</span>
            <span className="tag-pill">Live Clinic Queueing</span>
          </div>
        </div>
      </div>

      {/* Accessible Detail Modal for Internal Products */}
      {selectedProduct && selectedProduct.detail && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="modal-header">
              <div className="modal-header-text">
                <span className="modal-badge">Product Overview</span>
                <h3 id="modal-title" className="modal-title">{selectedProduct.name}</h3>
                <p className="modal-subtitle">{selectedProduct.shortBenefit}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Media */}
            <div className="modal-media">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="modal-img"
              />
            </div>

            {/* Modal Details */}
            <div className="modal-body">
              <p className="modal-overview">{selectedProduct.detail.overview}</p>

              <div className="modal-spec-block">
                <h4 className="spec-heading">Verified Capabilities</h4>
                <ul className="spec-list">
                  {selectedProduct.detail.features.map((feat, idx) => (
                    <li key={idx} className="spec-item">
                      <CheckCircle2 size={16} className="spec-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-spec-block">
                <h4 className="spec-heading">Enterprise Use Cases</h4>
                <ul className="spec-list">
                  {selectedProduct.detail.useCases.map((uc, idx) => (
                    <li key={idx} className="spec-item">
                      <span className="spec-bullet">•</span>
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-spec-block">
                <h4 className="spec-heading">Technical Highlights</h4>
                <ul className="spec-list">
                  {selectedProduct.detail.technicalHighlights.map((th, idx) => (
                    <li key={idx} className="spec-item">
                      <span className="spec-bullet">•</span>
                      <span>{th}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleInquire}
                >
                  <MessageSquare size={16} />
                  <span>Talk to Our Team About {selectedProduct.name}</span>
                </button>

                <a
                  href={`mailto:contact@venusgeo.com?subject=Inquiry regarding ${encodeURIComponent(selectedProduct.name)}`}
                  className="btn btn-secondary"
                >
                  <Mail size={16} />
                  <span>Email Inquiries</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .products-section {
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .products-split-header {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 32px;
          align-items: flex-end;
          margin-bottom: 40px;
        }

        @media (max-width: 860px) {
          .products-split-header {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .section-heading {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 16px;
          line-height: 1.12;
        }

        .products-quote-btn {
          padding: 11px 22px;
          font-size: 0.875rem;
          border-radius: var(--button-radius);
        }

        /* Status card on right side of header */
        .products-status-card {
          padding: 24px;
          background-color: var(--surface-white);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-subtle);
        }

        .status-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .status-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-muted);
        }

        .status-active-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: var(--tracking-pill);
          color: var(--text-primary);
          background-color: var(--surface-soft);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .status-metric-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .status-param {
          color: var(--text-secondary);
        }

        .status-val {
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--text-primary);
        }

        .highlight-status-row .status-param {
          font-weight: 600;
          color: var(--text-primary);
        }

        .status-val-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .red-check-badge {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: var(--brand-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-footer-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }

        /* 2-Column Desktop Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--gap-grid);
          margin-bottom: 32px;
        }

        @media (max-width: 860px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Capabilities Strip */
        .capabilities-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }

        .cap-label {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
        }

        .cap-pills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* Modal Styles */
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-badge {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--brand-red);
          margin-bottom: 6px;
        }

        .modal-title {
          font-size: 1.5rem;
          letter-spacing: var(--tracking-title);
          margin-bottom: 4px;
        }

        .modal-subtitle {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .modal-close-btn {
          background: none;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 6px;
          cursor: pointer;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close-btn:hover {
          background-color: var(--surface-soft);
          color: var(--text-primary);
        }

        .modal-media {
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: #000;
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-body {
          padding: 24px;
        }

        .modal-overview {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .modal-spec-block {
          margin-bottom: 20px;
        }

        .spec-heading {
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .spec-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .spec-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9375rem;
          color: var(--text-primary);
          line-height: 1.45;
        }

        .spec-icon {
          color: var(--brand-red);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .spec-bullet {
          color: var(--brand-red);
          font-weight: bold;
          line-height: 1;
        }

        .modal-footer-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </section>
  );
};
