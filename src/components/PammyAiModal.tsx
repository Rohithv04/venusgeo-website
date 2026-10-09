import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowDown, Plus, Minus, Ship, CheckCircle2 } from 'lucide-react';
import { cruiseOperations } from '../data/cruiseOperations';
import { gsap, prefersReducedMotion } from '../utils/animations';

interface PammyAiModalProps {
  onClose: () => void;
  onInquire: () => void;
}

export const PammyAiModal: React.FC<PammyAiModalProps> = ({ onClose, onInquire }) => {
  const [activeTabId, setActiveTabId] = useState<string>('embarkation');
  // For mobile vertical accordion: which workflow is expanded (can be null or an id)
  const [expandedMobileId, setExpandedMobileId] = useState<string>('embarkation');
  const contentPanelRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);

  const activeOp = cruiseOperations.find((op) => op.id === activeTabId) || cruiseOperations[0];

  // Animate tab content change on desktop
  const handleTabChange = (opId: string) => {
    if (opId === activeTabId) return;

    setActiveTabId(opId);

    if (prefersReducedMotion() || !contentPanelRef.current) {
      return;
    }

    // GSAP desktop tab transition: animate incoming active content panel
    gsap.fromTo(
      contentPanelRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'transform' }
    );
  };

  // Keyboard navigation for desktop tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % cruiseOperations.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + cruiseOperations.length) % cruiseOperations.length;
      e.preventDefault();
    } else if (e.key === 'Home') {
      newIndex = 0;
      e.preventDefault();
    } else if (e.key === 'End') {
      newIndex = cruiseOperations.length - 1;
      e.preventDefault();
    } else {
      return;
    }

    const nextOp = cruiseOperations[newIndex];
    handleTabChange(nextOp.id);

    // Focus the target tab button
    const buttons = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (buttons && buttons[newIndex]) {
      buttons[newIndex].focus();
    }
  };

  // Toggle mobile accordion item (only one expanded at a time)
  const toggleMobileAccordion = (opId: string) => {
    setExpandedMobileId((prev) => (prev === opId ? '' : opId));
  };

  // Listen for Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="modal-overlay pammy-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pammy-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-content pammy-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="pammy-modal-header">
          <div className="pammy-header-copy">
            <div className="pammy-eyebrow-wrap">
              <span className="pammy-eyebrow">MARITIME OPERATIONS</span>
            </div>
            <h2 id="pammy-modal-title" className="pammy-modal-title">
              Pammy AI
            </h2>
            <p className="pammy-modal-short-desc">
              Intelligent mobile workflows for cruise guest, crew and safety operations.
            </p>
          </div>
          <button
            type="button"
            className="pammy-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="pammy-modal-body">
          {/* Concise Intro Body Paragraph */}
          <p className="pammy-intro-paragraph">
            Pammy AI helps cruise operators digitize critical movement workflows across the passenger journey — from embarkation and gangway processing to mustering and debarkation.
          </p>

          {/* Hero Visual Frame (Reduced dominance, 220-280px on desktop) */}
          <div className="pammy-hero-visual" aria-hidden="true">
            <img
              src="/assets/products/pammy-ai.jpg"
              alt="Pammy AI Cruise Operations"
              className="pammy-hero-img"
              loading="eager"
            />
            <div className="pammy-hero-badge">
              <Ship size={14} className="text-red" />
              <span>Cruise Operations Intelligence</span>
            </div>
          </div>

          {/* Cruise Operations Section */}
          <div className="cruise-ops-section">
            <div className="cruise-ops-header">
              <span className="cruise-ops-eyebrow">CRUISE OPERATIONS</span>
              <h3 className="cruise-ops-heading">One platform across key cruise workflows.</h3>
              <p className="cruise-ops-subtitle">
                Explore how Pammy AI supports critical passenger and onboard operations.
              </p>
            </div>

            {/* DESKTOP HORIZONTAL ACCORDION / TAB INTERFACE (> 768px) */}
            <div className="desktop-accordion-wrap">
              <div
                ref={tablistRef}
                className="cruise-tablist"
                role="tablist"
                aria-label="Cruise Operations Workflows"
              >
                {cruiseOperations.map((op, idx) => {
                  const isActive = activeTabId === op.id;
                  return (
                    <button
                      key={op.id}
                      type="button"
                      role="tab"
                      id={`pammy-tab-${op.id}`}
                      aria-selected={isActive}
                      aria-controls={`pammy-tabpanel-${op.id}`}
                      tabIndex={isActive ? 0 : -1}
                      className={`cruise-tab-btn ${isActive ? 'tab-active' : ''}`}
                      onClick={() => handleTabChange(op.id)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                    >
                      <span className="tab-number">{op.number}</span>
                      <span className="tab-label">{op.title.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Content Panel */}
              <div
                ref={contentPanelRef}
                id={`pammy-tabpanel-${activeOp.id}`}
                role="tabpanel"
                aria-labelledby={`pammy-tab-${activeOp.id}`}
                tabIndex={0}
                className="cruise-active-panel"
              >
                <div className="panel-split-layout">
                  {/* Left Column (55%): Workflow Details */}
                  <div className="panel-content-col">
                    <div className="panel-number-badge">
                      <span className="panel-num">{activeOp.number}</span>
                      <span className="panel-category">WORKFLOW</span>
                    </div>

                    <h4 className="panel-workflow-title">{activeOp.title}</h4>
                    <p className="panel-workflow-hook">{activeOp.hook}</p>
                    <p className="panel-workflow-desc">{activeOp.description}</p>

                    {/* Capability Tags or Supporting Line */}
                    {activeOp.tags && activeOp.tags.length > 0 && (
                      <div className="panel-tags-row" aria-label="Workflow capabilities">
                        {activeOp.tags.map((tag) => (
                          <span key={tag} className="workflow-cap-tag">
                            <CheckCircle2 size={12} className="tag-check-icon" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {activeOp.supportingNote && (
                      <div className="panel-supporting-note">
                        <span className="supporting-dot" />
                        <span>{activeOp.supportingNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column (45%): Process Flow Diagram */}
                  <div className="panel-diagram-col">
                    <div className="diagram-card">
                      <div className="diagram-card-header">
                        <span className="diagram-indicator-dot" />
                        <span className="diagram-card-title">PROCESS FLOW</span>
                      </div>

                      <div className="diagram-steps-flow">
                        {activeOp.steps.map((step, sIdx) => (
                          <React.Fragment key={step}>
                            <div className="diagram-step-box">
                              <span className="step-idx">0{sIdx + 1}</span>
                              <span className="step-text">{step}</span>
                            </div>
                            {sIdx < activeOp.steps.length - 1 && (
                              <div className="diagram-step-arrow" aria-hidden="true">
                                <ArrowDown size={14} className="arrow-icon-desktop" />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horizontal Flow Strip across bottom of panel for instant linear scanning */}
                <div className="panel-linear-flow" aria-label="Sequential workflow flow">
                  <div className="linear-flow-track">
                    {activeOp.steps.map((step, sIdx) => (
                      <React.Fragment key={step}>
                        <div className="linear-step-pill">
                          <span className="linear-dot" />
                          <span className="linear-label">{step}</span>
                        </div>
                        {sIdx < activeOp.steps.length - 1 && (
                          <span className="linear-arrow" aria-hidden="true">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE VERTICAL ACCORDION (<= 768px) */}
            <div className="mobile-accordion-wrap">
              {cruiseOperations.map((op) => {
                const isOpen = expandedMobileId === op.id;
                return (
                  <div
                    key={op.id}
                    className={`mobile-accordion-item ${isOpen ? 'item-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="mobile-accordion-trigger"
                      onClick={() => toggleMobileAccordion(op.id)}
                      aria-expanded={isOpen}
                      aria-controls={`accordion-body-${op.id}`}
                      id={`accordion-trigger-${op.id}`}
                    >
                      <div className="mobile-trigger-left">
                        <span className="mobile-op-num">{op.number}</span>
                        <span className="mobile-op-title">{op.title}</span>
                      </div>
                      <div className="mobile-trigger-icon" aria-hidden="true">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        id={`accordion-body-${op.id}`}
                        role="region"
                        aria-labelledby={`accordion-trigger-${op.id}`}
                        className="mobile-accordion-content"
                      >
                        <div className="mobile-content-inner">
                          <p className="mobile-op-hook">{op.hook}</p>
                          <p className="mobile-op-desc">{op.description}</p>

                          {/* Capability Tags / Supporting Note */}
                          {op.tags && op.tags.length > 0 && (
                            <div className="mobile-tags-row">
                              {op.tags.map((tag) => (
                                <span key={tag} className="mobile-cap-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {op.supportingNote && (
                            <p className="mobile-supporting-note">
                              {op.supportingNote}
                            </p>
                          )}

                          {/* Mobile Process Flow (Vertical) */}
                          <div className="mobile-process-pipeline">
                            <span className="mobile-pipeline-label">PROCESS FLOW</span>
                            <div className="mobile-steps-track">
                              {op.steps.map((step, sIdx) => (
                                <React.Fragment key={step}>
                                  <div className="mobile-step-box">
                                    <span className="mobile-step-num">0{sIdx + 1}</span>
                                    <span className="mobile-step-label">{step}</span>
                                  </div>
                                  {sIdx < op.steps.length - 1 && (
                                    <div className="mobile-arrow-wrap" aria-hidden="true">
                                      <span className="mobile-flow-line" />
                                      <ArrowDown size={14} className="mobile-arrow-icon" />
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Single Clean Bottom CTA */}
          <div className="pammy-modal-footer">
            <button
              type="button"
              className="btn btn-primary pammy-footer-cta"
              onClick={onInquire}
            >
              <span>Talk to our team</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* PAMMY AI MODAL OVERLAY & CONTAINER */
        .pammy-modal-overlay {
          z-index: 1000;
          background-color: rgba(18, 18, 20, 0.72);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
        }

        .pammy-modal-content {
          max-width: 1040px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          background-color: var(--surface-white);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-modal);
          border: 1px solid var(--border-card);
          overflow: hidden;
          position: relative;
        }

        /* HEADER */
        .pammy-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px 24px 16px 24px;
          border-bottom: 1px solid var(--border-subtle);
          background-color: var(--surface-white);
          flex-shrink: 0;
          gap: 16px;
        }

        .pammy-header-copy {
          flex: 1;
        }

        .pammy-eyebrow-wrap {
          margin-bottom: 4px;
        }

        .pammy-eyebrow {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--brand-red);
        }

        .pammy-modal-title {
          font-size: 1.625rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.15;
          margin-bottom: 4px;
        }

        .pammy-modal-short-desc {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        .pammy-close-btn {
          background: none;
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          width: 36px;
          height: 36px;
          cursor: pointer;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color var(--transition-quick), color var(--transition-quick), border-color var(--transition-quick);
        }

        .pammy-close-btn:hover {
          background-color: var(--surface-soft);
          color: var(--text-primary);
          border-color: #cbd5e1;
        }

        .pammy-close-btn:focus-visible {
          outline: 2px solid var(--brand-red);
          outline-offset: 2px;
        }

        /* SCROLLABLE BODY */
        .pammy-modal-body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }

        .pammy-intro-paragraph {
          font-size: 1rem;
          line-height: 1.55;
          color: var(--text-primary);
          margin-bottom: 18px;
          max-width: 900px;
        }

        /* HERO VISUAL */
        .pammy-hero-visual {
          position: relative;
          width: 100%;
          height: 240px;
          border-radius: var(--panel-radius-sm);
          overflow: hidden;
          background-color: var(--surface-charcoal);
          border: 1px solid var(--border-subtle);
          margin-bottom: 28px;
        }

        .pammy-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pammy-hero-badge {
          position: absolute;
          bottom: 12px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(226, 226, 232, 0.9);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        /* CRUISE OPERATIONS SECTION */
        .cruise-ops-section {
          margin-bottom: 24px;
        }

        .cruise-ops-header {
          margin-bottom: 18px;
        }

        .cruise-ops-eyebrow {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .cruise-ops-heading {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-title);
          line-height: 1.25;
          margin-bottom: 4px;
        }

        .cruise-ops-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
        }

        /* DESKTOP HORIZONTAL ACCORDION / TABS */
        .desktop-accordion-wrap {
          display: block;
        }

        .mobile-accordion-wrap {
          display: none;
        }

        .cruise-tablist {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }

        .cruise-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 14px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-subtle);
          border-radius: var(--button-radius);
          cursor: pointer;
          font-family: inherit;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          transition: background-color var(--transition-quick), border-color var(--transition-quick), color var(--transition-quick);
        }

        .cruise-tab-btn:hover:not(.tab-active) {
          background-color: var(--surface-soft);
          border-color: #cbd5e1;
        }

        .cruise-tab-btn:focus-visible {
          outline: 2px solid var(--brand-red);
          outline-offset: 2px;
        }

        .cruise-tab-btn.tab-active {
          background-color: var(--brand-red);
          border-color: var(--brand-red);
          color: #ffffff;
        }

        .tab-number {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
          transition: color var(--transition-quick);
        }

        .cruise-tab-btn.tab-active .tab-number {
          color: rgba(255, 255, 255, 0.9);
        }

        .tab-label {
          white-space: nowrap;
        }

        /* ACTIVE CONTENT PANEL */
        .cruise-active-panel {
          background-color: #fbfbfc;
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius-sm);
          padding: 24px;
          min-height: 290px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cruise-active-panel:focus-visible {
          outline: 2px solid var(--brand-red);
          outline-offset: 2px;
        }

        .panel-split-layout {
          display: flex;
          align-items: stretch;
          gap: 28px;
          margin-bottom: 20px;
        }

        .panel-content-col {
          flex: 0 0 56%;
          display: flex;
          flex-direction: column;
        }

        .panel-number-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .panel-num {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--brand-red);
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .panel-category {
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          background-color: var(--surface-soft);
          padding: 1px 6px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
        }

        .panel-workflow-title {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-title);
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .panel-workflow-hook {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--brand-red);
          margin-bottom: 10px;
          line-height: 1.4;
        }

        .panel-workflow-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .panel-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .workflow-cap-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
          background-color: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 4px 10px;
          border-radius: 20px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }

        .tag-check-icon {
          color: var(--brand-red);
          flex-shrink: 0;
        }

        .panel-supporting-note {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          font-style: normal;
          margin-top: auto;
          padding: 6px 12px;
          background-color: #ffffff;
          border: 1px dashed var(--border-card);
          border-radius: 6px;
        }

        .supporting-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        /* RIGHT DIAGRAM COLUMN */
        .panel-diagram-col {
          flex: 0 0 calc(44% - 28px);
          display: flex;
        }

        .diagram-card {
          width: 100%;
          background-color: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius-xs);
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .diagram-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 14px;
        }

        .diagram-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .diagram-card-title {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .diagram-steps-flow {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }

        .diagram-step-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 12px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 5px;
          transition: border-color var(--transition-quick);
        }

        .diagram-step-box:hover {
          border-color: #cbd5e1;
          background-color: #f1f4f9;
        }

        .step-idx {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--brand-red);
          min-width: 16px;
        }

        .step-text {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: var(--text-primary);
        }

        .diagram-step-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 14px;
          color: var(--brand-red);
        }

        .arrow-icon-desktop {
          color: var(--brand-red);
          opacity: 0.8;
        }

        /* BOTTOM LINEAR FLOW STRIP */
        .panel-linear-flow {
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        .linear-flow-track {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .linear-step-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 4px 10px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text-primary);
        }

        .linear-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .linear-arrow {
          font-size: 0.8125rem;
          color: var(--brand-red);
          font-weight: bold;
        }

        /* FOOTER CTA */
        .pammy-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-top: 18px;
          border-top: 1px solid var(--border-subtle);
        }

        .pammy-footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: var(--button-radius);
          cursor: pointer;
        }

        /* ====================================================
           MOBILE RESPONSIVE STYLES (<= 768px)
           ==================================================== */
        @media (max-width: 768px) {
          .pammy-modal-overlay {
            padding: 12px;
          }

          .pammy-modal-content {
            width: calc(100% - 8px);
            max-height: 93dvh;
            border-radius: 10px;
          }

          .pammy-modal-header {
            padding: 16px 18px 14px 18px;
          }

          .pammy-modal-title {
            font-size: 1.375rem;
          }

          .pammy-modal-short-desc {
            font-size: 0.875rem;
          }

          .pammy-modal-body {
            padding: 18px;
          }

          .pammy-intro-paragraph {
            font-size: 0.9375rem;
            margin-bottom: 14px;
          }

          .pammy-hero-visual {
            height: 180px;
            margin-bottom: 20px;
          }

          /* Hide Desktop Tabs, Show Mobile Accordion */
          .desktop-accordion-wrap {
            display: none;
          }

          .mobile-accordion-wrap {
            display: flex;
            flex-direction: column;
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            overflow: hidden;
            background-color: var(--surface-white);
          }

          .mobile-accordion-item {
            border-bottom: 1px solid var(--border-subtle);
          }

          .mobile-accordion-item:last-child {
            border-bottom: none;
          }

          .mobile-accordion-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 16px;
            min-height: 48px; /* Comfortable touch target */
            background-color: var(--surface-white);
            border: none;
            cursor: pointer;
            font-family: inherit;
            text-align: left;
            transition: background-color var(--transition-quick);
          }

          .mobile-accordion-trigger:hover {
            background-color: var(--surface-soft);
          }

          .mobile-accordion-trigger:focus-visible {
            outline: 2px solid var(--brand-red);
            outline-offset: -2px;
          }

          .mobile-accordion-item.item-open .mobile-accordion-trigger {
            background-color: #fef2f2;
            border-bottom: 1px solid #fee2e2;
          }

          .mobile-trigger-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .mobile-op-num {
            font-size: 0.8125rem;
            font-weight: 800;
            color: var(--brand-red);
            letter-spacing: 0.02em;
          }

          .mobile-op-title {
            font-size: 0.9375rem;
            font-weight: 700;
            color: var(--text-primary);
          }

          .mobile-trigger-icon {
            color: var(--brand-red);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: var(--surface-soft);
            transition: transform var(--transition-quick);
          }

          .mobile-accordion-item.item-open .mobile-trigger-icon {
            background-color: #ffffff;
          }

          .mobile-accordion-content {
            background-color: #fdfdfd;
            animation: fadeIn 200ms ease;
          }

          .mobile-content-inner {
            padding: 16px;
          }

          .mobile-op-hook {
            font-size: 0.9375rem;
            font-weight: 600;
            color: var(--brand-red);
            margin-bottom: 6px;
            line-height: 1.35;
          }

          .mobile-op-desc {
            font-size: 0.875rem;
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: 12px;
          }

          .mobile-tags-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 14px;
          }

          .mobile-cap-tag {
            font-size: 0.6875rem;
            font-weight: 600;
            color: var(--text-primary);
            background-color: var(--surface-soft);
            border: 1px solid var(--border-subtle);
            padding: 3px 8px;
            border-radius: 4px;
          }

          .mobile-supporting-note {
            font-size: 0.8125rem;
            color: var(--text-secondary);
            margin-bottom: 14px;
            padding: 6px 10px;
            background-color: var(--surface-soft);
            border-left: 2px solid var(--brand-red);
            border-radius: 0 4px 4px 0;
          }

          /* Mobile Process Pipeline */
          .mobile-process-pipeline {
            background-color: #ffffff;
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            padding: 14px 12px;
            margin-top: 6px;
          }

          .mobile-pipeline-label {
            display: block;
            font-size: 0.625rem;
            font-weight: 700;
            letter-spacing: var(--tracking-eyebrow);
            color: var(--text-muted);
            text-transform: uppercase;
            margin-bottom: 10px;
          }

          .mobile-steps-track {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .mobile-step-box {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background-color: var(--surface-soft);
            border: 1px solid var(--border-subtle);
            border-radius: 4px;
          }

          .mobile-step-num {
            font-size: 0.6875rem;
            font-weight: 700;
            color: var(--brand-red);
          }

          .mobile-step-label {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.02em;
            color: var(--text-primary);
          }

          .mobile-arrow-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 18px;
          }

          .mobile-arrow-icon {
            color: var(--brand-red);
            margin: -2px 0;
          }

          .pammy-footer-cta {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .pammy-hero-visual {
            height: 160px;
          }
          .pammy-modal-title {
            font-size: 1.25rem;
          }
          .pammy-modal-body {
            padding: 14px;
          }
        }
      `}</style>
    </div>
  );
};
