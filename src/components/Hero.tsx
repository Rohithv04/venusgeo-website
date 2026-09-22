import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, Award, PhoneCall, Cpu, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../utils/animations';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const darkCurtainRef = useRef<HTMLDivElement>(null);
  const loaderHudRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const floatingBadgesRef = useRef<HTMLDivElement>(null);
  const floatBadgeRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const dockGridRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);

  // Determine if already docked based on URL hash or previous scroll depth
  const [isDocked, setIsDocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash || window.scrollY > 30) {
        return true;
      }
    }
    return false;
  });

  const transitioningRef = useRef(false);
  const triggerTransitionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (statRef.current) {
      statRef.current.textContent = '25+';
    }

    // If reduced motion is preferred or already docked, ensure direct docked presentation
    if (prefersReducedMotion() || isDocked) {
      setIsDocked(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Continuous subtle breathing movement for the floating badge
      if (floatBadgeRef.current) {
        gsap.to(floatBadgeRef.current, {
          y: -4,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      const videoCard = videoCardRef.current;
      const loaderHud = loaderHudRef.current;
      const darkCurtain = darkCurtainRef.current;
      const heroContent = heroContentRef.current;
      const floatingBadges = floatingBadgesRef.current;
      const dockGrid = dockGridRef.current;
      const ecosystem = ecosystemRef.current;

      if (!videoCard || !loaderHud || !heroContent) return;

      // Calculate translation and scale required to make the card fill or center in viewport
      const getMorphValues = () => {
        const container = heroVisualRef.current;
        if (!container) return { deltaX: 0, deltaY: 0, scale: 1, isMobile: false };
        const cardRect = container.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const viewCenterX = vw / 2;
        const viewCenterY = vh / 2;

        const deltaX = viewCenterX - cardCenterX;
        const deltaY = viewCenterY - cardCenterY;

        const isMobile = vw <= 768;
        let scale = 1;

        if (isMobile) {
          // On mobile, keep video in its actual 16:9 aspect ratio, perfectly centered
          // Constrain width with comfortable margin so it is never cropped or blown up
          const targetWidth = Math.min(vw - 32, 480);
          scale = targetWidth / (cardRect.width || 1);
        } else {
          // Desktop: cover viewport cleanly
          const scaleX = vw / (cardRect.width || 1);
          const scaleY = vh / (cardRect.height || 1);
          scale = Math.max(scaleX, scaleY);
        }

        return { deltaX, deltaY, scale, isMobile };
      };

      let morph = getMorphValues();

      // Apply initial state at start of website
      gsap.set(videoCard, {
        x: morph.deltaX,
        y: morph.deltaY,
        scale: morph.scale,
        borderRadius: morph.isMobile ? '12px' : '0px',
        boxShadow: morph.isMobile ? '0 16px 40px rgba(0, 0, 0, 0.5)' : '0 0 0 rgba(0, 0, 0, 0)',
        zIndex: 600
      });
      gsap.set(loaderHud, { opacity: 1, pointerEvents: 'auto' });
      if (darkCurtain) gsap.set(darkCurtain, { opacity: 1 });
      gsap.set(heroContent, { opacity: 0, x: -32 });
      if (floatingBadges) gsap.set(floatingBadges, { opacity: 0, y: 16 });
      if (dockGrid) gsap.set(dockGrid, { opacity: 0, y: 30 });
      if (ecosystem) gsap.set(ecosystem, { opacity: 0, y: 15 });

      // Handle window resize while intro is active
      const handleResize = () => {
        if (transitioningRef.current) return;
        morph = getMorphValues();
        gsap.set(videoCard, {
          x: morph.deltaX,
          y: morph.deltaY,
          scale: morph.scale,
          borderRadius: morph.isMobile ? '12px' : '0px'
        });
      };
      window.addEventListener('resize', handleResize);

      // Build the master timeline paused; progress is driven by scroll depth
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          setIsDocked(true);
          if (loaderHud) loaderHud.style.display = 'none';
          if (darkCurtain) darkCurtain.style.display = 'none';
          gsap.set(videoCard, {
            clearProps: 'transform,boxShadow,borderRadius,zIndex'
          });
        }
      });

      // 1. Video Card: smoothly moves and docks into hero section slot
      tl.to(
        videoCard,
        {
          x: 0,
          y: 0,
          scale: 1,
          borderRadius: '12px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
          zIndex: 10,
          duration: 1,
          ease: 'power2.out'
        },
        0
      );

      // 2. HUD & dark curtain fade out
      tl.to(
        loaderHud,
        { opacity: 0, duration: 0.35, ease: 'power1.out' },
        0
      );
      if (darkCurtain) {
        tl.to(
          darkCurtain,
          { opacity: 0, duration: 0.55, ease: 'power1.out' },
          0
        );
      }

      // 3. Hero Left Content: smoothly slides and fades in
      tl.to(
        heroContent,
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
        0.2
      );

      // 4. Floating Badges: settle in place
      if (floatingBadges) {
        tl.to(
          floatingBadges,
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.4
        );
      }

      // 5. Dock Grid: fades in
      if (dockGrid) {
        tl.to(
          dockGrid,
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          0.35
        );
      }

      // 6. Ecosystem Strip: fades in
      if (ecosystem) {
        tl.to(
          ecosystem,
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.45
        );
      }

      // Generous scroll depth required to transition into hero section
      const DESKTOP_SCROLL_DEPTH = 450;
      const MOBILE_SCROLL_DEPTH = 240;
      let accumulatedScroll = 0;

      // Complete the docking permanently
      const completeDock = () => {
        if (transitioningRef.current) return;
        transitioningRef.current = true;

        removeListeners();

        gsap.to(tl, {
          progress: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            setIsDocked(true);
            if (loaderHud) loaderHud.style.display = 'none';
            if (darkCurtain) darkCurtain.style.display = 'none';
            gsap.set(videoCard, {
              clearProps: 'transform,boxShadow,borderRadius,zIndex'
            });
          }
        });
      };

      triggerTransitionRef.current = completeDock;

      // Wheel listener (Desktop scroll depth)
      const handleWheel = (e: WheelEvent) => {
        if (transitioningRef.current) return;
        // Only progress forwards on scroll down
        if (e.deltaY > 0) {
          accumulatedScroll += e.deltaY;
          const targetProgress = Math.min(1, accumulatedScroll / DESKTOP_SCROLL_DEPTH);

          gsap.to(tl, {
            progress: targetProgress,
            duration: 0.28,
            ease: 'power1.out',
            overwrite: 'auto'
          });

          if (accumulatedScroll >= DESKTOP_SCROLL_DEPTH) {
            completeDock();
          }
        }
      };

      // Touch listeners (Mobile swipe depth)
      let touchStartY = 0;
      let lastTouchY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (transitioningRef.current) return;
        const currentY = e.touches[0].clientY;
        lastTouchY = currentY;
        const delta = touchStartY - currentY; // positive when swiping up

        if (delta > 0) {
          const targetProgress = Math.min(1, delta / MOBILE_SCROLL_DEPTH);
          gsap.to(tl, {
            progress: targetProgress,
            duration: 0.2,
            ease: 'power1.out',
            overwrite: 'auto'
          });

          if (delta >= MOBILE_SCROLL_DEPTH) {
            completeDock();
          }
        }
      };

      const handleTouchEnd = () => {
        if (transitioningRef.current) return;
        const totalDelta = touchStartY - lastTouchY;
        // If user made a deliberate swipe of at least 40px, smoothly finish to docked state
        if (totalDelta > 40) {
          completeDock();
        }
      };

      // Key listener (ArrowDown, PageDown, Space)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
          e.preventDefault();
          completeDock();
        }
      };

      // Native window scroll fallback
      const handleScroll = () => {
        if (window.scrollY > 20) {
          completeDock();
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('scroll', handleScroll, { passive: true });

      const removeListeners = () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };

      return () => {
        removeListeners();
      };
    }, heroRef);

    return () => ctx.revert();
  }, [isDocked]);

  const handleSkipOrExplore = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (triggerTransitionRef.current) {
      triggerTransitionRef.current();
    } else {
      setIsDocked(true);
    }
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="hero-section" aria-label="Introduction">
      {/* Intro dark curtain behind starting video on start of website */}
      {!isDocked && (
        <div ref={darkCurtainRef} className="intro-dark-curtain" aria-hidden="true" />
      )}

      {/* Fullscreen Brand Loader HUD - Active at start, smoothly fades out on scroll */}
      {!isDocked && (
        <div ref={loaderHudRef} className="brand-loader-hud" aria-hidden="false">
          <div className="loader-hud-backdrop" />

          {/* Top Bar inside Loader HUD */}
          <div className="loader-hud-header">
            <div className="loader-brand-badge">
              <span className="loader-pulse-dot" />
              <span className="loader-brand-title">AI BRAND INTRO</span>
            </div>

            <button
              type="button"
              onClick={handleSkipOrExplore}
              className="loader-skip-btn"
              aria-label="Skip intro to site"
            >
              <span>Skip to Site</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Bottom Interactive Cue */}
          <div className="loader-hud-footer">
            <button
              type="button"
              onClick={handleSkipOrExplore}
              className="loader-scroll-cue"
              aria-label="Scroll down to explore"
            >
              <span className="scroll-cue-text">Scroll to explore</span>
              <div className="scroll-arrow-anim">
                <ChevronDown size={18} />
              </div>
            </button>
          </div>
        </div>
      )}

      <div className="hero-stage-wrapper">

        <div className="container hero-container-inner">
          {/* Main Split Hero Grid */}
          <div className="hero-grid">
            {/* Left Column: Typography & CTAs */}
            <div ref={heroContentRef} className="hero-content">
              <div className="eyebrow">AI-FIRST PRODUCT DEVELOPMENT</div>

              <h1 className="hero-headline">
                Built AI-first.<br />
                <span className="text-red">Engineered for your business.</span>
              </h1>

              <p className="hero-description">
                VenusGeo brings AI, product design, and enterprise engineering together to build and scale software around your business.
              </p>

              <div className="hero-actions">
                <a
                  href="#products"
                  onClick={scrollToProducts}
                  className="btn btn-primary hero-btn-primary"
                >
                  <span>Explore Our Products</span>
                  <ArrowRight size={16} />
                </a>

                <a
                  href="https://www.venusgeo.com/gen-ai-integration/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary hero-btn-secondary"
                >
                  <span>Explore AI Engineering Solutions</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Container holding the Morphing Video Card */}
            <div ref={heroVisualRef} className="hero-visual-container">
              <div ref={videoCardRef} className="hero-image-card hero-video-card">
                {/* AI Brand Intro Video */}
                <video
                  ref={videoRef}
                  src="/assets/brand/brand-intro.mp4"
                  poster="/assets/brand/hero-interface.jpg"
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="hero-main-video"
                  aria-label="VenusGeo AI Platform Interactive Demonstration"
                />

                <div className="hero-img-gradient-overlay" aria-hidden="true" />

                {/* Overlaid Floating Badges Stack on Right (Aligned with reference layout) */}
                <div ref={floatingBadgesRef} className="hero-floating-stack">
                  <div ref={floatBadgeRef} className="floating-badge-top">
                    <div className="floating-badge-icon">
                      <Cpu size={18} />
                    </div>
                    <div className="floating-badge-text">
                      <div className="floating-badge-val">25+ Fleets & Enterprises</div>
                      <div className="floating-badge-sub">Active in production</div>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="floating-call-btn"
                    aria-label="Contact engineering team"
                  >
                    <div className="call-btn-circle">
                      <PhoneCall size={16} />
                    </div>
                    <span className="call-btn-label">Contact Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Card Dock Directly Below Hero */}
          <div ref={dockGridRef} className="hero-dock-grid">
            {/* Card 1: Dark Charcoal Card with 25+ Years of Experience */}
            <div className="dock-card dock-card-dark card-panel-charcoal">
              <div className="dock-card-top-group">
                <div className="dock-stat-row">
                  <div ref={statRef} className="dock-big-stat">25+</div>
                  <div className="dock-stat-badge">Product-led</div>
                </div>
                <div className="dock-dark-title">Years of Experience</div>
              </div>
              <div className="dock-dark-bullet">
                <span className="bullet-dot" />
                <span>25+ years of enterprise engineering excellence</span>
              </div>
            </div>

            {/* Card 2: Standards & Compliance Card with Award Ribbon */}
            <div className="dock-card dock-card-white card-panel">
              <div className="dock-card-header">
                <div>
                  <div className="dock-eyebrow-label">We engineer by standards:</div>
                  <div className="dock-white-title">AI-first & Zero Trust</div>
                </div>
                <div className="icon-red-outline">
                  <Award size={20} />
                </div>
              </div>
              <div className="dock-standards-pills">
                <span className="std-pill">SOC 2 Type II</span>
                <span className="std-pill">HIPAA</span>
                <span className="std-pill">Zero Trust</span>
                <span className="std-pill">ISO 27001</span>
              </div>
            </div>

            {/* Card 3: Multi-Stage Lifecycle & Control Card */}
            <div className="dock-card dock-card-white card-panel">
              <div className="dock-card-top-group">
                <div className="dock-stages-indicator">
                  <span className="stage-step active">Ingest</span>
                  <span className="stage-divider">──</span>
                  <span className="stage-step active">Process</span>
                  <span className="stage-divider">──</span>
                  <span className="stage-step">Deploy</span>
                </div>
                <div className="dock-white-title">End-to-end control across all stages</div>
              </div>
              <div className="dock-live-status">
                <span className="live-pulse-dot" />
                <span className="live-status-text">Autonomous orchestration active</span>
              </div>
            </div>
          </div>

          {/* Ecosystem Logos Strip */}
          <div ref={ecosystemRef} className="ecosystem-strip">
            <div className="ecosystem-header">
              <span className="ecosystem-title">Enterprise Cloud & Stacks:</span>
              <div className="ecosystem-nav-arrows" aria-hidden="true">
                <button type="button" className="eco-arrow-btn" aria-label="Previous technologies">
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="eco-arrow-btn" aria-label="Next technologies">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <div className="ecosystem-badges-list">
              <span className="eco-badge">Microsoft .NET</span>
              <span className="eco-badge">AWS Cloud</span>
              <span className="eco-badge">Google Cloud</span>
              <span className="eco-badge">Microsoft Azure</span>
              <span className="eco-badge">Kubernetes</span>
              <span className="eco-badge">NVIDIA AI</span>
              <span className="eco-badge">React & TypeScript</span>
              <span className="eco-badge">PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          background-color: var(--surface-white);
          position: relative;
          overflow: visible;
        }

        .hero-stage-wrapper {
          position: relative;
          width: 100%;
        }

        /* Increased padding between sticky header and hero content */
        .hero-container-inner {
          padding-top: 72px;
          padding-bottom: 56px;
          position: relative;
        }

        @media (max-width: 768px) {
          .hero-container-inner {
            padding-top: 44px;
            padding-bottom: 40px;
          }
        }

        /* Dark curtain behind intro video at the start */
        .intro-dark-curtain {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(circle at center, #16161f 0%, #09090c 100%);
          z-index: 550;
          pointer-events: none;
        }

        /* Fullscreen Brand Loader HUD */
        .brand-loader-hud {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 700;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 32px;
          pointer-events: auto;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .brand-loader-hud {
            padding: 16px 16px 28px 16px;
          }
        }

        .loader-hud-backdrop {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .loader-hud-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .loader-brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: rgba(18, 18, 20, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 8px 16px;
          border-radius: 30px;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .loader-brand-badge {
            padding: 6px 12px;
            gap: 8px;
          }
        }

        .loader-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--brand-red);
          box-shadow: 0 0 10px var(--brand-red);
          animation: pulseGlow 1.8s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .loader-brand-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .loader-brand-title {
            font-size: 0.6875rem;
          }
        }

        .loader-skip-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          color: var(--text-primary);
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform var(--transition-quick), background-color var(--transition-quick);
        }

        @media (max-width: 768px) {
          .loader-skip-btn {
            padding: 6px 14px;
            font-size: 0.75rem;
          }
        }

        .loader-skip-btn:hover {
          transform: translateY(-1px);
          background-color: #ffffff;
        }

        .loader-hud-footer {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding-bottom: 16px;
        }

        .loader-scroll-cue {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          color: #ffffff;
          outline: none;
        }

        .scroll-cue-text {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }

        @media (max-width: 768px) {
          .scroll-cue-text {
            font-size: 0.75rem;
          }
        }

        .scroll-arrow-anim {
          animation: bounceArrow 1.6s infinite ease-in-out;
        }

        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        /* Main Hero Grid */
        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 32px;
          position: relative;
        }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .hero-headline {
          font-size: var(--font-hero);
          letter-spacing: var(--tracking-hero);
          margin-bottom: 20px;
          line-height: 1.06;
        }

        .hero-description {
          font-size: var(--font-subheading);
          letter-spacing: var(--tracking-subheading);
          color: var(--text-secondary);
          line-height: 1.55;
          max-width: 520px;
          margin-bottom: 32px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-btn-primary {
          padding: 12px 24px;
          font-size: 0.9375rem;
          background-color: var(--brand-red);
          border-radius: var(--button-radius);
        }

        .hero-btn-secondary {
          padding: 12px 22px;
          font-size: 0.9375rem;
          border-radius: var(--button-radius);
          background-color: var(--surface-white);
        }

        @media (max-width: 600px) {
          .hero-actions {
            flex-direction: column;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: 100%;
          }
        }

        /* Hero Visual & Overlays */
        .hero-visual-container {
          position: relative;
          overflow: visible;
        }

        .hero-image-card {
          position: relative;
          border-radius: var(--panel-radius);
          overflow: hidden;
          border: 1px solid var(--border-card);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
          background-color: var(--surface-charcoal);
          transform-origin: center center;
          will-change: transform, border-radius, box-shadow;
          aspect-ratio: 16 / 9;
        }

        .hero-main-video {
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
        }

        .hero-img-gradient-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.28) 100%);
        }

        /* Overlaid Floating Badges Stack on Right */
        .hero-floating-stack {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          max-width: calc(100% - 32px);
          z-index: 5;
        }

        @media (max-width: 600px) {
          .hero-floating-stack {
            top: 10px;
            right: 10px;
            gap: 8px;
          }
          .floating-badge-top {
            padding: 6px 10px;
          }
          .floating-badge-val {
            font-size: 0.75rem;
          }
          .floating-badge-sub {
            font-size: 0.625rem;
          }
          .floating-call-btn {
            padding: 4px 10px 4px 4px;
          }
          .call-btn-circle {
            width: 26px;
            height: 26px;
          }
          .call-btn-label {
            font-size: 0.75rem;
          }
        }

        .floating-badge-top {
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius-sm);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: var(--shadow-float);
          white-space: nowrap;
        }

        .floating-badge-icon {
          color: var(--brand-red);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-badge-val {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.2;
        }

        .floating-badge-sub {
          font-size: 0.6875rem;
          color: var(--text-secondary);
        }

        .floating-call-btn {
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-card);
          border-radius: 30px;
          padding: 5px 14px 5px 5px;
          display: flex;
          align-items: center;
          gap: 9px;
          box-shadow: var(--shadow-float);
          transition: transform var(--transition-quick), box-shadow var(--transition-quick);
          text-decoration: none;
          white-space: nowrap;
        }

        .floating-call-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(237, 27, 36, 0.22);
        }

        .call-btn-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--brand-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .call-btn-label {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: var(--tracking-button);
          color: var(--text-primary);
        }

        /* 3-Card Dock Directly Below Hero - Equal height & perfectly aligned */
        .hero-dock-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr 1.25fr;
          grid-auto-rows: 1fr;
          gap: 16px;
          margin-bottom: 40px;
          align-items: stretch;
        }

        @media (max-width: 960px) {
          .hero-dock-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }
        }

        .dock-card {
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 172px;
          box-sizing: border-box;
          border-radius: var(--panel-radius);
        }

        .dock-card-top-group {
          display: flex;
          flex-direction: column;
        }

        .dock-card-dark {
          background-color: var(--surface-charcoal);
          border: 1px solid var(--border-dark);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .dock-stat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .dock-big-stat {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .dock-stat-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--brand-red);
          background-color: rgba(237, 27, 36, 0.15);
          border: 1px solid rgba(237, 27, 36, 0.25);
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: var(--tracking-eyebrow);
          white-space: nowrap;
        }

        .dock-dark-title {
          font-size: 1.0625rem;
          font-weight: 600;
          letter-spacing: var(--tracking-title);
          color: #ffffff;
          margin-bottom: 12px;
        }

        .dock-dark-bullet {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: #a1a1aa;
        }

        .bullet-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--brand-red);
          flex-shrink: 0;
        }

        .dock-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .dock-eyebrow-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .dock-white-title {
          font-size: 1.0625rem;
          font-weight: 600;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
        }

        .dock-standards-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
        }

        .std-pill {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: var(--tracking-pill);
          color: var(--text-primary);
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .dock-stages-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .stage-step.active {
          color: var(--brand-red);
        }

        .stage-divider {
          color: var(--border-subtle);
        }

        .dock-live-status {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .live-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
          flex-shrink: 0;
        }

        /* Ecosystem Logos Strip */
        .ecosystem-strip {
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .ecosystem-strip {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .ecosystem-header {
            width: 100%;
            justify-content: space-between;
          }
          .ecosystem-badges-list {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 4px;
          }
        }

        .ecosystem-header {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .ecosystem-title {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-pill);
        }

        .ecosystem-nav-arrows {
          display: flex;
          gap: 4px;
        }

        .eco-arrow-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid var(--border-subtle);
          background-color: var(--surface-white);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .ecosystem-badges-list {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .ecosystem-badges-list::-webkit-scrollbar {
          display: none;
        }

        .eco-badge {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: var(--tracking-pill);
          color: var(--text-secondary);
          background-color: var(--surface-soft);
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
          white-space: nowrap;
          transition: border-color var(--transition-quick), color var(--transition-quick);
        }

        .eco-badge:hover {
          border-color: #cacace;
          color: var(--text-primary);
        }
      `}</style>
    </section>
  );
};
