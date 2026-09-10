export const CAFE_INFO = {
  name: 'Kafeco',
  tagline: 'Artisan Specialty Coffee & Bakehouse',
  subtitle: 'Handcrafted brews, estate-sourced beans, and slow bakes in the heart of Kozhencherry.',
  phone: '+91 98470 12345',
  phoneClean: '+919847012345',
  whatsappNumber: '919847012345',
  email: 'hello@kafeco.in',
  address: {
    line1: 'The Riverway Square, Near Kozhencherry Bridge Junction',
    line2: 'T.K. Road (SH-07), Kozhencherry',
    city: 'Kozhencherry',
    district: 'Pathanamthitta',
    state: 'Kerala',
    pincode: '689641',
    country: 'India',
  },
  geo: {
    lat: 9.3414,
    lng: 76.7029,
  },
  maps: {
    googleMapsUrl: 'https://maps.google.com/?q=Kafeco+Coffee+Roastery+Kozhencherry+Kerala',
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.3414,76.7029&destination_place_id=Kafeco+Kozhencherry',
    appleMapsUrl: 'https://maps.apple.com/?daddr=9.3414,76.7029&q=Kafeco+Artisan+Cafe+Kozhencherry',
    appleMapsAppUrl: 'maps://?daddr=9.3414,76.7029&q=Kafeco+Artisan+Cafe+Kozhencherry',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15745.334057868846!2d76.695!3d9.3414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b063d91cfad5a11%3A0x6b63d7e825a0735!2sKozhencherry%2C%20Kerala%20689641!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },
  hours: [
    { day: 'Monday', open: '08:00', close: '22:30', label: '8:00 AM – 10:30 PM' },
    { day: 'Tuesday', open: '08:00', close: '22:30', label: '8:00 AM – 10:30 PM' },
    { day: 'Wednesday', open: '08:00', close: '22:30', label: '8:00 AM – 10:30 PM' },
    { day: 'Thursday', open: '08:00', close: '22:30', label: '8:00 AM – 10:30 PM' },
    { day: 'Friday', open: '08:00', close: '23:00', label: '8:00 AM – 11:00 PM (Late Brew)' },
    { day: 'Saturday', open: '08:00', close: '23:00', label: '8:00 AM – 11:00 PM (Late Brew)' },
    { day: 'Sunday', open: '08:00', close: '22:30', label: '8:00 AM – 10:30 PM' },
  ],
  socials: {
    instagram: 'https://instagram.com/kafecocoffee',
    facebook: 'https://facebook.com/kafecocoffee',
    youtube: 'https://youtube.com/@kafecocoffee',
  },
  stats: [
    { value: '100%', label: 'Single-Origin Arabica' },
    { value: '48h', label: 'Cold Brew Maceration' },
    { value: '24h', label: 'Fermented Sourdough' },
    { value: '4.9 ★', label: 'Customer Rating (600+)' },
  ],
  travelDistances: [
    { from: 'Kozhencherry Bus Stand', distance: '400 m', time: '5 min walk' },
    { from: 'Kozhencherry Bridge (Pamba River)', distance: '250 m', time: '3 min walk' },
    { from: 'Pathanamthitta Town', distance: '12 km', time: '20 min drive' },
    { from: 'Tiruvalla Railway Station', distance: '18 km', time: '30 min drive' },
    { from: 'Chengannur Railway Station', distance: '14 km', time: '22 min drive' },
  ],
};

export function getCafeStatus(): {
  isOpen: boolean;
  message: string;
  badgeColor: string;
  todayHours: string;
} {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Sunday, 1 = Monday
  // Map JS day to our hours array
  const dayMap = [6, 0, 1, 2, 3, 4, 5];
  const todayConfig = CAFE_INFO.hours[dayMap[dayIndex]];

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = todayConfig.open.split(':').map(Number);
  const [closeH, closeM] = todayConfig.close.split(':').map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    message: isOpen ? `Open now until ${todayConfig.close.split(':')[0] > '12' ? `${Number(todayConfig.close.split(':')[0]) - 12}:${todayConfig.close.split(':')[1]} PM` : `${todayConfig.close} AM`}` : 'Currently Closed · Opens 8:00 AM',
    badgeColor: isOpen ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300',
    todayHours: todayConfig.label,
  };
}

export function buildWhatsAppUrl(message?: string): string {
  const defaultText = encodeURIComponent(
    message || 'Hello Kafeco! I would like to inquire about your menu, today specials, or reserve a table.'
  );
  return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${defaultText}`;
}

export function buildMenuItemWhatsAppUrl(itemName: string, price: number): string {
  const text = encodeURIComponent(
    `Hello Kafeco! I would like to order "${itemName}" (₹${price}) for pickup/dine-in. Please let me know the preparation time.`
  );
  return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${text}`;
}
