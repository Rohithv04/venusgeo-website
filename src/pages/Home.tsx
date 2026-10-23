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
    document.title = 'Venusgeo | Product Engineered for your Business with AI';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Venusgeo engineers digital products around your business and transforms legacy products into AI-enabled solutions, modernizing existing applications, workflows, and platforms without discarding what already works.'
      );
    }

    if (location.hash) {
      let el = document.querySelector(location.hash);
      if (!el && location.hash === '#card-document-ai') {
        el = document.querySelector('#card-pammy-ai');
      }
      if (!el && location.hash === '#card-private-id') {
        el = document.querySelector('#card-ultra-passkey');
      }
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
