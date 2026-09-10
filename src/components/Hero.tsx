import React from 'react';
import { Coffee, MapPin, Sparkles, Navigation, ArrowDown, ShieldCheck, Heart } from 'lucide-react';
import { CAFE_INFO, getCafeStatus, buildWhatsAppUrl } from '../data/cafeInfo.ts';
import { PrimaryButton, SecondaryButton, WhatsAppButton } from './Buttons.tsx';
import { trackAnalyticsEvent } from '../utils/analytics.ts';
import { REAL_CAFE_ASSETS } from '../assets/realCafeImages.ts';

export const Hero: React.FC = () => {
  const status = getCafeStatus();

  const handleExploreMenu = () => {
    trackAnalyticsEvent('hero_cta_click', { target: 'menu' });
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirections = () => {
    trackAnalyticsEvent('directions_click', { source: 'hero_button' });
    window.open(CAFE_INFO.maps.googleDirectionsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Subtle organic background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#E6D8C6]/40 via-[#F5ECE1]/60 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Location & Status Eyebrow */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EFE6DC] text-[#7E5738] border border-[#E0D3C5]">
                <MapPin className="w-3.5 h-3.5 text-[#C67937]" />
                Kozhencherry, Central Travancore
              </span>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/90 border border-[#E0D3C5] shadow-2xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
                  }`}
                />
                <span className="text-[#3A2B22] font-semibold">
                  {status.message}
                </span>
              </div>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-serif font-bold text-[#1A110B] tracking-tight leading-[1.12]">
              Handcrafted Coffee.{' '}
              <span className="text-[#C67937] italic font-normal">
                Slow Bakes.
              </span>{' '}
              Soulful Gathering.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#5D4E45] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A specialty roastery and artisan bakery nestled near the historic Pamba River bridge in Kozhencherry. We roast high-elevation estate Arabica from Wayanad and bake wild-fermented sourdoughs fresh every morning.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <PrimaryButton
                size="lg"
                onClick={handleExploreMenu}
                trackingName="hero_explore_menu"
                className="w-full sm:w-auto shadow-md"
              >
                Explore Full Menu
              </PrimaryButton>

              <WhatsAppButton
                size="lg"
                href={buildWhatsAppUrl('Hello Kafeco! I would like to reserve a table / place an order.')}
                label="Order via WhatsApp"
                className="w-full sm:w-auto"
              />

              <SecondaryButton
                size="lg"
                onClick={handleDirections}
                icon={<Navigation className="w-4 h-4 text-[#C67937]" />}
                trackingName="hero_directions"
                className="w-full sm:w-auto"
              >
                Get Directions
              </SecondaryButton>
            </div>

            {/* Micro Highlights */}
            <div className="mt-12 pt-8 border-t border-[#E8DDD2] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              {CAFE_INFO.stats.map((stat, idx) => (
                <div key={idx} className="p-2">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#1A110B]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#7E5738] font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Feature Image - Real Kafeco Storefront */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group bg-[#2C1D14]">
                <img
                  src={REAL_CAFE_ASSETS.storefront}
                  alt="Kafeco Kozhencherry storefront with illuminated neon sign, turquoise French facade, and canopy of warm Edison bulbs"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/85 via-transparent to-black/20" />

                {/* Overlay Card Inside Image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EADFD5] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF4ED] flex items-center justify-center text-[#C67937]">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E5738]">
                          Artisan Café & Roastery
                        </div>
                        <div className="font-serif text-sm font-bold text-[#1A110B]">
                          Kafeco · Kozhencherry, Kerala
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Open Today
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Real Daily Special Preview */}
              <div className="absolute -top-5 -left-4 sm:-left-6 p-2.5 sm:p-3 rounded-2xl bg-white shadow-xl border border-[#EADFD5] flex items-center gap-3 max-w-[250px]">
                <img
                  src={REAL_CAFE_ASSETS.avalMilk}
                  alt="Kafeco Blackboard Special Aval Milk"
                  className="w-12 h-12 rounded-xl object-cover border border-[#EADFD5]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C67937]">
                    Today's Special
                  </div>
                  <div className="text-xs font-bold text-[#1A110B] leading-tight">
                    Special Aval Milk & Shakes
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Local Coffee Culture */}
              <div className="absolute -bottom-4 -right-4 p-3.5 rounded-2xl bg-[#2C1D14] text-white shadow-xl border border-[#432C1E] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#E29250]">
                  <Heart className="w-4 h-4 fill-[#E29250]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-[#D8C7B5]">
                    Locally Cherished
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Near Kozhencherry Bridge
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
