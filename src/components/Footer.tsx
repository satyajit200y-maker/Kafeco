import React from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, MessageCircle, Heart, Shield, FileText, Sparkles, Navigation } from 'lucide-react';
import { CAFE_INFO, buildWhatsAppUrl } from '../data/cafeInfo.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenBlueprint: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenBlueprint,
}) => {
  return (
    <footer className="bg-[#1A110B] text-[#FAF7F2] pt-16 pb-24 sm:pb-16 border-t border-[#332216]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2C1D14]">
          {/* Brand & Vision */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C67937] flex items-center justify-center text-white">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                KAFECO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#CDBBB0] leading-relaxed max-w-sm">
              Artisan specialty coffee roastery and bakehouse in Kozhencherry, Kerala. Single-origin estate harvests, manual pour-overs, and daily wild-fermented sourdoughs.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={CAFE_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2C1D14] hover:bg-[#C67937] flex items-center justify-center text-[#FAF7F2] transition-colors text-xs font-semibold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={CAFE_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2C1D14] hover:bg-[#C67937] flex items-center justify-center text-[#FAF7F2] transition-colors text-xs font-semibold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E29250]">
              Explore
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A89487]">
              <li>
                <a href="#menu" className="hover:text-[#FAF7F2] transition-colors">
                  Artisan Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FAF7F2] transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#FAF7F2] transition-colors">
                  Atmosphere
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#FAF7F2] transition-colors">
                  Hours & Map
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
                  Table Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & NAP (Section 15 & 17) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E29250]">
              Roastery Location
            </div>
            <div className="text-xs sm:text-sm text-[#CDBBB0] space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C67937] shrink-0 mt-0.5" />
                <span>
                  The Riverway Square, Main Central Road, Near Kozhencherry Bridge, Kerala 689641
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C67937] shrink-0" />
                <a
                  href={`tel:${CAFE_INFO.phoneClean}`}
                  className="hover:text-white transition-colors"
                >
                  {CAFE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C67937] shrink-0" />
                <a
                  href={`mailto:${CAFE_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CAFE_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Hours & Master Blueprint */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E29250]">
              Roastery Schedule
            </div>
            <p className="text-xs text-[#CDBBB0] leading-relaxed">
              Monday – Thursday & Sunday: 8:00 AM – 10:30 PM<br />
              Friday & Saturday: 8:00 AM – 11:00 PM (Late Night Brews)
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBlueprint}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#2C1D14] hover:bg-[#3D281C] text-xs font-semibold text-[#FAF7F2] border border-[#432C1E] transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E29250]" />
                <span>Master Architecture & QA (26 Specs)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Local SEO Note */}
        <div className="py-6 border-b border-[#2C1D14] text-[11px] text-[#8A7569] leading-relaxed">
          <p>
            <strong>Local Roastery SEO:</strong> Kafeco is a premier specialty café and artisan bakehouse situated in Kozhencherry, Pathanamthitta District, Central Travancore, Kerala. Serving specialty espresso drinks, manual V60 & Chemex pour-overs, nitro cold brews, freshly baked French butter croissants, and authentic country sourdough to patrons from Kozhencherry, Tiruvalla, Chengannur, Ranni, and Pathanamthitta.
          </p>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7569]">
          <div>
            © {new Date().getFullYear()} Kafeco Roastery & Bakehouse. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Guidelines
            </button>
            <span>·</span>
            <span className="flex items-center gap-1 text-[#CDBBB0]">
              Crafted with <Heart className="w-3 h-3 text-[#C67937] fill-[#C67937]" /> in Kerala
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
