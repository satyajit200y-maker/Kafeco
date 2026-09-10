import React from 'react';
import { Sparkles, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData.ts';
import { buildMenuItemWhatsAppUrl } from '../data/cafeInfo.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';
import { SectionHeading } from './Buttons.tsx';

export const FeaturedCards: React.FC = () => {
  const featured = MENU_ITEMS.filter((item) => item.isPopular).slice(0, 4);

  const handleCardClick = (itemName: string) => {
    trackAnalyticsEvent('featured_item_click', { item: itemName });
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F3ECE2]/60 border-y border-[#E8DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Signature Signatures"
          title="Curated Favorites from Our Roasters & Bakers"
          subtitle="A selection of our most revered manual brews, spiced lattes, and fresh laminated pastries."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.name)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EADFD5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image with Tag */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF4ED]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#7E5738] shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#C67937]" />
                  House Favorite
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#1A110B]/85 text-white font-serif font-bold text-sm backdrop-blur-xs">
                  ₹{item.price}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A110B] group-hover:text-[#C67937] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#5D4E45] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  {item.notes && (
                    <div className="mt-2.5 p-2 rounded-lg bg-[#FAF7F2] text-[11px] text-[#7E5738] italic font-medium">
                      {item.notes}
                    </div>
                  )}
                </div>

                {/* WhatsApp Order CTA */}
                <div className="mt-4 pt-4 border-t border-[#F3ECE2] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8A7569]">
                    Freshly Prepared
                  </span>
                  <a
                    href={buildMenuItemWhatsAppUrl(item.name, item.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      trackAnalyticsEvent('whatsapp_click', {
                        source: 'featured_card',
                        item: item.name,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-semibold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
