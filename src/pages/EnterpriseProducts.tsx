import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  mobilityHomeContent,
  iotContent,
  mobilityFormsContent
} from '../data/mobilityContent';
import {
  products,
  enterpriseProductGroups,
  type ProductItem,
  type ProductPdf
} from '../data/products';
import {
  CheckCircle,
  Smartphone,
  Radio,
  Send,
  Building,
  Clock,
  Briefcase,
  ArrowRight,
  ExternalLink,
  X,
  CheckCircle2,
  FileText,
  Eye,
  Download,
  Mail
} from 'lucide-react';
import { GatedPdfDownload } from '../components/GatedPdfDownload';
import { gsap, prefersReducedMotion } from '../utils/animations';

export const EnterpriseProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [previewPdf, setPreviewPdf] = useState<ProductPdf | null>(null);
  const [gatedProduct, setGatedProduct] = useState<ProductItem | null>(null);
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

  useEffect(() => {
    document.title = 'Enterprise Products | Venusgeo';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Explore Venusgeo enterprise products across cruise and hospitality, healthcare, telecom and connected business operations.'
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://venusgeo.com/enterprise-products');

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }

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

      // Case studies & Products grids
      const caseGrids = pageRef.current?.querySelectorAll('.cases-grid');
      caseGrids?.forEach((grid) => {
        gsap.from(grid.querySelectorAll('.case-card'), {
          scrollTrigger: {
            trigger: grid,
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          y: 12,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power2.out'
        });
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
      `[Enterprise Products - ${activeFormTab === 'build' ? 'Build with us' : 'Use our resource'}] ${formData.subject}`
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
      <div className="mobility-subnav" aria-label="Enterprise Products sections navigation">
        <div className="container subnav-inner">
          <button type="button" onClick={() => scrollToSubAnchor('mobility')} className="subnav-link">
            Overview
          </button>
          <button type="button" onClick={() => scrollToSubAnchor('products')} className="subnav-link">
            Products
          </button>
          <button type="button" onClick={() => scrollToSubAnchor('emp')} className="subnav-link">
            Quick View
          </button>
          <button type="button" onClick={() => scrollToSubAnchor('tech-stacks')} className="subnav-link">
            Tech Stacks
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
                  <span>Enterprise Products Division</span>
                </div>

                <h1 className="banner-title">{mobilityHomeContent.hero.title}</h1>
                <p className="banner-subtitle">
                  25+ Years of dedication, building enterprise products and transforming legacy applications
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
                  <div className="stat-label">Products</div>
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
                    <h3 className="trust-title">Why large Enterprises and Startups Trust Our Enterprise Products Expertise</h3>
                  </div>
                </div>
                <p className="trust-text">{mobilityHomeContent.hero.trustText}</p>
              </div>

              <div className="tob-card card-panel">
                <div className="tob-badge">TOB’s</div>
                <h4 className="tob-heading">Transfer Operate Build</h4>
                <p className="tob-desc">Our team have mastered, how to build enterprise products over coming CAPEX &amp; OPEX barriers</p>
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

        {/* ========================================================================= */}
        {/* SECTION: HOMEPAGE PRODUCTS SHOWCASED MINIMALLY                           */}
        {/* ========================================================================= */}
        <section id="products" className="section mobility-products-section" aria-label="Enterprise Product Portfolio">
          <div className="container">
            <div className="section-intro-block card-panel">
              <h2 className="eyebrow" style={{ margin: 0 }}>Enterprise Product Portfolio</h2>
            </div>

            {/* THREE INDUSTRY GROUPS */}
            <div className="portfolio-groups-wrapper">
              {enterpriseProductGroups.map((group) => {
                const groupProducts = group.productIds
                  .map((id) => products.find((p) => p.id === id))
                  .filter(Boolean) as ProductItem[];

                return (
                  <div
                    key={group.id}
                    id={`portfolio-group-${group.id}`}
                    className="portfolio-group-container card-panel"
                  >
                    {/* Header with Red Dot & Semantic H3 */}
                    <div className="portfolio-group-header">
                      <div className="portfolio-group-title-row">
                        <span className="group-header-dot" aria-hidden="true" />
                        <h3 className="portfolio-group-title">{group.industry}</h3>
                      </div>
                      {group.id === 'cruise-hospitality' && (
                        <div className="cruise-journey-intro">
                          <p className="journey-lead">Products for the complete passenger movement journey.</p>
                          <p className="journey-sub">
                            From terminal check-in to ship access, onboard safety and final departure, Venusgeo builds digital products that help cruise operations move more smoothly.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Products Grid inside this Industry Group */}
                    <div className="cases-grid" role="list">
                      {groupProducts.map((prod) => {
                        const displayName =
                          prod.id === 'dr-queues'
                            ? 'DrQueues'
                            : prod.name;
                        const displayAction =
                          prod.id === 'dr-queues'
                            ? 'Explore DrQueues'
                            : prod.actionText;

                        return (
                          <div
                            key={prod.id}
                            className="case-card card-panel"
                            id={`mobility-prod-${prod.id}`}
                            role="listitem"
                          >
                            <div className="case-media">
                              <img
                                src={prod.image}
                                alt={prod.imageAlt || `${displayName} interface`}
                                className="case-img"
                                loading="lazy"
                              />
                              <span className="case-tag">{prod.industry}</span>
                            </div>
                            <div className="case-body">
                              <h4 className="case-title">{displayName}</h4>
                              {prod.shortBenefit && (
                                <p className="case-headline">{prod.shortBenefit}</p>
                              )}
                              <p className="case-desc">{prod.description}</p>
                              <div className="case-action-row">
                                <a
                                  href={
                                    prod.destinationType === 'external'
                                      ? prod.url
                                      : `/#card-${prod.id}`
                                  }
                                  target={
                                    prod.destinationType === 'external' ? '_blank' : undefined
                                  }
                                  rel={
                                    prod.destinationType === 'external'
                                      ? 'noopener noreferrer'
                                      : undefined
                                  }
                                  onClick={(e) => {
                                    if (prod.destinationType === 'internal-panel') {
                                      e.preventDefault();
                                      setSelectedProduct(prod);
                                    }
                                  }}
                                  className="case-explore-link"
                                  aria-label={`Explore ${displayName}`}
                                >
                                  <span>{displayAction}</span>
                                  {prod.destinationType === 'external' ? (
                                    <ExternalLink size={13} />
                                  ) : (
                                    <ArrowRight size={13} />
                                  )}
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick View & Case Studies */}
        <section id="emp" className="section emp-section">
          <div className="container">
            <div className="section-intro-block card-panel">
              <span className="eyebrow">Quick View</span>
              <h2 className="section-title">{mobilityHomeContent.hero.empTitle}</h2>
              <p className="section-lead">{mobilityHomeContent.hero.empDescription}</p>
            </div>

            {/* Substantive Case Studies */}
            <div className="cases-grid">
              {mobilityHomeContent.engagement.cases.map((cs, idx) => {
                const isFirstTelecom = cs.title === 'Device Check';
                return (
                  <React.Fragment key={cs.title || idx}>
                    {isFirstTelecom && (
                      <div id="telecom-productization-divider" className="telecom-expertise-divider">
                        <span className="telecom-divider-dot"></span>
                        <span className="telecom-divider-label">TELECOM PRODUCTIZATION</span>
                      </div>
                    )}
                    <div className="case-card card-panel">
                      {cs.image ? (
                        <div className="case-media">
                          <img
                            src={cs.image}
                            alt={cs.imageAlt || cs.title}
                            className="case-img"
                            loading="lazy"
                          />
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
                  </React.Fragment>
                );
              })}
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
                      alt={`Venusgeo Enterprise IoT Architecture Diagram ${idx + 1}`}
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
                  What is that you would require from Venusgeo Enterprise Products Team
                </h2>
                <p className="engagement-lead">
                  Customers choosing Venusgeo Enterprise Products Team, to build their solution as a Product or as a Project, gives them the option to choose between, Build with us or Use our resource from our expertise pool to build.
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
        {/* Accessible Detail Modal for Process Products */}
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

            <div className="modal-media">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="modal-img"
              />
            </div>

            <div className="modal-body">
              <p className="modal-overview">{selectedProduct.process.intro}</p>
              {selectedProduct.process.fullDescription && (
                <p className="modal-overview" style={{ marginTop: '10px' }}>
                  {selectedProduct.process.fullDescription}
                </p>
              )}

              {/* What the Product Supports / Manages */}
              {selectedProduct.process.capabilities && selectedProduct.process.capabilities.length > 0 && (
                <div className="modal-spec-block">
                  <h4 className="spec-heading">What the Product Supports</h4>
                  <div className="capabilities-spec-grid">
                    {selectedProduct.process.capabilities.map((cap, i) => {
                      const isObj = typeof cap === 'object' && cap !== null;
                      const title = isObj ? cap.title : cap;
                      const desc = isObj ? cap.desc : '';
                      return (
                        <div key={i} className="capability-spec-card">
                          <div className="cap-card-header">
                            <span className="cap-accent-dot" aria-hidden="true" />
                            <h5 className="cap-title">{title}</h5>
                          </div>
                          {desc && <p className="cap-desc">{desc}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Process Workflow Section */}
              <div className="modal-spec-block">
                <h4 className="spec-heading">Operational Process</h4>

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

                <div className="process-cards-grid">
                  {selectedProduct.process.steps.map((st) => (
                    <div key={st.step} className="process-step-card card-panel-subtle">
                      <div className="step-card-top">
                        <span className="step-num">{st.step}</span>
                        <span className="step-accent-bar" aria-hidden="true" />
                      </div>
                      <h5 className="process-step-name">{st.title}</h5>
                      {st.desc && <p className="process-step-details">{st.desc}</p>}
                    </div>
                  ))}
                </div>

                <div className="mobile-process-stepper">
                  {selectedProduct.process.steps.map((st) => (
                    <div key={st.step} className="mobile-stepper-box">
                      <span className="mobile-step-num">{st.step}</span>
                      <div className="mobile-step-body">
                        <span className="mobile-step-title">{st.title}</span>
                        {st.desc && <span className="mobile-step-desc">{st.desc}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedProduct.process.supportingStatement && (
                  <div className="process-supporting-banner">
                    <span className="supporting-banner-dot" aria-hidden="true" />
                    <span>{selectedProduct.process.supportingStatement}</span>
                  </div>
                )}
              </div>

              {/* Operational Results / Benefits */}
              {selectedProduct.process.benefits && selectedProduct.process.benefits.length > 0 && (
                <div className="modal-spec-block">
                  <h4 className="spec-heading">Operational Result</h4>
                  <div className="operational-results-list">
                    {selectedProduct.process.benefits.map((benefit, i) => (
                      <div key={i} className="result-item">
                        <span className="result-check">✓</span>
                        <span className="result-text">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <a
                href="#engagement"
                onClick={() => setSelectedProduct(null)}
                className="btn btn-primary modal-inquire-btn"
              >
                <Mail size={15} />
                <span>Inquire About {selectedProduct.name}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Enterprise Products with detail */}
      {selectedProduct && selectedProduct.detail && (
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
            <div className="modal-header">
              <div className="modal-header-text">
                <span className="modal-badge">{selectedProduct.industry}</span>
                <div className="modal-eyebrow">
                  {selectedProduct.detail.eyebrow || 'PRODUCT OVERVIEW'}
                </div>
                <h3 id="modal-title" className="modal-title">{selectedProduct.name}</h3>
                <p className="modal-subtitle">
                  {selectedProduct.detail.headline || selectedProduct.shortBenefit}
                </p>
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

            <div className="modal-media">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="modal-img"
              />
            </div>

            <div className="modal-body">
              <p className="modal-overview">{selectedProduct.detail.overview}</p>

              {selectedProduct.detail.features && (
                <div className="modal-spec-block">
                  <h4 className="spec-heading">Key Features & Capabilities</h4>
                  <ul className="spec-list">
                    {selectedProduct.detail.features.map((feature, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className="spec-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProduct.detail.useCases && (
                <div className="modal-spec-block">
                  <h4 className="spec-heading">Enterprise Use Cases</h4>
                  <ul className="spec-list">
                    {selectedProduct.detail.useCases.map((uc, idx) => (
                      <li key={idx}>
                        <span className="bullet-dash">—</span>
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProduct.detail.technicalHighlights && (
                <div className="modal-spec-block">
                  <h4 className="spec-heading">Technical Highlights</h4>
                  <ul className="spec-list technical-list">
                    {selectedProduct.detail.technicalHighlights.map((tech, idx) => (
                      <li key={idx}>
                        <span className="bullet-dot" />
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProduct.pdf && (
                <div className="modal-presentation-panel">
                  <div className="presentation-meta">
                    <FileText size={18} className="text-red" />
                    <div>
                      <h5 className="pres-title">{selectedProduct.pdf.title}</h5>
                      <p className="pres-desc">{selectedProduct.pdf.subtitle}</p>
                    </div>
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
            </div>

            <div className="modal-footer">
              <a
                href="#engagement"
                onClick={() => setSelectedProduct(null)}
                className="btn btn-primary modal-inquire-btn"
              >
                <Mail size={15} />
                <span>Inquire About {selectedProduct.name}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {previewPdf && (
        <div
          className="modal-overlay pdf-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-modal-title"
          onClick={() => setPreviewPdf(null)}
        >
          <div
            className="pdf-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pdf-modal-header">
              <div className="pdf-header-meta">
                <FileText size={18} className="text-red" />
                <div>
                  <h4 id="pdf-modal-title" className="pdf-title">{previewPdf.title}</h4>
                  <span className="pdf-sub">{previewPdf.subtitle}</span>
                </div>
              </div>
              <div className="pdf-header-actions">
                <a
                  href={previewPdf.url}
                  download={previewPdf.fileName}
                  className="btn btn-secondary btn-sm"
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setPreviewPdf(null)}
                  aria-label="Close PDF viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="pdf-modal-body">
              <iframe
                src={`${previewPdf.url}#toolbar=0`}
                title={previewPdf.title}
                className="pdf-frame"
              />
            </div>
          </div>
        </div>
      )}

      {/* Gated PDF Download Form Modal */}
      {gatedProduct && gatedProduct.pdf && (
        <GatedPdfDownload
          product={gatedProduct}
          onClose={() => setGatedProduct(null)}
        />
      )}
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
            padding: 24px 20px;
            margin-bottom: 24px;
          }
        }

        @media (max-width: 480px) {
          .mobility-hero-banner {
            padding: 20px 16px;
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
          .banner-subtitle {
            font-size: 0.95rem;
            line-height: 1.55;
            margin-bottom: 24px;
          }
          .banner-actions {
            flex-direction: column;
            gap: 10px;
            margin-bottom: 28px;
          }
          .banner-actions .btn {
            width: 100%;
            justify-content: center;
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
            gap: 16px 12px;
            padding-top: 24px;
          }
        }

        @media (max-width: 480px) {
          .stats-strip {
            gap: 14px 10px;
            padding-top: 20px;
          }
          .stat-value {
            font-size: 1.5rem !important;
          }
          .stat-label {
            font-size: 0.75rem !important;
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

        @media (max-width: 768px) {
          .trust-info, .tob-card {
            padding: 22px 18px;
          }
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

        @media (max-width: 600px) {
          .tob-points {
            grid-template-columns: 1fr;
            gap: 8px;
          }
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

        @media (max-width: 768px) {
          .section-intro-block {
            padding: 22px 18px;
            margin-bottom: 28px;
          }
          .section-lead {
            font-size: 0.95rem !important;
            line-height: 1.55 !important;
          }
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

        @media (max-width: 768px) {
          .cases-header-block {
            margin-bottom: 24px;
          }
          .cases-heading {
            font-size: 1.35rem !important;
          }
          .cases-intro {
            font-size: 0.95rem !important;
            line-height: 1.55 !important;
          }
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
            gap: 16px;
          }
        }

        .telecom-expertise-divider {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 36px;
          margin-top: 8px;
          margin-bottom: 4px;
          border-top: 1px solid var(--border-subtle);
        }

        .telecom-divider-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .telecom-divider-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-pill);
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .case-card {
          background-color: var(--surface-white);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 220ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .case-card:hover {
          transform: translateY(-4px);
          border-color: #cacace;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
        }

        .case-media {
          position: relative;
          width: 100%;
          height: 195px;
          background-color: #eeeff2;
          overflow: hidden;
        }

        .case-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .case-card:hover .case-img {
          transform: scale(1.04);
        }

        .case-media-placeholder {
          position: relative;
          width: 100%;
          height: 140px;
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
          top: 12px;
          left: 12px;
          background-color: rgba(18, 18, 20, 0.85);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #ffffff;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: var(--tracking-pill);
          padding: 4px 10px;
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          z-index: 2;
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

        .case-headline {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--brand-red);
          line-height: 1.4;
          margin: 0 0 8px 0;
        }

        .case-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.55;
          letter-spacing: var(--tracking-body);
        }

        .mobility-products-section {
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .case-action-row {
          margin-top: auto;
          padding-top: 16px;
        }

        .case-explore-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--brand-red);
          text-decoration: none;
          transition: gap var(--transition-quick), color var(--transition-quick);
        }

        .case-explore-link:hover {
          color: #b80000;
          gap: 9px;
        }

        /* Tech Stacks */
        .tech-stack-section {
          background-color: var(--surface-soft);
        }

        .tech-stack-section .section-intro-block {
          padding: 0;
          background: transparent;
          margin-bottom: 28px;
          border: none;
          width: 100%;
        }

        .tech-stack-section .eyebrow {
          margin-bottom: 12px;
        }

        .tech-stack-section .section-title {
          font-size: clamp(2rem, 3.2vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 14px;
          color: var(--text-primary);
          max-width: 980px;
        }

        .tech-stack-section .section-lead {
          font-size: 1.125rem;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 980px;
          letter-spacing: -0.01em;
          margin-bottom: 0;
        }

        .tech-categories-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .tech-categories-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .tech-category-card {
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius-sm, 12px);
          padding: 24px 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .tech-category-card:hover {
          transform: translateY(-2px);
          border-color: #d1d1d8;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }

        .tech-cat-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--brand-red);
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .tech-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #1e1e24;
          background-color: #f7f7f9;
          border: 1px solid #e6e6eb;
          padding: 6px 12px;
          border-radius: 6px;
          line-height: 1.35;
          transition: background-color var(--transition-quick), border-color var(--transition-quick), color var(--transition-quick);
        }

        .tech-badge:hover {
          background-color: var(--surface-white);
          border-color: #d0d0d8;
          color: var(--text-primary);
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

        @media (max-width: 768px) {
          .iot-banner {
            padding: 22px 18px;
            margin-bottom: 24px;
          }
          .iot-subtitle {
            font-size: 0.95rem !important;
            line-height: 1.55 !important;
            margin-bottom: 20px !important;
          }
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

        @media (max-width: 768px) {
          .empower-block {
            padding: 22px 18px;
            margin-bottom: 24px;
          }
          .empower-heading {
            font-size: 1.2rem !important;
          }
          .empower-text {
            font-size: 0.875rem !important;
            line-height: 1.55 !important;
          }
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

        @media (max-width: 768px) {
          .iot-journey-block {
            margin-bottom: 24px;
          }
          .journey-heading {
            font-size: 1.2rem !important;
          }
          .journey-intro {
            font-size: 0.875rem !important;
            line-height: 1.55 !important;
            margin-bottom: 16px !important;
          }
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
            gap: 12px;
          }
        }

        .iot-module-card {
          background-color: var(--surface-white);
          padding: 24px;
        }

        @media (max-width: 600px) {
          .iot-module-card {
            padding: 18px 16px;
          }
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

        @media (max-width: 768px) {
          .iot-continuum-block {
            padding: 22px 18px;
          }
          .continuum-heading {
            font-size: 1.2rem !important;
          }
          .continuum-desc {
            font-size: 0.875rem !important;
            line-height: 1.55 !important;
            margin-bottom: 20px !important;
          }
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
            gap: 14px;
            margin-bottom: 24px;
          }
        }

        .iot-spec-col {
          background-color: var(--surface-soft);
          padding: 20px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
        }

        @media (max-width: 600px) {
          .iot-spec-col {
            padding: 16px 14px;
          }
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
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .engagement-wrapper {
            padding: 20px 16px;
            gap: 24px;
          }
          .engagement-main-heading {
            font-size: 1.25rem !important;
          }
          .engagement-lead {
            font-size: 0.875rem !important;
            line-height: 1.55 !important;
            margin-bottom: 20px !important;
          }
          .office-card {
            padding: 16px 14px !important;
            gap: 12px !important;
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
          flex-shrink: 0;
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
          gap: 4px;
        }

        .toggle-btn {
          flex: 1;
          padding: 10px 8px;
          min-height: 42px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: var(--tracking-button);
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          color: var(--text-secondary);
          transition: all var(--transition-quick);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
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
          min-height: 44px;
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
          min-height: 44px;
          width: 100%;
        }

        /* Industry Groups Wrapper & Containers */
        .portfolio-groups-wrapper {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .portfolio-group-container {
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          padding: 32px 32px 36px 32px;
          box-shadow: var(--shadow-subtle);
          position: relative;
        }

        .portfolio-group-header {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .portfolio-group-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .group-header-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .portfolio-group-title {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: var(--tracking-pill, 0.08em);
          text-transform: uppercase;
          color: var(--text-primary);
          margin: 0;
        }

        .cruise-journey-intro {
          padding: 12px 16px;
          background: linear-gradient(135deg, rgba(237, 27, 36, 0.04) 0%, rgba(255, 255, 255, 0.9) 100%);
          border-left: 3px solid var(--brand-red);
          border-radius: 0 8px 8px 0;
          border-top: 1px solid rgba(237, 27, 36, 0.1);
          border-right: 1px solid rgba(237, 27, 36, 0.1);
          border-bottom: 1px solid rgba(237, 27, 36, 0.1);
        }

        .journey-lead {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px 0;
          letter-spacing: -0.01em;
        }

        .journey-sub {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
        }

        @media (max-width: 992px) {
          .portfolio-groups-wrapper {
            gap: 32px;
          }
          .portfolio-group-container {
            padding: 24px 20px 28px 20px;
          }
        }

        @media (max-width: 600px) {
          .portfolio-groups-wrapper {
            gap: 24px;
          }
          .portfolio-group-container {
            padding: 20px 16px 24px 16px;
          }
          .portfolio-group-header {
            margin-bottom: 16px;
            padding-bottom: 12px;
          }
        }

        /* Modal Base & Overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(10, 10, 12, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: modalFadeIn 220ms ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content.cruise-product-modal {
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: 12px;
          max-width: 820px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
          animation: modalScaleUp 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalScaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 28px 18px 28px;
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          background-color: var(--surface-white);
          z-index: 10;
        }

        .modal-badge {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: var(--tracking-pill);
          text-transform: uppercase;
          color: var(--brand-red);
          background-color: rgba(237, 27, 36, 0.08);
          border: 1px solid rgba(237, 27, 36, 0.2);
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 6px;
        }

        .modal-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .modal-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: background-color 150ms ease, color 150ms ease;
        }

        .modal-close-btn:hover {
          background-color: var(--surface-soft);
          color: var(--text-primary);
        }

        .modal-media {
          width: 100%;
          height: 240px;
          background-color: var(--surface-soft);
          overflow: hidden;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-body {
          padding: 24px 28px;
        }

        .modal-overview {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .modal-spec-block {
          margin-bottom: 24px;
        }

        .spec-heading {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .spec-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .spec-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .spec-icon {
          color: var(--brand-red);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .bullet-dash {
          color: var(--brand-red);
          font-weight: 700;
          flex-shrink: 0;
        }

        .bullet-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
          margin-top: 7px;
        }

        .workflow-linear-strip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          margin-bottom: 16px;
          overflow-x: auto;
        }

        .workflow-linear-node {
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .node-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
        }

        .node-text {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }

        .node-arrow {
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .process-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .process-step-card {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 14px 12px;
        }

        .step-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .step-num {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-red);
        }

        .step-accent-bar {
          width: 16px;
          height: 2px;
          background-color: var(--brand-red);
          border-radius: 2px;
        }

        .process-step-name {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .process-step-details {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        .mobile-process-stepper {
          display: none;
        }

        @media (max-width: 640px) {
          .workflow-linear-strip, .process-cards-grid {
            display: none;
          }
          .mobile-process-stepper {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 16px;
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
            margin-bottom: 2px;
          }
          .mobile-step-desc {
            font-size: 0.75rem;
            color: var(--text-secondary);
            line-height: 1.4;
            margin: 0;
          }
        }

        .process-supporting-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-primary);
          padding: 8px 12px;
          background-color: #ffffff;
          border: 1px dashed var(--border-card);
          border-radius: 6px;
          margin-top: 12px;
        }

        .supporting-banner-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        /* What the Product Supports Grid */
        .capabilities-spec-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 8px;
          margin-bottom: 20px;
        }

        @media (max-width: 640px) {
          .capabilities-spec-grid {
            grid-template-columns: 1fr;
          }
        }

        .capability-spec-card {
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 12px 14px;
          transition: border-color var(--transition-quick), background-color var(--transition-quick);
        }

        .capability-spec-card:hover {
          border-color: #cbd5e1;
          background-color: #f8fafc;
        }

        .cap-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .cap-accent-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .cap-title {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin: 0;
        }

        .cap-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
          padding-left: 14px;
        }

        /* Operational Result Benefits List */
        .operational-results-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          padding: 10px 14px;
        }

        .result-check {
          font-size: 0.875rem;
          font-weight: 800;
          color: #16a34a;
          background-color: #dcfce7;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          line-height: 1;
        }

        .result-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .modal-presentation-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 18px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          margin-top: 20px;
        }

        .presentation-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pres-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 2px 0;
        }

        .pres-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
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
          padding: 8px 12px;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        @media (max-width: 640px) {
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

        .modal-footer {
          padding: 16px 28px;
          background-color: var(--surface-soft);
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: flex-end;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .modal-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-subtle);
          background-color: var(--surface-white);
        }

        .pdf-header-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pdf-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .pdf-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .pdf-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pdf-modal-body {
          flex: 1;
          background-color: #525659;
          position: relative;
        }

        .pdf-frame {
          width: 100%;
          height: 100%;
          border: none;
        }

      `}</style>
    </div>
  );
};
