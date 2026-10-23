import React, { useState, useEffect, useRef } from 'react';
import { X, Download, ShieldCheck, AlertCircle, Loader2, CheckCircle2, FileText } from 'lucide-react';
import type { ProductItem } from '../data/products';
import {
  validateCorporateEmail,
  submitLeadToGoogleAppsScript,
  getProductDownloadFileName
} from '../config/leadGateConfig';

interface GatedPdfDownloadProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const GatedPdfDownload: React.FC<GatedPdfDownloadProps> = ({ product, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [downloadLocked, setDownloadLocked] = useState(true);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or pre-fill from sessionStorage for preview convenience
  useEffect(() => {
    if (product) {
      setDownloadLocked(true);
      setErrorMessage(null);
      setHasDownloaded(false);

      const savedEmail = sessionStorage.getItem('venusgeo_lead_email') || '';
      setEmail(savedEmail);

      // Focus input automatically
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, isSubmitting, onClose]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product || !product.pdf) return null;

  const downloadFileName = getProductDownloadFileName(product.id, product.name);
  const downloadUrl = product.pdf.url;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !product || !product.pdf) return;

    setErrorMessage(null);

    // 1. Frontend validation check
    const validation = validateCorporateEmail(email);
    if (!validation.valid) {
      setErrorMessage(validation.message);
      inputRef.current?.focus();
      return;
    }

    // 2. Submit to Google Apps Script
    setIsSubmitting(true);
    try {
      const response = await submitLeadToGoogleAppsScript({
        email: validation.email,
        product: product.name,
        resource: product.pdf.title,
        source: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/products'
      });

      if (response.success && response.downloadGranted) {
        // Unlock download
        setDownloadLocked(false);
        setVerifiedEmail(validation.email);
        sessionStorage.setItem('venusgeo_lead_email', validation.email);
      } else {
        setErrorMessage(response.message || 'Please use your individual corporate email address.');
      }
    } catch (err) {
      console.error('Validation error:', err);
      setErrorMessage("We couldn't prepare your download right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-overlay gated-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gated-modal-title"
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
    >
      <div
        className="modal-content gated-modal-content card-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn gated-close-btn"
          onClick={() => {
            if (!isSubmitting) onClose();
          }}
          disabled={isSubmitting}
          aria-label="Close download dialog"
        >
          <X size={18} />
        </button>

        {downloadLocked ? (
          /* ==============================================
             STEP 1: CORPORATE EMAIL LEAD GATE FORM
             ============================================== */
          <div className="gated-step-body">
            <div className="gated-header">
              <div className="eyebrow gated-eyebrow">
                <ShieldCheck size={13} className="eyebrow-icon text-red" />
                <span>RESOURCE DOWNLOAD</span>
              </div>
              <h3 id="gated-modal-title" className="gated-modal-heading">
                Download the full presentation
              </h3>
              <p className="gated-modal-desc">
                Enter your individual company email to continue.
              </p>
            </div>

            {/* Selected Resource Overview */}
            <div className="gated-resource-card">
              <div className="resource-card-icon">
                <FileText size={18} className="text-red" />
              </div>
              <div className="resource-card-info">
                <div className="resource-product-name">{product.name}</div>
                <div className="resource-file-title">{product.pdf.title}</div>
                <div className="resource-file-meta">
                  {product.pdf.slideCount && <span>{product.pdf.slideCount} Slides</span>}
                  {product.pdf.fileSize && <span>· {product.pdf.fileSize}</span>}
                  <span>· Executive PDF</span>
                </div>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="gated-form" noValidate>
              <div className="form-group">
                <label htmlFor="work-email-input" className="form-label">
                  Work Email
                </label>
                <div className="input-wrapper">
                  <input
                    id="work-email-input"
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="name@company.com"
                    className={`form-input ${errorMessage ? 'input-error' : ''}`}
                    disabled={isSubmitting}
                    required
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck="false"
                  />
                </div>
                <p className="form-microcopy">
                  Please use your individual company email address.
                </p>

                {errorMessage && (
                  <div className="inline-error-banner" role="alert">
                    <AlertCircle size={14} className="error-icon" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <div className="gated-actions">
                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="btn btn-primary gated-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="btn-spinner" />
                      <span>Validating…</span>
                    </>
                  ) : (
                    <span>Continue to Download</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ==============================================
             STEP 2: VALIDATED SUCCESS & REVEALED DOWNLOAD
             ============================================== */
          <div className="gated-step-body gated-success-body">
            <div className="gated-header">
              <div className="eyebrow gated-eyebrow gated-eyebrow-success">
                <CheckCircle2 size={13} className="eyebrow-icon text-green" />
                <span>RESOURCE READY</span>
              </div>
              <h3 id="gated-modal-title" className="gated-modal-heading">
                Your download is ready.
              </h3>
              <p className="gated-modal-desc">
                Access authorized for <strong className="verified-email-text">{verifiedEmail}</strong>
              </p>
            </div>

            <div className="gated-resource-card">
              <div className="resource-card-icon">
                <FileText size={18} className="text-red" />
              </div>
              <div className="resource-card-info">
                <div className="resource-product-name">{product.name}</div>
                <div className="resource-file-title">{product.pdf.title}</div>
                <div className="resource-file-meta">
                  <span>{downloadFileName}</span>
                  {product.pdf.fileSize && <span>· {product.pdf.fileSize}</span>}
                </div>
              </div>
            </div>

            <div className="gated-actions">
              <a
                href={downloadUrl}
                download={downloadFileName}
                onClick={() => setHasDownloaded(true)}
                className="btn btn-primary gated-submit-btn gated-download-direct-btn"
                autoFocus
              >
                <Download size={16} />
                <span>{hasDownloaded ? 'Download PDF Again' : 'Download PDF'}</span>
              </a>

              <p className="gated-tiny-note">
                We've recorded your request for this resource.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .gated-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(14, 14, 18, 0.68);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .gated-modal-content {
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          width: 100%;
          max-width: 480px;
          padding: 32px;
          position: relative;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16);
          box-sizing: border-box;
          animation: modalAppear 0.22s ease-out;
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .gated-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border-subtle);
          background-color: var(--surface-soft);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-quick);
        }

        .gated-close-btn:hover:not(:disabled) {
          background-color: var(--surface-white);
          color: var(--text-primary);
          border-color: var(--border-medium);
        }

        .gated-header {
          margin-bottom: 20px;
        }

        .gated-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          margin-bottom: 8px;
        }

        .gated-eyebrow-success {
          color: #16a34a;
        }

        .text-green {
          color: #16a34a;
        }

        .gated-modal-heading {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 6px;
          letter-spacing: var(--tracking-heading);
        }

        .gated-modal-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .verified-email-text {
          color: var(--text-primary);
          font-weight: 600;
        }

        .gated-resource-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: var(--panel-radius-sm);
          padding: 12px 14px;
          margin-bottom: 20px;
        }

        .resource-card-icon {
          width: 34px;
          height: 34px;
          border-radius: 6px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .resource-card-info {
          flex: 1;
          min-width: 0;
        }

        .resource-product-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-red);
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          margin-bottom: 2px;
        }

        .resource-file-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .resource-file-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .gated-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          height: 44px;
          padding: 10px 14px;
          font-size: 0.9375rem;
          border-radius: var(--button-radius);
          border: 1px solid var(--border-card);
          background-color: var(--surface-white);
          color: var(--text-primary);
          outline: none;
          box-sizing: border-box;
          transition: border-color var(--transition-quick), box-shadow var(--transition-quick);
        }

        .form-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px var(--brand-red-light);
        }

        .form-input.input-error {
          border-color: #ef4444;
          background-color: #fff9f9;
        }

        .form-input.input-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .form-input:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          background-color: var(--surface-soft);
        }

        .form-microcopy {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin: 0;
        }

        .inline-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 8px 12px;
          border-radius: var(--panel-radius-xs);
          font-size: 0.8125rem;
          margin-top: 6px;
          line-height: 1.4;
        }

        .error-icon {
          flex-shrink: 0;
          color: #dc2626;
        }

        .gated-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 4px;
        }

        .gated-submit-btn {
          width: 100%;
          height: 44px;
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: var(--button-radius);
          background-color: var(--brand-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          border: none;
          transition: background-color var(--transition-quick), transform var(--transition-quick);
        }

        .gated-submit-btn:hover:not(:disabled) {
          background-color: var(--action-red-hover);
        }

        .gated-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .gated-download-direct-btn {
          text-decoration: none;
          box-sizing: border-box;
        }

        .btn-spinner {
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .gated-tiny-note {
          font-size: 0.6875rem;
          color: var(--text-muted);
          text-align: center;
          margin: 0;
        }

        @media (max-width: 600px) {
          .gated-modal-content {
            padding: 24px 18px;
            max-width: calc(100% - 24px);
          }

          .gated-modal-heading {
            font-size: 1.25rem;
          }

          .gated-submit-btn {
            height: 46px;
            font-size: 0.9375rem;
          }
        }
      `}</style>
    </div>
  );
};
