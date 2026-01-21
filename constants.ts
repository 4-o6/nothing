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
  },
  {
    id: 'r7',
    name: "Jagavi's Kritunga",
    diet: 'Non-Veg',
    cuisine: 'Andhra Style',
    specialty: 'Train Theme Dining',
    rating: 4.4,
    location: 'Hebbal',
    imageUrl: 'https://b.zmtcdn.com/data/reviews_photos/8af/5f37767156cb664c01adfe9856f328af_1684904602.jpg',
    priceRange: '₹₹₹'
  }
];

export const HIDDEN_GEMS: Place[] = [
  {
    id: '2',
    name: 'Blue Lagoon (KRS Backwaters)',
    description: 'A hidden island-like spot in the KRS backwaters, offering crystal clear waters and a perfect picnic spot.',
    category: 'nature',
    imageUrl: 'https://imgmediagumlet.lbb.in/media/2019/10/5d9c4fa0a0087660bb629c1f_1570525088838.jpg',
    crowdLevel: 'low',
    location: 'North of Mysore',
    rating: 4.7,
    lat: 12.4334,
    lng: 76.5615,
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
    lat: 12.4172,
    lng: 76.5624,
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
    lat: 12.2965,
    lng: 76.6669,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Gowri+Sand+Museum+Mysore'
  },
  {
    id: '5',
    name: 'Karanji Lake & Aviary',
    description: 'A serene lake nature park with a walk-through aviary, butterfly park, and boating facilities right in the city.',
    category: 'nature',
    imageUrl: 'https://www.mysoretourism.org.in/images/v2/places-to-visit/karanji-lake-header-mysore-tourism.jpg',
    crowdLevel: 'moderate',
    location: 'Nazarbad',
    rating: 4.6,
    lat: 12.3020,
    lng: 76.6690,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Karanji+Lake+Mysore'
  },
  {
    id: '6',
    name: 'Shuka Vana',
    description: 'A rehabilitation center for birds holding a Guinness World Record for most bird species in an aviary.',
    category: 'nature',
    imageUrl: 'https://www.trawell.in/admin/images/upload/211116678shuka%20vana.jpg',
    crowdLevel: 'moderate',
    location: 'SGS Ashram',
    rating: 4.8,
    lat: 12.2818,
    lng: 76.6644,
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
    lat: 12.3175,
    lng: 76.6465,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Mysore+Railway+Museum'
  },
  {
    id: '9',
    name: 'Payana Vintage Car Museum',
    description: 'A spectacular collection of vintage automobiles and motorcycles, showcasing the evolution of transport.',
    category: 'culture',
    imageUrl: 'https://www.payanamuseum.com/wp-content/uploads/2025/02/Asset-8@4x-1-2048x797.png',
    crowdLevel: 'low',
    location: 'Bangalore-Mysore Hwy',
    rating: 4.8,
    lat: 12.4391,
    lng: 76.7118,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Payana+Vintage+Car+Museum+Mysore'
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'a1',
    name: 'Shri. Nanjundaiah',
    craft: 'Rosewood Inlay',
    story: 'Inheriting the craft from his grandfather, Nanjundaiah has been creating portraits of the Maharajas for over 40 years. He uses locally sourced rosewood and ethically acquired bone/synthetic materials to create breathtaking landscapes.',
    imageUrl: 'https://www.gitagged.com/wp-content/uploads/2023/10/MRI-001-ELEPHANT-02-2-441x662.jpg',
    location: 'Tilak Nagar, Mysuru',
    visitable: true,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Rosewood+Inlay+Tilak+Nagar+Mysore',
    contactPhone: '+91 94480 11111'
  },
  {
    id: 'a2',
    name: 'Smt. Lakshmi Devi',
    craft: 'Mysore Silk Weaving',
    story: 'One of the few remaining independent weavers running a home-based loom in the Agrahara area. She specializes in pure zari silk sarees that take weeks of meticulous labor to complete.',
    imageUrl: 'https://mysorepattu.com/cdn/shop/files/WhatsAppImage2025-02-21at20.18.24_58e271cf.jpg?v=1749037920&width=1946',
    location: 'Agrahara, Mysuru',
    visitable: true,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Mysore+Silk+Weavers+Agrahara',
    contactPhone: '+91 94480 22222'
  },
  {
    id: 'a3',
    name: 'Shri. Raghupathi Bhat',
    craft: 'Ganjifa Art',
    story: 'A master of the detailed Ganjifa cards, formerly played by royalty. His work is recognized by the Guinness Book of World Records. He hosts workshops to keep this dying Mughal-era art form alive.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0576/0391/5966/files/16_480x480.jpg?v=1632369107',
    location: 'Srirampura, Mysuru',
    visitable: true,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Ganjifa+Art+Raghupathi+Bhat+Mysore',
    contactPhone: '+91 94480 33333'
  },
  {
    id: 'a4',
    name: 'Sandalwood Carvers Guild',
    craft: 'Sandalwood Sculpture',
    story: 'Represented by a collective of masters near Jaganmohan Palace, these artisans carve deities and intricate fans from the fragrant wood Mysore is world-famous for.',
    imageUrl: 'https://www.memeraki.com/cdn/shop/products/Maa-Durga-Sandalwood-Miniature-Artwork-by-Om-Prakash-1_900x.jpg?v=1726057132',
    location: 'Medar Block, Mysuru',
    visitable: true,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Sandalwood+Carving+Mysore+Palace+Area',
    contactPhone: '+91 94480 44444'
  },
  {
    id: 'a5',
    name: 'Smt. Radha',
    craft: 'Mysore Traditional Painting',
    story: 'Specializing in the "Mysore Style" involving unique gesso work and authentic 24K gold foil. Her paintings are noted for their attention to detail and traditional narratives.',
    imageUrl: 'https://www.artisera.com/cdn/shop/products/07.3_7c1e73ec-c12e-49c1-9c7c-0c4402d1b568_2048x2048.jpg?v=1632391590',
    location: 'Jaganmohan Palace Area, Mysuru',
    visitable: true,
    googleMapsUri: 'https://www.google.com/maps/search/?api=1&query=Mysore+Traditional+Painting+Workshops',
    contactPhone: '+91 94480 55555'
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
    description: 'Experience royalty in this shimmering white palace built by the Maharaja in 1931.',
    features: ['Heritage', 'Royal Suite', 'Pool']
  },
  {
    id: 'h2',
    name: 'Radisson Blu Plaza',
    type: 'hotel',
    price: '₹7,200/night',
    rating: 4.8,
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/232840359.jpg?k=3d639c2ea9eb765b73e83f6d60d2b5daab6f96d6c847127e8b0a3eacaab535da&o=',
    description: 'Modern luxury located next to the race course with breathtaking views of Chamundi Hills.',
    features: ['Luxury', 'Spa', 'Swimming Pool']
  },
  {
    id: 'h3',
    name: 'Fortune JP Palace',
    type: 'hotel',
    price: '₹5,500/night',
    rating: 4.5,
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/598109812.jpg?k=75302664a0f4a2a7da810cdba84953d1f0a6d296081f0f79267188586c79c6ca&o=',
    description: 'Palatial architecture meeting modern comforts in the heart of the city.',
    features: ['Landscaped Gardens', 'Fine Dining']
  },
  {
    id: 'h4',
    name: 'Aishwarya Le Royal',
    type: 'hotel',
    price: '₹3,500/night',
    rating: 4.3,
    imageUrl: 'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1020,q_auto,w_2000/hotelier-images/c1/d4/5a55b9dbfce216c66a28af4dc7b4960fb23bb983e2038795b07cef15914f.jpeg',
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