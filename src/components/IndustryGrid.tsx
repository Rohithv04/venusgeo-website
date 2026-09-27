import React, { useState, useEffect, useRef } from 'react';
import { industries, type IndustryItem } from '../data/industries';
import { Landmark, HeartPulse, Radio, Ship, Store, Compass, ArrowRight, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../utils/animations';

export const IndustryGrid: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeMobileId, setActiveMobileId] = useState<string | null>('financial-services');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  // Entrance animations via GSAP ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 26,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      if (accordionRef.current) {
        gsap.from('.industry-panel', {
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 32,
          duration: 0.75,
          stagger: 0.07,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (iconName: IndustryItem['iconName']) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark size={18} strokeWidth={1.8} />;
      case 'HeartPulse':
        return <HeartPulse size={18} strokeWidth={1.8} />;
      case 'Radio':
        return <Radio size={18} strokeWidth={1.8} />;
      case 'Ship':
        return <Ship size={18} strokeWidth={1.8} />;
      case 'Store':
        return <Store size={18} strokeWidth={1.8} />;
      case 'Compass':
        return <Compass size={18} strokeWidth={1.8} />;
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePanelKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveId(activeId === id ? null : id);
    } else if (e.key === 'Escape') {
      setActiveId(null);
    }
  };

  const toggleMobile = (id: string) => {
    setActiveMobileId(activeMobileId === id ? null : id);
  };

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="section industries-section"
      aria-label="Target Industries Showcase"
    >
      <div className="container">
        {/* Section Heading */}
        <div ref={headerRef} className="industries-header">
          <div className="eyebrow">Target Industries</div>
          <h2 className="section-heading">Built around your industry.</h2>
          <p className="section-subheading">
            Technology shaped by your operations, your customers, and the demands of your business.
          </p>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP ACCORDION (6 tall vertical partitions side-by-side) */}
        {/* ========================================================= */}
        <div
          ref={accordionRef}
          className="industry-accordion"
          data-has-active={activeId !== null}
          onMouseLeave={() => setActiveId(null)}
          role="region"
          aria-label="Interactive Industry Accordion"
        >
          {industries.map((ind) => {
            const isActive = activeId === ind.id;
            return (
              <div
                key={ind.id}
                className="industry-panel"
                data-active={isActive}
                onMouseEnter={() => setActiveId(ind.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-controls={`industry-panel-content-${ind.id}`}
                aria-label={`${ind.title} industry capabilities`}
                onFocus={() => setActiveId(ind.id)}
                onKeyDown={(e) => handlePanelKeyDown(e, ind.id)}
              >
                {/* Background Full-bleed Media */}
                <div className="industry-panel-media" aria-hidden="true">
                  <img
                    src={ind.image}
                    alt=""
                    className="industry-panel-img"
                    loading="lazy"
                  />
                  {/* VenusGeo Red & Dark Gradient Overlays */}
                  <div className="industry-panel-overlay" />
                  <div className="industry-panel-vignette" />
                </div>

                {/* Identity Rail (Always visible on the left edge of each panel) */}
                <div className="industry-rail" aria-hidden="true">
                  <div className="rail-top">
                    <span className="rail-number">{ind.num}</span>
                    <div className="rail-icon-outline">
                      {getIcon(ind.iconName)}
                    </div>
                  </div>

                  <div className="rail-center">
                    <span className="rail-title">{ind.title}</span>
                  </div>

                  <div className="rail-bottom">
                    <div className={`rail-indicator ${isActive ? 'active' : ''}`}>
                      <ArrowRight size={13} className="rail-arrow" />
                    </div>
                  </div>
                </div>

                {/* Expanded Content Area (Reveals beside the vertical rail) */}
                <div
                  id={`industry-panel-content-${ind.id}`}
                  className="industry-expanded-content"
                  aria-hidden={!isActive}
                >
                  <div className="expanded-inner">
                    {/* Header */}
                    <div className="expanded-header">
                      <div className="expanded-tag">
                        <span className="expanded-tag-dot" />
                        <span>INDUSTRY EXPERTISE</span>
                      </div>
                      <h3 className="expanded-title">{ind.title}</h3>
                      <p className="expanded-desc">{ind.description}</p>
                    </div>

                    <div className="expanded-divider" />

                    {/* Three Structured Categories */}
                    <div className="expanded-capabilities">
                      <div className="capability-row">
                        <div className="capability-meta">
                          <span className="capability-num">01</span>
                          <span className="capability-title">WHAT WE’VE DELIVERED</span>
                        </div>
                        <p className="capability-text">{ind.capabilities.delivered}</p>
                      </div>

                      <div className="capability-row">
                        <div className="capability-meta">
                          <span className="capability-num">02</span>
                          <span className="capability-title">WHAT WE’RE SOLVING</span>
                        </div>
                        <p className="capability-text">{ind.capabilities.solving}</p>
                      </div>

                      <div className="capability-row">
                        <div className="capability-meta">
                          <span className="capability-num">03</span>
                          <span className="capability-title">WHAT WE CAN ENABLE</span>
                        </div>
                        <p className="capability-text">{ind.capabilities.enable}</p>
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="expanded-footer">
                      <a
                        href="#contact"
                        className="industry-panel-cta"
                        onClick={handleContactClick}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <span>Consult Our {ind.title} Specialists</span>
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* MOBILE & TABLET ACCORDION (Vertical Stacked Experience)   */}
        {/* ========================================================= */}
        <div className="industry-mobile-accordion" role="region" aria-label="Industry Accordion for Mobile">
          {industries.map((ind) => {
            const isMobileOpen = activeMobileId === ind.id;
            return (
              <div
                key={ind.id}
                className="industry-mobile-item"
                data-open={isMobileOpen}
              >
                {/* Background Image Container */}
                <div className="mobile-item-bg" aria-hidden="true">
                  <img
                    src={ind.image}
                    alt=""
                    className="mobile-item-img"
                    loading="lazy"
                  />
                  <div className="mobile-item-overlay" />
                </div>

                {/* Collapsed Header / Toggle Button */}
                <button
                  type="button"
                  className="mobile-item-header"
                  onClick={() => toggleMobile(ind.id)}
                  aria-expanded={isMobileOpen}
                  aria-controls={`mobile-content-${ind.id}`}
                >
                  <div className="mobile-header-left">
                    <span className="mobile-item-num">{ind.num}</span>
                    <div className="mobile-item-icon">
                      {getIcon(ind.iconName)}
                    </div>
                    <span className="mobile-item-title">{ind.title}</span>
                  </div>

                  <div className="mobile-header-toggle" aria-hidden="true">
                    {isMobileOpen ? (
                      <Minus size={18} className="toggle-icon active" />
                    ) : (
                      <Plus size={18} className="toggle-icon" />
                    )}
                  </div>
                </button>

                {/* Expanded Content Area */}
                <div
                  id={`mobile-content-${ind.id}`}
                  className="mobile-item-body"
                  aria-hidden={!isMobileOpen}
                >
                  <div className="mobile-body-inner">
                    <div className="mobile-badge">
                      <span className="badge-dot" />
                      <span>INDUSTRY EXPERTISE</span>
                    </div>

                    <p className="mobile-desc">{ind.description}</p>

                    <div className="mobile-divider" />

                    <div className="mobile-capabilities">
                      <div className="mobile-cap-block">
                        <div className="mobile-cap-meta">
                          <span className="cap-num">01</span>
                          <span className="cap-label">WHAT WE’VE DELIVERED</span>
                        </div>
                        <p className="cap-text">{ind.capabilities.delivered}</p>
                      </div>

                      <div className="mobile-cap-block">
                        <div className="mobile-cap-meta">
                          <span className="cap-num">02</span>
                          <span className="cap-label">WHAT WE’RE SOLVING</span>
                        </div>
                        <p className="cap-text">{ind.capabilities.solving}</p>
                      </div>

                      <div className="mobile-cap-block">
                        <div className="mobile-cap-meta">
                          <span className="cap-num">03</span>
                          <span className="cap-label">WHAT WE CAN ENABLE</span>
                        </div>
                        <p className="cap-text">{ind.capabilities.enable}</p>
                      </div>
                    </div>

                    <div className="mobile-footer">
                      <a
                        href="#contact"
                        className="mobile-cta-btn"
                        onClick={handleContactClick}
                      >
                        <span>Consult {ind.title} Team</span>
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ===================================================
           INDUSTRIES SHOWCASE STYLES
           =================================================== */
        .industries-section {
          background-color: var(--surface-white);
          padding-top: var(--section-spacing-desktop);
          padding-bottom: var(--section-spacing-desktop);
          position: relative;
          overflow: hidden;
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
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          letter-spacing: var(--tracking-body);
        }

        /* ===================================================
           DESKTOP ACCORDION CONTAINER
           =================================================== */
        .industry-accordion {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 640px;
          border-radius: var(--panel-radius);
          overflow: hidden;
          background-color: #0d0d0f;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
          position: relative;
        }

        /* ---------------------------------------------------
           PANEL PARTITION
           --------------------------------------------------- */
        .industry-panel {
          position: relative;
          flex: 1 1 16.666%;
          width: 16.666%;
          height: 100%;
          display: flex;
          flex-direction: row;
          overflow: hidden;
          border-right: 1px solid rgba(255, 255, 255, 0.14);
          cursor: pointer;
          user-select: none;
          outline: none;
          transition: flex 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      width 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.4s ease;
        }

        .industry-panel:last-child {
          border-right: none;
        }

        .industry-panel:focus-visible {
          outline: 2px solid var(--brand-red);
          outline-offset: -2px;
          z-index: 10;
        }

        /* Accordion Expansion Distribution */
        .industry-accordion[data-has-active="true"] .industry-panel {
          flex: 1 1 12%;
          width: 12%;
        }

        .industry-accordion[data-has-active="true"] .industry-panel[data-active="true"] {
          flex: 3.2 1 40%;
          width: 40%;
          cursor: default;
        }

        /* ---------------------------------------------------
           PANEL BACKGROUND MEDIA & VENUSGEO RED OVERLAY
           --------------------------------------------------- */
        .industry-panel-media {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .industry-panel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.02);
          filter: grayscale(20%) contrast(1.05) brightness(0.88);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.8s ease;
        }

        .industry-panel[data-active="true"] .industry-panel-img {
          transform: scale(1.06);
          filter: grayscale(0%) contrast(1.08) brightness(0.95);
        }

        /* VenusGeo Red Overlay (Collapsed default) */
        .industry-panel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(237, 27, 36, 0.58) 0%,
            rgba(180, 16, 24, 0.48) 35%,
            rgba(20, 20, 24, 0.72) 70%,
            rgba(12, 12, 14, 0.94) 100%
          );
          mix-blend-mode: multiply;
          transition: background 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Darkening vignette for readability */
        .industry-panel-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.25) 0%,
            transparent 30%,
            rgba(10, 10, 12, 0.85) 100%
          );
          transition: opacity 0.65s ease;
        }

        /* Active/Expanded Overlay Adjustment:
           Dark, high-contrast backdrop behind text on left, softened red gradient on right */
        .industry-panel[data-active="true"] .industry-panel-overlay {
          background: linear-gradient(
            90deg,
            rgba(10, 10, 12, 0.95) 0%,
            rgba(14, 14, 16, 0.90) 50%,
            rgba(237, 27, 36, 0.38) 85%,
            rgba(20, 20, 24, 0.65) 100%
          );
          mix-blend-mode: normal;
        }

        .industry-panel[data-active="true"] .industry-panel-vignette {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(10, 10, 12, 0.7) 100%
          );
        }

        /* ---------------------------------------------------
           IDENTITY RAIL (Left column inside each panel)
           --------------------------------------------------- */
        .industry-rail {
          position: relative;
          z-index: 3;
          width: 74px;
          min-width: 74px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 30px 0 28px 0;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          background-color: rgba(14, 14, 16, 0.35);
          backdrop-filter: blur(2px);
          transition: background-color 0.4s ease, border-color 0.4s ease;
        }

        .industry-panel[data-active="true"] .industry-rail {
          background-color: rgba(10, 10, 12, 0.65);
          border-right-color: rgba(255, 255, 255, 0.12);
        }

        .rail-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .rail-number {
          font-size: 0.8125rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.12em;
          font-variant-numeric: tabular-nums;
        }

        .rail-icon-outline {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(237, 27, 36, 0.45);
          background-color: rgba(237, 27, 36, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
        }

        .industry-panel:hover .rail-icon-outline,
        .industry-panel[data-active="true"] .rail-icon-outline {
          transform: scale(1.08);
          border-color: var(--brand-red);
          background-color: rgba(237, 27, 36, 0.35);
          box-shadow: 0 0 14px rgba(237, 27, 36, 0.35);
        }

        .rail-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }

        .rail-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          white-space: nowrap;
          font-family: var(--font-family);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
          transition: color 0.3s ease, letter-spacing 0.3s ease;
        }

        .industry-panel:hover .rail-title,
        .industry-panel[data-active="true"] .rail-title {
          color: #ffffff;
          letter-spacing: 0.12em;
        }

        .rail-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rail-indicator {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.3s ease,
                      color 0.3s ease,
                      border-color 0.3s ease;
        }

        .industry-panel:hover .rail-indicator {
          border-color: rgba(255, 255, 255, 0.5);
          color: #ffffff;
        }

        .rail-indicator.active {
          transform: rotate(90deg);
          border-color: var(--brand-red);
          background-color: var(--brand-red);
          color: #ffffff;
          box-shadow: 0 0 10px rgba(237, 27, 36, 0.5);
        }

        /* ---------------------------------------------------
           EXPANDED CONTENT AREA (Right side of active panel)
           --------------------------------------------------- */
        .industry-expanded-content {
          position: relative;
          z-index: 3;
          flex: 1;
          height: 100%;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateX(18px);
          transition: opacity 0.3s ease,
                      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      visibility 0.3s ease;
        }

        .industry-panel[data-active="true"] .industry-expanded-content {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(0);
          transition: opacity 0.45s ease 0.16s,
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.16s,
                      visibility 0.45s 0.16s;
        }

        .expanded-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 34px 34px 28px 24px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .expanded-header {
          margin-bottom: 12px;
        }

        .expanded-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
        }

        .expanded-tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--brand-red);
          box-shadow: 0 0 6px var(--brand-red);
        }

        .expanded-title {
          font-size: clamp(1.4rem, 1.8vw, 1.85rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 8px;
        }

        .expanded-desc {
          font-size: 0.8875rem;
          color: rgba(255, 255, 255, 0.84);
          line-height: 1.5;
          max-width: 440px;
        }

        .expanded-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%);
          margin: 12px 0 16px 0;
        }

        /* Capabilities List */
        .expanded-capabilities {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 18px;
        }

        .capability-row {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .capability-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .capability-num {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--brand-red);
          letter-spacing: 0.06em;
          font-variant-numeric: tabular-nums;
        }

        .capability-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .capability-text {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.45;
          margin: 0;
          padding-left: 20px;
        }

        /* Footer CTA */
        .expanded-footer {
          padding-top: 10px;
        }

        .industry-panel-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.825rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.01em;
          background-color: rgba(237, 27, 36, 0.22);
          border: 1px solid rgba(237, 27, 36, 0.45);
          padding: 8px 16px;
          border-radius: var(--button-radius-pill);
          transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }

        .industry-panel-cta:hover {
          background-color: var(--brand-red);
          border-color: var(--brand-red);
          color: #ffffff;
          transform: translateX(2px);
          box-shadow: 0 4px 14px rgba(237, 27, 36, 0.35);
        }

        /* ===================================================
           MOBILE & TABLET VERTICAL ACCORDION
           =================================================== */
        .industry-mobile-accordion {
          display: none;
        }

        @media (max-width: 960px) {
          /* Hide desktop accordion */
          .industry-accordion {
            display: none;
          }

          /* Show mobile stacked accordion */
          .industry-mobile-accordion {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          .industry-mobile-item {
            position: relative;
            border-radius: var(--panel-radius);
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.08);
            background-color: #0e0e11;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .industry-mobile-item[data-open="true"] {
            border-color: rgba(237, 27, 36, 0.4);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          }

          .mobile-item-bg {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
          }

          .mobile-item-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transform: scale(1.02);
            filter: grayscale(15%) brightness(0.85);
            transition: transform 0.6s ease;
          }

          .industry-mobile-item[data-open="true"] .mobile-item-img {
            transform: scale(1.05);
            filter: grayscale(0%) brightness(0.92);
          }

          .mobile-item-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              135deg,
              rgba(14, 14, 16, 0.94) 0%,
              rgba(237, 27, 36, 0.48) 55%,
              rgba(10, 10, 12, 0.92) 100%
            );
            transition: background 0.4s ease;
          }

          .industry-mobile-item[data-open="true"] .mobile-item-overlay {
            background: linear-gradient(
              180deg,
              rgba(10, 10, 12, 0.94) 0%,
              rgba(14, 14, 16, 0.92) 60%,
              rgba(237, 27, 36, 0.35) 100%
            );
          }

          .mobile-item-header {
            position: relative;
            z-index: 2;
            width: 100%;
            padding: 22px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: transparent;
            border: none;
            color: #ffffff;
            cursor: pointer;
            text-align: left;
            outline: none;
          }

          .mobile-item-header:focus-visible {
            outline: 2px solid var(--brand-red);
            outline-offset: -2px;
          }

          .mobile-header-left {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .mobile-item-num {
            font-size: 0.8125rem;
            font-weight: 700;
            color: var(--brand-red);
            letter-spacing: 0.1em;
            font-variant-numeric: tabular-nums;
          }

          .mobile-item-icon {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1px solid rgba(237, 27, 36, 0.5);
            background-color: rgba(237, 27, 36, 0.2);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-item-title {
            font-size: 1.125rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #ffffff;
          }

          .mobile-header-toggle {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.08);
            transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
          }

          .industry-mobile-item[data-open="true"] .mobile-header-toggle {
            border-color: var(--brand-red);
            background-color: var(--brand-red);
            color: #ffffff;
          }

          .toggle-icon {
            transition: transform 0.3s ease;
          }

          .toggle-icon.active {
            transform: rotate(90deg);
          }

          /* Mobile Expandable Body */
          .mobile-item-body {
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
          }

          .industry-mobile-item[data-open="true"] .mobile-item-body {
            grid-template-rows: 1fr;
          }

          .mobile-body-inner {
            min-height: 0;
            padding: 0 20px 24px 20px;
          }

          .mobile-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.6875rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 8px;
          }

          .mobile-desc {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.88);
            line-height: 1.55;
            margin-bottom: 16px;
          }

          .mobile-divider {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%);
            margin-bottom: 16px;
          }

          .mobile-capabilities {
            display: flex;
            flex-direction: column;
            gap: 14px;
            margin-bottom: 20px;
          }

          .mobile-cap-block {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }

          .mobile-cap-meta {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .cap-num {
            font-size: 0.72rem;
            font-weight: 800;
            color: var(--brand-red);
          }

          .cap-label {
            font-size: 0.72rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .cap-text {
            font-size: 0.8125rem;
            color: rgba(255, 255, 255, 0.78);
            line-height: 1.45;
            margin: 0;
            padding-left: 18px;
          }

          .mobile-footer {
            padding-top: 4px;
          }

          .mobile-cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8125rem;
            font-weight: 600;
            color: #ffffff;
            background-color: rgba(237, 27, 36, 0.25);
            border: 1px solid rgba(237, 27, 36, 0.5);
            padding: 8px 16px;
            border-radius: var(--button-radius-pill);
            transition: background-color 0.2s ease, border-color 0.2s ease;
          }

          .mobile-cta-btn:hover {
            background-color: var(--brand-red);
            border-color: var(--brand-red);
            color: #ffffff;
          }
        }

        /* ===================================================
           ACCESSIBILITY: PREFERS REDUCED MOTION
           =================================================== */
        @media (prefers-reduced-motion: reduce) {
          .industry-panel,
          .industry-panel-img,
          .industry-panel-overlay,
          .industry-expanded-content,
          .mobile-item-body,
          .mobile-item-img {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }

          .industry-expanded-content {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
