
import React from 'react';
import { ArrowRight, AlertTriangle, Leaf, Heart } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] text-white min-h-screen flex items-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-20 animate-fade-in scale-105"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="lg:w-3/5 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] mb-6 md:mb-8">
            <span className="relative flex h-1.5 w-1.5 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
            Heritage Decentralized
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black font-serif mb-6 md:mb-8 leading-[1.1] tracking-tighter text-white">
            Royal <span className="text-amber-500 italic">Mysuru</span> <br/>
            <span className="text-white/80">Rediscovered.</span>
          </h1>
          
          <p className="text-base md:text-xl text-stone-400 mb-10 md:mb-12 max-w-xl leading-relaxed font-light">
            Skip the queues and crowds. Connect with master artisans, discover hidden backwaters, and sustain the true soul of the city.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-20 md:mb-24">
            <button 
              onClick={onStart}
              className="group h-14 md:h-16 bg-amber-600 hover:bg-amber-500 text-white px-8 md:px-10 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-[0.98]"
            >
              Start Exploring <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button 
              onClick={onImpact}
              className="group h-14 md:h-16 bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-white/10 px-8 md:px-10 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest backdrop-blur-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              Local Impact
            </button>
          </div>
        </div>

        {/* Static Cards - Adjusted for Mobile Grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {[
            { 
              icon: <AlertTriangle className="w-5 h-5" />, 
              title: "The Problem", 
              desc: "Overtourism is eroding heritage and traditional local economies.",
              color: "text-red-400",
              bg: "bg-red-400/10"
            },
            { 
              icon: <Leaf className="w-5 h-5" />, 
              title: "The Vision", 
              desc: "Redirecting travel to sustain artisan hubs and natural gems.",
              color: "text-green-400",
              bg: "bg-green-400/10"
            },
            { 
              icon: <Heart className="w-5 h-5" />, 
              title: "The Future", 
              desc: "Directly empowering 500+ local families through discovery.",
              color: "text-amber-400",
              bg: "bg-amber-400/10"
            }
          ].map((card, i) => (
            <div 
              key={i} 
              className={`bg-stone-900/60 backdrop-blur-3xl border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group card-lift shadow-2xl`}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${card.bg} rounded-xl md:rounded-2xl flex items-center justify-center ${card.color} mb-6 md:mb-8 transition-all group-hover:scale-110 group-hover:rotate-3 duration-500`}>
                {card.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 font-serif text-white tracking-tight">{card.title}</h3>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">{card.desc}</p>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-colors duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
