import React, { useState } from 'react';
import { RESTAURANTS } from '../constants';
import { Star, MapPin, Utensils, Info, X, Check, UtensilsCrossed, Clock, ChevronRight } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onViewMenu: (r: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onViewMenu }) => (
  <div className="bg-[#1c1c1c] border border-stone-800 rounded-2xl overflow-hidden group hover:border-amber-700/50 transition-all card-lift">
    <div className="h-48 overflow-hidden relative">
      <img 
        src={restaurant.imageUrl} 
        alt={restaurant.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
      />
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-2 py-1 rounded-lg text-[10px] text-amber-500 font-black flex items-center border border-amber-900/30">
        <Star className="w-3 h-3 mr-1 fill-current" /> {restaurant.rating}
      </div>
      <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-black border uppercase tracking-tighter ${restaurant.diet === 'Veg' ? 'bg-green-900/80 text-green-400 border-green-800' : 'bg-red-900/80 text-red-400 border-red-800'}`}>
        {restaurant.diet}
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold text-white mb-0.5 font-serif">{restaurant.name}</h3>
      <p className="text-amber-600 text-[11px] font-bold uppercase tracking-wider mb-3">{restaurant.cuisine}</p>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-stone-400 text-xs">
          <Utensils className="w-3.5 h-3.5 mr-2 text-stone-600" />
          <span className="text-stone-300 font-bold">Try: </span> 
          <span className="ml-1 text-white truncate">{restaurant.specialty}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-stone-800">
          <span className="text-stone-500 text-[10px] tracking-widest uppercase font-black">{restaurant.priceRange || '₹₹'}</span>
          <button 
            onClick={() => onViewMenu(restaurant)}
            className="text-xs font-black text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors uppercase tracking-widest"
          >
            MENU <Info className="w-3.5 h-3.5" />
          </button>
      </div>
    </div>
  </div>
);

export const FoodGuide: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<Restaurant | null>(null);

  const vegRestaurants = RESTAURANTS.filter(r => r.diet === 'Veg');
  const nonVegRestaurants = RESTAURANTS.filter(r => r.diet === 'Non-Veg');

  const getMenuItems = (r: Restaurant) => {
    if (r.diet === 'Veg') {
      return [
        { name: "Mysore Filter Coffee", price: "₹30", desc: "Authentic strong decoction brew." },
        { name: "Pure Ghee Mysore Pak", price: "₹80", desc: "The legendary melt-in-mouth sweet." },
        { name: "Rava Idli with Sagu", price: "₹65", desc: "Traditional steamed semolina cakes." }
      ];
    } else {
      return [
        { name: "Mutton Keema Balls", price: "₹240", desc: "Classic Nati-style appetizer." },
        { name: "Pepper Chicken Dry", price: "₹210", desc: "Spicy local farm-raised chicken." },
        { name: "Nati Koli Saru", price: "₹280", desc: "Traditional country-chicken curry." }
      ];
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-28 pb-20 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-6">Culinary Heritage</h2>
          <p className="text-base text-stone-400 max-w-xl mx-auto font-light leading-relaxed">
            Taste authentic flavors from legendary dosas to royal non-veg delicacies, curated by locals.
          </p>
        </div>

        {/* Veg Section */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-green-500 rounded-full"></div>
            <h3 className="text-2xl font-serif font-bold text-white">Vegetarian Delights</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vegRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} onViewMenu={setSelectedMenu} />
            ))}
          </div>
        </div>

        {/* Non-Veg Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-red-500 rounded-full"></div>
            <h3 className="text-2xl font-serif font-bold text-white">Non-Vegetarian Feasts</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nonVegRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} onViewMenu={setSelectedMenu} />
            ))}
          </div>
        </div>
      </div>

      {/* Menu Modal Refined - z-[250] to clear Navbar */}
      {selectedMenu && (
        <div 
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedMenu(null)}
        >
          <div 
            className="bg-[#1c1c1c] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border border-stone-800 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMenu(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-stone-900/50 hover:bg-stone-800 text-stone-400 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-40 relative">
               <img src={selectedMenu.imageUrl} className="w-full h-full object-cover" alt={selectedMenu.name} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] to-transparent"></div>
               <div className="absolute bottom-4 left-6">
                 <h4 className="text-2xl font-serif font-bold text-white">{selectedMenu.name}</h4>
               </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-6">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Signature Dish</p>
                <div className="bg-amber-900/10 border border-amber-900/30 p-4 rounded-xl flex items-center gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-amber-500" />
                  <h5 className="font-bold text-white text-sm">{selectedMenu.specialty}</h5>
                </div>
              </div>

              <h5 className="text-sm font-black text-stone-500 uppercase tracking-widest mb-4 border-b border-stone-800 pb-2">Heritage Menu</h5>
              <div className="space-y-5">
                {getMenuItems(selectedMenu).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <h6 className="text-sm font-bold text-stone-200">{item.name}</h6>
                      <p className="text-[10px] text-stone-500 mt-0.5 font-light">{item.desc}</p>
                    </div>
                    <span className="font-mono text-amber-600 font-bold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedMenu.name}+${selectedMenu.location}+Mysore`, '_blank')}
                className="w-full mt-8 bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
              >
                Get Directions <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};