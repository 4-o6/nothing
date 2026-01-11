
export interface Place {
  id: string;
  name: string;
  description: string;
  category: 'artisan' | 'food' | 'culture' | 'nature' | 'temple';
  imageUrl: string;
  crowdLevel: 'low' | 'moderate' | 'high';
  location: string;
  rating?: number;
  googleMapsUri?: string;
  coordinates?: { top: string; left: string }; // For static image maps
  lat?: number; // For interactive maps
  lng?: number; // For interactive maps
}

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  story: string;
  imageUrl: string;
  location: string;
  visitable: boolean;
  googleMapsUri: string;
  contactPhone: string;
}

export interface Restaurant {
  id: string;
  name: string;
  diet: 'Veg' | 'Non-Veg';
  cuisine: string;
  specialty: string;
  rating: number;
  location: string;
  imageUrl: string;
  priceRange?: string;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  location: string;
  notes: string;
  isSustainable: boolean;
}

export interface Itinerary {
  title: string;
  items: ItineraryItem[];
  seasonalGuidelines?: string[];
  safetyTips?: string[];
}

export interface BookingItem {
  id: string;
  name: string;
  type: 'hotel' | 'food' | 'vehicle';
  price: string;
  rating: number;
  imageUrl: string;
  description: string;
  features: string[];
}

export interface TourPackage {
  id: string;
  name: string;
  tier: 'Budget' | 'Standard' | 'Premium';
  price: string;
  description: string;
  features: string[];
  recommendedFor: string;
  icon: string; // just a reference string for icon component
}

export enum AppView {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  EXPLORE = 'EXPLORE',
  MAP = 'MAP',
  PACKAGES = 'PACKAGES',
  PLANNER = 'PLANNER',
  BOOKINGS = 'BOOKINGS',
  ARTISANS = 'ARTISANS',
  FOOD = 'FOOD',
  IMPACT = 'IMPACT'
}