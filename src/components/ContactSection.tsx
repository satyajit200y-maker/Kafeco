import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Calendar, Users, Send, CheckCircle2, Clock } from 'lucide-react';
import { CAFE_INFO, buildWhatsAppUrl } from '../data/cafeInfo.ts';
import { SectionHeading, PrimaryButton, WhatsAppButton } from './Buttons.tsx';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('16:00');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAnalyticsEvent('reservation_inquiry_submit', {
      name,
      guests,
      date,
      time,
    });

    // Form pre-fills a clean WhatsApp message
    const formattedMsg = `*Kafeco Table Inquiry*\nName: ${name}\nPhone: ${phone}\nGuests: ${guests}\nDate: ${date || 'Today'}\nTime: ${time}\nNote: ${message || 'Looking forward to visiting!'}`;
    const whatsappUrl = `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(formattedMsg)}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Connect with Us"
          title="Reserve a Table or Inquire for Events"
          subtitle="Planning a cozy birthday breakfast, a quiet work session, or need single-origin beans ground for your home brew setup? We are here for you."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Quick Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-white border border-[#EADFD5] shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#1A110B] mb-2">
                Instant Communication
              </h3>
              <p className="text-xs text-[#5D4E45] mb-6 leading-relaxed">
                For immediate table availability, takeout orders, or bean recommendations, WhatsApp and phone calls are prioritized by our on-duty baristas.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackAnalyticsEvent('whatsapp_click', { source: 'contact_box' })
                  }
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#128C7E] uppercase tracking-wider">
                      Live Chat & Quick Orders
                    </div>
                    <div className="text-sm font-bold text-[#1A110B] group-hover:text-[#128C7E]">
                      WhatsApp (+91 98470 12345)
                    </div>
                    <div className="text-[11px] text-[#5D4E45]">
                      Average response: Under 3 minutes
                    </div>
                  </div>
                </a>

                {/* Direct Phone */}
                <a
                  href={`tel:${CAFE_INFO.phoneClean}`}
                  onClick={() =>
                    trackAnalyticsEvent('phone_click', { source: 'contact_box' })
                  }
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFD5] hover:bg-[#F3ECE2] transition-colors group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#2C1D14] text-[#FAF7F2] flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#7E5738] uppercase tracking-wider">
                      Direct Front Desk Call
                    </div>
                    <div className="text-sm font-bold text-[#1A110B] group-hover:text-[#C67937]">
                      {CAFE_INFO.phone}
                    </div>
                    <div className="text-[11px] text-[#5D4E45]">
                      Available 8:00 AM – 10:30 PM
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CAFE_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFD5] hover:bg-[#F3ECE2] transition-colors group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FAF4ED] border border-[#EADFD5] text-[#C67937] flex items-center justify-center shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#7E5738] uppercase tracking-wider">
                      Events & Bulk Bean Roasts
                    </div>
                    <div className="text-sm font-bold text-[#1A110B]">
                      {CAFE_INFO.email}
                    </div>
                    <div className="text-[11px] text-[#5D4E45]">
                      Partnerships & private bookings
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Table Inquiry / Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#EADFD5] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#1A110B]">
                Reserve or Send an Inquiry
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#5D4E45] leading-relaxed">
                Fill in your details below and we will prepare your seating or reach out on WhatsApp to confirm.
              </p>

              {submitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-[#FAF4ED] border border-[#EADFD5] text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#25D366] mx-auto mb-3" />
                  <h4 className="font-serif text-lg font-bold text-[#1A110B]">
                    Inquiry Prepared & WhatsApp Opened!
                  </h4>
                  <p className="text-xs text-[#5D4E45] mt-1 max-w-md mx-auto">
                    We've generated your message. If WhatsApp did not open automatically, you can tap below to send it directly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold rounded-full bg-[#2C1D14] text-white"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A110B] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Thomas"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E0D3C5] rounded-xl text-[#1A110B] placeholder-[#A89487] focus:outline-none focus:ring-2 focus:ring-[#C67937]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A110B] mb-1">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98470 xxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E0D3C5] rounded-xl text-[#1A110B] placeholder-[#A89487] focus:outline-none focus:ring-2 focus:ring-[#C67937]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A110B] mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E0D3C5] rounded-xl text-[#1A110B] focus:outline-none focus:ring-2 focus:ring-[#C67937]"
                      >
                        <option value="1">1 Person (Solo work/reading)</option>
                        <option value="2">2 People</option>
                        <option value="3-4">3 - 4 People</option>
                        <option value="5-8">5 - 8 People (Group Table)</option>
                        <option value="8+">8+ People (Event/Celebration)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A110B] mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E0D3C5] rounded-xl text-[#1A110B] focus:outline-none focus:ring-2 focus:ring-[#C67937]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A110B] mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E0D3C5] rounded-xl text-[#1A110B] focus:outline-none focus:ring-2 focus:ring-[#C67937]"
                      >
                        <option value="09:00">09:00 AM (Breakfast / Brew)</option>
                        <option value="11:30">11:30 AM (Mid-day)</option>
                        <option value="14:00">02:00 PM (Afternoon Quiet)</option>
                        <option value="16:30">04:30 PM (Evening Sourdough)</option>
                        <option value="18:30">06:30 PM (Golden Hour)</option>
                        <option value="20:30">08:30 PM (Dinner / Late Brew)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A110B] mb-1">
                      Notes or Special Requests (Allergies, Dietary, Seating)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Quiet corner table for reading, almond milk preferred, celebration cake request..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E0D3C5] rounded-xl text-[#1A110B] placeholder-[#A89487] focus:outline-none focus:ring-2 focus:ring-[#C67937]"
                    />
                  </div>

                  <div className="pt-2">
                    <PrimaryButton
                      type="submit"
                      fullWidth
                      icon={<Send className="w-4 h-4 ml-2" />}
                      size="md"
                      trackingName="contact_form_submit"
                    >
                      Send via WhatsApp
                    </PrimaryButton>
                    <p className="text-[11px] text-[#8A7569] text-center mt-2">
                      Instant response on WhatsApp. No booking fees or advance payments required for standard tables.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
