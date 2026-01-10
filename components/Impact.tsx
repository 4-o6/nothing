import React from 'react';
import { IMPACT_STATS } from '../constants';
import { Leaf, Users, Heart, Globe } from 'lucide-react';

export const Impact: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 animate-fade-in">
       {/* Header Section */}
       <div className="bg-stone-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-800 mb-6">
                <Leaf className="w-4 h-4" /> Sustainable Future
             </div>
             <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Preserving Mysore for Generations</h1>
             <p className="text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto">
                We believe tourism should build communities, not just visit them. By shifting focus from the crowded center to the vibrant edges, we create a better experience for you and a better livelihood for locals.
             </p>
          </div>
       </div>

       {/* Stats Section */}
       <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
             {IMPACT_STATS.map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 text-center">
                   <div className="text-4xl font-bold text-amber-600 mb-2">{stat.value}</div>
                   <div className="text-stone-500 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
                </div>
             ))}
          </div>
       </div>

       {/* Detailed Sections */}
       <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
             <div>
                <h2 className="text-3xl font-serif font-bold mb-4">The Challenge of Over-Tourism</h2>
                <p className="text-stone-600 leading-relaxed mb-4">
                   Mysore Palace attracts over 3.5 million visitors annually. This concentration strains heritage infrastructure, creates traffic congestion, and leaves surrounding traditional livelihoods struggling for visibility.
                </p>
                <p className="text-stone-600 leading-relaxed">
                   Mass tourism often bypasses the small artisan, the local eatery, and the hidden temple that truly embodies the city's spirit.
                </p>
             </div>
             <div className="bg-stone-200 rounded-2xl h-64 md:h-80 overflow-hidden relative">
                <img src="https://picsum.photos/id/1040/800/600" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" alt="Crowded palace" />
                <div className="absolute inset-0 bg-black/10"></div>
             </div>
          </div>

           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1 bg-stone-200 rounded-2xl h-64 md:h-80 overflow-hidden relative">
                <img src="https://picsum.photos/id/339/800/600" className="w-full h-full object-cover" alt="Artisan working" />
                <div className="absolute inset-0 bg-amber-900/10"></div>
             </div>
             <div className="order-1 md:order-2">
                <h2 className="text-3xl font-serif font-bold mb-4">Our Decentralized Model</h2>
                <p className="text-stone-600 leading-relaxed mb-4">
                   We curate high-quality experiences in peripheral areas. By guiding you to "Hidden Gems" and direct-to-artisan workshops, we distribute economic benefits more evenly.
                </p>
                <ul className="space-y-4">
                   <li className="flex items-center gap-3 text-stone-700">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                         <Users className="w-4 h-4" />
                      </div>
                      Direct revenue to 500+ artisan families
                   </li>
                   <li className="flex items-center gap-3 text-stone-700">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                         <Globe className="w-4 h-4" />
                      </div>
                      Reduced carbon footprint via localized walking tours
                   </li>
                   <li className="flex items-center gap-3 text-stone-700">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                         <Heart className="w-4 h-4" />
                      </div>
                      Preservation of intangible cultural heritage
                   </li>
                </ul>
             </div>
          </div>
       </div>
    </div>
  );
};