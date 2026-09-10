import React, { useState } from 'react';
import { Sparkles, X, Maximize2, Camera } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/galleryData.ts';
import { GalleryImage } from '../types.ts';
import { SectionHeading } from './Buttons.tsx';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const filters = [
    { id: 'all', label: 'All Moments' },
    { id: 'coffee', label: 'Coffee Craft' },
    { id: 'bakery', label: 'Artisan Bakes' },
    { id: 'ambience', label: 'Café Ambience' },
    { id: 'community', label: 'Community' },
  ];

  const filtered = activeFilter === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const handleOpenLightbox = (img: GalleryImage) => {
    setActiveImage(img);
    trackAnalyticsEvent('gallery_lightbox_open', { image: img.title });
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Kafeco Atmosphere"
          title="Moments Caught in Light & Brew"
          subtitle="Step inside our Kozhencherry sanctuary — from early morning croissant lamination to sunset pour-overs and warm gatherings."
          align="center"
        />

        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === f.id
                  ? 'bg-[#2C1D14] text-white shadow-xs'
                  : 'bg-white text-[#6E5D52] hover:bg-[#F3ECE2] border border-[#EADFD5]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#EADFD5] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/85 via-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover overlay content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E29250]">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#EADFD5] line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-[#1A110B]/90 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1A110B] rounded-3xl overflow-hidden shadow-2xl border border-[#432C1E]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-[#C67937]"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] max-h-[70vh] bg-black">
              <img
                src={activeImage.url}
                alt={activeImage.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-[#24170E] text-white">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C67937] text-white">
                  {activeImage.category}
                </span>
                <span className="text-xs text-[#A89487]">Kafeco Kozhencherry</span>
              </div>
              <h3 className="font-serif text-xl font-bold mt-2">
                {activeImage.title}
              </h3>
              <p className="text-sm text-[#D8C7B5] mt-1">
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
