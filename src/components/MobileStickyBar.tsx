import React from 'react';
import { Phone, MessageCircle, Navigation, BookOpen } from 'lucide-react';
import { CAFE_INFO, buildWhatsAppUrl } from '../data/cafeInfo.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

export const MobileStickyBar: React.FC = () => {
  const handleScrollToMenu = () => {
    trackAnalyticsEvent('mobile_sticky_menu_click');
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDirections = () => {
    trackAnalyticsEvent('directions_click', { source: 'mobile_sticky_bar' });
    window.open(CAFE_INFO.maps.googleDirectionsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#EADFD5] px-3 py-2 shadow-2xl"
      role="navigation"
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* Call */}
        <a
          href={`tel:${CAFE_INFO.phoneClean}`}
          onClick={() =>
            trackAnalyticsEvent('phone_click', { source: 'mobile_sticky_bar' })
          }
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#3E291A] hover:bg-[#FAF4ED] active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-[#C67937] mb-1" />
          <span className="text-[10px] font-bold">Call Us</span>
        </a>

        {/* Menu */}
        <button
          onClick={handleScrollToMenu}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#3E291A] hover:bg-[#FAF4ED] active:scale-95 transition-all text-center cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#C67937] mb-1" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>

        {/* Directions */}
        <button
          onClick={handleDirections}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#3E291A] hover:bg-[#FAF4ED] active:scale-95 transition-all text-center cursor-pointer"
        >
          <Navigation className="w-4 h-4 text-[#C67937] mb-1" />
          <span className="text-[10px] font-bold">Directions</span>
        </button>

        {/* WhatsApp */}
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackAnalyticsEvent('whatsapp_click', {
              source: 'mobile_sticky_bar',
            })
          }
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#25D366] text-white active:scale-95 transition-all shadow-xs text-center"
        >
          <MessageCircle className="w-4 h-4 fill-white mb-1" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
