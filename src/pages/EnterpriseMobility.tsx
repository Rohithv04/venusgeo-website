import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  mobilityHomeContent,
  xamarinContent,
  iotContent,
  mobilityFormsContent
} from '../data/mobilityContent';
import {
  CheckCircle,
  Smartphone,
  Radio,
  Send,
  Building,
  Clock,
  Briefcase
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../utils/animations';

export const EnterpriseMobility: React.FC = () => {
  const [activeFormTab, setActiveFormTab] = useState<'build' | 'resource'>('build');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    scope: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (prefersReducedMotion() || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Mobility Hero Banner animation
      gsap.from('.mobility-hero-banner', {
        y: 12,
        duration: 0.45,
        ease: 'power2.out'
      });

      // Trust cards
      gsap.from('.trust-grid > *', {
        scrollTrigger: {
          trigger: '.trust-grid',
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        y: 12,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      });

      // Case studies
      gsap.from('.cases-grid .case-card', {
        scrollTrigger: {
          trigger: '.cases-grid',
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        y: 12,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      });

      // Tech categories
      gsap.from('.tech-categories-grid .tech-category-card', {
        scrollTrigger: {
          trigger: '.tech-categories-grid',
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        y: 12,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power2.out'
      });

      // Xamarin section
      gsap.from('.xamarin-banner, .xamarin-choice-block', {
        scrollTrigger: {
          trigger: '.xamarin-section',
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        y: 12,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      });

      // IoT section
      gsap.from('.iot-banner, .empower-block', {
        scrollTrigger: {
          trigger: '.iot-section',
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        y: 12,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      });

      // Engagement section
      gsap.from('.engagement-wrapper', {
        scrollTrigger: {
          trigger: '.engagement-section',
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        y: 12,
        duration: 0.4,
        ease: 'power2.out'
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const recipient = activeFormTab === 'build' ? 'contact@venusgeo.com' : 'contact@venusgeo.com';
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(
      `[Enterprise Mobility - ${activeFormTab === 'build' ? 'Build with us' : 'Use our resource'}] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMode: ${
        activeFormTab === 'build' ? 'Build with us (Outsourced end-to-end)' : 'Use our resource (Expertise pool)'
      }\n\nScope:\n${formData.scope}`
    )}`;
    window.location.href = mailto;
  };

  const scrollToSubAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={pageRef} className="page-wrapper mobility-page-root">
      <Header />

      {/* Subnav for In-Page Section Anchor Jumping */}
      <div className="mobility-subnav" aria-label="Mobility sections navigation">
        <div className="container subnav-inner">
          <button type="button" onClick={() => scrollToSubAnchor('mobility')} className="subnav-link">
            Mobility Overview
          </button>
          <button type="button" onClick={() => scrollToSubAnchor('emp')} className="subnav-link">
            EMP & Cases
          </button>
          <button type="button" onClick={() => scrollToSubAnchor('tech-stacks')} className="subnav-link">
            Tech Stacks
          </button>
          <button type="button" onClick={() => scrollToSubAnchor('xamarin')} className="subnav-link">
            Xamarin & MAUI
          </button>
          <button type="button" onClick={() => scrollToSubAnchor('iot')} className="subnav-link">
            Enterprise IoT
          </button>
          <button type="button" onClick={() => scrollToSubAnchor('engagement')} className="subnav-link subnav-cta">
            Engagement & Contact
          </button>
        </div>
      </div>

      <main id="main-content">
        {/* ========================================================================= */}
        {/* SECTION 1: MOBILITY HOMEPAGE CONTENT                                      */}
        {/* ========================================================================= */}
        <section id="mobility" className="section mobility-hero-section">
          <div className="container">
            <div className="mobility-hero-banner card-panel">
              <div className="hero-banner-inner">
                <div className="banner-badge">
                  <Smartphone size={15} />
                  <span>Enterprise Mobility Division</span>
                </div>

                <h1 className="banner-title">{mobilityHomeContent.hero.title}</h1>
                <p className="banner-subtitle">
                  25+ Years of dedication, building enterprise mobile apps and transforming legacy applications
                </p>

                <div className="banner-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFormTab('build');
                      scrollToSubAnchor('engagement');
                    }}
                    className="btn btn-primary"
                  >
                    Build with Us
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFormTab('resource');
                      scrollToSubAnchor('engagement');
                    }}
                    className="btn btn-secondary"
                  >
                    Use our resource
                  </button>
                </div>
              </div>

              {/* Stats Strip with 25+ Years */}
              <div className="stats-strip">
                <div className="stat-card">
                  <div className="stat-value">25+</div>
                  <div className="stat-label">Mobile Apps</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">500+</div>
                  <div className="stat-label">functional scopes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">25+</div>
                  <div className="stat-label">Years of Experience</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">TOB’s</div>
                  <div className="stat-label">Transfer Operate Build</div>
                </div>
              </div>
            </div>

            {/* Why Large Enterprises Trust Us */}
            <div className="trust-grid">
              <div className="trust-info card-panel">
                <div className="trust-header">
                  <div className="trust-icon-box">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="trust-eyebrow">25+ Years of Experience</span>
                    <h3 className="trust-title">Why large Enterprises and Startups Trust Our Enterprise Mobility Expertise</h3>
                  </div>
                </div>
                <p className="trust-text">{mobilityHomeContent.hero.trustText}</p>
              </div>

              <div className="tob-card card-panel">
                <div className="tob-badge">TOB’s</div>
                <h4 className="tob-heading">Transfer Operate Build</h4>
                <p className="tob-desc">Our team have mastered, how to build enterprise apps over coming barriers</p>
                <div className="tob-points">
                  {mobilityHomeContent.hero.tobPoints.map((pt, i) => (
                    <div key={i} className="tob-pill">
                      <CheckCircle size={14} className="tob-check" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMP Expertise & Case Studies */}
        <section id="emp" className="section emp-section">
          <div className="container">
            <div className="section-intro-block card-panel">
              <span className="eyebrow">Productization Expertise</span>
              <h2 className="section-title">{mobilityHomeContent.hero.empTitle}</h2>
              <p className="section-lead">{mobilityHomeContent.hero.empDescription}</p>
            </div>

            <div className="cases-header-block">
              <h2 className="cases-heading">{mobilityHomeContent.engagement.heading}</h2>
              <p className="cases-intro">{mobilityHomeContent.engagement.intro}</p>
            </div>

            {/* Substantive Case Studies */}
            <div className="cases-grid">
              {mobilityHomeContent.engagement.cases.map((cs, idx) => (
                <div key={idx} className="case-card card-panel">
                  {cs.image ? (
                    <div className="case-media">
                      <img src={cs.image} alt={cs.title} className="case-img" loading="lazy" />
                      <span className="case-tag">{cs.tag}</span>
                    </div>
                  ) : (
                    <div className="case-media-placeholder">
                      <div className="placeholder-icon">
                        <Briefcase size={24} />
                      </div>
                      <span className="case-tag">{cs.tag}</span>
                    </div>
                  )}
                  <div className="case-body">
                    <h4 className="case-title">{cs.title}</h4>
                    <p className="case-desc">{cs.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Complete Technology Stacks */}
        <section id="tech-stacks" className="section tech-stack-section">
          <div className="container">
            <div className="section-intro-block">
              <div className="eyebrow">Enterprise Delivery Capacity</div>
              <h2 className="section-title">{mobilityHomeContent.building.heading}</h2>
              <p className="section-lead">{mobilityHomeContent.building.description}</p>
            </div>

            <div className="tech-categories-grid">
              {mobilityHomeContent.building.categories.map((cat, idx) => (
                <div key={idx} className="tech-category-card card-panel">
                  <h4 className="tech-cat-title">{cat.name}</h4>
                  <div className="tech-pills-wrap">
                    {cat.items.map((item, i) => (
                      <span key={i} className="tech-badge">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: XAMARIN & MAUI EXPERTISE MIGRATION                             */}
        {/* ========================================================================= */}
        <section id="xamarin" className="section xamarin-section">
          <div className="container">
            <div className="xamarin-banner card-panel">
              <div className="xamarin-banner-content">
                <span className="eyebrow">Microsoft .NET Specialization</span>
                <h2 className="xamarin-title">{xamarinContent.hero.title}</h2>
                <p className="xamarin-subtitle">{xamarinContent.hero.subtitle}</p>
              </div>

              {/* Exact Xamarin Stats */}
              <div className="stats-strip">
                <div className="stat-card">
                  <div className="stat-value">25+</div>
                  <div className="stat-label">Mobile Apps</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">500+</div>
                  <div className="stat-label">functional scopes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">25+</div>
                  <div className="stat-label">Years of Experience</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">TOB’s</div>
                  <div className="stat-label">Transfer Operate Build</div>
                </div>
              </div>
            </div>

            {/* Xamarin & MAUI Choice for Customers */}
            <div className="xamarin-choice-block card-panel">
              <h3 className="choice-heading">{xamarinContent.choice.heading}</h3>
              <p className="choice-para">{xamarinContent.choice.paragraph1}</p>
              <p className="choice-para highlight-para">{xamarinContent.choice.paragraph2}</p>
            </div>

            {/* Engage with Xamarin & MAUI Core Team */}
            <div className="xamarin-engage-block">
              <h3 className="engage-heading">{xamarinContent.engage.heading}</h3>
              <p className="engage-intro">{xamarinContent.engage.intro}</p>

              <div className="xamarin-cases-grid">
                {xamarinContent.engage.cases.map((cs, idx) => (
                  <div key={idx} className="xamarin-case-item card-panel">
                    <div className="xamarin-case-header">
                      <span className="icon-red-outline">
                        <Smartphone size={16} />
                      </span>
                      <h4 className="xamarin-case-title">{cs.title}</h4>
                    </div>
                    <p className="xamarin-case-desc">{cs.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Confidence & Infographic Diagram */}
            <div className="confidence-block card-panel">
              <div className="confidence-text">
                <h3 className="confidence-heading">{xamarinContent.confidence.heading}</h3>
                <p className="confidence-desc">{xamarinContent.confidence.description}</p>
                <div className="confidence-tagline">{xamarinContent.confidence.tagline}</div>
              </div>
              <div className="confidence-media">
                <img
                  src={xamarinContent.confidence.infographic}
                  alt="Xamarin & MAUI Technical Architecture Diagram"
                  className="infographic-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* What team can do for you */}
            <div className="can-do-box card-panel">
              <h3 className="can-do-title">{xamarinContent.deliverables.heading}</h3>
              <p className="can-do-text">{xamarinContent.deliverables.description}</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: ENTERPRISE IOT MIGRATION                                       */}
        {/* ========================================================================= */}
        <section id="iot" className="section iot-section">
          <div className="container">
            <div className="iot-banner card-panel">
              <div className="iot-banner-content">
                <span className="eyebrow">Asset IoT & RFID Engineering</span>
                <h2 className="iot-title">{iotContent.hero.title}</h2>
                <p className="iot-subtitle">{iotContent.hero.subtitle}</p>
              </div>

              {/* Exact IoT Stats */}
              <div className="stats-strip">
                <div className="stat-card">
                  <div className="stat-value">UHF HF LF</div>
                  <div className="stat-label">Application</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">Mendix</div>
                  <div className="stat-label">No Code Low Code</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">25+</div>
                  <div className="stat-label">Years of Experience</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">TOB’s</div>
                  <div className="stat-label">Transfer Operate Build</div>
                </div>
              </div>
            </div>

            {/* Empowering Product Innovation */}
            <div className="empower-block card-panel">
              <h3 className="empower-heading">{iotContent.empower.heading}</h3>
              <p className="empower-text">{iotContent.empower.description}</p>
            </div>

            {/* Journey of Working with IoT Team & Modules */}
            <div className="iot-journey-block">
              <h3 className="journey-heading">{iotContent.journey.heading}</h3>
              <p className="journey-intro">{iotContent.journey.intro}</p>

              <div className="iot-modules-grid">
                {iotContent.journey.modules.map((mod, idx) => (
                  <div key={idx} className="iot-module-card card-panel">
                    <div className="module-header">
                      <span className="icon-red-outline">
                        <Radio size={16} />
                      </span>
                      <h4 className="module-title">{mod.title}</h4>
                    </div>
                    <p className="module-desc">{mod.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Creating Solutions & Continuum / Hardware */}
            <div className="iot-continuum-block card-panel">
              <h3 className="continuum-heading">{iotContent.creating.heading}</h3>
              <p className="continuum-desc">{iotContent.creating.description}</p>

              <div className="iot-specs-columns">
                <div className="iot-spec-col">
                  <h4 className="spec-col-title">Architecture & Developer Continuum</h4>
                  <div className="spec-pills">
                    {iotContent.creating.continuum.map((item, i) => (
                      <span key={i} className="tech-badge">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="iot-spec-col">
                  <h4 className="spec-col-title">Firmware, Embedded & Cloud IoT</h4>
                  <div className="spec-pills">
                    {iotContent.creating.firmwareHardware.map((item, i) => (
                      <span key={i} className="tech-badge">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="iot-spec-col">
                  <h4 className="spec-col-title">Schematic, Hardware & Certification</h4>
                  <div className="spec-pills">
                    {iotContent.creating.pcbDesign.map((item, i) => (
                      <span key={i} className="tech-badge">{item}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Source Infographics / Diagrams */}
              <div className="iot-diagrams-grid">
                {iotContent.creating.infographics.map((diagram, idx) => (
                  <div key={idx} className="diagram-frame">
                    <img
                      src={diagram}
                      alt={`VenusGeo Enterprise IoT Architecture Diagram ${idx + 1}`}
                      className="diagram-img"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: CONSOLIDATED ENGAGEMENT & DUAL FORMS                           */}
        {/* ========================================================================= */}
        <section id="engagement" className="section engagement-section">
          <div className="container">
            <div className="engagement-wrapper card-panel">
              <div className="engagement-intro">
                <span className="eyebrow">Engagement Options</span>
                <h2 className="engagement-main-heading">
                  What is that you would require from Venusgeo Enterprise Mobility Team
                </h2>
                <p className="engagement-lead">
                  Customers choosing Venusgeo Enterprise Mobility Team, to build their solution as a Product or as a Project, gives them the option to choose between, Build with us or Use our resource from our expertise pool to build.
                </p>

                {/* Office & Direct Contact Card */}
                <div className="office-card">
                  <div className="office-icon">
                    <Building size={20} />
                  </div>
                  <div>
                    <h4 className="office-title">{mobilityFormsContent.contactOffice.title}</h4>
                    <p className="office-div">{mobilityFormsContent.contactOffice.division}</p>
                    <p className="office-addr">{mobilityFormsContent.contactOffice.address}</p>
                  </div>
                </div>
              </div>

              {/* Dual Engagement Path Form Switcher */}
              <div className="forms-container">
                <div className="form-toggle-bar">
                  <button
                    type="button"
                    className={`toggle-btn ${activeFormTab === 'build' ? 'active' : ''}`}
                    onClick={() => setActiveFormTab('build')}
                  >
                    Build with us
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${activeFormTab === 'resource' ? 'active' : ''}`}
                    onClick={() => setActiveFormTab('resource')}
                  >
                    Use our resource
                  </button>
                </div>

                <div className="active-form-description">
                  {activeFormTab === 'build' ? (
                    <p>{mobilityFormsContent.buildWithUs.description}</p>
                  ) : (
                    <p>{mobilityFormsContent.useOurResource.description}</p>
                  )}
                </div>

                <form onSubmit={handleFormSubmit} className="mobility-actual-form">
                  <div className="m-form-field">
                    <label className="m-label">Name *</label>
                    <input
                      type="text"
                      className="m-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="m-form-field">
                    <label className="m-label">Business email *</label>
                    <input
                      type="email"
                      className="m-input"
                      placeholder="Enter your business email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="m-form-field">
                    <label className="m-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="m-input"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="m-form-field">
                    <label className="m-label">Subject *</label>
                    <input
                      type="text"
                      className="m-input"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="m-form-field">
                    <label className="m-label">Short Scope *</label>
                    <textarea
                      rows={4}
                      className="m-input m-textarea"
                      placeholder={
                        activeFormTab === 'build'
                          ? 'Describe your project or product scope'
                          : 'Describe required technical skills or roles'
                      }
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      required
                    />
                  </div>

                  {formSubmitted && (
                    <div className="form-feedback-notice">
                      <CheckCircle size={16} className="text-red" />
                      <span>Opening your email client to dispatch your request to contact@venusgeo.com...</span>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary m-submit-btn">
                    <span>Submit {activeFormTab === 'build' ? 'Build with us' : 'Use our resource'} Request</span>
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .mobility-page-root {
          background-color: var(--surface-soft);
        }

        /* Subnav */
        .mobility-subnav {
          position: sticky;
          top: 74px;
          z-index: 400;
          background-color: var(--surface-white);
          border-bottom: 1px solid var(--border-subtle);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        @media (max-width: 768px) {
          .mobility-subnav {
            top: 64px;
          }
        }

        .subnav-inner {
          display: flex;
          align-items: center;
          gap: 16px;
          overflow-x: auto;
          white-space: nowrap;
          padding-top: 10px;
          padding-bottom: 10px;
          scrollbar-width: none;
        }

        .subnav-inner::-webkit-scrollbar {
          display: none;
        }

        .subnav-link {
          background: none;
          border: none;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: var(--tracking-button);
          color: var(--text-secondary);
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 4px;
          transition: background-color var(--transition-quick), color var(--transition-quick);
        }

        .subnav-link:hover {
          color: var(--brand-red);
          background-color: var(--surface-soft);
        }

        .subnav-cta {
          color: var(--brand-red);
          font-weight: 700;
          background-color: rgba(237, 27, 36, 0.06);
        }

        /* Hero Banner */
        .mobility-hero-section {
          padding-top: 48px;
          padding-bottom: 48px;
        }

        .mobility-hero-banner {
          background-color: var(--surface-white);
          padding: 48px;
          margin-bottom: 32px;
        }

        @media (max-width: 768px) {
          .mobility-hero-banner {
            padding: 24px;
          }
        }

        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          color: var(--brand-red);
          margin-bottom: 16px;
        }

        .banner-title {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 14px;
          line-height: 1.12;
          max-width: 860px;
        }

        .banner-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.55;
          letter-spacing: var(--tracking-body);
          max-width: 740px;
          margin-bottom: 32px;
        }

        .banner-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
        }

        @media (max-width: 600px) {
          .banner-actions {
            flex-direction: column;
          }
        }

        /* Stats Strip */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 768px) {
          .stats-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--brand-red);
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          font-weight: 500;
          letter-spacing: var(--tracking-pill);
        }

        /* Trust Grid */
        .trust-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--gap-grid);
        }

        @media (max-width: 860px) {
          .trust-grid {
            grid-template-columns: 1fr;
          }
        }

        .trust-info, .tob-card {
          padding: 32px;
          background-color: var(--surface-white);
        }

        .trust-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 16px;
        }

        .trust-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          background-color: rgba(237, 27, 36, 0.08);
          color: var(--brand-red);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .trust-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-red);
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
        }

        .trust-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-top: 2px;
          line-height: 1.2;
        }

        .trust-text {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          letter-spacing: var(--tracking-body);
        }

        .tob-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-red);
          background-color: rgba(237, 27, 36, 0.08);
          padding: 4px 8px;
          border-radius: 4px;
          margin-bottom: 10px;
          letter-spacing: var(--tracking-pill);
        }

        .tob-heading {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 6px;
        }

        .tob-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 18px;
          line-height: 1.5;
        }

        .tob-points {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .tob-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: var(--text-primary);
          background-color: var(--surface-soft);
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
        }

        .tob-check {
          color: var(--brand-red);
          flex-shrink: 0;
        }

        /* EMP Section */
        .emp-section {
          background-color: var(--surface-white);
        }

        .section-intro-block {
          padding: 36px;
          background-color: var(--surface-soft);
          margin-bottom: 48px;
        }

        .section-title {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 12px;
          line-height: 1.12;
        }

        .section-lead {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 800px;
          line-height: 1.55;
          letter-spacing: var(--tracking-body);
        }

        .cases-header-block {
          margin-bottom: 32px;
        }

        .cases-heading {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          margin-bottom: 8px;
        }

        .cases-intro {
          font-size: 1rem;
          color: var(--text-secondary);
          max-width: 780px;
          line-height: 1.6;
        }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--gap-grid);
        }

        @media (max-width: 992px) {
          .cases-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .cases-grid {
            grid-template-columns: 1fr;
          }
        }

        .case-card {
          background-color: var(--surface-white);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .case-media {
          position: relative;
          width: 100%;
          height: 180px;
          background-color: #f0f0f3;
        }

        .case-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .case-media-placeholder {
          position: relative;
          width: 100%;
          height: 120px;
          background-color: var(--surface-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--border-subtle);
        }

        .placeholder-icon {
          color: var(--text-muted);
        }

        .case-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(18, 18, 20, 0.78);
          color: #fff;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: var(--tracking-pill);
          padding: 3px 8px;
          border-radius: 3px;
        }

        .case-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .case-title {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 6px;
        }

        .case-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.55;
          letter-spacing: var(--tracking-body);
        }

        /* Tech Stacks */
        .tech-stack-section {
          background-color: var(--surface-soft);
        }

        .tech-categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--gap-grid);
        }

        @media (max-width: 768px) {
          .tech-categories-grid {
            grid-template-columns: 1fr;
          }
        }

        .tech-category-card {
          background-color: var(--surface-white);
          padding: 24px;
        }

        .tech-cat-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--brand-red);
          margin-bottom: 14px;
          letter-spacing: var(--tracking-title);
        }

        .tech-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-badge {
          display: inline-block;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: var(--tracking-pill);
          color: var(--text-primary);
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          padding: 5px 10px;
          border-radius: 4px;
        }

        /* Xamarin Section */
        .xamarin-section {
          background-color: var(--surface-white);
        }

        .xamarin-banner {
          background-color: var(--surface-white);
          padding: 40px;
          margin-bottom: 32px;
        }

        .xamarin-title {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 10px;
          line-height: 1.12;
        }

        .xamarin-subtitle {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }

        .xamarin-choice-block {
          padding: 32px;
          margin-bottom: 32px;
          background-color: var(--surface-soft);
        }

        .choice-heading {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 12px;
        }

        .choice-para {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
          line-height: 1.6;
          letter-spacing: var(--tracking-body);
        }

        .highlight-para {
          font-weight: 600;
          color: var(--text-primary);
          border-left: 3px solid var(--brand-red);
          padding-left: 14px;
        }

        .xamarin-engage-block {
          margin-bottom: 40px;
        }

        .engage-heading {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 8px;
        }

        .engage-intro {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 800px;
          line-height: 1.6;
        }

        .xamarin-cases-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 992px) {
          .xamarin-cases-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .xamarin-cases-grid {
            grid-template-columns: 1fr;
          }
        }

        .xamarin-case-item {
          padding: 20px;
          background-color: var(--surface-white);
        }

        .xamarin-case-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .xamarin-case-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
        }

        .xamarin-case-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .confidence-block {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
          padding: 36px;
          background-color: var(--surface-white);
          margin-bottom: 32px;
          align-items: center;
        }

        @media (max-width: 880px) {
          .confidence-block {
            grid-template-columns: 1fr;
          }
        }

        .confidence-heading {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 12px;
        }

        .confidence-desc {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .confidence-tagline {
          font-size: 1rem;
          font-weight: 700;
          color: var(--brand-red);
          letter-spacing: var(--tracking-title);
        }

        .confidence-media {
          display: flex;
          justify-content: center;
          background-color: var(--surface-soft);
          border-radius: 6px;
          padding: 16px;
          border: 1px solid var(--border-subtle);
        }

        .infographic-img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }

        .can-do-box {
          padding: 28px;
          background-color: var(--surface-soft);
        }

        .can-do-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 8px;
        }

        .can-do-text {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* IoT Section */
        .iot-section {
          background-color: var(--surface-soft);
        }

        .iot-banner {
          background-color: var(--surface-white);
          padding: 40px;
          margin-bottom: 32px;
        }

        .iot-title {
          font-size: var(--font-section-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 10px;
          line-height: 1.12;
        }

        .iot-subtitle {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }

        .empower-block {
          padding: 32px;
          background-color: var(--surface-white);
          margin-bottom: 32px;
        }

        .empower-heading {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 12px;
        }

        .empower-text {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .iot-journey-block {
          margin-bottom: 32px;
        }

        .journey-heading {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 8px;
        }

        .journey-intro {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          max-width: 800px;
          line-height: 1.6;
        }

        .iot-modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 900px) {
          .iot-modules-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .iot-modules-grid {
            grid-template-columns: 1fr;
          }
        }

        .iot-module-card {
          background-color: var(--surface-white);
          padding: 24px;
        }

        .module-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
        }

        .module-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          line-height: 1.3;
        }

        .module-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .iot-continuum-block {
          background-color: var(--surface-white);
          padding: 36px;
        }

        .continuum-heading {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 10px;
        }

        .continuum-desc {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .iot-specs-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }

        @media (max-width: 900px) {
          .iot-specs-columns {
            grid-template-columns: 1fr;
          }
        }

        .iot-spec-col {
          background-color: var(--surface-soft);
          padding: 20px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
        }

        .spec-col-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--brand-red);
          margin-bottom: 14px;
          letter-spacing: var(--tracking-title);
        }

        .spec-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .iot-diagrams-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 860px) {
          .iot-diagrams-grid {
            grid-template-columns: 1fr;
          }
        }

        .diagram-frame {
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          overflow: hidden;
          background: #fff;
        }

        .diagram-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Engagement & Dual Forms */
        .engagement-section {
          background-color: var(--surface-white);
        }

        .engagement-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          padding: 48px;
          background-color: var(--surface-white);
        }

        @media (max-width: 992px) {
          .engagement-wrapper {
            grid-template-columns: 1fr;
            padding: 28px;
          }
        }

        .engagement-main-heading {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          margin-bottom: 14px;
          line-height: 1.2;
        }

        .engagement-lead {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          letter-spacing: var(--tracking-body);
          margin-bottom: 32px;
        }

        .office-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background-color: var(--surface-soft);
          padding: 20px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
        }

        .office-icon {
          color: var(--brand-red);
          margin-top: 2px;
        }

        .office-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          margin-bottom: 2px;
        }

        .office-div {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--brand-red);
          letter-spacing: var(--tracking-pill);
          margin-bottom: 6px;
        }

        .office-addr {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        /* Form Toggle */
        .form-toggle-bar {
          display: flex;
          background-color: var(--surface-soft);
          padding: 4px;
          border-radius: 6px;
          margin-bottom: 16px;
          border: 1px solid var(--border-subtle);
        }

        .toggle-btn {
          flex: 1;
          padding: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: var(--tracking-button);
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          color: var(--text-secondary);
          transition: all var(--transition-quick);
        }

        .toggle-btn.active {
          background-color: var(--surface-white);
          color: var(--brand-red);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .active-form-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .mobility-actual-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .m-form-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .m-label {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: var(--tracking-button);
          color: var(--text-primary);
        }

        .m-input {
          padding: 11px 14px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--button-radius);
          background-color: var(--surface-soft);
          font-size: 0.9375rem;
          letter-spacing: var(--tracking-body);
        }

        .m-input:focus {
          border-color: var(--brand-red);
          background-color: var(--surface-white);
          outline: none;
        }

        .m-textarea {
          resize: vertical;
          min-height: 90px;
        }

        .form-feedback-notice {
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

        .m-submit-btn {
          margin-top: 6px;
          padding: 12px;
        }
      `}</style>
    </div>
  );
};
