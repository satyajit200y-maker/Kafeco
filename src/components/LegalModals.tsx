import React from 'react';
import { X, Shield, FileText, Coffee, MapPin } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeInfo.ts';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1A110B]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#EADFD5] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#F3ECE2] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAF4ED] text-[#C67937] flex items-center justify-center">
              {type === 'privacy' ? (
                <Shield className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1A110B]">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service & Café Guidelines'}
              </h3>
              <p className="text-xs text-[#7E5738]">
                Kafeco Artisan Café · Kozhencherry, Kerala
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFE6DC] text-[#8A7569] transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#4A3B32] leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-medium text-[#1A110B]">
                Last Updated: September 2026. This Privacy Policy explains how Kafeco ("we", "our", or "us") manages visitor data on our website (kafeco.in).
              </p>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  1. Information We Collect
                </h4>
                <p>
                  We prioritize privacy. We do not require account registration or store credit card details on this website. When you submit a table reservation or order through WhatsApp, your communication takes place directly via Meta's end-to-end encrypted WhatsApp protocol.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  2. Cookies & Local Storage
                </h4>
                <p>
                  We store minimal local settings (such as your cookie consent choices and reduced-motion preferences) strictly in your browser's local storage. You can manage or revoke these at any time via the Cookie Settings banner in the footer.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  3. Third-Party Integrations
                </h4>
                <p>
                  Our site interfaces with Google Maps and Apple Maps to supply route guidance, and WhatsApp to facilitate instant chat orders. These services operate under their respective privacy policies.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  4. Data Retention & Your Rights
                </h4>
                <p>
                  We do not sell personal data to advertisers. Under Indian IT regulations, you may request deletion of any contact correspondence by reaching out to hello@kafeco.in.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  5. Contact Information
                </h4>
                <p>
                  Kafeco Artisan Café, The Riverway Square, Main Central Road, Kozhencherry, Kerala 689641. Phone: {CAFE_INFO.phone}.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="font-medium text-[#1A110B]">
                Welcome to Kafeco. By using our website and visiting our roastery in Kozhencherry, Kerala, you agree to these operational terms and house guidelines.
              </p>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  1. Menu Information & Pricing
                </h4>
                <p>
                  All menu pricing is displayed in Indian Rupees (₹) and includes applicable taxes. Because our coffee is single-estate harvest and our bakery uses small-batch wild fermentation, certain microlots or bakes may sell out before the close of day.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  2. Allergen & Dietary Information
                </h4>
                <p>
                  Our bakery prepares foods containing wheat (gluten), dairy, tree nuts (almonds, walnuts), and eggs. While we follow strict sanitization protocols, cross-contact is possible. Please inform your barista of any severe allergies before ordering.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  3. Seating & Café Etiquette
                </h4>
                <p>
                  We welcome digital nomads and readers! We offer high-speed guest Wi-Fi and power outlets near designated communal tables. We kindly ask guests to use headphones during audio calls to maintain a serene atmosphere for all patrons.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  4. Intellectual Property
                </h4>
                <p>
                  The Kafeco brand name, coffee tasting logos, recipe names, and website photography are the exclusive property of Kafeco Artisan Roastery.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A110B] mb-1">
                  5. Changes & Inquiries
                </h4>
                <p>
                  We reserve the right to revise these terms to reflect seasonal menus or legal updates. Questions may be addressed to hello@kafeco.in or +91 98470 12345.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#F3ECE2] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2C1D14] text-white text-xs font-semibold hover:bg-[#432C1E]"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
