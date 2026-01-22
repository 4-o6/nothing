
import React from 'react';
import { IMPACT_STATS } from '../constants';
// Added Sparkles to the import list from lucide-react
import { Leaf, Users, Heart, Globe, AlertTriangle, CheckCircle2, TrendingDown, Landmark, Sparkles } from 'lucide-react';

export const Impact: React.FC = () => {
  return (
    <div className="bg-[#0c0c0c] text-stone-200 pb-32">
       {/* Hero/Title Section */}
       <div className="bg-stone-900/40 pt-48 pb-24 px-6 border-b border-white/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] to-transparent pointer-events-none"></div>
          <div className="max-w-5xl mx-auto relative z-10 animate-app-reveal">
             <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-600/10 text-amber-500 border border-amber-600/20 mb-10 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                <Landmark className="w-4 h-4" /> The Mission
             </div>
             <h1 className="text-5xl sm:text-8xl font-serif font-bold mb-10 text-white tracking-tighter leading-[0.9]">Why We <br/><span className="text-amber-500 italic">Exist.</span></h1>
             <p className="text-xl sm:text-2xl text-stone-400 leading-relaxed font-light max-w-3xl mx-auto">
                Mysuru is a Royal City, but its true wealth is currently hidden from 90% of its visitors.
             </p>
          </div>
       </div>

       {/* Stats Grid */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {IMPACT_STATS.map((stat, idx) => (
             <div key={idx} className="p-12 sm:p-16 rounded-[3rem] glass-card shadow-2xl animate-app-reveal flex flex-col items-center text-center group hover:border-amber-600/30 transition-all" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-6xl sm:text-8xl font-black text-amber-500 mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-stone-600">{stat.label}</div>
             </div>
          ))}
       </div>

       {/* Problem vs Solution Section */}
       <div className="max-w-7xl mx-auto px-6 mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
             {/* THE PROBLEM */}
             <div className="bg-red-950/5 border border-red-900/10 p-12 sm:p-20 rounded-[4rem] relative overflow-hidden animate-app-reveal">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <AlertTriangle className="w-48 h-48 text-red-500" />
                </div>
                <div className="relative z-10">
                   <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-8 text-[10px] font-black uppercase tracking-widest">
                      <TrendingDown className="w-4 h-4" /> The Problem
                   </div>
                   <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-8 tracking-tight">Tourism <br/><span className="text-red-400">Centralization.</span></h2>
                   <ul className="space-y-8">
                      {[
                        { title: "Palace Bottleneck", desc: "Massive overcrowding at the Mysore Palace strains heritage infrastructure." },
                        { title: "Artisan Invisibility", desc: "Master weavers and carvers in neighborhoods like Agrahara are being forgotten." },
                        { title: "Revenue Gaps", desc: "Tourism money stays in commercial hubs; zero reach to hereditary craft families." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-6">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                           <div>
                              <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                              <p className="text-stone-500 text-sm font-light leading-relaxed">{item.desc}</p>
                           </div>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>

             {/* THE SOLUTION */}
             <div className="bg-amber-900/5 border border-amber-600/10 p-12 sm:p-20 rounded-[4rem] relative overflow-hidden animate-app-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <Sparkles className="w-48 h-48 text-amber-500" />
                </div>
                <div className="relative z-10">
                   <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-600/10 text-amber-500 border border-amber-600/20 mb-8 text-[10px] font-black uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4" /> Our Solution
                   </div>
                   <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-8 tracking-tight">The <br/><span className="text-amber-500">Decentralized Model.</span></h2>
                   <ul className="space-y-8">
                      {[
                        { title: "AI Heritage Mapping", desc: "Using Gemini to find and ground the exact locations of hidden studios." },
                        { title: "Direct-to-Artisan", desc: "Connecting you with masters like Shri. Nanjundaiah with zero commissions." },
                        { title: "Distributed Impact", desc: "Redistributing footfall across 40+ nodes to preserve the city's pulse." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-6">
                           <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                           <div>
                              <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                              <p className="text-stone-500 text-sm font-light leading-relaxed">{item.desc}</p>
                           </div>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
       </div>

       {/* Detailed Impact Narrative */}
       <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-10">
                <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">Sustainable <br/>Preservation</h2>
                <div className="space-y-6">
                  <p className="text-lg text-stone-500 font-light leading-relaxed">
                    MysuruUnveiled isn't just a travel app. It's an economic bridge. By guiding travelers to silent lakes like Blue Lagoon or the rosewood studios of Tilak Nagar, we create a sustainable revenue stream for parts of the city that have been silent for decades.
                  </p>
                  <p className="text-lg text-stone-500 font-light leading-relaxed italic border-l-2 border-amber-600/30 pl-8">
                    "Every time a traveler visits an artisan studio instead of a mall, a piece of Mysuru's soul is saved for the next generation."
                  </p>
                </div>
                <div className="flex flex-wrap gap-6 pt-6">
                  {[
                    { icon: <Users />, label: "500+ Families" },
                    { icon: <Leaf />, label: "Zero-Waste Routes" },
                    { icon: <Heart />, label: "100% Direct Pay" }
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                      <div className="text-amber-500 w-5 h-5">{badge.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">{badge.label}</span>
                    </div>
                  ))}
                </div>
             </div>
             <div className="h-[500px] rounded-[3rem] overflow-hidden border border-white/5 relative group shadow-2xl">
                <img 
                  src="https://www.mysoretourism.org.in/images/v2/places-to-visit/mysore-maharaja-palace-header-mysore-tourism.jpg" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-100" 
                  alt="Mysore Heritage"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                   <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4">Beyond the Gates</p>
                   <h3 className="text-3xl font-serif font-bold text-white leading-tight">Empowering the <br/>Royal City's Edge.</h3>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
