import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MessageCircle, Sparkles, Coffee, Flame, Croissant, UtensilsCrossed, GlassWater, Cake, Check, Info } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData.ts';
import { MenuItem, DietaryTag } from '../types.ts';
import { buildMenuItemWhatsAppUrl } from '../data/cafeInfo.ts';
import { trackAnalyticsEvent } from '../utils/analytics.ts';
import { SectionHeading } from './Buttons.tsx';

const ICONS_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Croissant: <Croissant className="w-4 h-4" />,
  UtensilsCrossed: <UtensilsCrossed className="w-4 h-4" />,
  GlassWater: <GlassWater className="w-4 h-4" />,
  Cake: <Cake className="w-4 h-4" />,
};

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    trackAnalyticsEvent('menu_view');
  }, []);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    trackAnalyticsEvent('menu_category_select', { category: catId });
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary match
      if (selectedDietary !== 'all' && !item.dietary.includes(selectedDietary)) {
        return false;
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesIngredients = item.ingredients?.some((ing) =>
          ing.toLowerCase().includes(q)
        );
        return matchesName || matchesDesc || matchesIngredients;
      }
      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Artisan Menu"
          title="Estate Roasts, Manual Brews & Fresh Bakes"
          subtitle="All prices in Indian Rupees (₹), inclusive of artisanal craftsmanship and local taxes. Vegetarian, vegan, and dairy-free alternatives available."
          align="center"
        />

        {/* Category Tabs (Section 24 CategoryTabs) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#2C1D14] text-white shadow-md'
                    : 'bg-white text-[#5D4E45] hover:bg-[#F3ECE2] border border-[#EADFD5]'
                }`}
                aria-pressed={isActive}
              >
                <span className={isActive ? 'text-[#E29250]' : 'text-[#8A7569]'}>
                  {ICONS_MAP[cat.iconName]}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="mt-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EADFD5] shadow-xs">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7569]" />
            <input
              type="text"
              placeholder="Search espresso, cardamom, sourdough, cheesecake..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#FAF7F2] border border-[#E0D3C5] rounded-xl text-[#1A110B] placeholder-[#8A7569] focus:outline-none focus:ring-2 focus:ring-[#C67937]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7569] hover:text-[#1A110B]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto justify-start md:justify-end pb-1 md:pb-0">
            <span className="text-xs font-semibold text-[#8A7569] flex items-center gap-1 mr-1 hidden sm:flex">
              <Filter className="w-3 h-3" /> Dietary:
            </span>
            {(['all', 'veg', 'vegan', 'gluten-free', 'chef-special'] as const).map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedDietary(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                    selectedDietary === tag
                      ? 'bg-[#C67937] text-white font-semibold'
                      : 'bg-[#FAF7F2] text-[#5D4E45] hover:bg-[#EFE6DC] border border-[#EADFD5]'
                  }`}
                >
                  {tag === 'all'
                    ? 'All'
                    : tag === 'chef-special'
                    ? "Chef's Pick"
                    : tag}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs sm:text-sm text-[#7E5738] font-medium">
            Showing {filteredItems.length} handcrafted{' '}
            {filteredItems.length === 1 ? 'creation' : 'creations'}
          </p>
          <span className="text-xs text-[#8A7569]">
            Customizations (oat milk, extra shot) available upon order
          </span>
        </div>

        {/* Menu Cards Grid (Section 24 MenuCard) */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EADFD5]">
            <Coffee className="w-12 h-12 text-[#C67937] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#1A110B]">
              No menu items match your search
            </h3>
            <p className="text-sm text-[#5D4E45] mt-1">
              Try adjusting your search terms or dietary filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDietary('all');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-full bg-[#2C1D14] text-white hover:bg-[#432C1E]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#EADFD5] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF4ED]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.dietary.includes('chef-special') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C67937] text-white shadow-xs">
                          Chef's Choice
                        </span>
                      )}
                      {item.dietary.includes('vegan') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white">
                          Vegan
                        </span>
                      )}
                      {item.dietary.includes('gluten-free') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-700 text-white">
                          Gluten-Free
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#1A110B]/85 text-white font-serif font-bold text-sm backdrop-blur-xs">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#1A110B] leading-snug">
                        {item.name}
                      </h3>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-[#5D4E45] leading-relaxed">
                      {item.description}
                    </p>

                    {item.notes && (
                      <p className="mt-2 text-[11px] text-[#7E5738] italic font-medium">
                        ✦ {item.notes}
                      </p>
                    )}

                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#F5ECE1]">
                        <div className="text-[10px] uppercase font-bold text-[#8A7569] tracking-wider mb-1">
                          Craft Ingredients
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.ingredients.map((ing, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[11px] text-[#5D4E45]"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom WhatsApp Order CTA */}
                <div className="p-5 pt-0">
                  <a
                    href={buildMenuItemWhatsAppUrl(item.name, item.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackAnalyticsEvent('whatsapp_click', {
                        source: 'menu_card',
                        item: item.name,
                        price: item.price,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp (₹{item.price})</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
