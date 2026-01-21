import React from 'react';
import { IMPACT_STATS } from '../constants';
import { Leaf, Users, Heart, Globe } from 'lucide-react';

export const Impact: React.FC = () => {
  return (
    <div className="bg-[#0c0c0c] text-stone-200">
       <div className="bg-stone-900/40 pt-32 sm:pt-48 pb-24 sm:pb-32 px-6 border-b border-white/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] to-transparent pointer-events-none"></div>
          <div className="max-w-5xl mx-auto relative z-10 animate-app-reveal">
             <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-8 sm:mb-10 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                <Leaf className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Sustainable Architecture
             </div>
             <h1 className="text-4xl sm:text-7xl md:text-8xl font-serif font-bold mb-8 sm:mb-10 text-white tracking-tighter leading-[1.1] sm:leading-[0.9]">Preserving <br/><span className="text-amber-500 italic">Mysuru.</span></h1>
             <p className="text-base sm:text-xl md:text-2xl text-stone-400 leading-relaxed font-light max-w-3xl mx-auto">
                Tourism should build communities, not just visit them. We distribute footfall to the edges of the city, supporting local livelihoods while preserving heritage.
             </p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {IMPACT_STATS.map((stat, idx) => (
             <div key={idx} className="p-8 sm:p-14 rounded-2xl sm:rounded-[3rem] glass-card shadow-2xl animate-app-reveal flex flex-col items-center text-center" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-5xl sm:text-7xl font-black text-amber-500 mb-2 sm:mb-4 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-stone-600">{stat.label}</div>
             </div>
          ))}
       </div>

       <div className="max-w-7xl mx-auto px-6 py-20 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 lg:gap-32 items-center mb-20 sm:mb-32 animate-app-reveal">
             <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] sm:leading-[1.1]">Decentralizing <br/>Tourism</h2>
                <p className="text-base sm:text-lg md:text-xl text-stone-500 font-light leading-relaxed">
                   Mysore Palace attracts millions annually. This concentration strains infrastructure and leaves independent artisans struggling for visibility.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-stone-500 font-light leading-relaxed italic">
                   "We guide you beyond the walls, ensuring your journey makes a real difference in local neighborhoods."
                </p>
             </div>
             <div className="h-64 sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-[3rem] overflow-hidden border border-white/5 relative group shadow-2xl">
                <img src="https://www.mysoretourism.org.in/images/v2/places-to-visit/mysore-maharaja-palace-header-mysore-tourism.jpg" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 lg:gap-32 items-center animate-app-reveal">
             <div className="order-2 lg:order-1 h-64 sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                <img src="https://bxmysuru.com/wp-content/uploads/2022/01/brindavan.jpg" className="w-full h-full object-cover" />
             </div>
             <div className="order-1 lg:order-2 space-y-8 sm:space-y-12">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] sm:leading-[1.1]">The Impact Model</h2>
                <ul className="space-y-6 sm:space-y-8">
                   {[
                     { icon: <Users className="w-5 sm:w-6 h-5 sm:h-6" />, color: 'bg-amber-600/10 text-amber-500', text: 'Direct revenue to 500+ artisan families' },
                     { icon: <Globe className="w-5 sm:w-6 h-5 sm:h-6" />, color: 'bg-green-600/10 text-green-400', text: 'Reduced carbon footprint via heritage walking' },
                     { icon: <Heart className="w-5 sm:w-6 h-5 sm:h-6" />, color: 'bg-red-600/10 text-red-400', text: 'Active preservation of 24 dying art forms' }
                   ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 sm:gap-6 group">
                        <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 shadow-xl ${item.color}`}>
                           {item.icon}
                        </div>
                        <span className="text-lg sm:text-xl md:text-2xl font-light text-stone-400 group-hover:text-white transition-colors">{item.text}</span>
                      </li>
                   ))}
                </ul>
             </div>
          </div>
       </div>
    </div>
  );
};