export type DietaryTag = 'veg' | 'non-veg' | 'vegan' | 'gluten-free' | 'chef-special';

export interface MenuItem {
  id: string;
  name: string;
  malayalamName?: string;
  category: 'coffee' | 'manual-brew' | 'bakery' | 'savory' | 'coolers' | 'desserts';
  price: number; // in INR
  description: string;
  ingredients?: string[];
  dietary: DietaryTag[];
  isPopular?: boolean;
  isSeasonal?: boolean;
  image: string;
  notes?: string;
}

export interface Category {
  id: 'all' | 'coffee' | 'manual-brew' | 'bakery' | 'savory' | 'coolers' | 'desserts';
  label: string;
  iconName: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'coffee' | 'bakery' | 'ambience' | 'community';
  url: string;
  alt: string;
  caption: string;
}

export interface AnalyticsEventRecord {
  id: string;
  eventName: string;
  timestamp: string;
  payload?: Record<string, unknown>;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
  timestamp?: string;
}

export interface CafeStatus {
  isOpen: boolean;
  currentDay: string;
  currentTime: string;
  nextStatusChange: string;
  hoursToday: string;
}
