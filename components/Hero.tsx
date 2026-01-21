import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] min-h-screen flex items-center overflow-hidden">
      {/* Background with softer overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="animate-app-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-8">
            <Sparkles className="w-3.5 h-3.5" /> Discovery Redefined
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black font-serif mb-8 leading-[1.05] tracking-tight text-white max-w-3xl">
            Escape the <span className="text-amber-500">Ordinary.</span> <br/>
            Discover Mysuru.
          </h1>
          
          <p className="text-lg md:text-2xl text-stone-400 mb-12 max-w-xl leading-relaxed font-light">
            Connecting curious travelers with hidden gems, master artisans, and the authentic soul of the Royal City.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={onStart}
              className="h-16 bg-amber-600 hover:bg-amber-500 text-white px-10 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-xl shadow-amber-900/30 active:scale-95"
            >
              Start Exploring <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onImpact}
              className="h-16 bg-white/5 hover:bg-white/10 text-stone-300 border border-white/5 px-10 rounded-2xl font-black text-sm uppercase tracking-widest backdrop-blur-xl transition-all active:scale-95"
            >
              Our Impact
            </button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-app-reveal" style={{ animationDelay: '0.2s' }}>
          {[
            { icon: <MapPin className="text-amber-500" />, title: "Hidden Backwaters", desc: "Escape the palace crowds for serene landscapes." },
            { icon: <Sparkles className="text-amber-500" />, title: "Local Masters", desc: "Meet the artisans keeping centuries of craft alive." },
            { icon: <Sparkles className="text-amber-500" />, title: "Authentic Tastes", desc: "Discover the real flavor of Mysuru in local messes." }
          ].map((item, i) => (
            <div key={i} className="bg-stone-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl flex items-start gap-5">
              <div className="mt-1">{item.icon}</div>
              <div>
                <h4 className="font-bold text-white mb-1 text-sm">{item.title}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};