import React from 'react';
import { ARTISANS } from '../constants';
import { MapPin, UserCheck } from 'lucide-react';

export const Artisans: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Guardians of Heritage</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Meet the master craftsmen of Mysore. Visiting them directly ensures 100% of your money supports their livelihood and keeps the art alive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTISANS.map((artisan) => (
            <div key={artisan.id} className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1 w-full h-64 overflow-hidden relative">
                <img 
                  src={artisan.imageUrl} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover filter sepia-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{artisan.name}</h3>
                  <p className="text-sm text-stone-300">{artisan.craft}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-stone-600 mb-6 italic">"{artisan.story}"</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div className="flex items-center text-sm text-stone-500">
                    <MapPin className="w-4 h-4 mr-1 text-amber-500" />
                    {artisan.location}
                  </div>
                  {artisan.visitable && (
                    <span className="flex items-center text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                      <UserCheck className="w-3 h-3 mr-1" /> Open for Visits
                    </span>
                  )}
                </div>
                
                <button className="w-full mt-4 bg-stone-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors">
                  Get Directions & Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Section */}
        <div className="mt-20 bg-stone-900 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl font-serif font-bold mb-8">Why Decentralization Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
              <div className="text-4xl font-bold text-amber-500 mb-2">₹300 Cr</div>
              <p className="text-stone-400">Potential additional revenue for local artisans if 10% of tourists divert.</p>
            </div>
            <div className="p-4">
               <div className="text-4xl font-bold text-amber-500 mb-2">40%</div>
               <p className="text-stone-400">Reduction in peak-time footfall at Mysore Palace, preserving the structure.</p>
            </div>
            <div className="p-4">
               <div className="text-4xl font-bold text-amber-500 mb-2">500+</div>
               <p className="text-stone-400">Families supported by promoting lesser-known crafts like Ganjifa and Inlay.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};