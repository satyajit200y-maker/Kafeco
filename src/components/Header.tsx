import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, Coffee } from 'lucide-react';
import { CAFE_INFO, getCafeStatus, buildWhatsAppUrl } from '../data/cafeInfo.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenBlueprint?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [status, setStatus] = useState(getCafeStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setInterval(() => {
      setStatus(getCafeStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Our Story', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location & Hours', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (linkName: string) => {
    trackAnalyticsEvent('navigation_click', { link: linkName });
  };

  const handlePhoneClick = () => {
    trackAnalyticsEvent('phone_click', { source: 'header' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/92 backdrop-blur-xl border-b border-[#E5D7C9]/80 shadow-[0_4px_20px_rgba(26,17,11,0.04)] py-2.5 sm:py-3'
          : 'bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#E5D7C9]/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand Logo - Premium Minimalist Emblem */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C67937] rounded-xl py-1 px-1 -ml-1 transition-all"
          aria-label="Kafeco Home"
          onClick={() => handleNavClick('Home Logo')}
        >
          <div className="w-10 h-10 rounded-full bg-[#24170E] border border-[#C67937]/30 flex items-center justify-center text-[#FAF7F2] shadow-sm group-hover:border-[#C67937] group-hover:bg-[#2C1D14] transition-all duration-300">
            <Coffee className="w-4 h-4 text-[#D8A77E] group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl sm:text-[25px] font-bold tracking-[0.14em] text-[#1A110B] leading-none transition-colors">
              KAFECO
            </span>
            <span className="text-[9px] font-semibold tracking-[0.22em] text-[#8C7667] uppercase flex items-center gap-1 mt-1">
              <span className="w-1 h-1 rounded-full bg-[#C67937]" /> Kozhencherry Roastery
            </span>
          </div>
        </a>

        {/* Desktop Navigation - High-end editorial typography */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main navigation">
          {[
            { label: 'Menu', href: '#menu' },
            { label: 'Our Story', href: '#about' },
            { label: 'Atmosphere', href: '#gallery' },
            { label: 'Hours & Location', href: '#location' },
            { label: 'Reservations', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.label)}
              className="group/nav relative py-1 text-[13px] font-semibold tracking-[0.06em] text-[#554337] hover:text-[#1A110B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C67937] rounded-xs"
            >
              <span>{link.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#C67937] transition-all duration-200 group-hover/nav:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Cluster - Streamlined luxury actions */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          {/* Live Roastery Status Pill */}
          <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#E3D4C4] text-[11px] text-[#4A3B31] shadow-2xs">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status.isOpen
                  ? 'bg-emerald-500 ring-2 ring-emerald-500/25 animate-pulse'
                  : 'bg-amber-500'
              }`}
            />
            <span className="font-medium tracking-wide">
              {status.isOpen ? 'Roastery Open' : 'Closed Today'}
            </span>
          </div>

          {/* Direct Telephone Contact */}
          <a
            href={`tel:${CAFE_INFO.phoneClean}`}
            onClick={handlePhoneClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4A3B31] hover:text-[#1A110B] border border-[#DDD0C2] hover:border-[#C67937] bg-white/60 hover:bg-white transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#C67937]"
            title={`Direct front-desk call: ${CAFE_INFO.phone}`}
            aria-label={`Call Kafeco front-desk at ${CAFE_INFO.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#C67937]" />
            <span className="tracking-wide">Call</span>
          </a>

          {/* Primary WhatsApp Order & Chat CTA */}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackAnalyticsEvent('whatsapp_click', { source: 'header' })
            }
            className="group inline-flex items-center gap-2 px-4 sm:px-4.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide bg-[#24170E] hover:bg-[#382417] text-[#FAF7F2] border border-[#432C1E]/80 shadow-xs hover:shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C67937]"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366] group-hover:scale-110 transition-transform duration-200" />
            <span>Order on WhatsApp</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-[#24170E] hover:bg-[#EFE6DC] focus:outline-none focus:ring-2 focus:ring-[#C67937] transition-colors"
            aria-label="Open Mobile Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
