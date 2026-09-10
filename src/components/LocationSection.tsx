import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, MessageCircle, ExternalLink, Compass, ShieldCheck, Car, Bus } from 'lucide-react';
import { CAFE_INFO, getCafeStatus, buildWhatsAppUrl } from '../data/cafeInfo.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';
import { SectionHeading, WhatsAppButton, PrimaryButton, SecondaryButton } from './Buttons.tsx';

export const LocationSection: React.FC = () => {
  const status = getCafeStatus();
  const [mapType, setMapType] = useState<'interactive' | 'directions'>('interactive');

  const handleGoogleMapsClick = () => {
    trackAnalyticsEvent('google_maps_click', {
      url: CAFE_INFO.maps.googleMapsUrl,
    });
    window.open(CAFE_INFO.maps.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAppleMapsClick = () => {
    trackAnalyticsEvent('apple_maps_click', {
      url: CAFE_INFO.maps.appleMapsUrl,
    });
    // On iOS devices, maps:// will open Apple Maps native app; otherwise opens web
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const targetUrl = isIOS ? CAFE_INFO.maps.appleMapsAppUrl : CAFE_INFO.maps.appleMapsUrl;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirectionsClick = () => {
    trackAnalyticsEvent('directions_click', {
      provider: 'google',
      destination: `${CAFE_INFO.geo.lat},${CAFE_INFO.geo.lng}`,
    });
    window.open(CAFE_INFO.maps.googleDirectionsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#F3ECE2]/60 border-t border-[#E8DDD2] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit Our Roastery"
          title="Find Us by the River in Kozhencherry"
          subtitle="Conveniently situated on the Main Central Road (SH-07) just a short walk from the historic Kozhencherry Bridge across the Pamba River."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location Card & Opening Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADFD5] shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C67937]">
                    Kozhencherry Roastery
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1A110B] mt-1">
                    {CAFE_INFO.name}
                  </h3>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.badgeColor}`}
                >
                  {status.isOpen ? 'Open Now' : 'Closed'}
                </div>
              </div>

              <div className="mt-4 text-sm text-[#5D4E45] space-y-1">
                <p className="font-medium text-[#1A110B]">{CAFE_INFO.address.line1}</p>
                <p>{CAFE_INFO.address.line2}</p>
                <p>
                  {CAFE_INFO.address.city}, {CAFE_INFO.address.district} District, {CAFE_INFO.address.state} — {CAFE_INFO.address.pincode}
                </p>
              </div>

              {/* Map Actions (Google & Apple Maps) */}
              <div className="mt-6 pt-6 border-t border-[#F3ECE2] space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8A7569]">
                  Get Navigation Directions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Google Maps Button */}
                  <button
                    onClick={handleGoogleMapsClick}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#4285F4] text-white text-xs font-semibold hover:bg-[#3367D6] transition-colors cursor-pointer"
                    aria-label="Open in Google Maps"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </button>

                  {/* Apple Maps Button */}
                  <button
                    onClick={handleAppleMapsClick}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1A110B] text-white text-xs font-semibold hover:bg-[#332216] transition-colors cursor-pointer"
                    aria-label="Open in Apple Maps"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#FAF7F2]" />
                    <span>Apple Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </button>
                </div>

                <PrimaryButton
                  fullWidth
                  onClick={handleDirectionsClick}
                  trackingName="location_get_directions"
                  icon={<Navigation className="w-4 h-4 ml-2" />}
                  size="md"
                >
                  Turn-by-Turn Navigation
                </PrimaryButton>
              </div>

              {/* Contact actions */}
              <div className="mt-6 pt-5 border-t border-[#F3ECE2] grid grid-cols-2 gap-2">
                <a
                  href={`tel:${CAFE_INFO.phoneClean}`}
                  onClick={() =>
                    trackAnalyticsEvent('phone_click', { source: 'location_card' })
                  }
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#D8C7B5] bg-[#FAF7F2] text-xs font-semibold text-[#2C1D14] hover:bg-[#FAF4ED]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C67937]" />
                  Call Desk
                </a>

                <WhatsAppButton
                  href={buildWhatsAppUrl('Hello Kafeco! I am on my way / need parking assistance.')}
                  label="WhatsApp"
                  size="sm"
                />
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADFD5] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#C67937]" />
                  <h4 className="font-serif text-lg font-bold text-[#1A110B]">
                    Roastery Hours
                  </h4>
                </div>
                <span className="text-xs text-[#7E5738] font-medium">
                  Fresh roasts daily
                </span>
              </div>

              <div className="divide-y divide-[#F5ECE1] text-xs sm:text-sm">
                {CAFE_INFO.hours.map((item, idx) => {
                  const now = new Date();
                  const dayName = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ][now.getDay()];
                  const isToday = item.day === dayName;

                  return (
                    <div
                      key={idx}
                      className={`py-2 flex items-center justify-between ${
                        isToday ? 'font-bold text-[#C67937] bg-[#FAF4ED] px-2 rounded-lg' : 'text-[#5D4E45]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.day}
                        {isToday && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C67937] text-white">
                            Today
                          </span>
                        )}
                      </span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Map Embed & Distance Guide */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Map Box */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#EADFD5] shadow-md">
              <div className="p-4 bg-[#FAF7F2] border-b border-[#EADFD5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C67937]" />
                  <span className="text-xs font-bold text-[#1A110B]">
                    Kafeco Roastery Pin · Kozhencherry, Kerala
                  </span>
                </div>
                <span className="text-[11px] text-[#7E5738]">
                  Lat: 9.3414° N, Long: 76.7029° E
                </span>
              </div>

              {/* Responsive Embed Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#EFE6DC]">
                <iframe
                  title="Kafeco Location Map"
                  src={CAFE_INFO.maps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Overlay quick directions pill */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EADFD5] shadow-lg flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-[#1A110B]">
                      Main Central Road (SH-07)
                    </div>
                    <div className="text-[11px] text-[#7E5738]">
                      Free visitor car & two-wheeler parking available
                    </div>
                  </div>
                  <button
                    onClick={handleDirectionsClick}
                    className="px-3 py-1.5 rounded-lg bg-[#C67937] text-white text-xs font-semibold hover:bg-[#AF6424] transition-colors"
                  >
                    Navigate
                  </button>
                </div>
              </div>
            </div>

            {/* Travel Guide & Nearby Hubs */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADFD5] shadow-xs">
              <h4 className="font-serif text-lg font-bold text-[#1A110B] mb-2 flex items-center gap-2">
                <Car className="w-5 h-5 text-[#C67937]" />
                How to Reach Us
              </h4>
              <p className="text-xs text-[#5D4E45] mb-5">
                Whether arriving from neighboring towns or stopping along Central Travancore highway, Kafeco is easily accessible.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAFE_INFO.travelDistances.map((td, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADFD5] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#1A110B]">
                        {td.from}
                      </div>
                      <div className="text-[11px] text-[#8A7569]">
                        {td.time}
                      </div>
                    </div>
                    <span className="text-xs font-serif font-bold text-[#C67937]">
                      {td.distance}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3.5 rounded-xl bg-[#FAF4ED] border border-[#E0D3C5] text-xs text-[#5D3E27] flex items-start gap-2.5">
                <Bus className="w-4 h-4 text-[#C67937] shrink-0 mt-0.5" />
                <p>
                  <strong>Public Transit Note:</strong> KSRTC buses running between Pathanamthitta, Tiruvalla, and Chengannur stop at the Kozhencherry Bridge Junction, just 250 meters from our doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
