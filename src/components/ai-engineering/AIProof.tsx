import React, { useState, useRef } from 'react';
import { FileText, Activity, Radio, Smartphone, ShieldCheck, ChevronDown } from 'lucide-react';

interface CaseStudy {
  id: string;
  num: string;
  label: string;
  title: string;
  description: string;
  process: string[];
  principle?: string;
  techTags: string[];
  icon: React.ElementType;
}

export const AIProof: React.FC = () => {
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const cases: CaseStudy[] = [
    {
      id: 'doc-intelligence',
      num: '01',
      label: 'DOCUMENT INTELLIGENCE',
      title: 'Document Pipelines with Deterministic Validation',
      description:
        "We've built document pipelines for medical reports, identity documents, certificates and forms using ABBYY, Azure AI Document Intelligence and LLM-assisted extraction.",
      process: ['OCR', 'AI EXTRACTION', 'VALIDATION', 'HUMAN REVIEW'],
      principle: 'AI must know when not to guess.',
      techTags: ['ABBYY FineReader', 'Azure AI Document Intelligence', 'LLM-Assisted Extraction'],
      icon: FileText
    },
    {
      id: 'healthcare',
      num: '02',
      label: 'HEALTHCARE',
      title: 'Structured Clinical Information Ingestion',
      description:
        'AI-enabled workflows turn medical records and reports into structured, usable information through OCR and intelligent extraction.',
      process: ['RECORD INGESTION', 'FIELD IDENTIFICATION', 'OCR / EXTRACTION', 'STRUCTURED DATA', 'REVIEW'],
      techTags: ['Domain OCR', 'Structured Entity Models', 'Azure Health Data Services'],
      icon: Activity
    },
    {
      id: 'telecom',
      num: '03',
      label: 'TELECOM',
      title: 'AI-Assisted Telecom Configuration',
      description:
        'AI supports complex telecom configuration workflows through template intelligence, information extraction, screenshot comparison and validation assistance.',
      process: ['AI ASSISTS', 'BUSINESS RULES CONTROL', 'HUMANS APPROVE'],
      principle: 'AI assists. Business rules control. Humans approve.',
      techTags: ['Template Intelligence', 'Screenshot Diffing', 'Rule Verification'],
      icon: Radio
    },
    {
      id: 'enterprise-mobile',
      num: '04',
      label: 'ENTERPRISE MOBILE',
      title: 'AI-Assisted Brownfield Analysis',
      description:
        'AI-assisted analysis helps teams understand an existing enterprise mobile application before deciding how to modernize it.',
      process: ['EXISTING APPLICATION', 'AI-ASSISTED ANALYSIS', 'SYSTEM UNDERSTANDING', 'MODERNIZATION PATH'],
      techTags: ['Static Analysis', 'API Contract Extraction', 'Target Architecture Spec'],
      icon: Smartphone
    }
  ];

  const handleTabChange = (index: number) => {
    if (index === activeCaseIdx || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCaseIdx(index);
      setIsTransitioning(false);
    }, 140);
  };

  const handleAccordionToggle = (index: number) => {
    if (activeCaseIdx === index) {
      // Keep at least one or allow collapse if desired
      return;
    }
    setActiveCaseIdx(index);
  };

  const currentCase = cases[activeCaseIdx];
  const CurrentIcon = currentCase.icon;

  return (
    <section id="proof" className="section ai-proof-section" aria-label="Proven Real Engineering Experience">
      <div className="container">
        {/* Section Header */}
        <div className="proof-header-block">
          <div className="eyebrow">REAL ENGINEERING EXPERIENCE</div>
          <h2 className="section-heading proof-heading">
            Our AI work comes from<br />
            <span className="text-red">solving real engineering problems.</span>
          </h2>
          <p className="proof-subheading">
            We don’t present theoretical whitepapers. Every approach was developed by solving
            critical production workloads across demanding enterprise domains.
          </p>
        </div>

        {/* Desktop Interactive Tab Selectors (Hidden on Mobile) */}
        <div className="proof-tab-bar" role="tablist" aria-label="Engineering Experience Case Studies">
          {cases.map((c, idx) => {
            const isActive = activeCaseIdx === idx;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                id={`tab-${c.id}`}
                aria-controls={`panel-${c.id}`}
                className={`proof-tab-pill ${isActive ? 'active' : ''}`}
                onClick={() => handleTabChange(idx)}
              >
                <span className="tab-pill-num">{c.num}</span>
                <span className="tab-pill-label">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Single Active Case Study Panel (Hidden on Mobile) */}
        <div className="desktop-single-panel-wrap">
          <div
            ref={panelRef}
            id={`panel-${currentCase.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentCase.id}`}
            className={`single-case-panel card-panel ${isTransitioning ? 'panel-exiting' : 'panel-entering'}`}
          >
            <div className="panel-inner-grid">
              {/* Left Column: Title, Description, and Key Principle */}
              <div className="panel-col-main">
                <div className="panel-cat-badge">
                  <span className="icon-red-outline">
                    <CurrentIcon size={16} />
                  </span>
                  <span className="cat-badge-text">{currentCase.label}</span>
                  <span className="cat-badge-num">CASE {currentCase.num}</span>
                </div>

                <h3 className="panel-case-title">{currentCase.title}</h3>
                <p className="panel-case-desc">{currentCase.description}</p>

                {/* Key Principle / Lesson if present */}
                {currentCase.principle && (
                  <div className="panel-principle-callout">
                    <ShieldCheck size={16} className="text-red" />
                    <span><strong>Key Principle:</strong> {currentCase.principle}</span>
                  </div>
                )}

                {/* Tech tags */}
                <div className="panel-tech-strip">
                  {currentCase.techTags.map((tech, tIdx) => (
                    <span key={tIdx} className="tag-pill">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Right Column: Process Pipeline Flow */}
              <div className="panel-col-process">
                <div className="process-box-header">
                  <span className="process-box-label">ENGINEERING PROCESS FLOW</span>
                  <span className="process-box-badge">{currentCase.process.length} STAGES</span>
                </div>

                <div className="process-nodes-stack">
                  {currentCase.process.map((step, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <div className="process-step-node">
                        <span className="node-idx">0{sIdx + 1}</span>
                        <span className="node-label">{step}</span>
                      </div>
                      {sIdx < currentCase.process.length - 1 && (
                        <div className="process-step-connector">
                          <span className="connector-arrow">↓</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Accordion (Visible only on screens <= 768px) */}
        <div className="mobile-accordion-wrap">
          {cases.map((item, idx) => {
            const isOpen = activeCaseIdx === idx;
            const ItemIcon = item.icon;
            return (
              <div key={item.id} className={`mobile-accordion-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="mobile-accordion-header"
                  onClick={() => handleAccordionToggle(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="acc-header-left">
                    <span className="icon-red-outline" style={{ width: 28, height: 28, borderRadius: 6 }}>
                      <ItemIcon size={14} />
                    </span>
                    <span className="acc-num">{item.num}</span>
                    <span className="acc-label">{item.label}</span>
                  </div>
                  <span className="acc-toggle-icon">
                    <ChevronDown size={18} className={isOpen ? 'icon-rotate' : ''} />
                  </span>
                </button>

                {isOpen && (
                  <div className="mobile-accordion-body">
                    <h4 className="acc-title">{item.title}</h4>
                    <p className="acc-desc">{item.description}</p>

                    {item.principle && (
                      <div className="acc-principle">
                        <ShieldCheck size={14} className="text-red" />
                        <span><strong>Principle:</strong> {item.principle}</span>
                      </div>
                    )}

                    <div className="acc-process-list">
                      <div className="acc-process-label">PROCESS FLOW:</div>
                      <div className="acc-process-chips">
                        {item.process.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="acc-step-chip">{step}</span>
                            {sIdx < item.process.length - 1 && <span className="acc-arrow">→</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .ai-proof-section {
          background-color: var(--surface-soft);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .proof-header-block {
          max-width: 740px;
          margin-bottom: 36px;
        }

        .proof-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 14px;
        }

        .proof-subheading {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Desktop Tab Bar */
        .proof-tab-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .proof-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--button-radius-pill);
          cursor: pointer;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: var(--tracking-pill);
          transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
          white-space: nowrap;
        }

        .proof-tab-pill:hover {
          border-color: #d1d1d8;
          color: var(--text-primary);
        }

        .proof-tab-pill.active {
          background-color: var(--brand-red);
          border-color: var(--brand-red);
          color: var(--text-inverse);
          box-shadow: 0 2px 10px rgba(237, 27, 36, 0.25);
        }

        .tab-pill-num {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
        }

        .proof-tab-pill.active .tab-pill-num {
          color: rgba(255, 255, 255, 0.85);
        }

        /* Desktop Single Active Panel */
        .desktop-single-panel-wrap {
          display: block;
        }

        .single-case-panel {
          padding: 36px 32px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-card);
          min-height: 340px;
          transition: opacity 140ms ease, transform 140ms ease;
        }

        .panel-entering {
          opacity: 1;
          transform: translateY(0);
        }

        .panel-exiting {
          opacity: 0;
          transform: translateY(6px);
        }

        .panel-inner-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .panel-cat-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .cat-badge-text {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-primary);
        }

        .cat-badge-num {
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          background-color: var(--surface-soft);
          color: var(--brand-red);
          margin-left: auto;
        }

        .panel-case-title {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 14px;
        }

        .panel-case-desc {
          font-size: 1rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 580px;
        }

        .panel-principle-callout {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background-color: var(--brand-red-light);
          border: 1px solid rgba(237, 27, 36, 0.16);
          border-radius: 6px;
          margin-bottom: 20px;
          font-size: 0.8125rem;
          color: var(--text-primary);
        }

        .panel-principle-callout strong {
          color: var(--brand-red);
        }

        .panel-tech-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* Right Column Process Box */
        .panel-col-process {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 20px 22px;
        }

        .process-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 16px;
        }

        .process-box-label {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .process-box-badge {
          font-size: 0.625rem;
          font-weight: 700;
          padding: 2px 6px;
          background-color: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          color: var(--brand-red);
        }

        .process-nodes-stack {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 6px;
        }

        .process-step-node {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          background-color: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .node-idx {
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--brand-red);
        }

        .node-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text-primary);
        }

        .process-step-connector {
          display: flex;
          justify-content: center;
          color: var(--text-muted);
          font-size: 0.75rem;
          line-height: 1;
        }

        /* Mobile Vertical Accordion */
        .mobile-accordion-wrap {
          display: none;
        }

        @media (max-width: 768px) {
          .proof-header-block {
            margin-bottom: 24px;
          }
          .proof-subheading {
            font-size: 0.95rem;
            line-height: 1.55;
          }
          .proof-tab-bar {
            display: none;
          }
          .desktop-single-panel-wrap {
            display: none;
          }
          .mobile-accordion-wrap {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .mobile-accordion-item {
            background-color: var(--surface-white);
            border: 1px solid var(--border-card);
            border-radius: var(--panel-radius-sm);
            overflow: hidden;
            transition: border-color 160ms ease;
          }

          .mobile-accordion-item.open {
            border-color: var(--brand-red);
          }

          .mobile-accordion-header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 16px;
            min-height: 52px;
            background: none;
            border: none;
            cursor: pointer;
            text-align: left;
            gap: 8px;
          }

          .acc-header-left {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
            flex: 1;
          }

          .acc-num {
            font-size: 0.8125rem;
            font-weight: 800;
            color: var(--brand-red);
            flex-shrink: 0;
          }

          .acc-label {
            font-size: 0.84375rem;
            font-weight: 700;
            letter-spacing: var(--tracking-title);
            color: var(--text-primary);
            line-height: 1.25;
            word-break: break-word;
          }

          .acc-toggle-icon {
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            flex-shrink: 0;
          }

          .icon-rotate {
            transform: rotate(180deg);
          }

          .mobile-accordion-body {
            padding: 12px 16px 18px 16px;
            border-top: 1px solid var(--border-subtle);
          }

          .acc-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 8px;
          }

          .acc-desc {
            font-size: 0.875rem;
            line-height: 1.55;
            color: var(--text-secondary);
            margin-bottom: 12px;
          }

          .acc-principle {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 8px 12px;
            background-color: var(--brand-red-light);
            border-radius: 6px;
            font-size: 0.75rem;
            color: var(--text-primary);
            margin-bottom: 14px;
            line-height: 1.4;
          }

          .acc-principle strong {
            color: var(--brand-red);
          }

          .acc-process-label {
            font-size: 0.6875rem;
            font-weight: 700;
            color: var(--text-muted);
            margin-bottom: 6px;
          }

          .acc-process-chips {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
          }

          .acc-step-chip {
            font-size: 0.6875rem;
            font-weight: 700;
            background-color: var(--surface-soft);
            padding: 3px 8px;
            border-radius: 4px;
            border: 1px solid var(--border-subtle);
            color: var(--text-primary);
          }

          .acc-arrow {
            color: var(--text-muted);
            font-size: 0.6875rem;
          }
        }
      `}</style>
    </section>
  );
};
