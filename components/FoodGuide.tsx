import React, { useState } from 'react';
import { RESTAURANTS } from '../constants';
import { Star, MapPin, Utensils, Info, X, Check, UtensilsCrossed, Clock, ChevronRight } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onViewMenu: (r: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onViewMenu }) => (
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
          <button 
            onClick={() => onViewMenu(restaurant)}
            className="text-sm font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors group/btn"
          >
            View Menu <Info className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
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
    // Simulated heritage menu based on restaurant type
    if (r.diet === 'Veg') {
      return [
        { name: "Mysore Filter Coffee", price: "₹30", desc: "Authentic strong decoction brew." },
        { name: "Pure Ghee Mysore Pak", price: "₹80", desc: "The legendary melt-in-mouth sweet." },
        { name: "Rava Idli with Sagu", price: "₹65", desc: "Traditional steamed semolina cakes." },
        { name: "Signature Thali", price: "₹180", desc: "Complete 12-item heritage meal." }
      ];
    } else {
      return [
        { name: "Mutton Keema Balls", price: "₹240", desc: "Classic Nati-style appetizer." },
        { name: "Pepper Chicken Dry", price: "₹210", desc: "Spicy local farm-raised chicken." },
        { name: "Nati Koli Saru", price: "₹280", desc: "Traditional country-chicken curry." },
        { name: "Ragi Mudde Combo", price: "₹150", desc: "Healthy millet balls with greens." }
      ];
    }
  };

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
              <RestaurantCard key={r.id} restaurant={r} onViewMenu={setSelectedMenu} />
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
              <RestaurantCard key={r.id} restaurant={r} onViewMenu={setSelectedMenu} />
            ))}
          </div>
        </div>
      </div>

      {/* Menu Modal */}
      {selectedMenu && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedMenu(null)}
        >
          <div 
            className="bg-[#1c1c1c] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative border border-stone-800 animate-slide-up flex flex-col md:flex-row max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMenu(null)}
              className="absolute top-5 right-5 z-10 p-2 bg-stone-900/50 hover:bg-stone-800 text-stone-400 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Left: Image & Info */}
            <div className="w-full md:w-5/12 relative h-48 md:h-auto flex-shrink-0">
               <img src={selectedMenu.imageUrl} className="w-full h-full object-cover" alt={selectedMenu.name} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#1c1c1c]"></div>
               <div className="absolute bottom-6 left-6 right-6 md:bottom-auto md:top-6 md:left-6 md:right-auto">
                 <h4 className="text-2xl font-serif font-bold text-white mb-2">{selectedMenu.name}</h4>
                 <div className="flex items-center gap-2 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" /> {selectedMenu.rating} Rating
                 </div>
               </div>
            </div>

            {/* Modal Right: Menu Content */}
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="mb-8">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Signature Dish</p>
                <div className="bg-amber-900/10 border border-amber-900/30 p-4 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center text-amber-500">
                    <UtensilsCrossed className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{selectedMenu.specialty}</h5>
                    <p className="text-xs text-stone-500">Most recommended by locals</p>
                  </div>
                </div>
              </div>

              <h5 className="text-lg font-bold text-white mb-4 border-b border-stone-800 pb-2">Heritage Menu</h5>
              <div className="space-y-6">
                {getMenuItems(selectedMenu).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div>
                      <h6 className="font-medium text-stone-200 group-hover:text-amber-500 transition-colors flex items-center gap-2">
                        {item.name}
                        {idx === 0 && <span className="text-[9px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded border border-green-800 uppercase tracking-tighter font-bold">Popular</span>}
                      </h6>
                      <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="font-mono text-amber-600 font-bold">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-stone-800">
                 <div className="flex items-center justify-between text-stone-500 text-xs mb-4">
                   <div className="flex items-center gap-1.5">
                     <Clock className="w-3 h-3" /> 8:00 AM - 10:00 PM
                   </div>
                   <div className="flex items-center gap-1.5">
                     <Check className="w-3 h-3 text-green-500" /> UPI Accepted
                   </div>
                 </div>
                 <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedMenu.name}+${selectedMenu.location}+Mysore`, '_blank')}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  Navigate to Place <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};