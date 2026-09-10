import React, { useEffect } from 'react';
import { X, Phone, MessageCircle, MapPin, Clock, ArrowRight, Sparkles, Navigation } from 'lucide-react';
import { CAFE_INFO, getCafeStatus, buildWhatsAppUrl } from '../data/cafeInfo.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBlueprint: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenBlueprint,
}) => {
  const status = getCafeStatus();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const links = [
    { label: 'Explore Menu', href: '#menu' },
    { label: 'Our Story & Beans', href: '#about' },
    { label: 'Atmosphere Gallery', href: '#gallery' },
    { label: 'Location & Directions', href: '#location' },
    { label: 'Opening Hours', href: '#location' },
    { label: 'Contact & Table Booking', href: '#contact' },
  ];

  const handleLinkClick = (name: string) => {
    trackAnalyticsEvent('mobile_nav_click', { link: name });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A110B]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-sm bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 z-10">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between pb-5 border-b border-[#E8DDD2]">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A110B]">
                KAFECO
              </span>
              <p className="text-xs text-[#7E5738] font-medium">Kozhencherry · Kerala</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EFE6DC] text-[#4A3B32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C67937]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Badge */}
          <div className="mt-4 p-3 rounded-xl bg-white border border-[#E8DDD2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className="text-xs font-semibold text-[#2C1D14]">
                {status.message}
              </span>
            </div>
            <Clock className="w-4 h-4 text-[#8A7569]" />
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.label)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-[#2C1D14] hover:bg-[#EFE6DC] hover:text-[#C67937] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#A89487]" />
              </a>
            ))}
          </nav>

          {/* Project Blueprint Button */}
          <div className="mt-5 pt-4 border-t border-[#E8DDD2]">
            <button
              onClick={() => {
                onClose();
                onOpenBlueprint();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#2C1D14] text-white text-sm font-medium hover:bg-[#432C1E] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E29250]" />
                Project Master Blueprint (26 Specs)
              </span>
              <ArrowRight className="w-4 h-4 text-[#D8C7B5]" />
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-[#E8DDD2] space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${CAFE_INFO.phoneClean}`}
              onClick={() =>
                trackAnalyticsEvent('phone_click', { source: 'mobile_menu' })
              }
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-[#D8C7B5] bg-white text-xs font-semibold text-[#2C1D14] hover:bg-[#FAF4ED]"
            >
              <Phone className="w-3.5 h-3.5 text-[#C67937]" />
              Call Now
            </a>
            <a
              href={CAFE_INFO.maps.googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackAnalyticsEvent('directions_click', {
                  source: 'mobile_menu',
                })
              }
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-[#D8C7B5] bg-white text-xs font-semibold text-[#2C1D14] hover:bg-[#FAF4ED]"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C67937]" />
              Directions
            </a>
          </div>

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackAnalyticsEvent('whatsapp_click', { source: 'mobile_menu' })
            }
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-medium text-sm hover:bg-[#1EBE5D] transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            Chat & Order on WhatsApp
          </a>

          <p className="text-[11px] text-center text-[#8A7569] pt-2">
            Main Central Rd · Near Kozhencherry Bridge · Pathanamthitta
          </p>
        </div>
      </div>
    </div>
  );
};
