/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MotionProvider } from './utils/motionContext.tsx';
import { trackAnalyticsEvent } from './utils/analytics.ts';

import { Header } from './components/Header.tsx';
import { MobileMenu } from './components/MobileMenu.tsx';
import { Hero } from './components/Hero.tsx';
import { FeaturedCards } from './components/FeaturedCards.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { MobileStickyBar } from './components/MobileStickyBar.tsx';
import { CookieManager } from './components/CookieManager.tsx';
import { LegalModals } from './components/LegalModals.tsx';
import { ProjectBlueprintModal } from './components/ProjectBlueprintModal.tsx';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Track initial page_view and scroll depth (scroll_50, scroll_75, scroll_100)
  useEffect(() => {
    trackAnalyticsEvent('page_view', {
      path: window.location.pathname,
      title: document.title,
    });

    const trackedScrollPoints = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const currentProgress = (window.scrollY / scrollHeight) * 100;

      if (currentProgress >= 50 && !trackedScrollPoints.has(50)) {
        trackedScrollPoints.add(50);
        trackAnalyticsEvent('scroll_50');
      }
      if (currentProgress >= 75 && !trackedScrollPoints.has(75)) {
        trackedScrollPoints.add(75);
        trackAnalyticsEvent('scroll_75');
      }
      if (currentProgress >= 95 && !trackedScrollPoints.has(100)) {
        trackedScrollPoints.add(100);
        trackAnalyticsEvent('scroll_100');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MotionProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#261B14] flex flex-col selection:bg-[#C67937] selection:text-white relative">
        {/* Main Sticky Header */}
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenBlueprint={() => setIsBlueprintOpen(true)}
        />

        {/* Mobile Navigation Drawer */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onOpenBlueprint={() => setIsBlueprintOpen(true)}
        />

        {/* Main Content Landmark */}
        <main className="flex-1">
          {/* Section 05 Hero */}
          <Hero />

          {/* Section 05 Featured Signatures */}
          <FeaturedCards />

          {/* Section 04 & 05 Complete Menu Presentation */}
          <MenuSection />

          {/* Section 04 & 05 About, Roasting & Heritage */}
          <AboutSection />

          {/* Section 05 Atmosphere & Moments Gallery */}
          <GallerySection />

          {/* Section 13, 14 Location, Hours & Map Links */}
          <LocationSection />

          {/* Section 11 & 12 Contact, Calls & Table Booking */}
          <ContactSection />
        </main>

        {/* Section 05 & 15 Rich Footer */}
        <Footer
          onOpenPrivacy={() => setLegalModal('privacy')}
          onOpenTerms={() => setLegalModal('terms')}
          onOpenBlueprint={() => setIsBlueprintOpen(true)}
        />

        {/* Mobile Sticky Quick Action Bar */}
        <MobileStickyBar />

        {/* Section 18 Cookies & Consent Banner & Modal */}
        <CookieManager />

        {/* Section 19 & 20 Privacy Policy and Terms Modals */}
        <LegalModals
          type={legalModal}
          onClose={() => setLegalModal(null)}
        />

        {/* 26-Point Master Project Blueprint & Live QA Inspector */}
        <ProjectBlueprintModal
          isOpen={isBlueprintOpen}
          onClose={() => setIsBlueprintOpen(false)}
        />
      </div>
    </MotionProvider>
  );
}

