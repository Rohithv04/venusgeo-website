import React from 'react';
import { ExternalLink, ArrowRight, FileSearch, ShieldCheck, CreditCard, Compass, HeartPulse, Clock } from 'lucide-react';
import type { ProductItem } from '../data/products';

interface ProductCardProps {
  product: ProductItem;
  onOpenDetail: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const isExternal = product.destinationType === 'external' && product.url;

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'document-ai':
        return <FileSearch size={18} />;
      case 'private-id':
        return <ShieldCheck size={18} />;
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
      {/* Top Bar with Delicate Red Outline Icon (matching reference style) */}
      <div className="product-card-top-bar">
        <div className="icon-red-outline">
          {getProductIcon(product.id)}
        </div>
        <span className="product-tag-pill">{product.name}</span>
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
          min-height: 420px;
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
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .product-card-action {
          margin-top: auto;
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
