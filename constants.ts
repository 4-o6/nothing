import { Place, Artisan, BookingItem, TourPackage, Restaurant } from './types';

export const HERO_IMAGES = [
  "https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295",
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
    frequency: 'Every 30 mins' 
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
    imageUrl: 'https://b.zmtcdn.com/data/reviews_photos/aeb/07a326d8ad5c69d2dc36ee971d16caeb_1612531767.jpg',
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
    imageUrl: 'https://images.happycow.net/venues/1024/16/56/hcmp165690_788042.jpeg',
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
    imageUrl: 'https://b.zmtcdn.com/data/reviews_photos/953/16e92ce3c1a055a372f7b78e1e34a953_1554769284.jpg',
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
    imageUrl: 'https://b.zmtcdn.com/data/dish_photos/2c3/774054f763dcff5759b1abafba9922c3.jpeg',
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
    imageUrl: 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/cdwhmave/f5618a25-59a6-40ab-86e2-b5655ccf3f56.jpg',
    priceRange: '₹₹₹'
  }
];

export const HIDDEN_GEMS: Place[] = [
  {
    id: '2',
    name: 'Blue Lagoon (KRS Backwaters)',
    description: 'A serene backwater spot near KRS Dam. Best visited during sunset for the island-like views.',
    category: 'nature',
    imageUrl: 'https://imgmediagumlet.lbb.in/media/2019/10/5d9c4fa0a0087660bb629c1f_1570525088838.jpg',
    crowdLevel: 'low',
    location: 'KRS Backwaters, Mysuru',
    rating: 4.7,
    lat: 12.4331,
    lng: 76.5615,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Blue+Lagoon+KRS+Backwaters'
  },
  {
    id: '3',
    name: 'Venugopala Swamy Temple',
    description: 'An architectural marvel on the banks of KRS backwaters, reconstructed after being submerged for decades.',
    category: 'temple',
    imageUrl: 'https://bulbulonthewing.com/wp-content/uploads/2024/11/IMG_20230825_175915-min-2048x1536.jpg',
    crowdLevel: 'moderate',
    location: 'Hosa Kannambadi, Mysuru',
    rating: 4.9,
    lat: 12.4223,
    lng: 76.5644,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Venugopala+Swamy+Temple+KRS'
  },
  {
    id: '4',
    name: 'Gowri’s Sand Museum',
    description: 'Asia\'s first sand museum showcasing sculptures made of sand and water by artist MN Gowri.',
    category: 'culture',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sand_museum_Mysore_sculpture.jpg/500px-Sand_museum_Mysore_sculpture.jpg',
    crowdLevel: 'moderate',
    location: 'Chamundi Hill Road',
    rating: 4.5,
    lat: 12.2965,
    lng: 76.6669,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Gowri+Sand+Museum+Mysore'
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'a1',
    name: 'Shri. Nanjundaiah',
    craft: 'Rosewood Inlay',
    story: 'Inheriting the craft from his grandfather, Nanjundaiah has been creating portraits of the Maharajas for over 40 years. He uses locally sourced rosewood to create breathtaking wood inlay art.',
    imageUrl: 'https://www.gitagged.com/wp-content/uploads/2023/10/MRI-001-ELEPHANT-02-2-441x662.jpg',
    location: 'Tilak Nagar, Mysuru',
    visitable: true,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Rosewood+Inlay+Tilak+Nagar+Mysore',
    contactPhone: '+91 821-2521111 (Heritage Guild)'
  },
  {
    id: 'a2',
    name: 'Smt. Lakshmi Devi',
    craft: 'Mysore Silk Weaving',
    story: 'A master weaver specializing in traditional KSIC-style pure zari silk sarees. She maintains a private loom where visitors can observe the complex weaving process.',
    imageUrl: 'https://mysorepattu.com/cdn/shop/files/WhatsAppImage2025-02-21at20.18.24_58e271cf.jpg?v=1749037920&width=1946',
    location: 'Agrahara, Mysuru',
    visitable: true,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Mysore+Silk+Weavers+Agrahara',
    contactPhone: '+91 821-2522222 (Weavers Society)'
  },
  {
    id: 'a3',
    name: 'Shri. Raghupathi Bhat',
    craft: 'Ganjifa Art',
    story: 'Internationally recognized master of Ganjifa cards. He preserves the intricate Mughal-era card game art using traditional pigments and squirrel-hair brushes.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0576/0391/5966/files/16_480x480.jpg?v=1632369107',
    location: 'Srirampura, Mysuru',
    visitable: true,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Ganjifa+Art+Raghupathi+Bhat+Mysore',
    contactPhone: '+91 821-2523333 (Art Registry)'
  }
];

export const BOOKING_ITEMS: BookingItem[] = [
  {
    id: 'h1',
    name: 'Lalitha Mahal Palace Hotel',
    type: 'hotel',
    price: '₹8,500/night',
    rating: 4.6,
    imageUrl: 'https://www.lalithamahalpalace.co.in/wp-content/uploads/2018/03/dayview-1-800x533.jpg',
    description: 'Experience royalty in this white palace built by the Maharaja in 1931.',
    features: ['Heritage', 'Royal Suite', 'Pool']
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
  }
];

export const IMPACT_STATS = [
  { label: 'Footfall Diverted', value: '12,500+' },
  { label: 'Artisan Revenue', value: '₹45 Lakhs' },
  { label: 'Hidden Gems', value: '142' },
];
