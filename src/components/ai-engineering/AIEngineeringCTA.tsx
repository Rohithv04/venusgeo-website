import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Send, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface AIEngineeringCTAProps {
  workshopLabel?: string;
  workshopLink?: string;
}

export const AIEngineeringCTA: React.FC<AIEngineeringCTAProps> = ({
  workshopLabel = 'Book a 90-minute AI opportunity workshop',
  workshopLink = '#contact'
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    focusArea: 'Build AI-powered products',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const questions = [
    { num: '01', q: 'Have a system to build?', desc: 'Ground-up custom AI architecture & autonomous agent systems.' },
    { num: '02', q: 'A product to transform?', desc: 'Embedding intelligence, semantic search & automated validation into live apps.' },
    { num: '03', q: 'A legacy platform to modernize?', desc: 'AI-assisted brownfield analysis to extract rules and map architecture.' },
    { num: '04', q: 'An engineering team to accelerate?', desc: 'Structured specification pipelines and AI-assisted developer workflows.' }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Questions sequential reveal
      gsap.from('.cta-question-card', {
        scrollTrigger: {
          trigger: questionsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter both your name and business email.');
      return;
    }
    setErrorMsg('');
    setFormSubmitted(true);

    const subject = encodeURIComponent(`AI Engineering Inquiry: ${formData.focusArea}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nFocus Area: ${formData.focusArea}\n\nProject Scope:\n${formData.message}`
    );
    window.location.href = `mailto:contact@venusgeo.com?subject=${subject}&body=${body}`;
  };

  const handleWorkshopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (workshopLink.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(workshopLink);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section ai-cta-section" aria-label="Closing Call To Action">
      <div className="container">
        {/* Header & Four Animated Questions */}
        <div className="ai-cta-header">
          <div className="eyebrow">PUT AI TO WORK</div>
          <h2 className="section-heading ai-cta-heading">
            Let’s put AI to work<br />
            <span className="text-red">in your business.</span>
          </h2>
          <p className="ai-cta-subheading">
            Whatever stage your software or engineering capability is at, our team can help you map the
            practical, accountable way forward.
          </p>
        </div>

        {/* 4 Interactive Questions */}
        <div ref={questionsRef} className="cta-questions-grid">
          {questions.map((item) => (
            <div key={item.num} className="cta-question-card card-panel">
              <span className="question-idx">{item.num}</span>
              <h3 className="question-title">{item.q}</h3>
              <p className="question-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Engagement Box with Workshop CTA & Direct Inquiry Form */}
        <div className="cta-engagement-box card-panel">
          <div className="engagement-layout">
            {/* Left: Workshop Invitation & Primary Action */}
            <div className="engagement-left">
              <div className="workshop-pill">
                <Sparkles size={14} className="text-red" />
                <span>EXECUTIVE WORKSHOP</span>
              </div>
              <h3 className="workshop-heading">
                Map your AI opportunities with our engineering team.
              </h3>
              <p className="workshop-desc">
                Review your current application architecture, data landscape, and highest-leverage
                AI engineering opportunities with senior systems engineers.
              </p>

              <div className="workshop-actions">
                <a
                  href={workshopLink}
                  onClick={handleWorkshopClick}
                  className="btn btn-primary workshop-btn"
                >
                  {workshopLabel}
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="engagement-reassurance">
                <Shield size={16} className="text-red" />
                <span>Direct engagement with experienced engineers. Zero vendor lock-in.</span>
              </div>
            </div>

            {/* Right: Direct Project Inquiry Form */}
            <div className="engagement-right">
              <h4 className="inquiry-form-title">Send a Direct Project Brief</h4>
              <p className="inquiry-form-sub">
                Our AI engineering leads typically review and reply within one business day.
              </p>

              {formSubmitted ? (
                <div className="form-success-box">
                  <CheckCircle2 size={32} className="text-red" />
                  <h4>Inquiry Prepared</h4>
                  <p>Your email client is opening with your details routed to contact@venusgeo.com.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="inquiry-form">
                  {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="ai-inquiry-name">Your Name</label>
                      <input
                        id="ai-inquiry-name"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="ai-inquiry-email">Work Email</label>
                      <input
                        id="ai-inquiry-email"
                        type="email"
                        className="form-input"
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="ai-focus-area">Primary Objective</label>
                    <select
                      id="ai-focus-area"
                      className="form-select"
                      value={formData.focusArea}
                      onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                    >
                      <option value="Build AI-powered products">01. Build new AI-powered products</option>
                      <option value="Add intelligence to existing software">02. Add intelligence to existing software</option>
                      <option value="Modernize legacy systems with AI">03. Modernize legacy systems with AI</option>
                      <option value="Accelerate software engineering teams">04. Accelerate software engineering teams</option>
                      <option value="Executive 90-minute opportunity workshop">05. Book 90-minute AI opportunity workshop</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="ai-inquiry-message">Project Context (Optional)</label>
                    <textarea
                      id="ai-inquiry-message"
                      className="form-textarea"
                      rows={3}
                      placeholder="Briefly describe your systems, current tech stack, or the challenge you want to solve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    <Send size={15} />
                    <span>Connect with Our Engineers</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Closing Brand Statement */}
        <div className="closing-brand-bar">
          <p className="brand-statement-text">
            <strong>VenusGeo:</strong> Engineering the next generation of software with AI.
          </p>
        </div>
      </div>

      <style>{`
        .ai-cta-section {
          background-color: var(--surface-soft);
          position: relative;
        }

        .ai-cta-header {
          max-width: 760px;
          margin-bottom: 40px;
        }

        .ai-cta-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .ai-cta-subheading {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.62;
        }

        /* 4 Questions Grid */
        .cta-questions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        .cta-question-card {
          padding: 24px 20px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius-sm);
          display: flex;
          flex-direction: column;
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }

        .cta-question-card:hover {
          transform: translateY(-2px);
          border-color: #d1d1d8;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
        }

        .question-idx {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
          margin-bottom: 10px;
        }

        .question-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .question-desc {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* Large Engagement Box */
        .cta-engagement-box {
          padding: 40px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          box-shadow: var(--shadow-card);
          margin-bottom: 40px;
        }

        .engagement-layout {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 48px;
        }

        .workshop-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--brand-red);
          background-color: var(--brand-red-light);
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 16px;
        }

        .workshop-heading {
          font-size: 1.625rem;
          font-weight: 800;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 16px;
        }

        .workshop-desc {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }

        .workshop-actions {
          margin-bottom: 28px;
        }

        .workshop-btn {
          padding: 13px 26px;
          font-size: 0.9375rem;
          width: 100%;
          justify-content: center;
        }

        .workshop-btn:hover svg {
          transform: translateX(4px);
        }

        .workshop-btn svg {
          transition: transform 160ms ease;
        }

        .engagement-reassurance {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Right Form */
        .inquiry-form-title {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .inquiry-form-sub {
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-input, .form-select, .form-textarea {
          padding: 9px 12px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-primary);
          transition: border-color var(--transition-quick), background-color var(--transition-quick);
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--brand-red);
          background-color: #ffffff;
          outline: none;
        }

        .submit-btn {
          width: 100%;
          padding: 12px 20px;
          font-size: 0.875rem;
        }

        .form-error-banner {
          padding: 8px 12px;
          background-color: #fee2e2;
          border: 1px solid #f87171;
          border-radius: 6px;
          color: #b91c1c;
          font-size: 0.8125rem;
        }

        .form-success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 20px;
          background-color: var(--surface-soft);
          border-radius: 8px;
          gap: 10px;
        }

        .form-success-box h4 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .form-success-box p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        /* Closing Brand Bar */
        .closing-brand-bar {
          text-align: center;
          padding: 24px 0 8px 0;
          border-top: 1px solid var(--border-subtle);
        }

        .brand-statement-text {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          letter-spacing: -0.01em;
        }

        .brand-statement-text strong {
          color: var(--text-primary);
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          .cta-questions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .engagement-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 640px) {
          .ai-cta-header {
            margin-bottom: 28px;
          }
          .ai-cta-subheading {
            font-size: 0.95rem;
            line-height: 1.55;
          }
          .cta-questions-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 28px;
          }
          .cta-question-card {
            padding: 20px 16px;
          }
          .cta-engagement-box {
            padding: 20px 16px;
            margin-bottom: 28px;
          }
          .workshop-heading {
            font-size: 1.3rem;
            line-height: 1.25;
            margin-bottom: 12px;
          }
          .workshop-desc {
            font-size: 0.875rem;
            line-height: 1.55;
            margin-bottom: 20px;
          }
          .workshop-actions {
            margin-bottom: 20px;
          }
          .workshop-btn {
            padding: 12px 16px;
            font-size: 0.875rem;
          }
          .inquiry-form-title {
            font-size: 1.05rem;
          }
          .inquiry-form-sub {
            font-size: 0.75rem;
            margin-bottom: 16px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .form-input, .form-select {
            min-height: 44px;
          }
          .submit-btn {
            min-height: 44px;
          }
          .brand-statement-text {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
};
