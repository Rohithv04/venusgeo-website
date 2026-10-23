import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AboutHero } from '../components/about/AboutHero';
import { AboutOverview } from '../components/about/AboutOverview';
import { PillarsIntro } from '../components/about/PillarsIntro';
import { FivePillarsSection } from '../components/about/FivePillarsSection';
import { PowerOfDiversity } from '../components/about/PowerOfDiversity';
import { AboutOutcomes } from '../components/about/AboutOutcomes';
import { AboutStatement } from '../components/about/AboutStatement';
import { AboutCTA } from '../components/about/AboutCTA';

export const AboutUs: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Dynamic SEO title & description
    document.title = 'About Venusgeo | Enterprise Technology & AI Innovation';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn how Venusgeo combines more than two decades of enterprise technology experience, research, engineering and innovation to build reliable, future-ready digital solutions.'
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
      document.title = 'Venusgeo | Product Engineered for your Business with AI';
    };
  }, [location]);

  return (
    <div className="page-wrapper about-page-root">
      <Header />
      <main id="main-content">
        <AboutHero />
        <AboutOverview />
        <PillarsIntro />
        <FivePillarsSection />
        <PowerOfDiversity />
        <AboutOutcomes />
        <AboutStatement />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
