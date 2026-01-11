import { Place, Artisan, BookingItem, TourPackage, Restaurant } from './types';

export const HERO_IMAGES = [
  "https://picsum.photos/id/1040/1200/600",
  "https://picsum.photos/id/106/1200/600",
  "https://picsum.photos/id/338/1200/600",
];

export const BUS_SCHEDULE = [
  { 
    routeNo: '201', 
    stand: 'City Bus Stand (CBS)', 
    destination: 'Chamundi Hill', 
    timings: '06:00 AM - 09:00 PM',
    frequency: 'Every 20 mins'
  },
  { 
    routeNo: '303', 
    stand: 'City Bus Stand (CBS)', 
    destination: 'KRS Dam / Brindavan', 
    timings: '06:30 AM - 08:30 PM',
    frequency: 'Every 30 mins'
  },
  { 
    routeNo: '116', 
    stand: 'City Bus Stand (CBS)', 
    destination: 'Infosys / Hebbal', 
    timings: '07:00 AM - 10:00 PM',
    frequency: 'Every 15 mins'
  },
  { 
    routeNo: '119', 
    stand: 'City Bus Stand (CBS)', 
    destination: 'Railway Station', 
    timings: '24 Hours',
    frequency: 'Every 10-15 mins'
  },
  { 
    routeNo: '10A', 
    stand: 'City Bus Stand (CBS)', 
    destination: 'Srirangapatna', 
    timings: '07:00 AM - 07:00 PM',
    frequency: 'Every 30 mins'
  },
  { 
    routeNo: 'V-1', 
    stand: 'City Bus Stand (CBS)', 
    destination: 'Palace / Zoo Loop', 
    timings: '09:00 AM - 06:00 PM',
    frequency: 'Every 30 mins' // Volvo AC
  },
  { 
    routeNo: '12', 
    stand: 'Suburban Bus Stand', 
    destination: 'Jaganmohan Palace', 
    timings: '08:00 AM - 08:00 PM',
    frequency: 'Every 45 mins'
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Original Vinayaka Mylari',
    diet: 'Veg',
    cuisine: 'Heritage South Indian',
    specialty: 'Benne Masala Dosa',
    rating: 4.9,
    location: 'Nazarbad',
    imageUrl: 'https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/ljxuoins3rrbkseksywj',
    priceRange: '₹'
  },
  {
    id: 'r2',
    name: 'Mahesh Prasad',
    diet: 'Veg',
    cuisine: 'Pure Veg South Indian',
    specialty: 'Button Idli & Coffee',
    rating: 4.7,
    location: 'Ballal Circle',
    imageUrl: 'https://picsum.photos/id/429/800/600',
    priceRange: '₹₹'
  },
  {
    id: 'r3',
    name: 'The Old House',
    diet: 'Veg',
    cuisine: 'Italian & Continental',
    specialty: 'Wood-fired Pizza',
    rating: 4.6,
    location: 'RTO Circle',
    imageUrl: 'https://picsum.photos/id/431/800/600',
    priceRange: '₹₹₹'
  },
  {
    id: 'r4',
    name: 'Hotel Hanumanthu Pulao',
    diet: 'Non-Veg',
    cuisine: 'Nati Style',
    specialty: 'Mutton Pulao',
    rating: 4.8,
    location: 'Mandi Mohalla',
    imageUrl: 'https://picsum.photos/id/292/800/600',
    priceRange: '₹₹'
  },
  {
    id: 'r5',
    name: 'Empire Restaurant',
    diet: 'Non-Veg',
    cuisine: 'North Indian / Mughlai',
    specialty: 'Kebabs & Biryani',
    rating: 4.5,
    location: 'Kalidasa Road',
    imageUrl: 'https://picsum.photos/id/835/800/600',
    priceRange: '₹₹₹'
  },
  {
    id: 'r6',
    name: 'Fresh Catch Sea Food',
    diet: 'Non-Veg',
    cuisine: 'Coastal / Mangalorean',
    specialty: 'Anjal Fry & Crab Ghee Roast',
    rating: 4.7,
    location: 'Contour Road',
    imageUrl: 'https://picsum.photos/id/425/800/600',
    priceRange: '₹₹₹'
  },
  {
    id: 'r7',
    name: "Jagavi's Kritunga",
    diet: 'Non-Veg',
    cuisine: 'Andhra Style',
    specialty: 'Train Theme Dining',
    rating: 4.4,
    location: 'Hebbal',
    imageUrl: 'https://picsum.photos/id/225/800/600',
    priceRange: '₹₹₹'
  }
];

export const HIDDEN_GEMS: Place[] = [
  {
    id: '1',
    name: 'Somnathpur Chennakeshava Temple',
    description: 'A stunning 13th-century Hoysala temple known for its intricate stone carvings and stellar architecture.',
    category: 'temple',
    imageUrl: 'https://www.mysoretourism.org.in/images/v2/places-to-visit/somnathpur-temple-chennakesava-temple-header-mysore-tourism.jpg',
    crowdLevel: 'low',
    location: 'Somnathpur',
    rating: 4.8,
    coordinates: { top: '85%', left: '80%' },
    lat: 12.2750,
    lng: 77.0300,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Somnathpur+Chennakeshava+Temple'
  },
  {
    id: '2',
    name: 'Blue Lagoon',
    description: 'A hidden island-like spot in the KRS backwaters, offering crystal clear waters and a perfect picnic spot.',
    category: 'nature',
    imageUrl: 'https://imgmediagumlet.lbb.in/media/2019/10/5d9c4fa0a0087660bb629c1f_1570525088838.jpg',
    crowdLevel: 'low',
    location: 'KRS Backwaters',
    rating: 4.7,
    coordinates: { top: '15%', left: '10%' },
    lat: 12.3900,
    lng: 76.5700,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Blue+Lagoon+KRS+Backwaters'
  },
  {
    id: '3',
    name: 'Venugopala Swamy Temple',
    description: 'A submerged temple that resurfaced, located on the banks of KRS backwaters. A stunning architectural marvel.',
    category: 'temple',
    imageUrl: 'https://bulbulonthewing.com/wp-content/uploads/2024/11/IMG_20230825_175915-min-2048x1536.jpg',
    crowdLevel: 'moderate',
    location: 'KRS Backwaters',
    rating: 4.9,
    coordinates: { top: '12%', left: '15%' },
    lat: 12.3800,
    lng: 76.5800,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Venugopala+Swamy+Temple+KRS'
  },
  {
    id: '4',
    name: 'Gowri’s Sand Museum',
    description: 'A unique museum showcasing incredible sculptures made entirely of sand and water, depicting mythology and Mysore heritage.',
    category: 'culture',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sand_museum_Mysore_sculpture.jpg/500px-Sand_museum_Mysore_sculpture.jpg',
    crowdLevel: 'moderate',
    location: 'Chamundi Hill Road',
    rating: 4.5,
    coordinates: { top: '65%', left: '75%' },
    lat: 12.2980,
    lng: 76.6650,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Gowri+Sand+Museum+Mysore'
  },
  {
    id: '5',
    name: 'Karanji Kere',
    description: 'A serene lake nature park with a walk-through aviary, butterfly park, and boating facilities right in the city.',
    category: 'nature',
    imageUrl: 'https://www.mysoretourism.org.in/images/v2/places-to-visit/karanji-lake-header-mysore-tourism.jpg',
    crowdLevel: 'moderate',
    location: 'Nazarbad',
    rating: 4.6,
    coordinates: { top: '50%', left: '60%' },
    lat: 12.3020,
    lng: 76.6680,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Karanji+Lake+Mysore'
  },
  {
    id: '6',
    name: 'Shuka Vana',
    description: 'A rehabilitation center for birds holding a Guinness World Record for most bird species in an aviary.',
    category: 'nature',
    imageUrl: 'https://www.trawell.in/admin/images/upload/211116678shuka%20vana.jpg',
    crowdLevel: 'moderate',
    location: 'Datta Peetham',
    rating: 4.8,
    coordinates: { top: '75%', left: '30%' },
    lat: 12.2880,
    lng: 76.6600,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Shuka+Vana+Mysore'
  },
  {
    id: '7',
    name: 'Railway Museum',
    description: 'An outdoor museum exhibiting vintage locomotives, royal carriages, and railway memorabilia from the colonial era.',
    category: 'culture',
    imageUrl: 'https://www.mysoretourism.org.in/images/v2/places-to-visit/mysore-rail-museum-header-mysore-tourism.jpg',
    crowdLevel: 'moderate',
    location: 'KRS Road',
    rating: 4.7,
    coordinates: { top: '35%', left: '40%' },
    lat: 12.3150,
    lng: 76.6450,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Mysore+Railway+Museum'
  },
  {
    id: '8',
    name: 'GRS Fantasy Park',
    description: 'An exhilarating water and amusement park offering a fun-filled day for families and thrill-seekers.',
    category: 'culture',
    imageUrl: 'https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_518,q_auto,w_660/v1699007164/bbj/wdtocwrsod6n9kdg8cb3.jpg',
    crowdLevel: 'high',
    location: 'Metagalli',
    rating: 4.6,
    coordinates: { top: '20%', left: '30%' },
    lat: 12.3450,
    lng: 76.6300,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=GRS+Fantasy+Park+Mysore'
  },
  {
    id: '9',
    name: 'Payana Vintage Car Museum',
    description: 'A spectacular collection of vintage automobiles and motorcycles, showcasing the evolution of transport in a modern architectural setting.',
    category: 'culture',
    imageUrl: 'https://www.payanamuseum.com/wp-content/uploads/2025/02/Asset-8@4x-1-2048x797.png',
    crowdLevel: 'low',
    location: 'Mysore-Madikeri Hwy',
    rating: 4.8,
    coordinates: { top: '10%', left: '20%' },
    lat: 12.3500,
    lng: 76.6000,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Payana+Vintage+Car+Museum+Mysore'
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'a1',
    name: 'Shri. Nanjundaiah',
    craft: 'Rosewood Inlay',
    story: 'Inheriting the craft from his grandfather, Nanjundaiah has been creating portraits of the Maharajas for over 40 years.',
    imageUrl: 'https://picsum.photos/id/339/400/400',
    location: 'Tilak Nagar',
    visitable: true
  },
  {
    id: 'a2',
    name: 'Lakshmi Devi',
    craft: 'Mysore Silk Weaving',
    story: 'One of the few remaining independent weavers running a home-based loom, keeping the pure zari tradition alive.',
    imageUrl: 'https://picsum.photos/id/343/400/400',
    location: 'Ramanagara Border',
    visitable: true
  },
  {
    id: 'a3',
    name: 'Raghupathi Bhat',
    craft: 'Ganjifa Art',
    story: 'A master of the detailed Ganjifa cards, formerly played by royalty. He teaches workshops on weekends.',
    imageUrl: 'https://picsum.photos/id/128/400/400',
    location: 'Srirampura',
    visitable: true
  }
];

export const BOOKING_ITEMS: BookingItem[] = [
  {
    id: 'h1',
    name: 'Lalitha Mahal Palace Hotel',
    type: 'hotel',
    price: '₹8,500/night',
    rating: 4.6,
    imageUrl: 'https://picsum.photos/id/1040/800/600',
    description: 'Experience royalty in this shimmering white palace built by the Maharaja in 1931.',
    features: ['Heritage', 'Royal Suite', 'Pool']
  },
  {
    id: 'h2',
    name: 'Radisson Blu Plaza',
    type: 'hotel',
    price: '₹7,200/night',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/id/431/800/600',
    description: 'Modern luxury located next to the race course with breathtaking views of Chamundi Hills.',
    features: ['Luxury', 'Spa', 'Swimming Pool']
  },
  {
    id: 'h3',
    name: 'Fortune JP Palace',
    type: 'hotel',
    price: '₹5,500/night',
    rating: 4.5,
    imageUrl: 'https://picsum.photos/id/238/800/600',
    description: 'Palatial architecture meeting modern comforts in the heart of the city.',
    features: ['Landscaped Gardens', 'Fine Dining']
  },
  {
    id: 'h4',
    name: 'Aishwarya Le Royal',
    type: 'hotel',
    price: '₹3,500/night',
    rating: 4.3,
    imageUrl: 'https://picsum.photos/id/111/800/600',
    description: 'Elegant boutique hotel offering a blend of classic charm and contemporary amenities.',
    features: ['City Center', 'Banquet']
  },
  {
    id: 'v1',
    name: 'Private AC Sedan',
    type: 'vehicle',
    price: '₹2,500/day',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/id/111/400/300',
    description: 'Comfortable 4-seater sedan (Etios/Dzire) with experienced driver.',
    features: ['AC', 'English Speaking Driver']
  },
  {
    id: 'v2',
    name: 'Toyota Innova Crysta',
    type: 'vehicle',
    price: '₹4,500/day',
    rating: 4.9,
    imageUrl: 'https://picsum.photos/id/655/400/300',
    description: 'Luxury 6-seater SUV perfect for families.',
    features: ['Premium Comfort', 'Ample Luggage Space']
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'p1',
    name: 'Basic Explorer',
    tier: 'Budget',
    price: '₹1,999',
    description: 'per person',
    features: [
      'Guided tour of Mysore Palace',
      'Visit to Chamundi Hills',
      'Entry to Brindavan Gardens',
      'Standard A/C vehicle'
    ],
    recommendedFor: 'Solo Travelers',
    icon: 'leaf'
  },
  {
    id: 'p2',
    name: 'Cultural Premium',
    tier: 'Standard',
    price: '₹4,499',
    description: 'per person',
    features: [
      'All features of Basic Explorer',
      'Visit to a local artisan workshop',
      'Authentic Mysuru lunch experience',
      'Priority entry to Zoo'
    ],
    recommendedFor: 'Couples',
    icon: 'star'
  },
  {
    id: 'p3',
    name: 'Luxury Royal',
    tier: 'Premium',
    price: '₹8,999',
    description: 'per person',
    features: [
      'All features of Cultural Premium',
      'Private guided tour',
      'Mysore silk saree shopping experience',
      'Fine dining dinner at a heritage hotel'
    ],
    recommendedFor: 'Luxury Travelers',
    icon: 'diamond'
  }
];

export const IMPACT_STATS = [
  { label: 'Footfall Diverted', value: '12,500+' },
  { label: 'Artisan Revenue', value: '₹45 Lakhs' },
  { label: 'Hidden Gems', value: '142' },
];