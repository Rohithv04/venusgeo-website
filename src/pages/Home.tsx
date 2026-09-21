import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { ProcessArchitecture } from '../components/ProcessArchitecture';
import { IndustryGrid } from '../components/IndustryGrid';
import { EnterpriseMobilityBanner } from '../components/EnterpriseMobilityBanner';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  const location = useLocation();

  // Scroll to hash on load or navigation
  useEffect(() => {
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
  }, [location]);

  return (
    <div className="page-wrapper">
      <Header />
      <main id="main-content">
        <Hero />
        <ProductGrid />
        <ProcessArchitecture />
        <IndustryGrid />
        <EnterpriseMobilityBanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
