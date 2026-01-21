import React from 'react';
import { IMPACT_STATS } from '../constants';
import { Leaf, Users, Heart, Globe } from 'lucide-react';

export const Impact: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-500 bg-[#0c0c0c] text-stone-200">
       {/* Header Section */}
       <div className="bg-stone-900/50 text-white pt-40 pb-32 px-4 relative overflow-hidden border-b border-white/5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-600/5 rounded-full blur-[150px] -mr-96 -mt-96"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-10 text-[10px] font-black uppercase tracking-widest">
                <Leaf className="w-4 h-4" /> Sustainable Architecture
             </div>
             <h1 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight tracking-tighter">Preserving Mysuru for <span className="text-amber-500 italic">Generations.</span></h1>
             <p className="text-xl text-stone-300 leading-relaxed max-w-2xl mx-auto font-light">
                We believe tourism should build communities, not just visit them. By shifting focus from the crowded center to the vibrant edges, we create a better experience for you and a better livelihood for locals.
             </p>
          </div>
       </div>

       {/* Stats Section */}
       <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 animate-fade-in-up">
          <div className="grid md:grid-cols-3 gap-8">
             {IMPACT_STATS.map((stat, idx) => (
                <div key={idx} className="p-12 rounded-[3rem] shadow-2xl border transition-all card-lift bg-[#141414] border-stone-800/50">
                   <div className="text-6xl font-black text-amber-500 mb-4 tracking-tighter">{stat.value}</div>
                   <div className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-500">{stat.label}</div>
                </div>
             ))}
          </div>
       </div>

       {/* Detailed Sections */}
       <div className="max-w-7xl mx-auto px-4 py-40">
          <div className="grid md:grid-cols-2 gap-24 items-center mb-40">
             <div className="animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-white tracking-tight">The Challenge of Over-Tourism</h2>
                <p className="text-lg leading-relaxed mb-8 font-light text-stone-400">
                   Mysore Palace attracts over 3.5 million visitors annually. This concentration strains heritage infrastructure, creates traffic congestion, and leaves surrounding traditional livelihoods struggling for visibility.
                </p>
                <p className="text-lg leading-relaxed font-light text-stone-400">
                   Mass tourism often bypasses the small artisan, the local eatery, and the hidden temple that truly embodies the city's spirit.
                </p>
             </div>
             <div className="rounded-[4rem] overflow-hidden shadow-2xl relative h-[450px] group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <img src="https://www.mysoretourism.org.in/images/v2/places-to-visit/mysore-maharaja-palace-header-mysore-tourism.jpg" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105" alt="Palace" />
                <div className="absolute inset-0 bg-black/40"></div>
             </div>
          </div>

           <div className="grid md:grid-cols-2 gap-24 items-center">
             <div className="order-2 md:order-1 rounded-[4rem] overflow-hidden shadow-2xl relative h-[450px] group animate-fade-in-up">
                <img src="https://bxmysuru.com/wp-content/uploads/2022/01/brindavan.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Artisan" />
                <div className="absolute inset-0 bg-amber-900/10"></div>
             </div>
             <div className="order-1 md:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-white tracking-tight">Our Decentralized Model</h2>
                <p className="text-lg leading-relaxed mb-12 font-light text-stone-400">
                   We curate high-quality experiences in peripheral areas. By guiding you to "Hidden Gems" and direct-to-artisan workshops, we distribute economic benefits more evenly.
                </p>
                <ul className="space-y-8">
                   {[
                     { icon: <Users className="w-5 h-5" />, color: 'bg-amber-500/10 text-amber-500', text: 'Direct revenue to 500+ artisan families' },
                     { icon: <Globe className="w-5 h-5" />, color: 'bg-green-500/10 text-green-400', text: 'Reduced footprint via walking tours' },
                     { icon: <Heart className="w-5 h-5" />, color: 'bg-red-500/10 text-red-400', text: 'Preservation of cultural heritage' }
                   ].map((item, i) => (
                      <li key={i} className="flex items-center gap-6 text-lg font-medium text-stone-300 group">
                        <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${item.color}`}>
                           {item.icon}
                        </div>
                        {item.text}
                      </li>
                   ))}
                </ul>
             </div>
          </div>
       </div>
    </div>
  );
};