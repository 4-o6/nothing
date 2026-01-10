import React from 'react';
import { RESTAURANTS } from '../constants';
import { Star, MapPin, Utensils, Info } from 'lucide-react';

const RestaurantCard = ({ restaurant }: { restaurant: typeof RESTAURANTS[0] }) => (
  <div className="bg-[#1c1c1c] border border-stone-800 rounded-xl overflow-hidden group hover:border-amber-700/50 transition-all hover:-translate-y-1">
    <div className="h-56 overflow-hidden relative">
      <img 
        src={restaurant.imageUrl} 
        alt={restaurant.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
      />
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs text-amber-500 font-bold flex items-center border border-amber-900/30">
        <Star className="w-3 h-3 mr-1 fill-current" /> {restaurant.rating}
      </div>
      <div className={`absolute top-4 left-4 px-3 py-1 rounded text-xs font-bold border ${restaurant.diet === 'Veg' ? 'bg-green-900/80 text-green-400 border-green-800' : 'bg-red-900/80 text-red-400 border-red-800'}`}>
        <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${restaurant.diet === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {restaurant.diet}
        </div>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-1 font-serif">{restaurant.name}</h3>
      <p className="text-amber-600 text-sm font-medium mb-3">{restaurant.cuisine}</p>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-stone-400 text-sm">
          <Utensils className="w-4 h-4 mr-2 text-stone-600" />
          <span className="text-stone-300">Must Try: </span> 
          <span className="ml-1 text-white">{restaurant.specialty}</span>
        </div>
        <div className="flex items-center text-stone-400 text-sm">
          <MapPin className="w-4 h-4 mr-2 text-stone-600" />
          {restaurant.location}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-stone-800">
          <span className="text-stone-500 text-xs tracking-widest uppercase">Price: <span className="text-stone-300">{restaurant.priceRange || '₹₹'}</span></span>
          <button className="text-sm font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors">
            View Menu <Info className="w-4 h-4" />
          </button>
      </div>
    </div>
  </div>
);

export const FoodGuide: React.FC = () => {
  const vegRestaurants = RESTAURANTS.filter(r => r.diet === 'Veg');
  const nonVegRestaurants = RESTAURANTS.filter(r => r.diet === 'Non-Veg');

  return (
    <div className="min-h-screen bg-[#111111] py-16 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-6">Culinary Heritage</h2>
          <p className="text-lg text-stone-400 max-w-2xl mx-auto">
            Taste the authentic flavors of Mysore. From legendary dosas to royal non-veg delicacies, explore our curated list of eateries.
          </p>
        </div>

        {/* Veg Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-green-500 rounded-full"></div>
            <h3 className="text-3xl font-serif font-bold text-white">Vegetarian Delights</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vegRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>

        {/* Non-Veg Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-red-500 rounded-full"></div>
            <h3 className="text-3xl font-serif font-bold text-white">Non-Vegetarian Feasts</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nonVegRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};