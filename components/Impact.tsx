
import React from 'react';
import { IMPACT_STATS } from '../constants';
import { Leaf, Users, Heart, Globe } from 'lucide-react';

interface ImpactProps {
  theme: 'dark' | 'light';
}

export const Impact: React.FC<ImpactProps> = ({ theme }) => {
  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0c0c0c]' : 'bg-stone-50'}`}>
       {/* Header Section */}
       <div className={`${theme === 'dark' ? 'bg-stone-900' : 'bg-stone-900'} text-white pt-32 pb-24 px-4 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-8 text-[10px] font-black uppercase tracking-widest">
                <Leaf className="w-4 h-4" /> Sustainable Architecture
             </div>
             <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">Preserving Mysuru for <span className="text-amber-500 italic">Generations.</span></h1>
             <p className="text-xl text-stone-300 leading-relaxed max-w-2xl mx-auto font-light">
                We believe tourism should build communities, not just visit them. By shifting focus from the crowded center to the vibrant edges, we create a better experience for you and a better livelihood for locals.
             </p>
          </div>
       </div>

       {/* Stats Section */}
       <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10 animate-fade-in-up">
          <div className="grid md:grid-cols-3 gap-8">
             {IMPACT_STATS.map((stat, idx) => (
                <div key={idx} className={`p-10 rounded-[2.5rem] shadow-2xl border transition-all card-lift ${theme === 'dark' ? 'bg-[#141414] border-stone-800' : 'bg-white border-stone-100'}`}>
                   <div className="text-5xl font-black text-amber-500 mb-3">{stat.value}</div>
                   <div className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>{stat.label}</div>
                </div>
             ))}
          </div>
       </div>

       {/* Detailed Sections */}
       <div className="max-w-7xl mx-auto px-4 py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
             <div>
                <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>The Challenge of Over-Tourism</h2>
                <p className={`text-lg leading-relaxed mb-6 font-light ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
                   Mysore Palace attracts over 3.5 million visitors annually. This concentration strains heritage infrastructure, creates traffic congestion, and leaves surrounding traditional livelihoods struggling for visibility.
                </p>
                <p className={`text-lg leading-relaxed font-light ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
                   Mass tourism often bypasses the small artisan, the local eatery, and the hidden temple that truly embodies the city's spirit.
                </p>
             </div>
             <div className="rounded-[3rem] overflow-hidden shadow-2xl relative h-80 group">
                <img src="https://www.mysoretourism.org.in/images/v2/places-to-visit/mysore-maharaja-palace-header-mysore-tourism.jpg" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Palace" />
                <div className="absolute inset-0 bg-black/20"></div>
             </div>
          </div>

           <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1 rounded-[3rem] overflow-hidden shadow-2xl relative h-80 group">
                <img src="https://bxmysuru.com/wp-content/uploads/2022/01/brindavan.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Artisan" />
                <div className="absolute inset-0 bg-amber-900/10"></div>
             </div>
             <div className="order-1 md:order-2">
                <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Our Decentralized Model</h2>
                <p className={`text-lg leading-relaxed mb-8 font-light ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
                   We curate high-quality experiences in peripheral areas. By guiding you to "Hidden Gems" and direct-to-artisan workshops, we distribute economic benefits more evenly.
                </p>
                <ul className="space-y-6">
                   {[
                     { icon: <Users className="w-5 h-5" />, color: 'bg-amber-500/10 text-amber-500', text: 'Direct revenue to 500+ artisan families' },
                     { icon: <Globe className="w-5 h-5" />, color: 'bg-green-500/10 text-green-500', text: 'Reduced footprint via walking tours' },
                     { icon: <Heart className="w-5 h-5" />, color: 'bg-red-500/10 text-red-500', text: 'Preservation of intangible cultural heritage' }
                   ].map((item, i) => (
                      <li key={i} className={`flex items-center gap-5 text-base font-medium ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
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
