import React from 'react';
import { Coffee, ShieldCheck, Heart, Sparkles, MapPin, Award } from 'lucide-react';
import { SectionHeading, PrimaryButton, WhatsAppButton } from './Buttons.tsx';
import { CAFE_INFO, buildWhatsAppUrl } from '../data/cafeInfo.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';
import { REAL_CAFE_ASSETS } from '../assets/realCafeImages.ts';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Coffee className="w-5 h-5 text-[#C67937]" />,
      title: 'Ethical Western Ghats Beans',
      desc: 'We partner directly with family estates in Wayanad and Chikmagalur, procuring shade-grown, hand-harvested Arabica berries at fair premiums.',
    },
    {
      icon: <Award className="w-5 h-5 text-[#C67937]" />,
      title: 'Precision In-House Roasting',
      desc: 'Light and medium profiles dialed in small batches to illuminate the distinct fruitiness, florals, and spices native to Indian terroir.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C67937]" />,
      title: 'Slow Ferment Bakery',
      desc: 'No commercial improvers. Our country loaves ferment for 36 hours with wild yeast, producing prebiotic sourdough with rich crumb and golden crust.',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#C67937]" />,
      title: 'Central Travancore Community',
      desc: 'A calm space designed for conversations, remote working, book clubs, and peaceful coffee rituals right by Kozhencherry Bridge.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F3ECE2]/60 border-t border-[#E8DDD2] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase - Real Kafeco Interior */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[4/5] group bg-[#2C1D14]">
                  <img
                    src={REAL_CAFE_ASSETS.brickGallery}
                    alt="Authentic white brick gallery wall with framed travel prints and globe lighting at Kafeco Kozhencherry"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#EADFD5] shadow-xs">
                  <span className="text-2xl font-serif font-bold text-[#C67937]">
                    100%
                  </span>
                  <div className="text-xs font-semibold text-[#1A110B] mt-0.5">
                    Authentic Roastery Spaces
                  </div>
                  <p className="text-[11px] text-[#7E5738] mt-1">
                    Warm amber globe lighting, curated vintage gallery frames, and cozy teak seating.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-5 rounded-2xl bg-[#2C1D14] text-white border border-[#432C1E] shadow-xs">
                  <div className="text-xs uppercase font-bold text-[#E29250] tracking-wider">
                    Our Philosophy
                  </div>
                  <div className="font-serif text-lg font-bold text-[#FAF7F2] mt-1">
                    "Coffee is a ritual of pause."
                  </div>
                  <p className="text-[11px] text-[#D8C7B5] mt-1">
                    A peaceful sanctuary right by Kozhencherry bridge.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[4/5] group bg-[#2C1D14]">
                  <img
                    src={REAL_CAFE_ASSETS.mirrorCorner}
                    alt="Botanical mirror corner with cascading green foliage and warm incandescent glow at Kafeco"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EFE6DC] text-[#7E5738] mb-4">
              Our Kozhencherry Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A110B] leading-tight">
              Bringing Contemporary Coffee Culture to Central Travancore
            </h2>
            <p className="mt-5 text-base text-[#5D4E45] leading-relaxed">
              Founded with the conviction that world-class coffee belongs everywhere, Kafeco opened its doors in Kozhencherry to offer an uncompromising coffee experience outside metropolitan hubs.
            </p>
            <p className="mt-3 text-base text-[#5D4E45] leading-relaxed">
              Every morning begins at dawn: baristas calibrating grinders for optimal extraction times, bakers scoring fermented sourdough loaves, and the air filling with the perfume of roasting beans and fresh cinnamon.
            </p>

            {/* 4 Pillars Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/80 border border-[#EADFD5]">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] flex items-center justify-center mb-2.5">
                    {p.icon}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1A110B]">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#6E5D52] mt-1 leading-normal">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom action */}
            <div className="mt-8 flex items-center gap-4">
              <WhatsAppButton
                href={buildWhatsAppUrl('Hello Kafeco! I would like to inquire about your beans and catering.')}
                label="Chat with Our Baristas"
              />
              <span className="text-xs text-[#8A7569]">
                Bean retail & ground bags available at cafe counter.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
