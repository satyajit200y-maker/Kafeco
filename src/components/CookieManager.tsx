import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, Settings } from 'lucide-react';
import { CookiePreferences } from '../types.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: false,
  hasConsented: false,
};

export const CookieManager: React.FC = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('kafeco_cookie_consent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } catch {
        setShowBanner(true);
      }
    } else {
      // Show after small delay so page loads smoothly
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const updated = {
      ...prefs,
      hasConsented: true,
      timestamp: new Date().toISOString(),
    };
    setPreferences(updated);
    localStorage.setItem('kafeco_cookie_consent', JSON.stringify(updated));
    setShowBanner(false);
    setShowSettings(false);
    trackAnalyticsEvent('cookie_consent_saved', {
      analytics: updated.analytics,
      marketing: updated.marketing,
    });
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      hasConsented: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      hasConsented: true,
    });
  };

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div
          className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/98 backdrop-blur-md rounded-2xl p-5 border border-[#EADFD5] shadow-2xl transition-all"
          role="region"
          aria-label="Cookie consent notice"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAF4ED] text-[#C67937] flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-serif text-sm font-bold text-[#1A110B]">
                Cookie & Privacy Choices
              </h4>
              <p className="text-xs text-[#5D4E45] mt-1 leading-relaxed">
                We use essential cookies to maintain your café preferences and privacy settings, and optional analytics to measure popular brews. No tracking ads.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F5ECE1] flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => setShowSettings(true)}
              className="text-xs font-semibold text-[#7E5738] hover:text-[#1A110B] underline cursor-pointer"
            >
              Customize
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRejectNonEssential}
                className="px-3 py-1.5 rounded-lg border border-[#D8C7B5] text-xs font-semibold text-[#5D4E45] hover:bg-[#FAF7F2] cursor-pointer"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-3.5 py-1.5 rounded-lg bg-[#2C1D14] text-white text-xs font-semibold hover:bg-[#432C1E] cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 bg-[#1A110B]/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-[#EADFD5] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3ECE2]">
              <div className="flex items-center gap-2.5">
                <Settings className="w-5 h-5 text-[#C67937]" />
                <h3 id="cookie-settings-title" className="font-serif text-xl font-bold text-[#1A110B]">
                  Cookie Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-full hover:bg-[#FAF4ED] text-[#8A7569]"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              {/* Essential */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADFD5]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#1A110B]">
                    Essential Cookies
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EADFD5] text-[#7E5738]">
                    Always Active
                  </span>
                </div>
                <p className="text-[#5D4E45] text-xs">
                  Required for core site performance, reduced-motion accessibility preference, and security validation.
                </p>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-xl bg-white border border-[#EADFD5]">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="toggle-analytics" className="font-bold text-[#1A110B] cursor-pointer">
                    Analytics & Performance
                  </label>
                  <input
                    id="toggle-analytics"
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        analytics: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-[#C67937] rounded cursor-pointer"
                  />
                </div>
                <p className="text-[#5D4E45] text-xs">
                  Anonymously tracks menu view counts, popular filters, and directions clicks to improve user experience.
                </p>
              </div>

              {/* Marketing */}
              <div className="p-4 rounded-xl bg-white border border-[#EADFD5]">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="toggle-marketing" className="font-bold text-[#1A110B] cursor-pointer">
                    Social & Campaign Integrations
                  </label>
                  <input
                    id="toggle-marketing"
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        marketing: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-[#C67937] rounded cursor-pointer"
                  />
                </div>
                <p className="text-[#5D4E45] text-xs">
                  Enables enhanced preview cards when sharing Kafeco menu items to Instagram or WhatsApp.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F3ECE2] flex items-center justify-end gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5D4E45] hover:bg-[#FAF7F2]"
              >
                Cancel
              </button>
              <button
                onClick={() => saveConsent(preferences)}
                className="px-5 py-2 rounded-xl bg-[#2C1D14] text-white text-xs font-semibold hover:bg-[#432C1E]"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
