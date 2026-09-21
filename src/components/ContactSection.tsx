import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedStatus, setSubmittedStatus] = useState<'idle' | 'preparing-email'>('idle');

  // ContactSection is permanently visible, razor-sharp and clear without opacity hiding

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your business email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject.';
    if (!formData.message.trim()) errs.message = 'Please provide details about your project.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedStatus('preparing-email');
    const mailtoUri = `mailto:contact@venusgeo.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject Scope:\n${formData.message}`
    )}`;
    window.location.href = mailtoUri;
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Contact Us">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Headline, Copy & Direct Contact Info */}
          <div className="contact-info">
            <div className="eyebrow">Direct Engagement</div>
            <h2 className="contact-headline">Let’s talk about your product.</h2>
            <p className="contact-copy">
              Tell us what you want to create, connect, or improve.
            </p>

            <div className="contact-details-box">
              <div className="contact-detail-item">
                <span className="icon-red-outline">
                  <Mail size={18} />
                </span>
                <div>
                  <div className="detail-label">Email Our Team Directly</div>
                  <a href="mailto:contact@venusgeo.com" className="detail-value text-red">
                    contact@venusgeo.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="icon-red-outline">
                  <MapPin size={18} />
                </span>
                <div>
                  <div className="detail-label">Headquarters</div>
                  <div className="detail-value">
                    3750 NW 87th Avenue, Suite 700<br />
                    Doral, Florida 33166, USA
                  </div>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="icon-red-outline">
                  <Phone size={18} />
                </span>
                <div>
                  <div className="detail-label">Direct Communication</div>
                  <div className="detail-value">Enterprise Inquiries & Engagements</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Validated Contact Form */}
          <div className="contact-form-wrapper card-panel">
            <h3 className="form-title">Send a Direct Inquiry</h3>
            <p className="form-subtitle">Fill in your requirements to trigger direct routing to our engineering leads.</p>

            <form onSubmit={handleSubmit} noValidate className="contact-form">
              <div className="form-field">
                <label htmlFor="contact-name" className="field-label">Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  className={`field-input ${errors.name ? 'field-error' : ''}`}
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  required
                />
                {errors.name && <span className="error-text"><AlertCircle size={13} /> {errors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-email" className="field-label">Business Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  className={`field-input ${errors.email ? 'field-error' : ''}`}
                  placeholder="e.g. name@company.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  required
                />
                {errors.email && <span className="error-text"><AlertCircle size={13} /> {errors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-subject" className="field-label">Subject *</label>
                <input
                  id="contact-subject"
                  type="text"
                  className={`field-input ${errors.subject ? 'field-error' : ''}`}
                  placeholder="e.g. Document AI enterprise integration"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: '' });
                  }}
                  required
                />
                {errors.subject && <span className="error-text"><AlertCircle size={13} /> {errors.subject}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="field-label">Project Scope & Requirements *</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className={`field-input field-textarea ${errors.message ? 'field-error' : ''}`}
                  placeholder="Describe your current systems, objectives, or required delivery timeline..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  required
                />
                {errors.message && <span className="error-text"><AlertCircle size={13} /> {errors.message}</span>}
              </div>

              {submittedStatus === 'preparing-email' && (
                <div className="email-status-box" role="status">
                  <CheckCircle2 size={16} className="text-red" />
                  <span>Opening your email client to dispatch to contact@venusgeo.com...</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
              >
                <span>Talk to Our Team</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--surface-white);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 48px;
          align-items: flex-start;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .contact-headline {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 12px;
          line-height: 1.12;
        }

        .contact-copy {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.55;
          letter-spacing: var(--tracking-body);
          margin-bottom: 36px;
        }

        .contact-details-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .detail-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .detail-value {
          font-size: 0.9375rem;
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.45;
          letter-spacing: var(--tracking-body);
        }

        .contact-form-wrapper {
          padding: 36px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
        }

        @media (max-width: 600px) {
          .contact-form-wrapper {
            padding: 24px 18px;
          }
        }

        .form-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
          letter-spacing: var(--tracking-body);
          margin-bottom: 24px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: var(--tracking-button);
          color: var(--text-primary);
        }

        .field-input {
          padding: 11px 14px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--button-radius);
          background-color: var(--surface-white);
          font-size: 0.9375rem;
          color: var(--text-primary);
          letter-spacing: var(--tracking-body);
          transition: border-color var(--transition-quick);
        }

        .field-input:focus {
          border-color: var(--brand-red);
          outline: none;
        }

        .field-input.field-error {
          border-color: var(--action-red);
        }

        .field-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .error-text {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: var(--action-red);
          font-weight: 500;
        }

        .email-status-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background-color: rgba(237, 27, 36, 0.06);
          border: 1px solid rgba(237, 27, 36, 0.2);
          border-radius: var(--button-radius);
          font-size: 0.8125rem;
          color: var(--text-primary);
        }

        .submit-btn {
          margin-top: 8px;
          padding: 12px;
          width: 100%;
          font-size: 0.9375rem;
        }
      `}</style>
    </section>
  );
};
