import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AIEngineeringHero } from '../components/ai-engineering/AIEngineeringHero';
import { AIOutcomes } from '../components/ai-engineering/AIOutcomes';
import { WhyVenusGeoAI } from '../components/ai-engineering/WhyVenusGeoAI';
import { AIProof } from '../components/ai-engineering/AIProof';
import { AICapabilities } from '../components/ai-engineering/AICapabilities';
import { AIApplicationLayer } from '../components/ai-engineering/AIApplicationLayer';
import { AIModernization } from '../components/ai-engineering/AIModernization';
import { AIEngineeringLifecycle } from '../components/ai-engineering/AIEngineeringLifecycle';
import { HumanAccountability } from '../components/ai-engineering/HumanAccountability';
import { AIToolkit } from '../components/ai-engineering/AIToolkit';
import { AINativeFuture } from '../components/ai-engineering/AINativeFuture';
import { AIEngineeringCTA } from '../components/ai-engineering/AIEngineeringCTA';

export const AIEngineering: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Dynamic SEO title & description
    document.title = 'AI Engineering | VenusGeo';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Build AI-powered products, modernize legacy systems, add intelligence to existing applications, and accelerate engineering with VenusGeo's enterprise AI engineering expertise."
      );
    }

    // Scroll handling: to hash if present, or to top
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      document.title = 'VenusGeo | Built AI-first. Engineered for your business.';
    };
  }, [location]);

  return (
    <div className="page-wrapper ai-engineering-page-root">
      <Header />
      <main id="main-content">
        {/* 01. AI Engineering Hero */}
        <AIEngineeringHero />

        {/* 02. Four Outcomes: Build, Transform, Modernize, Accelerate */}
        <AIOutcomes />

        {/* 03. Why VenusGeo */}
        <WhyVenusGeoAI />

        {/* 04. Proven in Real Work */}
        <AIProof />

        {/* 05. What We Build */}
        <AICapabilities />

        {/* 06. AI Inside Your Applications */}
        <AIApplicationLayer />

        {/* 07. AI-Powered Modernization */}
        <AIModernization />

        {/* 08. How We Build */}
        <AIEngineeringLifecycle />

        {/* 09. Human Accountability */}
        <HumanAccountability />

        {/* 10. Technology Toolkit */}
        <AIToolkit />

        {/* 11. Where We're Going */}
        <AINativeFuture />

        {/* 12. Closing CTA */}
        <AIEngineeringCTA />
      </main>
      <Footer />
    </div>
  );
};

export default AIEngineering;
