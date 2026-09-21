import React from 'react';
import { industries, type IndustryItem } from '../data/industries';
import { Landmark, HeartPulse, Radio, Ship, Store, Compass } from 'lucide-react';

export const IndustryGrid: React.FC = () => {
  const getIcon = (iconName: IndustryItem['iconName']) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark size={18} strokeWidth={1.75} />;
      case 'HeartPulse':
        return <HeartPulse size={18} strokeWidth={1.75} />;
      case 'Radio':
        return <Radio size={18} strokeWidth={1.75} />;
      case 'Ship':
        return <Ship size={18} strokeWidth={1.75} />;
      case 'Store':
        return <Store size={18} strokeWidth={1.75} />;
      case 'Compass':
        return <Compass size={18} strokeWidth={1.75} />;
    }
  };

  return (
    <section id="industries" className="section industries-section" aria-label="Industries">
      <div className="container">
        {/* Section Heading */}
        <div className="industries-header">
          <div className="eyebrow">Target Industries</div>
          <h2 className="section-heading">Built around your industry.</h2>
          <p className="section-subheading">
            Technology shaped by your operations, your customers, and the demands of your business.
          </p>
        </div>

        {/* 3 Columns Desktop, 2 Tablet, 1 Mobile */}
        <div className="industries-grid">
          {industries.map((ind) => (
            <div key={ind.id} className="industry-card card-panel">
              <div className="industry-card-top">
                <div className="icon-red-outline">
                  {getIcon(ind.iconName)}
                </div>
                <span className="industry-dot-indicator" />
              </div>
              <h3 className="industry-card-title">{ind.title}</h3>
              <p className="industry-card-desc">{ind.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .industries-section {
          background-color: var(--surface-white);
        }

        .industries-header {
          max-width: 680px;
          margin-bottom: 44px;
        }

        .section-heading {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 12px;
          line-height: 1.12;
        }

        .section-subheading {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          letter-spacing: var(--tracking-body);
        }

        .industries-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--gap-grid);
        }

        @media (max-width: 992px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .industries-grid {
            grid-template-columns: 1fr;
          }
        }

        .industry-card {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .industry-card:hover {
          transform: translateY(-2px);
          border-color: #d0d0d8;
          box-shadow: var(--shadow-card);
        }

        .industry-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 20px;
        }

        .industry-dot-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--border-subtle);
        }

        .industry-card:hover .industry-dot-indicator {
          background-color: var(--brand-red);
        }

        .industry-card-title {
          font-size: 1.1875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          letter-spacing: var(--tracking-title);
        }

        .industry-card-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.55;
          letter-spacing: var(--tracking-body);
        }
      `}</style>
    </section>
  );
};
