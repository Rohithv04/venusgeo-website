import React from 'react';
import { ExternalLink, ArrowRight, FileSearch, ShieldCheck, CreditCard, Compass, HeartPulse, Clock, FileText, Eye, Download } from 'lucide-react';
import type { ProductItem, ProductPdf } from '../data/products';

interface ProductCardProps {
  product: ProductItem;
  onOpenDetail: (product: ProductItem) => void;
  onPreviewPdf?: (pdf: ProductPdf) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail, onPreviewPdf }) => {
  const isExternal = product.destinationType === 'external' && product.url;

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'document-ai':
        return <FileSearch size={18} />;
      case 'private-id':
        return <ShieldCheck size={18} />;
      case 'posmate':
      case 'postmate':
        return <CreditCard size={18} />;
      case 'ital':
        return <Compass size={18} />;
      case 'medugo':
        return <HeartPulse size={18} />;
      case 'dr-queues':
        return <Clock size={18} />;
      default:
        return <FileSearch size={18} />;
    }
  };

  return (
    <div className="product-card card-panel" id={`card-${product.id}`}>
      {/* Top Bar with Delicate Red Outline Icon */}
      <div className="product-card-top-bar">
        <div className="icon-red-outline">
          {getProductIcon(product.id)}
        </div>
        <div className="product-card-top-tags">
          {product.pdf && (
            <span className="product-pdf-tag">
              <FileText size={11} />
              <span>PDF Deck</span>
            </span>
          )}
          <span className="product-tag-pill">{product.name}</span>
        </div>
      </div>

      {/* Product Image Media Frame */}
      <div className="product-card-media">
        <img
          src={product.image}
          alt={`${product.name} interface`}
          className="product-card-img"
          loading="eager"
          width="600"
          height="340"
        />
      </div>

      {/* Product Body */}
      <div className="product-card-body">
        <div className="product-header-block">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-benefit">{product.shortBenefit}</p>
        </div>

        <p className="product-desc">{product.description}</p>

        {/* Presentation PDF Attachment Row */}
        {product.pdf && (
          <div className="product-pdf-strip" aria-label={`PDF Presentation for ${product.name}`}>
            <div className="pdf-strip-header">
              <div className="pdf-strip-meta">
                <FileText size={13} className="text-red" />
                <span className="pdf-strip-title">Presentation Deck</span>
              </div>
              {product.pdf.slideCount && (
                <span className="pdf-strip-slides">{product.pdf.slideCount} Slides</span>
              )}
            </div>

            <div className="pdf-strip-actions">
              <button
                type="button"
                className="pdf-btn pdf-btn-preview"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviewPdf?.(product.pdf!);
                }}
                title={`Preview ${product.pdf.title}`}
                aria-label={`Preview ${product.pdf.title} PDF`}
              >
                <Eye size={13} />
                <span>Preview PDF</span>
              </button>

              <a
                href={product.pdf.url}
                download={product.pdf.fileName}
                className="pdf-btn pdf-btn-download"
                onClick={(e) => e.stopPropagation()}
                title={`Download ${product.pdf.title}`}
                aria-label={`Download ${product.pdf.title} PDF`}
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            </div>
          </div>
        )}

        {/* Explore Action Button with Arrow */}
        <div className="product-card-action">
          {isExternal ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary product-action-btn"
              aria-label={`Explore ${product.name} on external site`}
            >
              <span>{product.actionText}</span>
              <ExternalLink size={14} />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onOpenDetail(product)}
              className="btn btn-secondary product-action-btn"
              aria-label={`View specs for ${product.name}`}
            >
              <span>{product.actionText}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 440px;
          overflow: hidden;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .product-card:hover {
          transform: translateY(-2px);
          border-color: #cacace;
          box-shadow: var(--shadow-card);
        }

        .product-card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px 14px 24px;
        }

        .product-card-top-tags {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .product-pdf-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--brand-red);
          background-color: #fef2f2;
          border: 1px solid #fecdd3;
          padding: 3px 8px;
          border-radius: 20px;
        }

        .product-tag-pill {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .product-card-media {
          position: relative;
          width: calc(100% - 48px);
          margin: 0 24px;
          height: 180px;
          border-radius: var(--panel-radius-sm);
          background-color: var(--surface-charcoal);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        @media (max-width: 600px) {
          .product-card-media {
            width: calc(100% - 32px);
            margin: 0 16px;
            height: 160px;
          }
          .product-card-top-bar {
            padding: 16px 16px 12px 16px;
          }
        }

        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 300ms ease;
        }

        .product-card:hover .product-card-img {
          transform: scale(1.03);
        }

        .product-card-body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 20px 24px 24px 24px;
        }

        @media (max-width: 600px) {
          .product-card-body {
            padding: 16px;
          }
        }

        .product-header-block {
          margin-bottom: 10px;
        }

        .product-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 3px;
          letter-spacing: -0.015em;
        }

        .product-benefit {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--brand-red);
          line-height: 1.35;
        }

        .product-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        /* Presentation PDF Strip */
        .product-pdf-strip {
          margin-top: auto;
          margin-bottom: 14px;
          padding: 9px 12px;
          background: linear-gradient(180deg, #fafafb 0%, #f4f4f7 100%);
          border: 1px solid #e2e2e8;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pdf-strip-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pdf-strip-meta {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pdf-strip-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .pdf-strip-slides {
          font-size: 0.6875rem;
          color: var(--text-muted);
          font-weight: 500;
          background: rgba(0, 0, 0, 0.04);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .pdf-strip-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .pdf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 6px 8px;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 5px;
          text-decoration: none;
          transition: all 0.18s ease;
          cursor: pointer;
        }

        .pdf-btn-preview {
          background-color: var(--surface-white);
          color: var(--text-primary);
          border: 1px solid #d4d4d8;
        }

        .pdf-btn-preview:hover {
          background-color: #f1f1f5;
          border-color: #a1a1aa;
          color: var(--brand-red);
        }

        .pdf-btn-download {
          background-color: #fff1f2;
          color: var(--brand-red);
          border: 1px solid #fecdd3;
        }

        .pdf-btn-download:hover {
          background-color: #ffe4e6;
          border-color: #fda4af;
          color: #be123c;
        }

        .product-card-action {
          margin-top: 0;
        }

        .product-action-btn {
          width: 100%;
          justify-content: space-between;
          padding: 10px 16px;
          font-size: 0.8125rem;
          font-weight: 500;
          border-color: var(--border-subtle);
          background-color: var(--surface-soft);
          border-radius: var(--button-radius);
        }

        .product-action-btn:hover {
          background-color: #ebebef;
          border-color: #b8b8c0;
          color: var(--brand-red);
        }
      `}</style>
    </div>
  );
};

