import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { GatedPdfDownload } from './GatedPdfDownload';
import { products, type ProductItem, type ProductPdf } from '../data/products';
import { X, CheckCircle2, MessageSquare, Mail, ArrowRight, FileText, Eye, Download } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [previewPdf, setPreviewPdf] = useState<ProductPdf | null>(null);
  const [gatedProduct, setGatedProduct] = useState<ProductItem | null>(null);

  // ProductGrid is kept 100% visible, sharp, and instant without opacity hiding

  // Close modal with Escape key
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

  // Lock body scroll when any modal is open
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
        {/* Section Header */}
        <div className="products-split-header">
          <div className="products-header-left">
            <div className="eyebrow">Enterprise Product Suite</div>
            <h2 className="section-heading">
              AI-Powered Products<br />
              <span className="text-secondary">for Your Business</span>
            </h2>
          </div>
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

        {/* 2-Column, 3-Row Grid with exact sequence */}
        <div className="products-grid" role="list">
          {products.filter((p) => p.id !== 'tm-hub').map((product) => (
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

      {/* Accessible Detail Modal for Cruise Operations Process Products (Embarkation, Gangway, Mustering, Debarkation) */}
      {selectedProduct && selectedProduct.process && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-content cruise-product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="modal-header">
              <div className="modal-header-text">
                <span className="modal-badge">{selectedProduct.industry}</span>
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

            {/* Modal Body */}
            <div className="modal-body">
              <p className="modal-overview">{selectedProduct.process.intro}</p>

              {/* Process Workflow Section */}
              <div className="modal-spec-block">
                <h4 className="spec-heading">Process Workflow</h4>

                {/* Desktop Horizontal Linear Flow Strip */}
                <div className="workflow-linear-strip" aria-label="Sequential workflow flow">
                  {selectedProduct.process.steps.map((st, idx, arr) => (
                    <React.Fragment key={st.step}>
                      <div className="workflow-linear-node">
                        <span className="node-dot" />
                        <span className="node-text">{st.title}</span>
                      </div>
                      {idx < arr.length - 1 && (
                        <span className="node-arrow" aria-hidden="true">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Desktop 4 Step Cards Grid */}
                <div className="process-cards-grid">
                  {selectedProduct.process.steps.map((st) => (
                    <div key={st.step} className="process-card-box">
                      <div className="process-card-top">
                        <span className="process-step-badge">{st.step}</span>
                        <h5 className="process-step-name">{st.title}</h5>
                      </div>
                      {st.desc && (
                        <p className="process-step-details">{st.desc}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Process Stepper Flow (Vertical on <= 640px) */}
                <div className="mobile-process-stepper">
                  {selectedProduct.process.steps.map((st, idx, arr) => (
                    <React.Fragment key={st.step}>
                      <div className="mobile-stepper-box">
                        <span className="mobile-step-num">{st.step}</span>
                        <div className="mobile-stepper-body">
                          <span className="mobile-step-title">{st.title}</span>
                          {st.desc && <p className="mobile-step-desc">{st.desc}</p>}
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="mobile-stepper-arrow" aria-hidden="true">
                          <span className="stepper-line" />
                          <span className="stepper-arrow-down">↓</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Supporting Capabilities (e.g. for Embarkation) */}
              {selectedProduct.process.capabilities && (
                <div className="modal-spec-block">
                  <h4 className="spec-heading">Supporting Capabilities</h4>
                  <ul className="spec-list">
                    {selectedProduct.process.capabilities.map((cap, idx) => (
                      <li key={idx} className="spec-item">
                        <CheckCircle2 size={16} className="spec-icon" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Supporting Statement (e.g. for Gangway) */}
              {selectedProduct.process.supportingStatement && (
                <div className="process-supporting-banner">
                  <span className="supporting-banner-dot" />
                  <span>{selectedProduct.process.supportingStatement}</span>
                </div>
              )}

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

      {/* Accessible Detail Modal for Internal Products with Detailed Specs (Pammy AI, Posmate, ITAL) */}
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
                <span className="modal-badge">{selectedProduct.detail.eyebrow || selectedProduct.industry}</span>
                <h3 id="modal-title" className="modal-title">{selectedProduct.name}</h3>
                <p className="modal-subtitle">{selectedProduct.detail.headline || selectedProduct.shortBenefit}</p>
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
                alt={selectedProduct.imageAlt || selectedProduct.name}
                className="modal-img"
              />
            </div>

            {/* Modal Details */}
            <div className="modal-body">
              <p className="modal-overview">{selectedProduct.detail.overview}</p>

              {/* Sequential Process Flow Strip */}
              {selectedProduct.detail.workflowSteps && selectedProduct.detail.workflowSteps.length > 0 && (
                <div className="modal-spec-block">
                  <h4 className="spec-heading">Process Flow</h4>
                  <div className="workflow-linear-strip" aria-label="Sequential workflow flow">
                    {selectedProduct.detail.workflowSteps.map((st, idx, arr) => (
                      <React.Fragment key={st}>
                        <div className="workflow-linear-node">
                          <span className="node-dot" />
                          <span className="node-text">{st}</span>
                        </div>
                        {idx < arr.length - 1 && (
                          <span className="node-arrow" aria-hidden="true">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Presentation PDF Feature Banner */}
              {selectedProduct.pdf && (
                <div className="modal-presentation-panel">
                  <div className="presentation-panel-icon-wrap">
                    <FileText size={22} className="text-red" />
                  </div>
                  <div className="presentation-panel-content">
                    <div className="presentation-tag-row">
                      <span className="presentation-pill">Executive Deck</span>
                      {selectedProduct.pdf.slideCount && (
                        <span className="presentation-count">{selectedProduct.pdf.slideCount} Slides</span>
                      )}
                      {selectedProduct.pdf.fileSize && (
                        <span className="presentation-size">{selectedProduct.pdf.fileSize}</span>
                      )}
                    </div>
                    <h4 className="presentation-title">{selectedProduct.pdf.title}</h4>
                    <p className="presentation-desc">
                      {selectedProduct.pdf.subtitle || 'Complete technical architecture, executive overview, and ROI breakdown.'}
                    </p>
                  </div>
                  <div className="presentation-action-btns">
                    <button
                      type="button"
                      className="btn btn-secondary pres-btn"
                      onClick={() => setPreviewPdf(selectedProduct.pdf!)}
                    >
                      <Eye size={14} />
                      <span>Preview Deck</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary pres-btn"
                      onClick={() => setGatedProduct(selectedProduct)}
                    >
                      <Download size={14} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="modal-spec-block">
                <h4 className="spec-heading">Verified Capabilities</h4>
                <ul className="spec-list">
                  {selectedProduct.detail.features.map((feat, idx) => (
                    <li key={idx} className="spec-item">
                      <CheckCircle2 size={16} className="spec-icon" />
                      {feat.includes(':') ? (
                        <span>
                          <strong>{feat.slice(0, feat.indexOf(':'))}:</strong>
                          {feat.slice(feat.indexOf(':') + 1)}
                        </span>
                      ) : (
                        <span>{feat}</span>
                      )}
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
                      {uc.includes(':') ? (
                        <span>
                          <strong>{uc.slice(0, uc.indexOf(':'))}:</strong>
                          {uc.slice(uc.indexOf(':') + 1)}
                        </span>
                      ) : (
                        <span>{uc}</span>
                      )}
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

      {/* Interactive PDF Document Preview Modal */}
      {previewPdf && (
        <div
          className="modal-overlay pdf-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-modal-title"
          onClick={() => setPreviewPdf(null)}
        >
          <div
            className="modal-content pdf-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* PDF Modal Header */}
            <div className="modal-header pdf-modal-header">
              <div className="modal-header-text">
                <div className="pdf-modal-eyebrow">
                  <span className="modal-badge">Executive Deck</span>
                  {previewPdf.slideCount && (
                    <span className="pdf-badge-tag">{previewPdf.slideCount} Slides</span>
                  )}
                  {previewPdf.fileSize && (
                    <span className="pdf-badge-tag">{previewPdf.fileSize}</span>
                  )}
                </div>
                <h3 id="pdf-modal-title" className="modal-title pdf-modal-title-text">
                  {previewPdf.title}
                </h3>
              </div>

              <div className="pdf-header-actions">
                <button
                  type="button"
                  className="btn btn-primary pdf-action-btn"
                  onClick={() => {
                    const prod = products.find((p) => p.pdf?.url === previewPdf.url);
                    if (prod) setGatedProduct(prod);
                  }}
                  title="Download PDF"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setPreviewPdf(null)}
                  aria-label="Close presentation preview"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="pdf-embed-wrapper">
              <iframe
                src={`${previewPdf.url}#toolbar=0&navpanes=0`}
                title={previewPdf.title}
                className="pdf-iframe"
              />
            </div>

            {/* PDF Footer Bar */}
            <div className="pdf-modal-footer">
              <span className="pdf-footer-note">
                High-resolution executive presentation preview. Navigate or view pages above.
              </span>
              <button
                type="button"
                className="pdf-footer-link-btn"
                onClick={() => {
                  const prod = products.find((p) => p.pdf?.url === previewPdf.url);
                  if (prod) setGatedProduct(prod);
                }}
              >
                <Download size={13} />
                <span>Download PDF ({previewPdf.fileSize || 'Presentation'})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gated Lead Form Modal for PDF Downloads */}
      <GatedPdfDownload
        product={gatedProduct}
        onClose={() => setGatedProduct(null)}
      />

      <style>{`
        .products-section {
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .products-split-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .products-split-header {
            flex-direction: column;
            align-items: flex-start;
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

        /* Cruise Product Process Modal */
        .cruise-product-modal {
          max-width: 740px;
        }

        .workflow-linear-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          padding: 10px 14px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: var(--panel-radius-xs);
          margin-bottom: 16px;
        }

        .workflow-linear-node {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: var(--text-primary);
        }

        .node-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .node-arrow {
          font-size: 0.8125rem;
          color: var(--brand-red);
          font-weight: bold;
        }

        .process-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .process-card-box {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: var(--panel-radius-xs);
          padding: 14px;
          transition: border-color var(--transition-quick), background-color var(--transition-quick);
        }

        .process-card-box:hover {
          border-color: #cbd5e1;
          background-color: #f1f4f9;
        }

        .process-card-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .process-step-badge {
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--brand-red);
          background-color: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .process-step-name {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: var(--text-primary);
          margin: 0;
        }

        .process-step-details {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
        }

        .mobile-process-stepper {
          display: none;
        }

        .process-supporting-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          padding: 10px 14px;
          background-color: #ffffff;
          border: 1px dashed var(--border-card);
          border-radius: 6px;
          margin-top: 14px;
        }

        .supporting-banner-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .workflow-linear-strip {
            display: none;
          }

          .process-cards-grid {
            display: none;
          }

          .mobile-process-stepper {
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin-bottom: 18px;
          }

          .mobile-stepper-box {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            background-color: var(--surface-soft);
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            padding: 10px 12px;
          }

          .mobile-step-num {
            font-size: 0.75rem;
            font-weight: 800;
            color: var(--brand-red);
            background-color: #ffffff;
            border: 1px solid var(--border-subtle);
            padding: 2px 6px;
            border-radius: 4px;
            flex-shrink: 0;
          }

          .mobile-step-body {
            flex: 1;
          }

          .mobile-step-title {
            display: block;
            font-size: 0.8125rem;
            font-weight: 700;
            color: var(--text-primary);
            letter-spacing: 0.02em;
            margin-bottom: 2px;
          }

          .mobile-step-desc {
            font-size: 0.75rem;
            color: var(--text-secondary);
            line-height: 1.4;
            margin: 0;
          }

          .mobile-stepper-arrow {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 16px;
          }

          .stepper-arrow-down {
            color: var(--brand-red);
            font-size: 0.8125rem;
            line-height: 1;
          }
        }

        /* Presentation PDF Banner in Detail Modal */
        .modal-presentation-panel {
          margin-bottom: 24px;
          padding: 16px 20px;
          background: linear-gradient(135deg, #ffffff 0%, #fbfbfc 100%);
          border: 1px solid #e2e2e8;
          border-left: 3px solid var(--brand-red);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .presentation-panel-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background-color: #fef2f2;
          border: 1px solid #fee2e2;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .presentation-panel-content {
          flex: 1;
        }

        .presentation-tag-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .presentation-pill {
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--brand-red);
        }

        .presentation-count,
        .presentation-size {
          font-size: 0.6875rem;
          color: var(--text-muted);
          background: var(--surface-soft);
          padding: 1px 6px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
        }

        .presentation-title {
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .presentation-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        .presentation-action-btns {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .pres-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .modal-presentation-panel {
            flex-direction: column;
            align-items: flex-start;
          }
          .presentation-action-btns {
            width: 100%;
          }
          .presentation-action-btns .pres-btn {
            flex: 1;
            justify-content: center;
          }
        }

        /* PDF Viewer Modal */
        .pdf-modal-overlay {
          z-index: 10000;
          background-color: rgba(10, 10, 12, 0.78);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .pdf-modal-content {
          width: 95vw;
          max-width: 1120px;
          height: 90vh;
          max-height: 880px;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
          background-color: var(--surface-white);
          border: 1px solid #3f3f46;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
        }

        .pdf-modal-header {
          padding: 16px 24px;
          background: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-shrink: 0;
        }

        .pdf-modal-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .pdf-badge-tag {
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          padding: 2px 7px;
          border-radius: 12px;
        }

        .pdf-modal-title-text {
          font-size: 1.1875rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }

        .pdf-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pdf-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          font-size: 0.8125rem;
          font-weight: 600;
          border-radius: 6px;
          text-decoration: none;
        }

        .pdf-embed-wrapper {
          flex: 1;
          width: 100%;
          min-height: 0;
          background-color: #27272a;
          position: relative;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: #3f3f46;
        }

        .pdf-modal-footer {
          padding: 10px 24px;
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          gap: 16px;
        }

        .pdf-footer-note {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .pdf-footer-link,
        .pdf-footer-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--brand-red);
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .pdf-footer-link:hover,
        .pdf-footer-link-btn:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .pdf-modal-content {
            width: 100vw;
            height: 96vh;
            border-radius: 8px;
          }
          .pdf-modal-header {
            padding: 12px 16px;
          }
          .pdf-tab-text {
            display: none;
          }
          .pdf-modal-footer {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 16px;
          }
        }
      `}</style>
    </section>
  );
};
